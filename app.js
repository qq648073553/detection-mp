/*
 * @Author: holder
 * @Date: 2021-01-08 14:01:21
 * @LastEditors: holder
 * @LastEditTime: 2021-03-29 14:57:37
 * @Description: 
 */
//app.js
App({
  onLaunch: function () {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
            navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
            navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*2;//导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  globalData: {
    userInfo: {},
    header: {},
    baseURL:'http://192.168.0.191:8344/api/',
    proStatus: {
      beforeConfirm: 1,
      confirmed: 0,
      deprecated: 2
    },
    degStatus:['待受理','已受理','出具报告中','报告审核中','已出具报告']
  }
})
