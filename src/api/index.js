/**
 * 包含应用中所有请求接口的 函数：接口请求函数
 */

import qs from 'qs';

import jsonp from 'jsonp' //axios不能发jsonp请求
import ajax from './ajax'
import { data } from 'autoprefixer';
import { message } from 'antd';

//  const Base = 'http://localhost:5000'
const Base = ''

//请求登录
export const reqLogin = (username, password) =>ajax.post(Base + '/login',{ username,password })
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
export const reqWeather = (city) =>{
    return new Promise((resolve,reject)=>{
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(error,data)=>{
            if(!error && data.error === 0){ //成功

                const {dayPictureUrl, weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl ,weather })
            }else{ //失败的
                message.error('获取天气信息失败')
            }
        }) 
    })
    
}


// 获取分类列表

export const reqCategorys = () => ajax.get(Base + '/manage/category/list')


// 添加分类
export const reqAddCategory = (categoryName) => ajax.post(
    Base + 'manage/category/add',
    { 
        categoryName:categoryName 
    }
)

// 修改分类

export const reqUpdataCategory = ({categoryId,categoryName}) => ajax.post(
    Base + '/manage/category/update',
    { 
        categoryId:categoryId,
        categoryName:categoryName 
    }
)


// 请求商品分页列表

export const reqGetProducts = (pageNum,pageSize)=>ajax( Base + '/manage/product/list',{ 
    params:{ //包含所有query参数的对象
        pageNum,
        pageSize
    }
 })