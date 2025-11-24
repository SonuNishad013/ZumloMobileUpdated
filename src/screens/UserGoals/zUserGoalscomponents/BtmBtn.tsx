import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { moderateScale } from "../../../constant/responsiveStyle";
import CommonButton from "../../../components/Buttons/commonButton";
interface Props {
  btnName?: any;
  btnViewStyle?: ViewStyle;
  onPress?: () => void;
  navigation?: any;
}
const BtmBtn: React.FC<Props> = ({
  btnName,
  btnViewStyle,
  onPress,
  navigation,
}) => {
  return (
    <View style={[style?.btnViewStyle, btnViewStyle]}>
      <CommonButton onPress={onPress} btnName={btnName} />
    </View>
  );
};

export default BtmBtn;

const style = StyleSheet.create({
  btnViewStyle: {
    position: "absolute",
    bottom: moderateScale(20),
    alignSelf: "center",
  },
});
