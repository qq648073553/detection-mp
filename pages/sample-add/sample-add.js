/*
 * @Author: your name
 * @Date: 2021-01-27 00:06:52
 * @LastEditTime: 2021-04-09 14:36:46
 * @LastEditors: holder
 * @Description: In User Settings Edit
 * @FilePath: \detection-mp\pages\sample-add\sample-add.js
 */
const life = require('./life')
const methods = require('./methods')
Page({
  data: {
    project: '苏州中心',
    proId: '20201212',
    delegation: '',
    station:'请选择',
    stationId:'',
    deliverWay: '请选择',
    deliverWayId: 0,
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
  ...life,
  ...methods

})

