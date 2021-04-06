/*
 * @Author: your name
 * @Date: 2021-03-25 16:32:37
 * @LastEditTime: 2021-04-06 09:22:48
 * @LastEditors: holder
 * @Description: In User Settings Edit
 * @FilePath: \detection-mp\pages\human-resource\human-resource.js
 */
// pages/human-resource/human-resource.js
const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName:'send',
    list:[
      {
        id:1,
        name:'蒋',
        phone:'137760503'
      },
      {
        id:2,
        name:'怡',
        phone:'137760503'
      },
      {
        id:3,
        name:'凡',
        phone:'137760503'
      }
    ],
    name:'蒋',
    phone:'13776',
    editShow: false,
    addShow:false
  },
  toggleEditShow() {
    this.setData({ editShow: !this.data.editShow });
  },
  onAddConfirm(){
    this.setData({ addShow: !this.data.addShow });
  },
  onChange(event) {
    this.setData({
      activeName: event.detail.name,
    });
  },
  toggleAddShow(){
    this.setData({ addShow: !this.data.addShow });
  },
  onAddChange(event){
    console.log(event)
  },
  onAddToggle(event){
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },
  noop() { },
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