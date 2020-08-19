/**
 * 应用根组件
 */
import React from 'react'
// import {
//     Button,
//     message,
// } from 'antd'

import { BrowserRouter, HashRouter,Switch,Route,Redirect } from "react-router-dom"

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

class App extends React.Component {
    render() {
        return (
            <div style = {{ width:'100%',height:'100%' }}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={Login}/>
                        <Route path="/admin" component={Admin}/>
                        {/* <Redirect to="/login" from="/"/> */}

                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App