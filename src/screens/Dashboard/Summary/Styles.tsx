// styles.ts
import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const insets = useSafeAreaInsets();
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerView: {},
  VitalsOuterView: {
    paddingTop: moderateScale(20),
  },
  myVitalsText: {
    color: colors?.SurfCrest,
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  myVitalsTitleText: {
    color: colors?.SurfCrest,
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
  },
  myVitalsTitleLineView: {
    paddingTop: moderateScale(10),
  },
  vitalsChart: {
    height: moderateScale(274.54),
    // width: moderateScale(334),
  },
  HealthDataOuterView: {
    paddingTop: moderateScale(10),
  },
  healthDataInnerView: {
    backgroundColor: colors?.polishedPine,
    padding: 10,
    borderRadius: moderateScale(10),
    // flexDirection: "row",
    // alignItems: "center",
  },
  bloodcountText: {
    fontSize: 43,
    fontWeight: "600",
    color: colors?.SurfCrest,
    paddingHorizontal: moderateScale(10),
  },
  UnitText: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16.8,
    fontFamily: "Poppins-Regular",
  },
  IconView: {
    flexDirection: "row",
    alignItems: "center",
  },
  BloodPressureText: {
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: 10,
  },
  VitalCard: {
    width: moderateScale(170),
    height: moderateScale(107),
    backgroundColor: "#fff",
    margin: moderateScale(4),
    borderRadius: moderateScale(10),
    alignSelf: "center",
    paddingLeft: moderateScale(10),
    paddingTop: moderateScale(20),
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: colors?.SurfCrest,
    fontFamily: "Poppins-regular",
  },
  unitView: {
    paddingTop: moderateScale(15),
  },
  countText: {
    fontWeight: "500",
    fontSize: 25,
    fontFamily: "Poppins-regular",
    color: colors?.SurfCrest,
  },
  unitText: {
    color: colors?.SurfCrest,
    fontSize: 10,
  },
  updateText: {
    fontSize: 10,
    fontWeight: "400",
    color: colors?.SurfCrest,
    lineHeight: 17,
  },
  HorizontalHeadingView: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: moderateScale(15),
  },
  text: {
    marginRight: 10, // Adjust spacing between text and line as needed
    fontSize: 16,
    fontWeight: "bold",
    color: colors.SurfCrest,
  },
  line: {
    flex: 1,
    height: 0.4,
    backgroundColor: colors.SurfCrest,
  },
  GoalsOuterView: {
    paddingTop: moderateScale(15),
  },
  OutOftext: {
    color: "rgba(255, 157, 72, 1)",
    fontSize: 62,
    fontWeight: "700",
    fontFamily: "Poppins-Regular",
  },
  OutText: {
    fontWeight: "500",
    fontSize: 25,
    color: colors.SilverChalice,
  },
  ActivityOuterView: {
    marginVertical: moderateScale(10),
  },
  ActivityView: {
    backgroundColor: colors?.SurfCrest,
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    position: "relative",
  },
  ActivityTitleText: {
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: colors?.prussianBlue,
  },
  internalViews: {
    flexDirection: "row",
    paddingTop: moderateScale(5),
    alignItems: "center",
  },
  internalTexts: {
    color: colors?.prussianBlue,
    marginLeft: moderateScale(5),
    fontSize: 10,
    fontWeight: "400",
  },
  internalSpaces: {
    paddingTop: moderateScale(10),
  },
  statusOuter: {
    backgroundColor: colors?.prussianBlue,
    borderRadius: moderateScale(20),
    // paddingVertical: moderateScale(5),
    // paddingHorizontal: moderateScale(10),
    height: moderateScale(18),
    width: moderateScale(84),
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    color: colors?.SurfCrest,
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
  },
  Activitywrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressPercentage: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.prussianBlue,
  },
  blankScreenContainer: {
    flex: 1,
    backgroundColor: colors?.SurfCrest,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(19),
    gap: moderateScale(10),
  },
  blankScreenText: {
    textAlign: "center",
    color: colors?.prussianBlue,
    fontSize: textScale(16),
    fontWeight: "400",
  },
  blurViewContainer: {
    flex: 1,
    position: "absolute",
    zIndex: 999,
    top: 0,
    height: "100%",
    width: "100%",
  },
  blurViewStyle: { ...StyleSheet.absoluteFillObject },
  scrollViewStyle: { padding: 17 },
  scrollViewContainer: {
    marginTop: insets.top,
    marginHorizontal: moderateScale(15),
  },
});
