import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image,Input } from '@tarojs/components'
import { AtIcon} from 'taro-ui'
import { API } from '@/apis';
import Http from '@/utils/https'
import './style.scss';
import RangeDatePicker from '@/components/rangeDatePicker'
const chooseLocation = Taro.requirePlugin('chooseLocation');
type IProps = {

}
const initState = {
  fileList: [],
  authsInfo: Taro.getStorageSync('authsInfo') || {},
  Id: '',//门店Id
  files: [],
  address: '',
  xcode: '',
  ycode: '',
  phone: '',
  BiginTiem: '',
  EndTiem: '',
  province:'',
  city:'',
  district:'',
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
        const {	BiginTiem,EndTiem,Phone,	Province,	City,	Region,	Address,	XCode,	YCode,	Shop_Photo1 } = data;
        this.setState({
          BiginTiem,
          EndTiem,
          phone:Phone,
          province:Province,
          city:City,
          district:Region,
          address:Address,
          xcode:XCode,
          ycode:YCode,
          fileList:Shop_Photo1.split(',')
        })
      } else {
      }

    })
  }
  componentWillUnmount() { }

  componentDidShow() {
    const location = chooseLocation.getLocation();
    if (location) {
      const { address,city,district,province,latitude,longitude } = location;
      this.setState({
        address: address,
        xcode:longitude,
        ycode:latitude,
        province,
        city,
        district
      })
      console.log('location', location)
    }
  }

  componentDidHide() { }
  onSelectMap = () => {
    const key = 'RH2BZ-OPKHG-ADFQL-IARZL-ZAVYQ-6QFKV'; //使用在腾讯位置服务申请的key
    const referer = 'shopsWeChat'; //调用插件的app的名称
    Taro.getLocation({ type: 'gcj02' }).then((res) => {
      const { latitude, longitude } = res;
      const { xcode,ycode } = this.state;
      console.log(latitude, longitude);
      const location = JSON.stringify({
        latitude: ycode||latitude,
        longitude: xcode||longitude
      });
      const category = '';
      Taro.navigateTo({
        url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
      });
    })

  }
  onHandleSave = () => {
    const { authsInfo,fileList, BiginTiem,EndTiem,xcode,ycode,phone,city,district,province,address} = this.state;
    API.savePOSShopManage({
      ...authsInfo,
      Id:authsInfo.shopid,
      btime:BiginTiem,
      etime:EndTiem,
      imgs:fileList.join(','),
      phone,
      xcode,
      ycode,
      pri:province,
      city,
      region:district,
      adds:address
    }).then(res => {
      const { code } = res;
      if (code === '0') {
        Taro.showToast({
          'title': '保存成功',
          'icon': 'success',
        });
        setTimeout(()=>{
          Taro.navigateBack({
            delta: 1
          })
        },2000)
        
      }

    })
  }
  onChooseImage = () => {
    Taro.chooseImage({
      success:(res) => {
        const tempFilePaths = res.tempFilePaths;
        Http.ossUpload(tempFilePaths[0]).then(res=>{
          const {data,statusCode} = res;
          if(statusCode==200){
                 const { fileList } = this.state;
                 this.setState({
                    fileList: [data,...fileList]
                  });
          }
        })
      }
    })
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
  onChangeInput = (e) => {
    let value = e.target.value;
    this.setState({
      phone:value
    })
  }
  render() {
    const { address, phone,fileList,BiginTiem,EndTiem,isOpened } = this.state;
    return (
      <View className='storesinform-box'>
        <View className="'inform-li">
          <View className="store-msg">门店图册</View>
          <View className="upload_img">
            <View className="img-list">
              <View className="on-upload" onClick={this.onChooseImage}>
                <Image src={require('@/assets/images/icon/upload.png')} className="add-icon" />
                <Text className="upload-msg">上传照片</Text>
              </View>
            </View>
            {
              fileList.map((item, index) => (
                <View className="img-list" key={index + '_list'}>
                  <Image src={item} className="shop_img" />
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
              BiginTiem||EndTiem ? `${BiginTiem}至${EndTiem}`:<Text className="placeholderClass">请选择时间</Text>
            }
          </View>
          </View>
          <View className="inform-tit">
            <View className="store-msg">联系电话</View>
            <View className="store-msg">
              <Input type='number' value={phone} onInput={this.onChangeInput} className="input" placeholder='请输入联系电话' placeholderClass="placeholderClass" maxLength={11} />
            </View>
          </View>
          <View className="inform-tit">
            <View className="store-msg">门店地址</View>
            <View className="adress_right">
              <View className="map-text" onClick={this.onSelectMap}>
                {
                  address ? address:(<Text className="placeholderClass">请选择地址</Text>)
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
