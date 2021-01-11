Component({
    options: {
        styleIsolation: 'shared',
    },
    data:{
        business:[
            {
                title: '检测业务',
                type: 0,
                subList:[
                    {
                        title: '工程登记',
                        icon: 'dengji',
                        color: '#F0641F',
                        url:'/pages/check-in/check-in'
                    },
                    {
                        title: '工程查看',
                        icon: 'chakan',
                        color: '#3FABFF'
                    },
                ]
            },
            {
                title: '报告业务',
                type: 1,
                subList:[
                    {
                        title: '报告检索',
                        icon: 'jiansuo',
                        color: '#3FABFF'
                    },
                    {
                        title: '防伪认证',
                        icon: 'renzheng',
                        color: '#F0641F'
                    },
                ]
            },
            {
                title: '结算业务',
                type: 2,
                subList:[
                    {
                        title: '工作量汇总',
                        icon: 'huizong',
                        color: '#3FABFF'
                    },
                    {
                        title: '结算清单',
                        icon: 'jiesuan',
                        color: '#3DC393'
                    },
                ]
            }
        ]
    },
    pageLifetimes: {
      show() {
        if (typeof this.getTabBar === 'function' &&
          this.getTabBar()) {
          this.getTabBar().setData({
            selected: 0
          })
        }
      }
    },
    methods: {
        goPage(event) {
            wx.navigateTo({
                url:event.currentTarget.dataset.url
            })
        }

    }
  })
  