import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../../../../constant/responsiveStyle";
import colors from "../../../../../../constant/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    Text: {
      color: colors.SurfCrest,
      fontSize: textScale(24),
      fontWeight: "700",
      width: moderateScale(330),
      marginHorizontal: moderateScale(19),
      marginTop:moderateScale(30)
    },
    flatContainer:{
      marginTop:moderateScale(70)
    }
  });