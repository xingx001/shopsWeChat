import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '@/constants/status';
import { logError } from '@/utils/error';
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
        if((res.data.code)&&(res.data.code!=0)){
          Taro.showToast({
            title: res.data && res.data.msg||'请求异常',
            icon: 'none'
          });
        } else {
          return res.data
        }
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
  ossUpload(tempFilePaths){
    const host = 'http://doutui-img.oss-cn-hangzhou.aliyuncs.com';
    const fileName = tempFilePaths.replace('http://tmp','');
    const filePath = host+fileName;
    Taro.showLoading({title: "图片上传中..."})
    return Taro.uploadFile({
      url: host, //仅为示例，非真实的接口地址
      filePath: tempFilePaths,
      name: 'file',
      formData: {
        name:tempFilePaths,
        key: "${filename}",
        policy:'eyJleHBpcmF0aW9uIjoiMjEwMC0wOC0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
        OSSAccessKeyId:'LTAI4G3HYZapXoAXeVBWFQ3R',
        success_action_status: 200,
        signature: 'Qlj1UWOhpoHA3eJKaARuQ0b0Daw='
      },
      success: (res)=>{
        const {data,statusCode} = res;
        if(statusCode==200){
          res.data = filePath
          Taro.hideLoading()
        }
      },
      fail:()=>{
        Taro.hideLoading()
      }
    })
  }
}
