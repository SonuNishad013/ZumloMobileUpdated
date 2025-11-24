import { StyleSheet } from "react-native";
import { moderateScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

export const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(30),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(1),
    marginTop: moderateScale(30),
  },
  headerText: {
    fontSize: moderateScale(18),
    fontWeight: "500",
    color: colors?.SurfCrest,
  },
  card: {
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(18),
    paddingTop: moderateScale(40),
    paddingBottom: moderateScale(25),
    marginTop: moderateScale(15),
  },
  flatList: {
    paddingHorizontal: moderateScale(12),
  },
  moodMeterContainer: {
    flex: 1,
  },
});
