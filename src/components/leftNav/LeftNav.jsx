import React, { Component } from 'react'
import {
    Link,
    withRouter,
} from 'react-router-dom'
import { Menu } from 'antd';
import {
    HomeOutlined,
    AppstoreOutlined,
    UserOutlined,
    SafetyCertificateOutlined,
    AreaChartOutlined,
    WindowsOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined,
    GoldOutlined,
    AuditOutlined,

} from '@ant-design/icons';

import './LeftNav.less'
import logo from '../../assets/images/logo.png'


const { SubMenu } = Menu;


/**
 * 左侧导航组件
 */
class LeftNav extends Component {

    /**
    * 第一次render()之后 执行一次
    * 执行异步任务：发ajax请求，启动定时器
    */
    // componentDidMount() {

    // }

    /**
     * 第一次render()之前执行一次
     * 为第一次render()做一些同步的准备工作
     */
    // componentWillMount() {

    // }
    // componentWillMount() {

    // }

    render() {
        // 得到当前请求的路由路径
        const selectKey = this.props.location.pathname

        return (
            <div className="leftNav">
                <Link className="leftNav-link" to='/home'>
                    <img src={logo} alt="logo" />
                    <h1>智库智能</h1>
                </Link>

                <Menu
                    selectedKeys={[selectKey]}
                    // defaultSelectedKeys={[selectKey]}
                    // defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                // inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="/home" icon={<HomeOutlined />}>
                        <Link to='/home'>
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<AppstoreOutlined />} title="商品">
                        <Menu.Item key="/category" icon={<GoldOutlined />}>
                            <Link to='/category'>
                                <span>品类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product" icon={<AuditOutlined />}>
                            <Link to='/product'>
                                <span>商品管理</span>
                            </Link>

                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/user" icon={<UserOutlined />}>

                        <Link to='/user'>
                            <span>用户管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/role" icon={<SafetyCertificateOutlined />}>
                        <Link to='/role'>
                            <span>角色管理</span>
                        </Link>

                    </Menu.Item>
                    <SubMenu key="sub2" icon={<AreaChartOutlined />} title="图形管理">
                        <Menu.Item key="/charts/bar" icon={<BarChartOutlined />}>
                            <Link to='/charts/bar'>
                                <span>柱状图</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/charts/line" icon={<LineChartOutlined />}>
                            <Link to='/charts/line'>
                                <span>折线图</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/charts/pie" icon={<PieChartOutlined />}>
                            <Link to='/charts/pie'>
                                <span>饼图</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/charts/pie" icon={<WindowsOutlined />}>
                        <Link to='/charts/pie'>
                            订单管理
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

/**
 * 向外暴露 使用高阶组件withRouter（）来包装非路由组件
 * 新组建LeftNav传递3个特别属性：history/location/match
 * 结果：LeftNav可以操作路由相关语法了
 */
export default withRouter(LeftNav)
