// pages/location/location.js
const App = getApp();
const md5 = require('../../assets/scripts/md5')
const areaList = require('../../assets/scripts/area').default
const keyNative = "Y4ABZ-BUK62-47HUA-CACWB-BKIBS-4OBOD"
const key2Encode = "Y4ABZ-BUK62-47HUA-*****"
const keyUrl = "Y4ABZ-BUK62-47HUA-CACWB-BKIBS-*****"
const sk = "cEbR3CHfOfxvwiVtTx9nUqewRBNkAVBL"
// const Request = require('../../utils/request')
// const fetch = new Request({withBaseURL: false,})

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
  },
  onConfirm(e) {
    this.setData({
      areas:e.detail.values.reduce((init,val) => init + val.name,''),
      areaShow:false
    })
  },
  toggleShow() {
    this.setData({
      areaShow:!this.data.areaShow
    })
  },
  // 打开地图选择位置
  chooseLocation: function () {
    wx.chooseLocation({
      success: res => {
        const decode = `/ws/geocoder/v1?key=${keyNative}&location=${res.latitude},${res.longitude}${sk}`
        const encode = md5(decode)
        const url = `https://apis.map.qq.com/ws/geocoder/v1?key=${keyNative}&location=${res.latitude},${res.longitude}&sig=${encode}`
        wx.request({
          url:encodeURI(url),
          success:res=>{
            let data = res.data
            if(data.status === 0) {
              const {province, city, district} = data.result.address_component
              this.setData({
                areas: [province, city, district].join(''),
                detail:data.result.formatted_addresses.recommend
              })
            }
          },
          fail: err => {
            console.log(err)
            wx.showToast({
              title:'位置解析失败',
              icon:'error',
              duration:1000
            })
          }
        })
      },
      fail: () => {
        console.log('fail')
        // Toast.fail('无法选择位置')
        // fail
      }
    })
  },
  onSave() {
    const { areas, detail, remarks} = this.data
    if(areas.length > 0 && detail.length > 0) {
      
      // wx.redirectTo
      wx.setStorageSync('location',[areas,detail,remarks].join('|'))
      wx.navigateBack()
    }else {
      wx.showToast({
        title:'请选择地址',
        icon:'error',
        duration:1000
      })
    }
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
