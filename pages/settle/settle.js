// pages/settle/settle.js
const App = getApp();

const months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
const quarters = ['一季度','二季度','三季度']
const latestYear = new Date().getFullYear()
const years = [ latestYear,latestYear - 1, latestYear - 2,].map( v => v + '年')
const COLUMNS = [
    [
        {values: years, className:'column1'},
      {values: months, className:'column2'}
      ],
  [
    {values: years, className:'column1'},
    {values: quarters, className:'column2'}
  ],
  years,
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterDate: '全部',
    chooseDate:'',
    actionShow: true,
    actionType: 0,
    list:[
      {
        title:'2021大叔大婶阿达大大叔大叔大叔大叔是',
        id:1
      },
      {
        title:'2021大叔大婶阿达大大叔大叔大叔大叔是',
        id:2
      },
      {
        title:'2021大叔大婶阿达大大叔大叔大叔大叔是',
        id:3
      },
    ],
    columns: COLUMNS[0],
  },
  onCancel() {
    this.setData({
      actionShow:!this.data.actionShow
    })
  },
  onConfirm() {
    const selected = this.selectComponent('#picker').getValues()
    if(selected.length === 0) {
      selected.push('全部')
    }
    console.log(selected)
    this.setData({
      actionShow:false,
      filterDate:selected.join('')
    })
  },

  switchAction(e) {
    const type = +e.target.dataset.type
    const columns = COLUMNS[type] || []
    this.setData({
      actionType:type,
      columns:columns
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: App.globalData.navHeight,
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
