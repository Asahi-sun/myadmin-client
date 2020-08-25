"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqUpdataCategory = exports.reqAddCategory = exports.reqCategorys = exports.reqWeather = exports.reqLogin = void 0;

var _qs = _interopRequireDefault(require("qs"));

var _jsonp = _interopRequireDefault(require("jsonp"));

var _ajax = _interopRequireDefault(require("./ajax"));

var _autoprefixer = require("autoprefixer");

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 包含应用中所有请求接口的 函数：接口请求函数
 */
//axios不能发jsonp请求
//  const Base = 'http://localhost:5000'
var Base = ''; //请求登录

var reqLogin = function reqLogin(username, password) {
  return _ajax["default"].post(Base + '/login', {
    username: username,
    password: password
  });
}; // export const reqLogin = (username, password) => (
//     ajax({
//         method: 'POST',
//         url: Base + '/login',
//         data: {  //data是对象，默认使用json格式的请求体携带参数数据
//             username,
//             password
//         }
//         // data:qs.stringify({username,password})
//     })
// )
// export function reqLogin(username, password) {
//     return ajax({
//         method: 'POST',
//         url: Base + '/login',
//         data: {  //data是对象，默认使用json格式的请求体携带参数数据
//             username,
//             password
//         }
//         // data:qs.stringify({username,password})
//     })
// }
// const name = 'admin'
// const pwd = 'admin'
// reqLogin(name, pwd).then(
//      result =>{
//         //  const result = result.data
//          console.log('请求成功了',result)
//      },
//      error =>{
//          alert('请求失败了'+ error.message)
//      }
// )
// 发送jsonp请求得到天气信息


exports.reqLogin = reqLogin;

var reqWeather = function reqWeather(city) {
  return new Promise(function (resolve, reject) {
    var url = "http://api.map.baidu.com/telematics/v3/weather?location=".concat(city, "&output=json&ak=3p49MVra6urFRGOT9s8UBWr2");
    (0, _jsonp["default"])(url, {}, function (error, data) {
      if (!error && data.error === 0) {
        //成功
        var _data$results$0$weath = data.results[0].weather_data[0],
            dayPictureUrl = _data$results$0$weath.dayPictureUrl,
            weather = _data$results$0$weath.weather;
        resolve({
          dayPictureUrl: dayPictureUrl,
          weather: weather
        });
      } else {
        //失败的
        _antd.message.error('获取天气信息失败');
      }
    });
  });
}; // 获取分类列表


exports.reqWeather = reqWeather;

var reqCategorys = function reqCategorys() {
  return _ajax["default"].get(Base + 'manage/category/list');
}; // 添加分类


exports.reqCategorys = reqCategorys;

var reqAddCategory = function reqAddCategory(categoryName) {
  return _ajax["default"].post(Base + 'manage/category/add', {
    categoryName: categoryName
  });
}; // 修改分类


exports.reqAddCategory = reqAddCategory;

var reqUpdataCategory = function reqUpdataCategory(_ref) {
  var categoryId = _ref.categoryId,
      categoryName = _ref.categoryName;
  return _ajax["default"].post(Base + 'manage/category/update', {
    categoryId: categoryId,
    categoryName: categoryName
  });
};

exports.reqUpdataCategory = reqUpdataCategory;