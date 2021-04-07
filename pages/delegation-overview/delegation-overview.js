/*
 * @Author: your name
 * @Date: 2021-01-27 09:22:00
 * @LastEditTime: 2021-04-07 13:39:56
 * @LastEditors: holder
 * @Description: In User Settings Edit
 * @FilePath: \detection-mp\pages\pro-delegation\pro-delegation.js
 */
// pages/pro-delegation/pro-delegation.js
const Utils = require('../../utils/util')
const App = getApp();
const Request = require('../../utils/request')
const fetch = new Request({
  auth:true,
  header:App.globalData.header,
  baseURL: App.globalData.baseURL
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid:null,
    wid:null,
    jid:null,
    status: null,
    reported:0,
    reporting:0,
    confirmed:0,
    beforeConfirm:0,
    proTitle: '苏州中心',
    pageForbiddens:[] // 禁止项
  },
  scan() {
    wx.scanCode({
      success (res) {
        console.log(res)
      }
    })
  },
  getDetail(gid,jid,wid){
    fetch.get(`project/${gid}/${wid}/${jid}`).then(res => {
      const {reported,reporting,confirmed,beforeConfirm} = res
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
        icon:'error',
        duration:2000
    })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const pageForbiddens = Utils.projectForbiddenControl(App.globalData.userProRoles,this.route)
    const {gid,jid,wid,status} = options
    this.setData({
      gid,
      jid,
      wid,
      status,
      navHeight: App.globalData.navHeight,
      // pageForbiddens
      // proStatus: App.globalData.proStatus
    })
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
