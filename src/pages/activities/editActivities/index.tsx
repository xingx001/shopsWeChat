import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Text, Image, Picker } from '@tarojs/components';
import { AtModal, AtImagePicker } from 'taro-ui';
import './style.scss'

type IProps = {

}
const initState = {
  authsInfo: Taro.getStorageSync('authsInfo') || {},
  isOpened: false,
  files: []
}
type IState = typeof initState;
class Index extends Component<IProps, IState> {
  state: IState = {
    ...initState
  }
  config: Config = {
    navigationBarTitleText: '活动',
  }
  componentDidMount() {
    const { type, id } = this.$router.params;
    if (type === '0') {
      Taro.setNavigationBarTitle({
        title: '发布活动'
      })
    } else {
      Taro.setNavigationBarTitle({
        title: '修改活动'
      })
    }
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onChangePicker = () => {

  }
  handleChange = () => { }
  onChangeAtImagePicker = (files) => {
    this.setState({
      files
    })
  }
  render() {
    const { files } = this.state;
    return (
      <View className='edit-shop'>
        <View className="goods_info">
          <View className="info_li">
            <View className="label">活动名称</View>
            <Input type='text' className="input" placeholder='请输入活动标题，不超过20个字' placeholderClass="placeholderClass" maxLength={20} />
          </View>
          <View className="info_li_allow">
            <View className="label">活动时间</View>
            <Picker value={0} mode='selector' range={['上架', '下架']} onChange={this.onChangePicker}>
              请选择<Text className="at-icon at-icon-chevron-right store_right" ></Text>
            </Picker>
          </View>
          <View className="info_li">
            <View className="label">活动简介</View>
            <Input type='text' className="input" placeholder='请填写活动简介、活动详细规则等' placeholderClass="placeholderClass" maxLength={200} />
          </View>

          <View className="info_li">
            <View className="label">活动海报</View>
            {
              files.length ? (<View className="upload-image">
                <Image src={files[0].url} className="img" />
                <View className="img-foot">
                  <View className="title">
                    点击修改
                  </View>
                  <AtImagePicker
                      className="upload-image-picker"
                      multiple={false}
                      length={1}
                      mode='top'
                      files={[]}
                      onChange={this.onChangeAtImagePicker}
                    />
                </View>
              </View>
              ) : (
                  <View className="upload-image">
                    <Image src={require('@/assets/images/icon/upload.png')} className="add-img" />
                    <View className="add-desc">上传照片</View>
                    <AtImagePicker
                      className="upload-image-picker"
                      multiple={false}
                      length={1}
                      mode='top'
                      files={files}
                      onChange={this.onChangeAtImagePicker}
                    />
                  </View>

                )
            }
          </View>
        </View>
        <View className="fix_bottom_btn">立即发布</View>
      </View>
    )
  }
}

export default Index as ComponentClass;
