import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import './style.scss'

interface IProps {
}
interface IState {
}

class Index extends Component<IProps, IState> {
  state: IState = {

  }
  config: Config = {
    navigationBarTitleText: '会员权益'
  }

  handleChange = value => {
    this.setState({ value })
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
    return (
      <View className='interests-wrap'>
        <Text className="interests-commentary">会员权益说明</Text>
        <View className="interests-li">
          <Text className="interests-tit">会员分级</Text>
          <View className="interests-introduce">
            <Text>1.凡在连锁店内一次性消费实付金额满5000元即可申请办理普卡一张；</Text>
            <Text>2.凡在连锁店内一次性消费实付金额满20000元或累计消费金额满50000元者即可申请办理银卡一张； </Text>
            <Text>3.凡在连锁店内一次性消费实付金额满50000元或累计消费金额满100000元者即可申请办理金卡一张；</Text>
            <Text>4.凡在连锁店内一次性消费实付金额满100000元或累计消费金额满500000元者即可申请办理宝石卡一张。 </Text>
          </View>
        </View>
        <View className="interests-li">
          <Text className="interests-tit">会员申办条件</Text>
          <View className="interests-introduce">
            <Text>1.会员需认真完整填写个人信息，填写信息将录入本司系统，作为二次消费积分、年底积分兑换等使用，信息需真实有效；</Text>
            <Text> 2.办卡当日消费金额，即可进入积分累计。 </Text>
          </View>
        </View>




      </View>
    )
  }
}

export default Index as ComponentClass;
