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
                <View className="card-wrap">
                    <Image src={item.img} className="activities_img" />
                    <View className="card-foot">
                        <Text className="foot-item"><Text className="foot-icon"></Text>预览</Text>
                        <Text className="foot-item"><Text className="foot-icon"></Text>编辑</Text>
                        <Text className="foot-item"><Text className="foot-icon"></Text>删除</Text>
                    </View>
                </View>
              </View>
            </View>
          )
          )
        }
        <View className="fix_bottom_btn">发布活动</View>
      </View>
    )
  }
}

export default Index as ComponentClass;
