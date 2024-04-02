import Vue from "vue";
import VueRouter from "vue-router";
import Main from '../Views/Main'
// import Home from '../Views/Home.vue'
// import Mall from '../Views/Mall.vue'
// import User from '../Views/User.vue'
// import PageOne from '../Views/PageOne.vue'
// import PageTwo from '../Views/PageTwo.vue'
import Login from '../Views/Login.vue'
import Cookie from 'js-cookie'
import Register from '@/Views/Register'
import BigData from '@/Views/BigData'
import ViewVr from '@/Views/ViewVr'
import Mall from '@/Views/Mall'
import loutimox from '@/Views/loutimox'
import BigData2 from '@/Views/BigData2'
import BigData3 from '@/Views/BigData3'
import BigData4 from '@/Views/BigData4'

Vue.use(VueRouter)

const routes = [
    // 主路由
    {
        path: '/',
        name:'Main',
        component: Main,
        redirect: '/home', // 重定向
        children: [
            // 子路由
            // { path: '/home', name: 'home', component: Home }, // 首页
            // { path: '/user', name: 'user', component: User }, // 用户管理
            // { path: '/mall', name: 'mall', component: Mall }, // 商品管理
            // { path: '/page1', name: 'page1', component: PageOne }, // 页面1
            // { path: '/page2', name: 'page2', component: PageTwo }, // 页面2
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/bigdata',
        name: 'bigdata',
        component: BigData
    },
    {
        path: '/viewvr',
        name: 'viewvr',
        component: ViewVr
    },
        {
        path: '/futi',
        name: 'futi',
        component: Mall
    },
    {
        path:'/louti',
        name:'louti',
        component: loutimox
    },
    {
        path:'/BigData2',
        name:'BigData2',
        component: BigData2
    },
    {
        path:'/BigData3',
        name:'BigData3',
        component: BigData3
    },{
        path:'/BigData4.vue',
        name:"BigData4",
        component: BigData4
    }
]

const router = new VueRouter({
    routes
})

// 路由守卫:全局前置导航守卫
router.beforeEach((to, from, next) => {
    // 获取token
    const token = Cookie.get('token')

    if (!token && to.name !== 'login'&& to.name !== 'register') {
        next({ name: 'login' })
    } else if (token && to.name === 'login') {
        next({ name: 'home' })
    } else {
        next()
    }
})


export default router