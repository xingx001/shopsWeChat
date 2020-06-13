import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './style.scss'

interface IProps {
}
interface IState {
  isLoggedIn: boolean
}

class Index extends Component<IProps, IState> {
  state: IState = {
    isLoggedIn: true

  }
  config: Config = {
    navigationBarTitleText: '我的'

  }
  //跳转页面
  onJumpPage = (type:'members'|'coupons') => {
    if(type==='members'){
      Taro.navigateTo({
        url: "/pages/users/membersInterests/index"
      })
    }else {
      Taro.navigateTo({
        url: "/pages/users/coupons/index"
      })
    }

  }
  onLogin = () => {
    Taro.getUserInfo({
      success(res) {
        console.log(`getUserInfo 调用成功 ${res.userInfo}`);
      },
      fail(res) {
        console.log(`getUserInfo 调用失败`);
      }
    })
  }
  loginReq =()=>{
    
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  render() {
    const { isLoggedIn } = this.state;
    return (
      <View className='my—wrap'>
        <View className="login-list">
          {isLoggedIn ? (
            <View className="login-box" >
              <Image src={require('@/assets/images/icon/heard.png')} className="heard-img"></Image>
              <Text className="login-btn" onClick={this.onLogin}>立即登录</Text>
            </View>
          ) : (
              <View className="user-inforn">
                <View className="user-left">
                  <Image src={require('@/assets/images/icon/heard.png')} className="heard-img"></Image>
                  <View className="user-li">
                    <View className="vip-inforn">
                      <Text className="user-name">会飞的鱼</Text>
                      <View className="vip-box">
                        <Image src={require('@/assets/images/icon/vipdiamond.png')} className="vip"></Image>
                        <Text className="vip-level">普通会员</Text>
                      </View>
                    </View>
                    <View className="phone-inforn">
                      <Image src={require('@/assets/images/icon/iphone.png')} className="iphone"></Image>
                      <Text className="number">18289786787</Text>
                    </View>

                  </View>
                </View>
                <Text className="at-icon at-icon-chevron-right user-right" ></Text>

              </View>
            )}
        </View>
        <View className="interests-box">
          <View className="interests-li border-right" onClick={()=>this.onJumpPage('coupons')}>
            <Image src={require('@/assets/images/icon/quan.png')} className="interests-icon "></Image>
            <View className="interests-name">优惠券</View>
          </View>
          <View className="interests-li" onClick={()=>this.onJumpPage('members')}>
            <Image src={require('@/assets/images/icon/huiyuanquanyi.png')} className="interests-icon"></Image>
            <View className="interests-name">会员权益</View>
          </View>
        </View>
        <View className="about-box">
          <View className="about-li"><Text className="about-name">联系客服</Text><Text className="at-icon at-icon-chevron-right"></Text></View>
        </View>
        <View className="about-box">
          <View className="about-li"><Text className="about-name">关于我们</Text><Text className="at-icon at-icon-chevron-right"></Text></View>
        </View>
        <View className="about-box">
          <View className="about-li"><Text className="about-name">意见反馈</Text><Text className="at-icon at-icon-chevron-right"></Text></View>
        </View>

      </View>
    )
  }
}

export default Index as ComponentClass;
