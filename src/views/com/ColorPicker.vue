<template>
    <div>
        <v-dialog
                v-model="dialog"
                max-width="290"
        >
            <v-card>
                <v-card-title class="headline">选择颜色</v-card-title>
                <v-card-text>
                    <v-color-picker
                            mode="rgba"
                            v-model="color"
                            @update:color="colorChange"
                    ></v-color-picker>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="error"
                            text
                            @click="removeColor"
                    >
                        清除颜色
                    </v-btn>
                    <v-btn
                            text
                            @click="dialog = false"
                    >
                        关 闭
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "ColorPicker",
        props:{
            value:{
                type:String,
                default:''
            }
        },
        data(){
            return{
                dialog:false,
                color:this.value
            }
        },
        methods:{
            show(){
                this.dialog=true
            },
            removeColor(){
                this.dialog=false
                this.color=''
                setTimeout(()=>{
                    this.$emit('input','')
                },100)
            },
            colorChange(v){
                if(v.hexa=='#FF0000FF'){
                    return
                }
                this.$emit('input',v.hexa)
            }
        },
        watch:{
            value(v){
                this.color=v
            }
        }
    }
</script>

<style scoped>

</style>