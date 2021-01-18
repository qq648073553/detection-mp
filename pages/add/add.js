Page({
    data: {
        project: {
            contact: '',
            phone: '',
            code: '',
            title: '',
            address: '',
            status: ''
        },
        build: {
            contract: '',
            buildCom:'',
            constructionCom: '',
            delegationCom: '',
            amountCom: ''
        },
        supervision: {
            code: '',
            qualityCom: '',
            supervisionCom: ''

        },
        statusOptions:[
            { value: 0, text: '已完成' },
            { value: 1, text: '未完成' }
        ],
        fileList:[],
        actionShow: true,
        actionTitle: '建设单位'
    },
    afterRead(){

    },

})

// Component({
//     pageLifetimes: {
//       show() {
//         if (typeof this.getTabBar === 'function' &&
//           this.getTabBar()) {
//           this.getTabBar().setData({
//             selected: 1
//           })
//         }
//       }
//     }
//   })
  