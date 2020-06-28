import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import EChart from 'techarts';
import * as echarts from '@/lib/echarts';
import { API } from '@/apis';
import option from './options';

import './style.scss'
type IProps = {

}
const initState = {
  authsInfo: Taro.getStorageSync('authsInfo') || {},
  value: false,
  ShopFullName: '',
  Shop_Photo: '',
  ShopContent: '',
  TodayAdd: '',
  TodayInStore: '',
  SumUserVIP: '',
  option
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
    navigationBarTitleText: '我的店铺'
  }

  handleChange = value => {
    this.setState({ value })
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    this.getHomeDataReq();
  }
  getHomeDataReq() {
    const { authsInfo } = this.state;
    API.getPOSFirstPage(authsInfo).then(res => {
      const { code, msg, data } = res;
      if (code === '0') {
        let { ShopFullName, Shop_Photo, ShopContent, TodayAdd, TodayInStore, SumUserVIP, WeekData, WeeksList } = data;
        let newOption = JSON.parse(JSON.stringify(option));
        newOption.xAxis.data = WeeksList;
        newOption.series = WeekData.map((item, index) => Object.assign({}, newOption.series[index], item));
        this.setState({
          ShopFullName,
          Shop_Photo,
          ShopContent,
          TodayAdd,
          TodayInStore,
          SumUserVIP,
          option: newOption
        })
      } else {
      }

    })
  }
  onJump = (e) => {
    Taro.navigateTo({
      url: e
    })
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  render() {
    const { ShopFullName, Shop_Photo, ShopContent, TodayAdd, TodayInStore, SumUserVIP, option } = this.state;
    return (
      <View className='home_index'>
        <View className="stores-introd">
          <View className="stores-list">
            <View className="stores-left">
              <Image src={Shop_Photo} className="store_img" />
              <View className="stores-name">
                <View className="name">{ShopFullName}</View>
                <View className="inforn">{ShopContent}</View>
              </View>
            </View>
            <Text className="at-icon at-icon-chevron-right store_right" ></Text>
          </View>
        </View>
        <View className="store-box">
          <View className="store-li" onClick={() => this.onJump('/pages/shopDecoration/index')}>
            <Image src={require('@/assets/images/icon/huodongh.png')} className="icon_img" />
            <Text className="store-title">店面装修</Text>
          </View>
          <View className="store-li" onClick={() => this.onJump('/pages/shopManage/index/index')}>
            <Image src={require('@/assets/images/icon/huodongh.png')} className="icon_img" />
            <Text className="store-title">商品管理</Text>
          </View>
          <View className="store-li" onClick={() => this.onJump('/pages/coupons/index/index')}>
            <Image src={require('@/assets/images/icon/huodongh.png')} className="icon_img" />
            <Text className="store-title">优惠券</Text>
          </View>
          <View className="store-li" onClick={() => this.onJump('/pages/activities/index/index')}>
            <Image src={require('@/assets/images/icon/huodongh.png')} className="icon_img" />
            <Text className="store-title">活动管理</Text>
          </View>
          <View className="store-li" onClick={() => {
            Taro.showToast({
              title: '开发中',
              icon: 'none'
            })
          }}>
            <Image src={require('@/assets/images/icon/huodongh.png')} className="icon_img" />
            <Text className="store-title">会员权益</Text>
          </View>
        </View>
        <View className="member-detail">
          <View className="member-top">
            <View className="detail-name">会员数据</View>
            <View className="check-detail" onClick={() => this.onJump('/pages/memberDetail/index')}>
              <Text className="tit">会员明细</Text>
              <Text className="at-icon at-icon-chevron-right icon_right"></Text>
            </View>
          </View>
          <View className="detail-ul">
            <View className="detail-li">
              <Text className="num">{TodayAdd}</Text>
              <Text className="tit">今日新增</Text>
            </View>
            <View className="detail-li">
              <Text className="num">{TodayInStore}</Text>
              <Text className="tit">今日进店</Text>
            </View>
            <View className="detail-li">
              <Text className="num">{SumUserVIP}</Text>
              <Text className="tit">会员总计</Text>
            </View>
          </View>

        </View>
        <View className="echart-wrap">
          <View className="echart-title">优惠券近一周数据</View>
          <EChart echarts={echarts} style={{ width: '100%', height: Taro.pxTransform(400) }} option={option} />
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

export default Index as ComponentClass
