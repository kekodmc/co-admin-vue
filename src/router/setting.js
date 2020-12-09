import Layout from '../views/com/AdminLayout.vue'
import Notice from '../views/setting/Notice'

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
        ]
    },
]
