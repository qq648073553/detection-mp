/*
 * @Author: your name
 * @Date: 2021-01-27 00:06:52
 * @LastEditTime: 2021-03-30 16:39:22
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
const Utils = require('../..//utils/util')
Page({
  data: {
    observer: '',
    observerId: '',
    project: '苏州中心',
    proId: '20201212',
    delegation: '',
    message: '',
    statusOptions: [
      { value: 0, text: '已完成' },
      { value: 1, text: '未完成' }
    ],
    navTitle: '新增送样',
    padBottom: 0,
    fileList: [],
    lastScroll: 0,
    actionShow: false,
    actionTitle: '选择样品',
    activeName: '1',
    sampleId: null,
    list: ['a', 'b', 'c'],
    result: ['a', 'b'],
    searchValue: '',
    sampleName: '请选择',
    sampleList: [],
    dynamicParams: []
  },
  getSampleParent(filterValue) {
    fetch.post('itemsKind/getItemsKind', { content: filterValue })
      .then((sampleList) => {
        this.setData({ sampleList })
      })
  },
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
  onSearch(event) {
    const { detail } = event
    this.getSampleParent(detail)
  },
  onSearchClear() {
    this.getSampleParent()
  },
  onStandardChange(event) {
    this.setData({
      result: event.detail
    });
  },

  onStandardToggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  noop() { },
  async setSample(childId) {
    for (const p of this.data.sampleList) {
      if (p.responses) {
        const c = p.responses.find(v => v.id === childId)
        if (c) {
          const configRes = await fetch.get(`infoCfg/get/${childId}`)
          const { attribute, correspondingAttribute } = configRes
          const dynamicParams = Utils.parseSampleConfig(attribute, correspondingAttribute)
          console.log(dynamicParams)
          this.setData({
            actionShow: !this.data.actionShow,
            dynamicParams,
            sampleName: p.name + '/' + c.name,
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
  onRadioChange(event) {
    const { detail } = event
    this.setData({
      sampleId: detail,
    })
  },
  onSampleClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      sampleId: name,
    })
  },
  onCancel() {
    this.setData({
      actionShow: !this.data.actionShow,
      sampleId: null,
      dynamicParams: [],
      sampleName: '请选择',
    }
    )
  },
  onConfirm() {
    const { sampleId } = this.data
    if (sampleId === null) {
      wx.showToast({
        title: '暂未选择样品',
        icon: 'none',
        duration: 1000
      })
      return
    }
    this.setSample(sampleId)

  },
  onTabChange(event) {
    this.setData({
      active: event.detail,
    });
  },
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
  setHeight(e) {
    const height = Math.max(e.detail.height, this.data.lastScroll)
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

