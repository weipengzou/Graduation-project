import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Input, message } from 'antd'
import { Link } from 'react-router-dom'
import { registerAction } from '../../../actions/user'
import './register.less'
export const Register = (props: any) => {
  const [account, setAccount] = useState()
  const [password, setPassword] = useState()
  const [verifyPassword, setVerifyPassword] = useState()
  useEffect(() => {
    console.log('reg props ', props)
  }, [])
  let changeAcc = (e: any) => setAccount(e.target.value)
  let changePwd = (e: any) => setPassword(e.target.value)
  let changeVerifyPwd = (e: any) => setVerifyPassword(e.target.value)
  let goToRegister = () => {
    message.destroy()
    if (password !== verifyPassword) return message.warn('两次密码不相同')
    props.registerAction({
      account,
      password,
    })
  }
  return (
    <div className="register_box">
      <h2 className="globe_title">注册页面</h2>
      <div className="input_box">
        <Input className="ipt" onChange={changeAcc} placeholder="请输入账号" type="text" />
        <Input className="ipt" onChange={changePwd} placeholder="请输入密码" type="password" />
        <Input className="ipt" onChange={changeVerifyPwd} placeholder="请再次输入密码" type="password" onPressEnter={goToRegister} />
        <div className="ipt register_btn">
          <Link to="/user/login">已有帐号？</Link>
          <Button onClick={goToRegister}>注册</Button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = { registerAction }

export default connect(mapStateToProps, mapDispatchToProps)(Register)
