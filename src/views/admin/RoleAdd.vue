<template>
    <div>
        <v-card  :loading="loading">
        <v-card-text>
            <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
            >
                <v-text-field
                        v-model="form.name"
                        :rules="rules.name"
                        label="*角色名称"
                        required
                ></v-text-field>
                <div class="mb-1">*配置权限</div>
                <template v-for="(item,i) in items">
                    <v-checkbox
                            :key="item.id"
                            :indeterminate="item.indeterminate"
                            :label="item.name+'【模块】'"
                            v-model="item.selected"
                            @change="onSelectedAll(i)"
                    ></v-checkbox>
                    <v-divider></v-divider>
                    <v-row dense>
                        <v-col
                                v-for="(it,k) in item.children"
                                :key="it.id"
                                cols="6"
                                sm="6"
                                md="4"
                        >
                            <v-checkbox
                                    :label="it.name"
                                    color="success"
                                    v-model="it.selected"
                                    @change="onSelected(k,i)"
                            ></v-checkbox>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                </template>
                <!--<v-treeview-->
                        <!--:value="selectedItems"-->
                        <!--selectable-->
                        <!--hoverable-->
                        <!--:items="items"-->
                <!--&gt;</v-treeview>-->
            </v-form>
            <v-btn
                    :disabled="!valid"
                    block
                    class="mt-4"
                    @click="validate"
                    :loading="loading"
            >
                保 存
            </v-btn>
        </v-card-text>
        </v-card>
    </div>
</template>

<script>

    export default {
        name: "RoleAdd",
        inject: ['$toast'],
        data(){
            return{
                valid:true,
                loading:false,
                form:{
                    id:'',
                    name:'',
                    power_id:''
                },
                rules:{
                    name:[
                        v => !!v || '请输入名称',
                    ],
                    power_id:[
                        v => !!v || '请设置排序值',
                    ],
                },
                items:[],
                selectedItems:[1,2,3,4,5],
            }
        },
        methods:{
            validate(){
                if(this.$refs.form.validate()){
                    let power=this.getSelectedData()
                    if(power.length<1){
                        this.$toast.error('请至少选择一项权限')
                        return
                    }
                    this.form.power_id=power.join(',')
                    this.loading=true
                    this.$service.role.save(this.form).then(res=>{
                        this.loading=false
                        this.$toast.success(res.msg)
                        this.$router.back()
                    }).catch(e=>{
                        this.loading=false
                    })
                }else{
                    this.loading=false
                    this.$toast.error('请先填写所有带*号的内容')
                }
            },
            //获取数据
            getData(){
                this.loading=true
                this.$service.role.info(this.form).then(res=>{
                    this.loading=false
                    this.form=res.data
                    let list=res.data.power_id.split(',')
                    list.forEach(i=>{
                        this.selectedItems.push(parseInt(i))
                    })
                }).catch(e=>{
                    this.loading=false
                })
            },
            getPowerList(){
                this.$service.role.power().then(res=>{
                    let items=res.data.list
                    if(this.form.power_id){
                        let powerList=this.form.power_id.split(',')
                        // console.log('power',powerList)
                        items.forEach((item,i)=>{
                            let len=0
                            item.children.forEach((it,k)=>{
                                if(powerList.indexOf(it.id.toString())>=0){
                                    items[i].children[k].selected=true
                                    len++
                                }
                            })
                            if(len>=item.children.length){
                                items[i].selected=true
                                items[i].indeterminate=false
                            }else if(len<1){
                                items[i].selected=false
                                items[i].indeterminate=false
                            }else{
                                items[i].selected=false
                                items[i].indeterminate=true
                            }
                        })
                    }
                    this.items=items
                }).catch(e=>{
                    console.log('e',e)
                })
            },
            //点击选中事件
            onSelected(k,key){
                let item=this.items[key]
                let len=0;
                for (let i in item.children){
                    if(item.children[i].selected){
                        len++;
                    }
                }
                if(len>=item.children.length){
                    //全选
                    item.indeterminate=false
                    item.selected=true
                }else if(len<1){
                    //全不选
                    item.indeterminate=false
                    item.selected=false
                }else{
                    //部分选中
                    item.indeterminate=true
                    item.selected=false
                }
                this.$set(this.items,key,item)
            },
            //点击全选事件
            onSelectedAll(k){
                let item=this.items[k]
                let result=false
                if(item.selected||item.indeterminate){
                    item.indeterminate=false
                    item.selected=true
                    result=true
                }else{
                    item.indeterminate=false
                    item.selected=false
                    result=false
                }
                for (let i in item.children){
                    item.children[i].selected=result
                }
                this.$set(this.items,k,item)
            },
            //获取当前选中的数据
            getSelectedData(){
                let data=[]
                for (let i in this.items){
                    for (let k in this.items[i].children){
                        if(this.items[i].children[k].selected){
                            data.push(this.items[i].children[k].id)
                        }
                    }
                }
                return data
            }
        },
        async created(){
            await this.getPowerList()
            if(this.$route.params.id){
                this.form.id=this.$route.params.id
                this.getData()
            }
        }
    }
</script>

<style scoped>
</style>
