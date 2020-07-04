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
  toastMsg: String,
  id: Number,
  cardstate: Number

}

class Index extends Component<IProps, IState> {
  state: IState = {
    isOpened: false,
    authsInfo: Taro.getStorageSync('authsInfo') || {},
    ShopCardList: [],
    SumBuyCount: null,
    SumOutCount: null,
    toastMsg: '',
    id: null,
    cardstate: null


  }
  config: Config = {
    navigationBarTitleText: '优惠券'
  }
  handleChange = value => {
  }

  componentWillReceiveProps(nextProps) {
  }
  componentDidMount() {//dom加载好的时候

  }
  componentWillUnmount() { }

  componentDidShow() {
    this.getDataReq()
  }

  componentDidHide() { }
  handleConfirm = (id,ste) => {
    const { authsInfo } = this.state;
    API.POSShopCardState({ ...authsInfo, scid: id, ste }).then(res => {
      Taro.showToast({
        title: '操作成功',
        icon: 'success'
      })
      this.setState({
        isOpened: false
      })
      this.getDataReq()

    })
  }
  onHandlePublish = (title, id, state) => {
    Taro.showModal({
      title:'',
      content:'确定'+title+'吗？',
      cancelText:'取消',
      confirmText:'确认',
      confirmColor:'#F5A623',
      success:(res)=>{
        if(res.confirm){
          this.handleConfirm(id, state);
        }
      }
    })
  }
  onHandleAdd = (type=0,id='') => {
    Taro.navigateTo({
      url: "/pages/coupons/editCoupons/index?type="+type+"&id="+id
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
      }
    })
  }
  render() {
    const { toastMsg, isOpened, ShopCardList, SumBuyCount, SumOutCount } = this.state;
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
          {ShopCardList.map((item, index) =>

            <View className="li-item" key={item.Id}>
              <View className="content-left">
                <View className="title">
                  {item.scname}
                  {
                    item.estate == 1 && <Text className="status">审核中</Text>
                  }
                  {
                    item.estate == 3 && <Text className="status down">审核失败</Text>
                  }

                  {
                    item.estate == 2 && item.cardstate == 1 &&
                    <Text className="status up">上架</Text>
                  }
                  {item.estate == 2 && item.cardstate == 2 &&
                    <Text className="status down">下架</Text>
                  }
                  {item.estate == 2 && item.cardstate == 3 &&
                    <Text className="status down">售馨</Text>
                  }
                </View>
                {
                 item.limit == 0 ?
                  <View>无门槛</View> : <View>满{item.limit}元订单才可使用</View>
                 }
                <View><Text className="count">领取量：{item.outcount}</Text><Text className="count">使用量：{item.buycount}</Text> </View>
              </View>
              <View className="content-right">
                {item.cardstate == 2 &&(item.estate == 1||item.estate == 3) &&
                  <Text className="btn" onClick={() => this.onHandlePublish('取消上架', item.Id, 0)}>取消上架</Text>}
                { item.cardstate == 2 && item.estate == 1&&
                  <Text className="btn down" onClick={() => this.onHandlePublish('下架', item.Id, 2)}>下架</Text>}
                { item.cardstate == 2&&item.estate != 1&&
                  <Text className="btn up" onClick={() => this.onHandleAdd(1,item.Id)}>上架</Text>}
              </View>
            </View>
          )}
        </View>
        <View className="fix_bottom_btn" onClick={()=>this.onHandleAdd}>创建优惠券</View>
      </View>
    )
  }
}

export default Index as ComponentClass;
