import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Text, Image, Picker,Button } from '@tarojs/components';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtImagePicker } from 'taro-ui';
import { API } from '@/apis';
import './style.scss'

type IProps = {

}
const initState = {
  authsInfo: Taro.getStorageSync('authsInfo') || {},
  isOpened: false,
  Id:0,//商品ID(新增商品此ID为0  修改商品则为商品ID)
	pruname:'',//商品名称
	isups:1,//是否上架 1上架 0不上架
	ezinfo:'',//商品介绍
	tname:'',//商品类型
	pruimg:'',//商品图片
  files: []
}
type IState = typeof initState;
class Index extends Component<IProps, IState> {
  state: IState = {
    ...initState
  }
  config: Config = {
    navigationBarTitleText: '',
  }
  componentDidMount() {
    const { type, id } = this.$router.params;
    if (type === '0') {
      Taro.setNavigationBarTitle({
        title: '新增商品'
      })
    } else {
      Taro.setNavigationBarTitle({
        title: '修改商品'
      })
    }
  }
  getPOSProAddPType = () => {
    const { authsInfo } = this.state;
    API.getPOSProAddPType({
      ...authsInfo,
    }).then(res => {
      const { code,data } = res;
      if (code === '0') {
        console.log(data)
      }
    })
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
  onHandleAdd = () => {
    this.setState({
      isOpened: true
    })
  }
  handleChange = () => { }
  onChangeAtImagePicker = (files) => {
    console.log(files);
    this.setState({
      files
    })
  }
  onHandleSave = () => {
    const { authsInfo,Id,	pruname,ezinfo,	tname,isups,files } = this.state;
    const img = files ? files[0].url:'';
    API.savePOSProductMange({
        ...authsInfo,
        Id,
        pruimg:img,
        pruname,
        ezinfo,
        tname,
        isups
      }).then(res => {
        const { code } = res;
        if (code === '0') {
          Taro.showToast({
            'title': '保存成功',
            'icon': 'success',
          });
        }
      })
  }
  render() {
    const { isOpened, files } = this.state;
    return (
      <View className='edit-shop'>
        <View className="goods_info">
          <View className="info_li">
            <View className="label">商品名称</View>
            <Input type='text' className="input" placeholder='最大输入长度为 10' placeholderClass="placeholderClass" maxLength={10} />
          </View>
          <View className="info_li">
            <View className="label">商品描述</View>
            <Input type='text' className="input" placeholder='最大输入长度为 10' placeholderClass="placeholderClass" maxLength={10} />
          </View>
          <View className="info_li_allow">
            <View className="label">在架状态</View>
            <Picker value={0} mode='selector' range={['上架', '不上架']} onChange={()=>{}}>
              上架<Text className="at-icon at-icon-chevron-right store_right" ></Text>
            </Picker>
          </View>
          <View className="info_li">
            <View className="label">商品类别</View>
            <View className="content">
              <Text className="tag_list active">推荐</Text>
              <Text className="tag_list">其他甜点</Text>
              <Text className="tag_list">其他甜点</Text>
              <Text className="tag_list">巧克力</Text>
              <Text className="tag_list">巧克力s</Text>
              <Text className="add_tag" onClick={this.onHandleAdd}>{`+ 添加分类`}</Text>
            </View>
          </View>
          <View className="info_li">
            <View className="label">商品图片</View>
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
          <AtModal isOpened={isOpened}>
            <AtModalHeader>添加分类</AtModalHeader>
            <AtModalContent>
              <Input type='text' className="input" placeholder='请输入分类名称' placeholderClass="placeholderClass" maxLength={10} />
            </AtModalContent>
            <AtModalAction> <Button>取消</Button> <Button>确定</Button> </AtModalAction>
          </AtModal>
        </View>
        <View className="fix_bottom_btn" onClick={this.onHandleSave}>确认修改</View>
      </View>
    )
  }
}

export default Index as ComponentClass;
