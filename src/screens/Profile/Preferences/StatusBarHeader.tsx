import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";
import CommonHeader from "../../../components/Header/commonHeader";
import { textLabelSize } from "../../../utils/TextConfig";

interface Props {
  navigation?: any;
  onBackPress?: () => void;
  headerName?: any;
  headerContainer?: ViewStyle;
  iconContainer?: ViewStyle;
}
const StatusBarHeader: React.FC<Props> = ({
  navigation,
  onBackPress,
  headerName,
  headerContainer,
  iconContainer,
}) => {
  return (
    <View style={[style?.headerContainer, headerContainer]}>
      <CommonHeader
        onBackPress={() => {
          onBackPress ? onBackPress() : navigation.goBack();
        }}
        headerName={headerName}
        iconContainer={[style?.iconContainer, iconContainer]}
        textStyle={{
          color: colors?.royalOrangeDark,
          fontSize: textLabelSize?.mainTitle,
        }}
        mainContainer={style?.mainContainer}
      />
    </View>
  );
};

export default StatusBarHeader;

const style = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors?.SaltBox,
    height: moderateScale(70),
    paddingTop: moderateScale(15),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    paddingHorizontal: moderateScale(19),
  },
  iconContainer: {
    backgroundColor: colors?.backIconBg,
  },
  mainContainer: {
    marginHorizontal: moderateScale(0),
  },
});
