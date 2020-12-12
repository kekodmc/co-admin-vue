<template>
    <div>
        <v-container class="pt-10">
            <v-card-text  class="text-center mt-5">
                <!--<v-btn fab to="/">-->
                    <!--<v-icon>mdi-home</v-icon>-->
                <!--</v-btn>-->
                <v-avatar
                        dark
                        size="64"
                >
                    <v-img :src="avatar" v-if="avatar"></v-img>
                    <v-icon v-else>mdi-account</v-icon>
                </v-avatar>
            </v-card-text>
            <v-card style="min-width: 350px;max-width: 400px;margin: auto" class="mt-2" :loading="loading">
                <v-card-text>
                    <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                    >
                        <v-text-field
                                v-model="form.username"
                                :rules="rules.username"
                                label="账号"
                                required
                        ></v-text-field>

                        <v-text-field
                                v-model="form.password"
                                :rules="rules.password"
                                label="密码"
                                type="password"
                                required
                        ></v-text-field>

                        <!--<v-text-field
                                v-model="form.code"
                                :rules="rules.code"
                                label="验证码"
                                required
                        ></v-text-field>-->

                        <v-checkbox
                                v-model="checkbox"
                                label="记住密码（不安全）"
                                required
                        ></v-checkbox>

                        <v-btn
                                :disabled="!valid"
                                style="width: 100%"
                                class="mr-4"
                                @click="validate"
                                :loading="loading"
                        >
                            登 录
                        </v-btn>
                    </v-form>
                    <v-subheader>测试账号：demo 123456</v-subheader>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import {setToken,setData,getData} from "../utils/base";
    import {checkPower} from "../utils/power";

    export default {
        name: "Login",
        data(){
            return{
                loading:false,
                valid: true,
                form:{
                    username:'',
                    password:'',
                    code:''
                },
                rules:{
                    username:[
                        v => !!v || '请输入账号',
                    ],
                    password:[
                        v => !!v || '请输入密码',
                    ],
                    code:[
                        v => !!v || '请输入验证码',
                    ]
                },
                select: null,
                checkbox: false,
                avatar:'',
            }
        },
        methods:{
            validate () {
                const that=this
                if(this.$refs.form.validate()){
                    that.loading=true
                    this.$service.common.login(this.form).then(res=>{
                        that.loading=false
                        setToken(res.data.token)
                        setData('power',res.data.power.join(','))
                        setData('user',JSON.stringify(res.data))
                        setData('avatar',res.data.avatar)
                        if(that.checkbox){
                            setData('username',that.form.username)
                            setData('password',that.form.password)
                        }
                        checkPower()
                        that.$router.push({name:res.data.power[0]})
                    }).catch(e=>{
                        that.loading=false
                    })
                }
            },
        },
        created(){
            this.form.username=getData('username')
            this.form.password=getData('password')
            this.avatar=getData('avatar')
            if(this.form.username){
                this.checkbox=true
            }
        }
    }
</script>

<style scoped>

</style>
