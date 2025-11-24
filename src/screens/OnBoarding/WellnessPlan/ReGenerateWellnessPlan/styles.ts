import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";

export const styles = StyleSheet.create({
  titleHeader: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginVertical: moderateScale(30),
  },
  subHeading: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginVertical: moderateScale(5),
    marginBottom: moderateScale(20),
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: moderateScale(30),
    marginBottom: moderateScale(10),
    width:'auto'
  },
});
