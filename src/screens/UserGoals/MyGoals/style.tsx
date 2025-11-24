import { StyleSheet } from "react-native";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";

export const style = StyleSheet.create({
  container: {
    backgroundColor: colors.SurfCrest,
  },
  flatListStyle: { marginHorizontal: moderateScale(19) },
  flatListContent: {
    paddingBottom: moderateScale(170),
  },
});
