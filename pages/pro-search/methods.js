/*
 * @Author: holder
 * @Date: 2021-04-09 14:31:46
 * @LastEditors: holder
 * @LastEditTime: 2021-04-09 14:33:38
 * @Description: 
 */
const App = getApp();
const Request = require('../../utils/request')
const fetch = new Request({
    auth: true,
    header: App.globalData.header,
    baseURL: App.globalData.baseURL
})
const Utils = require('../../utils/util')
module.exports = {
    async goBusiness(e) {
        // 查看用户在此工程上的角色
        const { gid, jid, wid, title } = e.currentTarget.dataset
        const roles = await fetch.post('project/getRoles', { gid, jid, wid })
        App.globalData.userProRoles = roles
        App.globalData.gid = gid
        App.globalData.jid = jid
        App.globalData.wid = wid
        App.globalData.proTitle = title
        const url = Utils.urlJointParams('/pages/delegation-overview/delegation-overview')
        wx.navigateTo({
            url
        })
    },
    getList(page, size, filterValue) {
        fetch.post(`project/get?page=${page}&size=${size}`, { content: filterValue })
            .then(data => {
                const projects = data.content

                if (Array.isArray(projects)) {
                    if (projects.length === 0) {
                        this.setData({ isRemained: false })
                        return
                    }
                    const list = projects.map(p => {
                        // + Utils.parseProStatus(p.status)
                        let remarks = '委托' + p.wtCount + ' | 报告' + p.reportCount
                        // if(p.status === App.globalData.proStatus.confirmed) {

                        //     remarks += ' | 委托' + p.wtCount + ' | 报告' + p.reportCount
                        // }
                        return {
                            title: p.projectName,
                            projectKey: p.jcprojectKey,
                            id: p.projectNum,
                            ymd: Utils.parseTime(new Date(p.date), '{y}年{m}月{d}日'),
                            // status:p.status,
                            remarks
                        }
                    })

                    this.setData({ list: this.data.list.concat(list) })
                }
            })
    },
    onFastSearch(event) {
        this.setData({
            searchValue: event.target.dataset.title,
            list: [],
            isRemained: true,
            pageIndex: 0,
        })
        this.getList(0, 10, event.target.dataset.title)
    },
    onSearch(event) {
        const { detail } = event
        if (detail) {
            this.data.histories.unshift(detail)
        }
        // 保存最新的3个搜索记录
        this.data.histories = this.data.histories.slice(0, 3)
        wx.setStorage({ key: 'proHistories', data: this.data.histories })
        this.setData({
            searchValue: detail,
            list: [],
            isRemained: true,
            pageIndex: 0,
            histories: this.data.histories
        })
        this.getList(0, 10, detail)
    },
    // 下拉刷新
    upper() {
        this.setData({
            list: [],
            isRemained: true,
            pageIndex: 0,
            refreshStatus: true
        }, this.getList(0, 10, null))
        setTimeout(() => {
            this.setData({ refreshStatus: false })
        }, 1000)
    },
    // 上拉加载
    lower() {
        if (this.data.isRemained) {
            this.getList(this.data.pageIndex + 1, 10, this.data.searchValue)
            this.setData({ pageIndex: this.data.pageIndex + 1 })
        }
    },
}