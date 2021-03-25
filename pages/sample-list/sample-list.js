// pages/delegation-list/delegation-list.js
const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    proId:null,
    status: null,
    list: [
      {
        id:1,
        title: '检测项目1',
        status: 0,
        color: '#4387F6',
        date: '2021/01/19 15:17',
        tags: ['未受理']
      },
      {
        id:2,
        title: '检测项目2',
        status: 1,
        color: '#F0641F',
        date: '2021/01/19 15:17',
        tags: ['待取样']
      },
      {
        id:3,
        title: '检测项目3',
        status: 2,
        color: '#3333CC',
        date: '2021/01/19 15:17',
        tags: ['等待报告']
      },
      {
        id:4,
        title: '检测项目4',
        status: 3,
        color: '#AE202C',
        date: '2021/01/19 15:17',
        tags: ['等待审核']
      },
      {
        id:5,
        title: '检测项目5',
        status: 4,
        color: '#33CC33',
        date: '2021/01/19 15:17',
        tags: ['报告数10']
      }
    ],
    histories:['苏州中心', '华纳电影','苏州中心', '华纳电影','苏州中心', '华纳电影','苏州中心', '华纳电影','苏州中心', '华纳电影','苏州中心', '华纳电影']

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {status} = options
    this.setData({
      navHeight: App.globalData.navHeight,
      proStatus: App.globalData.proStatus,
      degStatus: App.globalData.degStatus,
      list: this.data.list
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
