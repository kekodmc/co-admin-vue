<template>
    <div>
        <v-file-input
                flat
                :id="id"
                placeholder=""
                ref="file"
                label=""
                hide-details
                @change="fileChange"
                :loading="loading"
                accept="image/*"
                :multiple="multi"
                :clearable="false"
                prepend-icon=""
                v-model="imageList"
                @click:clear="clear"
                @update:error="error">
            <template v-slot:selection="{text,index}">

            </template>
            <template v-slot:prepend-inner>
               <v-row align="end">
                   <v-card class="ma-2" max-width="100" v-for="(item,index) in fileList" :key="index">
                       <v-img :src="item.url" max-height="100" max-width="100"></v-img>
                       <v-btn
                               style="right: 5px;"
                               color="red"
                               dark
                               x-small
                               absolute
                               top
                               right
                               fab
                               @click="removeItem(index)"
                       >
                           <v-icon>mdi-close</v-icon>
                       </v-btn>
                   </v-card>
                   <v-btn depressed fab class="ma-2" @click="openFile">
                       <v-icon>mdi-plus</v-icon>
                   </v-btn>
               </v-row>
            </template>
        </v-file-input>
    </div>
</template>

<script>

    export default {
        name: "MyUpload",
        props:{
            multiple:{
                type:Boolean,
                default:false
            },
            value:{
                type:String,
                default:''
            },
            label:{
                type:String,
                default: '选择图片'
            },
            auto:{
                type:Boolean,
                default:false
            },
            type:{
                type:String,
                default:'default'
            }

        },
        data(){
            return{
                id:'v-file-input-',
                imageList:[],
                fileList:[],
                successList:[],
                multi:this.multiple,
                waitNum:0, //待上传的图片数量
                waitStatus:'waiting',
                okStatus:'success',
                loading:false
            }
        },
        methods:{
            upload(){
                this.waitNum=this.getUploadNum()
                if(this.waitNum>0){
                    let arr=this.fileList
                    for (let i=0;i<arr.length;i++){
                        if(arr[i].status==this.waitStatus){
                            this.doUpload(arr[i].file,i)
                        }
                    }
                }
            },
            getDataUrl(file){
               return new Promise(resolve => {
                   let reader = new FileReader();
                   reader.readAsDataURL(file);
                   /*读取完毕  预览 */
                   reader.onload = (e=>{
                       resolve(e.target.result)
                   })
               })
            },
            fileChange(files){
                const that=this
                if(files.length<1)return
                if(!this.multi)this.fileList=[]
                for(let i=0;i<files.length;i++){
                    if(files[i].type.indexOf('image')<0){
                        this.$toast.error(`文件${files[i].name}不是图片`)
                        if(!this.multi){
                            return
                        }
                        continue
                    }
                    this.getDataUrl(files[i]).then(res=>{
                        this.fileList.push({
                            status:that.waitStatus,
                            url:res,
                            name:files[i].name,
                            type:files[i].type,
                            file:files[i]
                        })
                    })
                }
                if(this.auto){
                    if(this.multi){
                        setTimeout(()=>{
                            this.upload()
                        },100)
                    }else{
                        this.doUpload(files[0],0)
                    }
                }
            },
            doUpload(file,index){
                this.loading=true
                const that=this
                this.$service.common.upload(file,{data:{type:this.type}}).then(res=>{
                    that.success(res,index)
                })
            },
            clear(){
                this.fileList=[]
                this.$emit('input','')
            },
            error(e){
                // console.log('e',e)
                // this.$toast.error('e')
            },
            success(res,index){
                this.fileList[index]={
                    status:this.okStatus,
                    url:res.data.url
                }
                this.$emit('success',res)
                let num=this.getUploadNum()
                if(num<1){
                    let arr=[]
                    for(let i=0;i<this.fileList.length;i++){
                        if(this.fileList[i].status==this.okStatus){
                            arr.push(this.fileList[i].url)
                        }
                    }
                    this.loading=false
                    let urls=arr.join(',')
                    this.$emit('input',urls)
                    this.$emit('finish',urls)
                }

            },
            //获取待上传的图片
            getUploadList(){
                const that=this
                let arr=this.fileList.filter(item=>{
                    return item.status==that.waitStatus
                })
                return arr
            },
            //获取待上传数量
            getUploadNum(){
                const that=this
                let arr=this.fileList.filter(item=>{
                    return item.status==that.waitStatus
                })
                return arr.length
            },
            //更新列表
            updateUploadList(val){
                this.fileList=[]
                if(val){
                    let arr=this.value.split(',')
                    for (let i=0;i<arr.length;i++){
                        this.fileList.push({
                            status:this.okStatus,
                            url:arr[i]
                        })
                    }
                }
            },
            //手动打开选择图片
            openFile(){
                document.getElementById(this.id).click()
            },
            //删除图片
            removeItem(i){
                this.$delete(this.fileList,i)
                this.outerValue()
            },
            outerValue(){
                let arr=[]
                for(let i=0;i<this.fileList.length;i++){
                    if(this.fileList[i].status==this.okStatus){
                        arr.push(this.fileList[i].url)
                    }
                }
                let urls=arr.join(',')
                this.$emit('input',urls)
            }
        },
        mounted(){
            let n=document.getElementsByClassName('v-file-input').length;
            this.id+=n.toString()
            // setTimeout(()=>{
            //     let f=new File('C:\\fakepath\\libai.JPG','df.png',{type:'image/png'})
            //     document.getElementById(this.id).value=f
            // },500)
            this.updateUploadList(this.value)
        },
        watch:{
            value(val){
                this.updateUploadList(val)
            }
        }
    }
</script>

<style scoped>

</style>
