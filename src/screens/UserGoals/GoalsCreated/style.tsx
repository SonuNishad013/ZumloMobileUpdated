import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

export const style = StyleSheet.create({
    backgroundImage: {
      flex: 1,
    },
    viewMainContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    txtTitle: {
      fontSize: textScale(24),
      fontWeight: "700",
      color: colors.SurfCrest,
      textAlign: "center",
    },
    txtdes: {
      fontSize: textScale(14),
      fontWeight: "400",
      color: colors.SurfCrest,
      textAlign: "center",
      marginTop: moderateScale(15),
    },
    buttonContainer: {
      width: moderateScale(242),
      marginTop: moderateScale(35),
    },
  });