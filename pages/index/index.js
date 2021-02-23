// pages/check-in/check-in.js
const App = getApp();
const Request = require('../../utils/request')
const fetch = new Request({
    auth:true,
    header:App.globalData.header,
    baseURL: App.globalData.baseURL
})
const Utils = require('../..//utils/util')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
    },
    scan() {
        wx.scanCode({
            success (res) {
                console.log(res)
            }
        })
    },
    goBusiness(e) {
        const {id,status} = e.currentTarget.dataset
        if(status == this.data.proStatus.beforeConfirm) {
           wx.showToast({
               title:'暂未受理',
               icon:'error',
               duration:1000
           })
            return;
        }
      wx.navigateTo({
          url: `/pages/pro-delegation/pro-delegation?id=${id}`
      })
    },

    lower(e) {
        wx.navigateTo({
            url:'/pages/pro-search/pro-search'
        })
        // if(!this.data.scrollUpper) {
        //     this.setData({
        //         scrollUpper: true,
        //     })
        // }

    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            navHeight: App.globalData.navHeight,
            proStatus: App.globalData.proStatus
        })
        fetch.post('project/get?page=0&size=10',{})
            .then(res => {
                if(Array.isArray(res.content)) {
                    const list = res.content.map(p => {
                        return {
                            title: p.projectName,
                            projectKey:p.projectKey,
                            id:p.projectNum,
                            ymd:Utils.parseTime(new Date(p.date),'{y}年{m}月{d}日'),
                            status:p.status,
                            remarks: [
                                Utils.parseTime(new Date(p.date), '{h}:{i}'),Utils.parseProStatus(p.status),
                                p.wtCount ? '委托' + p.wtCount : null, p.reportCount ? '报告' + p.reportCount : null
                            ].filter(v=>v).join(' | ')
                        }
                    })
                    this.setData({list})
                }
        })
            .catch((err) => {
                wx.showToast({
                    title: '服务器未响应',
                    icon:'error',
                    duration:2000
                })
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
        this.lower()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    onPageScroll(obj) {

    }

})
