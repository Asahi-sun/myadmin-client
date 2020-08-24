import React, { Component } from 'react'

import {
    Form,
    Input,
} from 'antd'

const Item = Form.Item

/**
 * 添加分类的Form组件
 */
export default class AddUpdataForm extends Component {
    render() {
        return (
            <Form>
                <Form.Item
                    name="username"
                    rules={[
                        { required: true, message: '请输入分类名称' }]
                    }
                >
                    <Input placeholder="请输入分类名称" />
                </Form.Item>
            </Form>
        )
    }
}
