const App = getApp();
Page({
  data: {
    project:'苏州中心',
    proId:'20200101',
    proDeg:'项目1',
    proDegId:'2020101',
    message: '',
    padBottom: 0,
    lastScroll:0,
    fileList:[]
  },
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
        success: (res) => {
          const data = JSON.parse(res.data).data
          // 暂未绑定，只是文件上传了 uid做标识
          file.uid = data.uid
          this.setData({
            fileList: [...this.data.fileList, data]
          })
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
      fetch.delete(`file/${id}`)
        .catch(() => {
          wx.showToast({
            title: '文件删除失败',
            icon: 'error',
            duration: 2000
          })
        })
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
    const {type} = options
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

