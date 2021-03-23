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
        if(Array.isArray(file)) {
            for(const f of file) {
                this.uploadFile(f)
            }
        }else {
            this.uploadFile(file)
        }
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
                debugger
                const data = JSON.parse(res.data).data
                debugger
                // 暂未绑定，只是文件上传了 uid做标识
                file.uid = data.uid
                this.setData({
                    fileList:[...this.data.fileList, data]
                })
            },
            fail:() => {
                wx.showToast({
                    title: '文件保存失败,请重新上传',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    fileDelete(e) {
        // 删除文件
        const uid = e.detail.file.uid
        // if(this.data.navTitle === '新建工程') {
        //     this.data.fileList.splice(e.detail.index,1)
        //     this.setData({
        //         fileList:this.data.fileList
        //     })
        // }else {
        //     // 删除已上传文件
        // }
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

