import http from '../utils/request'

// 请求首页数据,直接把这个对象导出
export const getData = () => {
    // 返回一个promise
    return http.get('/home/getData')
}

//-------------------------------------------------------------------------
// 下面四个:用户管理-后端-网络请求接口
export const getUser = (params) => {
    return http.get('/users/selectByPage', params)
}

export const createUser = (data) => {
    return http.post('/user/create', data)
}

export const userscount = (params) => {
    return http.get('/users/totalnumofpages', params)
}

export const userget = (params) => {
    return http.post('/users/selectByName', params)
}

export const deleteUser = (data) => {
    return http.post('/user/del', data)
}

export const updateUser = (data) => {
    return http.post('/users/update', data)
}

//预警接口
export const Warnning = (data) => {
    return http.get('/warninginfor/get',data)
}
export const deletewarning = (data) => {
    return http.get('/warninginfor/dele',data)
}


// 登录权限
export const getMenu = (data) => {
    return http.post('/users/login',data)
    //return http.post('/permission/getMenu',data)
    //return http.post('/users/login',data)
}
export const Register = (data) => {
    return http.post('/users/regist',data)
}


//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//人员排班
export const getemploye = (params) => {
    return http.get('/scheduling/selectByPage', params)
}

export const createemploye = (data) => {
    return http.post('/scheduling/add', data)
}

export const deleteemploye = (data) => {
    return http.get('/scheduling/delete', data)
}

export const getsearch = (data) => {
    return http.post('/scheduling/selectByName', data , 
    { headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
}

export const getcount = (data) => {
    return http.get('/scheduling/totalnumofpages', data)
}

export const updateemploye = (data) => {
    return http.post('/scheduling/update', data)
}

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//检修记录
export const getRecords = (params) => {
    return http.get('/maintenanceRecords/selectByPage', params)
    ///device/get/
    ///maintenanceRecords/totalnumofpages
}

export const Recordscount = (params) => {
    return http.get('/maintenanceRecords/totalnumofpages', params)

}
export const createRecords = (data) => {
    return http.post('/maintenanceRecords/add', data)
    ///maintenanceRecords/add
    ///device/create
}
export const deleteRecords = (data) => {
    return http.get('/maintenanceRecords/delete', data)
    ///maintenanceRecords/delete
}
export const updateRecords = (data) => {
    return http.post('/maintenanceRecords/update', data)
    ///device/updat
    ///maintenanceRecords/update
}

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//案例记录
export const getCase = (params) => {
    return http.get('/caseRecords/selectByPage', params)
    ///device/get/
    ///maintenanceRecords/totalnumofpages
}
export const createCase = (data) => {
    return http.post('/caseRecords/add', data)
    ///maintenanceRecords/add
    ///device/create
}
export const Casecount = (data) => {
    return http.get('/caseRecords/totalnumofpages', data)
    ///maintenanceRecords/add
}
export const deleteCase = (data) => {
    return http.get('/caseRecords/delete', data)
}
export const updateCase = (data) => {
    return http.post('/caseRecords/update', data)
    ///device/updat
    ///maintenanceRecords/update
}
//案例照片接口
export const checkpothole = (data) => {
    return http.get('', data)
}


//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//电梯
export const stop = (data) => {
    return http.get('/mqtt/publish', data)
}

export const slow = (data) => {
    return http.get('/mqtt/publish', data)
}

export const reset = (data) => {
    return http.get('/mqtt/publish', data)
}

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//扶梯信息
export const getFuti = (params) => {
    return http.get('/escalator/selectByPage', params)
}

export const createFuti = (data) => {
    return http.post('/escalator/add', data)
}

export const futicount = (params) => {
    return http.get('/users/totalnumofpages', params)
}

export const futiget = (params) => {
    return http.get('/escalator/selectByName/{name}', params)
}

export const deleteFuti = (data) => {
    return http.get('/escalator/delete/{id}', data)
}

export const updateFuti = (data) => {
    return http.post('/escalator/update', data)
}


//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//日志
export const getRizhi = (params) => {
    return http.get('/taskandlog/logSelect', params)
}

export const createRizhi = (data) => {
    return http.post('/taskandlog/logAdd', data)
}


export const deleteRizhi = (data) => {
    return http.get('/taskandlog/logDelete/{id}', data)
}

export const updateRizhi = (data) => {
    return http.post('/taskandlog/logUpdate', data)
}


//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//任务指派
export const getRenwu = (params) => {
    return http.get('/taskandlog/taskSelect', params)
}

export const createRenwu  = (data) => {
    return http.post('/taskandlog/taskAdd', data)
}

export const deleteRenwu = (data) => {
    return http.get('/taskandlog/taskDelete/{id}', data)
}

export const updateRenwu = (data) => {
    return http.post('/taskandlog/taskUpdate', data)
}