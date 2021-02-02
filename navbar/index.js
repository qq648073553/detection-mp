const App = getApp();

Component({
    options: {
        addGlobalClass: true,
    },
    externalClasses: ['custom-class'],
    /**
     * 组件的属性列表
     */
    properties: {
        pageName:String,
        showNav: {
            type: Boolean,
            value: false
        },
        showHome: {
          type: Boolean,
          value: false
        },
        bgColor:{
            type: String,
            value: '#7096FE linear-gradient(to right, #4387F6, #799CFD)'
        },
        iconColor:{
            type: String,
            value: '#fff'
        },
        customBack:{
            type:Boolean,
            value:false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    lifetimes: {
        attached: function () {
            this.setData({
                navHeight: App.globalData.navHeight,
                navTop: App.globalData.navTop
            })
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        //回退
        _navBack: function () {
            if(this.data.customBack) {
                this.triggerEvent("back")
            }else {
                wx.navigateBack({
                    delta: 1
                })
            }

        },
        //回主页
        _toIndex: function () {
            wx.reLaunch({
                url: '/pages/index/index'
            })
        },
    }
})
