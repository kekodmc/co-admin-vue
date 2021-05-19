import Layout from '../views/com/AdminLayout.vue'
import Notice from '../views/setting/Notice'
import PowerList from "../views/admin/PowerList";
import PowerAdd from "../views/admin/PowerAdd";

export default [
    {
        path:'/setting',
        name:'Layout',
        meta:{
            title:'系统设置',
            icon:'mdi-cog',
        },
        component:Layout,
        children:[
            {
                path:'notice',
                name:'setting-getNotice',
                component:Notice,
                meta:{
                    title:'公告',
                },
            },
            {
                path:'power-index',
                name:'power-index',
                component:PowerList,
                meta:{
                    title:'权限列表',
                },
            },
            {
                path:'power-save',
                name:'power-save',
                component:PowerAdd,
                meta:{
                    title:'新增权限',
                },
                hidden:true,
            },
            {
                path:'power-update/:id',
                name:'power-update',
                component:PowerAdd,
                meta:{
                    title:'编辑权限',
                },
                hidden:true,
            },
        ]
    },
]
