import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '@/actions/counter';
import { API } from '@/apis';

import './style.scss';
const chooseLocation = Taro.requirePlugin('chooseLocation');
type PageStateProps = {
  counter: {
    num: number
  }
}
type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
  state = {
    text: '',
    address: '请选择地址',
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
    Taro.login({
      success: function (res) {
        if (res.code) {

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
  componentWillUnmount() { }

  componentDidShow() {
    const location = chooseLocation.getLocation();
    if(location){
      const { address } = location;
      this.setState({
        address
      })
      console.log('location', location)
    }
  }

  componentDidHide() { }
  handleChangeTextarea = (value) => {
    this.setState({ text: value })
  }
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
  render() {
    const { address } = this.state;
    return (
      <View className='storesinform-box'>
        <View className="'inform-li">
          <View className="store-msg">门店图册</View>
          <View className="upload_img">
            <View className="img-list">
              <View className="on-upload">
                <Image src={require('@/assets/images/icon/upload.png')} className="add-icon" />
                <Text className="upload-msg">上传照片</Text>
              </View>
            </View>
            <View className="img-list">
              <Image src={require('@/assets/images/card/7.png')} className="shop_img" />
              <View className="delect-btn">
                <AtIcon value='trash' size='18' color='rgba(255, 255, 255, 1)' className="icon-del"></AtIcon>
              </View>
            </View>
            <View className="img-list">
              <Image src={require('@/assets/images/card/7.png')} className="shop_img" />
              <View className="delect-btn">
                <AtIcon value='trash' size='18' color='rgba(255, 255, 255, 1)' className="icon-del"></AtIcon>
              </View>
            </View>
            <View className="img-list ">
              <Image src={require('@/assets/images/card/7.png')} className="shop_img" />
              <View className="delect-btn">
                <AtIcon value='trash' size='18' color='rgba(255, 255, 255, 1)' className="icon-del"></AtIcon>
              </View>
            </View>

          </View>
        </View>
        <View className="inform-li inform-box">
          <View className="inform-tit">
            <View className="store-msg">门店图册</View>
            <View className="store-msg">9:00-22:00</View>
          </View>
          <View className="inform-tit">
            <View className="store-msg">联系电话</View>
            <View className="store-msg">13878677654</View>
          </View>
          <View className="inform-tit">
            <View className="store-msg">门店地址</View>
            <View className="store-msg" onClick={this.onSelectMap}>{address}</View>
          </View>
          <View className="inform-tit">
            <View className="store-msg">门牌号</View>
            <View className="store-msg">4楼421</View>
          </View>
        </View>
        <View className="warn_msg">门店地址用地图选点的方式得到， 选的点即为用户端地图展示的地点</View>

        <View className="save_btn">保存</View>
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

export default Index as ComponentClass<PageOwnProps, PageState>
