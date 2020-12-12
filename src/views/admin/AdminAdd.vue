<template>
    <div>
        <v-card :loading="loading" style="max-width: 500px">
        <v-card-text>
            <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
            >
                <my-upload type="avatar" v-model="form.avatar" :auto="true"></my-upload>

                <v-text-field
                        v-model="form.username"
                        :rules="rules.username"
                        label="*登录名"
                        required
                ></v-text-field>
                <v-text-field
                        v-if="form.id"
                        v-model="form.password"
                        label="密码"
                        required
                        hint="不填写则不修改"
                        persistent-hint
                ></v-text-field>
                <v-text-field
                        v-else
                        v-model="form.password"
                        :rules="rules.password"
                        label="*密码"
                        required
                        hint="请设置6-16位密码"
                ></v-text-field>
                <v-select
                        v-model="form.role_id"
                        :items="items"
                        item-value="id"
                        item-text="name"
                        :rules="rules.role_id"
                        label="*请选择权限"
                ></v-select>
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
    import MyUpload from '../com/MyUpload'
    export default {
        name: "AdminAdd",
        inject: ['$toast'],
        components:{
            MyUpload
        },
        data(){
            return{
                valid:true,
                switch1:false,
                loading:false,
                // headers:getHeaders(),
                form:{
                    id:'',
                    avatar:'',
                    username:'',
                    password:'',
                    role_id:'',
                    status:1,
                },
                color:'',
                dialog:false,
                rules:{
                    username:[
                        v => !!v || '请输入登录名',
                    ],
                    password:[
                        v => !!v || '请设置密码',
                        v => v.length>=6&&v.length<=16 || '请设置6至16位密码',
                    ],
                    role_id:[
                        v => !!v || '请选择用户权限',
                    ],
                },
                items:[],
            }
        },
        methods:{
            validate(){
                if(this.$refs.form.validate()){
                    this.loading=true
                    this.$service.admin.save(this.form).then(res=>{
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
                const that=this
                that.loading=true
                this.$service.admin.info(this.form).then(res=>{
                    that.loading=false
                    that.form=res.data
                    if(res.data.status==1){
                        that.switch1=false
                    }else{
                        that.switch1=true
                    }
                }).catch(e=>{
                    that.loading=false
                })
            },
        },
        created(){
            if(this.$route.params.id){
                this.form.id=this.$route.params.id
                this.getData()
            }
            this.$service.admin.role().then(res=>{
                this.items=res.data.list
            }).catch(e=>{

            })
        }
    }
</script>

<style scoped>
</style>
