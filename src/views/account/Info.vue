<template>
    <div>
        <v-card  :loading="loading" style="max-width: 500px">
            <v-card-text>
                <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                >
                    <my-upload type="avatar" v-model="form.avatar" :auto="true"></my-upload>

                    <v-text-field
                            v-model="form.password"
                            label="密码"
                            required
                            hint="不填写则不修改"
                            persistent-hint
                    ></v-text-field>
                    <v-btn
                            :disabled="!valid"
                            block
                            class="mt-4"
                            @click="validate"
                            :loading="loading"
                    >
                        保 存
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import MyUpload from '../com/MyUpload'
    import {getData} from "../../utils/base";

    export default {
        name: "Info",
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
                    avatar:'',
                    username:'',
                    password:'',
                },
                color:'',
                dialog:false,
                rules:{
                    avatar:[
                        v => !!v || '请输入登录名',
                    ],
                    password:[
                        v => !!v || '请设置密码',
                        v => v.length>=6&&v.length<=16 || '请设置6至16位密码',
                    ],
                },
                items:[],
            }
        },
        methods:{
            validate(){
                if(this.$refs.form.validate()){
                    this.loading=true
                    this.$service.account.save(this.form).then(res=>{
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
                let str=getData('user')
                let user=JSON.parse(str)
                this.form.username=user.username
                this.form.avatar=user.avatar
            },
        },
        created(){
            this.getData()
        }
    }
</script>

<style scoped>
</style>
