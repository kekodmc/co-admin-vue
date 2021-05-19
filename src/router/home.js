import Layout from '../views/com/AdminLayout.vue'
import Index from '../views/index/Index'

export default [
    {
        path:'/index',
        name:'Layout',
        // redirect:'/',
        meta:{
            icon:'mdi-chart-tree',
            title:'概览',
            color:'error',
        },
        component:Layout,
        children:[
            {
                path:'',
                name:'index-index',
                component:Index,
                meta:{
                    title:'概览',
                }
            },
        ]
    }
]
