/*
 * @Author: holder
 * @Date: 2021-03-24 15:29:13
 * @LastEditors: holder
 * @LastEditTime: 2021-03-30 13:18:18
 * @Description: 
 */
// pages/delegation-list/delegation-list.js
const App = getApp();
const Request = require('../../utils/request')
const fetch = new Request({
  auth: true,
  header: App.globalData.header,
  baseURL: App.globalData.baseURL
})
const Utils = require('../..//utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: null,
    pageIndex: 0,
    list: [],
    histories: [],
    isRemained: true

  },
  getList(page, size, filterValue, projectKey) {
    const { gid, jid, wid } = this.data
    projectKey = projectKey || { gid, jid, wid }
    fetch.post(`entrust/get?page=${page}&size=${size}`, { content: filterValue, projectKey })
      .then(data => {
        const projects = data.content

        if (Array.isArray(projects)) {
          if (projects.length === 0) {
            this.setData({ isRemained: false })
            return
          }
          const list = projects.map(p => {
            // + Utils.parseProStatus(p.status)
            const remarks = `${p.entrustName} | ${p.entrustNum}`
            // if(p.status === App.globalData.proStatus.confirmed) {

            //     remarks += ' | 委托' + p.wtCount + ' | 报告' + p.reportCount
            // }
            return {
              title: Utils.parseTime(new Date(p.date), '{y}年{m}月{d}日') ,
              id: p.id,
              status: p.status,
              statusZh: p.statusZh,
              remarks
            }
          })
          this.setData({ list: this.data.list.concat(list) })
        }
      })
  },
  onFastSearch(event) {
    this.setData({
      searchValue: event.target.dataset.title,
      list: [],
      isRemained: true,
      pageIndex: 0,
    })

    this.getList(0, 10, event.target.dataset.title)
  },
  onSearch(event) {
    const { detail } = event
    if (detail) {
      this.data.histories.unshift(detail)
    }
    // 保存最新的3个搜索记录
    this.data.histories = this.data.histories.slice(0, 3)
    wx.setStorage({ key: 'proHistories', data: this.data.histories })
    this.setData({
      searchValue: detail,
      list: [],
      isRemained: true,
      pageIndex: 0,
      histories: this.data.histories
    })

    this.getList(0, 10, detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { gid, jid, wid } = options
    this.getList(0, 10, null, { gid, jid, wid })
    this.setData({
      navHeight: App.globalData.navHeight,
      proStatus: App.globalData.proStatus,
      degStatus: App.globalData.degStatus,
      list: this.data.list,
      gid,
      jid,
      wid
    })
    wx.getStorage({
      key: 'histories',
      success(res) {
        console.log(res.data)
        this.setData({
          histories: res.data || []
        })
      }
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
    this.setData({ list: [],isRemained:true,pageIndex: 0 }, this.getList(0, 10, null)    )
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isRemained) {
      this.getList(this.data.pageIndex + 1, 10, this.data.searchValue)
      this.setData({ pageIndex: this.data.pageIndex + 1 })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
