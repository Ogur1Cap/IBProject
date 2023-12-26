const getmenu = {
    data: 
         [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home.vue',
                children:[]
            },
            {
                label: '记录',
                icon: 'location',
                children: [
                    {
                        path: '/page1',
                        name: 'page1',
                        label: '检修记录',
                        icon: 'notebook-1',
                        url: 'PageOne.vue'
                    },
                    {
                        path: '/page2',
                        name: 'page2',
                        label: '案例记录',
                        icon: 'notebook-1',
                        url: 'PageTwo.vue'
                    }
                ]
            },
            {
                path:'/videopage',
                name:'videopage',
                label:'实时监控',
                icon:'video-camera',
                url:'Video.vue',
                children:[]

            },
            {
                path: '/user',
                name: 'user',
                label: '用户管理',
                icon: 'key',
                url: 'User.vue',
                children:[]
            },
            {
                path:'/Employ',
                name:'Employ',
                label:'人员排班',
                icon:'tickets',
                url:'EmployeeScheduling',
                children:[]

            },
            {
                path:'/userdate',
                name:'userdate',
                label:'个人信息',
                icon:'user',
                url:'UserDate',
                children:[]
            },
            {
                path:'/informationfuti',
                name:'informationfuti',
                label:'扶梯信息',
                icon:'notebook-2',
                url:'InformationFuti.vue',
                children:[]
            },
        ],             
        time: 66666,
        message: '获取成功'
    }
    export default getmenu