import Mock from 'mockjs'
export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        // 先判断用户是否存在
        // 判断账号和密码是否对应
        if (username === 'admin' && password === 'admin') {
            return {
                code: 20000,
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
                        }
                    ],             
                    time: Mock.Random.guid(),
                    message: '获取成功'
                }
        } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'Home.vue'
                        },
                        {
                            path: '/video',
                            name: 'video',
                            label: '商品管理',
                            icon: 'video-play',
                            url: 'Mall.vue'
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '密码错误'
                }
            }
        }

    }
}