/*
 * @Author: holder
 * @Date: 2021-04-09 14:37:44
 * @LastEditors: holder
 * @LastEditTime: 2021-04-09 14:42:12
 * @Description: 
 */
const App = getApp();
const Request = require('../utils/request')
const fetch = new Request({
    auth: true,
    header: App.globalData.header,
    baseURL: App.globalData.baseURL
})
module.exports = {
        // 读取完立即上传
        afterRead(event) {
            const { file } = event.detail;
            if (Array.isArray(file)) {
                for (const f of file) {
                    this.uploadFile(f)
                }
            } else {
                this.uploadFile(file)
            }
        },
        uploadFile(file) {
            const value = wx.getStorageSync('Authorization')
            wx.uploadFile({
                url: App.globalData.baseURL + 'file/file',
                filePath: file.url,
                name: 'file',
                header: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': value,//这是要token
                },
                formData: {
                    type: App.globalData.fileTypes.get('sampleAdd')
                },
                success: (res) => {
                    const id = JSON.parse(res.data).data
                    // 暂未绑定，只是文件上传了 uid做标识
                    if (id) {
                        file.uid = id
                        this.setData({
                            fileList: [...this.data.fileList, file]
                        })
                    } else {
                        wx.showToast({
                            title: '文件保存失败,请重新上传',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                },
                fail: () => {
                    wx.showToast({
                        title: '文件保存失败,请重新上传',
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        },
        fileDelete(e) {
            // 删除文件 包括已绑定和未绑定
            const id = e.detail.file.uid || e.detail.file.id
            id && (
                fetch.delete(`file/deleteFile/${id}`).then(() => {
                    const index = this.data.fileList.findIndex(v => (id === v.uid || id === v.id))
                    this.data.fileList.splice(index, 1)
                    this.setData({
                        fileList: [...this.data.fileList]
                    })
                })
            )
        },
}