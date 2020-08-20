import React, { Component } from 'react';
import {
    Form,
    Input,
    Icon,
    Button,
} from 'antd';

import {
    UserOutlined,
    LockOutlined
} from '@ant-design/icons';


import logo from './images/logo.png';
import './login.less';



class Login extends Component {  
    
    // const NormalLoginForm = () =>{
    //     const onFinish = values => {
    //         console.log('Received values of form: ', values);
    //     };
    
    // }

    onFinish = values => {
        console.log('Received values of form: ', values);
    };

    render() {  
        
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h1>用户登录</h1>
                    <Form
                        // onFinish={onFinish}
                        onFinish={this.onFinish}
                        className="login-form"
                    >
                        <Form.Item>
                            <Input
                                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input.Password
                                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登 录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}



export default Login


/**
 * （1）必须输入
 * （2）必须大于等于4位
 * （3）必须小于等于12位
 * （4）必须是英文、数字或下划线组成
 */

/**
 * 组件：组件类，本质就是一个构造函数
 * 组件对象：组件类的实例，也就是构造函数的实例
 */