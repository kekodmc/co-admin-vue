<template>
    <div>
        <v-sheet>
            <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
            >
               <v-row>
                   <v-col cols="12" lg="5">
                       <v-subheader>设置规格</v-subheader>
                       <v-sheet elevation="1" class="pa-3 mb-3" v-for="(item,index) in list" :key="index">
                           <v-row justify="space-between" class="pl-3 pr-2">
                               <v-text-field
                                       class="mt-0"
                                       v-model="item.name"
                                       label="规格名称"
                                       required
                               ></v-text-field>
                               <v-btn icon color="error" @click="remove(index)">
                                   <v-icon>mdi-minus-box</v-icon>
                               </v-btn>
                           </v-row>
                           <format-item
                                   v-model="item.format"
                                   class="mt-0"
                                   @change="resetGoodsFormat"
                           >
                           </format-item>
                       </v-sheet>
                       <v-btn
                               class="mr-4"
                               @click="add"
                       >
                           <v-icon>mdi-plus</v-icon>
                           添加规格
                       </v-btn>
                   </v-col>
                   <v-col cols="12" lg="7">
                       <v-subheader>设置单价/库存</v-subheader>
                       <v-sheet elevation="1">
                           <v-simple-table v-if="formatList.length>0">
                               <template v-slot:default>
                                   <thead>
                                   <tr>
                                       <th class="text-left">规格名称</th>
                                       <th class="text-left">单价/元</th>
                                       <th class="text-left">库存</th>
                                       <th class="text-left">时长/月</th>
                                   </tr>
                                   </thead>
                                   <tbody>
                                   <tr v-for="(item,index) in formatList" :key="'format'+index">
                                       <td>{{ item.name }}</td>
                                       <td>
                                           <v-text-field
                                                   style="max-width: 120px"
                                                   v-model="item.price"
                                                   label="单价"
                                                   type="number"
                                                   @change="formatChange"
                                                   required
                                           >
                                               <template slot="prepend-inner">
                                                   <v-icon>mdi-currency-cny</v-icon>
                                               </template>
                                           </v-text-field>
                                       </td>
                                       <td>
                                           <v-text-field
                                                   style="max-width: 120px"
                                                   v-model="item.num"
                                                   label="库存"
                                                   type="number"
                                                   @change="formatChange"
                                                   required
                                           ></v-text-field>
                                       </td>
                                       <td>
                                           <v-text-field
                                                   style="max-width: 120px"
                                                   v-model="item.month"
                                                   label="时长"
                                                   type="number"
                                                   @change="formatChange"
                                                   required
                                           ></v-text-field>
                                       </td>
                                   </tr>
                                   </tbody>
                               </template>
                           </v-simple-table>
                       </v-sheet>
                   </v-col>
               </v-row>
            </v-form>
        </v-sheet>
    </div>
</template>

<script>
    import FormatItem from './FormatItem'
    import {getWebConfigList} from "../../utils/request/service";

    export default {
        name: "GoodsFormat",
        props:{
            value:{
                type:String,
                default:'',
                required:true,
            },
            Formats:{
                type:Array,
                default: ()=>[]
            }
        },
        components:{
            FormatItem
        },
        data(){
            return{
                loading:false,
                valid: true,
                rules:{
                    username:[
                        v => !!v || '请输入账号',
                    ],
                    password:[
                        v => !!v || '请输入密码',
                    ],
                    code:[
                        v => !!v || '请输入验证码',
                    ]
                },
                list:[{name:'颜色',format:'默认'}],
                formatList:[],
            }
        },
        methods:{
            //重新渲染商品规格
            resetGoodsFormat(){
                let result=[]
                let arr=[]
                for(let i=0;i<this.list.length;i++){
                    arr.push(this.list[i].format.split(','))
                }
                arr.forEach(item=>{
                    // console.log('item',item)
                    if(result.length<1)result=item
                    else{
                        let newList=[];
                        for(let i=0;i<result.length;i++){
                            for (let j=0;j<item.length;j++){
                                newList.push(result[i]+'/'+item[j])
                            }
                        }
                        result=newList
                    }
                })
                for (let i=0;i<this.formatList.length;i++){
                    let is_has=false
                    for (let j=0;j<result.length;j++){
                        if(this.formatList[i]['name']==result[j]){
                            result.splice(j,1)
                            is_has=true
                            continue
                        }
                    }
                    if(!is_has){
                        this.$delete(this.formatList,i)
                    }
                }
                // this.formatList=this.formatList.filter(item=>{
                //     return result.indexOf(item.name)>=0
                // })
                for (let i in result){
                    this.formatList.push({name:result[i],price:'',num:'',month:''})
                }
                this.$emit('input',JSON.stringify(this.list))
                this.$emit('change',{list:this.list,format:this.formatList})
            },
            //规格更新
            formatChange(){
                this.$emit('change',{list:this.list,format:this.formatList})
            },
            add(){
                this.list.push({name:'',format:''})
            },
            remove(i){
                this.$delete(this.list,i)
                this.resetGoodsFormat()
            },
            //初始化数据
            initData(val){
                if(val){
                    this.list=JSON.parse(val)
                }
            }
        },
        created(){
            this.initData(this.value)
            if(this.Formats.length>0){
                this.formatList=this.Formats
            }
        },
        watch:{
            value(val){
                this.initData(val)
            },
            Formats:{
                handler(val){
                    if(val.length>0){
                        this.formatList=val
                        this.resetGoodsFormat()
                    }
                },
                deep:true,
            }
        }
    }
</script>

<style scoped>

</style>
