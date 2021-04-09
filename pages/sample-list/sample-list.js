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
    refreshStatus:false,

    list: [
      {
        id:1,
        title: '检测项目1',
        status: 1,
        color: '#4387F6',
        date: '2021/01/19 15:17',
        tags: ['未受理']
      },
      {
        id:2,
        title: '检测项目2',
        status: 2,
        color: '#F0641F',
        date: '2021/01/19 15:17',
        tags: ['待取样']
      },
      {
        id:3,
        title: '检测项目3',
        status: 3,
        color: '#3333CC',
        date: '2021/01/19 15:17',
        tags: ['等待报告']
      },
      {
        id:4,
        title: '检测项目4',
        status: 4,
        color: '#AE202C',
        date: '2021/01/19 15:17',
        tags: ['等待审核']
      },
      {
        id:5,
        title: '检测项目5',
        status: 5,
        color: '#33CC33',
        date: '2021/01/19 15:17',
        tags: ['报告数10']
      }
    ],
    histories:[],
    isRemained: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: App.globalData.navHeight,
      proStatus: App.globalData.proStatus,
      degStatus: App.globalData.degStatusMap,
      list: this.data.list,
      scrollHeight:App.globalData.scrollHeight
    })
    wx.getStorage({
      key: 'sampleHistories',
      success:res=> {
        this.setData({
          histories: res.data || []
        })
      }
    })
  },
  onSearch(event){
    const { detail } = event
    if (detail) {
      this.data.histories.unshift(detail)
    }
    // 保存最新的3个搜索记录
    this.data.histories = this.data.histories.slice(0, 3)
    wx.setStorage({ key: 'sampleHistories', data: this.data.histories })
    this.setData({
      searchValue: detail,
      list: [],
      isRemained: true,
      pageIndex: 0,
      histories: this.data.histories
    })
    // this.getList(0, 10, detail)
  },
  onFastSearch(event) {
    this.setData({
      searchValue: event.target.dataset.title,
      list: [],
      isRemained: true,
      pageIndex: 0,
    })
    // this.getList(0, 10, event.target.dataset.title)
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
  // 下拉刷新
  upper(){
    // this.setData({
    //   list:[],
    //   isRemained: true,
    //   pageIndex: 0,
    //   refreshStatus:true
    // },this.getList(0, 10, null))
    // setTimeout(()=>{
    //   this.setData({refreshStatus:false})
    // },1000)
  },
  // 上拉加载
  lower(){
    // if (this.data.isRemained) {
    //   this.getList(this.data.pageIndex + 1, 10, this.data.searchValue)
    //   this.setData({ pageIndex: this.data.pageIndex + 1 })
    // }
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
