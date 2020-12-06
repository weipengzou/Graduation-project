import React from 'react'
import './content.less'
import { Route, Switch, Redirect } from 'react-router-dom'
import routers from '../../../router'
interface Props {}

const Content = (props: Props) => {
  return (
    <div className="content">
      <Switch>
        {routers.map((routerItem) => {
          return <Route key={routerItem.path} path={routerItem.path} component={routerItem.component} exact={routerItem.isExact ? true : false} />
        })}
        <Redirect to="/home" from="/" />
      </Switch>
    </div>
  )
}

export default Content
