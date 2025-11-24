import { StyleSheet } from "react-native";
import { height, moderateScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

export const style = StyleSheet.create({
  contentContainerStyle: { paddingBottom: moderateScale(100) },
  mainView: { height: height },
  linearGradientStyle: { flex: 1 },
  mainContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
    paddingTop: moderateScale(25),
    backgroundColor: colors.SurfCrest,
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
  },
});
