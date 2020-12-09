<template>
    <div>
        <v-card>
            <rich-box v-model="form.content"></rich-box>
            <v-row
                    justify="space-around"
                    align="center"
            >
                <v-btn @click="save" class="mt-3 mb-3" :loading="loading">保存</v-btn>
            </v-row>
        </v-card>
    </div>
</template>

<script>
    import RichBox from '../com/RichBox'
    export default {
        name: "Index",
        inject:['$toast'],
        components:{
            RichBox
        },
        data(){
            return{
                form:{
                    content:'',
                },
                loading:false
            }
        },
        created(){
            this.$service.setting.getNotice().then(res=>{
                this.form=res.data
            })
        },
        methods:{
            save(){
                this.loading=true
                this.$service.setting.setNotice(this.form).then(res=>{
                    this.$toast.success(res.msg)
                    this.loading=false
                }).catch(e=>{
                    this.loading=false
                })
            }
        }
    }
</script>

<style scoped>

</style>
