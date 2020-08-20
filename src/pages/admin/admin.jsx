import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Admin extends Component {
    render() {

        //  读取保存的user，如果不存在，直接跳转到登录界面
        const user = JSON.parse(localStorage.getItem('user_key') || '{ }')
        if(!user._id){
            this.props.history.replace('/login')  //事件回调函数中进行路由跳转
            return <Redirect to='/login' />  //自动跳转到指定的路由路径
        }


        return (
            <div>
                hello,{ user.username }
            </div>
        )
    }
}

export default Admin
