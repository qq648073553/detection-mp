/*
 * @Author: zfd
 * @Date: 2020-10-29 21:02:51
 * @LastEditors: zfd
 * @LastEditTime: 2020-11-08 14:33:10
 * @Description:
 */
const Request = require('../utils/request')
const fetch = new Request({
  withBaseURL:true
})
async function login(page) {
  const _this = this
  wx.login({
    success(res){
      fetch.post('wxlanding',{wxLoginRequest :res.code}).then(res=>{
        console.log(res)
        // if(res.code === 10000){
        //   _this.register(page)
        //   return
        // }
        // if (res.status !== 'success') {
        //   // 登录错误
        //   wx.showModal({
        //     title: '无法登录',
        //     content: res.msg,
        //     showCancel: false
        //   })
        //   return;
        // }
        // wx.setStorageSync('token', res.data.token)
        // wx.setStorageSync('uid', res.data.uid)
        // if ( page ) {
        //   page.onShow()
        // }
      }).catch(err => {
        console.error(err)
      })
    }
  })
}

async function register(page) {
  let _this = this;
  wx.login({
    success: function (res) {
      // 获取登录凭证（code）
      let code = res.code
      wx.getUserInfo({
        success: function(res) {
          // iv 加密算法的初始向量
          // encryptedData 包括敏感数据在内的完整用户信息的加密数据
          let {iv,encryptedData} = res
          // 调用注册接口
          Request.post('mini/signup',{code,iv,encryptedData}).then(res=>{
            if(res.status === 'success'){
              _this.login(page)
            }else{
              wx.showToast({
                title: '注册失败',
                icon:'none'
              })
            }
          }).catch(err => {
            wx.showToast({
              title: '注册失败',
              icon:'none'
            })
          })
        }
      })
    }
  })
}

module.exports = {
  register,
  login
}
