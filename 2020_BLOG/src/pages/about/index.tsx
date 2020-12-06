import React from 'react'
import './about.less'
interface Props {}

const About = (props: Props) => {
  return (
    <>
      <div className="about">
        <h2>About</h2>
        <div>网站基于 react + antd + typeScript + reacthook + Nestjs 等开发,仅供学习使用</div>
        <div>
          Github地址：
          <a href="https://github.com/weipengzou" target="view_window">
            https://github.com/weipengzou
          </a>
        </div>
        <div>
          Mail地址&ensp;&ensp;：
          <a href="https://mail.qq.com/" target="view_window">
            944740645@qq.com
          </a>
        </div>
      </div>
    </>
  )
}

export default About
