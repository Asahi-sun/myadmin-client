import React, { Component } from 'react'
import {
    Modal,
    Form,
    Input,
    Select,
    message,
} from 'antd'

import { reqUpdateUser } from '../../api/index'

const Item = Form.Item
const { Option } = Select

export default class UpdateUser extends Component {

    constructor(props){
        super(props)
        this.updataRef = React.createRef()
        this.state={

        }
    }

    handleOk = () => {

        // 关闭Modal
        this.props.closeUpdateModal()

        this.updataRef.current.validateFields()
            .then(async values => {
                const user = values
                // 添加_id属性
                user['_id'] = this.props.user._id
                // 发送请求
                const result = await reqUpdateUser(user)
                console.log(result, 'result')
                if (result.status === 0) {
                    message.success('修改用户信息成功!')
                    this.props.getUser()
                } else {
                    message.error('修改用户信息失败！')
                }
            }


            ).catch(error => {
                console.log(error)
            })
    }

    handleCancel = () => {
        this.props.closeUpdateModal()

    }

    render() {

        const { roles, user } = this.props

        // 指定Form中所有Item的布局
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 17 },
        }

        return (
            <div>
                {this.props.isShowUpdate&&<Modal
                    visible={this.props.isShowUpdate}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    title="添加角色"
                >

                    <Form
                        initialValues={
                            {
                                username: user.username,
                                phone: user.phone,
                                email: user.email,
                                role_id: user.role_id
                            }
                        }
                        ref={this.updataRef}
                        {...formItemLayout}
                    >
                        <Item
                            label='用户名'
                            name='username'
                            rules={[
                                { required: true, message: '请输入用户名！' }
                            ]}
                        >
                            <Input placeholder="请输入用户名" />
                        </Item>

                        <Item
                            label='手机号'
                            name='phone'
                            rules={[
                                { required: true, message: '请输入手机号！' }
                            ]}
                        >
                            <Input placeholder="请输入手机号" />
                        </Item>

                        <Item
                            label='邮箱'
                            name='email'
                            rules={[
                                { required: true, message: '请输入邮箱！' }
                            ]}
                        >
                            <Input placeholder="请输入邮箱" />
                        </Item>

                        <Item
                            label='角色'
                            name='role_id'
                            rules={[
                                { required: true, message: '请选择角色！' }
                            ]}
                        >
                            <Select placeholder="请选择角色">
                                {
                                    roles.map(role => <Option key={role._id} value={role._id}> {role.name} </Option>)
                                }
                            </Select>
                        </Item>
                    </Form>
                </Modal>}
            </div>
        )
    }
}
