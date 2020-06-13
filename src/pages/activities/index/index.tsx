import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
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
    navigationBarTitleText: '活动'
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
      <View className="activities-wrap">
        {
          this.state.listData.map((item, index) => (
            <View  className='activities-ul'>
              <View className="activities-li">
                <Text className="activities_title">{item.name}</Text>
                <Image src={item.img} className="activities_img" />
              </View>
            </View>
          )
          )}
      </View>
    )
  }
}

export default Index as ComponentClass;
