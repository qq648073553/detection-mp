Component({
    options: {
        styleIsolation: 'shared',
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
            console.log(event)
        }

    }
  })
  