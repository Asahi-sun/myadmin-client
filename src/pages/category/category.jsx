import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  message,
  Modal,

} from 'antd';
import {
  PlusOutlined,

} from '@ant-design/icons'

import LinkButton from '../../components/LinkButton/linkButton';
import { reqCategorys } from '../../api/index'
import AddUpdataForm from './add-update-form'


/**
 * 分类管理
 */
export default class Category extends Component {

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
        render: () => <LinkButton>修改分类</LinkButton>,
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

  }

  /**
   * 点击取消的回调
   */

  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }

  componentWillMount() {

    this.initColumns()
  }

  componentDidMount() {
    this.getCategorys()
  }

  render() {

    // 取出状态数据
    const { categorys, loading, showStatus } = this.state

    // Card右上角的结构
    const extra = (
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick = { ()=>{ this.setState({ showStatus: 1 }) } }
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
                defaultPageSize: 5,
                showQuickJumper: true,

              }
            }
          >
          </Table>

          <Modal
            title={showStatus === 1 ? '添加分类' : '更新分类'}
            visible={showStatus !== 0}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <AddUpdataForm />
          </Modal>

        </Card>
      </div>
    )
  }
}
