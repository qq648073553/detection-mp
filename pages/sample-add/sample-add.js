/*
 * @Author: your name
 * @Date: 2021-01-27 00:06:52
 * @LastEditTime: 2021-03-31 16:35:29
 * @LastEditors: holder
 * @Description: In User Settings Edit
 * @FilePath: \detection-mp\pages\sample-add\sample-add.js
 */
const App = getApp();
const Request = require('../../utils/request')
const fetch = new Request({
  auth: true,
  header: App.globalData.header,
  baseURL: App.globalData.baseURL
})
const Utils = require('../../utils/util')
Page({
  data: {
    observer: '',
    observerId: '',
    project: '苏州中心',
    proId: '20201212',
    delegation: '',
    // container:null,
    message: '',
    statusOptions: [
      { value: 0, text: '已完成' },
      { value: 1, text: '未完成' }
    ],
    paramSelected:[],
    form: {
      parameterName:''
    },
    navTitle: '新增送样',
    padBottom: 0,
    fileList: [],
    lastScroll: 0,
    actionShow: false,
    paramShow: false,
    activeName: '1',
    sampleId: null, //iid 样品id
    normalId: null, //standardNum 标准编号id
    paramList: [],
    result: [],
    searchValue: '',
    normalName: null,
    sampleName: '请选择',
    paramName:'',
    sampleList: [],
    dynamicParams: [],
    dynamicPickerShow: false,
    dynamicActions: [],
    pzResponse: null, // 缓存pz表数据，较少请求次数
    currentProp: null // actionSheet使用，input不用
  },
  onDynamicInput(event) {
    const prop = event.target.dataset.prop
    const form = this.data.form
    form[prop] = event.detail

    this.setData({
      form
    });
    return event.detail
  },
  // 获取标准名 + 设置参数
  async getNormalName() {
    const normalId = this.data.normalId

    const normalRes = this.data.pzResponse || await fetch.get(`infoCfg/getPz/${this.data.sampleId}`).then((pzResponse) => {
      this.setData({ pzResponse })
      return pzResponse
    })
    try {
      if (normalRes.length === 1) {
        const paramRes = await fetch.get(`infoCfg/getPzjczx/${normalRes[0].standardNum}`)
        const paramList = (paramRes && paramRes.map(v=>v.name)) || []
        this.setData({
          paramList,
          normalId:normalRes[0].standardNum,
          normalName: normalRes[0].standard
        })
        return
      }
      if (!normalId && normalRes.length > 1) {
        this.setData({
          normalId:null,
          normalName: null
        })
        return
      }
      const normalObj = normalRes.find(v => v.standardNum === normalId)
      const paramRes = await fetch.get(`infoCfg/getPzjczx/${normalObj.standardNum}`)
      const paramList = (paramRes && paramRes.map(v=>v.name)) || []
      this.setData({
        paramList,
        normalId:normalObj.standardNum,
        normalName: normalObj.standard
      })
    } catch (error) {
      console.log('标准名获取失败', error)
      this.setData({
        normalId:null,
        normalName: null
      })
    }
  },
  // 获取动态下拉框数据源
  async getDynamicActions(table) {
    try {
      if (table === 'pz') {
        // 查询样品名称下拉框
        const pzRes = this.data.pzResponse || await fetch.get(`infoCfg/getPz/${this.data.sampleId}`).then((pzResponse) => {
          this.setData({ pzResponse })
          return pzResponse
        })
        return pzRes.map(v => ({ normalId: v.standardNum, name: v.name }))
      } else if (table === 'gg') {
        // 查询牌号下拉框
        const ggRes = await fetch.get(`infoCfg/getGg/${this.data.normalId}`)
        if (ggRes.length === 1) {
          // "cc": "3#6#6.5#7#8#9#10#12#12.70#15.20#14#16#18#20#22#25#28#32#36#40",
          return ggRes[0].gg.split('#').map(v => ({ name: v }))
        } else {
          const ggObj = ccRes.find(v => v.standardNum === this.data.normalId)
          return ggObj.gg.split('#').map(v => ({ name: v }))
        }
      } else if (table === 'cc') {
        // 查询规格下拉框
        const ccRes = this.data.pzResponse || await fetch.get(`infoCfg/getPz/${this.data.sampleId}`).then((pzResponse) => {
          this.setData({ pzResponse })
          return pzResponse
        })
        if (ccRes.length === 1) {

          // "cc": "3#6#6.5#7#8#9#10#12#12.70#15.20#14#16#18#20#22#25#28#32#36#40",
          return ccRes[0].cc.split('#').map(v => ({ name: v }))
        } else {
          const ccObj = ccRes.find(v => v.standardNum === this.data.normalId)
          return ccObj.cc.split('#').map(v => ({ name: v }))
        }
      }
      return []
    } catch (error) {
      console.log('动态下拉框数据源出错', error)

      return []
    }

  },
  // 点击动态选择器
  async onClickDynamicPicker(e) {
    const idx = e.target.dataset.index
    const { dynamicPickerShow, dynamicParams } = this.data
    const { table, resource, prop } = dynamicParams[idx]
    let dynamicActions
    if (resource) {
      dynamicActions = resource
    } else {

      dynamicActions = await this.getDynamicActions(table)

    }
    this.setData({
      dynamicPickerShow: !dynamicPickerShow,
      dynamicActions,
      currentProp: prop
    })
  },
  // 选择
  onPickerSelect(event) {
    // 标准id
    const normalId = event.detail.normalId


    const form = this.data.form
    form[this.data.currentProp] = event.detail.name
    this.setData({
      dynamicPickerShow: !this.data.dynamicPickerShow,
      form,
      normalId
    }, () => {
      // 设置标准名第二次，当前仅当f1或选择样品时
      this.data.currentProp === 'f1' && this.getNormalName()
    });
  },
  // 关闭取消
  onPickerClose() {
    this.setData({ dynamicPickerShow: !this.data.dynamicPickerShow });
  },
  // 获取样品父级
  getSampleParent(filterValue) {
    fetch.post('itemsKind/getItemsKind', { content: filterValue })
      .then((sampleList) => {
        this.setData({ sampleList })
      })
  },
  // 获取样品子级
  getSampleChild(pid) {
    return new Promise((resolve, reject) => {
      fetch.get(`itemsKind/getItems/${pid}`)
        .then((sub) => {
          const sampleList = this.data.sampleList
          const parent = sampleList.find(v => v.id === pid)
          parent && (parent.responses = sub)
          this.setData({ sampleList }, () => { resolve('ok') })
        }).catch(() => {
          reject('error')
        })
    })
  },
  // 筛选样品子级
  onSearch(event) {
    const { detail } = event
    this.getSampleParent(detail)
  },
  // 重置样品列表
  onSearchClear() {
    this.getSampleParent()
  },


  noop() { },
  // 确认选择样品
  onSampleConfirm() {
    const { sampleId } = this.data
    if (sampleId === null) {
      wx.showToast({
        title: '请先选择样品',
        icon: 'none',
        duration: 1000
      })
      return
    }
    this.setSample(sampleId)

  },
  // 设置样品
  async setSample(childId) {
    for (const p of this.data.sampleList) {
      if (p.responses) {
        const c = p.responses.find(v => v.id === childId)
        if (c) {
          const configRes = await fetch.get(`infoCfg/get/${childId}`)
          const { attribute, correspondingAttribute } = configRes
          const dynamicParams = Utils.parseSampleConfig(attribute, correspondingAttribute) || []
          const form = {}
          dynamicParams.forEach(v => { form[v.prop] = null })
          console.log(dynamicParams)
          this.setData({
            actionShow: !this.data.actionShow,
            dynamicParams,
            form,
            sampleName: p.name + '/' + c.name,
            pzResponse: null
          }, () => {
            // 选择检测项目设置标注名 第一次
            this.getNormalName()
          })
          return
        }
      }
    }
    // this.setData({
    //   sampleName: '请选择',
    //   dynamicParams:[],
    //   actionShow: !this.data.actionShow,
    // })

  },
  // 选择切换样品
  onRadioChange(event) {
    const { detail } = event
    this.setData({
      sampleId: detail,
    })
  },
  // 选择切换样品
  onSampleClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      sampleId: name
    })
  },
  // 关闭打开样品
  toggleSample() {
    this.setData({
      actionShow: !this.data.actionShow,
      sampleId: null,
      normalId: null,
      normalName: null,
      dynamicParams: [],
      sampleName: '请选择',
      paramList:[],
      paramName:null,
      form:{}
    }
    )
    // wx.nextTick(()=>{
    //   this.setData({
    //     container: () => {
    //       console.log(wx.createSelectorQuery().select('#container'))
    //       return wx.createSelectorQuery().select('#container')
    //     }
    //   })
    // })
  },
  toggleParam() {
    this.setData({ paramShow: !this.data.paramShow })
  },
  onParamConfirm() {
    if(!this.data.form.parameterName) {
      wx.showToast({
        title: '请先选择参数',
        icon: 'none',
        duration: 1000
      })
      return
    }
    this.setData({ 
      paramShow: !this.data.paramShow,
    })
  },
  onParamChange(event) {
    const form = this.data.form
    form.parameterName = event.detail.join('，')
    this.setData({
      paramSelected:event.detail,
      form
    });
  },

  onParamToggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },
  // onTabChange(event) {
  //   this.setData({
  //     active: event.detail,
  //   });
  // },
  // 加载样品子级
  async onCollapseChange(event) {
    const { detail } = event
    this.setData({
      activeName: detail,
    });
    const sampleList = this.data.sampleList
    const parent = sampleList.find(v => v.id === detail)
    if (parent) {
      !parent.responses && (await this.getSampleChild(detail))
    }
  },
  afterRead() {

  },
  formSubmit() {
    wx.navigateTo({
      url: '/pages/sample-confirm/sample-confirm',
    })
  },
  // 设置高度
  setHeight(e) {
    const height = Math.max(e.detail.height - 110, this.data.lastScroll)
    this.setData({
      padBottom: height * -1
    })
  },
  onLoad: function (options) {
    const { type } = options
    const title = type === 'modify' ? '送样修改' : '新增送样'
    this.setData({
      navHeight: App.globalData.navHeight,
      padBottom: App.globalData.navHeight,
      navTitle: title,
    })
    this.getSampleParent()
  },
  onShow() {
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
})

