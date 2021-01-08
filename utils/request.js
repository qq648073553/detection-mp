/*
 * @Author: zfd
 * @Date: 2020-10-29 21:30:21
 * @LastEditors: zfd
 * @LastEditTime: 2020-11-08 14:28:16
 * @Description: 
 */
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
    const vm = this
    return new Promise((resolve,reject) => {
      wx.request({
        url: vm.withBaseURL ? vm.baseURL + url: url,
        data,
        method,
        success(res){
          resolve(res)
        },
        fail() {
          reject({
            msg:'请求失败',
            url:vm.withBaseURL ? vm.baseURL + url: url,
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
module.exports = request