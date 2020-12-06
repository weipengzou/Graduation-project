import React from 'react'
import 'lib-flexible'
import './App.less'
import Frame from './components/Frame'
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

const App = (props: any) => {
  useEffect(() => {
    console.log('app created', props)
  }, [])
  useEffect(() => {})
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Frame />
        </Route>
      </Switch>
    </Router>
  )
}
const mapState = (state: any) => ({
  userInfo: state.user.userInfo,
  token: state.user.token,
})
const mapDispatchToProps = {}
// 高阶函数
export default connect(mapState, mapDispatchToProps)(App)
