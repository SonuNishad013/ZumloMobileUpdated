import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../../../../constant/responsiveStyle";
import colors from "../../../../../../constant/colors";

export const styles = StyleSheet.create({

    container:{
      flex:1,
    },
    mainContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: moderateScale(100),
    },
    imageView: {
      height: moderateScale(175),
      width: moderateScale(175),
      borderRadius: moderateScale(90),
      marginTop: moderateScale(100),
      alignSelf:'center'
    },
    questionContainer: {
      marginTop: moderateScale(40),
      marginHorizontal: moderateScale(19),
    },
 
    questionNumber: {
      fontSize: textScale(25),
      fontWeight: "500",
      color: colors.SurfCrest,
    },
 
    questionText: {
      fontSize: textScale(24),
      fontWeight: "700",
      color: colors.SurfCrest,
      marginLeft: moderateScale(5),
    },
    nameText: {
      fontSize: textScale(14),
      fontWeight: "400",
      color: colors.SurfCrest,
      marginTop: moderateScale(10),
      marginLeft: moderateScale(5),
    },
    inputContainer: {
      borderColor: colors.royalOrange,
      marginTop: moderateScale(20),
    },
    inputText: {
      color: colors.SurfCrest,
    },
  });