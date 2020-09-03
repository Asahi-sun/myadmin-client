/**
 * 包含应用中所有请求接口的 函数：接口请求函数
 */

import qs from 'qs';

import jsonp from 'jsonp' //axios不能发jsonp请求
import ajax from './ajax'
import {
    data
} from 'autoprefixer';
import {
    message
} from 'antd';

//  const Base = 'http://localhost:5000'
const Base = ''

//请求登录
export const reqLogin = (username, password) => ajax.post(Base + '/login', {
    username,
    password
})
// export const reqLogin = (username, password) => (
//     ajax({
//         method: 'POST',
//         url: Base + '/login',
//         data: {  //data是对象，默认使用json格式的请求体携带参数数据
//             username,
//             password
//         }
//         // data:qs.stringify({username,password})
//     })
// )
// export function reqLogin(username, password) {
//     return ajax({
//         method: 'POST',
//         url: Base + '/login',
//         data: {  //data是对象，默认使用json格式的请求体携带参数数据
//             username,
//             password
//         }
//         // data:qs.stringify({username,password})
//     })
// }

// const name = 'admin'
// const pwd = 'admin'
// reqLogin(name, pwd).then(
//      result =>{
//         //  const result = result.data
//          console.log('请求成功了',result)
//      },
//      error =>{
//          alert('请求失败了'+ error.message)
//      }
// )


// 发送jsonp请求得到天气信息
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (error, data) => {
            if (!error && data.error === 0) { //成功

                const {
                    dayPictureUrl,
                    weather
                } = data.results[0].weather_data[0]
                resolve({
                    dayPictureUrl,
                    weather
                })
            } else { //失败的
                message.error('获取天气信息失败')
            }
        })
    })

}


// 获取分类列表

export const reqCategorys = () => ajax.get(Base + '/manage/category/list')


// 添加分类
export const reqAddCategory = (categoryName) => ajax.post(
    Base + 'manage/category/add', {
        categoryName: categoryName
    }
)

// 修改分类

export const reqUpdataCategory = ({
    categoryId,
    categoryName
}) => ajax.post(
    Base + '/manage/category/update', {
        categoryId: categoryId,
        categoryName: categoryName
    }
)


// 请求商品分页列表

export const reqGetProducts = (pageNum, pageSize) => ajax(Base + '/manage/product/list', {
    params: { //包含所有query参数的对象
        pageNum,
        pageSize
    }
})



/**
 * 根据Name/desc搜索产品分页列表
 */

export const reqSearchProducts = ({
    pageNum,
    pageSize,
    searchName,
    searchType //它的值是'productName'或者'productDesc'
}) => ajax(Base + '/manage/product/search', {
    // method:'GET'
    params: {
        pageNum,
        pageSize,
        [searchType]: searchName,
    }
})

/**
 * 对商品进行上下架处理
 */

export const reqUpdateStatus = (productId, status) => ajax.post(
    Base + '/manage/product/updateStatus', {
        productId: productId,
        status: status
    }
)

/**
 * 根据商品分类Id获取商品分类
 */
export const reqCategory = (categoryId) => ajax(Base + '/manage/category/info', {
    params: {
        categoryId
    }
})


/**
 * 13.添加商品
 */

export const reqAddProduct = ({
    categoryId,
    name,
    desc,
    price,
    detail,
    imgs
}) => ajax.post(
    Base + '/manage/product/add', {
        categoryId: categoryId,
        name: name,
        desc: desc,
        price: price,
        detail: detail,
        imgs: imgs
    })

/**
 * 更新商品
 */
export const reqUpdateProduct = ({
    _id,
    categoryId,
    name,
    desc,
    price,
    detail,
    imgs
}) => ajax.post(
    Base + '/manage/product/update', {
        _id: _id,
        categoryId: categoryId,
        name: name,
        desc: desc,
        price: price,
        detail: detail,
        imgs: imgs,
        // product
    })

/**
 * 17.删除图片
 */

export const reqDeletePicture = (name) => ajax.post(
    Base + '/manage/img/delete', {
        name
    }
)

/**
 * 19. 获取角色列表
 */

export const reqGetRoleList = () => ajax.get(Base + '/manage/role/list')

/**
 * 新建角色
 * /manage/role/add
 */

export const reqAddRole = (roleName) => ajax.post(Base + '/manage/role/add', {
    roleName
})


/**
 * 给角色设置权限
 */
 export const reqUpdateRole = (_id,menus,auth_time,auth_name) => ajax.post( Base + '/manage/role/update' ,{
    _id:_id,
    menus:menus,
    auth_time:auth_time,
    auth_name:auth_name
 })

 /**
  * 获取所有用户的列表
  */
 export const reqGetUsers = () =>ajax( Base + '/manage/user/list' )


 /**
  * 删除指定用户
  */
 export const reqDeleteUser = (userId) =>ajax.post( Base + '/manage/user/delete',{
    userId:userId
 } )

 /**
  * 添加用户
  */
 export const reqAddUser = (user) =>ajax.post( Base + '/manage/user/add', user )

// export const reqAddUser = ( username,password,phone,email,role_id ) =>ajax.post( Base + '/manage/user/add',{
//     username:username,
//     password:password,
//     phone:phone,
//     email:email,
//     role_id:role_id
// } )

 /**
  * 更新用户
  */
 export const reqUpdateUser = (user) =>ajax.post( Base + '/manage/user/update', user)