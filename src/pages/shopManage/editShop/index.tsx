import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Text, Image, Picker,Button } from '@tarojs/components';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui';
import classnames from 'classnames';
import { API } from '@/apis';
import Http from '@/utils/https';
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
  typeName:'',//新增类型
  files: [],
  proTypeList:[]
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
    this.getPOSProAddPType();
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
    const { authsInfo,tname } = this.state;
    API.getPOSProAddPType({
      ...authsInfo,
    }).then(res => {
      const { code,data } = res;
      if (code === '0') {
        const { proTypeList } = data;
        const initTname = proTypeList[0] ? proTypeList[0].ProTypeName:''
        this.setState({
          proTypeList,
          tname:!tname ? initTname:tname
        })
      }
    })
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onHandleAddType = () => {
    this.setState({
      isOpened: true,
      typeName:''
    })
  }
  onChangeInput = (e,type) => {
    const value = e.target.value;
    switch(type){
      case 'pruname':
        this.setState({
          pruname:value
        })
        break;
      case 'typeName':{
        this.setState({
          typeName:value
        });
        break;
      }
      default:
        this.setState({
          ezinfo:value
        })
    }
  }
  onHandleAdd = (type) => {
    const { proTypeList,typeName } = this.state;
    if(type=='ok'){
      this.setState({
        isOpened: false,
        proTypeList:[...proTypeList,{ProTypeName:typeName}]
      })
    }else{
      this.setState({
        isOpened: false,
        typeName:''
      })
    }
  }
  onChangeSelector = (e) => { //修改状态
      const value = e.detail.value;
      this.setState({
        isups:parseInt(value)
      })
  }
  onChangeType = (value) => { //选择类型
    this.setState({
      tname:value
    })
  }
  onChooseImage = () => {
    Taro.chooseImage({
      success:(res) => {
        const tempFilePaths = res.tempFilePaths;
        Http.ossUpload(tempFilePaths[0]).then(res=>{
          const {data,statusCode} = res;
          if(statusCode==200){
            this.setState({
              pruimg: data
            });
          }
        })
      }
    })
  }
  onHandleSave = () => {
    const { authsInfo,Id,	pruname,ezinfo,tname,isups,	pruimg } = this.state;
    API.savePOSProductMange({
        ...authsInfo,
        Id,
        pruimg:	pruimg,
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
          setTimeout(()=>{
            Taro.navigateBack({
              delta: 1
            })
          },2000)
        }
      })
  }
  render() {
    const { isOpened,proTypeList,pruimg,isups,pruname,ezinfo,tname,typeName } = this.state;
    return (
      <View className='edit-shop'>
        <View className="goods_info">
          <View className="info_li">
            <View className="label">商品名称</View>
            <Input type='text' value={pruname} onInput={(e)=>this.onChangeInput(e,'pruname')} className="input" placeholder='请输入商品名称' placeholderClass="placeholderClass" />
          </View>
          <View className="info_li">
            <View className="label">商品描述</View>
            <Input type='text' value={ezinfo} onInput={(e)=>this.onChangeInput(e,'ezinfo')} className="input"  placeholder='请输入商品描述' placeholderClass="placeholderClass" />
          </View>
          <View className="info_li_allow">
            <View className="label">在架状态</View>
            <Picker value={isups} mode='selector' range={['不上架','上架']} onChange={this.onChangeSelector}>
              {
                isups ? '上架':'不上架'
              }
              <Text className="at-icon at-icon-chevron-right store_right" ></Text>
            </Picker>
          </View>
          <View className="info_li">
            <View className="label">商品类别</View>
            <View className="content">
              {
                proTypeList.map((item,index)=>(
                <Text key={index+'type'} onClick={()=>this.onChangeType(item.ProTypeName)} className={classnames('tag_list',{
                  active:tname ==item.ProTypeName
                })}>{item.ProTypeName}</Text>
                ))
              }
              <Text className="add_tag" onClick={this.onHandleAddType}>{`+ 添加分类`}</Text>
            </View>
          </View>
          <View className="info_li">
            <View className="label">商品图片</View>
            {
              	pruimg ? (<View className="upload-image">
                <Image src={pruimg} className="img" />
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
          <AtModal isOpened={isOpened}>
            <AtModalHeader>添加分类</AtModalHeader>
            <AtModalContent>
              <Input type='text' value={typeName} onInput={(e)=>this.onChangeInput(e,'typeName')} className="input" placeholder='请输入分类名称' placeholderClass="placeholderClass" maxLength={10} />
            </AtModalContent>
            <AtModalAction> <Button onClick={()=>this.onHandleAdd('cancel')}>取消</Button> <Button onClick={()=>this.onHandleAdd('ok')}>确定</Button> </AtModalAction>
          </AtModal>
        </View>
        <View className="fix_bottom_btn" onClick={this.onHandleSave}>保存</View>
      </View>
    )
  }
}

export default Index as ComponentClass;
