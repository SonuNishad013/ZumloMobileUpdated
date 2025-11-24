import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import SubscriptionPlan from ".";
import colors from "../../constant/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const styles = StyleSheet.create({
  Text: {
    color: "black",
  },
  iconContainer: {
    backgroundColor: "#00000033",
    marginLeft: 10,
    marginBottom: moderateScale(10),
  },
  title_text: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    textAlign: "center",
    marginTop: moderateScale(10),
    fontStyle: "italic",
  },
  subtitle_text: {
    fontSize: textScale(20),
    fontWeight: "700",
    color: colors?.SurfCrest,
    textAlign: "center",
    marginTop: moderateScale(20),
  },
  container: { flex: 1, alignItems: "center", paddingTop: moderateScale(30) },
  pcontainer: {
    flex: 1,
  },
  toggleView: {
    borderWidth: moderateScale(1),
    borderColor: colors?.prussianBlue,
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(20),
    flexDirection: "row",
  },
  activeToggle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors?.themeColor,
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(13),
    margin: moderateScale(5),
  },
  activeToggleText: {
    color: colors.extraLightSurfCrest,
    fontSize: moderateScale(15),
    fontWeight: "600",
  },
  inActiveToggle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors?.transparent,
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(13),
    margin: moderateScale(5),
  },
  inActiveToggleText: {
    color: colors.themeColor,
    fontSize: moderateScale(15),
    fontWeight: "600",
  },
  listView: {
    paddingHorizontal: moderateScale(20),
    marginBottom: moderateScale(20),
    marginTop: "40%",
  },
  termsView: {
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(5),
    fontSize: moderateScale(10),
    fontWeight: "400",
    color: colors?.prussianBlue,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  blueText: {
    fontSize: moderateScale(12),
    fontWeight: "600",
    color: colors?.terms,
  },
  orText: {
    fontSize: moderateScale(10),
    fontWeight: "600",
    color: colors?.prussianBlue,
  },
});
