// pages/pro-search/pro-search.js
const App = getApp();
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    list:[
      {
        id: 1,
        ymd:'2020年12月26日',
        status: 0,
        title: '苏州中心扩建工程1号',
        remarks: '16:05 | 待受理'
      },
      {
        id:2,
        ymd:'2020年12月27日',
        status: 1,
        title: '苏州中心扩建工程2号',
        remarks: '16:05 | 已受理'
      },
      {
        id: 3,
        ymd:'2020年12月28日',
        status: 2,
        title: '苏州中心扩建工程3号',
        remarks: '16:05 | 已受理 | 委托10 | 报告200'
      }
    ],
    histories:['苏州中心', '华纳电影','苏州中心', '华纳电影','苏州中心', '华纳电影','苏州中心', '华纳电影','苏州中心', '华纳电影','苏州中心', '华纳电影']

  },
  goBusiness(e) {
    const {id,status} = e.currentTarget.dataset
    if(status == this.data.proStatus.beforeConfirm) {
      Toast.fail('暂未受理');
      return;
    }
    wx.navigateTo({
      url: `/pages/pro-delegation/pro-delegation?id=${id}`
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
      key: 'histories',
      success (res) {
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
