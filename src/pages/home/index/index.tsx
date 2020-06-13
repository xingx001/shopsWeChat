import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Map, Text, Image } from '@tarojs/components'
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
    value: false,
    latitude:30.274825,
    longitude:119.961748,
  }
  /**
  * 指定config的类型声明为: Taro.Config
  *
  * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
  * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
  * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
  */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  handleChange = value => {
    this.setState({ value })
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
            openid:1,
            shopid:1
          }).then(result=>{
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
  render() {
    const { latitude, longitude } = this.state;
    return (
      <View className='home_index'>
        <Image src={require('@/assets/images/card/1.png')} className="banner_img" />
        <View className="shop_info">
          <View><Text className="shop_title">店铺名称</Text></View>
          <View><Text className="shop_desc">店铺基本信息介绍，需要先确定店铺基本信息内容后，才能确定怎么排版合适</Text></View>
        </View>
        <View className="section_recommend">
          <View className="section_title"><Text className="title">推荐菜品</Text> <Text className="at-icon at-icon-chevron-right"></Text></View>
          <View className="recommend_goods">
            <View className="goods_item">
              <Image src={require('@/assets/images/card/2.png')} className="goods_img" />
              <View className="goods_name">原味香草泡芙</View>
              <View className="goods_price">¥19.9</View>
            </View>
            <View className="goods_item">
              <Image src={require('@/assets/images/card/2.png')} className="goods_img" />
              <View className="goods_name">原味香草泡芙</View>
              <View className="goods_price">¥19.9</View>
            </View>
            <View className="goods_item">
              <Image src={require('@/assets/images/card/2.png')} className="goods_img" />
              <View className="goods_name">原味香草泡芙</View>
              <View className="goods_price">¥19.9</View>
            </View>
          </View>
        </View>
        <View className="section_store">
          <View className="section_title"><Text className="title">门店介绍</Text> <Text className="at-icon at-icon-chevron-right"></Text></View>
          <View className="slide_wrap">
            <View className="slide_container">
              <View className="slide_li"><Image src={require('@/assets/images/card/6.png')} className="store_img" /></View>
              <View className="slide_li"><Image src={require('@/assets/images/card/6.png')} className="store_img" /></View>
              <View className="slide_li"><Image src={require('@/assets/images/card/6.png')} className="store_img" /></View>
              <View className="slide_li"><Image src={require('@/assets/images/card/6.png')} className="store_img" /></View>
              <View className="slide_li"><Image src={require('@/assets/images/card/6.png')} className="store_img" /></View>
            </View>
          </View>
        </View>
        <View className="section_coupon">
          <View className="section_title"><Text className="title">优惠券</Text> <Text className="at-icon at-icon-chevron-right"></Text></View>
          <View className="coupon_wrap">
            <View className="coupon_li">
              <View className="li_left">
                <View className="coupon_name">100元代金券</View>
                <View className="coupon_desc">周一至周日9:00-22:00  可重复使用</View>
                <View className="coupon_price"><Text className="unit">¥</Text>50</View>
              </View>
              <View className="li_right">
                <View className="coupon_button">立即抢购</View>
                <View className="sold_out">已售 58</View>
              </View>
            </View>
            <View className="coupon_li">
              <View className="li_left">
                <View className="coupon_name">100元代金券</View>
                <View className="coupon_desc">周一至周日9:00-22:00  可重复使用</View>
                <View className="coupon_price"><Text className="unit">¥</Text>50</View>
              </View>
              <View className="li_right">
                <View className="coupon_button">立即抢购</View>
                <View className="sold_out">已售 58</View>
              </View>
            </View>
          </View>
        </View>
        <View className="section_activites">
          <View className="section_title"><Text className="title">最新活动</Text> <Text className="at-icon at-icon-chevron-right"></Text></View>
          <View className="slide_wrap">
            <View className="slide_container">
              <View className="slide_li">
                <View className="activite_item">
                  <View className="activite_left">
                    <View className="activite_name">集赞免单</View>
                    <View className="activite_desc">集赞打折 最高免单</View>
                  </View>
                  <Image src={require('@/assets/images/card/17.png')} className="activite_img" />
                </View>
              </View>
              <View className="slide_li">
                <View className="activite_item">
                  <View className="activite_left">
                    <View className="activite_name">周三五折</View>
                    <View className="activite_desc">快乐享美食</View>
                  </View>
                  <Image src={require('@/assets/images/card/18.png')} className="activite_img" />
                </View>
              </View>
              <View className="slide_li">
                <View className="activite_item">
                  <View className="activite_left">
                    <View className="activite_name">集赞免单</View>
                    <View className="activite_desc">集赞打折 最高免单</View>
                  </View>
                  <Image src={require('@/assets/images/card/17.png')} className="activite_img" />
                </View>
              </View>

            </View>
          </View>
        </View>
        <View className="address_info">
          <View><Text className="address_title">联系我们</Text></View>
          <View><Text className="address_desc_li">营业时间：9:00-22:00</Text></View>
          <View><Text className="address_desc_li">联系电话：0571-88888888</Text></View>
          <View><Text className="address_desc_li">门店地址：杭州市余杭区文一西路1888号万达广场4楼</Text></View>
          <Map className="address_img" id="map" scale={16} longitude={longitude} latitude={latitude}>
            {/* <Image onClick={this.onOpenMap} src={require('@/assets/images/card/8.png')} className="address_img" /> */}
          </Map>
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
