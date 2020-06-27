import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components';
import { AtModal } from 'taro-ui';
import './style.scss'
import { API } from '@/apis';

interface IProps {
}
interface IState {
  isOpened: boolean,
  authsInfo: any,
  ShopCardList: any,
  SumBuyCount: Number,
  SumOutCount: Number,
  toastMsg:String
}

class Index extends Component<IProps, IState> {
  state: IState = {
    isOpened: false,
    authsInfo: Taro.getStorageSync('authsInfo') || {},
    ShopCardList: [],
    SumBuyCount: null,
    SumOutCount: null,
    toastMsg:''


  }
  config: Config = {
    navigationBarTitleText: '优惠券'
  }
  handleChange = value => {
  }

  componentWillReceiveProps(nextProps) {
  }
  componentDidMount() {//dom加载好的时候
    this.getDataReq()
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
  onHandlePublish = (e) => {
    this.setState({
      isOpened: true,
      toastMsg:e
    })
  }
  onHandleAdd = () => {
    Taro.navigateTo({
      url: "/pages/coupons/editCoupons/index?type=0&id="
    })
  }
  getDataReq() {
    const { authsInfo } = this.state;
    API.getPOSShopCardPage(authsInfo).then(res => {
      const { code, msg, data } = res;
      if (code === '0') {
        let { ShopCardList, SumBuyCount, SumOutCount } = data;
        this.setState({
          ShopCardList,
          SumBuyCount,
          SumOutCount
        })
      } else {
      }

    })
  }
  render() {
    const { toastMsg,isOpened,ShopCardList, SumBuyCount, SumOutCount } = this.state;
    return (
      <View className="coupons">
        <View className="coupons-header">
          <View className="header-item">
            <View className="title">{SumOutCount}</View>
            <View className="subtitle">总领用量</View>
          </View>
          <View className="header-item">
            <View className="title">{SumBuyCount}</View>
            <View className="subtitle">总领用量</View>
          </View>
        </View>
        <View className="coupons-list">
        {ShopCardList.map((item,index)=>
        
          <View className="li-item" key={item.Id}>
            <View className="content-left">
              <View className="title">{item.scname}
              {item.estate==1&&
                <Text className="status" >审核中</Text>
              }
                {item.cardstate==1&&item.estate!=1&&
               <Text className="status up">上架</Text>
              }
              {item.cardstate==2&&item.estate!=1&&
               <Text className="status down">下架</Text>
              }
               </View>
              {item.limit==0?
                <View>无门槛</View>:<View>满{item.limit}元订单才可使用</View>
              }
              
            <View><Text className="count">领取量：{item.outcount}</Text><Text className="count">使用量：{item.buycount}</Text> </View>
            </View>
            <View className="content-right">
            {item.estate==1&&
              <Text className="btn" onClick={()=>this.onHandlePublish('取消上架')}>取消上架</Text>}
              {item.estate!=1&&item.cardstate!=2&&
              <Text className="btn down" onClick={()=>this.onHandlePublish('下架')}>下架</Text>}
               {item.estate!=1&&item.cardstate==2&&
              <Text className="btn up" onClick={()=>this.onHandlePublish('上架')}>上架</Text>}
             
  
            </View>
          </View>
          )}
          {/* <View className="li-item">
            <View className="content-left">
              <View className="title">优惠券名称 <Text className="status up">上架</Text></View>
              <View>使用条件，售价，发行至页面</View>
              <View><Text className="count">点击量：3787</Text><Text className="count">核销量：369</Text> </View>
            </View>
            <View className="content-right">
              <Text className="btn down">下架</Text>
            </View>
          </View>
          <View className="li-item">
            <View className="content-left">
              <View className="title">优惠券名称 <Text className="status down">下架</Text></View>
              <View>使用条件，售价，发行至页面</View>
              <View><Text className="count">点击量：3787</Text><Text className="count">核销量：369</Text> </View>
            </View>
            <View className="content-right">
              <Text className="btn up">上架</Text>
            </View>
          </View> */}
          <AtModal
            isOpened={isOpened}
            cancelText='取消'
            confirmText='确认'
            onClose={this.handleCancel}
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
            content={`确定${toastMsg}吗？`}
          />
        </View>
        <View className="fix_bottom_btn" onClick={this.onHandleAdd}>创建优惠券</View>
      </View>
    )
  }
}

export default Index as ComponentClass;
