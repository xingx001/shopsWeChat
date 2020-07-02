import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Text, Image, Picker } from '@tarojs/components';
import { AtImagePicker } from 'taro-ui';
import RangeDatePicker from '@/components/rangeDatePicker';
import { API } from '@/apis'
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
      });
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
  onHandlePublish = () => {
    const { authsInfo,Id,tinfo,ttitle,btime,etime,files } = this.state;
    const img = files ? files[0].url:'';
    API.savePOSShopTaskManage({
        ...authsInfo,
        Id,
        tiimg:img,
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
    const { files,isOpened,btime,etime,ttitle,tinfo } = this.state;
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
        <RangeDatePicker isOpened={isOpened} type="date" BiginTiem={btime} EndTiem={etime}  onCancel={this.onCancelTimeSelect} onChange={this.onTimeChange}/>
        <View className="fix_bottom_btn" onClick={this.onHandlePublish}>立即发布</View>
      </View>
    )
  }
}

export default Index as ComponentClass;
