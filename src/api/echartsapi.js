import http from '../utils/request'

//-------------个人信息
export const Userdataecharts1 = (data) => {
    return http.get('/users/update', data)
}
export const Userdataecharts2 = (data) => {
    return http.get('/users/update', data)
}

//-------------Home界面
export const Homeecharts = (data) => {
    return http.get('/users/update', data)
}

//-------------可视化界面
export const Bigdataecharts = (data) => {
    return http.get('/datas/data', data)
}