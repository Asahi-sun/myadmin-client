import React, { Component } from 'react'

import {
    Card,
    Form,
    message,
    Input,
    Select,
    Button,
} from 'antd'

import {
    ArrowLeftOutlined,

} from '@ant-design/icons'


import LinkButton from '../../components/LinkButton/linkButton'
import { reqCategorys, reqAddProduct, reqUpdateProduct } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import PictureWall from './pictureWall'
import RichTextEditor from './richTextEditor'

const Item = Form.Item
const Option = Select.Option
const { TextArea } = Input

const BASE_IMG = 'http://localhost:5000/upload/'



/**
 * 商品添加/更新组件
 */

export default class ProductAddUpdate extends Component {

    constructor(props) {
        super(props);
        this.pwRef = React.createRef();
        this.editorRef = React.createRef();
    }

    state = {
        categorys: [],
    }

    getCategorys = async () => {
        const result = await reqCategorys()
        if (result.status === 0) {
            const categorys = result.data
            this.setState({ categorys })
        } else {
            message.success('请求失败')
        }
    }

    

    onFinish = async values => {
        // 收集上传的图片文件名的数组
        const imgs = this.pwRef.current.getImgs()
        // 输入的商品详情的标签字符串
        const detail = this.editorRef.current.getDetail()

        // 给values对象添加imgs元素
        // values["imgs"] = imgs
        values.imgs = imgs

        // 给values对象添加detail元素
        values.detail = detail

        let result
        if (this.isUpdata) {  //更新商品
            //添加product._id,更新商品需要的数据
            // values['_id'] = this.product._id
            values._id = this.product._id
            console.log(values,'bbb')
            result = await reqUpdateProduct(values)
            console.log(result)
        }else{ //添加商品
            result = await reqAddProduct(values)
        }

        if (result.status === 0) {
            message.success( `${this.isUpdata ? '更新':'添加'}商品成功!`)
            this.props.history.replace('/product')
        } else if (result.status === 1) {
            message.error('此名称商品已存在！');
        } else {
            message.error( `${this.isUpdata ? '更新':'添加'}商品失败!`)
        }


    }

    // 对价格进行自定义验证
    validatePrice = (rule, value) => {
        if (value < 0) {
            return Promise.reject('商品价格不能为负数')
        } else {
            return Promise.resolve()
        }
    }


    UNSAFE_componentWillMount() {

        this.product = memoryUtils.product
        console.log(this.product,'this.product')
        this.isUpdata = !!this.product._id

    }

    componentDidMount() {
        this.getCategorys()
    }


    render() {

        const { categorys } = this.state


        const { isUpdata, product } = this

        console.log(isUpdata,'isUpdata')


        const title = (
            <span>
                <LinkButton>
                    <ArrowLeftOutlined
                        onClick={() => {
                            this.props.history.push('/product')
                        }}
                    />
                </LinkButton>
                <span>
                    {isUpdata ? '修改商品' : '添加商品'}
                </span>
            </span>
        )

        // 指定Form中所有Item的布局
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 8 },
        }

        return (
            <div>
                <Card title={title} className="detail">
                    <Form
                        initialValues={
                            {
                                name: product.name,
                                desc: product.desc,
                                price: product.price,
                                categoryId: product.categoryId,
                                detail:product.detail,
                            }

                        }
                        {...formItemLayout}
                        onFinish={this.onFinish}
                    >
                        <Item
                            label="商品名称"
                            name="name"
                            rules={[{ required: true, message: '请输入商品名称' }]}
                        >
                            <Input allowClear />
                        </Item>

                        <Item
                            label="商品描述"
                            name="desc"
                            rules={[{ required: true, message: '请输入商品描述!' }]}
                        >
                            <TextArea allowClear />
                        </Item>

                        <Item
                            label="商品价格"
                            name="price"
                            rules={[
                                { required: true, message: '请输入商品价格!' },
                                { validator: this.validatePrice },
                            ]}
                        >
                            <Input type="number" allowClear addonAfter="元" />
                        </Item>

                        <Item
                            label="商品分类"
                            name="categoryId"
                            rules={[{ required: true, message: '请选择商品分类' }]}
                        >
                            <Select
                                allowClear
                            >
                                {
                                    categorys.map(item => {
                                        return (
                                            <Option value={item._id} key={item._id} >  {item.name} </Option>
                                        )
                                    })
                                }
                            </Select>
                        </Item>

                        <Item
                            label="商品图片"
                            name="imgs"
                        >
                            <PictureWall ref={this.pwRef} imgs={product.imgs} />

                            {/* {
                                isUpdata ?
                                    product.imgs.map(img => <img key={img} src={BASE_IMG + img} alt="img" />)
                                    :
                                    <PictureWall ref ={this.pwRef} />
                                        
                            } */}
                        </Item>

                        <Item
                            label="商品详情"
                            name="detail"
                            wrapperCol={{ sapn: 20 }}
                        >
                            {/* <TextArea /> */}
                            <RichTextEditor ref={this.editorRef} detail={product.detail} />
                        </Item>

                        <Item
                            // name='button'
                        >
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Item>


                    </Form>
                </Card>
            </div>
        )
    }
}
