import { StyleSheet } from "react-native";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

const VitalSummaryStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(30),
  },
  monthButtonTextContain: {
    padding: moderateScale(15),
    flex: 1,
    borderRadius: moderateScale(30),
    alignItems: "center",
  },
  monthButtonContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.09)",
    marginTop: moderateScale(10),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: moderateScale(30),
  },
  graphXaxisLabel: {
    color: colors.SurfCrest,
    fontSize: textScale(8),
  },
  graphYaxisText: {
    color: colors.SurfCrest,
    fontSize: textScale(7),
  },
  headerMainContainer: {
    marginHorizontal: moderateScale(19),
    marginBottom: moderateScale(10),
    marginTop: moderateScale(15),
  },
  scrollableContainer: { paddingHorizontal: moderateScale(19), flex: 1 },
  durationButtonContainer: {
    borderBottomWidth: 1,
    height: moderateScale(25),
    width: width / 3.4,
    justifyContent: "center",
    alignItems: "center",
  },
  monthName: { color: colors?.SurfCrest, fontWeight: "600" },
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  durationContainer: { flexDirection: "row", justifyContent: "space-between" },
  commonHistoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  commonHistoryText: { fontSize: 14, fontWeight: "600", color: "#CBE2D1" },
  commonHistoryTextSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#CBE2D1",
    marginTop: moderateScale(5),
  },
  commonHistoryDashline: {
    flex: 1,
    borderBottomColor: "#FFFFFF47",
    borderBottomWidth: 1,
  },
  containerFitbit: {
    flex: 1,
    backgroundColor: colors?.backgroundTheme,
  },
  innerView: {
    marginHorizontal: moderateScale(19),
  },
  pairDeviceOuterView: {
    paddingTop: moderateScale(100),
  },
  pairDeviceView: {
    alignItems: "center",
    height: moderateScale(200),
    justifyContent: "space-between",
  },
  line: {
    borderBottomWidth: 0.4, // Adjust the width of the line as needed
    borderBottomColor: colors?.SurfCrest, // Adjust the color of the line as needed
    marginTop: moderateScale(30), // Adjust vertical spacing as needed
    width: moderateScale(272),
    alignSelf: "center",
  },
  PairDeviceTextView: {
    marginTop: moderateScale(20),
    alignItems: "center",
  },
  DevicePairedText: {
    color: colors?.royalOrangeDark,
    fontWeight: "600",
  },
  nextToViewText: {
    fontWeight: "400",
    color: colors?.SurfCrest,
    textAlign: "center",
    marginTop: moderateScale(10),
  },
  ButtonsView: {
    position: "absolute",
    top: moderateScale(450),
    alignSelf: "center",
    marginTop: moderateScale(30),
  },
  backToDashboard: {
    alignItems: "center",
    marginTop: moderateScale(50),
  },
  backToDashboardText: {
    fontWeight: "500",
    color: colors?.royalOrangeDark,
  },
  loaderContainer: {
    width: 200,
    height: height * 0.5,
    alignSelf: "center",
  },
});

export default VitalSummaryStyles;
