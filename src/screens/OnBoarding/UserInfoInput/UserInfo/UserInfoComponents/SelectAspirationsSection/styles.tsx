import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../../../../constant/responsiveStyle";
import colors from "../../../../../../constant/colors";

export const styles = StyleSheet.create({
    Text: {
      color: colors.SurfCrest,
      fontSize: textScale(24),
      fontWeight: "700",
      marginTop: moderateScale(30),
      paddingBottom:moderateScale(50),
    },
    addGoal: {
      borderRadius: moderateScale(21),
      borderColor: colors.royalOrange,
      borderWidth:moderateScale(1),
      paddingHorizontal: moderateScale(10),
      height: moderateScale(42),
      color: colors?.white,
    },
    InnerView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: moderateScale(10),
    },
    RenderItem: {
      borderRadius: moderateScale(21),
      backgroundColor: colors.SurfCrest,
      paddingHorizontal: moderateScale(18),
      height:moderateScale(42),
      justifyContent:"center",
    },
    flatListDesign: {
      flex: 0.8,
      marginHorizontal:moderateScale(19)
  
    },
    fLitContainer:{ marginRight:moderateScale(15) ,marginTop:moderateScale(10), flexDirection:"row"  }
  });
  