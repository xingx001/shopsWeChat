import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '@/constants/status';
import { logError } from '@/utils/error';

const baseUrl='http://ykd.aoqikc.com';//api地址
type OptionType = {
  url: string
  data?: object | string
  method?: any
  header: object
  success: any
  error: any
  xhrFields: object
  mode: "no-cors" | "cors" | "same-origin"
}
export default {
  baseOptions(params, method = 'GET') {
    const { url, data } = params
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    const option: OptionType = {
      url: url.indexOf('http') !== -1 ? url : baseUrl + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        cookie: Taro.getStorageSync('cookies')
      },
      mode: 'cors',
      xhrFields: { withCredentials: true },
      success(res) {
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError('api', '请求资源不存在')
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return logError('api', '服务端出现了问题')
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return logError('api', '没有权限访问')
        } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
          Taro.clearStorage()
          Taro.navigateTo({
            url: '/pages/login/index'
          })
          return logError('api', '请先登录')
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data
        }
      },
      error(e) {
        logError('api', '请求接口出现问题', e)
      }
    }
    return Taro.request(option)
  },
  get(url, data?: object) {
    const option = { url, data }
    return this.baseOptions(option)
  },
  post: function (url, data?: object, contentType?: string) {
    const params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  },
  put(url, data?: object) {
    const option = { url, data }
    return this.baseOptions(option, 'PUT')
  },
  delete(url, data?: object) {
    const option = { url, data }
    return this.baseOptions(option, 'DELETE')
  }
}
