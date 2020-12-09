<template>
    <div>
        <v-card>
            <v-card-title>
                <v-btn
                        v-if="$op.save()"
                        fab
                        small
                        @click="toAdd">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn :loading="loading" icon @click="doSearch">
                    <v-icon>sync</v-icon>
                </v-btn>
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
                <template v-slot:item.type="{ item }">
                    <v-chip
                            small
                            v-if="item.type==0"
                            class="ma-2"
                            color="success"
                    >
                        权限
                    </v-chip>
                    <v-chip
                            small
                            v-else
                            class="ma-2"
                            color="primary"
                    >
                        模块
                    </v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
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
    </div>
</template>

<script>

    export default {
        name: "PowerList",
        inject:['$toast','$dialog','$op'],
        data: () => ({
            loading: true,
            saving:false,
            headers: [
                {
                    text: '名称',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: '类型', value: 'type' },
                { text: '控制器', value: 'controller' },
                { text: '方法', value: 'action' },
                { text: '排序', value: 'sort' },
                { text: '创建时间', value: 'create_time' },
                { text: '', value: 'actions', sortable: false },
            ],
            dataList:[],
            total:0,
            desc:true,
            form:{
                page:1,
                limit:10,
                username:'',
                order:'create_time',
                desc:'desc'
            },
        }),
        created () {
            this.getData()
        },
        methods: {
            getData(){
                const that=this
                that.loading=true
                this.$service.power.list(this.form).then(res=>{
                    that.dataList=res.data.list
                    that.total=res.data.total
                    that.loading=false
                }).catch(e=>{
                    that.loading=false
                })
            },
            toAdd(){
                this.$router.push({name:'power-save'})
            },
            toMore(item){
                this.$router.push({name:'OrderInfo',params:{id:item.id}})
            },
            toEdit(item){
                this.$router.push({name:'power-update',params:{id:item.id}})
            },
            doDelete(item){
                this.$dialog.confirm('确认删除吗？','','确认删除').then(res=>{
                    this.$service.power.del(item).then(res=>{
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
            }
        },
    }
</script>

<style scoped>

</style>
