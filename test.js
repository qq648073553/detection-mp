/*
 * @Author: holder
 * @Date: 2021-03-30 09:20:01
 * @LastEditors: holder
 * @LastEditTime: 2021-04-07 13:06:35
 * @Description: 
 */
// let a = "f1 as 样品名称,f2 as 牌号,f3 as 规格,f4 as 面积,f5 as 接头等级,f6 as 代表数量,f7 as 批号,f8 as 生产厂家,f9 as 待检日期,f10 as 是否为复检,f11 as 备注"
// a = a.replace(/\s/g,'')
// const arr = a.split(',')
// const map = new Map()
// for(const a of arr) {
//     const m = a.split('as')
//     map.set(m[1],m[0])
// }
// console.log(map)
// const str = "f1"
// console.log(str)
// console.log(str.replace('\"',''))
const a = {a:1,b:2,c:3}
const entries = Object.entries(a)
console.log(entries)
const arr = 'pages/check-in/check-in.js'.split('/')
console.log(arr[arr.length-1])