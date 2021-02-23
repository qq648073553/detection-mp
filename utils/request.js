
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
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          reject({
            code: 401,
            message:'登录信息错误'
          })
        }
      }
      wx.request({
        url: this.baseURL + url,
        data,
        method,
        header:this.header,
        success(res){
          const code = res.data.code && res.data.code.toString()
          // if(code.startsWith('4') || ) {}
          resolve(res.data)
        },
        fail:(err)=> {
          console.log(err,'链接超时')
          reject({
            code:500,
            msg:'连接超时',
            url:this.baseURL + url,
            method,
            data
          })
        }
      })


    })
  }
}

const request = new Request({
  withBaseURL:true
})
module.exports = Request
