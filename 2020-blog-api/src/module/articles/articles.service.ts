const SHA256 = require('crypto-js/sha256')
import { Injectable } from '@nestjs/common'
import {
  BlogSchema,
  BlogSchemaBackupA,
  BlogSchemaBackupB,
} from '../../models/article.model'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(BlogSchema) private readonly blogModel: ModelType<BlogSchema>,
    @InjectModel(BlogSchemaBackupA)
    private readonly blogBackupAModel: ModelType<BlogSchemaBackupA>,
    @InjectModel(BlogSchemaBackupB)
    private readonly blogBackupBModel: ModelType<BlogSchemaBackupB>,
  ) {}
  // 获取所有区块，
  async getArticle(id?: string | number, page?: number, number?: number) {
    try {
      // let isChange = true
      let isChange = await this.verifyArticle()
      console.log('isChange', isChange)
      if (!isChange) return '数据被篡改，没有超过一半以上的节点数据相同'
      else if (page && number) {
        let sql = (model: ModelType<BlogSchema>) => async (
          number?: number,
          page?: number,
        ) =>
          await model
            .find()
            .skip(Number(number * (page - 1)))
            .limit(Number(number))
        return sql(this.blogModel)(number, page)
      } else {
        let res: any = await this.blogModel.find()
        let chain = res || []
        return chain as Array<BlogSchema>
      }
    } catch (error) {}
  }

  // 验证区块正确性（是否被篡改过）
  async verifyArticle(): Promise<Boolean> {
    // 三个库对比
    var res: any
    res = await this.blogModel.find()
    let blog = res
    res = await this.blogBackupAModel.find()
    let blogA = res
    res = await this.blogBackupBModel.find()
    let blogB = res
    console.log('blog', blog)
    if ((blog.length === 0, blogA.length === 0, blogB.length === 0)) return true
    // 过滤唯一_id
    blog.map(itm => (itm._id = null))
    blogA.map(itm => (itm._id = null))
    blogB.map(itm => (itm._id = null))
    // 获取诚实节点
    let dbArr = [blog, blogA, blogB]
    let modelArr = [
      this.blogModel,
      this.blogBackupAModel,
      this.blogBackupBModel,
    ]
    // let dbArr = [blog, blogA, blogB, 1,2,3,4,5];
    // 获取数组长度一半以上的相同的值的下标
    let maxVal = [] // 正确数组的下标
    let m = new Map()
    // 通过相同数据结构加密出来的hash值相同判断是否同一数据库
    dbArr.map((itm1, idx) => {
      itm1 = itm1.map(itm2 => JSON.stringify(itm2))
      let hashItm = SHA256(itm1.join(',')).toString()
      if (!m.get(hashItm)) {
        m.set(hashItm, [idx])
        if ((maxVal.length = 0)) maxVal = [idx]
      } else {
        let arr = m.get(hashItm)
        m.set(hashItm, [...arr, idx])
        if (arr.length >= maxVal.length) maxVal = [...arr, idx]
      }
    })
    // 打印诚实节点数组的下标
    console.log(maxVal)
    // 如果诚实节点数量大于总数量
    if (maxVal.length > Math.floor(dbArr.length / 2)) {
      // 有个别叛逆节点
      if (maxVal.length !== dbArr.length) {
        // 从诚实节点中复制数据给叛逆节点
        let trueMudel = modelArr[maxVal[0]]
        // 存下正确数据
        let trueData = await trueMudel.find({})
        // 过滤叛逆节点
        let badNodeArr = modelArr.filter((itm, idx) =>
          maxVal.indexOf(idx) == -1 ? true : false,
        )
        console.log('叛逆节点', badNodeArr)

        // 恢复数据
        // modelArr.map
        badNodeArr.map(async item => {
          // this.blogModel.remove({}) 删除叛逆节点所有数据
          let removeRes = await item.remove({})
          console.log('removeRes', removeRes)
          let insertRes = await item.insertMany(trueData)
          console.log('insertRes', insertRes)
          console.log('数据恢复')
          // await trueData.map(trueItm => item.insertMany(trueItm))
        })
      }
      return true
    } else {
      console.log('数据库烂了，没救了')
      return false
    }
  }
  // 创建区块
  // 链：前区块的hash值
  // 内容：content + 前hash =>新hash()
  // 链：本区块的hash值
  //
  async createArticle(data) {
    let createRes = await this.blogModel.create(data)
    // 备份数据
    await this.blogBackupAModel.create(data)
    // return createRes;
    // 备份数据
    await this.blogBackupBModel.create(data)
    // return createRes;
    return createRes
  }
}
