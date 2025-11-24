import { StyleSheet } from "react-native";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { textLabelSize } from "../../../utils/TextConfig";

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: moderateScale(19),
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  topContent: {
    marginTop: moderateScale(100),
  },
  bottomContent: {
    marginBottom: moderateScale(20),
  },
  title: {
    fontSize: textScale(24),
    color: colors.SurfCrest,
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
  },
  title1: {
    fontSize: textScale(18),
    color: colors.SurfCrest,
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
    marginTop: moderateScale(5),
  },
  seekerButton: {
    width: "80%",
    marginTop: moderateScale(50),
  },
  clinicianButton: {
    width: "auto",
    marginTop: moderateScale(10),
  },
  orContainer: {
    marginVertical: moderateScale(30),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  orInnerContainer: {
    width: moderateScale(128),
    backgroundColor: colors.SurfCrest,
    height: moderateScale(0.5),
  },
  orText: {
    fontSize: textScale(14),
    color: colors.SurfCrest,
    fontWeight: "400",
  },
  seekerText: {
    fontSize: textScale(14),
    color: colors.polishedPine,
    fontWeight: "400",
  },
  innerContainer: {
    alignItems: "center",
    flex: 1,
    paddingVertical: moderateScale(19),
    paddingHorizontal: moderateScale(19),
    justifyContent: "center",
  },
  titleText: {
    fontSize: textLabelSize?.headerTextSize,
    fontWeight: "600",
    textAlign: "center",
    marginTop: moderateScale(60),
    color: colors?.SurfCrest,
  },
  subtitleText: {
    fontSize: textLabelSize?.subHeaderTextSize,
    fontWeight: "400",
    textAlign: "center",
    marginTop: moderateScale(10),
    color: colors?.royalOrangeDark,
  },
  seekerButtonText: {
    color: colors.SurfCrest,
    fontSize: moderateScale(16),
  },
  createAccountButton: {
    width: "80%",
    marginTop: moderateScale(20),
    backgroundColor: colors?.prussianBlue,
  },
  createAccountButtonText: {
    color: colors.SurfCrest,
    fontSize: moderateScale(16),
  },
  container_: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default styles;
