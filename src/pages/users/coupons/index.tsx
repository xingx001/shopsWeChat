import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import CouponsList from './components/couponsList';
import './style.scss'

interface IProps {
}
interface IState {
  current:number
}

class Index extends Component<IProps, IState> {
  state: IState = {
    current: 0,

  }
  config: Config = {
    navigationBarTitleText: '优惠券'
  }

  handleClick = value => {
    this.setState({
      current: value
    })
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
    const tabList = [{ title: '全部(3)' }, { title: '满减券(2)' }, { title: '抵扣券(1)' }]
    return (
      <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
            <CouponsList/>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
            <CouponsList/>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
             <CouponsList/>
        </AtTabsPane>
      </AtTabs>
    )
  }
}

export default Index as ComponentClass;
