import Taro, { Component } from '@tarojs/taro'
import { Picker } from '@tarojs/components'
import {AtActionSheet, AtActionSheetItem } from 'taro-ui'

interface IProps {
  isOpened:boolean,
  BiginTiem:string,
  EndTiem:string,
  onCancel:any,
  onChange:any,
  type?:'time'|'date'
}
interface IState {
  value:string|number
}

class RangeDatePicker extends Component<IProps,IState> {
  static defaultProps = {
    value:'',
    BiginTiem:'',
    EndTiem:'',
    onChange:(e,type)=>{},
    onCancel:(e,type)=>{}
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  render() {
    const { isOpened,BiginTiem,EndTiem,onCancel,onChange,type } = this.props;
    return (
      <AtActionSheet isOpened={isOpened} title={`开始时间：${BiginTiem||'---'}  结束时间：${EndTiem||'---'}`} cancelText='取消' onClose={onCancel} onCancel={onCancel}>
      <Picker mode={type} value={BiginTiem} onChange={(e)=>onChange(e,'BiginTiem')}>
         <AtActionSheetItem>
            开始时间
         </AtActionSheetItem>
       </Picker>
       <Picker mode={type} value={EndTiem} onChange={(e)=>onChange(e,'EndTiem')}>
         <AtActionSheetItem>
            结束时间
         </AtActionSheetItem>
       </Picker>
   </AtActionSheet>
    )
  }
}

export default RangeDatePicker;
