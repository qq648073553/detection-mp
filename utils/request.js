
class Request {
  constructor(params){
    this.withBaseURL = params.withBaseURL
    this.baseURL = params.baseURL || 'http://localhost:60877/api/mini/'
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
      wx.request({
        url: this.withBaseURL ? this.baseURL + url: url,
        data,
        method,
        success(res){
          resolve(res.data)
        },
        fail() {
          reject({
            msg:'请求失败',
            url:this.withBaseURL ? this.baseURL + url: url,
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
