import Layout from '../views/com/AdminLayout.vue'
import List from '../views/admin/AdminList'
import Add from '../views/admin/AdminAdd'
import RoleList from '../views/admin/RoleList'
import RoleAdd from '../views/admin/RoleAdd'

export default [
    {
        path:'/admin',
        name:'Layout',
        meta:{
            title:'管理员',
            icon:'mdi-account',
            color:'success'
        },
        component:Layout,
        children:[
            {
                path:'admin-index',
                name:'admin-index',
                component:List,
                meta:{
                    title:'管理员列表',
                },
            },
            {
                path:'admin-save',
                name:'admin-save',
                component:Add,
                meta:{
                    title:'新增管理员',
                },
                hidden:true,
            },
            {
                path:'admin-update/:id',
                name:'admin-update',
                component:Add,
                meta:{
                    title:'编辑管理员',
                },
                hidden:true,
            },
            {
                path:'role-index',
                name:'role-index',
                component:RoleList,
                meta:{
                    title:'角色列表',
                },
            },
            {
                path:'role-save',
                name:'role-save',
                component:RoleAdd,
                meta:{
                    title:'新增角色',
                },
                hidden:true,
            },
            {
                path:'role-update/:id',
                name:'role-update',
                component:RoleAdd,
                meta:{
                    title:'编辑角色',
                },
                hidden:true,
            },
        ]
    },
]
