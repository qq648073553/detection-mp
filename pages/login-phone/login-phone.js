const Utils = require('../..//utils/util')
const App = getApp();
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
    phone: '13013753895',
    otp: '123456',
    password: '',
    // loginByOtp: true,
    otpText: '获取验证码',
    otpTimer: null,
   
  },

  // loginSwitch() {
  //   this.setData({
  //     loginByOtp: !this.data.loginByOtp
  //   })
  // },
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
    fetch.get(`sendsms/getSendsms?role=${this.data.phone}`)
        .then(data => {
          const cookie = data.message
          // 设置cookie保存在全局
          App.globalData.header.Cookie = 'JSESSIONID=' + cookie;
        })
  },
  login() {
    if(!Utils.validatePhone(this.data.phone)) {

      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if(Utils.validateNumberCode(this.data.otp, 6)) {
      fetch.post('auth/signup',
          {
            username:this.data.phone,
            verificationcode:this.data.otp
          }).then(token =>{
            wx.setStorageSync('Authorization', token)
        App.globalData.header.Authorization = token
        wx.reLaunch({
          url:'/pages/index/index'
        })
      }
      )
    }else {
      wx.showToast({
        title: '验证码错误',
        icon: 'error',
        duration: 1000
      })
    }

    // wx.redirectTo({
    //   url: '/pages/index/index'
    // })
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
