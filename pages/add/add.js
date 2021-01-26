const App = getApp();
Page({
    data: {
        project: {
            contact: '',
            phone: '',
            code: '',
            title: '',
            address: '',
            status: ''
        },
        build: {
            contract: '',
            buildCom:'',
            constructionCom: '',
            delegationCom: '',
            amountCom: ''
        },
        supervision: {
            code: '',
            qualityCom: '',
            supervisionCom: ''

        },
        statusOptions:[
            { value: 0, text: '已完成' },
            { value: 1, text: '未完成' }
        ],
        padBottom: 0,
        fileList:[],
        actionShow: false,
        actionTitle: '建设单位'
    },
    afterRead(){

    },
    formSubmit() {

    },
    setPadding(e) {
        console.log(e)
        this.setData({
            padBottom:(e.target.offsetTop - this.data.navHeight - 10) * -1
        })
    },
    onLoad: function (options) {
        this.setData({
            navHeight: App.globalData.navHeight,
            padBottom:App.globalData.navHeight,
        })
    },
    onShow() {
        wx.onKeyboardHeightChange(res => {
            const height = (res.height * -1) || this.data.navHeight
            this.setData({
                padBottom:height
            })
        })
    }
})

