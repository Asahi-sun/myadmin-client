/**
 * 包含应用中所有请求接口的 函数：接口请求函数
 */

import ajax from './ajax'

//  const Base = 'http://localhost:5000'
const Base = ''

//请求登录
export function reqLogin(username, password) {
    ajax({
        method: 'POST',
        url: Base + '/login',
        data: {
            username,
            password
        }
    })
}

const name = 'admin'
const pwd = 'admin'
reqLogin(name, pwd)

