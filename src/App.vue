<template>
    <v-app>
        <v-main>
            <router-view></router-view>
        </v-main>
        <custom-toast ref="toast"></custom-toast>
        <custom-dialog ref="dialog"></custom-dialog>
    </v-app>
</template>

<script>
import CustomToast from './views/com/Toast'
import CustomDialog from './views/com/Dialog'
import {getData} from "./utils/base";

export default {
     name: 'App',
    components:{
        CustomToast,
        CustomDialog
    },
    provide(){
        return{
            $toast:{
                message:(...params)=>this.showToast('',...params),
                success:(...params)=>this.showToast('success',...params),
                info:(...params)=>this.showToast('info',...params),
                warning:(...params)=>this.showToast('warning',...params),
                error:(...params)=>this.showToast('error',...params),
            },
            $dialog:{
                message:(...params)=>this.showDialog('message',...params),
                confirm:(...params)=>this.showDialog('confirm',...params),
                loading:(...params)=>this.showDialog('loading',...params),
            }
        }
    },
    created(){
         let theme=getData('theme')
         if(theme&&theme=='dark'){
             this.$store.commit('setDark',1)
         }
         if(this.$store.state.dark=='1'){
             this.$vuetify.theme.dark = true
         }
    },
    methods:{
        showToast(type,msg){
            return new Promise(resolve => {
                this.$refs.toast.show({
                    message:msg,
                    color:type,
                })
                setTimeout(()=>{
                    resolve()
                },1500)
            })
        },
        showDialog(...params){
            return this.$refs.dialog.show(...params)
        },
    },
    watch:{
        '$store.state.toast':function(v){
            this.showToast(v.type,v.msg)
        }
    },
};
</script>
<style>
    .v-application code{
        background-color: transparent !important;
        color: inherit !important;
        padding:0 !important;
        font-size:inherit !important;
        font-weight:inherit !important;
    }
</style>
