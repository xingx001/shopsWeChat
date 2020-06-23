import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '@/actions/counter';
import EChart from 'techarts';
import * as echarts from '@/lib/echarts';
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
    authsInfo: Taro.getStorageSync('authsInfo') || {},
    value: false,
    ShopFullName: '',
    Shop_Photo: '',
    ShopContent: '',
    TodayAdd: '',
    TodayInStore: '',
    SumUserVIP: '',
    Weeks:[]


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
        console.log(data)

        let { ShopFullName, Shop_Photo, ShopContent, TodayAdd, TodayInStore, SumUserVIP,Weeks } = data;
        this.setState({
          ShopFullName,
          Shop_Photo,
          ShopContent,
          TodayAdd,
          TodayInStore,
          SumUserVIP,
          Weeks:JSON.parse(Weeks)
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
    const { ShopFullName, Shop_Photo, ShopContent, TodayAdd, TodayInStore, SumUserVIP,Weeks } = this.state;
    console.log(Weeks)
    const option = {
      color: ['#F5A623', '#26BBF2'],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        right: 0,
        top: 0,
        textStyle: {
          fontSize: 10,
          color: '#333333'
        },
        selectedMode: false,
        data: ['领取量', '使用量']
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 20,
        top: 30,
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#E9E9E9'
          }
        },
        axisLabel: {
          rotate: 45,
          color: '#B7B7B7',
          fontSize: 10
        },
        axisTick: {
          show: false,
          lineStyle: {
            width: 1
          }
        },
        boundaryGap: false,
        data: Weeks
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#E9E9E9'
          }
        },
        axisLabel: {
          color: '#B7B7B7',
          fontSize: 10
        },
        axisTick: {
          show: false,
          lineStyle: {
            width: 1
          }
        },
      },
      series: [
        {
          name: '领取量',
          type: 'line',
          symbol: 'circle',
          symbolSize: 8,
          smooth: true,
          lineStyle: {
            width: 1
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '使用量',
          type: 'line',
          symbol: 'circle',
          symbolSize: 8,
          smooth: true,
          lineStyle: {
            width: 1
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        }
      ]
    };
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
          <View className="store-li" onClick={() => this.onJump(5)}>
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

export default Index as ComponentClass<PageOwnProps, PageState>
