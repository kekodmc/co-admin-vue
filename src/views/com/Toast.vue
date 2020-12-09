<template>
    <v-snackbar
            v-model="value"
            top
            :timeout="timeout"
            v-bind="options"
            @input="changeStatus"
    >
        {{ msg }}
        <template v-slot:action="{ attrs }">
            <v-btn
                    text
                    v-bind="attrs"
                    @click="value = false"
            >
                <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
    export default {
        name: "Toast",
        props:{
            message:{
                type:String,
                default:''
            }
        },
        data(){
            return{
                value:false,
                timeout:2000,
                msg:this.message,
                color:'',
                options:{
                    color:''
                }
            }
        },
        methods:{
            show(config){
                if(this.value){
                    this.value=false
                    setTimeout(()=>{
                        this.setData(config)
                    },200)
                }else{
                    this.setData(config)
                }
            },
            setData({message,title,color}){
                this.msg=message
                this.options.color=color
                this.value=true
            },
            changeStatus(v){
                if(!v){
                    this.$emit('remove')
                }
            }
        }
    }
</script>

<style scoped>

</style>
