<template>
    <div>
        <v-card color="success">
            <v-card-title>
                <v-btn
                        v-if="$op.save()"
                        fab
                        small
                        @click="toAdd">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-row style="max-width: 600px">
                  <v-col cols="12" sm="6">
                    <c-date-picker v-model="form.date"></c-date-picker>
                  </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                                v-model="form.username"
                                label="登录名"
                                single-line
                                hide-details
                        >
                          <template v-slot:append>
                            <v-btn :loading="loading" small icon @click="doSearch"><v-icon>mdi-magnify</v-icon></v-btn>
                          </template>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="dataList"
                    :sort-by="form.order"
                    :sort-desc="desc"
                    class="elevation-0"
                    :loading="loading"
                    loading-text="正在加载数据…"
                    :server-items-length="total"
                    :page="form.page"
                    @update:items-per-page="sizeChange"
                    @update:page="pageChange"
                    @update:sort-by="sortChange"
                    @update:sort-desc="sortOrderChange"
            >
                <template v-slot:item.avatar="{ item }">
                    <v-img width="30" :src="item.avatar"></v-img>
                </template>

                <template v-slot:item.status="{ item }">
                    <v-chip
                            small
                            v-if="item.status==0"
                            class="ma-2"
                            outlined
                    >
                        已禁用
                    </v-chip>
                    <v-chip
                            small
                            v-else
                            class="ma-2"
                            color="success"
                            outlined
                    >
                        正常
                    </v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn icon v-on="on" @click="toMore(item)">
                        <v-icon>
                          mdi-dots-horizontal
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>更多信息</span>
                  </v-tooltip>
                    <v-tooltip top v-if="$op.update()">
                        <template v-slot:activator="{ on }">
                            <v-btn icon color="warning" v-on="on" @click="toEdit(item)">
                                <v-icon>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>编辑</span>
                    </v-tooltip>
                    <v-tooltip top v-if="$op.disable()&&item.status==1">
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" @click="onDisable(item)">
                                <v-icon>
                                    mdi-account-off
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>禁用账号</span>
                    </v-tooltip>
                    <v-tooltip top v-if="$op.disable()&&item.status==0">
                        <template v-slot:activator="{ on }">
                            <v-btn color="success" icon v-on="on" @click="onDisable(item)">
                                <v-icon>
                                    mdi-account-check
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>启用账号</span>
                    </v-tooltip>
                    <v-tooltip top v-if="$op.del()">
                        <template v-slot:activator="{ on }">
                            <v-btn icon color="error" v-on="on" @click="doDelete(item)">
                                <v-icon>
                                    mdi-close
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>删除</span>
                    </v-tooltip>
                </template>
                <template v-slot:no-data>
                    <div>没有数据</div>
                </template>
            </v-data-table>
        </v-card>
        <admin-info ref="info" @callback="callback"></admin-info>
    </div>
</template>

<script>
    import AdminInfo from "./AdminInfo";

    export default {
        name: "AdminList",
        components:{AdminInfo},
        inject:['$toast','$dialog','$op'],
        data: () => ({
            loading: true,
            saving:false,
            headers: [
                { text: '', value: 'avatar',sortable: false },
                {
                    text: '登录名',
                    align: 'start',
                    value: 'username',
                },
                { text: '用户权限', sortable: false,value: 'role.name' },
                { text: '状态', value: 'status' },
                { text: '最近登录时间', value: 'login_time' },
                // { text: '创建时间', value: 'create_time' },
                { text: '', value: 'actions', sortable: false },
            ],
            dataList:[],
            total:0,
            desc:true,
            form:{
                page:1,
                limit:10,
                username:'',
                date:[],
                order:'create_time',
                desc:'desc'
            },
        }),
        created () {
            this.getData()
        },
        methods: {
            getData(){
                this.loading=true
                this.$service.admin.list(this.form).then(res=>{
                  this.dataList=res.data.list
                  this.total=res.data.total
                  this.loading=false
                }).catch(e=>{
                  this.loading=false
                })
            },
            toAdd(){
                this.$router.push({name:'admin-save'})
            },
            toMore(item){

            },
            toEdit(item){
                this.$router.push({name:'admin-update',params:{id:item.id}})
            },
            onDisable(item){
                if(item.status==1){
                    this.$dialog.confirm('确认要禁用此账号吗？','','确认禁用').then(res=>{
                        this.$service.admin.disable({id:item.id,type:'off'}).then(res=>{
                            this.$toast.success(res.msg)
                            this.doSearch()
                        })
                    })
                }else{
                    this.$service.admin.disable({id:item.id,type:'on'}).then(res=>{
                        this.$toast.success(res.msg)
                        this.doSearch()
                    })
                }
            },
            doDelete(item){
                this.$dialog.confirm('确认删除吗？','','确认删除').then(res=>{
                    this.$service.admin.del({id:item.id}).then(res=>{
                        this.$toast.success(res.msg)
                        this.doSearch()
                    })
                })
            },
            doSearch(){
                this.form.page=1
                this.getData()
            },
            pageChange(p){
                this.form.page=p
                this.getData()
            },
            sizeChange(size){
                this.form.limit=size
                this.getData()
            },
            sortChange(v){
                if(v==undefined){
                    this.form.order='update_time'
                    this.form.desc=''
                    this.getData()
                }else{
                    this.form.order=v
                    this.getData()
                }
            },
            sortOrderChange(v){
                if(v==undefined){
                    return
                }
                if(v){
                    this.form.desc='desc'
                }else{
                    this.form.desc=''
                }
                this.getData()
            },
            callback(data){
              console.log('callback',data)
            }
        },
    }
</script>

<style scoped>

</style>
