import { Axios, apiUrl } from '..'
interface IcreateArticle {
  data: string
  user: string
  local: object
  previousHash: string
  hash: string
}
const createArticle = async ({ data, user, local, previousHash, hash }: IcreateArticle) => {
  // 处理数据
  return await Axios({
    url: `${apiUrl.zwpUrl}/article`,
    method: 'post',
    data: {
      data,
      user,
      local,
      previousHash,
      hash,
    },
  })
}
// 获取最后一个文章的hash值
const getArticle = async () =>
  await Axios({
    url: `${apiUrl.zwpUrl}/article`,
    method: 'get',
  })

export { createArticle, getArticle }
