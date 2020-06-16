import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTextarea, AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '@/actions/counter';

import { API } from '@/apis';

import './style.scss'
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
  }
  /**
  * 指定config的类型声明为: Taro.Config
  *
  * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
  * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
  * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
  */
  config: Config = {
    navigationBarTitleText: '门店信息'
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    Taro.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          API.getUserIdByOpenId({
            openid: 1,
            shopid: 1
          }).then(result => {
            console.log(result)
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onOpenMap() {
    // Taro.getLocation({ type: 'gcj02' }).then((res) => {
    //   const latitude = res.latitude
    //   const longitude = res.longitude
    //   Taro.openLocation({
    //     latitude:30.274825,
    //     longitude:119.961748,
    //     scale: 16
    //   })
    //   this.setState({ latitude: latitude })
    //   this.setState({ longitude: longitude })
    // })
  }
  handleChangeTextarea = (value) => {
    this.setState({ text: value })
  }
  render() {
    const { text } = this.state;
    return (
      <View className='storesinform-box'>
        <View className="'inform-li inform-tit">
          <View className="store-msg">门店名称</View>
          <View className="store-name">可莎蜜儿</View>
        </View>
        <View className="'inform-li">
          <View className="introduction-box">
            <View>门店简介</View>
            <AtTextarea value={text} onChange={this.handleChangeTextarea} placeholder="请输入门店介绍" autoFocus maxLength={50} className="introd-textarea" />
          </View>
        </View>
        <View className="'inform-li">
          <View>门店大图<Text className="msg">门店菜品轮播图</Text></View>
          <View className="stores-images">
            <View className="img-list">
              <View className="on-upload">
                <Image src={require('@/assets/images/icon/upload.png')} className="add-icon" />
                <Text className="upload-msg">上传视频或照片</Text>
              </View>
            </View>
            <View className="img-list">
              <View className="imgs-li">
                <Image src={require('@/assets/images/card/4.png')} className="shop_img" />
                <View className="delect-btn">
                  <AtIcon value='trash' size='18' color='rgba(255, 255, 255, 1)' className="icon-del"></AtIcon>
                </View>
              </View>
            </View>
            <View className="img-list">
              <View className="imgs-li">
                <Image src={require('@/assets/images/card/4.png')} className="shop_img" />
                <View className="delect-btn">
                  <AtIcon value='trash' size='18' color='rgba(255, 255, 255, 1)' className="icon-del"></AtIcon>
                </View>
              </View>
            </View>
            <View className="img-list">
              <View className="imgs-li">
                <Image src={require('@/assets/images/card/4.png')} className="shop_img" />
                <View className="delect-btn">
                  <AtIcon value='trash' size='18' color='rgba(255, 255, 255, 1)' className="icon-del"></AtIcon>
                </View>
              </View>
            </View>
            <View className="img-list">
              <View className="imgs-li">
                <Image src={require('@/assets/images/card/4.png')} className="shop_img" />
                <View className="delect-btn">
                  <AtIcon value='trash' size='18' color='rgba(255, 255, 255, 1)' className="icon-del"></AtIcon>
                </View>
              </View>
            </View>

          </View>
        </View>
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
