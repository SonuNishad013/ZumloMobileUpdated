import { StyleSheet } from "react-native";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";

export const styles = StyleSheet.create({
  Goalcard: {
    // backgroundColor: "red",
  },
  card: {
    backgroundColor: "#002C46",
    borderTopLeftRadius: moderateScale(40),
    borderTopRightRadius: moderateScale(40),
    padding: moderateScale(20),
    margin: moderateScale(20),
    paddingBottom: moderateScale(40),
    // width: width,
  },
  cardTitle: {
    fontSize: textScale(18),
    fontWeight: "bold",
    color: colors.SurfCrest,
    marginBottom: moderateScale(20),
  },
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateScale(25),
    borderBottomWidth: 0.5,
    borderBottomColor: "#355366",
    paddingBottom: moderateScale(15),
  },
  progressCircle: {
    width: moderateScale(70),
    height: moderateScale(70),
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    position: "absolute",
    color: colors.SurfCrest,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: textScale(12),
  },
  subText: {
    fontWeight: "normal",
    fontSize: textScale(10),
    color: colors.SurfCrest,
  },
  goalDetails: {
    flex: 1,
    marginLeft: moderateScale(15),
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  goalSubtitle: {
    fontSize: 13,
    color: colors.SurfCrest,
    marginTop: moderateScale(2),
  },
  arrow: {
    fontSize: 24,
    color: colors.SurfCrest,
  },
});
