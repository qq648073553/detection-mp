const App = getApp();
const Request = require('../../utils/request')
const fetch = new Request({
  auth:true,
  header:App.globalData.header,
  baseURL: App.globalData.baseURL
})
Page({
  data:{
    phone: '137****0390',
    email: 'zfd_yes@163.com'
  },
  logOut() {
    wx.reLaunch({
      url: '/pages/login/login'
    })
  },
  getInfo() {
    fetch.get('auth/userInfo',{}).then((info) => {
      this.setData({
        phone: info.phone.replace(/(^[0-9]{3})[0-9]{4}([0-9]{4}$)/,'$1****$2'),
        email:info.email
      })
      App.globalData.userInfo = info
    })
  },
  onLoad: function (options) {
    this.setData({
      navHeight: App.globalData.navHeight
    })
    this.getInfo()
  }
})
