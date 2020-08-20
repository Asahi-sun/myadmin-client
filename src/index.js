/**
 * 入口js
 */
import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.less'

import App from './App'
import './api'

ReactDOM.render(
    <App></App>,
    document.querySelector('#root')
)