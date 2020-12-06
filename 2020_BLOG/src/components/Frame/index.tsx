import React, { useEffect } from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import './frame.less'
import { Layout } from 'antd'
import { getUserAction } from '../../actions/user'
import { connect } from 'react-redux'
const Frame = (props: any) => {
  useEffect(() => {
    // 获取用户参数
    let token = localStorage.getItem('token')
    if (token) props.getUserAction(token)
  }, [])
  return (
    <>
      <Layout.Header className="f-header">
        <Header />
      </Layout.Header>
      <Layout.Content className="f-content">
        <Content />
      </Layout.Content>
      <Layout.Footer className="f-footer">
        <Footer />
      </Layout.Footer>
    </>
  )
}
const mapState = (state: any) => ({
  isLogin: state.user.isLogin,
})
const mapDispatchToProps = { getUserAction }
export default connect(mapState, mapDispatchToProps)(Frame)
