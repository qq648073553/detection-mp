/*
 * @Author: holder
 * @Date: 2021-04-09 14:33:56
 * @LastEditors: holder
 * @LastEditTime: 2021-04-09 14:33:57
 * @Description: 
 */
const App = getApp();

module.exports = {
    async onLoad(options) {
        const { type, sampleId = 1736, jid, wid, gid } = options
        if (jid && wid && gid) {
            let title = '新增送样'
            await this.getSampleParent()
            if (type === 'modify') {
                title = '送样修改'

                this.setDynamicParams(sampleId, '测试修改')
            }
            this.setData({
                navHeight: App.globalData.navHeight,
                padBottom: App.globalData.navHeight,
                navTitle: title,
                jid,
                wid,
                gid
            })
        } else {
            wx.navigateBack()
        }
    },
    onShow() {
        try {
            let value = wx.getStorageSync('location')
            if (value) {
                this.setData({
                    sampleAddress: value
                })
            }
        } catch (error) {

        }
        wx.onKeyboardHeightChange(res => {
            if (res.height === 0) {
                const scrollTop = this.data.lastScroll
                this.setData({
                    padBottom: this.data.navHeight
                }, () => {
                    wx.pageScrollTo({
                        scrollTop: scrollTop,
                        fail(err) {
                            console.log(err)
                        }
                    })
                })
            }
        })
    },
    onPageScroll(obj) {
        if (obj.scrollTop !== 0) {
            this.setData({
                lastScroll: obj.scrollTop
            })
        }
    }
}