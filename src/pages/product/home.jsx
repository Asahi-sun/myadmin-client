import React, { Component } from 'react'

import {
    Card,
    Table,
    Button,
    Input,
    Select,
    message,
} from 'antd';

import {
    PlusOutlined,

} from '@ant-design/icons'

import throttle from 'lodash.throttle'

import './home.less'
import LinkButton from '../../components/LinkButton/linkButton'
import { reqGetProducts, reqSearchProducts, reqUpdateStatus } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'

const Option = Select.Option

/**
 * 商品管理
 */
export default class Product extends Component {


    state = {
        products: [], //所有商品分类的数据
        loading: false, //是否正在请求数据中
        total: 0, //商品的总数量
        pageSize: 3, //每页显示多少条数据
        searchType: 'productName', //默认是按商品名称搜索
        searchName: '',//搜索的关键字
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
                // dataIndex: 'status',
                width: 100,
                render: ({ _id, status }) => {
                    const productId = _id
                    return (
                        <div>
                            <Button
                                type="primary"
                                onClick={() => { this.updateStatus(productId, status) }}
                            >
                                {/* { console.log(status,productId) } */}
                                {status === 1 ? '下架' : '上架'}
                            </Button>

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
                            <LinkButton
                                onClick={() => {
                                    // 在内存中保存product
                                    memoryUtils.product = product
                                    this.props.history.push('/product/detail/' + product._id)
                                }}
                            >
                                详情
                            </LinkButton>
                            <LinkButton
                                onClick={() => {
                                    // 在内存中保存product
                                    memoryUtils.product = product
                                    this.props.history.push('/product/addupdate')
                                }}
                            >
                                修改
                            </LinkButton>
                        </span>
                    )
                }
            },
        ];
    }


    updateStatus = throttle(async (productId, status) => {
        // 计算更新后的值
        status = status === 1 ? 2 : 1
        // 发送ajax请求
        const result = await reqUpdateStatus(productId, status)
        if (result.status === 0) {
            message.success('更新商品状态成功！')
            // 获取当前页显示
            this.getProducts(this.pageNum)
        } else {
            message.error('请求失败')
        }

    },2000)

    // 异步获取指定页码商品分页（可能带搜索）列表显示
    getProducts = async (pageNum) => {

        // 保存当前页码
        this.pageNum = pageNum


        const { searchName, searchType, pageSize } = this.state
        // 显示loading
        this.setState({
            loading: true
        })

        let result
        // 发送ajax请求
        if (!this.isSearch) {
            result = await reqGetProducts(pageNum, pageSize)
        } else {
            result = await reqSearchProducts({ pageNum, pageSize, searchName, searchType })
        }

        // 关闭loading
        this.setState({
            loading: false
        })


        if (result.status === 0) {
            // 取出数据，更新状态
            const { total, list } = result.data
            this.setState({
                products: list,
                total: total
            })
        }
    }

    UNSAFE_componentWillMount() {

        this.initColumns()
    }

    componentDidMount() {
        // 获取第一页显示
        this.getProducts(1)
    }

    render() {

        const { loading, products, total, pageSize, searchType, searchName } = this.state

        // Card右上角的结构
        const extra = (
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    // this.setState({ showStatus: 1 })
                    memoryUtils.product = {}
                    this.props.history.push('/product/addupdate')
                }}

            >
                添加商品
            </Button>
        )

        const title = (
            <div className="product-card-title">
                <Select
                    value={searchType}
                    className="product-card-title-select"
                    onChange={(value) => this.setState({ searchType: value })}
                >
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>

                <Input
                    placeholder="关键字"
                    value={searchName}
                    className="product-card-title-input"
                    onChange={(e) => this.setState({ searchName: e.target.value })}
                />
                <Button className="product-card-title-button" onClick={() => { 
                    this.isSearch = true //保存搜索的标记
                    this.getProducts(1) }}>搜索</Button>
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
                                total: total,
                                position: ['bottomLeft'],
                                defaultPageSize: pageSize,
                                showQuickJumper: true,
                                onChange: this.getProducts,
                                current: this.pageNum
                            }
                        }
                    />

                </Card>
            </div>
        )
    }
}
