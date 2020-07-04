import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image,Input } from '@tarojs/components'
import { AtIcon, AtImagePicker} from 'taro-ui'
import { API } from '@/apis';
import RangeDatePicker from '@/components/rangeDatePicker'
const chooseLocation = Taro.requirePlugin('chooseLocation');
type IProps = {

}
const initState = {
  fileList: [],
  authsInfo: Taro.getStorageSync('authsInfo') || {},
  Id: '',//门店Id
  files: [],
  Address: '',
  XCode: '',
  YCode: '',
  Phone: '',
  BiginTiem: '',
  EndTiem: '',
  aliYunConfig: {
    // region以杭州为例（oss-cn-hangzhou），其他region按实际情况填写。
    region: 'oss-cn-hangzhou',
    // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录RAM控制台创建RAM账号。
    accessKeyId: 'LTAI4G3HYZapXoAXeVBWFQ3R',
    accessKeySecret: 'ins4c8sVV3c4UBM3CLEYqveBBUAW6u',
    bucket: 'doutui-img.oss-cn-hangzhou.aliyuncs.com'
  },
  isOpened:false
}
type IState = typeof initState;
class Index extends Component<IProps, IState> {
  state: IState = {
    ...initState
  }
  /**
  * 指定config的类型声明为: Taro.Config
  *
  * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
  * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
  * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
  */
  config: Config = {
    navigationBarTitleText: '门店装修'
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    this.getPOSShopManagePage();
  }
  getPOSShopManagePage = () => {
    const { authsInfo } = this.state;
    API.getPOSShopManagePage(authsInfo).then(res => {
      const { code, data } = res;
      if (code === '0') {
        console.log(data)
      } else {
      }

    })
  }
  savePOSShopManage = () => { //保存
    API.savePOSShopManage({}).then(res => {
      const { code, data } = res;
      if (code === '0') {
        console.log(data)
      } else {
      }

    })
  }
  componentWillUnmount() { }

  componentDidShow() {
    const location = chooseLocation.getLocation();
    if (location) {
      const { address } = location;
      this.setState({
        Address: address
      })
      console.log('location', location)
    }
  }

  componentDidHide() { }
  onSelectMap = () => {
    const key = 'RH2BZ-OPKHG-ADFQL-IARZL-ZAVYQ-6QFKV'; //使用在腾讯位置服务申请的key
    const referer = 'shopsWeChat'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: 30.274825,
      longitude: 119.961748
    });
    const category = '';
    Taro.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
    });
  }
  onHandleSave = () => { }
  onChangeAtImagePicker = (files) => {
    const { fileList } = this.state;
    this.setState({
      fileList: [...fileList, ...files]
    });
    console.log(files);
    Taro.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths
        Taro.uploadFile({
          url: 'https://yunkeduo.oss-cn-hangzhou.aliyuncs.com', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            key: new Date().valueOf() + "sss.jpg",
            policy:"eyJleHBpcmF0aW9uIjoiMjAyMS0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==",
            OSSAccessKeyId: "LTAI4Fsbfp2m8HQwLF5etifB",
            success_action_status: 200,
            signature: "Aeryc6zJx6kdBFs6pkjsG28QrbY="
          },
          success: (res)=>{
            const data = res.data;
            console.log('res',res)
            //do something
          }
        })
      }
    })
    // if(files&&files.length){
      // this.uploadOssfile(files[0].file);
    // }
  }
  uploadOssfile = (file) => {
    console.log(file)
    const { aliYunConfig } = this.state
    debugger
    // let client = new OSS(aliYunConfig);
    // console.log(client)
    // async function putObject() {
    //   try {
    //     // object-key可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
    //     let result = await client.put('test', file);
    //     console.log(result);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    // putObject();
  }
  onHandleDelete = (index) => {
    const { fileList } = this.state;
    Taro.showModal({
      title: '',
      content: '确定删除该图片吗？',
      cancelText: '取消',
      confirmText: '确认',
      confirmColor: '#F5A623',
      success: (res) => {
        if (res.confirm) {
          fileList.splice(index, 1)
          this.setState({
            fileList
          })

        }
      }
    })

  }
  onSelectTime = () => {
    this.setState({
      isOpened:true
    })
  }
  onCancelTimeSelect = () =>{
    this.setState({
      isOpened:false
    })
  }
  onTimeChange = (e,type)=>{
    const value = e.detail.value;
    switch(type){
      case 'BiginTiem':
        this.setState({
          BiginTiem:value
        })
        break;
      default:
        this.setState({
          EndTiem:value
        })
    }
  }
  render() {
    const { Address, files, fileList,BiginTiem,EndTiem,isOpened } = this.state;
    return (
      <View className='storesinform-box'>
        <View className="'inform-li">
          <View className="store-msg">门店图册</View>
          <View className="upload_img">
            <View className="img-list">
              <View className="on-upload">
                <Image src={require('@/assets/images/icon/upload.png')} className="add-icon" />
                <Text className="upload-msg">上传照片</Text>
                <AtImagePicker
                  className="upload-image-picker"
                  multiple={true}
                  length={1}
                  mode='top'
                  files={files}
                  onChange={this.onChangeAtImagePicker}
                />
              </View>
            </View>
            {
              fileList.map((item, index) => (
                <View className="img-list" key={index + '_list'}>
                  <Image src={item.url} className="shop_img" />
                  <View className="delect-btn">
                    <AtIcon value='trash' size='18' color='rgba(255, 255, 255, 1)' onClick={() => this.onHandleDelete(index)} className="icon-del"></AtIcon>
                  </View>
                </View>
              ))
            }

          </View>
        </View>
        <View className="inform-li inform-box">
          <View className="inform-tit">
            <View className="store-msg">营业时间</View>
            <View className="store-msg" onClick={this.onSelectTime}>
            {
              BiginTiem||EndTiem ? `${BiginTiem}-${EndTiem}`:<Text className="placeholderClass">请选择时间</Text>
            }
          </View>
          </View>
          <View className="inform-tit">
            <View className="store-msg">联系电话</View>
            <View className="store-msg">
              <Input type='number' className="input" placeholder='请输入联系电话' placeholderClass="placeholderClass" maxLength={11} />
            </View>
          </View>
          <View className="inform-tit">
            <View className="store-msg">门店地址</View>
            <View className="adress_right">
              <View className="store-msg" onClick={this.onSelectMap}>
                {
                  Address ? Address:(<Text className="placeholderClass">请选择地址</Text>)
                }
              </View>
              <Text className="at-icon at-icon-chevron-right icon_right"></Text>
            </View>
          </View>
        </View>
        <View className="warn_msg">门店地址用地图选点的方式得到， 选的点即为用户端地图展示的地点</View>
        <RangeDatePicker isOpened={isOpened} BiginTiem={BiginTiem} EndTiem={EndTiem}  onCancel={this.onCancelTimeSelect} onChange={this.onTimeChange}/>
        <View className="save_btn" onClick={this.onHandleSave}>保存</View>
      </View>
    )
  }
}
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass
