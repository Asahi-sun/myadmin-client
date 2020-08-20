/**
 * 应用根组件
 */
import React from 'react'
// import {
//     Button,
//     message,
// } from 'antd'

import {
    BrowserRouter as Router,
    HashRouter,
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom"

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

class App extends React.Component {
    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <Router>
                   
                    <Switch>
                        <Route path="/login"   component={Login} />
                        <Route path="/admin" exact component={Admin} />
                        <Redirect to="/admin" />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App