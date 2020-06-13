import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components';
import Tags from '@/components/tags';
import classNames from 'classnames';
import './style.scss'

interface IProps {
}
interface IState {
  current: number,
  activeTabKey:string|number
}

const tabsData =[{text:'推荐',value:'1'},{text:'蛋糕',value:'2'},{text:'点心',value:'3'},{text:'其他甜点',value:'4'}]

class Index extends Component<IProps, IState> {
  state: IState = {
    current: 0,
    activeTabKey:'1'
  }
  config: Config = {
    navigationBarTitleText: '门店菜品',
    // navigationStyle:'custom',
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {

  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onChangeSwiper = (e) => {
    const currentTarget = e.currentTarget;
    const { current } = currentTarget;
    this.setState({
      current
    })
  }
  onChangeTabs = (value) => {
    console.log(value);
    this.setState({
      activeTabKey:value
    })
  }
  render() {
    const { current,activeTabKey } = this.state;
    const images = [require('@/assets/images/card/9.png'), require('@/assets/images/card/9.png'), require('@/assets/images/card/9.png')]
    return (
      <View className='shop-index'>
        <View className="swiper_wrap">
          <Swiper
            className='shop-swiper'
            vertical={false}
            circular
            indicatorDots={false}
            onChange={this.onChangeSwiper}
            autoplay>
            {
              images.map((item) => (
                <SwiperItem>
                  <Image src={item} className="shop_img" />
                </SwiperItem>
              ))
            }
          </Swiper>
          <View className="swiper_dot_wrap">
            {
              images.map((item, index) => (
                <Text className={classNames('dot_li', {
                  active: index == current
                })}></Text>
              ))
            }
          </View>
        </View>
        <View className="shop_info">
          <View className="shop_info_name">门店名称</View>
          <View className="shop_info_desc">门店介绍，美味、货真价实，高档原料，品质保证。美味、货真价实，高档原料，品质保证。美味、货真价实，高档原料，品质保证。</View>
        </View>
        <View className="goods_info">
          <View className="goods_tabs"><Tags value={activeTabKey} data={tabsData} onChange={this.onChangeTabs}/></View>
          <View className="goods_ul">
            <View className="goods_li">
              <Image src={require('@/assets/images/card/4.png')} className="good_img" />
              <View className="good_content">
                <View className="good_name">原味香草泡芙</View>
                <View className="good_desc">泡芙的外壳很酥脆～</View>
                <View className="good_price">¥19.9</View>
              </View>

            </View>
            <View className="goods_li">
              <Image src={require('@/assets/images/card/4.png')} className="good_img" />
              <View className="good_content">
                <View className="good_name">原味香草泡芙</View>
                <View className="good_desc">泡芙的外壳很酥脆～</View>
                <View className="good_price">¥19.9</View>
              </View>
            </View>
            <View className="goods_li">
              <Image src={require('@/assets/images/card/4.png')} className="good_img" />
              <View className="good_content">
                <View className="good_name">原味香草泡芙</View>
                <View className="good_desc">泡芙的外壳很酥脆～</View>
                <View className="good_price">¥19.9</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Index as ComponentClass;
