import { actionTypes } from '../index'
import { userLogin, userRegister, UserLoginInterFace, getUserInfo } from '../../api/user'
import { message } from 'antd'

const loginAction = ({ account, password }: UserLoginInterFace) => async (dispatch: any) => {
  message.destroy()
  message.loading('登录中...')
  if (account && password) {
    try {
      let res = await userLogin({ account, password })
      console.log('登录回调', res)
      dispatch({
        type: actionTypes.USER_LOGIN,
        payload: {
          data: res.data,
        },
      })
    } catch (error) {
      message.destroy()
      message.warning(String(error))
    }
  } else {
    message.destroy()
    message.warn('请输入账号或密码')
  }
}
const loginOutAction = () => async (dispatch: any) => {
  try {
    await localStorage.clear()
    dispatch({
      type: actionTypes.USER_LOGINOUT,
      payload: {
        isLoginOut: true,
      },
    })
  } catch (error) {
    message.warn('login out error', error)
  }
}

const registerAction = ({ account, password }: UserLoginInterFace) => async (dispatch: any) => {
  message.loading('wating...')
  try {
    let res: any = await userRegister({ account, password })
    console.log('action', res)
    if (res._id) {
      message.destroy()
      message.success('注册成功')
    }
  } catch (error) {
    message.destroy()
    message.warning('注册失败', error)
  }
}

const getUserAction = (token: string) => async (dispatch: any) => {
  try {
    let res: any = await getUserInfo(token)
    dispatch({
      type: actionTypes.GET_USERINFO,
      payload: {
        data: res.data,
      },
    })
  } catch (error) {
    console.log('getUserAction ERR', error)
  }
}

export { loginAction, loginOutAction, registerAction, getUserAction }
