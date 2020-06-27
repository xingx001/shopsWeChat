import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components';
import Tags from '@/components/tags';
import { AtIcon,AtModal,AtMessage } from 'taro-ui';
import './style.scss'
import { API } from '@/apis';
interface IProps {
}
interface IState {
  current: number,
  activeTabKey:string|number,
  isOpened:boolean,
  authsInfo:any,
  proList:any,
  proTypeList:any,
  pid:string

}
class Index extends Component<IProps, IState> {
  state: IState = {
    authsInfo: Taro.getStorageSync('authsInfo') || {},
    current: 0,
    activeTabKey:'推荐',
    isOpened:false,
    proList:[],
    proTypeList:[],
    pid:''
  }
  config: Config = {
    navigationBarTitleText: '商品管理',
    // navigationStyle:'custom',
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    this.getShopDataReq();
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() {

  }
  getShopDataReq() {
    const { authsInfo,activeTabKey } = this.state;
    API.getPOSProManagePage({...authsInfo,ptype:activeTabKey}).then(res => {
      const { code, msg, data } = res;
      if (code === '0') {
        const {proList,proTypeList} = data;
        this.setState({
          proList,
          proTypeList
        })

      } else {
      }

    })
  }
  onChangeSwiper = (e) => {
    const currentTarget = e.currentTarget;
    const { current } = currentTarget;
    this.setState({
      current
    })
  }
  onChangeTabs = (value) => {
    this.setState({
      activeTabKey:value
    },this.getShopDataReq)
  }
  handleCancel = () => {
    this.setState({
      isOpened:false,
      pid:''
    })
  }
  handleConfirm = () => {
    const {pid,authsInfo} = this.state;
    API.deletePOSDelProduct({...authsInfo,pid}).then(res=>{
      const { code } =res;
      if(code==0){
        this.setState({
          isOpened:true,
          pid:''
        },this.getShopDataReq);
        Taro.atMessage({
          'message': '删除成功',
          'type': 'success',
        })
      }
    })
  }
  onDeleteShop = (pid) => {
    this.setState({
      isOpened:true,
      pid
    })
  }
  onHandleAdd = () => {
    Taro.navigateTo({
      url: "/pages/shopManage/editShop/index?type=0&id="
    })
  }
  render() {
    const {activeTabKey,isOpened ,proList,proTypeList} = this.state;
    const tabsData = proTypeList.map((item,index) => {
      return { text: item.ProTypeName, value: item.ProTypeName }
    })
    return (
      <View className='shop-index'>
        <View className="goods_tabs"><Tags value={activeTabKey} data={tabsData} onChange={this.onChangeTabs}/></View>
        <View className="goods_info">
          <View className="goods_ul">
          {
            proList.map(item=>
            <View className="goods_li" key={item.Id}>
              <Image src={item.Pru_Img} className="good_img">
                <View className="delect-btn" onClick={()=>this.onDeleteShop(item.Id)}>
                  <AtIcon value='trash' size='18' color='rgba(255, 255, 255, 1)' className="icon-del"></AtIcon>
                </View>
              </Image>
              <View className="good_content">
            <View className="good_name">{item.Pru_Name}</View>
            <View className="good_desc">{item.EzInfo}</View>
            <View className="good_price">¥{item.Pru_Money}</View>
              </View>
            </View>
            )
          }
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
