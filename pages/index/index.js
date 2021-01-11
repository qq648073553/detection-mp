// pages/check-in/check-in.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[
            {
                id: 1,
                ymd:'2020年12月26日',
                status: '待送检',
                title: '苏州中心扩建工程1号',
                remarks: '16:05 | 摘要1 | 摘要2',
                operations:[
                    {
                        name:'操作做做',
                        url:'/pages/index/index'
                    },
                    {
                        name:'操作1',
                        url:'/pages/index/index'
                    },
                    {
                        name:'操作2',
                        url:'/pages/index/index'
                    }
                ]
            },
            {
                id:2,
                ymd:'2020年12月26日',
                status: '待送检',
                title: '苏州中心扩建工程扩建工程扩建工程扩建工程1号',
                remarks: '16:05 | 摘要1 | 摘要2 | 摘要2 | 摘要2 | 摘要2 | 摘要2 | 摘要2 | 摘要2',
                operations:[
                    {
                        name:'操作做做',
                        url:'/pages/index/index'
                    },
                    {
                        name:'操作1',
                        url:'/pages/index/index'
                    }
                ]
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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