/*
 * @Author: zfd
 * @Date: 2020-10-25 09:21:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-23 10:37:02
 * @Description:
 */
// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()
//
//   return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }
//
// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }
// 工程状态格式化
function parseProStatus(val) {
  // 0撤销 1未受理 2已受理

  const map = new Map([[0,'已受理'],[1,'未受理'],[2,'已撤销']])
  return map.get(+val)
}
// 时间格式化
function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

// 校验手机号
const validatePhone = (value) => {
  const reg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
  if (!value) {
    return false
  } else {
    if ((!reg.test(value))) {
      return false
    } else {
      return true
    }
  }
}

// 校验邮箱
const validateEmail = (value) => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!value) {
    return false
  } else {
    if ((!reg.test(value))) {
      return false
    } else {
      return true
    }
  }
}

// 校验纯数字验证码
const validateNumberCode = (value, length) => {
  if (typeof length !== 'number') {
    return false
  }
  if (isNaN(+value) || String(value).length !== length) {
    return false
  } else {
    return true
  }
}

/**
 * 检测类型
 * 返回string
 * @param {any} value
 */
function checkType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * 检测空数组
 * 返回boolean
 * 空数组则返回true
 * @param {array} value
 */
function notEmptyArray(value) {
  if (Array.isArray(value) && value.length > 0) {
    return true
  }
  return false
}

/**
 * 检测空对象
 * @param {*} text
 */
function notEmptyObj(obj) {
  const isObj = checkType(obj) === 'Object'
  if (isObj) {
    return Object.keys(obj).length > 0
  }
  return false
}

/**
 * 格式化为国际货币数字 10000 --> 10,000
 */

function formatMoney(val) {
  if (isFinite(+val)) {
    const reg = /(?=(\B\d{3})+$)/g
    return val.toString().replace(reg, ',')
  }
  return val
}
const urlJointParams = (url, obj) => {
  if(notEmptyObj(obj)) {
    const keys = Object.keys(obj)
    const k0 = keys[0]
    const keyRest = Object.keys(obj).slice(1)
    url += `?${k0}=${obj[k0]}`
    for(const k of keyRest) {
      url += `&${k}=${obj[k]}`
    }
  }
  return url
}
module.exports = {
  parseTime,
  validatePhone,
  validateNumberCode,
  parseProStatus,
  validateEmail,
  checkType,
  notEmptyArray,
  notEmptyObj,
  formatMoney,
  urlJointParams
}
