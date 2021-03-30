/*
 * @Author: holder
 * @Date: 2021-03-30 09:20:01
 * @LastEditors: holder
 * @LastEditTime: 2021-03-30 16:09:26
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
const str = [{id:1},{id:2}]
console.log(str.find(v=>v.id===3))