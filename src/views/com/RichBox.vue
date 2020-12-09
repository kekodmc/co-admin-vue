<template>
    <div :class="['editor',{editor_dark:theme.isDark}]">
        <editor v-if="status" id="tinymce" v-model="content" :init="config" @input="changeContent"></editor>
    </div>
</template>

<script>
    //导入核心组件
    import 'tinymce/tinymce'
    import Editor from '@tinymce/tinymce-vue'
    //导入主题
    import 'tinymce/themes/silver/theme'
    import 'tinymce/themes/mobile/theme'
    import 'tinymce/icons/default/icons'
    //导入插件
    import 'tinymce/plugins/advlist'
    import 'tinymce/plugins/autolink'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/hr'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/charmap'
    import 'tinymce/plugins/print'
    import 'tinymce/plugins/preview'
    import 'tinymce/plugins/anchor'
    import 'tinymce/plugins/searchreplace'
    import 'tinymce/plugins/visualblocks'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/fullscreen'
    import 'tinymce/plugins/insertdatetime'
    import 'tinymce/plugins/media'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/paste'
    import 'tinymce/plugins/imagetools'
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/codesample'
    import 'tinymce/plugins/save'
    import 'tinymce/plugins/autoresize'
    //配置插件
    const toolbars="undo redo save | fullscreen preview code removeformat | " +
        "link image media codesample table | bold italic underline strikethrough forecolor backcolor | formatselect | fontselect | fontsizeselect | " +
        "| alignleft aligncenter alignright alignjustify  | hr charmap superscript subscript " +
        "| bullist numlist outdent indent ";
    //导入业务包

    export default {
        name: "RichBox",
        props:{
            value:{
                type:String,
                default:'',
                require:true
            }
        },
        inject: ['theme'],
        components:{
            Editor
        },
        data(){
            return{
                status:true,
                content:this.value,
                config:{
                    // icons_url:"/tinymce/icons/default/icons.min.js",
                    language_url:'/tinymce/langs/zh_CN.js',//语言包的路径
                    language: 'zh_CN',//语言
                    skin_url: this.theme.isDark?'/tinymce/skins/ui/oxide-dark':'/tinymce/skins/ui/oxide',//skin路径
                    content_css: this.theme.isDark?'/tinymce/skins/content/dark/content.min.css':'/tinymce/skins/content/default/content.min.css',
                    // content_style:'a{color:red}',
                    // skin: 'oxide-dark',
                    // content_css: 'dark',
                    min_height: 600,//编辑器最小高度
                    max_height:1000,//编辑器最大高度
                    branding: false,//是否禁用“Powered by TinyMCE”
                    menubar: false,//顶部菜单栏显示
                    // plugins: 'fullscreen',
                    plugins: [
                        "advlist autolink lists link hr image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste imagetools", //wordcount
                        "codesample save autoresize"
                    ],
                    toolbar_mode: 'sliding',
                    toolbar: toolbars,
                    //自定义上传
                    images_upload_handler:this.customUploadImage,
                    //自定义保存
                    save_onsavecallback:this.onSave,
                    codesample_global_prismjs: true,
                    //自定义字体
                    font_formats:"微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
                }
            }
        },
        methods:{
            //自定义图片上传
            customUploadImage(blobInfo, success, failure){
                blobInfo.file=blobInfo.blob()
                this.customUpload(blobInfo).then(url=>{
                    success(url)
                }).catch(err=>{
                    failure(err)
                })
            },
            //开始上传
            customUpload ($file) {
                return new Promise((resolve,reject)=>{
                    let $config = {
                        data: {
                            type:'content'
                        }
                    }
                    this.$service.common.upload($file.file, $config).then(res => {
                        if (res.code === 200) {
                            resolve(res.data.url)
                        } else {
                            reject(res.msg)
                        }
                    }).catch(e=>{
                        reject(e.msg)
                    })
                })
            },
            onSave(){
                this.$emit('save')
            },
            changeContent(v){
                this.$emit('input',v)
            }
        },
        watch:{
            value(newValue){
                this.content=newValue
            },
            //主题变更
            'theme.isDark':function(newValue){
                this.status=false
                this.config.skin_url=newValue?'/tinymce/skins/ui/oxide-dark':'/tinymce/skins/ui/oxide';//skin路径
                this.config.content_css=newValue?'/tinymce/skins/content/dark/content.min.css':'/tinymce/skins/content/default/content.min.css';
                let obj=document.getElementsByTagName('head')[0]
                if(obj.lastChild.nodeName=='LINK'&&obj.lastChild.href.indexOf('/ui/oxide')>=0){
                    obj.lastChild.remove()
                }
                this.$nextTick(()=>{
                    this.status=true
                    this.$nextTick(()=>{
                        if(obj.lastChild.nodeName!='LINK'||obj.lastChild.href.indexOf('/ui/oxide')<0){
                            let link=document.createElement('link')
                            link.rel='stylesheet'
                            link.type='text/css'
                            link.class='tinymce_skin'
                            link.href=this.config.skin_url+'/skin.min.css'
                            obj.appendChild(link)
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .editor>>>.tox-editor-container{
        background: #eeeeee;
    }
    .editor_dark>>>.tox-editor-container{
        background: #121212;
    }
    .editor>>>.tox-sidebar-wrap{
        width: 100%;
        max-width: 1000px;
        margin: auto;
    }
</style>
<style>
    .tox .tox-dropzone{
        background: transparent !important;
    }
</style>
