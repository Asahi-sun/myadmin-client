import React, { Component } from 'react'

import {
  Card,
  Table,
  Button,
  Input,
  Select,
} from 'antd';

import {
  PlusOutlined,

} from '@ant-design/icons'

import './product.less'
import LinkButton from '../../components/LinkButton/linkButton'
import { reqGetProducts } from '../../api/index'

const Option = Select.Option

/**
 * 商品管理
 */
export default class Product extends Component {


  state = {
    products: [], //所有商品分类的数据
    loading: false, //是否正在请求数据中
    total:0, //商品的总数量
    pageSize:2, //每页显示多少条数据
  }

  // 初始化Table的所有列信息的数组

  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => {
          return <span> {'¥' + price} </span>
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 100,
        render: (status) => {
          return (


            <div>
              <Button>{status === 1 ? '下架' : '上架'}</Button>
              <div>{status === 1 ? '在售' : '已下架'}</div>
            </div>
          )
        }

      },
      {
        title: '操作',
        width: 100,
        render: (product) => {
          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          )
        }
      },
    ];
  }





  // 异步获取指定页码商品列表显示
  getProducts = async (pageNum) => {

    // 显示loading
    this.setState({
      loading: true
    })
    // 发送ajax请求
    const result = await reqGetProducts(pageNum,this.state.pageSize)

    // 关闭loading
    this.setState({
      loading: false
    })
    if(result.status === 0){

      // 取出数据，更新状态
      const { total,list } = result.data
      this.setState({
        products:list,
        total:total
      })
    }

    console.log(result)
    console.log(result.data.list)

  }

  UNSAFE_componentWillMount() {

    this.initColumns()
  }

  componentDidMount() {
    // 获取第一页显示
    this.getProducts(1)
  }

  render() {

    const { loading,products,total,pageSize } = this.state

    // Card右上角的结构
    const extra = (
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => { this.setState({ showStatus: 1 }) }}
      >
        添加商品
      </Button>
    )

    const title = (
      <div className="product-card-title">
        <Select defaultValue="name" className="product-card-title-select" >
          <Option value="name">按名称搜索</Option>
          <Option value="desc">按描述搜索</Option>
        </Select>

        <Input placeholder="关键字" className="product-card-title-input" ></Input>
        <Button className="product-card-title-button" >搜索</Button>
      </div>

    )



    return (
      <div>
        <Card
          className="product-card"
          title={title}
          extra={extra}
        >
          <Table
            id="category-table-id"
            className="product-table"
            bordered
            rowKey="_id"
            loading={loading}
            columns={this.columns}
            dataSource={products}

            pagination={
              {
                total:total,
                position: ['bottomLeft'],
                defaultPageSize: pageSize,
                showQuickJumper: true,
                onChange:this.getProducts
                
              }
            }
          />

        </Card>
      </div>
    )
  }
}
