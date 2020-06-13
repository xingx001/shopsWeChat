import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames';
import './style.scss'


interface IProps {
  value:string|number,
  data:any[],
  onChange:(value:any)=>any
}
interface IState {
  value:string|number
}

class CouponsList extends Component<IProps,IState> {
  static defaultProps = {
    value:'',
    data:[],
    onChange:()=>{}
  }
  state:IState = {
    value:'1'
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { value } = nextProps;
    if(value!=prevState.value){
      return {
        value
      }
    }else {
      return null
    }
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onSelectTag = (value) => {
    this.setState({
      value
    })
    this.props.onChange(value)
  }
  render() {
    return (
      <View className="coupons_wrap">
          <View className="coupons_li isPass">
              <View className="li_left">
                  <View className="title"><Text className="unit">￥</Text>3</View>
                  <View className="desc">满15元可用</View>
              </View>
              <View className="li_middle">
                  <View className="title">蛋糕满减券</View>
                  <View className="desc">2020/6/1-2020/6/20</View>
              </View>
              <View className="li_right">
                  <View className="btn">立即使用</View>
              </View>
          </View>
          <View className="coupons_more"><Text>没有更多可用券</Text><Text className="split">|</Text><Text className="more">查看已失效的券></Text></View>
      </View>
    )
  }
}

export default CouponsList;
