import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames';
import './style.scss'


interface IProps {
  value:string|number,
  data:any[],
  onChange:(value:any)=>any
}
interface IState {
  value:string|number
}

class Tags extends Component<IProps,IState> {
  static defaultProps = {
    value:'',
    data:[],
    onChange:()=>{}
  }
  state:IState = {
    value:'1'
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { value } = nextProps;
    if(value!=prevState.value){
      return {
        value
      }
    }else {
      return null
    }
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onSelectTag = (value) => {
    this.setState({
      value
    })
    this.props.onChange(value)
  }
  render() {
    const { value} = this.state;
    const { data } = this.props;
    return (
      <View className='tags'>
         {
           data.map(item=> <Text className={classNames('tags_item',{active:item.value===value})} key={item.value} onClick={()=>this.onSelectTag(item.value)}>{item.text}</Text>)
         }
      </View>
    )
  }
}

export default Tags;
