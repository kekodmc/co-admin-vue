<template>
    <div>
        <v-app>
            <v-navigation-drawer
                    v-model="drawer"
                    app
                    clipped
            >
                <v-list>
                   <template v-for="(item,index) in $store.state.menuList" v-if="!item.hidden">
                       <v-list-item-group v-model="selectName">
                           <v-list-item
                                   v-if="item.children.length==1"
                                   :key="index"
                                   :value="item.children[0].name"
                                   :to="{name:item.children[0].name}"
                           >
                               <v-list-item-icon>
                                   <v-icon>{{item.meta.icon}}</v-icon>
                               </v-list-item-icon>

                               <v-list-item-title>{{item.children[0].meta.title}}</v-list-item-title>
                           </v-list-item>
                           <v-list-group
                                   v-else
                                   :value="true"
                                   :prepend-icon="item.meta.icon"
                                   no-action
                           >
                               <template v-slot:activator>
                                   <v-list-item-content>
                                       <v-list-item-title v-text="item.meta.title"></v-list-item-title>
                                   </v-list-item-content>
                               </template>

                               <v-list-item
                                       v-for="child in item.children"
                                       :key="child.name"
                                       :to="{name:child.name}"
                                       v-if="!child.hidden"
                                       :value="child.name"
                               >
                                   <v-list-item-content>
                                       <v-list-item-title v-text="child.meta.title"></v-list-item-title>
                                   </v-list-item-content>
                               </v-list-item>
                           </v-list-group>
                       </v-list-item-group>
                   </template>
                </v-list>

                <template v-slot:append>
                    <div class="pa-2">
                        <v-btn block color="error" @click="logout">
                            <v-icon>mdi-power</v-icon>
                            退出登录
                        </v-btn>
                    </div>
                </template>
            </v-navigation-drawer>

            <v-app-bar
                    app
                    clipped-left
                    dense
            >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-avatar
                        style="cursor: pointer"
                        @click="toHome"
                        class="mx-4"
                        size="30"
                        rounded
                >
                    <v-img src="/favicon.ico"></v-img>
                </v-avatar>
                <v-toolbar-title class="mr-12 align-center" @click="toHome" style="cursor: pointer">
                    <span class="title">管理后台</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-switch
                        v-model="$vuetify.theme.dark"
                        label="暗色"
                        color="indigo"
                        hide-details
                        @change="changeTheme"
                ></v-switch>
            </v-app-bar>

            <v-main class="pl-0">
                <v-container>
                    <router-view></router-view>
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>

<script>
    import {setToken,setData,getData} from "../../utils/base";

    export default {
        name: "AdminLayout",
        props: {
            source: String,
        },
        provide() {
            return {
                $op:{
                    save:()=>this.op.save,
                    update:()=>this.op.update,
                    del:()=>this.op.del,
                    disable:()=>this.op.disable,
                }
            }
        },
        inject:['$toast','$dialog'],
        data: () => ({
            drawer: null,
            selectName:'',
            op:{
                save:false,
                update:false,
                del:false,
                disable:false,
            },
        }),
        created () {
            let name=this.$route.name.split('-')
            this.checkPower(name[0])
        },
        methods:{
            logout(){
                this.$dialog.confirm('确认要退出登录吗？','提示','继续退出','取消','error').then(res=>{
                    this.$service.common.logout({})
                    setToken('')
                    setData('power','')
                    this.$toast.success('退出登录成功')
                    this.$router.push('/')
                })
            },
            toHome(){
                this.$router.push('/')
            },
            //检查操作按钮权限
            checkPower(name){
                let power=getData('power')
                if(!power)return
                let powerList=power.split(',')
                this.op.save=powerList.indexOf(name+'-save')>=0
                this.op.update=powerList.indexOf(name+'-update')>=0
                this.op.del=powerList.indexOf(name+'-delete')>=0
                this.op.disable=powerList.indexOf(name+'-disable')>=0
            },
            changeTheme(){
                if(this.$vuetify.theme.dark){
                    setData('theme','dark')
                }else{
                    setData('theme','')
                }
            },
        },
        watch:{
            '$route':function(to,form){
                let name=to.name.split('-')
                this.checkPower(name[0])
            }
        }
    }
</script>

<style scoped>

</style>
