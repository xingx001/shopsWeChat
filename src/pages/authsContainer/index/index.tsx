import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Input, Button } from '@tarojs/components'
import Loading from '@/components/loading';
import { API } from '@/apis';

import './style.scss'
type PageStateProps = {
  authsInfo: {}
}
type PageDispatchProps = {
  updateAuthsInfo: () => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface AuthsContainer {
  props: IProps;
}
class AuthsContainer extends Component {
  state = {
    shopid: 1,
    userName: "13888888888",
    passWord: "123456"
  }
  /**
  * 指定config的类型声明为: Taro.Config
  *
  * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
  * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
  * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
  */
  config: Config = {
    navigationBarTitleText: '商家登录'
  }
  componentDidMount() {
  }
  onChangeInput = (e,type) => {
    const value = e.target.value;
    switch(type){
      case 'userName':
        this.setState({
          userName:value
        })
        break;
      default:
        this.setState({
          passWord:value
        })
    }
  }
  //登录
  onLogin = () => {
    const { shopid,userName,passWord } = this.state;
    API.getPossigin({
      uname: userName,
      pwd: passWord
    }).then(result => {
      const { data, status, msg } = result;
      if (status == 0){
        Taro.setStorageSync('authsInfo', {
          shopid: shopid,
          uid: data
        });
        Taro.redirectTo({
          url: "/pages/home/index/index"
        })
      }else{
        Taro.showToast({
          'title': '账号或者密码错误',
          'icon': 'none',
        });
      }
    })

  }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }
  render() {
    const { userName, passWord } = this.state;
    return (
      <View className='auths'>
        {/* <Loading fullPage /> */}
        <View className="logo">
          <Image src={require('@/assets/images/icon/logo.png')} className="logo_icon" />
        </View>
        <View className="login_wrap">
          <View className="login_list">
            <Image src={require('@/assets/images/icon/zhanghao.png')} className="account" />
            <Input type='number' className="input"  onInput={(e)=>this.onChangeInput(e,'userName')} value={userName} placeholder='请输入账号' placeholderClass="placeholderClass" maxLength={11} placeholderStyle="color: rgba(185, 185, 185, 1);" />
          </View>
          <View className="login_list">
            <Image src={require('@/assets/images/icon/mima.png')} className="password" />
            <Input type='number' className="input" onInput={(e)=>this.onChangeInput(e,'passWord')} value={passWord} placeholder='请输入密码' placeholderClass="placeholderClass" maxLength={11} placeholderStyle="color: rgba(185, 185, 185, 1);" />
          </View>
        </View>
        <View className="login_btn" onClick={this.onLogin}>登录</View>
        <Image src={require('@/assets/images/icon/bj.png')} className="bg" />
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

export default AuthsContainer as ComponentClass<PageOwnProps, PageState>
