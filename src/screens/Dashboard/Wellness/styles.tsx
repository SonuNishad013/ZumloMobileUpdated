import { StyleSheet } from "react-native";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.prussianBlue,
    flex: 1,
  },
  headerContainer: {
    backgroundColor: colors?.prussianBlue,
    height: moderateScale(70),
    paddingTop: moderateScale(10),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    paddingHorizontal: moderateScale(17),
  },
  headerIconContainer: {
    backgroundColor: colors?.Daintree,
  },
  headerText: {
    color: colors?.SurfCrest,
  },
  headerMainContainer: {
    marginHorizontal: moderateScale(0),
    marginTop: moderateScale(15),
  },
  scrollViewMainContainer: {
    backgroundColor: colors?.SurfCrest,
    marginBottom: 100,
    paddingHorizontal: moderateScale(15),
  },
  blurView: {
    flex: 1,
    position: "absolute",
    zIndex: 999,
    top: 0,
    height: "100%",
    width: "100%",
  },
  titleText: {
    fontSize: textScale(20),
    fontWeight: "600",
    color: colors.prussianBlue,
    marginBottom: moderateScale(4),
  },
  subtitleText: {
    fontSize: textScale(14),
    color: colors.prussianBlue,
    textAlign: "center",
  },
});
