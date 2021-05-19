<template>
    <v-dialog
            v-model="value"
            max-width="350"
            :hide-overlay="loading"
            :persistent="loading"
    >
        <v-card v-if="loading" class="pt-3">
          <v-card-text>
            <div>{{options.message}}</div>
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
        <v-card v-else class="pt-3">
            <v-card-title v-if="options.title">{{options.title}}</v-card-title>
            <v-card-text>{{options.message}}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="doCancel">{{options.btn_cancel_txt}}</v-btn>
                <v-btn text :color="options.btn_confirm_color" v-if="options.type=='confirm'" @click="doConfirm">{{options.btn_confirm_txt}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "Dialog",
        data(){
            return{
                value:false,
                options:{
                    type:'',
                    title:'提示',
                    message:'',
                    btn_cancel_txt:'取消',
                    btn_confirm_txt:'确定',
                    btn_confirm_color:'error',
                },
                loading:false,//是否是加载对话框
                promise:null,
                extra:null //额外参数，原样返回
            }
        },
        methods:{
            init(){
              this.loading=false
              this.promise=null
              this.extra=null
            },
            show(type,msg,title,btn1_txt,btn2_txt,btn1_color,...data){
                this.init()
                this.options.type=type
                this.options.message=msg
                this.options.title=title||this.options.title
                this.options.btn_confirm_txt=btn1_txt||this.options.btn_confirm_txt
                this.options.btn_cancel_txt=btn2_txt||this.options.btn_cancel_txt
                this.options.btn_confirm_color=btn1_color||this.options.btn_confirm_color
                this.extra=data
                switch (type) {
                  case 'confirm':
                    this.value=true
                    return new Promise((resolve,reject)=>{
                      this.promise={resolve,reject}
                    })
                    break;
                  case 'loading':
                    this.loading=true
                    this.value=true
                    return {
                      close:()=>{
                        this.value=false
                      }
                    }
                    default:
                        this.options.btn_cancel_txt="好的"
                }
              this.value=true
            },
            doConfirm(){
                if(this.promise){
                    this.value=false
                    this.promise.resolve(...this.extra)
                }
            },
            doCancel(){
              if(this.promise){
                this.value=false
                this.promise.reject(...this.extra)
              }else{
                  this.value=false
              }
            }
        }
    }
</script>

<style scoped>

</style>
