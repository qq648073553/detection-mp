/*
 * @Author: zfd
 * @Date: 2020-10-25 09:21:59
 * @LastEditors: holder
 * @LastEditTime: 2021-04-08 14:51:53
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

  const map = new Map([[0, '已受理'], [1, '未受理'], [2, '已撤销']])
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

// 校验真实姓名
const validateTrueName = (value) => {
  const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
  if (!!value && reg.test(value)) {
    return true
  }
  return false
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
// 拼接queryUrl
const urlJointParams = (url, obj) => {
  if (notEmptyObj(obj)) {
    const keys = Object.keys(obj)
    const k0 = keys[0]
    const keyRest = Object.keys(obj).slice(1)
    url += `?${k0}=${obj[k0]}`
    for (const k of keyRest) {
      url += `&${k}=${obj[k]}`
    }
  }
  return url
}
// 解析f1=>样品名称，返回map
const parseCattr = cAttStr => {
  cAttStr = cAttStr.replace(/[\s|\[|\]]/g, '')
  const arr = cAttStr.split(',')
  const map = new Map()
  for (const a of arr) {
    const m = a.split('as')
    map.set(m[1], m[0])
  }
  return map
}
// 样品配置字符串转样品配置对象
class SampleConfig {
  name //属性中文名string
  prop //属性string f1-f13
  // data //数据string
  isInput //输入框boolean
  isPicker //选择器，静态数据源boolean
  isDate //年月日选择
  table //选择器，动态请求表数据源string
  resource //数据源array
}
const parseSampleConfig = (attStr, cAttStr) => {
  const valid = typeof attStr === 'string' && typeof cAttStr === 'string'
  if (!valid) return null
  const attrMap = parseCattr(cAttStr)
  const attrArr = attStr.split(',')
  const result = []
  for (const arr of attrArr) {
    const sample = new SampleConfig()
    const splits = arr.split('=')
    const left = splits[0]
    const right = splits[1]
    sample.name = left
    // 修复面积(mm2)
    sample.prop = attrMap.get(left.replace(/(\(.*\))/g, ''))
    if (left.includes('日期')) {
      sample.isDate = true
      result.push(sample)
      continue
    }
    if (right.length === 0) {
      sample.isInput = true
      result.push(sample)
      continue
    }
    if (right.includes('#')) {
      sample.isPicker = true
      // vant actionSheet actions
      sample.resource = right.split('#').map(v => ({ name: v }))
      result.push(sample)
      continue
    }
    if (right === 'pz' || right === 'cc' || right === 'gg') {
      sample.isPicker = true
      sample.resource = null
      sample.table = right
      result.push(sample)
      continue
    }
    console.log('配置项检测出错')
    // 否则解析错误
    return null
  }
  return result
}
// 判断页面权限
const projectForbiddenControl = (roles, url) => {
  if(!roles || !url || roles.includes("ROLE_PRINCIPAL")) {
    return []
  }
  const arr = url.split('/')
  url = arr[arr.length - 1]
  const pageForbiddens = {
    'ROLE_DELIVERER': [
      {
        page: 'delegation-overview',
        forbiddens: ['settle']
      }
    ],
    'ROLE_QUALITY': [
      {
        page: 'delegation-overview',
        forbiddens: ['settle']
      }
    ],
    'ROLE_WITNESSES': [
      {
        page: 'delegation-overview',
        forbiddens: ['settle']
      }
    ],
    'ROLE_CONSTRUCTION': [
      {
        page: 'delegation-overview',
        forbiddens: ['settle']
      }
    ],
  }
  let roleForbiddens = []
  for (const role of roles) {
    if(pageForbiddens[role] === undefined) continue
    for(const pp of pageForbiddens[role]) {
      if(pp.page === url) {
        roleForbiddens = roleForbiddens.concat(pp.forbiddens)
        break
      }
    }
  }

  return roleForbiddens
}
// 小程序版本比较
function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}
module.exports = {
  parseTime,
  validatePhone,
  validateNumberCode,
  validateTrueName,
  validateEmail,
  parseProStatus,
  checkType,
  notEmptyArray,
  notEmptyObj,
  formatMoney,
  urlJointParams,
  parseSampleConfig,
  compareVersion,
  projectForbiddenControl
}
