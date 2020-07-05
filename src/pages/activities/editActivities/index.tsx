import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Text, Image } from '@tarojs/components';
import RangeDatePicker from '@/components/rangeDatePicker';
import { API } from '@/apis'
import Http from '@/utils/https';
import {formatDate} from '@/utils';
import './style.scss'

type IProps = {

}
const initState = {
  authsInfo: Taro.getStorageSync('authsInfo') || {},
  isOpened: false,
  Id:0,//活动ID(新增商品此ID为0  修改商品则为商品ID)
	ttitle:'',//活动标题
	tinfo:'',//活动内容
	tiimg:'',//活动图片
	btime:'',//活动开始时间
	etime:'',//活动截至时间
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

  }
  getPOSShopTaskDetails = (Id) => {
    const { authsInfo } = this.state;
    API.getPOSShopTaskDetails({
        ...authsInfo,
        stid:Id,
      }).then(res => {
        const { code,data } = res;
        if (code === '0') {
          const {	ttitle,	tinfo,	tiimg,	btime,	etime } = data;
          this.setState({
            Id,
            ttitle,
            tinfo,
            tiimg,
            btime:formatDate(btime,'YYYY-MM-DD'),
            etime:formatDate(etime,'YYYY-MM-DD'),
          })
        }
      })
  }
  componentWillUnmount() { }

  componentDidShow() {
    const { type, id } = this.$router.params;
    if (type === '0') {
      Taro.setNavigationBarTitle({
        title: '发布活动'
      })
    } else {
      Taro.setNavigationBarTitle({
        title: '修改活动'
      });
      this.getPOSShopTaskDetails(id)
    }
  }

  componentDidHide() { }

  onChooseImage = () => {
    Taro.chooseImage({
      success:(res) => {
        const tempFilePaths = res.tempFilePaths;
        Http.ossUpload(tempFilePaths[0]).then(res=>{
          const {data,statusCode} = res;
          if(statusCode==200){
            this.setState({
              tiimg: data
            });
          }
        })
      }
    })
  }
  onHandlePublish = () => {
    const { authsInfo,Id,tinfo,ttitle,btime,etime,tiimg } = this.state;
    API.savePOSShopTaskManage({
        ...authsInfo,
        Id,
        tiimg:tiimg,
        tinfo,
        ttitle,
        btime,
        etime
      }).then(res => {
        const { code } = res;
        if (code === '0') {
          Taro.showToast({
            'title': '保存成功',
            'icon': 'success',
          });
          setTimeout(()=>{
            Taro.navigateBack();
          },2000)
        }
      })
  }
  onChangeInput = (e,type) => {
    const value = e.target.value;
    switch(type){
      case 'ttitle':
        this.setState({
          ttitle:value
        })
        break;
      default:
        this.setState({
          tinfo:value
        })
    }
  }
  onTimeChange = (e,type)=>{
    const value = e.detail.value;
    switch(type){
      case 'BiginTiem':
        this.setState({
          btime:value
        })
        break;
      default:
        this.setState({
          etime:value
        })
    }
  }
  onSelectTime =()=>{
    this.setState({
      isOpened:true
    })
  }
  onCancelTimeSelect = () => {
    this.setState({
      isOpened:false
    })
  }
  render() {
    const {isOpened,btime,etime,ttitle,tinfo,tiimg } = this.state;
    return (
      <View className='edit-shop'>
        <View className="goods_info">
          <View className="info_li">
            <View className="label">活动名称</View>
            <Input type='text' value={ttitle} onInput={(e)=>this.onChangeInput(e,'ttitle')} className="input" placeholder='请输入活动标题，不超过20个字' placeholderClass="placeholderClass" maxLength={20} />
          </View>
          <View className="info_li_allow">
            <View className="label">活动时间</View>
            <View onClick={this.onSelectTime}>
               {
                  btime||etime ? `${btime}-${etime}`:(<Text className="placeholderClass">请选择</Text>)
               }
              <Text className="at-icon at-icon-chevron-right store_right" ></Text>
            </View>
          </View>
          <View className="info_li">
            <View className="label">活动简介</View>
            <Input type='text' value={tinfo} onInput={(e)=>this.onChangeInput(e,'tinfo')} className="input"  placeholder='请填写活动简介、活动详细规则等' placeholderClass="placeholderClass" maxLength={200} />
          </View>
          <View className="info_li">
            <View className="label">活动海报</View>
            {
              tiimg ? (<View className="upload-image">
                <Image src={tiimg} className="img" />
                <View className="img-foot">
                  <View className="title" onClick={this.onChooseImage}>
                    点击修改
                  </View>
                </View>
              </View>
              ) : (
                  <View className="upload-image" onClick={this.onChooseImage}>
                    <Image src={require('@/assets/images/icon/upload.png')} className="add-img" />
                    <View className="add-desc">上传照片</View>
                  </View>
                )
            }
          </View>
        </View>
        <RangeDatePicker isOpened={isOpened} type="date" BiginTiem={btime} EndTiem={etime}  onCancel={this.onCancelTimeSelect} onChange={this.onTimeChange}/>
        <View className="fix_bottom_btn" onClick={this.onHandlePublish}>立即发布</View>
      </View>
    )
  }
}

export default Index as ComponentClass;
