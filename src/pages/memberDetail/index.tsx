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
    navigationBarTitleText: '门店装修'
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
      <View className='detail_wrap'>
        <View className="detail_li">
          <View className="detail_left">
            <Image src={require('@/assets/images/icon/heard.png')} className="heard_img" />
            <View className="detail_inforn">
              <View className="member_name">会员昵称</View>
              <View>手机号：17898675687</View>
            </View>
          </View>
          <View className="detail_right">2019/10/01 14:54:23</View>
        </View>
        <View className="detail_li">
          <View className="detail_left">
            <Image src={require('@/assets/images/icon/heard.png')} className="heard_img" />
            <View className="detail_inforn">
              <View className="member_name">会员昵称</View>
              <View>手机号：17898675687</View>
            </View>
          </View>
          <View className="detail_right">2019/10/01 14:54:23</View>
        </View>
        <View className="detail_li">
          <View className="detail_left">
            <Image src={require('@/assets/images/icon/heard.png')} className="heard_img" />
            <View className="detail_inforn">
              <View className="member_name">会员昵称</View>
              <View>手机号：17898675687</View>
            </View>
          </View>
          <View className="detail_right">2019/10/01 14:54:23</View>
        </View>
        <View className="detail_li">
          <View className="detail_left">
            <Image src={require('@/assets/images/icon/heard.png')} className="heard_img" />
            <View className="detail_inforn">
              <View className="member_name">会员昵称</View>
              <View>手机号：17898675687</View>
            </View>
          </View>
          <View className="detail_right">2019/10/01 14:54:23</View>
        </View>
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
