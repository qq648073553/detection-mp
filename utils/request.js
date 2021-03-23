
class Request {
  constructor(params){
    this.header = params.header || {}
    this.auth = params.auth || false
    this.baseURL = params.baseURL || ''
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
  request (method,url,data) {
    // const vm = this

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
          wx.showModal({
            title: '提示',
            content: '请重新登录',
            success (res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '/pages/login/login',
                })
              }
            }
          })
          reject('登录信息错误')
        }
      }
      wx.request({
        url: this.baseURL + url,
        data,
        method,
        header:this.header,
        success(res){
          const code = res.data.code && res.data.code.toString()
          if(!code) {
            reject('链接超时')
          }
          if(code === '403') {
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
            reject('登录过期')
          }

          if(code.startsWith('4') || code.startsWith('5')) {
            console.log(res.data)
            reject(res.data.message || '程序错误')
          }
          resolve(res.data.data || {})
        },
        fail:(err)=> {
          console.log(err,'链接超时')
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
          reject('链接超时')
        }
      })


    })
  }
}

const request = new Request({
  withBaseURL:true
})
module.exports = Request
