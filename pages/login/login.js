// pages/login/login.js
const App = getApp();
// const AUTH = require('../../utils/auth');

const Request = require('../../utils/request')
const fetch = new Request({
  header:App.globalData.header,
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
      code:this.data.code,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    }).then(res=>{
      if(res.code == 0) {
        // 存储，设置token
        const token = 'Bearer ' + res.data
        try {
          wx.setStorageSync('Authorization', token)
        } catch (e) { console.log('token缓存存储错误')}
        App.globalData.header.Authorization = token
        wx.redirectTo({
          url: '/pages/index/index?token=' + token,
        })
      }else {
        wx.showToast({
          title: '登录失败',
          icon: 'error',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '手机号获取失败',
        icon: 'error',
        duration: 2000
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
      success: (res) =>{
        this.setData({
          code:res.code
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
