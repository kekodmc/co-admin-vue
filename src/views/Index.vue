<template>
    <div>
        <p style="text-align: center">
            loading...
        </p>
    </div>
</template>

<script>
    import {getToken,getData} from "../utils/base";

    export default {
        name: "Index",
        data(){
            return{
                data:null
            }
        },
        created(){
            //检查登录状态
            let token=getToken()
            if(token){
                //已登录
                let power=getData('power')
                let powerList=power.split(',')
                if(!power||powerList.length<1){
                    this.$router.replace('/login')
                }else{
                    this.$router.replace({name:powerList[0]})
                }
            }else{
                this.$router.replace('/login')
            }
        }
    }
</script>

<style scoped>

</style>
