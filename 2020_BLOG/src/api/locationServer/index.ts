// @ts-nocheck
import { Axios, apiUrl } from '..'
// 获取用户ip地址请求
let getIp = async () => {
  return await Axios.jsonp(`${apiUrl.locationServerUrl}/ip?key=FSUBZ-ICOWS-2FEOY-6ZWWF-SFO2J-K6FS4&output=jsonp`)
}
export { getIp }
