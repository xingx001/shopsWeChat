import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Textarea } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './style.scss'
import { API } from '@/apis'

interface IProps {

}
interface IState {
  authsInfo: any,
  title: '',
  svcList: any[]
}

class Index extends Component<IProps, IState> {
  state: IState = {
    authsInfo: Taro.getStorageSync('authsInfo') || {},
    title: '',
    svcList: [{
      title: '',
      ctype: '',
      num: 1,
      ccontent: ''
    }]
  }
  config: Config = {
    navigationBarTitleText: '会员权益'
  }


  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    this.getPOSShopVipConfig();
  }
  getPOSShopVipConfig = () => {
    const { authsInfo } = this.state;
    API.getPOSShopVipConfig({
      ...authsInfo
    }).then(res => {
      const { code, data } = res;
      if (code == 0) {
        this.setState({
          title: data.svcList[0] ? data.svcList[0].title : '',
          svcList: data.svcList
        })
      }
    })
  }
  componentWillUnmount() { }

  componentDidShow() {

  }

  componentDidHide() { }
  onChangeInput = (e, type = '', index = 0) => {
    const value = e.target.value;
    const { svcList } = this.state;
    switch (type) {
      case 'title':
        this.setState({
          title: value
        });
        break;
      default:
        svcList[index] = Object.assign({}, svcList[index], { [type]: value })
        this.setState({
          svcList
        });
        break;
    }
  }
  onDelete = (index) => {
    const { svcList } = this.state;
    svcList.splice(index, 1);
    this.setState({
      svcList
    })
  }
  onHandleAdd = () => {
    const { svcList } = this.state;
    this.setState({
      svcList: [...svcList, {
        title: '',
        ctype: '',
        num: 1,
        ccontent: ''
      }]
    })
  }
  onHandleSave = () => {
    const { authsInfo, svcList, title } = this.state;
    const List = svcList.map(item => Object.assign({}, item, { title }));
    const params = {
      ...authsInfo,
      svcList: List
    }
    API.saveShopVIPConfigManage(params).then(res => {
      const { code } = res;
      if (code == 0) {
        Taro.showToast({
          'title': '保存成功',
          'icon': 'success',
        });
        setTimeout(() => {
          Taro.navigateBack({
            delta: 1
          })
        }, 2000)
      }
    })

  }
  render() {
    const { svcList, title } = this.state;
    return (
      <View className='interests-wrap'>
        <View className="interests-ul ">
          <View className="interests-li">
            <Text className="interests-tit">标题</Text>
            <View className="interests-input">
              <Input type='number' value={title} onInput={(e) => this.onChangeInput(e, 'title')} className="input" placeholder='不超过15个字' placeholderClass="placeholderClass" maxLength={15} />
            </View>
          </View>
        </View>
        {
          svcList.map((item, index) => (
            <View className="interests-ul content_box" key={'li' + index}>
              <View className="interests-li boder_bottom">
                <Text className="interests-tit">类型</Text>
                <View className="interests-input">
                  <Input type='number' value={item.ctype} onInput={(e) => this.onChangeInput(e, 'ctype', index)} className="input" placeholder='请输入类型' placeholderClass="placeholderClass" maxLength={15} />
                </View>
              </View>
              <View className="interests-li boder_bottom">
                <Text className="interests-tit">编号</Text>
                <View className="interests-input">
                  <Input type='number' value={item.num} onInput={(e) => this.onChangeInput(e, 'num', index)} className="input" placeholder='请输入编号' placeholderClass="placeholderClass" maxLength={15} />
                </View>
              </View>
              <View className=" interests-content">
                <Text className="interests-tit">内容</Text>
                <View className="interests-input">
                  <Textarea className="textarea-wrap" value={item.ccontent} onInput={(e) => this.onChangeInput(e, 'ccontent', index)} placeholder='请输入会员权益具体内容' placeholderClass="placeholderClass" />
                </View>
              </View>
              {
                index>0 && ( <View className="delete"><AtIcon value='trash' size='18' color='rgba(255, 255, 255, 1)' className="icon-del"></AtIcon><Text onClick={() => this.onDelete(index)}>删除</Text></View>)
              }
            </View>
          ))
        }
        <View className="btn_wrap">
          <View className="add_btn btn" onClick={this.onHandleAdd}>
            新增
        </View>
          <View className="save_btn btn" onClick={this.onHandleSave}>
            提交
        </View>
        </View>
      </View>
    )
  }
}

export default Index as ComponentClass;
