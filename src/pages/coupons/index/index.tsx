import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components';
import { AtModal } from 'taro-ui';
import './style.scss'

interface IProps {
}
interface IState {
  isOpened: boolean
}

class Index extends Component<IProps, IState> {
  state: IState = {
    isOpened:false

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
  handleCancel = () => {
    this.setState({
      isOpened:false
    })
  }
  handleConfirm = () => {
    this.setState({
      isOpened:true
    })
  }
  onHandlePublish = () => {
    this.setState({
      isOpened:true
    })
  }
  render() {
    const { isOpened } =this.state;
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
        <View className="coupons-list">
              <View className="li-item">
                  <View className="content-left">
                      <View className="title">优惠券名称 <Text className="status">审核中</Text></View>
                      <View>使用条件，售价，发行至页面</View>
                      <View><Text className="count">点击量：3787</Text><Text className="count">核销量：369</Text> </View>
                  </View>
                  <View className="content-right">
                      <Text className="btn" onClick={this.onHandlePublish}>取消上架</Text>
                  </View>
              </View>
              <View className="li-item">
                  <View className="content-left">
                      <View className="title">优惠券名称 <Text className="status up">上架</Text></View>
                      <View>使用条件，售价，发行至页面</View>
                      <View><Text className="count">点击量：3787</Text><Text className="count">核销量：369</Text> </View>
                  </View>
                  <View className="content-right">
                      <Text className="btn down">下架</Text>
                  </View>
              </View>
              <View className="li-item">
                  <View className="content-left">
                      <View className="title">优惠券名称 <Text className="status down">下架</Text></View>
                      <View>使用条件，售价，发行至页面</View>
                      <View><Text className="count">点击量：3787</Text><Text className="count">核销量：369</Text> </View>
                  </View>
                  <View className="content-right">
                      <Text className="btn up">上架</Text>
                  </View>
              </View>
              <AtModal
                isOpened={isOpened}
                cancelText='取消'
                confirmText='确认'
                onClose={ this.handleCancel }
                onCancel={ this.handleCancel }
                onConfirm={ this.handleConfirm }
                content='确定取消上架吗？'
              />
        </View>
        <View className="fix_bottom_btn">创建优惠券</View>
      </View>
    )
  }
}

export default Index as ComponentClass;
