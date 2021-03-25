/*
 * @Author: your name
 * @Date: 2021-01-27 00:06:52
 * @LastEditTime: 2021-03-25 09:58:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \detection-mp\pages\sample-add\sample-add.js
 */
const App = getApp();
Page({
  data: {
    observer: '',
    observerId: '',
    project: '苏州中心',
    proId: '20201212',
    delegation: '',
    message: '',
    statusOptions:[
      { value: 0, text: '已完成' },
      { value: 1, text: '未完成' }
    ],
    navTitle: '新增送样',
    padBottom: 0,
    fileList:[],
    lastScroll:0,
    actionShow: false,
    actionTitle: '建设单位'
  },
  afterRead(){

  },
  formSubmit() {

  },
  setHeight(e) {
    const height = Math.max(e.detail.height, this.data.lastScroll)
    this.setData({
      padBottom:height * -1
    })
  },
  onLoad: function (options) {
    const {type} = options
    const title = type === 'modify' ? '送样修改' : '新增送样'
    this.setData({
      navHeight: App.globalData.navHeight,
      padBottom:App.globalData.navHeight,
      navTitle: title
    })
  },
  onShow() {
    wx.onKeyboardHeightChange(res => {
      if(res.height === 0){
        const scrollTop = this.data.lastScroll
        this.setData({
          padBottom:this.data.navHeight
        },()=>{
          wx.pageScrollTo({
            scrollTop:scrollTop,
            fail(err) {
              console.log(err)
            }
          })
        })
      }
    })
  },
  onPageScroll(obj) {
    if(obj.scrollTop !== 0){
      this.setData({
        lastScroll:obj.scrollTop
      })
    }
  }
})

