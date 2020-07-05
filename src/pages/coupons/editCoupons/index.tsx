import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Text, Textarea, Picker, Image } from '@tarojs/components';
import RangeDatePicker from '@/components/rangeDatePicker';
import { API } from '@/apis';
import { formatDate } from '@/utils';
import './style.scss'

interface IProps {
}
const initState = {
  authsInfo: Taro.getStorageSync('authsInfo') || {},
  isOpened: false,
  radioType: 0,
  Id: 0,//优惠券Id(新增为0 修改为优惠券ID)
  scname: '',//优惠券名称
  ctype: 0,// 优惠券类型 （1=折扣券，2=代金券）
  limit: 0,// 满多少元订单才可使用 0=无门槛
  cinfo: '',// 优惠券描述
  cstate: 0,// 0=否，1=正常 ，2=下架，3=售罄
  paynum: 0,// 售价
  bnum: 0,// 初始数量
  btime: '',// 有效开始日期
  etime: '',// 有效截至日期
  issue: 0,// 发行至 1=首页广告栏 ，2=优惠券栏目 ，3=店内会员
}
const ctypeList = ['折扣券', '代金券'];
const statusList = ['否', '是'];
const pageList = ['首页广告栏', '优惠券栏目', '店内会员'];
type IState = typeof initState;

class EditCoupons extends Component<IProps, IState> {
  state: IState = {
    ...initState
  }
  config: Config = {
    navigationBarTitleText: '创建优惠券',
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {

  }
  componentWillUnmount() { }

  componentDidShow() {
    const { type, id } = this.$router.params;
    if (type === '0') {
      Taro.setNavigationBarTitle({
        title: '创建优惠券'
      })
    } else {
      Taro.setNavigationBarTitle({
        title: '发布优惠券'
      });
      this.getPOSShopCardGet(id)
    }
  }
  getPOSShopCardGet = (id) => {
    const { authsInfo } = this.state;
    API.getPOSShopCardGet({
      ...authsInfo,
      scid: id
    }).then(res => {
      const { code, data } = res;
      if (code == 0) {
        const { Id, scname, bnum, btime, cinfo, cstate, ctype, etime, issue, limit, paynum } = data;
        this.setState({
          Id,
          scname,
          bnum,
          cinfo,
          cstate: 1,
          ctype: ctype - 1,
          btime: formatDate(btime, 'YYYY-MM-DD'),
          etime: formatDate(etime, 'YYYY-MM-DD'),
          issue: issue - 1,
          limit,
          radioType: limit ? 1 : 0,
          paynum
        })
      }
      console.log(res);
    })
  }
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
  onDeleteShop = () => {
    this.setState({
      isOpened: true
    })
  }
  onChangeRadio = (value) => {
    this.setState({
      radioType: value,
      limit: 0
    })
  }
  onChangePicker = (e, type) => {
    const value = e.detail.value;
    console.log(e, type)
    switch (type) {
      case 'ctype':
        this.setState({
          ctype: parseInt(value)
        })
        break;
      case 'cstate':
        this.setState({
          cstate: parseInt(value)
        })
        break;
      case 'issue':
        this.setState({
          issue: parseInt(value)
        })
        break;
      case 'BiginTiem':
        this.setState({
          btime: value
        })
        break;
      default:
        this.setState({
          etime: value
        })
    }
  }
  onChangeInput = (e, type) => {
    const value = e.target.value
    switch (type) {
      case 'scname':
        this.setState({
          scname: value
        });
        break;
      case 'limit':
        this.setState({
          limit: value
        });
        break;
      case 'paynum':
        this.setState({
          paynum: value
        });
        break;
      case 'bnum':
        this.setState({
          bnum: value
        });
        break;
      default:


    }
  }
  onHandleAdd = () => {
    const { authsInfo, Id, scname, ctype, limit, cinfo, cstate, paynum, bnum, btime, etime, issue } = this.state;
    API.savePOSShopCardManage({
      ...authsInfo,
      Id,
      scname,
      ctype: ctype + 1,
      limit,
      cinfo,
      cstate,
      paynum,
      bnum,
      btime,
      etime,
      issue: issue + 1
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
  onSelectDate = () => {
    this.setState({
      isOpened: true
    })
  }
  onCancelSelectDate = () => {
    this.setState({
      isOpened: false
    })
  }
  render() {
    const { Id, isOpened, radioType, scname, ctype, limit, cinfo, cstate, paynum, bnum, btime, etime, issue } = this.state;
    return (
      <View className='edit-coupons'>
        <View className="title">基本信息</View>
        <View className="goods_info">
          <View className="info_li">
            <View className="label">优惠券名称</View>
            <Input type='text' className="input" value={scname} onInput={(e) => this.onChangeInput(e, 'scname')} placeholder='如：8.8折券，最多15个字' placeholderClass="placeholderClass" maxLength={15} />
          </View>
          <View className="info_li_allow">
            <View className="label">优惠券类型</View>
            <View className="allow">
              <Picker value={0} mode='selector' range={ctypeList} onChange={(e) => this.onChangePicker(e, 'ctype')}>
                {
                  ctypeList[ctype]
                }
                <Text className="at-icon at-icon-chevron-right store_right" ></Text>
              </Picker>
            </View>
          </View>
          <View className="info_li_allow">
            <View className="label">使用条件</View>
            <View className="allow conditions_box">
              <View className="conditions_li" onClick={() => this.onChangeRadio(0)}>
                <Image src={radioType == 0 ? require('@/assets/images/icon/select.png') : require('@/assets/images/icon/noselect.png')} className="icon" />
                <Text className="desc">无使用门槛</Text>
              </View>
              <View className="conditions_li" onClick={() => this.onChangeRadio(1)}>
                <Image src={radioType == 1 ? require('@/assets/images/icon/select.png') : require('@/assets/images/icon/noselect.png')} className="icon" />
                <View className="desc desc_input">订单满<Input type='number' value={`${limit}`} onInput={(e) => this.onChangeInput(e, 'limit')} className="input_desc" placeholder='' placeholderClass="placeholderClass" maxLength={15} />元</View>
              </View>
            </View>
          </View>
          <View className="info_li">
            <View className="label">优惠券描述</View>
            <Textarea className="input_area" autoHeight value={cinfo} onInput={(e) => this.onChangeInput(e, 'cinfo')} placeholder='请输入' placeholderClass="placeholderClass" />
          </View>
        </View>
        <View className="title">上架信息</View>
        <View className="goods_info">
          {
            Id ? null : (
              <View className="info_li_allow">
                <View className="label">立即上架</View>
                <View className="allow">
                  <Picker value={cstate} mode='selector' range={statusList} onChange={(e) => this.onChangePicker(e, 'cstate')}>
                    {
                      statusList[cstate]
                    }
                    <Text className="at-icon at-icon-chevron-right store_right" ></Text>
                  </Picker>
                </View>
              </View>

            )
          }
          {
            cstate == 1 && (
              <View>
                <View className="info_li_allow">
                  <View className="label">售价</View>
                  <Input type='number' value={`${paynum}`} onInput={(e) => this.onChangeInput(e, 'paynum')} className="input" placeholder='请输入金额' placeholderClass="placeholderClass" maxLength={15} />
                  <View className="allow">元</View>
                </View>
                <View className="info_li_allow">
                  <View className="label">发放总量</View>
                  <Input type='number' value={`${bnum}`} onInput={(e) => this.onChangeInput(e, 'bnum')} className="input" placeholder='请输入整数' placeholderClass="placeholderClass" maxLength={15} />
                  <View className="allow">张</View>
                </View>
                <View className="info_li_allow">
                  <View className="label">使用时间段</View>
                  <View className="allow" onClick={this.onSelectDate}>
                    {
                      btime||etime ? `${btime} 至 ${etime}`: <Text className="placeholderClass">请选择</Text>
                    }
                    <Text className="at-icon at-icon-chevron-right store_right" ></Text>
                    <RangeDatePicker isOpened={isOpened} type="date" BiginTiem={btime} EndTiem={etime} onCancel={this.onCancelSelectDate} onChange={this.onChangePicker} />
                  </View>
                </View>
                <View className="info_li_allow">
                  <View className="label">发行至页面</View>
                  <View className="allow">
                    <Picker value={0} mode='selector' range={pageList} onChange={(e) => this.onChangePicker(e, 'issue')}>
                      {
                        pageList[issue]
                      }
                      <Text className="at-icon at-icon-chevron-right store_right" ></Text>
                    </Picker>
                  </View>
                </View>

              </View>

            )
          }
        </View>
        <View className="fix_bottom_btn" onClick={this.onHandleAdd}>{Id ? '立即上架':'立即创建'}</View>
      </View>
    )
  }
}

export default EditCoupons as ComponentClass;
