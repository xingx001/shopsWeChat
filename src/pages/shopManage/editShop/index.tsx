import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input,Text,Image } from '@tarojs/components';
import { AtModal} from 'taro-ui';
import './style.scss'

interface IProps {
}
interface IState {
  current: number,
  activeTabKey:string|number,
  isOpened:boolean
}

const tabsData =[{text:'推荐',value:'1'},{text:'蛋糕',value:'2'},{text:'点心',value:'3'},{text:'其他甜点',value:'4'},{text:'其他甜点',value:'5'}]

class Index extends Component<IProps, IState> {
  state: IState = {
    current: 0,
    activeTabKey:'1',
    isOpened:false
  }
  config: Config = {
    navigationBarTitleText: '修改商品'||'新增商品',
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
  onChangeTabs = (value) => {
    console.log(value);
    this.setState({
      activeTabKey:value
    })
  }
  handleCancel = () => {
    this.setState({
      isOpened:false
    })
  }
  handleConfirm = () => {
    this.setState({
      isOpened:true
    })
  }
  onDeleteShop = () => {
    this.setState({
      isOpened:true
    })
  }
  handleChange = () => {}
  render() {
    const { activeTabKey,isOpened } = this.state;
    return (
      <View className='edit-shop'>
        <View className="goods_info">
          <View className="info_li">
            <View className="label">商品名称</View>
            <Input type='text' className="input" placeholder='最大输入长度为 10' placeholderClass="placeholderClass" maxLength={10}/>
          </View>
          <View className="info_li">
            <View className="label">商品描述</View>
            <Input type='text' className="input" placeholder='最大输入长度为 10' placeholderClass="placeholderClass" maxLength={10}/>
          </View>
          <View className="info_li_allow">
            <View className="label">在架状态</View>
            <View className="allow">上架<Text className="at-icon at-icon-chevron-right store_right" ></Text></View>
          </View>
          <View className="info_li">
            <View className="label">商品类别</View>
            <View className="content">
                <Text className="tag_list active">推荐</Text>
                <Text className="tag_list">其他甜点</Text>
                <Text className="tag_list">其他甜点</Text>
                <Text className="tag_list">巧克力</Text>
                <Text className="tag_list">巧克力s</Text>
                <Text className="add_tag">{`+ 添加分类`}</Text>
            </View>
          </View>
          <View className="info_li">
            <View className="label">商品图片</View>
            <View className="upload-image">
              <Image src={require('@/assets/images/card/4.png')} className="img" />
              <View className="img-foot">
                <View className="title">点击修改</View>
              </View>
            </View>
          </View>
          <View className="info_li">
            <View className="label">商品图片</View>
            <View className="upload-image">
                  <Image src={require('@/assets/images/icon/upload.png')} className="add-img" />
                  <View className="add-desc">上传照片</View>
            </View>
          </View>
          <AtModal
            isOpened={isOpened}
            cancelText='取消'
            confirmText='确认'
            onClose={ this.handleCancel }
            onCancel={ this.handleCancel }
            onConfirm={ this.handleConfirm }
            content='确定删除该商品吗？'
          />

        </View>
        <View className="fix_bottom_btn">确认修改</View>
      </View>
    )
  }
}

export default Index as ComponentClass;