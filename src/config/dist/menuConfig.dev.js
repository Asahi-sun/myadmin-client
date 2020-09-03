"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _icons = require("@ant-design/icons");

var menuList = [{
  title: '首页',
  // 菜单标题名称
  key: '/home',
  // 对应的path
  icon: _icons.HomeOutlined,
  // 图标名称
  "public": true // 公开的

}, {
  title: '商品',
  key: '/products',
  icon: _icons.AppstoreOutlined,
  children: [// 子菜单列表
  {
    title: '品类管理',
    key: '/category',
    icon: _icons.GoldOutlined
  }, {
    title: '商品管理',
    key: '/product',
    icon: _icons.AuditOutlined
  }]
}, {
  title: '用户管理',
  key: '/user',
  icon: _icons.UserOutlined
}, {
  title: '角色管理',
  key: '/role',
  icon: _icons.SafetyCertificateOutlined
}, {
  title: '图形图表',
  key: '/charts',
  icon: _icons.AreaChartOutlined,
  children: [{
    title: '柱形图',
    key: '/charts/bar',
    icon: _icons.BarChartOutlined
  }, {
    title: '折线图',
    key: '/charts/line',
    icon: _icons.LineChartOutlined
  }, {
    title: '饼图',
    key: '/charts/pie',
    icon: _icons.PieChartOutlined
  }]
}, {
  title: '订单管理',
  key: '/orderManagement',
  icon: _icons.WindowsOutlined
}];
var _default = menuList;
exports["default"] = _default;