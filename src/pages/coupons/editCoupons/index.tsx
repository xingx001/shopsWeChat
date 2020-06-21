import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Text, Textarea, Picker, Image } from '@tarojs/components';
import { AtModal, AtTextarea } from 'taro-ui';
import './style.scss'

interface IProps {
}
interface IState {
  isOpened: boolean,
  radioType: Number
}

class EditCoupons extends Component<IProps, IState> {
  state: IState = {
    isOpened: false,
    radioType: 1
  }
  config: Config = {
    navigationBarTitleText: '创建优惠券',
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {

  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  handleCancel = () => {
    this.setState({
      isOpened: false
    })
  }
  handleConfirm = () => {
    this.setState({
      isOpened: true
    })
  }
  onDeleteShop = () => {
    this.setState({
      isOpened: true
    })
  }
  onChangeRadio = (e) => {
    this.setState({
      radioType: e
    })
  }
  onChangePicker = () => {

  }
  handleChange = () => { }
  onHandleAdd = () => {

  }
  render() {
    const { isOpened, radioType } = this.state;
    return (
      <View className='edit-coupons'>
        <View className="title">基本信息</View>
        <View className="goods_info">
          <View className="info_li">
            <View className="label">优惠券名称</View>
            <Input type='text' className="input" placeholder='如：8.8折券，最多15个字' placeholderClass="placeholderClass" maxLength={15} />
          </View>
          <View className="info_li_allow">
            <View className="label">优惠券类型</View>
            <View className="allow">
              <Picker value={0} mode='selector' range={['上架', '下架']} onChange={this.onChangePicker}>
                <Text className="">请选择</Text> <Text className="at-icon at-icon-chevron-right store_right" ></Text>
              </Picker>
            </View>
          </View>
          <View className="info_li_allow">
            <View className="label">使用条件</View>
            <View className="allow conditions_box">
              <View className="conditions_li" onClick={() => this.onChangeRadio(1)}>
                <Image src={radioType == 1 ? require('@/assets/images/icon/select.png') : require('@/assets/images/icon/noselect.png')} className="icon" />
                <Text className="desc">无使用门槛</Text>
              </View>
              <View className="conditions_li" onClick={() => this.onChangeRadio(2)}>
                <Image src={radioType == 2 ? require('@/assets/images/icon/select.png') : require('@/assets/images/icon/noselect.png')} className="icon" />
                <View className="desc desc_input">订单满<Input type='text' className="input_desc" placeholder='' placeholderClass="placeholderClass" maxLength={15} />元</View>
              </View>
            </View>
          </View>
          <View className="info_li">
            <View className="label">优惠券描述</View>
            <Textarea className="input_area" autoHeight placeholder='请输入' placeholderClass="placeholderClass" />
          </View>
        </View>
        <View className="title">上架信息</View>
        <View className="goods_info">
          <View className="info_li_allow">
            <View className="label">立即上架</View>
            <View className="allow">
              <Picker value={0} mode='selector' range={['上架', '下架']} onChange={this.onChangePicker}>
                上架<Text className="at-icon at-icon-chevron-right store_right" ></Text>
              </Picker>
            </View>
          </View>
          <View className="info_li_allow">
            <View className="label">售价</View>
            <Input type='number' className="input" placeholder='请输入金额' placeholderClass="placeholderClass" maxLength={15} />
            <View className="allow">元</View>
          </View>
          <View className="info_li_allow">
            <View className="label">发放总量</View>
            <Input type='number' className="input" placeholder='请输入整数' placeholderClass="placeholderClass" maxLength={15} />
            <View className="allow">张</View>
          </View>
          <View className="info_li_allow">
            <View className="label">使用时间段</View>
            <View className="allow">
              <Picker mode='date' value={''} onChange={this.onChangePicker}>
                请选择<Text className="at-icon at-icon-chevron-right store_right" ></Text>
              </Picker>
            </View>
          </View>
          <View className="info_li_allow">
            <View className="label">发行至页面</View>
            <View className="allow">
              <Picker value={0} mode='selector' range={['上架', '下架']} onChange={this.onChangePicker}>
                请选择<Text className="at-icon at-icon-chevron-right store_right" ></Text>
              </Picker>
            </View>
          </View>
        </View>
        <AtModal
          isOpened={isOpened}
          cancelText='取消'
          confirmText='确认'
          onClose={this.handleCancel}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          content='确定删除该商品吗？'
        />
        <View className="fix_bottom_btn" onClick={this.onHandleAdd}>立即创建</View>
      </View>
    )
  }
}

export default EditCoupons as ComponentClass;
