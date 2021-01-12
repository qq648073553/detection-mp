Component({
    data: {
        selected: 0,
        color: "#C3C3C3",
        selectedColor: "#5F80EC",
        list: [
            {
                "pagePath": "/pages/index/index",
                "iconPath": "../assets/images/nav/home.png",
                "selectedIconPath": "../assets/images/nav/home_on.png",
                "text": "首页"
            },
            {
                "pagePath": "/pages/add/add",
                "iconPath": "../assets/images/nav/add.png",
                "selectedIconPath": "../assets/images/nav/add_on.png",
                "text": "历史工程"
            },
            {
                "pagePath": "/pages/my/my",
                "iconPath": "../assets/images/nav/my.png",
                "selectedIconPath": "../assets/images/nav/my_on.png",
                "text": "个人中心"
            }
        ]
    },
    attached() {
    },
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            wx.switchTab({url})
            // this.setData({
            //     selected: data.index
            // })
        }
    }
})