import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Text, Image, Picker } from '@tarojs/components';
import { AtTextarea, AtModal, AtList, AtListItem } from 'taro-ui';
import './style.scss'

interface IProps {
}
interface IState {
  current: number,
  activeTabKey: string | number,
  isOpened: boolean,
  text: string,
  dateSel: string,
}

const tabsData = [{ text: '推荐', value: '1' }, { text: '蛋糕', value: '2' }, { text: '点心', value: '3' }, { text: '其他甜点', value: '4' }, { text: '其他甜点', value: '5' }]

class Index extends Component<IProps, IState> {
  state: IState = {
    text: '',
    current: 0,
    activeTabKey: '1',
    isOpened: false,
    dateSel: ''
  }
  config: Config = {
    navigationBarTitleText: '修改商品' || '新增商品',
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {

  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onChangeSwiper = (e) => {
    const currentTarget = e.currentTarget;
    const { current } = currentTarget;
    this.setState({
      current
    })
  }
  handleChangeTextarea = (value) => {
    this.setState({ text: value })
  }
  onChangeTabs = (value) => {
    console.log(value);
    this.setState({
      activeTabKey: value
    })
  }
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
  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }
  handleChange = () => { }
  render() {
    const { activeTabKey, isOpened, text, dateSel } = this.state;
    return (
      <View className='edit-shop'>
        <View className="goods_info">
          <View className="info_li">
            <View className="label">活动名称</View>
            <Input type='text' className="input" placeholder='请输入活动标题，不超过20个字' placeholderClass="placeholderClass" maxLength={20} />
          </View>
          <View className="info_li_allow">
            <View className="label">活动时间</View>
            <Picker mode='date' onChange={this.onDateChange} value={'YYYY-MM-DD'}>
              <View className="allow"><Text className={dateSel?'':'chose_class'}>{dateSel ? dateSel : '请选择'}</Text><Text className="at-icon at-icon-chevron-right store_right" ></Text></View>
            </Picker>
          </View>
          <View className="info_li">
            <View className="label">活动描述</View>
            <AtTextarea value={text} onChange={this.handleChangeTextarea} count={false} placeholder="请填写活动简介、活动详细规则等" className="info-textarea" placeholderClass="placeholderClass" />
          </View>

          <View className="info_li">
            <View className="label">活动海报</View>
            <View className="upload-image">
              <Image src={require('@/assets/images/card/4.png')} className="img" />
              <View className="img-foot">
                <View className="title">点击修改</View>
              </View>
            </View>
          </View>
          <View className="info_li">
            <View className="label">活动海报</View>
            <View className="upload-image">
              <Image src={require('@/assets/images/icon/upload.png')} className="add-img" />
              <View className="add-desc">上传照片</View>
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

        </View>
        <View className="fix_bottom_btn">立即发布</View>
      </View>
    )
  }
}

export default Index as ComponentClass;
