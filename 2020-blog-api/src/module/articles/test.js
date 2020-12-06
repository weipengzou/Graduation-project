// // let dbArr = ['a', 'n', 'a', 'a', 'c', 'c', 'd', 'e', 'c', 'cc', 'c', 'c']
// // let dbArr = [[{ a: 1 }], [{ a: 1 }]]
// let dbArr = [
//   [
//     {
//       _id: 1,
//       data: 'U2FsdGVkX1+Hca1M+1lFhDwTVKG63nL0rry1CzXCllLXcLpuMv9IuJWCwP2BDF5W',
//       user: '123',
//       // local: { lat: 23.13171, lng: 113.26627 },
//       previousHash: '',
//       hash: '0000f76a4d683ccacf4a4b3d120ad9ebb533b4b44911981ca68d8c4f3693537d',
//       __v: 0,
//     },
//   ],
//   [
//     {
//       _id: 1,
//       data: 'U2FsdGVkX1+Hca1M+1lFhDwTVKG63nL0rry1CzXCllLXcLpuMv9IuJWCwP2BDF5W',
//       user: '123',
//       // local: { lat: 23.13171, lng: 113.26627 },
//       previousHash: '',
//       hash: '0000f76a4d683ccacf4a4b3d120ad9ebb533b4b44911981ca68d8c4f3693537d',
//       __v: 0,
//     },
//   ],
//   [
//     {
//       _id: 1,
//       data: 'U2FsdGVkX1+Hca1M+1lFhDwTVKG63nL0rry1CzXCllLXcLpuMv9IuJWCwP2BDF5W',
//       user: '123',
//       // local: { lat: 23.13171, lng: 113.26627 },
//       previousHash: '',
//       hash: '0000f76a4d683ccacf4a4b3d120ad9ebb533b4b44911981ca68d8c4f3693537d',
//       __v: 0,
//     },
//   ],
//   [{ a: 2 }],
//   [{ a: 2 }],
//   [{ a: 2 }],
//   [{ a: 2 }],
// ]
// const SHA256 = require('crypto-js/sha256')
// // 获取数组长度一半以上的相同的值的下标
// let maxVal = []
// let m = new Map()
// // 通过相同数据结构加密出来的hash值相同判断是否同一数据库
// dbArr.map((itm1, idx) => {
//   itm1 = itm1.map(itm2 => JSON.stringify(itm2))
//   let hashItm = SHA256(itm1.join(',')).toString()
//   if (!m.get(hashItm)) {
//     m.set(hashItm, [idx])
//     if ((maxVal.length = 0)) maxVal = [idx]
//   } else {
//     let arr = m.get(hashItm)
//     m.set(hashItm, [...arr, idx])
//     if (arr.length >= maxVal.length) maxVal = [...arr, idx]
//   }
// })
// console.log(maxVal)
let arr = [0, 1, 2, 3, 4, 5]
let goods = [1, 2, 3, 4]
let bads = arr.filter((itm, idx) => (goods.indexOf(idx) == -1 ? true : false))
console.log(bads)
