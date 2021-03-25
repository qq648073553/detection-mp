/*
 * @Author: your name
 * @Date: 2021-01-27 00:06:52
 * @LastEditTime: 2021-03-25 15:34:57
 * @LastEditors: Please set LastEditors
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
    navTitle: '送样确认',
    padBottom: 0,
    fileList:[],
    lastScroll:0,
    actionShow: false,
    actionTitle: '建设单位',
    active:1,
    activeName:'1',
    radio:'1',
    list: ['a', 'b', 'c'],
    result: ['a', 'b'],
    statusOptions:[
      { name: '已完成', value: true },
      { name: '未完成', value: false }
  ],
  },
  onStandardChange(event) {
    this.setData({
      result: event.detail
    });
  },

  onStandardToggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  noop() {},
  onRadioChange(event){
    this.setData({
      radio: event.detail,
    });
  },
  onSampleClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },
  onCancel(){
    this.setData({actionShow:!this.data.actionShow})
  },
  onConfirm(){
    this.setData({actionShow:!this.data.actionShow})
  },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
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
    // const title = type === 'modify' ? '送样修改' : '新增送样'
    this.setData({
      navHeight: App.globalData.navHeight,
      padBottom:App.globalData.navHeight,
      // navTitle: title
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

