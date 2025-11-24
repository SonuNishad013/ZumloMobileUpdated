import { StyleSheet } from "react-native";
import colors from "../../../../../constant/colors";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";

const styles = StyleSheet.create({
  innerBottomSheetView: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },
  mainText: {
    color: colors.SurfCrest,
    fontSize: textScale(20),
    fontWeight: "500",
    fontFamily: "Poppins-Italic",
  },
  text: {
    color: colors.SurfCrest,
    fontWeight: "400",
    fontSize: moderateScale(12),
    marginTop: moderateScale(5),
  },
  skipView: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  skipText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: "400",
    alignSelf: "center",
  },
});

export default styles;
