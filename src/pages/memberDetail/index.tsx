import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { API } from '@/apis';
import './style.scss'

type IProps = {

}
const initState = {
  authsInfo: Taro.getStorageSync('authsInfo') || {},
  detailData: []
}
type IState = typeof initState;
class Index extends Component<IProps,IState> {
  state:IState = {
    ...initState
  }
  /**
  * 指定config的类型声明为: Taro.Config
  *
  * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
  * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
  * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
  */
  config: Config = {
    navigationBarTitleText: '会员明细'
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    this.getDetailReq()
  }
  getDetailReq() {
    const { authsInfo } = this.state
    API.getPOSShopVipPage(authsInfo).then(res => {
      const { code, msg, data } = res;
      if (code == '0') {
        this.setState({
          detailData: data
        })
      }
    })
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  render() {
    const { detailData } = this.state;
    return (
      <View className='detail_wrap'>
        {
          detailData.map((item) =>
            <View className="detail_li" key={item.User_ID}>
              <View className="detail_left">
                <Image src={item.Userimg} className="heard_img" />
                <View className="detail_inforn">
                  <View className="member_name">{item.Username}</View>
                  <View>手机号：{item.Phone}</View>
                </View>
              </View>
              <View className="detail_right">2019/10/01 14:54:23</View>
            </View>
          )
        }

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

export default Index as ComponentClass
