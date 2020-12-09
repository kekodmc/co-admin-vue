import Login from '../views/Login.vue'
import notFound from '../views/404.vue'
import Index from '../views/Index'

export default [
    {
        path:'/',
        name:'Index',
        component:Index,
    },
    {
        path:'/login',
        name:'Login',
        component:Login,
    },
    {
        path:'*',
        name:'NotFound',
        component:notFound,
    }
]
