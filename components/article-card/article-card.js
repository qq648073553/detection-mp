/*
 * @Author: zfd
 * @Date: 2020-11-07 19:21:10
 * @LastEditors: zfd
 * @LastEditTime: 2020-11-07 20:11:11
 * @Description: 
 */
Component({
  properties:{
    id: {
      type: String,
      value: '0'
    },
    isIcon: {
      type: Boolean,
      // optionalTypes: [String],
      value: true
    },
    isBottom: {
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    created() {
    },
    attached() {
    }
  },
  data:{
    title:'足篮密探萨达萨达ad撒大飒大飒ad撒撒dasdasdasdasddsad',
    iconUrl:'https://img.yzcdn.cn/vant/apple-3.jpg',
    match: '利物浦vs马德里竞技',
    time:'10/30 23:00',
    collectionCount:0,
    goodCount: 0
  },
  methods:{
    goArticleDetail() {
      wx.navigateTo({
        url: '/pages/article-detail/article-detail',
      })
    },
  }
})