import { Axios, apiUrl } from '..'
// 获取用户信息请求
let getUserInfo = async (token: string) => {
  console.log('get user info api', token)
  let res = await Axios({
    url: `${apiUrl.zwpUrl}/user`,
  })
  console.log('get user info api', res)

  return res
}
// 用户登录请求
let userLogin = async (userData: UserLoginInterFace) =>
  await Axios.post(`${apiUrl.zwpUrl}/auth/login`, {
    account: userData.account,
    password: userData.password,
  })
// 用户注册请求
let userRegister = async (userData: UserLoginInterFace) => {
  let res = await Axios.post(`${apiUrl.zwpUrl}/auth/register`, {
    account: userData.account,
    password: userData.password,
  })
  return res.data
}
export interface UserLoginInterFace {
  account: string
  password: string
}

export { getUserInfo, userLogin, userRegister }
