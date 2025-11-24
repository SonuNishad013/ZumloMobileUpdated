import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.themeColor,
  },
  headerMCon: { marginBottom: moderateScale(15), marginTop: moderateScale(15) },
  headerICon: { backgroundColor: colors?.backIconBg },

  innerView: {
    // width: moderateScale(350),
    // alignSelf: "center",
  },
  OuterView: {
    paddingTop: moderateScale(20),
    gap: moderateScale(15),
  },
  DeviceStatusView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Bptext: {
    color: colors?.royalOrange,
    fontWeight: "600",
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
  },
  DeviceStatustext: {
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
  },
  SelectDateTimeText: {
    fontWeight: "600",
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    marginTop: moderateScale(30),
  },
  DateTimeView: {
    flexDirection: "row",
    flex: 1,
    gap: moderateScale(20),
    marginTop: moderateScale(10),
  },
  DateTimeOuterView: {
    borderRadius: moderateScale(10),
    borderColor: colors?.royalOrange,
    borderWidth: moderateScale(1),
    height: moderateScale(56),
    justifyContent: "center",
    flex: 1,
    backgroundColor: "red",
  },
  metersView: {
    borderRadius: moderateScale(10),
    borderColor: colors?.royalOrange,
    borderWidth: moderateScale(1),
    height: moderateScale(56),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(10),
  },
  counterView: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  valueText: {
    fontWeight: "600",
    color: colors?.SurfCrest,
    fontFamily: "Poppins-Regular",
  },
  countText: {
    fontWeight: "500",
    color: colors?.royalOrange,
  },
  dateView: {
    width: moderateScale(160),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(15),
    height: moderateScale(56),
    justifyContent: "center",
    borderColor: colors?.polishedPine,
    paddingHorizontal: moderateScale(9),
  },
  dateHeight: {
    height: moderateScale(20),
  },
  grayColor: {
    color: colors?.prussianBlue,
    fontSize: textScale(14),
    fontWeight: "400",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateTxtStyle: {
    fontSize: textScale(15),
    color: "#999999",
    fontFamily: "Nunito",
  },
  errorShow: {
    top: -20,
    left: -10,
  },

  datePickerMainContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(10),
    borderColor: colors?.royalOrange,
    borderWidth: moderateScale(1),
    height: moderateScale(56),
    paddingHorizontal: moderateScale(15),
  },
  datePickerText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginStart: moderateScale(10),
  },
  timePicker: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    flex: 1,
  },
  mainViewContainer: { marginHorizontal: moderateScale(19) },
  scroolBtm: {
    paddingBottom: moderateScale(30),
  },
  scrollView: { flex: 1 },
});
