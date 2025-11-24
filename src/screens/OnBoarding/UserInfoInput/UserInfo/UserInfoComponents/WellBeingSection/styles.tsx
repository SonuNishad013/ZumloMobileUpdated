import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../../../../constant/responsiveStyle";
import colors from "../../../../../../constant/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: moderateScale(30),
      marginHorizontal: moderateScale(19),
    },
    heading: {
      color: colors?.SurfCrest,
      fontSize: textScale(24),
      fontWeight: "700",
    },
    flatList: {
      marginTop: moderateScale(60),
    },
    infoCardContainer: {
      marginVertical: moderateScale(10),
    },
    ownBtnContainer:{
      borderColor: colors.royalOrange,
      marginBottom: moderateScale(20),
    }
  });