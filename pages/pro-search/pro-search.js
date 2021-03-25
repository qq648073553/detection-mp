// pages/pro-search/pro-search.js
const App = getApp();
const Request = require('../../utils/request')
const fetch = new Request({
  auth:true,
  header:App.globalData.header,
  baseURL: App.globalData.baseURL
})
const Utils = require('../..//utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    pageIndex:0,
    list:[],
    histories:[],
    isRemained:true

  },
  goBusiness(e) {
    const {gid,jid,wid,status} = e.currentTarget.dataset
    
    if(status == this.data.proStatus.beforeConfirm) {
      wx.showToast({
        title: '暂未受理',
        icon:'error',
        duration:1000
      })
      return;
    }
    wx.navigateTo({
      url: `/pages/delegation-list/delegation-list?gid=${gid}&jid=${jid}&wid=${wid}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: App.globalData.navHeight,
      proStatus: App.globalData.proStatus
    })
    wx.getStorage({
      key: 'proHistories',
      success: res => {
        this.setData({
          histories: res.data || []
        })
      }
    })
    this.getList(0,5,'')

  },
  getList(page,size,filterValue) {
    fetch.get(`project/list?page=${page}&size=${size}&filterValue=${filterValue}`)
    .then(projects => {
        if(Array.isArray(projects)) {
          if(projects.length === 0) {
            this.setData({isRemained:false})
            return
          }
            const list = projects.map(p => {
                let remarks = Utils.parseTime(new Date(p.date), '{h}:{i}') + ' | ' + Utils.parseProStatus(p.status)
                if(p.status === App.globalData.proStatus.confirmed) {
                    remarks += ' | 委托' + p.wtCount + ' | 报告' + p.reportCount
                }
                return {
                    title: p.title,
                    projectKey:p.projectKey,
                    id:p.id,
                    ymd:Utils.parseTime(new Date(p.date),'{y}年{m}月{d}日'),
                    status:p.status,
                    remarks
                }
            })
            this.setData({list:this.data.list.concat(list)})
        }
})
.catch((err) => {
  console.log(err)
        wx.showToast({
            title: err,
            icon:'error',
            duration:2000
        })
    })
},
  onFastSearch(event) {
    this.setData({
      searchValue:event.target.dataset.title || '',
      list: [],
      isRemained:true,
      pageIndex:0,
      })
    this.getList(0,5,event.target.dataset.title || '')
  },
  onSearch(event) {
    const {detail} = event
    if(detail) {
      this.data.histories.unshift(detail)
    }
    // 保存最新的3个搜索记录
    this.data.histories = this.data.histories.slice(0,3)
    wx.setStorage({key:'proHistories',data:this.data.histories})
    this.setData({
      searchValue:detail,
      list: [],
      isRemained:true,
      pageIndex:0,
      histories:this.data.histories})
    this.getList(0,5,detail)
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
    if(this.data.isRemained) {
      this.setData({pageIndex:this.data.pageIndex + 1})
      this.getList(this.data.pageIndex + 1,5, this.data.searchValue)
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
