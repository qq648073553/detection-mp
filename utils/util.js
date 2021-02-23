/*
 * @Author: zfd
 * @Date: 2020-10-25 09:21:59
 * @LastEditors: zfd
 * @LastEditTime: 2020-10-25 12:26:35
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

  const map = new Map([[0,'已撤销'],[1,'未受理'],[2,'已受理']])
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
module.exports = {
  parseTime,
  validatePhone,
  validateNumberCode,
  parseProStatus
}
