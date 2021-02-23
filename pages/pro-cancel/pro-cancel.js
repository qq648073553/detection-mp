const App = getApp();
const TMAP = new Map([['0','工程撤销'],['1','委托撤单']])
const Request = require('../../utils/request')
const fetch = new Request({
    auth:true,
    header:App.globalData.header,
    baseURL: App.globalData.baseURL
})
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
    data: {
        project:'苏州中心',
        proId:'20200101',
        proDeg:'项目1',
        proDegId:'2020101',
        message: '',
        navTitle: '委托撤单'
    },

    formSubmit() {

    },
    setHeight(e) {
        const height = Math.max(e.detail.height, this.data.lastScroll)
        this.setData({
            padBottom:height * -1
        })
    },
    onLoad: async function (options) {
        const {type,gid,jid,wid} = options
        if(type === '0') {
            const response = await fetch.post('project/getOne',{gid,jid,wid});
            if(response.code === 0) {
                const {projectName,projectNum} = response.data
                this.setData({
                    project:projectName,
                    proId:projectNum
                })
            }
        }else {
            await fetch.get()
        }
        this.setData({
            navTitle: TMAP.get(type),
            navHeight: App.globalData.navHeight,
            padBottom:App.globalData.navHeight,
        })
    },
    onShow() {

    }
})

