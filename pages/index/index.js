// pages/check-in/check-in.js
const App = getApp();
const Request = require('../../utils/request')
const fetch = new Request({
    auth: true,
    header: App.globalData.header,
    baseURL: App.globalData.baseURL
})
const Utils = require('../../utils/util')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
    },
    scan() {
        wx.scanCode({
            success(res) {
                console.log(res)
            }
        })
    },
    goBusiness(e) {
        const { gid, jid, wid } = e.currentTarget.dataset
        const url = Utils.urlJointParams('/pages/delegation-list/delegation-list', { gid, jid, wid })
        wx.navigateTo({
            url
        })
        // const {id,status} = e.currentTarget.dataset
        // if(status == this.data.proStatus.beforeConfirm) {
        //    wx.showToast({
        //        title:'暂未受理',
        //        icon:'error',
        //        duration:1000
        //    })
        //     return;
        // }

    },

    lower(e) {
        wx.navigateTo({
            url: '/pages/pro-search/pro-search'
        })
        // if(!this.data.scrollUpper) {
        //     this.setData({
        //         scrollUpper: true,
        //     })
        // }

    },
    getList(page, size, filterValue) {
        fetch.post(`project/get?page=${page}&size=${size}`, { content: filterValue })
            .then(data => {
                const projects = data.content
                if (Array.isArray(projects)) {
                    const list = projects.map(p => {
                        // + Utils.parseProStatus(p.status)
                        let remarks = '委托' + p.wtCount + ' | 报告' + p.reportCount
                        // if(p.status === App.globalData.proStatus.confirmed) {

                        //     remarks += ' | 委托' + p.wtCount + ' | 报告' + p.reportCount
                        // }
                        return {
                            title: p.projectName,
                            projectKey: p.jcprojectKey,
                            id: p.projectNum,
                            ymd: Utils.parseTime(new Date(p.date), '{y}年{m}月{d}日'),
                            // status:p.status,
                            remarks
                        }
                    })
                    this.setData({ list })
                }
            })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            navHeight: App.globalData.navHeight,
            proStatus: App.globalData.proStatus
        })
        this.getList(0, 5, null)
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
