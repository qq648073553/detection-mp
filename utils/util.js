/*
 * @Author: zfd
 * @Date: 2020-10-25 09:21:59
 * @LastEditors: zfd
 * @LastEditTime: 2020-10-25 12:26:35
 * @Description:
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
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
module.exports = {
  formatTime: formatTime,
  validatePhone
}
