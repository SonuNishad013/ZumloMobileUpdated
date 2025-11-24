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
    top: moderateScale(120),
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
  buttons: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    padding: moderateScale(5),
    borderRadius: moderateScale(15),
    borderColor: colors?.SurfCrest,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  selectedButtonView: {
    backgroundColor: colors?.polishedPine,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(25),
    marginHorizontal: moderateScale(5),
    borderWidth: moderateScale(1.5),
    borderColor: colors?.polishedPine,
    flex: 1,
    alignItems: "center",
  },
  selectedButtonText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "400",
  },
  unselectedButtonView: {
    backgroundColor: colors?.transparent,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(25),
    marginHorizontal: moderateScale(5),
    borderWidth: moderateScale(1.5),
    borderColor: colors?.tabBorder,
    flex: 1,
    alignItems: "center",
  },
  unselectedButtonText: {
    color: colors?.tabColor,
    fontSize: moderateScale(14),
    fontWeight: "400",
  },
  cardView: {
    marginVertical: moderateScale(8),
    backgroundColor: colors?.prussianBlue,
  },
});
