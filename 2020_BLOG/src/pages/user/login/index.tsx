import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loginAction } from '../../../actions/user'
import { Button, Input } from 'antd'
import { Link } from 'react-router-dom'
import './login.less'

const Login = (props: any) => {
  let loginBtn = async () => {
    await props.loginAction({
      account,
      password,
    })
  }
  const [account, setAccount] = useState()
  const [password, setPassword] = useState()
  let changeAcc = (e: any) => setAccount(e.target.value)
  let changePwd = (e: any) => setPassword(e.target.value)
  return (
    <>
      <h2 className="globe_title">登陆页面</h2>
      <div className="login_box">
        <div className="input_box">
          <Input className="ipt" onBlur={changeAcc} placeholder="请输入账号" type="text" />
          <Input.Password className="ipt" onChange={changePwd} placeholder="请输入密码" onPressEnter={loginBtn} />
          <div className="ipt login_btn">
            <Link to="/user/register">还未注册？</Link>
            <Button onClick={loginBtn}>log in</Button>
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (state: any) => ({
  isLogin: state.user.isLogin,
})
const mapDispatchToProps = { loginAction }
export default connect(mapStateToProps, mapDispatchToProps)(Login)
