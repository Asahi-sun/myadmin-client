import React, { Component } from 'react'

import {
  Card,
  Table,
  Button,
  Form,
  Row,
  Col,
  Input,
  message,

} from 'antd'

import moment from 'moment'
import LinkButton from '../../components/LinkButton/linkButton'
import Modal from 'antd/lib/modal/Modal'

import { reqGetRoleList, reqAddRole } from '../../api/index'
import AuthForm from './authForm'

const Item = Form.Item
/**
 * 角色管理
 */
export default class Role extends Component {



  constructor(props) {
    super(props)
    this.formRef = React.createRef()

    this.state = {

      isShowAdd: false, //控制创建角色的Modal打开
      isShowAuth: false, //控制添加权限的Modal打开
      data: [], //所有角色列表
      role: {}, //记录点击设置权限时的该行数据

      // 表头
      initColumns: [
        {
          title: '角色名称',
          dataIndex: 'name',
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          render: (create_time) => {
            return (
              <span>
                {create_time = moment(create_time).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            )
          }
        },
        {
          title: '授权时间',
          dataIndex: 'auth_time',
          render: (auth_time) => {
            return (
              <span>
                {
                  !!auth_time ?
                    auth_time = moment(auth_time).format('YYYY-MM-DD HH:mm:ss')
                    :
                    ''
                }

              </span>
            )
          }

        },
        {
          title: '授权人',
          dataIndex: 'auth_name',
        },
        {
          title: '操作',
          render: (role) => {
            return (
              <div>
                <LinkButton onClick={() => this.handleShowAuth(role)} >
                  设置权限
                </LinkButton>

              </div>
            )
          }
        }
      ],
    }
  }

  // 打开添加权限管理的Modal
  handleShowAuth = (role) => {
    //将该行的role数据保存传给子组件
    this.setState({
      role
    })

    // 打开权限设置的Modal
    this.setState({
      isShowAuth: true
    })
  }

  //关闭添加权限管理的Modal,传递给子组件<AuthForm>
  handleCloseAuth = () => {

    this.setState({
      isShowAuth: false,
    })
  }

  // 点击Button打开创建角色的Modal
  showAddModal = () => {
    this.setState({
      isShowAdd: true
    })
  }

  //创建角色的Modal的确定按钮
  handleOk = () => {

    this.setState({
      isShowAdd: false
    })

    this.formRef.current.validateFields()
      .then(async values => {
        // 发送ajax请求
        const result = await reqAddRole(values.roleName)
        console.log(result)
        if (result.status === 0) {
          // this.setState({
          //   data: [...this.state.data, result.data]
          // })
          message.success('添加角色成功！')
          this.getRoleList()
        } else {
          message.error('添加角色失败！')
        }

      })
      .catch(error => {
        console.log(error)
      })
  }

  //创建角色的Modal的Cancel按钮
  handleCancel = () => {
    this.setState({
      isShowAdd: false
    })
  }

  getRoleList = async () => {
    // 发送角色列表请求
    const result = await reqGetRoleList()
    if (result.status === 0) {
      const data = result.data
      this.setState({
        data
      })
    } else {
      message.error('请求角色列表失败！')
    }

  }

  // UNSAFE_componentWillMount(){

  // }

  componentDidMount() {
    this.getRoleList()
  }


  render() {


    const { initColumns, data, isShowAdd } = this.state

    const title = (
      <Button type="primary" onClick={this.showAddModal}>
        创建角色
      </Button>
    )

    return (
      <div>

        {/* 添加角色Modal */}
        <Modal
          visible={isShowAdd}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          title="添加角色"
        >

          <Form ref={this.formRef}>
            <Item
              label="角色名称"
              name="roleName"
              rules={[
                { required: true, message: '请输入角色名称!' },
              ]}
            >
              <Row justify="center">
                <Col span={24}>
                  <Input placeholder="请输入角色名称" />
                </Col>
              </Row>
            </Item>
          </Form>
        </Modal>

        <Card
          title={title}
        >
          <Table
            bordered
            columns={initColumns}
            dataSource={data}

            pagination={{ defaultPageSize: 3 }}
          />
        </Card>

        {/* 权限设置的组件 */}
        <AuthForm
          isShowAuth={this.state.isShowAuth}
          handleCloseAuth={this.handleCloseAuth}
          role={this.state.role}
          getRoleList = { this.getRoleList }
        />
      </div>
    )
  }
}
