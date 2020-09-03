import React, { Component } from 'react'

import {
  Card,
  Table,
  Button,
  message,

} from 'antd'

import { reqGetUsers } from '../../api/index'
import LinkButton from '../../components/LinkButton/linkButton'
import AddUser from './addUser'
import UpdateUser from './updateUser'
import moment from 'moment'

import { reqDeleteUser } from '../../api/index'

/**
 * 用户管理
 */
export default class User extends Component {

  constructor(props) {
    super(props)


    this.state = {
      isShowAdd: false,
      isShowUpdate: false,
      users: [],
      roles: [],
      user: {}, //修改用户时传给子组件的当前行用户信息

      initColumns: [
        {
          title: '用户名',
          dataIndex: 'username',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
        },
        {
          title: '电话',
          dataIndex: 'phone',
        },
        {
          title: '注册时间',
          dataIndex: 'create_time',
          render: create_time => moment(create_time).format('YYYY-MM-DD HH:MM:SS')
        },
        {
          title: '所属角色',
          dataIndex: 'role_id',
          render: role_id => this.roleNames[role_id]
        },
        {
          title: '操作',
          render: (user) => {
            const userId = user._id
            return (
              <div>
                <LinkButton onClick={() => this.openUpdateModal(user)}>修改</LinkButton>
                <LinkButton onClick={() => this.deleteUser(userId) }>删除</LinkButton>
              </div>
            )
          }
        },
      ]


    }
  }

  // 删除用户
  deleteUser =async (userId)=>{
    
    // 发送删除用户的ajax请求
    const result =await reqDeleteUser(userId)
    console.log(result,'result')
    if(result.status === 0){
      message.success('删除用户成功！')
      // 更新用户列表
      this.getUser()
    }else{
      message.error('删除用户失败!')
    }

  }


  //打开添加用户的Modal  
  openAddModal = () => {

    this.setState({
      isShowAdd: true,
    })
  }

  // 关闭添加用户的Modal
  closeAddModal = () => {
    this.setState({
      isShowAdd: false
    })
  }

  // 打开更新用户的Modal
  openUpdateModal = (user) => {
    this.setState({
      user
    })

    this.setState({
      isShowUpdate: true
    })
  }

  //关闭更新用户的Modal 
  closeUpdateModal = () => {
    this.setState({
      isShowUpdate: false
    })
  }


  // 获取用户列表地
  getUser = async () => {
    // 发送请求
    const result = await reqGetUsers()

    const { roles, users } = result.data

    this.roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})

    if (result.status === 0) {
      this.setState({
        users,
        roles
      })
    } else {
      message.error('请求失败！')
    }
  }


  componentDidMount() {
    this.getUser()
  }

  render() {

    const { isShowAdd, initColumns, users, roles, isShowUpdate, user } = this.state

    const title = (
      <Button type="primary" onClick={this.openAddModal}>
        创建用户
      </Button>
    )

    return (
      <div>
        <Card
          title={title}
        >
          <Table
            bordered
            columns={initColumns}
            dataSource={users}

            pagination={{
              defaultPageSize: 3
            }}
          />
        </Card>

        {/* 添加用户组件 */}
        <AddUser
          isShowAdd={isShowAdd}
          getUser={this.getUser}
          closeAddModal={this.closeAddModal}
          roles={roles}
        />

        {/* 修改用户组件 */}
        <UpdateUser
          closeUpdateModal={this.closeUpdateModal}
          getUser={this.getUser}
          isShowUpdate={isShowUpdate}
          roles={roles}
          user={user}
        />
      </div>
    )
  }
}
