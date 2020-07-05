import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Textarea } from '@tarojs/components'
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
        <View className="interests-ul ">
          <View className="interests-li">
            <Text className="interests-tit">标题</Text>
            <View className="interests-input">
              <Input type='number' className="input" placeholder='不超过15个字' placeholderClass="placeholderClass" maxLength={15} />
            </View>
          </View>
        </View>
        <View className="interests-ul content_box">
          <View className="interests-li boder_bottom">
            <Text className="interests-tit">类型</Text>
            <View className="interests-input">
              <Input type='number' className="input" placeholder='请输入类型' placeholderClass="placeholderClass" maxLength={15} />
            </View>
          </View>
          <View className="interests-li boder_bottom">
            <Text className="interests-tit">编号</Text>
            <View className="interests-input">
              <Input type='number' className="input" placeholder='请输入编号' placeholderClass="placeholderClass" maxLength={15} />
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
        <View className="add_btn btn">
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
