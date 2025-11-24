import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CommonHeader from "../../../components/Header/commonHeader";
import { strings } from "../../../constant/strings";

interface Props {
  navigation?: any;
  onBackPress?: () => void;
  headerName?: any;
  headerContainer?: ViewStyle;
  iconContainer?: ViewStyle;
  isSkip?: boolean;
  onSkip?: () => void;
  isSeeAll?: any;
  onViewHistory?: () => void;
}
const Header: React.FC<Props> = ({
  navigation,
  onBackPress,
  headerName,
  headerContainer,
  iconContainer,
  isSkip = false,
  onSkip,
  isSeeAll = false,
  onViewHistory,
}) => {
  return (
    <View style={[style?.headerContainer, headerContainer]}>
      <CommonHeader
        onBackPress={() => navigation.goBack()}
        headerName={headerName}
        iconContainer={[style?.iconContainer, iconContainer]}
        textStyle={{
          color: colors?.SurfCrest,
        }}
        mainContainer={{
          marginHorizontal: moderateScale(0),
        }}
      />
      {isSkip && (
        <>
          <TouchableOpacity onPress={onSkip}>
            <Text
              style={{
                color: colors.SurfCrest,
                fontSize: textScale(14),
                fontWeight: "400",
              }}
            >
              {"Maybe later"}
            </Text>
          </TouchableOpacity>
        </>
      )}
      {isSeeAll && (
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity onPress={onViewHistory}>
            <Text
              style={{
                color: colors.SurfCrest,
                fontSize: textScale(14),
                fontWeight: "700",
              }}
            >
              {"View History"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;

const style = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors?.prussianBlue,
    height: moderateScale(70),
    paddingTop: moderateScale(10),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    paddingHorizontal: moderateScale(17),
  },
  iconContainer: {
    backgroundColor: colors?.Daintree,
  },
});
