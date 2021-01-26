// pages/login-phone/login-phone.js
const Utils = require('../..//utils/util')
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    otp: '',
    password: '',
    loginByOtp: true,
    otpText: '获取验证码',
    otpTimer: null,
  },
  loginSwitch() {
    this.setData({
      loginByOtp: !this.data.loginByOtp
    })
  },
  getOtp() {
    if(typeof this.data.otpText === 'number') {
      return
    }
    if(!Utils.validatePhone(this.data.phone)) {
      Dialog.alert({
        title: '温馨提示',
        message: '请输入手机号',
      }).then(() => {
        // on close
      });
      return;
    }
    let countDown = 60
    let timer = setInterval(() => {
      if(countDown === 0) {
        clearInterval(timer)
        timer = null
        this.setData({
          otpText: '获取验证码'
        })
      }else {
        this.setData({
          otpText: --countDown
        })
      }
      }, 1000)
  },
  login() {
    wx.redirectTo({
      url: '/pages/index/index'
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
   */
  onShow: function () {

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
