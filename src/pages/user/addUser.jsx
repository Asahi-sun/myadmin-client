import React, { Component } from 'react'
import {
    Modal,
    Form,
    Input,
    Select,
    message,
} from 'antd'

import { reqAddUser } from '../../api/index'


const Item = Form.Item
const { Option } = Select

export default class AddUser extends Component {

    constructor(props) {
        super(props)
        this.addFormRef = React.createRef()

        this.state = {

        }
    }

    handleOk = () => {

        // 关闭Modal
        this.props.closeAddModal()

        this.addFormRef.current.validateFields()
            .then(async values=>{
                const user = values
                console.log(user,'user')
                // 发送请求
                // const result =await reqAddUser(user.username,user.password,user.phone,user.email,user.role_id)
                const result =await reqAddUser(user)
                console.log(result,'result')
                if(result.status === 0){
                    message.success('添加用户成功!')
                    this.props.getUser()
                }else{
                    message.error('添加用户失败！')
                }
            }
                

            ).catch(error => {
                console.log(error)
            })
    }

    handleCancel = () => {
        this.props.closeAddModal()

    }

    render() {

        const { roles } = this.props

        // 指定Form中所有Item的布局
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 17 },
        }

        return (
            <div>

                <Modal
                    visible={this.props.isShowAdd}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    title="添加角色"
                >



                    <Form
                        ref={this.addFormRef}
                        {...formItemLayout}
                    >
                        <Item
                            label='用户名'
                            name='username'
                            rules={[
                                { required: true, message: '请输入用户名！' }
                            ]}
                        >
                            <Input placeholder="请输入用户民"/>
                        </Item>

                        <Item
                            label='密码'
                            name='password'
                            rules={[
                                { required: true, message: '请输入密码！' }
                            ]}
                        >
                            <Input.Password placeholder="请输入密码"/>
                        </Item>

                        <Item
                            label='手机号'
                            name='phone'
                            rules={[
                                { required: true, message: '请输入手机号！' }
                            ]}
                        >
                            <Input placeholder="请输入手机号"/>
                        </Item>

                        <Item
                            label='邮箱'
                            name='email'
                            rules={[
                                { required: true, message: '请输入邮箱！' }
                            ]}
                        >
                            <Input placeholder="请输入邮箱"/>
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
                </Modal>
            </div>
        )
    }
}
