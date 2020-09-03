import React, { Component } from 'react'

import {
    Card,
    List,
    message,
} from 'antd'

import {
    ArrowLeftOutlined,

} from '@ant-design/icons'

import './detail.less'
import LinkButton from '../../components/LinkButton/linkButton'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect } from 'react-router-dom'
import { reqCategory } from '../../api/index'

const Item = List.Item

const BASE_IMG = 'http://localhost:5000/upload/'

export default class ProductDetail extends Component {

    state = {
        categoryName:''
    }

    getCategory = async (categoryId) =>{

        const result = await reqCategory(categoryId)
        if(result.status === 0){
            const categoryName = result.data.name
            this.setState({ categoryName })
        }else{
            message.success('请求失败')
        }
    }

    componentDidMount(){
        const product = memoryUtils.product
        if(product._id){
            this.getCategory(product.categoryId)
        }
        
    }

    render() {

        const { categoryName } = this.state

        const product = memoryUtils.product
        if (!product || !product._id) {
            return <Redirect to="/product" />
        }

        const title = (
            <span>
                <LinkButton>
                    <ArrowLeftOutlined
                        onClick={() => {
                            this.props.history.push('/product')
                        }}
                    />
                </LinkButton>
                <span>商品详情</span>
            </span>
        )

        return (
            <div>
                <Card title={title} className="detail">
                    <List>
                        <Item>
                                <span className="detail-left">商品名称:</span>
                                <span className="detail-content">{ product.name }</span>
                        </Item>

                        <Item>
                            <span className="detail-left">商品描述:</span>
                            <span className="detail-content">{ product.desc }</span>
                        </Item>
                        <Item>
                            <span className="detail-left">商品价格:</span>
                            <span className="detail-content">{ product.price }</span>
                        </Item>
                        <Item>
                            <span className="detail-left">所属分类:</span>
                            <span className="detail-content">{ categoryName }</span>
                        </Item>
                        <Item>
                            <span style={{ fontSize: '20px', width: '100%', fontWeight: 'bold' }}>商品图片:
                               {
                                    product.imgs.map(img => <img key={ img } style={{ width:100,height:100,border:'1px solid',marginLeft:5 }} src={ BASE_IMG  +img } alt="img" /> )
                               }
                            </span>
                        </Item>
                        <Item>
                            <span className="detail-left">商品详情:</span>
                            <div className="detail-content" dangerouslySetInnerHTML={{ __html: product.detail }} ></div>
                        </Item>
                    </List>
                </Card>
            </div>
        )
    }
}
