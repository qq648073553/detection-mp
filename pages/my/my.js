/*
 * @Author: holder
 * @Date: 2021-01-08 14:01:21
 * @LastEditors: holder
 * @LastEditTime: 2021-04-06 13:10:22
 * @Description: 
 */
const App = getApp();
const Request = require('../../utils/request')
const fetch = new Request({
  auth: true,
  header: App.globalData.header,
  baseURL: App.globalData.baseURL
})
Page({
  data: {
    input: '',
    phone: '137****0390',
    email: 'zfd_yes@163.com',
    name: '张三',
    editShow: false,
    popName: '修改姓名',
    popTips: '请输入真实姓名'
  },
  updateName() {

  },
  toggleEditShow(event) {
    const name = event.currentTarget.dataset?.name
    if (!name) {
      this.setData({ editShow: !this.data.editShow, });
      return
    }
    if (name === 'name') {
      this.setData(
        {
          editShow: !this.data.editShow,
          popName: '修改姓名',
          popTips: '请输入真实姓名'
        });
    } else if (name === 'email') {
      this.setData(
        {
          editShow: !this.data.editShow,
          popName: '修改邮箱',
          popTips: '请输入邮箱号'
        });
    }

  },
  logOut() {
    App.globalData.userInfo = {}
    App.globalData.header = {}
    wx.removeStorageSync('Authorization')
    wx.reLaunch({
      url: '/pages/login/login'
    })
  },

  onLoad: function (options) {
    this.setData({
      navHeight: App.globalData.navHeight
    })
  }
})
