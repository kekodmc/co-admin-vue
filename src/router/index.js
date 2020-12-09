import Vue from 'vue'
import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from "../utils/base";
import common from './common'

Vue.use(VueRouter)

const routes = [
    ...common,
]

const router = new VueRouter({
    mode:'history',
    routes:routes
})

const safeList=['Login','NotFound']; //免登录白名单

router.beforeEach((to, from, next) => {
    NProgress.start()
    if(to.matched.length==0){
        //找不到页面
        next('/404')
    }
    if(!getToken()&&safeList.indexOf(to.name)<0){
        next('/login')
        NProgress.done()
    }else{
        next()
    }
})

router.afterEach(() => {
    NProgress.done()
})

export default router
