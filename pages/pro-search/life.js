/*
 * @Author: holder
 * @Date: 2021-04-09 14:25:12
 * @LastEditors: holder
 * @LastEditTime: 2021-04-09 14:30:24
 * @Description: 
 */
const App = getApp();

const life = {

    onLoad: function (options) {
        this.setData({
            navHeight: App.globalData.navHeight,
            proStatus: App.globalData.proStatus,
            scrollHeight: App.globalData.scrollHeight
        })
        wx.getStorage({
            key: 'proHistories',
            success: res => {
                this.setData({
                    histories: res.data || []
                })
            }
        })
        this.getList(0, 10, null)

    },

   onShareAppMessage: function () {

},
   onPullDownRefresh: function () {
    // this.setData({list:[],isRemained: true,pageIndex: 0},this.getList(0, 10, null))
  },

  onReachBottom: function () {
    // if (this.data.isRemained) {
    //   this.getList(this.data.pageIndex + 1, 10, this.data.searchValue)
    //   this.setData({ pageIndex: this.data.pageIndex + 1 })
    // }

  },
    onReady: function () {

    },


    onShow: function () {

    },

  onHide: function () {

},


onUnload: function () {

},
}
module.exports = life