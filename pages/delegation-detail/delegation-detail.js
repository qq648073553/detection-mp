const App = getApp();

Page({
    data: {
        navHeight:60,
        degId:'5555880',
        steps: [
            {
                text: '待受理',
                desc: '2020/01/16 17:14',

            },
            {
                text: '已受理，待送样',
                desc: '2020/01/16 17:14',
            },
            {
                text: '已收样，待检测',
                desc: '2020/01/16 17:14',
            },
            {
                text: '已检测，出具检测报告中',
                desc: '2020/01/16 17:14',
            },
            {
                text: '检测报告审核中',
                desc: '2020/01/16 17:14',
            },
            {
                text: '已出具检测报告。下载地址',
                desc: '2020/01/16 17:14',
                activeIcon: 'success'
            },
        ].reverse(),
        id: null,
        status: null,
        degStatus: []
    },
    setClipboard() {
        wx.setClipboardData({
            data: this.data.degId
        })
    },
    onStepClick(e){
      console.log(e)
    },
    onLoad: function (options) {
        const { id, status} = options

        this.setData({
            navHeight: App.globalData.navHeight,
            degStatus: App.globalData.degStatus,
            id,
            status
        })
    }
});
