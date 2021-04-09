/*
 * @Author: holder
 * @Date: 2021-04-09 14:34:02
 * @LastEditors: holder
 * @LastEditTime: 2021-04-09 15:46:51
 * @Description: 
 */
const App = getApp();
const Request = require('../../utils/request')
const fetch = new Request({
    auth: true,
    header: App.globalData.header,
    baseURL: App.globalData.baseURL
})
const Utils = require('../../utils/util')
const files = require('../../mixins/files')
module.exports = {
    ...files,
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
                    normalName: normalRes[0].standard,
                    isFindNormal:true
                })
                return
            }
            if (!normalId && normalRes.length > 1) {
                this.setData({
                    normalId: null,
                    normalName: null,
                    isFindNormal:false
                })
                return
            }
            const normalObj = normalRes.find(v => v.standardNum === normalId)
            const paramRes = await fetch.get(`infoCfg/getPzjczx/${normalObj.standardNum}`)
            const paramList = (paramRes && paramRes.map(v => ({ name: v.name, cost: v.cost }))) || []
            this.setData({
                paramList,
                normalId: normalObj.standardNum,
                normalName: normalObj.standard,
                isFindNormal:true
            })
        } catch (error) {
            console.log('标准名获取失败', error)
            this.setData({
                normalId: null,
                normalName: null,
                isFindNormal:false
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
        this.setData({
            dynamicPickerShow: true,
            dynamicActions,
            currentProp: 'deliverWay'
        })
    },
    // 站点选择器
    async onClickStationPicker() {
        // 获取站点数据 id name
        // const dynamicActions = await fetch.get('')
        const dynamicActions = [{ name: '自送检', id: 0 }, { name: '待取样', id: 1 }, { name: '现场检测', id: 2 }]
        this.setData({
            dynamicPickerShow: true,
            dynamicActions,
            currentProp: 'station'
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
                dynamicPickerShow: false
            })
        } else if (this.data.currentProp === 'station') {
            this.setData({
                station: event.detail.name,
                stationId: event.detail.id,
                dynamicPickerShow: false
            })
        }
        else {
            const form = this.data.form
            form[this.data.currentProp] = event.detail.name
            this.setData({
                dynamicPickerShow: false,
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
            isFindNormal:false,
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

    checkForm(form) {
        const entries = Object.entries(form)
        for (const entry of entries) {
            // if (form.deliverType === 0 && (entry[0] === 'appointTime' || entry[0] === 'appointAddress')) {
            //   continue
            // }
            if ((!entry[1] && entry[1] !== 0) || entry[1] === '请选择') {
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

        const { gid, wid, jid, form, cost, stationId, seeName, seeId, normalId, normalName, project, sampleId, parameterName, part, deliverWayId, sampleTime, sampleAddress, fileList } = this.data
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
        form.stationId = stationId
        form.fileIdList = fileList.map(v => v.uid).filter(v => v) // 提交最新上传文件的id
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
                .finally(() => {
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
}