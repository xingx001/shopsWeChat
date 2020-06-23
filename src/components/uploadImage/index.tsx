import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtImagePicker } from 'taro-ui';
import { AtImagePickerProps } from 'taro-ui/types/image-picker'
import "./style.scss";
type IProps = AtImagePickerProps&{
  children:any
}
class UploadImage extends Component<IProps,any> {
  render(){
    const { children } = this.props;
    return <View className="upload-picker">
    {
      children
    }
    <AtImagePicker
      className='upload-image-picker'
      {
      ...this.props
      }
    />
  </View>
  }
};

export default UploadImage;
