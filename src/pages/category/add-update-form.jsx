import React, { Component, createRef } from 'react'

import {
    Form,
    Input,
    Button,
} from 'antd'


const Item = Form.Item

/**
 * 添加分类的Form组件
 */
export default class AddUpdataForm extends Component {

    onFinish = values => {
        console.log('Success:', values);
    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

   
    render() {
  
        console.log(this.props.setForm)

        return (
            <Form 
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    name="username"
                    rules={[
                        { required: true, message: '请输入分类名称' }]
                    }
                >
                    <Input type="text" placeholder="请输入分类名称" />
                </Form.Item>
            </Form>
        )
    }
}

