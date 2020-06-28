import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtMessage,AtModal } from 'taro-ui';
import { API } from '@/apis'
import './style.scss'

type IProps = {

}
const initState = {
  authsInfo: Taro.getStorageSync('authsInfo') || {},
  listData: [],
  isOpened:false,
  id:''

}
type IState = typeof initState;
class Index extends Component<IProps,IState> {
  state:IState = {
    ...initState
  }
  config: Config = {
    navigationBarTitleText: '活动'
  }
  handleChange = value => {
  }

  componentWillReceiveProps(nextProps) {
  }
  componentDidMount() {
    this.getPOSShopTaskManagePage();
  }
  getPOSShopTaskManagePage() {
    const { authsInfo } = this.state;
    API.getPOSShopTaskManagePage(authsInfo).then(res => {
      const { code, data } = res;
      if (code === '0') {
        this.setState({
          listData:data
        })
      } else {
      }

    })
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onHandleTask = (item,type) => {
    const {Id,Task_Info_Img} = item
    switch(type){
      case 'view':{
        this.onPreviewImage(Task_Info_Img)
        break;
      }
      case 'edit':{
        this.onHandlePubilsh()
        break;
      }
      case 'delete':{
        Taro.showModal({
          title:'',
          content:'确定删除该活动吗？',
          cancelText:'取消',
          confirmText:'确认',
          confirmColor:'#F5A623',
          success:(res)=>{
            if(res.confirm){
              this.handleConfirm(Id);
            }
          }
        })
        break;
      }
      default:
    }
  }
  onHandlePubilsh = () => {
    Taro.navigateTo({
      url: '/pages/activities/editActivities/index'
    })
  }
  handleConfirm = (id) => {
    const { authsInfo } = this.state;
    API.deletePOSDelShopTask({
        ...authsInfo,
        stid:id
      }).then(res => {
        const { code } = res;
        if (code === '0') {
          Taro.atMessage({
            'message': '删除成功',
            'type': 'success',
          });
          this.getPOSShopTaskManagePage()
        }
      })
  }

  onPreviewImage = (url) => {
    Taro.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  }
  render() {
    const { listData,isOpened } = this.state;
    return (
      <View className="activities-wrap">
        <AtMessage />
        {
          listData.map((item, index) => (
            <View  className='activities-ul' key={item.Id}>
              <View className="activities-li">
                <Text className="activities_title">{item.Task_Title}</Text>
                <View className="card-wrap">
                    <Image src={item.Task_Info_Img} className="activities_img" />
                    <View className="card-foot">
                        <Text className="foot-item" onClick={()=>this.onHandleTask(item,'view')}><Text className="foot-icon"></Text>预览</Text>
                        <Text className="foot-item" onClick={()=>this.onHandleTask(item,'edit')}><Text className="foot-icon"></Text>编辑</Text>
                        <Text className="foot-item" onClick={()=>this.onHandleTask(item,'delete')}><Text className="foot-icon"></Text>删除</Text>
                    </View>
                </View>
              </View>
            </View>
          )
          )
        }
        <View className="fix_bottom_btn" onClick={this.onHandlePubilsh}>发布活动</View>
      </View>
    )
  }
}

export default Index as ComponentClass;
