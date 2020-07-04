import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '@/constants/status';
import { logError } from '@/utils/error';
// const OSS:any  = require('ali-oss');
// const aliYunConfig ={
//   // region以杭州为例（oss-cn-hangzhou），其他region按实际情况填写。
//   region: 'oss-cn-hangzhou',
//   // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录RAM控制台创建RAM账号。
//   accessKeyId: 'LTAI4G3HYZapXoAXeVBWFQ3R',
//   accessKeySecret: 'ins4c8sVV3c4UBM3CLEYqveBBUAW6u',
//   bucket: 'doutui-img.oss-cn-hangzhou.aliyuncs.com '
// }
const baseUrl='http://ykd.aoqikc.com';//api地址
type OptionType = {
  url: string
  data?: object | string
  method?: any
  header: object
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
      xhrFields: { withCredentials: true }
    }
    // Taro.showLoading({
    //   title: "加载中..."
    // })
    return Taro.request(option).then((res) => {
      // Taro.hideLoading();
      if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
        return logError('api', '请求资源不存在')
      } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
        return logError('api', '服务端出现了问题')
      } else if (res.statusCode === HTTP_STATUS.SERVER_ERROR) {
        return logError('api', '服务端出现了问题')
      } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
        return logError('api', '没有权限访问')
      } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
        Taro.clearStorage()
        return logError('api', '请先登录')
      } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
        return res.data
      }
    }).catch(err=>{
      logError('api', '请求接口出现问题', err);
      Taro.showToast({
        title: err && err.msg||'请求异常',
        icon: 'none'
      })
    })
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
  },
  ossUpload(file){
    // const current=file.file
    // let name = current.name;
    // const suffix = name.substr(name.indexOf("."));
    // const timestamp= Date.now();
    // const fileName = 'header/' +timestamp+ suffix;
    // let client = new OSS(aliYunConfig);
    // return client.multipartUpload(fileName, file.file, {
    //   progress:function (p) { //获取进度条的值
    //     console.log(p)
    //   }
    //  })
  }
}
