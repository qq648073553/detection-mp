/*
 * @Author: your name
 * @Date: 2021-03-25 16:32:37
 * @LastEditTime: 2021-04-06 16:10:16
 * @LastEditors: holder
 * @Description: In User Settings Edit
 * @FilePath: \detection-mp\pages\human-resource\human-resource.js
 */
// pages/human-resource/human-resource.js
const titleMap = new Map([['ROLE_DELIVERER','新增送样员'],['ROLE_QUALITY','新增质监员'],['ROLE_WITNESSES','新增见证员'],['ROLE_CONSTRUCTION','新增建设单位联系人']])
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
    actionTitle:'新增送样人',
    searchPeople:'蒋137760503',
    addSelected:[],
    searchValue:'',
    name:'蒋',
    phone:'13776',
    // editShow: false,
    addShow:true
  },
  // 删除用户关联信息
  peopleDelete(){

  },
  onSearch(){},
  toggleEditShow() {
    this.setData({ editShow: !this.data.editShow });
  },
  onAddConfirm(){
    this.setData({ addShow: !this.data.addShow });
  },
  onChange(event) {
    this.setData({
      activeName: event.detail.name,
      actionTitle:titleMap.get(event.detail.name)
    });
  },
  toggleAddShow(){
    this.setData({ addShow: !this.data.addShow });
  },
  // onAddChange(event){
  //   this.setData({
  //     addSelected:event.detail
  //   })
  // },
  // onAddToggle(event){
  //   const { index } = event.currentTarget.dataset;
  //   const checkbox = this.selectComponent(`.checkboxes-${index}`);
  //   checkbox.toggle();
  // },
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