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
                        onFinish={this.onFinish}
                        className = "login-form"
                    >
                        <Form.Item>
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="用户名"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input.Password
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit"  className="login-form-button">
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