import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import Login from './login'
import Register from './register'
import UserInfo from './userInfo'
export const User = (props: any) => {
  useEffect(() => {
    // 用户登陆判断
    props.isLogin ? props.history.push('/user/userinfo') : props.history.push('/user/login')
  }, [props.history, props.isLogin])
  console.log('user', props)
  return (
    <div>
      <Switch>
        <Route path="/user/login" component={Login} />
        <Route path="/user/register" component={Register} />
        <Route path="/user/userinfo" component={UserInfo} />
        <Redirect from="/user" to={props.isLogin ? '/user/userinfo' : '/user/login'} />
      </Switch>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  isLogin: state.user.isLogin,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(User)
