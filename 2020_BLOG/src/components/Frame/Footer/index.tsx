import React from 'react'

interface Props {}

let year = new Date().getUTCFullYear()
const Footer = (props: Props) => {
  return <>&copy; {year} &nbsp;zwp1.top</>
}

export default Footer
