// pages/update-phone/update-phone.js
const App = getApp();
const Request = require('../../utils/request')
const fetch = new Request({
  auth:true,
  header:App.globalData.header,
  baseURL: App.globalData.baseURL
})
const Utils = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    oldPhone: '',
    otp: '',
    // loginByOtp: true,
    otpText: '获取验证码',
    otpTimer: null,
  },
  getOtp() {
    if(typeof this.data.otpText === 'number') {
      return
    }
    if(!Utils.validatePhone(this.data.phone)) {

      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
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
    fetch.get(`sendsms/phone/${this.data.phone}`,{})
        .then(cookie => {
          // 设置cookie保存在全局
          App.globalData.header.Cookie = 'JSESSIONID=' + cookie;
        })
        .catch((err) => {
          wx.showToast({
            title: err,
            icon: 'error',
            duration: 1000
          })
        })
  },
  formSubmit() {
    if(!Utils.validatePhone(this.data.phone)) {

      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if(Utils.validateNumberCode(this.data.otp, 6)) {
      fetch.put('auth/phone',
          {
            phone:this.data.phone,
            otp:this.data.otp
          }).then(() =>{
        wx.redirectTo({
          url: '/pages/my/my',
        })
          }

      ).catch(err => {
        wx.showToast({
          title: err,
          icon: 'error',
          duration: 1000
        })
      })
    }else {
      wx.showToast({
        title: '验证码错误',
        icon: 'error',
        duration: 1000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const phone = App.globalData.userInfo.phone
    // if(!phone) wx.navigateBack({delta: 1})
    // this.setData({
    //   navHeight: App.globalData.navHeight,
    //   oldPhone:phone.replace(/(^[0-9]{3})[0-9]{4}([0-9]{4}$)/,'$1****$2')
    // })
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
