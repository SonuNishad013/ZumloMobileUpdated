import React from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { BackIcon, CalendarIcon } from "../../../assets";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { formatSentenceCase } from "../../../helper/sentenceCase";
interface Props {
  navigation?: any;
  title?: any;
  container?: ViewStyle;
  calenderIcon?: boolean;
  caledarPress?: () => void;
}

const Header: React.FC<Props> = ({
  navigation,
  title,
  container,
  calenderIcon,
  caledarPress,
}) => {
  return (
    <View style={[styles?.container, container]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={styles?.backPress}
          onPress={() => navigation?.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles?.titleText}>{formatSentenceCase(title)}</Text>
      </View>

      {calenderIcon && (
        <TouchableOpacity onPress={caledarPress}>
          <CalendarIcon width={moderateScale(20)} height={moderateScale(20)} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(20),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors?.backgroundTheme,
    borderBottomRightRadius: moderateScale(30),
    borderBottomLeftRadius: moderateScale(30),
    paddingBottom: moderateScale(25),
    justifyContent: "space-between",
  },
  backPress: {
    height: moderateScale(30),
    width: moderateScale(30),
    backgroundColor: "#00000033",
    borderRadius: moderateScale(7),
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginLeft: moderateScale(20),
  },
});
