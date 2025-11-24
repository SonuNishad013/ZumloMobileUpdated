import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";


export const styles = StyleSheet.create({
    headerText: {
      fontSize: textScale(24),
      fontWeight: "500",
      color: colors?.SurfCrest,
    },
    flatListStyle: {
      marginHorizontal: moderateScale(19),
      flex: 1,
      gap: moderateScale(15),
    },
    subHeaderText: {
      fontSize: textScale(14),
      fontWeight: "500",
      color: colors?.SurfCrest,
      marginTop: moderateScale(5),
      marginBottom: moderateScale(25),
    },
    columnWrapperStyle: {
      justifyContent: "space-between",
    },
  });