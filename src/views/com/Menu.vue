<template>
    <div>
        <v-text-field
                flat
                dense
                solo
                rounded
                :background-color="theme.isDark?'':'#eee'"
                clearable
                @compositionstart="changeStatus($event,false)"
                @compositionend="changeStatus($event,true)"
                @input="changeSearch"
                color="default"
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="搜索关键字"
                class="ma-3"
        ></v-text-field>
        <v-divider></v-divider>
        <v-treeview
                dense
                @update:active="change"
                activatable
                :search="searchData"
                color="default"
                :open.sync="openList"
                :active="activeList"
                transition
                return-object
                hoverable
                :items="list"
                item-children="children"
                item-key="aid"
                item-text="title">
            <template v-slot:label="{item}">
                <v-list-item
                        inactive
                        :ripple="false"
                        style="cursor: pointer"
                        @click="callback=true"
                        v-html="item.title">
                </v-list-item>
            </template>
        </v-treeview>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        inject: ['theme'],
        props:{
            active:{
                type:Array,
                default:()=>{
                    return []
                },
            },
            open:{
                type:Array,
                default:()=>{
                    return []
                },
            },
            data:{
                type:Array,
                default:()=>{
                    return []
                },
                require:true,
            },
            search:{
                type:String,
                default:''
            }
        },
        data(){
            return{
                openList:this.open,
                list:this.data,
                activeList:this.active,
                searchData:this.search,
                searchAble:true,
                timeout:null,
                callback:false
            }
        },
        methods:{
            change(arr){
                if(this.callback){
                    let item=arr[0]
                    this.$emit('change',item)
                }
            },
            changeSearch(value){
                if(!this.searchAble){
                    return
                }
                if(this.timeout){
                    clearTimeout(this.timeout)
                    this.returnKeyword(value)
                }else{
                    this.returnKeyword(value)
                }
            },
            changeStatus(e,r){
                this.searchAble=r
                if(r){
                    this.returnKeyword(e.target.value)
                }
            },
            returnKeyword(value){
                this.timeout=setTimeout(()=>{
                    this.$emit('keyword',value)
                },500)
            }

        },
        watch: {
            data: {
                handler(newValue, oldValue) {
                    this.list=newValue
                },
                deep: true
            },
            active: {
                handler(newValue, oldValue) {
                    this.callback=false
                    this.activeList=newValue
                },
                deep: true
            },
            open: {
                handler(newValue, oldValue) {
                    this.openList=newValue
                },
                deep: true
            },
            search(newValue){
                this.searchData=newValue
            }
        }
    }
</script>

<style scoped>

</style>