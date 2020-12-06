import { message } from 'antd'
import { actionTypes } from '../../actions'
interface IinitState {
  userInfo: object
  isLogin: boolean
  token: string
}
const initState = {
  userInfo: {
    account: '',
    password: '',
  },
  isLogin: false,
  token: '',
}
export default (state: any = initState, action: any) => {
  // state深拷贝 触发差异渲染视图
  let newState = Object.assign({}, state)
  switch (action.type) {
    case actionTypes.USER_LOGIN: {
      message.destroy()
      console.log('LOGIN', action.payload)
      let res = action.payload
      if (res.data.token != null) {
        newState.token = res.data.token
        newState.userInfo = res.data.user
        newState.isLogin = true
        localStorage.setItem('token', res.data.token)
        message.success('登陆成功')
        console.log('登陆成功', newState)
      } else message.warning('登陆失败')
      return newState
    }
    case actionTypes.USER_LOGINOUT: {
      let isLoginOut = action.payload.isLoginOut
      newState.isLogin = !isLoginOut
      newState.userInfo = {}
      message.destroy()
      message.success('已退出登录')
      return newState
    }
    case actionTypes.REGISTER: {
      message.destroy()
      console.log('REGISTER', action.payload)
      newState.userInfo.account = action.payload.account
      message.success('注册成功')
      return newState
    }
    case actionTypes.GET_USERINFO: {
      // console.log('GETUSERINFO', action.payload.data)
      newState.userInfo = action.payload.data
      newState.isLogin = true
      return newState
    }
    default: {
      console.log('default reducer')
      // 默认返回state，不渲染视图
      return state
    }
  }
}
