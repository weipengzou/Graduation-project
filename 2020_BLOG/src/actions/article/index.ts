import { actionTypes } from '../index'
import { getArticle, createArticle } from '../../api/article'
import { crypto } from '../../utils/crypto'
import { message } from 'antd'
// 获取文章列表
const getArticleListAction = () => async (dispatch: any) => {
  interface IArticleRes {
    [key: string]: any
    data: []
  }
  let res: IArticleRes = await getArticle()
  let blogArr: never[] = []
  if (res.data.length != 0) {
    console.log('getArticle', res.data)
    blogArr = res.data.reverse()
    // 解密
    blogArr.map((itm: any) => (itm.data = crypto.decryptoAES(itm.data)))
  }
  dispatch({
    type: actionTypes.GET_ARTICLE,
    payload: {
      articleList: blogArr,
    },
  })
}
// 创建文章
const createArticleAction = (payload: { articleContent: string; user: string; local: object }) => async (dispatch: any) => {
  message.destroy()
  message.loading('请稍等，计算文章区块中...')
  let res = await getArticle()
  // console.log('getArticleAPI',res);
  let blogChain = res.data
  let lastBlog = blogChain[blogChain.length - 1]
  // 文章数据
  let data: string = crypto.encryptoAES(payload.articleContent)
  // 用户信息
  let user: string = payload.user
  // 地理信息
  let local: object = payload.local
  // 前块hash
  let previousHash: string = ''
  // 本块hash
  let hash: string = ''
  // 1.判断祖先区块
  if (!lastBlog) previousHash = ''
  else previousHash = lastBlog.hash
  // proof of work
  let randomNumb = 1
  let curTime = Date.now() // 设置时间
  let stopTime
  let diffNumb = 1
  while (true) {
    // 加一个随机数，在不影响其他参数情况下实现不同输出
    hash = crypto.encryptoSHA256(data + user + previousHash + randomNumb).toString()
    if (hash.substring(0, diffNumb) === '0'.repeat(diffNumb)) {
      stopTime = Date.now()
      // 防止算力过强的电脑短时间内提交多个文章块
      // 规定300ms内的
      if (stopTime - curTime < 300) {
        console.log(stopTime - curTime, 'ms')
        ++diffNumb
      } else break
    } else randomNumb++
  }
  let createArtilceRes = await createArticle({
    data,
    user,
    previousHash,
    hash,
    local,
  })
  message.destroy()
  if (createArtilceRes.data) {
    message.success('文章区块上传成功')
    dispatch({
      type: actionTypes.CREATE_ARTICLE,
      payload: createArtilceRes.data,
    })
  } else message.warning('文章创建失败')
}
export { getArticleListAction, createArticleAction }
