import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
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
    shopid:1
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
  componentDidMount() {
    const { shopid } = this.state;
    Taro.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          API.logout({
            code:res.code,
            shopid:shopid
          }).then(result=>{
            const {data,status,msg} = result;
            if(status==='0')
            Taro.setStorageSync('authsInfo', {
              shopid:shopid,
              uid:data
            });
            Taro.switchTab({
              url: "/pages/home/index/index"
            })
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
  render() {
    return (
      <View className='auths'>
          <Loading fullPage/>
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
