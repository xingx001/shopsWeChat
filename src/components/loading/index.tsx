import Taro, { FC, memo } from "@tarojs/taro";
import classnames from "classnames";
import { View,Text } from "@tarojs/components";
import "./style.scss";

type Props = {
  fullPage?: boolean;
  loading?: boolean;
  children?:any
};

const Loading: FC<Props> = ({ fullPage=true, loading=true,children }) => {
  const cls = classnames({
    loading_components: true,
    fullScreen: fullPage,
    loading: loading
  });
  return <View className={cls}>
            <View className="loading">
              <Text className="l_span"></Text>
              <Text className="l_span"></Text>
              <Text className="l_span"></Text>
              <Text className="l_span"></Text>
              <Text className="l_span"></Text>
              <Text className="l_span"></Text>
              <Text className="l_span"></Text>
              <Text className="l_span"></Text>
            </View>
            {
              children
            }
        </View>;
};

export default memo(Loading, (oldProps, newProps) => {
  return (
    oldProps.fullPage === newProps.fullPage && oldProps.loading === newProps.loading
  );
});
