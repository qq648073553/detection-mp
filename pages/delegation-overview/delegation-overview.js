/*
 * @Author: your name
 * @Date: 2021-01-27 09:22:00
 * @LastEditTime: 2021-04-07 17:12:58
 * @LastEditors: holder
 * @Description: In User Settings Edit
 * @FilePath: \detection-mp\pages\pro-delegation\pro-delegation.js
 */
// pages/pro-delegation/pro-delegation.js
const Utils = require('../../utils/util')
const QRCode = require('../../utils/weapp-qrcode')
let qrcode;
const App = getApp();
const Request = require('../../utils/request')
const fetch = new Request({
  auth: true,
  header: App.globalData.header,
  baseURL: App.globalData.baseURL
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid: null,
    wid: null,
    jid: null,
    status: null,
    reported: 0,
    reporting: 0,
    confirmed: 0,
    beforeConfirm: 0,
    proTitle: '苏州中心',
    codeShow:false,
    settleForbidden: [] // 禁止项
  },
  scan() {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  },
  onCloseCode(){
    this.setData({codeShow:false})
  },
  createQrcode(event) {
    console.log(event)
    var value = 'nihao'
    qrcode.makeCode(value)
    this.setData({codeShow:true})
    
  },
  getDetail(gid, jid, wid) {
    fetch.get(`project/${gid}/${wid}/${jid}`).then(res => {
      const { reported, reporting, confirmed, beforeConfirm } = res
      this.setData({
        reported,
        reporting,
        confirmed,
        beforeConfirm
      })
    })
      .catch(err => {
        console.log(err)
        wx.showToast({
          title: err,
          icon: 'error',
          duration: 2000
        })
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
    const { gid, jid, wid, status } = options
    const pageForbiddens = Utils.projectForbiddenControl(App.globalData.userProRoles, this.route)
    const settleForbidden = pageForbiddens.includes('settle')
    this.setData({
      gid,
      jid,
      wid,
      status,
      navHeight: App.globalData.navHeight,
      proStatus: App.globalData.proStatus,
      settleForbidden
    })
    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: "https://github.com/tomfriwel/weapp-qrcode",
      // image: '/images/bg.jpg',
      width: 150,
      height: 150,
      colorDark: "#1CA4FC",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
    // this.getDetail(gid,jid,wid)
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
