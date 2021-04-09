/*
 * @Author: holder
 * @Date: 2021-01-08 14:01:21
 * @LastEditors: holder
 * @LastEditTime: 2021-04-08 16:57:55
 * @Description: 
 */
const App = getApp();
const Utils = require('../../utils/util')
const Request = require('../../utils/request')
const fetch = new Request({
  auth: true,
  header: App.globalData.header,
  baseURL: App.globalData.baseURL
})
Page({
  data: {
    input: '',
    phone: null,
    email: null,
    name: null,
    editShow: false,
    popName: '修改姓名',
    popTips: '请输入真实姓名'
  },
  // 自定义返回上级
  redirectToIndex() {
    if (!Utils.validateTrueName(App.globalData.userInfo.name)) {
      wx.showToast({
        title: '请先补全用户信息',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.redirectTo({
        url: '/pages/index/index'
      })
    }

  },
  onConfirm(){
    if(this.data.popName === '修改姓名') {
      if (Utils.validateTrueName(this.data.input)) {
        // 修改姓名
      }else {
        wx.showToast({
          title: '请输入真实姓名',
          icon: 'none',
          duration: 1000
        })
      }
    }else if(this.data.popName === '修改邮箱') {
      if (Utils.validateEmail(this.data.input)) {
        // 修改邮箱
      }else {
        wx.showToast({
          title: '请输入正确的邮箱',
          icon: 'none',
          duration: 1000
        })
      }
    }
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
          input:this.data.name,
          popName: '修改姓名',
          popTips: '请输入真实姓名'
        });
    } else if (name === 'email') {
      this.setData(
        {
          editShow: !this.data.editShow,
          input:this.data.email,
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

  onLoad: function () {
    const {name,email,username} = App.globalData.userInfo
    this.setData({
      navHeight: App.globalData.navHeight,
      name,
      email,
      phone:username.replace(/(^[0-9]{3})[0-9]{4}([0-9]{4}$)/,'$1****$2')
    })
  }
})
