import React, { Component, useState } from 'react'
import {
    Modal,
    Form,
    Input,
    Tree,
    message,

} from 'antd'

import menuList from '../../config/menuConfig'
import { reqUpdateRole } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'

const { TreeNode } = Tree
const Item = Form.Item

export default class AuthForm extends Component {


    constructor(props) {
        super(props)
        this.state = {
            role: {},
            checkedKeys: []
        }
    }

    getMenus = () => this.state.checkedKeys

    handleOk = async () => {
        this.props.handleCloseAuth()

        const { role } = this.props
        console.log(role,'aa')
        // 更新role对象相关属性
        role.menus = this.getMenus()
        role.auth_time = Date.now()
        role.auth_name = memoryUtils.user.username
        console.log(role)
        const { _id,menus,auth_time,auth_name } =  role
        // 请求更新角色
        const result = await reqUpdateRole(_id,menus,auth_time,auth_name)
        console.log(result)
        if (result.status === 0) {
          message.success('角色授权成功')
          this.props.getRoleList()
        } else {
          message.error(result.msg)
        }

    }

    handleCancel = () => {
        this.props.handleCloseAuth()

    }

    /**
     *  根据菜单配置生成<TreeNode>的数组
     */
    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre
        }, [])
    }

    /* 
  进行勾选操作时的回调
  checkedKeys: 最新的所有勾选的node的key的数组
  */
    handleCheck = (checkedKeys) => {
        // 更新状态
        this.setState({
            checkedKeys
        })
    }


    UNSAFE_componentWillMount() {
        this.treeNodes = this.getTreeNodes(menuList)
        // 根据传入角色的menus来更新checkedKey状态
        const menus = this.props.role.menus
        this.setState({
            checkedKeys: menus
        })

    }

    /**
     * 组件接收到新的标签属性时就会执行（初始显示时不会调用）
     * nextProps:接收到的包含新的属性的对象
     */
    UNSAFE_componentWillReceiveProps(nextProps) {
        const menus = nextProps.role.menus
        this.setState({
            checkedKeys: menus
        })
    }




    render() {

        const { role } = this.props
        const { checkedKeys } = this.state


        return (
            <div>
                {this.props.isShowAuth && <Modal
                    visible={this.props.isShowAuth}
                    // visible={this.state.isShow}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    title="添加角色"
                >

                    <Form 
                        initialValues={
                            {
                                roleName: role.name
                            }
                        }
                    >
                        <Item
                            label="角色名称"
                            name="roleName"
                        >
                            <Input disabled />


                        </Item>
                    </Form>

                    <Tree
                        checkable
                        defaultExpandAll //默认展开所有节点
                        checkedKeys={checkedKeys}
                        onCheck={this.handleCheck}
                    >
                        <TreeNode title="平台权限" key="all">
                            {
                                this.treeNodes
                            }
                        </TreeNode>
                    </Tree>
                </Modal>}
            </div>
        )
    }
}
