import React, { Component } from 'react';
import logo from './images/logo.png';
import './login.less';

class Login extends Component {

    render() {
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h1>用户登录</h1>
                    <div> From组件 </div>
                </div>
            </div>
        )
    }
}

export default Login