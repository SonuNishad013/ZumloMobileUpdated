import { StyleSheet } from "react-native";
import {
  moderateScale,
  textScale,
} from "../../../../../../constant/responsiveStyle";
import colors from "../../../../../../constant/colors";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: moderateScale(30),
  },
  headingText: {
    fontWeight: "700",
    color: colors.SurfCrest,
    fontSize: textScale(24),
    borderColor: colors.royalOrange,
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: moderateScale(40),
    marginTop:moderateScale(25)
  },
  pickerContainer: {
    height: moderateScale(450),
    marginTop: moderateScale(30),
    // backgroundColor:"red",
    width: moderateScale(100),
    alignSelf: "center",
    justifyContent: "center",
  },
  inputContainer: {
    borderWidth: moderateScale(1),
    borderColor: colors.royalOrange,
    borderRadius: moderateScale(53),
    height: moderateScale(56),
    justifyContent: "flex-end",
    position: "absolute",
    width: moderateScale(275),
    alignSelf: "center",
    top: moderateScale(195),
  },
  inputLabel: {
    fontSize: textScale(14),
    fontWeight: "500",
    color: colors.SurfCrest,
    width: moderateScale(50),
    position: "absolute",
    right: moderateScale(55),
    bottom: moderateScale(10),
  },
  pickerText: {
    fontSize: textScale(32),
    fontWeight: "600",
  },
});
