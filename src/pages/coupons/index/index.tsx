import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './style.scss'

interface IProps {
}
interface IState {
  listData: any[]
}

class Index extends Component<IProps, IState> {
  state: IState = {
    listData: [{ name: "享超级新人礼，美味送不停", img: require('@/assets/images/card/15.png') }, { name: "享超级新人礼，美味送不停", img: require('@/assets/images/card/15.png') }, { name: "享超级新人礼，美味送不停", img: require('@/assets/images/card/15.png') }, { name: "享超级新人礼，美味送不停", img: require('@/assets/images/card/15.png') }]

  }
  config: Config = {
    navigationBarTitleText: '优惠券'
  }
  handleChange = value => {
  }

  componentWillReceiveProps(nextProps) {
  }
  componentDidMount() {//dom加载好的时候
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  render() {
    return (
      <View className="coupons">
        <View className="coupons-header">
              <View className="header-item">
                  <View className="title">3876</View>
                  <View className="subtitle">总点击量</View>
              </View>
              <View className="header-item">
                  <View className="title">3876</View>
                  <View className="subtitle">总点击量</View>
              </View>
        </View>

        <View className="fix_bottom_btn">创建优惠券</View>
      </View>
    )
  }
}

export default Index as ComponentClass;
