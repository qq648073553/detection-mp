/*
 * @Author: holder
 * @Date: 2021-04-06 13:35:22
 * @LastEditors: holder
 * @LastEditTime: 2021-04-08 08:57:57
 * @Description: 
 */
// pages/pro-evaluate/pro-evaluate.js
const rateTipMap = new Map([[5,'非常好'],[4,'好'],[3,'一般'],[2,'差'],[1,'非常差']])
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    overview:{
      rate:5,
      tip:'非常好'
    },
    componse:{
      rate:5,
      tip:'非常好'
    },
    content:{
      rate:5,
      tip:'非常好'
    },
    speed:{
      rate:5,
      tip:'非常好'
    },
    grammar:{
      rate:5,
      tip:'非常好'
    },
    evaluate:'',
    fileList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: App.globalData.navHeight
    })
  },
  onChange(e){
    const name = e.currentTarget.dataset.name
    const obj = {
      [name]:{
        rate:e.detail,
        tip:rateTipMap.get(e.detail)
      }
    }
    this.setData(obj)
  },
  bindTextAreaBlur(e) {
    this.setData({evaluate:e.detail.value})
  },
    // 读取完立即上传
    afterRead(event) {
      const { file } = event.detail;
      if (Array.isArray(file)) {
        for (const f of file) {
          this.uploadFile(f)
        }
      } else {
        this.uploadFile(file)
      }
    },
    uploadFile(file) {
      const value = wx.getStorageSync('Authorization')
      wx.uploadFile({
        url: App.globalData.baseURL + 'file/file',
        filePath: file.url,
        name: 'file',
        header: {
          'Content-Type': 'multipart/form-data',
          'Authorization': value,//这是要token
        },
        success: (res) => {
          const data = JSON.parse(res.data).data
          // 暂未绑定，只是文件上传了 uid做标识
          file.uid = data.uid
          this.setData({
            fileList: [...this.data.fileList, data]
          })
        },
        fail: () => {
          wx.showToast({
            title: '文件保存失败,请重新上传',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    fileDelete(e) {
      // 删除文件 包括已绑定和未绑定
      const id = e.detail.file.uid || e.detail.file.id
      fetch.delete(`file/${id}`)
        .catch(() => {
          wx.showToast({
            title: '文件删除失败',
            icon: 'error',
            duration: 2000
          })
        })
    },
  formSubmit() {

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
