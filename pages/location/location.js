// pages/location/location.js
const App = getApp();
const md5 = require('../../assets/scripts/md5')
const areaList = require('../../assets/scripts/area').default
const keyNative = "Y4ABZ-BUK62-47HUA-CACWB-BKIBS-4OBOD"
const key2Encode = "Y4ABZ-BUK62-47HUA-*****"
const keyUrl = "Y4ABZ-BUK62-47HUA-CACWB-BKIBS-*****"
const sk = "cEbR3CHfOfxvwiVtTx9nUqewRBNkAVBL"
const Request = require('../../utils/request')
const fetch = new Request({withBaseURL: false,})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areas: '请选择',
    detail: '',
    areaList:areaList,
    areaShow:false,
    matchShow: false,
    remarks: '',
    list:[
        '苏州市',
      '苏州市',
      '苏州市',
      '苏州市',
      '苏州市',
      '苏州市',
      '苏州市',
      '苏州市',
      '苏州市',
      '苏州市',
      '苏州市',
      '苏州市',
      '苏州市',
      '苏州市',
      '苏州市',
      '苏州市',
    ]
  },
  toggleShow() {
    this.setData({
      areaShow:!this.data.areaShow
    })
  },
  onSearchChange(e) {

    if(e.detail.length === 0) {
      this.setData({
        matchShow: false
      })
    }else {
      if(!this.data.matchShow) {
        this.setData({
          matchShow: true
        })
      }
    }
  },
  onConfirm(e) {
    this.setData({
      areas:e.detail.values.reduce((init,val) => init + val.name,''),
      areaShow:false
    })
  },
  // 打开地图选择位置
  chooseLocation: function () {
    wx.chooseLocation({
      success: res => {
        const decode = `/ws/geocoder/v1?key=${keyNative}&location=${res.latitude},${res.longitude}${sk}`
        const encode = md5(decode)
        const url = `https://apis.map.qq.com/ws/geocoder/v1?key=${keyNative}&location=${res.latitude},${res.longitude}&sig=${encode}`
        fetch.get(encodeURI(url)).then(res=>{
          if(res.status === 0) {
            const {province, city, district} = res.result.address_component
            this.setData({
              areas: [province, city, district].join(''),
              detail:res.result.formatted_addresses.recommend
            })
          }
        }).catch(err => {
          console.log(err)
        })


      },
      fail: () => {
        console.log('fail')
        // fail
      }
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
