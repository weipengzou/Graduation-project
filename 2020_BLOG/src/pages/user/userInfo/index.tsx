import React from 'react'
import { connect } from 'react-redux'
import { loginOutAction } from '../../../actions/user'
import { Button } from 'antd'
import './userInfo.less'
import '../user.less'
const UserInfo = (props: any) => {
  console.log('用户信息页面', props)
  let loginOut = () => {
    props.loginOutAction()
  }
  return (
    <div className="user_info">
      <div className="info">
        <h2 className="globe_title">用户信息页面</h2>
        <div className="globe_item">用户名：{props.userInfo.account}</div>
      </div>
      <span className="loginout_btn">
        <Button onClick={loginOut}>退出登录</Button>
      </span>
    </div>
  )
}

const mapStateToProps = (store: any) => ({
  userInfo: store.user.userInfo,
  isLogin: store.user.isLogin,
})

const mapDispatchToProps = {
  loginOutAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
