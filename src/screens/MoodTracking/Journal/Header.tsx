import React from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BackIcon } from "../../../assets";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { formatSentenceCase } from "../../../helper/sentenceCase";
interface Props {
  navigation?: any;
  title?: any;
}

const Header: React.FC<Props> = ({ navigation, title }) => {
  return (
    <View style={styles?.container}>
      <TouchableOpacity
        style={styles?.backPress}
        onPress={() => navigation?.goBack()}
      >
        <BackIcon />
      </TouchableOpacity>
      <Text style={styles?.titleText}>{formatSentenceCase(title)}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(20),
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(10),
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
