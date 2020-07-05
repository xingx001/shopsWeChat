import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Input } from '@tarojs/components'
import { AtTextarea, AtIcon } from 'taro-ui'
import { API } from '@/apis';
import Http from '@/utils/https';

import './style.scss'
type IProps = {

}
const initState = {
  authsInfo: Taro.getStorageSync('authsInfo') || {},
  Id: '',
  text: '',
  sname: '',//店铺名称
  scon: '',//店铺简介
  imgs: []
}
type IState = typeof initState;
class Index extends Component<IProps, IState> {
  state: IState = {
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
    navigationBarTitleText: '门店信息'
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    this.getPOSShopInfoPage();
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  getPOSShopInfoPage = () => {
    const { authsInfo } = this.state;
    API.getPOSShopInfoPage({
      ...authsInfo,
    }).then(res => {
      const { code, data } = res;
      if (code === '0') {
        const { Id, ShopFullName, ShopContent, Imgs } = data;
        this.setState({
          Id,
          sname: ShopFullName,
          scon: ShopContent,
          imgs: Imgs.map(item => item.ImgUrl)
        })
      }
    })
  }
  handleChangeTextarea = (value) => {
    this.setState({ sname: value })
  }
  savePOSShopInfo = () => {
    const { Id, authsInfo, sname, scon, imgs } = this.state;
    API.savePOSShopInfo({
      ...authsInfo,
      Id,
      sname,
      scon,
      imgs: imgs.join(',')
    }).then(res => {
      const { code } = res;
      if (code === '0') {
        Taro.showToast({
          'title': '保存成功',
          'icon': 'success',
        });
        setTimeout(()=>{
          Taro.navigateBack({
            delta: 1
          })
        },2000)
      }
    })
  }
  onChangeInput = (e) => {
    const value = e.target.value;
    this.setState({
      sname: value
    })
  }
  onDeleteImg = (index) => {
    const { imgs } = this.state;
    Taro.showModal({
      title: '',
      content: '确定删除该图片吗？',
      cancelText: '取消',
      confirmText: '确认',
      confirmColor: '#F5A623',
      success: (res) => {
        if (res.confirm) {
          imgs.splice(index, 1)
          this.setState({
            imgs
          })
        }
      }
    })
  }
  onChooseImage = () => {
    Taro.chooseImage({
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        Http.ossUpload(tempFilePaths[0]).then(res => {
          const { data, statusCode } = res;
          if (statusCode == 200) {
            this.setState({
              imgs: [data, ...this.state.imgs]
            });
          }
        })
      }
    })
  }
  render() {
    const { sname, scon, imgs } = this.state;
    return (
      <View className='storesinform-box'>
        <View className="'inform-li inform-tit">
          <View className="store-msg">门店名称</View>
          <Input type='text' value={sname} onInput={this.onChangeInput} className="input" placeholder='请输入活动标题，不超过20个字' placeholderClass="placeholderClass" maxLength={20} />
        </View>
        <View className="'inform-li">
          <View className="introduction-box">
            <View>门店简介</View>
            <AtTextarea value={scon} onChange={this.handleChangeTextarea} placeholder="请输入门店介绍" autoFocus maxLength={50} className="introd-textarea" />
          </View>
        </View>
        <View className="'inform-li">
          <View>门店大图<Text className="msg">门店菜品轮播图</Text></View>
          <View className="stores-images">
            <View className="img-list">
              <View className="on-upload" onClick={this.onChooseImage}>
                <Image src={require('@/assets/images/icon/upload.png')} className="add-icon" />
                <Text className="upload-msg">上传视频或照片</Text>
              </View>
            </View>
            {
              imgs.map((item, index) => (
                <View className="img-list" key={'img' + index}>
                  <View className="imgs-li">
                    <Image src={item} className="shop_img" />
                    <View className="delect-btn" onClick={() => this.onDeleteImg(index)}>
                      <AtIcon value='trash' size='18' color='rgba(255, 255, 255, 1)' className="icon-del"></AtIcon>
                    </View>
                  </View>
                </View>

              ))
            }
          </View>
        </View>
        <View className="save_btn" onClick={this.savePOSShopInfo}>保存</View>
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
