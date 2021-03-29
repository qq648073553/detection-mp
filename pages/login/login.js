/*
 * @Author: holder
 * @Date: 2021-01-27 00:06:52
 * @LastEditors: holder
 * @LastEditTime: 2021-03-29 14:00:06
 * @Description: 登录
 */
// pages/login/login.js 
const App = getApp();
const Request = require('../../utils/request')
const fetch = new Request({
  header: App.globalData.header,
  baseURL: App.globalData.baseURL
})

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
 
  },
  getPhoneNumber(e) {
    fetch.post('auth/wxlanding',
      {
        code: this.data.code,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      }).then(
        token => {
        // 存储，设置token
        wx.setStorageSync('Authorization', token)
        App.globalData.header.Authorization = token
        wx.redirectTo({
          url: '/pages/index/index',
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      navHeight: App.globalData.navHeight
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   * 先登录获取code，获取最新session_key
   */
  onShow: function () {
    wx.login({
      success: (res) => {
        this.setData({
          code: res.code
        })
      },
      fail(e) {
        wx.showToast({
          title: '登录失败',
          icon: 'error',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
