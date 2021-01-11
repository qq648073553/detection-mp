// pages/function-list/function-list.js

const detectionList = [
      {
        title: '工程信息登记',
        icon: 'dengji',
        color: '#F0641F'
      },
      {
        title: '工程信息查看',
        icon: 'chakan',
        color: '#3FABFF'
      },
      {
        title: '委托信息登记',
        icon: 'weituo',
        color: '#F0641F'
      },
      {
        title: '委托信息查看',
        icon: 'chakan',
        color: '#3FABFF'
      },
      {
        title: '委托信息修改',
        icon: 'xiugai',
        color: '#DA251D'
      },
      {
        title: '检测进度查询',
        icon: 'jindu',
        color: '#3DC393'
      },
      {
        title: '现场检测预约',
        icon: 'yuyue',
        color: '#6445E3'
      }
    ]
const reportList = [
      {
        title: '报告检索',
        icon: 'jiansuo',
        color: '#3FABFF'
      },
      {
        title: '防伪认证',
        icon: 'renzheng',
        color: '#F0641F'
      },
      {
        title: '结果与结论查询',
        icon: 'jieguo',
        color: '#3DC393'
      },
      {
        title: '报告下载',
        icon: 'xiazai',
        color: '#DA251D'
      }
    ]
const balanceList = [
      {
        title: '工作量汇总',
        icon: 'huizong',
        color: '#3FABFF'
      },
      {
        title: '明细查看',
        icon: 'mingxi',
        color: '#F0641F'
      },
      {
        title: '结算清单',
        icon: 'jiesuan',
        color: '#3DC393'
      }
    ]
let listMap = new Map([[0,detectionList],[1,reportList], [2, balanceList]])
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    activeList: []
  },
  onChange(event) {
    this.setData({
      activeList:listMap.get(event.detail)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const key = +options.type || 0
        this.setData({
        activeKey:key,
        activeList:listMap.get(key)
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