
class Request {
  constructor(params){
    this.header = params.header || {}
    this.auth = params.auth || false
    this.baseURL = params.baseURL || ''
    this.isDisconnect = false
  }
  get (url,data) {
    return this.request('GET',url,data)
  }
  post (url,data){
    return this.request('POST',url,data)
  }
  put(url,data){
    return this.request('PUT',url,data)
  }
  delete(url,data){
    return this.request('DELETE',url,data)
  }
  // 网络断开
  failed() {
    if(!this.isDisconnect) {
      wx.showModal({
        title: '提示',
        content: '暂无网络',
        success (res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/login/login',
            })
          }
        }
      })
      this.isDisconnect = true
    }
  }
  // 登录信息过期
  outdated() {
    if(!this.isDisconnect) {
      wx.showModal({
        title: '登录过期',
        content: '请重新登录',
        success (res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/login/login',
            })
          }
        }
      })
      this.isDisconnect = true
    }
  }
  // 登录白名单
  isGoLogin(url) {
    const whiteList = ['auth/wxlanding','auth/signup','sendsms/getSendsms']
    let isLogin = false
    for(const u of whiteList) {
      if(url.startsWith(u)) {
        isLogin = true
        break
      }
    }
    return isLogin
  }
  request (method,url,data) {
    return new Promise((resolve,reject) => {
      if(this.auth === true) { 
        try {
          const value = wx.getStorageSync('Authorization')
          if (value) {
            this.header.Authorization = value
          }
        }
        catch (e) {
          // Do something when catch error
          this.outdated()
          return reject('登录信息错误')
        }
      }
      if(!this.isDisconnect || this.isGoLogin(url) ) {
        this.isDisconnect = false
        wx.request({
          url: this.baseURL + url,
          data,
          method,
          header:this.header,
          success: (res) =>{
            const code = res.data.code && res.data.code.toString()
            if(!code) {
              this.failed()
              return reject('链接超时')
            }
            if(code === '403') {
              this.outdated()
              return reject('登录过期')
            }
  
            if(code.startsWith('4') || code.startsWith('5')) {
              wx.showToast({
                title: res.data.message,
                icon: 'error',
                duration: 1000
              })
              return reject(res.data.message || '程序错误')
            }
            return resolve(res.data.data)
          },
          fail:(err)=> {
            console.log(err,'链接超时')
            this.failed()
            return reject('链接超时')
          }
        })
      }
    })
  }
}

const request = new Request({
  withBaseURL:true
})
module.exports = Request
