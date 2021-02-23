// pages/login-phone/login-phone.js
const Utils = require('../..//utils/util')
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

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
    phone: '',
    otp: '',
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
      Dialog.alert({
        title: '温馨提示',
        message: '请输入手机号',
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
    fetch.get('sendsms/getSendsms',{role:this.data.phone})
        .then(res => {
          console.log(res)
          // 设置cookie保存在全局
          App.globalData.header.Cookie = 'JSESSIONID=' + res.message;
        })
        .catch(() => {
          Toast.fail('请稍后获取');
    })
  },
  login() {

    if(Utils.validateNumberCode(this.data.otp, 6)) {
      fetch.post('auth/signup',
          {
            username:this.data.phone,
            verificationcode:this.data.otp
          }).then(res =>{
        if(res.code != 0) {
              Toast.fail(res.message)
            }else{
          const token = 'Bearer ' + res.data
          try {
            wx.setStorageSync('Authorization', token)
          } catch (e) { console.log('token缓存存储错误')}
          App.globalData.header.Authorization = token
              wx.reLaunch({
                url:'/pages/index/index'
              })
            }
      }).catch(err => {
        console.error(err)
      })
    }else {
      Toast.fail('验证码填写错误');
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
