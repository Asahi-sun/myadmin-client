import React, { Component } from 'react'
import {
    withRouter,
} from 'react-router-dom'
import {
    Modal,
} from 'antd';
import {
    ExclamationCircleOutlined
} from '@ant-design/icons';

import moment from 'moment'
import { reqWeather } from '../../api/index'

const { confirm } = Modal;

import './Header.less'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import menuConfig from '../../config/menuConfig'
import LinkButton from '../LinkButton/linkButton';

class Header extends Component {

    state = {
        // currentTime: Date.now(),
        currentTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        dayPictureUrl: '', //天气图片
        weather: '',  //天气数据
    }

    /**
     * 退出登录
     */
    logout = () => {
        console.log(this)
        // 显示确认提示
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                console.log(this)
                console.log('OK');
                // 确定后，删除用户信息
                // local中的
                storageUtils.removeUser()
                // 内存中的
                memoryUtils.user = {}
                // 跳转到登录页面
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    }

    /**
     * 根据当前请求的path得到对应的title
     */
    getTitle = () => {
        let title = ''
        const path = this.props.location.pathname
        menuConfig.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })

        return title
    }

    /**
     * 获取天气信息显示
     */
    getWeather = async () => {
        // 发请求
        const { dayPicutreUrl, weather } = await reqWeather('南京')
        // 更新状态
        this.setState({
            dayPicutreUrl,
            weather
        })
    }


    componentDidMount() {
        // 启动循环定时器
        this.intervalId = setInterval(() => {
            // 将currentTime更新为当前时间值
            this.setState({
                currentTime: moment().format('YYYY-MM-DD HH:mm:ss')
            })
        }, 1000);

        // 发jsonp请求获取天气信息显示
        this.getWeather()
    }

    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.intervalId)
    }

    render() {

        const { currentTime,dayPicutreUrl, weather} = this.state

        const user = memoryUtils.user

        // 得到当前需要显示的title
        const title = this.getTitle()


        return (
            <div className="header">
                <div className="header-top">
                    欢迎，{user.username} &nbsp;&nbsp;
                    {/* <a href="#!" onClick={this.logout}>退出</a> */}
                    {/* 组件的标签体作为标签的children属性传入 */}
                    <LinkButton onClick={this.logout}>退出</LinkButton>

                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {title}
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPicutreUrl} alt="天气" />
                        <span>{  weather }</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
