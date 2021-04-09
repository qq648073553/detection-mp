/*
 * @Author: holder
 * @Date: 2021-01-27 00:06:52
 * @LastEditors: holder
 * @LastEditTime: 2021-04-09 14:32:52
 * @Description: 
 */
// pages/pro-search/pro-search.js

const life = require('./life')
const methods = require('./methods')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    pageIndex: 0,
    list: [],
    histories: [],
    isRemained: true,
    refreshStatus: false

  },
  ...methods,
  ...life

})
