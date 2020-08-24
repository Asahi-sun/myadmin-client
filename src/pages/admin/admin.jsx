import React, { Component } from 'react'
import {
    Redirect,
    Switch,
    Route,
    HashRouter,
    BrowserRouter
} from 'react-router-dom'
import { Layout } from 'antd';


import './admin.less'

// import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/leftNav/LeftNav'
import Header from '../../components/header/Header'


import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'



const {
    // Header,
    Footer,
    Sider,
    Content
} = Layout;


class Admin extends Component {

    render() {

        //  读取保存的user，如果不存在，直接跳转到登录界面
        // const user = JSON.parse(localStorage.getItem('user_key') || '{ }')
        // const user = storageUtils.getUser()
        const user = memoryUtils.user
        if (!user._id) {
            // this.props.history.replace('/login')  //事件回调函数中进行路由跳转
            return <Redirect to='/login' />  //自动跳转到指定的路由路径
        }


        return (
            <div className="admin">
                <Layout style={{ height: '100%' }}>
                    <Sider>
                        <LeftNav />
                    </Sider>
                    <Layout>
                        <Header />
                        <Content style={{ backgroundColor: 'white' }}>
                            <HashRouter>
                                <Switch>
                                    <Route path='/home' component={Home}/>
                                    <Route path='/category' component={Category} />
                                    <Route path='/product' component={Product} />
                                    <Route path='/role' component={Role} />
                                    <Route path='/user' component={User} />
                                    <Route path='/charts/bar' component={Bar} />
                                    <Route path='/charts/line' component={Line} />
                                    <Route path='/charts/pie' component={Pie} />
                                    <Redirect to='/home' />
                                </Switch>
                            </HashRouter>
                        </Content>
                        <Footer style={{ textAlign: 'center', color: 'rgba(0,0,0,0.5)' }}>推荐使用谷歌浏览器，可以获取更块网速</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default Admin
