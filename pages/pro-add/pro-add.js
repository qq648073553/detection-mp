const App = getApp();
Page({
    data: {
        navTitle: '新建工程',
        proContact: '',
        proPhone: '',
        proCode: '',
        proTitle: '',
        proAddress: '请选择',
        proStatus: '请选择',
        buildContract: '',
        buildCom: '',
        buildConCom: '',
        buildDegCom: '',
        buildSettleCom: '',
        supervisionCode: '',
        supervisionQtCom:'',
        supervisionCom: '',
        statusOptions:[
            { name: '已完成', value: 0 },
            { name: '未完成', value: 1 }
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
    onSelect(e) {
        console.log(e.detail)
    },
    toggleShow() {
      this.setData({
          actionShow:!this.data.actionShow
      })
    },
    setHeight(e) {
        const height = Math.max(e.detail.height, this.data.lastScroll)
        this.setData({
            padBottom:height * -1
        })
    },
    onLoad: function (options) {
        const {type} = options
        const title = type === 'modify' ? '修改工程' : '新建工程'
        this.setData({
            navTitle: title,
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

