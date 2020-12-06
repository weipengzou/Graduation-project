// @ts-nocheck
import axios from 'axios'
let apiUrl = {
  // zwpUrl: 'localhost:3000',
  zwpUrl: 'https://zwp1.top:3000',
  locationServerUrl: 'https://apis.map.qq.com/ws/location/v1',
}
let Axios = axios
// 请求拦截
Axios.interceptors.request.use(
  (config) => {
    // 判断token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
//axios本版本不支持jsonp 自己拓展一个
Axios.jsonp = (url) => {
  if (!url) {
    console.error('Axios.JSONP 至少需要一个url参数!')
    return
  }
  return new Promise((resolve, reject) => {
    window.jsonCallBack = (result) => {
      resolve(result)
    }
    var JSONP = document.createElement('script')
    JSONP.type = 'text/javascript'
    JSONP.src = `${url}&callback=jsonCallBack`
    document.getElementsByTagName('head')[0].appendChild(JSONP)
    setTimeout(() => {
      document.getElementsByTagName('head')[0].removeChild(JSONP)
    }, 500)
  })
}

export { Axios, apiUrl }
