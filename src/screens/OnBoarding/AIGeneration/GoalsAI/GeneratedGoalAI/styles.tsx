import { StyleSheet } from "react-native";
import { moderateScale } from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";

export const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: moderateScale(19),
    flex: 1,
  },
  iconStyle1: {
    position: "absolute",
    right: moderateScale(45),
    top: moderateScale(140),
    transform: [{ rotate: "0deg" }],
  },
  iconStyle2: {
    position: "absolute",
    right: moderateScale(5),
    top: moderateScale(15),
    transform: [{ rotate: "30deg" }],
    tintColor: colors?.polishedPine,
  },
  btnContainer: {
    gap: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(50),
  },
  btn1: {
    backgroundColor: colors?.backgroundTheme,
    width: "auto",
  },
  btn2: {
    backgroundColor: "transparent",
    borderWidth: moderateScale(1),
    borderColor: colors?.polishedPine,
    width: "auto",
  },
  btn3: {
    backgroundColor: "transparent",
    borderWidth: moderateScale(1),
    borderColor: colors?.polishedPine,
    width: "auto",
  },
  contentContainerStyle: {
    paddingBottom: moderateScale(50),
  },
  scrollStyle: { flex: 1 },
  textContainerStyle: {
    marginHorizontal: moderateScale(0),
  },
  mainContainerHeader: {
    marginTop: moderateScale(15),
    paddingBottom: moderateScale(15),
  },
  iconCon: { backgroundColor: colors?.darkPrussianBlue },
});
