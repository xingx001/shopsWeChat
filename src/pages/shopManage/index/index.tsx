import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components';
import Tags from '@/components/tags';
import { AtIcon,AtModal } from 'taro-ui';
import './style.scss'

interface IProps {
}
interface IState {
  current: number,
  activeTabKey:string|number,
  isOpened:boolean
}

const tabsData =[{text:'推荐',value:'1'},{text:'蛋糕',value:'2'},{text:'点心',value:'3'},{text:'其他甜点',value:'4'}]

class Index extends Component<IProps, IState> {
  state: IState = {
    current: 0,
    activeTabKey:'1',
    isOpened:false
  }
  config: Config = {
    navigationBarTitleText: '商品管理',
    // navigationStyle:'custom',
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
  onHandleAdd = () => {
    Taro.navigateTo({
      url: "/pages/shopManage/editShop/index?type=0&id="
    })
  }
  render() {
    const { activeTabKey,isOpened } = this.state;
    return (
      <View className='shop-index'>
        <View className="goods_tabs"><Tags value={activeTabKey} data={tabsData} onChange={this.onChangeTabs}/></View>
        <View className="goods_info">
          <View className="goods_ul">
            <View className="goods_li">
              <Image src={require('@/assets/images/card/4.png')} className="good_img">
                <View className="delect-btn" onClick={()=>this.onDeleteShop()}>
                  <AtIcon value='trash' size='18' color='rgba(255, 255, 255, 1)' className="icon-del"></AtIcon>
                </View>
              </Image>
              <View className="good_content">
                <View className="good_name">原味香草泡芙</View>
                <View className="good_desc">泡芙的外壳很酥脆～</View>
                <View className="good_price">¥19.9</View>

              </View>

            </View>
            <View className="goods_li">
              <Image src={require('@/assets/images/card/4.png')} className="good_img" />
              <View className="good_content">
                <View className="good_name">原味香草泡芙</View>
                <View className="good_desc">泡芙的外壳很酥脆～</View>
                <View className="good_price">¥19.9</View>
              </View>
            </View>
            <View className="goods_li">
              <Image src={require('@/assets/images/card/4.png')} className="good_img" />
              <View className="good_content">
                <View className="good_name">原味香草泡芙</View>
                <View className="good_desc">泡芙的外壳很酥脆～</View>
                <View className="good_price">¥19.9</View>
              </View>
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
        <View className="fix_bottom_btn" onClick={this.onHandleAdd}>新增商品</View>
      </View>
    )
  }
}

export default Index as ComponentClass;
