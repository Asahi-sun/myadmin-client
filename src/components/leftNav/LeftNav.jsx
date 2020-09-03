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
import memoryUtils from '../../utils/memoryUtils'
import menuList from '../../config/menuConfig'


const { SubMenu } = Menu;


/**
 * 左侧导航组件
 */
class LeftNav extends Component {

    /**
     *判断当前用户是否有此item对应的权限 
     */
    hasAuth = (item) => {
        // 得到当前用户的所有权限
        const user = memoryUtils.user
        const menus = user.role.menus
        // 1. 如果当前用户是admin
        // 2. 如果item是公开的
        // 3. 当前用户有此item的权限
        if (user.username === 'admin' || item.public || menus.indexOf(item.key) !== -1) {
            return true
        } else if (item.children) {
            // 4. 如果当前用户有item的某个子节点的权限, 当前item也应该显示
            const cItem = item.children.find(cItem => menus.indexOf(cItem.key) !== -1)
            return !!cItem
        }

        return false
    }

    /*
  根据指定菜单数据列表产生<Menu>的子节点数组
  使用 map() + 递归
  */
    getMenuNodes = (menuList) => {

        // 得到当前请求的path
        const path = this.props.location.pathname

        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                // 如果当前请求路由与当前菜单的某个子菜单的key匹配, 将菜单的key保存为openKey
                if (item.children.find(cItem => path.indexOf(cItem.key) === 0)) {
                    this.openKey = item.key
                }
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    /**
     * 根据指定菜单数据列表产生<Menu>的子节点数组
     * 使用reduce() + 递归
     */
     
    getMenuNodes2 = (menuList) => {
        //  得到当前请求的path
        const path = this.props.location.pathname

        return menuList.reduce((pre, item) => {
            // 判断当前用户是否有此item对应的权限
            if (this.hasAuth(item)) {
                // 添加<Menu.Item></Menu.Item>
                if (!item.children) {
                    pre.push((
                        <Menu.Item key={item.key} icon={< item.icon />}  >
                            <Link to={item.key}>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                } else { //添加<SubMenu></SubMenu>\
                    // 如果当前请求路由与当前菜单的某个子菜单的key匹配，将菜单的key保存为openKey
                    const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                    if (cItem) {
                        this.openKey = item.key
                    }


                    pre.push((
                        <SubMenu
                            key={item.key}
                            icon={<item.icon />}
                            title={item.title}
                        >
                            {this.getMenuNodes2(item.children)}
                        </SubMenu>
                    ))
                }
            }

            return pre
        }, [])
    }


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
    UNSAFE_componentWillMount() {
        this.menuNodes = this.getMenuNodes2(menuList)
    }

    render() {


        // 得到当前请求的路由路径
        let selectKey = this.props.location.pathname
        if (selectKey.indexOf('/product') === 0) {
            selectKey = '/product'
        }

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
                    { this.menuNodes }
                </Menu>

                {/* <Menu
                    selectedKeys={[selectKey]}
                    // defaultSelectedKeys={[selectKey]}
                    // defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                // inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="/home" icon={<HomeOutlined />}  >
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
                    <Menu.Item key="/orderManagement" icon={<WindowsOutlined />}>
                        <Link to='/orderManagement'>
                            订单管理
                        </Link>
                    </Menu.Item>
                </Menu> */}
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
