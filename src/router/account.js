import Layout from '../views/com/AdminLayout.vue'
import Info from '../views/account/Info'

export default [
    {
        path:'/account',
        name:'Layout',
        meta:{
            title:'账户管理',
            icon:'mdi-account',
        },
        component:Layout,
        children:[
            {
                path:'account',
                name:'account-info',
                component:Info,
                meta:{
                    title:'账户管理',
                },
                hidden:true
            },
        ]
    },
]
