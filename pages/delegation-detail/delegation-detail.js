const App = getApp();

Page({
    data: {
        navHeight:60,
        degId:0,
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
    },
    onLoad: function (options) {
        this.setData({
            navHeight: App.globalData.navHeight,
        })
    }
});
