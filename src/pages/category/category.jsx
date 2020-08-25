// 


import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  message,
  Modal,
  Form,
  Input,
} from 'antd';
import {
  PlusOutlined,

} from '@ant-design/icons'

import LinkButton from '../../components/LinkButton/linkButton';
import { reqCategorys, reqAddCategory, reqUpdataCategory } from '../../api/index'
import AddUpdataForm from './add-update-form'


/**
 * 分类管理
 */
export default class Category extends Component {

  formRef = React.createRef();
  state = {
    categorys: [], //所有分裂的数据
    loading: false, //是否正在请求数据中
    showStatus: 0. //0代表不显示，1代表显示添加，2代表显示修改
  }

  // 初始化Table的所有列信息的数组
  initColumns = () => {

    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        render: (category) => <LinkButton onClick={() => {
          this.category = category //保存当前分类，其他地方都可以读取到 
          this.setState({ showStatus: 2 })
        }}>修改分类</LinkButton>,
        width: 300
      },

    ];
  }

  // 异步获取分类列表显示
  getCategorys = async () => {
    // 显示loading
    this.setState({
      loading: true
    })
    // 发异步ajax请求
    const result = await reqCategorys()
    // 隐藏loading
    this.setState({
      loading: false
    })
    if (result.status === 0) { //成功了
      // 取出分类数据列表
      const categorys = result.data
      // 更新状态categorys数据
      this.setState({
        categorys
      })
    } else {
      message.error('获取分类失败')
    }
  }

  /**
   * 点击确定的回调：去添加或者修改分类
   */
  handleOk = () => {
    this.formRef.current.validateFields()
      .then(async values => {
        console.log('values', values)
        const categoryName = values.categoryName

        const { showStatus } = this.state

        let result
        if (showStatus === 1) {
          // 发添加分类的请求
          result = await reqAddCategory(categoryName)
        }else{
          // 修改分类
          const categoryId = this.category._id
          result = await reqUpdataCategory({ categoryId,categoryName })
        }


        this.setState({ showStatus: 0 })

        const action = showStatus ===1? '添加':'修改'

        // 根据响应结果，做不同处理
        if (result.status === 0) {
          
          this.getCategorys()
          message.success(action + '分类成功')
        } else {
          message.error(action + '分类失败')
        }
      })
      .catch(error => {
        console.log(error)
      })

  }


  /**
   * 点击取消的回调
   */

  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }

  UNSAFE_componentWillMount() {

    this.initColumns()
  }

  componentDidMount() {
    this.getCategorys()
  }

  render() {

    // 取出状态数据
    const { categorys, loading, showStatus } = this.state

    // 读取更新的分类的名称
    const category = this.category || {}

    // Card右上角的结构
    const extra = (
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => { this.setState({ showStatus: 1 }) }}
      >
        添加
      </Button>
    )

    return (
      <div>
        <Card
          className="category-card"
          extra={extra}
        >
          <Table
            id="category-table-id"
            className="category-table"
            bordered
            rowKey="_id"
            loading={loading}
            columns={this.columns}
            dataSource={categorys}

            pagination={
              {
                position: ['bottomLeft'],
                defaultPageSize: 6,
                showQuickJumper: true,

              }
            }
          >
          </Table>

          {showStatus !== 0 && <Modal
            title={showStatus === 1 ? '添加分类' : '修改分类'}
            visible={showStatus !== 0}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            {/* 将子组件传递过来的form对象传递到当前组件对象上 */}
            {/* <AddUpdataForm setForm={form => this.form = form} ref={this.myRef} /> */}


            <Form ref={this.formRef}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                name="categoryName"
                initialValue={
                  category.name || ''
                }
                rules={[
                  { required: true, message: '请输入分类名称' }]
                }
              >
                <Input type="text" placeholder="请输入分类名称" />
              </Form.Item>
            </Form>

          </Modal>}
        </Card>
      </div>
    )
  }
}

function setForm() {

}
