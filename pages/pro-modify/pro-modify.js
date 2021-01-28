const App = getApp();
const TMAP = new Map([['0','工程修改'],['1','委托修改']])
Page({
  data: {
    project:'苏州中心',
    proId:'20200101',
    proDeg:'项目1',
    proDegId:'2020101',
    phone: '13776050390',
    email: 'zfd_yes@163.com',
    message: '',
    padBottom: 0,
    lastScroll:0,
    navTitle: '工程修改',
    fileList:[]
  },
  afterRead(){

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
      navTitle: TMAP.get(type),
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

