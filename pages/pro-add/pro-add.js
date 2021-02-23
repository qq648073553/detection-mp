const App = getApp();
const Request = require('../../utils/request')
const fetch = new Request({
    auth:true,
    header:App.globalData.header,
    baseURL: App.globalData.baseURL
})

Page({
    data: {
        navTitle: '新建工程',
        buildUnit: '建设单位',
        constructionUnit: '施工单位',
        contractNo: '123456789',
        entrustUnit: '委托单位',
        finished: false,
        finishedShow:'请选择',
        phone: '13776050390',
        principal: '蒋怡凡',
        projectAddress: '请选择',
        projectName: '苏州中心',
        projectNum: '123456789',
        qualitySupervisionNo: '123456789',
        qualitySupervisionUnit:'质监单位',
        settlementUnit: '结算单位',
        supervisionUnit: '监理单位',
        statusOptions:[
            { name: '已完成', value: true },
            { name: '未完成', value: false }
        ],
        padBottom: 0,
        fileList:[],
        lastScroll:0,
        actionShow: false,
        btnDisabled:false,
        gid:null,
        jid:null,
        wid:null
    },
    // beforeRead(event) {
    //     const { file, callback } = event.detail;
    //     console.log(event.detail)
    //     // callback(file.type === 'image');
    // },
    afterRead(event) {
        const { file } = event.detail;
        for (let f of file) {
            this.data.fileList.push({ ...f });
        }
        this.setData({ fileList: this.data.fileList });
    },
    fileDelete(e) {
        if(this.data.navTitle === '新建工程') {
            this.data.fileList.splice(e.detail.index,1)
            this.setData({
                fileList:this.data.fileList
            })
        }else {
            // 删除已上传文件
        }
    },
    async formSubmit() {
        const others = [
            'navTitle','finishedShow','statusOptions',
            'padBottom','fileList','lastScroll',
            'actionShow','navHeight','__webviewId__',
            'btnDisabled','gid', 'jid', 'wid']
        const data = {}
        for (let key in this.data) {
            if(!others.includes(key)) {
                data[key] = this.data[key]
            }
        }
        if(this.data.navTitle === '新建工程') {
            const response = await fetch.post('project/add',data)
            if(response.code=== 0) {
                const {gid,jid,wid} = response.data.idClass
                this.setData({
                    gid,
                    jid,
                    wid,
                    btnDisabled:true
                })
                // 上传文件
                this.uploadFiles(this.data.fileList)
            }else {
                wx.showToast({
                    title: '保存失败',
                    icon: 'error',
                    duration: 2000
                })
            }
        }else {
            // 修改工程
            const {gid,jid,wid} = this.data
            data.projectKey = {gid,jid,wid}
            const response = await fetch.post('project/update',data)
            console.log(response)
            // 上传文件
            this.uploadFiles(this.data.fileList)
        }

    },
    uploadFiles(fileList = []){
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        try {
            const value = wx.getStorageSync('Authorization')
            const total = fileList.length
            if (value) {
                for(let f of fileList) {
                    // 过滤掉已上传的文件
                    if(f.status !== 201) {
                       wx.uploadFile({
                            url: App.globalData.baseURL + `file/upload?projectKey.GId=${this.data.gid}&projectKey.JId=${this.data.jid}&projectKey.WId=${this.data.wid}`,
                            filePath: f.url,
                            name: 'file',
                            header: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': value,//这是要token
                            },
                            // formData: {
                            //     method: 'POST',   //请求方式
                            //     // 'file': f
                            // },
                            success: (response) => {
                                const res = JSON.parse(response.data)
                                if(res.code === 0) {
                                    f.status = 201
                                }else {
                                    wx.showToast({
                                        title: '文件保存失败,请重新上传',
                                        icon: 'none',
                                        duration: 2000
                                    })
                                    fileList.splice(fileList.findIndex(item => item.url === f.url), 1)
                                }
                            },
                            fail:() => {
                                wx.showToast({
                                    title: '文件保存失败,请重新上传',
                                    icon: 'none',
                                    duration: 2000
                                })
                                fileList.splice(fileList.findIndex(item => item.url === f.url), 1)
                            },
                            complete:(e) => {
                                console.log('文件上传complete')
                                this.setData({
                                    fileList
                                })
                                if(fileList.filter(f => f.status === 201).length === total) {
                                    wx.redirectTo({
                                        url: '/pages/index/index'
                                    })
                                }

                        }
                        })
                    }
                }

            }
        }
        catch (e) {
            // Do something when catch error
            console.log('fail')
            wx.showModal({
                title: '提示',
                content: '请重新登录',
                success (res) {
                    if (res.confirm) {
                        wx.reLaunch({
                            url: '/pages/login/login',
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })

        }

    },
    onSelect(e) {
       this.setData({
           finished:e.detail.value,
           finishedShow:e.detail.name,
           actionShow:!this.data.actionShow
       })
    },
    toggleShow() {
      this.setData({
          actionShow:!this.data.actionShow
      })
    },
    setHeight(e) {
        const height = Math.max(e.detail.height, this.data.lastScroll)
        this.setData({
            padBottom:height * -1
        })
    },
    onLoad:  function (options) {
        const {type} = options
        let title = '新建工程'
        if(type === 'modify') {
            title = '修改工程'
            const {gid,jid,wid} = options
            fetch.post('project/getOne',{gid,jid,wid})
                .then(res => {
                if(res.code === 0) {
                    const {finished,fileTypeList,projectKey:{gid,wid,jid}} = res.data
                    const props = [
                        'buildUnit','constructionUnit','contractNo',
                        'entrustUnit','phone','principal',
                        'projectAddress',,'projectName',
                        'projectNum','qualitySupervisionNo', 'qualitySupervisionUnit', 'settlementUnit','supervisionUnit']
                    const data = {}
                    for (let key in res.data) {
                        if(props.includes(key)) {
                            data[key] = res.data[key]
                        }
                    }
                    data.finishedShow = finished ? '已完成' : '未完成'
                    data.fileList = fileTypeList.map(v => ({id:v.id,status:201,url:v.path}))
                    data.gid = gid
                    data.jid = jid
                    data.wid = wid
                    this.setData(data)
                }
            })
                .catch(err => {
                    wx.showToast({
                        title: '信息获取失败',
                        icon:'error',
                        duration: 1000
                    })
                })

            this.setData({
                navTitle: title,
                navHeight: App.globalData.navHeight,
                padBottom:App.globalData.navHeight,
            })
        }
        this.setData({
            navTitle: title,
            navHeight: App.globalData.navHeight,
            padBottom:App.globalData.navHeight,
        })
    },
    onShow() {
        wx.getStorage({
            key: 'locationPro',
            success:res=> {
                this.setData({
                    projectAddress: res.data
                },()=>{
                    wx.removeStorage({
                        key: 'locationPro',
                        success (res) {
                            console.log(res)
                        }
                    })
                })

            }
        })
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

