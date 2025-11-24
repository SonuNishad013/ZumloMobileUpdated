import { StyleSheet } from "react-native";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";

export const styles = StyleSheet.create({
  mainContainer: { flex: 1, paddingHorizontal: moderateScale(19) },
  basicInfoContainer: {
    backgroundColor: colors?.SaltBox,
    borderRadius: moderateScale(6),
    marginTop: moderateScale(10),
  },
  socialInfoContainer: {
    backgroundColor: colors?.polishedPine,
    borderRadius: moderateScale(6),
    marginTop: moderateScale(10),
  },
  imageContainer: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(15),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors?.royalOrange,
  },
  imageContainer1: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(15),
  },
  image: {
    width: "95%",
    height: "95%",
    borderRadius: moderateScale(13),
  },
  touchableStyle: {
    position: "absolute",
    backgroundColor: colors?.SurfCrest,
    height: moderateScale(35),
    width: moderateScale(35),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(17.5),
    right: moderateScale(-10),
    bottom: moderateScale(-10),
  },
  nameEmailContainer: {
    marginTop: moderateScale(5),
    marginLeft: moderateScale(10),
  },
  nameTxt: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.SaltBox,
  },
  emailTxt: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.prussianBlue,
  },
  extraView: {
    marginTop: moderateScale(10),
  },
  topView: { flexDirection: "row" },
});
