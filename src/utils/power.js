import router from '../router/index'
import store from '../utils/store'
import {getData} from "./base";
import home from '../router/home'
import admin from '../router/admin'
import setting from '../router/setting'

export function checkPower(){
    var power=getData('power')
    if(!power)return
    var powerList=power.split(',')
    var list=[
        ...home,
        ...admin,
        ...setting,
    ]
    var newList=[]
    list.forEach((item,i)=>{
        var newChildren=[]
        item.children.forEach((it,k)=>{
            if(powerList.indexOf(it.name)>=0){
                newChildren.push(it)
            }
        })
        if(newChildren.length>0){
            item.children=newChildren
            newList.push(item)
        }
    })
    router.addRoutes(newList)
    store.commit('setMenuList',newList)
}
