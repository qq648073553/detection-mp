/*
 * @Author: your name
 * @Date: 2021-01-27 00:06:52
 * @LastEditTime: 2021-04-08 15:19:28
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
    project: '苏州中心',
    proId: '20201212',
    delegation: '',
    seeName: '蒋怡凡',
    seeId: '110',
    part: '',
    // container:null,
    currentDate: new Date().getTime(),
    appointmentDate: '请选择',
    minDate: new Date().getTime(),
    Dateformatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    statusOptions: [
      { value: 0, text: '已完成' },
      { value: 1, text: '未完成' }
    ],
    paramSelected: [],
    deliverWay: '请选择',
    deliverWayId: 0,
    parameterName: '请选择',
    number: '请选择',
    sampleAddress: '请选择',
    sampleTime: '请选择',
    form: {},
    navTitle: '新增委托',
    padBottom: 0,
    fileList: [],
    lastScroll: 0,
    actionShow: false,
    appointmentDateShow: false,
    paramShow: false,
    numberShow: false,
    dateShow: false,
    collpaseActive: '1',
    sampleId: null, //iid 样品id
    sampleName: '请选择',
    normalId: null, //standardNum 标准编号id
    normalName: null,
    paramList: [],
    paramName: '',
    searchValue: '',
    sampleList: [],
    dynamicParams: [],
    dynamicPickerShow: false,
    numberActions: [{ name: 10 }, { name: 20 }],
    dynamicActions: [],
    pzResponse: null, // 缓存pz表数据，较少请求次数
    currentProp: null, // actionSheet使用，input不用
    cost: 0 // 参考价格
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
        const paramList = (paramRes && paramRes.map(v => ({ name: v.name, cost: v.cost }))) || []
        this.setData({
          paramList,
          normalId: normalRes[0].standardNum,
          normalName: normalRes[0].standard
        })
        return
      }
      if (!normalId && normalRes.length > 1) {
        this.setData({
          normalId: null,
          normalName: null
        })
        return
      }
      const normalObj = normalRes.find(v => v.standardNum === normalId)
      const paramRes = await fetch.get(`infoCfg/getPzjczx/${normalObj.standardNum}`)
      const paramList = (paramRes && paramRes.map(v => ({ name: v.name, cost: v.cost }))) || []
      this.setData({
        paramList,
        normalId: normalObj.standardNum,
        normalName: normalObj.standard
      })
    } catch (error) {
      console.log('标准名获取失败', error)
      this.setData({
        normalId: null,
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
        if (!!this.data.normalId) {
          const ggRes = await fetch.get(`infoCfg/getGg/${this.data.normalId}`)
          const ggData = ggRes.filter(v => v.standardNum === this.data.normalId)
          return ggData.map(v => ({ name: v.name }))
        }
        return []

        // if (ggRes.length === 1) {
        //   // "cc": "3#6#6.5#7#8#9#10#12#12.70#15.20#14#16#18#20#22#25#28#32#36#40",
        //   return ggRes[0].gg.split('#').map(v => ({ name: v }))
        // } else {
        //   const ggObj = ccRes.find(v => v.standardNum === this.data.normalId)
        //   return ggObj.gg.split('#').map(v => ({ name: v }))
        // }
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
  // 点击送样方式选择器
  onClickWayPicker() {
    const dynamicActions = [{ name: '自送检', id: 0 }, { name: '待取样', id: 1 }, { name: '现场检测', id: 2 }]
    const { dynamicPickerShow } = this.data
    this.setData({
      dynamicPickerShow: !dynamicPickerShow,
      dynamicActions,
      currentProp: 'deliverWay'
    })
  },
  onClickDatePicker(e) {
    const idx = e.target.dataset.index
    const { dateShow, dynamicParams } = this.data
    const { prop } = dynamicParams[idx]
    this.setData({
      dateShow: !dateShow,
      currentProp: prop
    })
  },
  // 选择预约日期
  onAppointmentDateConfirm(event) {
    const date = Utils.parseTime(event.detail, '{y}-{m}-{d}')
    this.setData({
      appointmentDate: event.detail,
      sampleTime: date,
      appointmentDateShow: !this.data.appointmentDateShow
    });
  },
  // 选择日期
  onDateConfirm(event) {
    const form = this.data.form
    const date = Utils.parseTime(event.detail, '{y}-{m}-{d}')
    form[this.data.currentProp] = date
    this.setData({
      currentDate: event.detail,
      form,
      dateShow: !this.data.dateShow
    });
  },
  // 选择
  onPickerSelect(event) {
    // 标准id
    // const normalId = event.detail.normalId
    if (this.data.currentProp === 'deliverWay') {
      this.setData({
        deliverWay: event.detail.name,
        deliverWayId: event.detail.id,
        dynamicPickerShow: !this.data.dynamicPickerShow
      })
    } else {
      const form = this.data.form
      form[this.data.currentProp] = event.detail.name
      this.setData({
        dynamicPickerShow: !this.data.dynamicPickerShow,
        form,
        // normalId
      }, () => {
        // 设置标准名第二次，当前仅当f1或选择样品时
        this.data.currentProp === 'f1' && this.getNormalName()
      });
    }

  },
  // 获取样品父级
  async getSampleParent(filterValue) {
    await fetch.post('itemsKind/getItemsKind', { content: filterValue })
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
  async setDynamicParams(childId, sampleName) {
    const configRes = await fetch.get(`infoCfg/get/${childId}`)
    const { attribute, correspondingAttribute } = configRes
    const dynamicParams = Utils.parseSampleConfig(attribute, correspondingAttribute) || []
    const form = {}
    dynamicParams.forEach(v => {
      if (v.isDate || v.isPicker) {
        form[v.prop] = '请选择'
      } else {
        form[v.prop] = null
      }
    })
    // console.log(dynamicParams)
    this.setData({
      actionShow: false,
      dynamicParams,
      form,
      sampleId: childId,
      sampleName,
      pzResponse: null
    }, () => {
      // 选择检测项目设置标准 第一次
      this.getNormalName()
    })
  },
  // 设置样品
  async setSample(childId) {
    for (const p of this.data.sampleList) {
      if (p.responses) {
        const c = p.responses.find(v => v.id === childId)
        if (c) {
          await this.setDynamicParams(childId, p.name + '/' + c.name,)
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
      paramList: [],
      paramName: null,
      form: {}
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
  // 选择器开关
  togglePicker(event) {
    const name = event.currentTarget.dataset.name
    const obj = {}
    obj[name] = !this.data[name]
    this.setData(obj)
  },
  onParamConfirm() {
    if (!this.data.parameterName) {
      wx.showToast({
        title: '请先选择参数',
        icon: 'none',
        duration: 1000
      })
      return
    }
    let cost = 0
    const paramArr = this.data.parameterName.split('，')
    // 计算参考价格
    for (const param of paramArr) {
      for (const li of this.data.paramList) {
        if (li.name === param) {
          cost += li.cost ?? 0
        }
      }
    }
    this.setData({
      cost,
      paramShow: !this.data.paramShow,
    })
  },
  onParamChange(event) {

    // const form = this.data.form
    // form.parameterName = event.detail.join('，')
    const parameterName = event.detail.join('，')
    // const cost = event.detail
    this.setData({
      parameterName,
      paramSelected: event.detail
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
      collpaseActive: detail,
    });
    const sampleList = this.data.sampleList
    const parent = sampleList.find(v => v.id === detail)
    if (parent) {
      !parent.responses && (await this.getSampleChild(detail))
    }
  },
  onNumberSelect(event) {
    // const form = this.data.form
    // form.number = event.detail.name
    const number = event.detail.name
    this.setData({
      // form,
      number,
      numberShow: !this.data.numberShow
    });
  },
  // 读取完立即上传
  afterRead(event) {
    // const { file } = event.detail;
    // if (Array.isArray(file)) {
    //   for (const f of file) {
    //     this.uploadFile(f)
    //   }
    // } else {
    //   this.uploadFile(file)
    // }
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
  checkForm(form) {
    const entries = Object.entries(form)
    for (const entry of entries) {
      // if (form.deliverType === 0 && (entry[0] === 'appointTime' || entry[0] === 'appointAddress')) {
      //   continue
      // }
      if ((!entry[1] && entry[1] !== 0) || entry[1] === '请选择') {
        debugger
        const propObj = this.data.dynamicParams.find(v => v.prop === entry[0])
        let title = '请补全信息'
        if (!!propObj) {
          title = '请先填写' + propObj.name
        }
        wx.showToast({
          title,
          icon: 'none',
          duration: 1000
        })
        return false
      }
    }
    return true
  },
  formSubmit() {

    const { gid, wid, jid, form, cost, seeName, seeId, normalId, normalName, project, sampleId, parameterName, part, deliverWayId, sampleTime, sampleAddress } = this.data
    form.cost = cost
    form.witness = seeName
    form.witnessNum = seeId
    form.standardNum = normalId
    form.standardName = normalName
    form.projectId = { gid, jid, wid }
    form.projectName = project
    form.jcItemsId = sampleId
    form.parameterName = parameterName
    form.position = part
    form.deliverType = deliverWayId
    if (deliverWayId !== 0) {
      form.appointTime = sampleTime
      form.appointAddress = sampleAddress
    }

    // wx.navigateTo({
    //   url: '/pages/sample-confirm/sample-confirm',
    // })
    console.log(form)

    if (this.checkForm(form)) {
      wx.showLoading({
        title: '正在保存',
      })
      fetch.post('deliver/add', form).then(() => {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000
        })
        wx.redirectTo({
          url: '/pages/delegation-overview/delegation-overview',
        })
      })
      .complete(()=>{
        wx.hideLoading()
      })
      // wx.showModal({
      //   title: '确认提交',
      //   content: `参考费用${form.cost}元`,
      //   success(res) {
      //     if (res.confirm) {

      //     }
      //   }
      // })


    }

  },
  // 设置高度
  setHeight(e) {
    const height = Math.max(e.detail.height - 110, this.data.lastScroll)
    this.setData({
      padBottom: height * -1
    })
  },
  async onLoad(options) {
    const { type, sampleId = 1736, jid, wid, gid } = options
    if (jid && wid && gid) {
      let title = '新增送样'
      await this.getSampleParent()
      if (type === 'modify') {
        title = '送样修改'

        this.setDynamicParams(sampleId, '测试修改')
      }
      this.setData({
        navHeight: App.globalData.navHeight,
        padBottom: App.globalData.navHeight,
        navTitle: title,
        jid,
        wid,
        gid
      })
    } else {
      wx.navigateBack()
    }
  },
  onShow() {
    try {
      let value = wx.getStorageSync('location')
      if (value) {
        this.setData({
          sampleAddress: value
        })
      }
    } catch (error) {

    }
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

