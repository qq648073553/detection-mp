// pages/check-in/check-in.js
const App = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchValue: '',
        list:[
            {
                id: 1,
                ymd:'2020年12月26日',
                status: 0,
                title: '苏州中心扩建工程1号',
                remarks: '16:05 | 待受理',
                // tags: [
                //     {
                //         title:'标签1',
                //         color:'#3FABFF'
                //     },
                //     {
                //         title: '标签2',
                //         color: '#F0641F'
                //     }
                // ],
            },
            {
                id:2,
                ymd:'2020年12月27日',
                status: 1,
                title: '苏州中心扩建工程2号',
                remarks: '16:05 | 已受理'
            },
            {
                id: 3,
                ymd:'2020年12月28日',
                status: 2,
                title: '苏州中心扩建工程3号',
                remarks: '16:05 | 已受理 | 委托10 | 报告200'
            }
        ],
        scrollUpper: false,
        scrollHeight: 600,
        value: '',
        histories:['苏州中心', '华纳电影','苏州中心', '华纳电影','苏州中心', '华纳电影','苏州中心', '华纳电影','苏州中心', '华纳电影','苏州中心', '华纳电影']
    },
    scrollTop() {
        this.setData({
            scrollUpper: true,

        })
    },
    scrollBottom() {
        this.setData({
            scrollUpper: false
        })
        this.initScrollHeight()
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

    lower(e) {
        if(!this.data.scrollUpper) {
            this.setData({
                scrollUpper: true,
            })
        }

    },
    wxLogin() {

    },
    initScrollHeight() {
        const query = wx.createSelectorQuery()
        query.select('#proList').boundingClientRect()
        query.exec((res) => {
            const height = Math.min(res[0].height, 600)
            this.setData({
                scrollHeight: height
            })
        })
    },
    noop(e) {
        console.log(e)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            navHeight: App.globalData.navHeight,
            proStatus: App.globalData.proStatus
        })

        wx.getStorage({
            key: 'histories',
            success (res) {
                console.log(res.data)
                this.setData({
                    histories: res.data || []
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.initScrollHeight()

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
        // if(obj.scrollTop > 150 && !this.data.scrollUpper) {
        //     this.scrollTop()
        // }
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
