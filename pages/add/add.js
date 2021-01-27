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
        lastScroll:0,
        actionShow: false,
        actionTitle: '建设单位'
    },
    afterRead(){

    },
    formSubmit() {

    },
    setHeight(e) {
        const height = Math.max(e.detail.height, this.data.lastScroll)
        this.setData({
            padBottom:height * -1
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
            if(res.height === 0){
                const scrollTop = this.data.lastScroll
                this.setData({
                    padBottom:this.data.navHeight
                },()=>{
                        wx.pageScrollTo({
                            scrollTop:scrollTop,
                            fail(err) {
                                console.log(err)
                            }
                        })
                })
            }
        })
    },
    onPageScroll(obj) {
        if(obj.scrollTop !== 0){
            this.setData({
                lastScroll:obj.scrollTop
            })
        }
    }
})

