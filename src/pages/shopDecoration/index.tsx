import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import OSS from 'ali-oss'
import { View, Text, Image,Picker } from '@tarojs/components'
import { AtIcon, AtImagePicker, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { API } from '@/apis';
// const OSS = require("ali-oss");
import './style.scss';
declare var OSS;
const chooseLocation = Taro.requirePlugin('chooseLocation');
type IProps = {

}
const initState = {
  fileList: [],
  authsInfo: Taro.getStorageSync('authsInfo') || {},
  Id: '',//门店Id
  files: [],
  Address: '请选择地址',
  XCode: '',
  YCode: '',
  Phone: '',
  BiginTiem: '',
  EndTiem: '',
  aliYunConfig: {
    // region以杭州为例（oss-cn-hangzhou），其他region按实际情况填写。
    region: 'oss-cn-hangzhou',
    // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录RAM控制台创建RAM账号。
    accessKeyId: 'LTAI4Fsbfp2m8HQwLF5etifB',
    accessKeySecret: '<Your AccessKeySecret>',
    bucket: 'aqkj-test'
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
    // if(files&&files.length){
    //   this.uploadOssfile(files[0].file);
    // }
  }
  uploadOssfile = (file) => {
    console.log(file)
    const { aliYunConfig } = this.state
    let client = new OSS(aliYunConfig);
    async function putObject() {
      try {
        // object-key可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
        let result = await client.put('test', file);
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    }
    putObject();
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
    if(type=='start'){
      this.setState({
        BiginTiem:value
      })
    }else {
      this.setState({
        EndTiem:value
      })
    }
    console.log(value,type)
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
            BiginTiem&&EndTiem ? `${BiginTiem}-${EndTiem}`:'请选择时间'
          }
          </View>
          </View>
          <View className="inform-tit">
            <View className="store-msg">联系电话</View>
            <View className="store-msg">13878677654</View>
          </View>
          <View className="inform-tit">
            <View className="store-msg">门店地址</View>
            <View className="adress_right">
              <View className="store-msg" onClick={this.onSelectMap}>{Address}</View>
              <Text className="at-icon at-icon-chevron-right icon_right"></Text>
            </View>
          </View>
          {/* <View className="inform-tit">
            <View className="store-msg">门牌号</View>
            <View className="store-msg">4楼421</View>
          </View> */}
        </View>
        <View className="warn_msg">门店地址用地图选点的方式得到， 选的点即为用户端地图展示的地点</View>
        <AtActionSheet isOpened={isOpened} title={`开始时间：${BiginTiem||'---'}  结束时间：${EndTiem||'---'}`} cancelText='取消' onClose={this.onCancelTimeSelect} onCancel={this.onCancelTimeSelect}>
           <Picker mode='time' value={BiginTiem} onChange={(e)=>this.onTimeChange(e,'start')}>
              <AtActionSheetItem>
                 开始时间
              </AtActionSheetItem>
            </Picker>
            <Picker mode='time' value={EndTiem} onChange={(e)=>this.onTimeChange(e,'end')}>
              <AtActionSheetItem>
                 结束时间
              </AtActionSheetItem>
            </Picker>
        </AtActionSheet>
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
