const request = require('request')
var fs = require('fs')
const config = require('../config')

var g_Env = process.env.NODE_ENV || 'dev'

module.exports = {
  // 向前台返回JSON方法的简单封装
  jsonWrite: function (res, result = {}) {
    if (typeof result === undefined) {
      res.json({
        code: -1,
        msg: '网络繁忙，请稍后再试'
      })
    } else {
      let {code, ...data} = result
      if (result.code !== undefined) {
        res.json({
          code: code,
          ...data
        });
      } else {
        res.json({
          code: 1,
          ...data
        });        
      }
    }
  },
  pageWrite: function (res, result, pageUri) {
    res.render(pageUri, result);
  },
  checkIsEmptyObj (data) {
    return Object.keys(data).length === 0
  }
}
