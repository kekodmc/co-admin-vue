<template>
    <div>
        <v-card :loading="loading" style="max-width: 500px">
        <v-card-text>


                <v-tabs grow v-model="form.type">
                    <v-tab>添加权限</v-tab>
                    <v-tab>添加模块</v-tab>
                </v-tabs>
                <v-divider></v-divider>
                <v-tabs-items v-model="form.type">
                    <v-tab-item
                            :value="0"
                    >
                        <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                        >
                            <v-select
                                    :items="items"
                                    item-text="name"
                                    item-value="id"
                                    label="*请选择所属模块"
                                    v-model="form.parent_id"
                                    :rules="rules.parent_id"
                            ></v-select>
                            <v-text-field
                                    v-model="form.controller"
                                    :rules="rules.controller"
                                    label="*控制器"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    v-model="form.action"
                                    :rules="rules.action"
                                    label="*方法名"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    v-model="form.name"
                                    label="权限名称"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    type="number"
                                    v-model="form.sort"
                                    :rules="rules.sort"
                                    label="*设置排序值"
                                    required
                                    persistent-hint
                                    hint="值小的排前面"
                            ></v-text-field>
                        </v-form>
                    </v-tab-item>
                    <v-tab-item
                            :value="1"
                    >
                        <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                        >
                            <v-text-field
                                    v-model="form.name"
                                    :rules="rules.name"
                                    label="*模块名称"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    type="number"
                                    v-model="form.sort"
                                    :rules="rules.sort"
                                    label="*设置排序值"
                                    required
                                    persistent-hint
                                    hint="值小的排前面"
                            ></v-text-field>
                        </v-form>
                    </v-tab-item>
                </v-tabs-items>

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
        name: "PowerAdd",
        inject: ['$toast'],
        data(){
            return{
                valid:true,
                imageUrl:'',
                switch1:false,
                loading:false,
                // headers:getHeaders(),
                form:{
                    id:'',
                    type:0,
                    name:'',
                    parent_id:'',
                    controller:'',
                    action:'',
                    status:1,
                    sort:1,
                },
                color:'',
                dialog:false,
                rules:{
                    controller:[
                        v => !!v || '请输入控制器名称',
                    ],
                    action:[
                        v => !!v || '请输入方法名称',
                    ],
                    parent_id:[
                        v => !!v || '请选择所属模块',
                    ],
                    name:[
                        v => !!v || '请输入名称',
                    ],
                    sort:[
                        v => !!v || '请设置排序值',
                    ],
                },
                items:[],
                typeList:[
                    {id:1,name:'添加权限'},
                    {id:2,name:'添加模块'},
                ],
            }
        },
        methods:{
            validate(){
                if(this.$refs.form.validate()){
                    this.loading=true
                    this.$service.power.save(this.form).then(res=>{
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
                this.$service.power.info(this.form).then(res=>{
                    this.loading=false
                    this.form=res.data
                }).catch(e=>{
                    this.loading=false
                })
            },
        },
        created(){
            if(this.$route.params.id){
                this.form.id=this.$route.params.id
                this.getData()
            }
            this.$service.power.mod(this.form).then(res=>{
                this.items=res.data.list
            }).catch(e=>{
            })
        }
    }
</script>

<style scoped>
</style>
