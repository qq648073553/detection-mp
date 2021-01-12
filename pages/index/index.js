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
                status: {
                    title: '待送检',
                    color: '#3FABFF'
                },
                title: '苏州中心扩建工程1号',
                remarks: '16:05 | 摘要1 | 摘要2',
                tags: [
                    {
                        title:'标签1',
                        color:'#3FABFF'
                    },
                    {
                        title: '标签2',
                        color: '#F0641F'
                    }
                ],
                operations:[
                    {
                        title:'检测预约',
                        url:'/pages/delegation-add/delegation-add',
                        color: '#00AEFD'
                    }
                ]
            },
            {
                id:2,
                ymd:'2020年12月26日',
                status: {
                    title: '待检测',
                    color: '#F0641F'
                },
                title: '苏州中心扩建工程扩建工程扩建工程扩建工程1号',
                remarks: '16:05 | 摘要1 | 摘要2 | 摘要2 | 摘要2 | 摘要2 | 摘要2 | 摘要2 | 摘要2',
                tags: [
                    {
                        title:'标签1',
                        color:'#3FABFF'
                    },
                    {
                        title: '标签2',
                        color: '#F0641F'
                    }
                ],
                operations:[
                    {
                        title:'操作做做',
                        url:'/pages/index/index',
                        color: '#00AEFD'
                    },
                    {
                        title:'操作1',
                        url:'/pages/index/index',
                        color: '#0094FE'
                    }
                ]
            },
            {
                id: 3,
                ymd:'2020年12月26日',
                status: {
                    title: '待送检',
                    color: '#3FABFF'
                },
                title: '苏州中心扩建工程1号',
                remarks: '16:05 | 摘要1 | 摘要2',
                tags: [
                    {
                        title:'标签1',
                        color:'#3FABFF'
                    },
                    {
                        title: '标签2',
                        color: '#F0641F'
                    }
                ],
                operations:[
                    {
                        title:'操作做做',
                        url:'/pages/delegation-add/delegation-add',
                        color: '#00AEFD'
                    },
                    {
                        title:'操作1',
                        url:'/pages/check-in/check-in',
                        color: '#0094FE'
                    },
                    {
                        title:'操作2',
                        url:'/pages/index/index',
                        color: '#FE606F'
                    }
                ]
            },
            {
                id:4,
                ymd:'2020年12月26日',
                status: {
                    title: '待检测',
                    color: '#F0641F'
                },
                title: '苏州中心扩建工程扩建工程扩建工程扩建工程1号',
                remarks: '16:05 | 摘要1 | 摘要2 | 摘要2 | 摘要2 | 摘要2 | 摘要2 | 摘要2 | 摘要2',
                tags: [
                    {
                        title:'标签1',
                        color:'#3FABFF'
                    },
                    {
                        title: '标签2',
                        color: '#F0641F'
                    }
                ],
                operations:[
                    {
                        title:'操作做做',
                        url:'/pages/index/index',
                        color: '#00AEFD'
                    },
                    {
                        title:'操作1',
                        url:'/pages/index/index',
                        color: '#0094FE'
                    }
                ]
            },
            {
                id: 5,
                ymd:'2020年12月26日',
                status: {
                    title: '待送检',
                    color: '#3FABFF'
                },
                title: '苏州中心扩建工程1号',
                remarks: '16:05 | 摘要1 | 摘要2',
                tags: [
                    {
                        title:'标签1',
                        color:'#3FABFF'
                    },
                    {
                        title: '标签2',
                        color: '#F0641F'
                    }
                ],
                operations:[
                    {
                        title:'操作做做',
                        url:'/pages/delegation-add/delegation-add',
                        color: '#00AEFD'
                    },
                    {
                        title:'操作1',
                        url:'/pages/check-in/check-in',
                        color: '#0094FE'
                    },
                    {
                        title:'操作2',
                        url:'/pages/index/index',
                        color: '#FE606F'
                    }
                ]
            },
            {
                id:6,
                ymd:'2020年12月26日',
                status: {
                    title: '待检测',
                    color: '#F0641F'
                },
                title: '苏州中心扩建工程扩建工程扩建工程扩建工程1号',
                remarks: '16:05 | 摘要1 | 摘要2 | 摘要2 | 摘要2 | 摘要2 | 摘要2 | 摘要2 | 摘要2',
                tags: [
                    {
                        title:'标签1',
                        color:'#3FABFF'
                    },
                    {
                        title: '标签2',
                        color: '#F0641F'
                    }
                ],
                operations:[
                    {
                        title:'操作做做',
                        url:'/pages/index/index',
                        color: '#00AEFD'
                    },
                    {
                        title:'操作1',
                        url:'/pages/index/index',
                        color: '#0094FE'
                    }
                ]
            },
            {
                id: 7,
                ymd:'2020年12月26日',
                status: {
                    title: '待送检',
                    color: '#3FABFF'
                },
                title: '苏州中心扩建工程1号',
                remarks: '16:05 | 摘要1 | 摘要2',
                tags: [
                    {
                        title:'标签1',
                        color:'#3FABFF'
                    },
                    {
                        title: '标签2',
                        color: '#F0641F'
                    }
                ],
                operations:[
                    {
                        title:'操作做做',
                        url:'/pages/delegation-add/delegation-add',
                        color: '#00AEFD'
                    },
                    {
                        title:'操作1',
                        url:'/pages/check-in/check-in',
                        color: '#0094FE'
                    },
                    {
                        title:'操作2',
                        url:'/pages/index/index',
                        color: '#FE606F'
                    }
                ]
            },
            {
                id:8,
                ymd:'2020年12月26日',
                status: {
                    title: '待检测',
                    color: '#F0641F'
                },
                title: '苏州中心扩建工程扩建工程扩建工程扩建工程1号',
                remarks: '16:05 | 摘要1 | 摘要2 | 摘要2 | 摘要2 | 摘要2 | 摘要2 | 摘要2 | 摘要2',
                tags: [
                    {
                        title:'标签1',
                        color:'#3FABFF'
                    },
                    {
                        title: '标签2',
                        color: '#F0641F'
                    }
                ],
                operations:[
                    {
                        title:'操作做做',
                        url:'/pages/index/index',
                        color: '#00AEFD'
                    },
                    {
                        title:'操作1',
                        url:'/pages/index/index',
                        color: '#0094FE'
                    }
                ]
            }
        ],
        scrollUpper: false
    },
    goSearch() {
        wx.navigateTo({
            url:'/pages/pro-search/pro-search'
        })
    },
    goDetail() {
        wx.navigateTo({
            url:'/pages/pro-detail/pro-detail'
        })
    },
    upper(e) {
        console.log(e)
        this.setData({
            scrollUpper: false
        })
    },
    lower(e) {
        console.log(e)
        this.setData({
            scrollUpper: true
        })
    },
    scroll(e) {
      console.log(e.detail.scrollTop)
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

    },
    onPageScroll(obj) {
        // console.log(document.getElementById('#index-inform'))
        // if(obj.scrollTop > 100 && this.data.informDisplay !== 'none') {
        //     this.setData({
        //         informDisplay: 'none'
        //     })
        // }else if(obj.scrollTop < 100 && this.data.informDisplay !== 'block'){
        //     this.setData({
        //         informDisplay: 'block'
        //     })
        // }
    }

})