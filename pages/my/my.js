const App = getApp();

Page({
  data:{
    phone: '137****0390',
    email: 'zfd_yes@163.com'
  },
  logOut() {
    wx.reLaunch({
      url: '/pages/login/login'
    })
  },
  onLoad: function (options) {
    this.setData({
      navHeight: App.globalData.navHeight
    })
  }
})
