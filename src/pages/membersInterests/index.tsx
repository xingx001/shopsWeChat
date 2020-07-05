import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Textarea } from '@tarojs/components'
import { API } from '@/apis';

import './style.scss'

interface IProps {
}
const initState = {
  authsInfo: Taro.getStorageSync('authsInfo') || {},
  detailData: [],
  title:'',
  ctype:'',
  num:''

}
type IState = typeof initState;
class Index extends Component<IProps, IState> {
  state: IState = {
    ...initState
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
    this.getDetailReq()

  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  //新增权益
  addEquity(){

  }
  //获取会员权益内容
  getDetailReq() {
    const { authsInfo } = this.state
    API.getShopEquity(authsInfo).then(res => {
      const { code, msg, data } = res;
      if (code == '0') {
        this.setState({
          detailData: data.svcList
        })
      }
    })
  }
  render() {
    const {title,ctype,num} = this.state;
    return (
      <View className='interests-wrap'>
        <View className="interests-ul ">
          <View className="interests-li">
            <Text className="interests-tit">标题</Text>
            <View className="interests-input">
              <Input type='number' className="input" value={title} onInput={this.handleChange.bind(this, 'title')} placeholder='不超过15个字' placeholderClass="placeholderClass" maxLength={15} />
            </View>
          </View>
        </View>
        <View className="interests-ul content_box">
          <View className="interests-li boder_bottom">
            <Text className="interests-tit">类型</Text>
            <View className="interests-input">
              <Input type='text' className="input" value={ctype}  onInput={this.handleChange.bind(this, 'ctype')} placeholder='请输入类型' placeholderClass="placeholderClass" maxLength={15} />
            </View>
          </View>
          <View className="interests-li boder_bottom">
            <Text className="interests-tit">编号</Text>
            <View className="interests-input">
              <Input type='number' className="input" value={num} onInput={this.handleChange.bind(this, 'num')} placeholder='请输入编号' placeholderClass="placeholderClass" maxLength={15} />
            </View>
          </View>
          <View className=" interests-content">
            <Text className="interests-tit">内容</Text>
            <View className="interests-input">
              <Textarea placeholder='请输入会员权益具体内容' placeholderClass="placeholderClass" />
            </View>
          </View>
        </View>
        <View className="btn_wrap">
          <View className="add_btn btn" onClick={()=>addEquity()}>
            新增
          </View>
          <View className="save_btn btn">
            提交
        </View>
        </View>
      </View>
    )
  }
}

export default Index as ComponentClass;
