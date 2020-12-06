import React, { useState, useEffect } from 'react'
import { Menu, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import routers from '../../../../router'
import './menu.less'
const Nav = (props: any) => {
	const history = useHistory()
	useEffect(() => {
		console.log(routers)
	}, [])

	const navTo = (e: any) => history.push(e.key)
	return (
		<Menu
			className="menu"
			// selectedKeys={['home']}
			onClick={navTo}
			mode="horizontal"
			theme="dark"
		>
			{routers.map((item) => {
				return (
					<Menu.Item className="menu-item" key={item.path}>
						{item.title}
					</Menu.Item>
				)
			})}
		</Menu>
	)
}

export default Nav
