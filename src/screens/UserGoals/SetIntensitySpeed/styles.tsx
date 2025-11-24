import { StyleSheet } from "react-native";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";

const styles = StyleSheet.create({
    // renderSpeedArea
    speedAreaMainContainer: {
      marginHorizontal: moderateScale(19.5),
    },
    titleTextStyle: {
      fontSize: textScale(24),
      fontWeight: "700",
      color: colors?.prussianBlue,
      marginTop: moderateScale(25),
    },
    speedDataContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    valXContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  
    valContainer: {
      alignItems: "flex-end",
    },
    xStyle: {
      fontSize: textScale(106),
      color: colors?.prussianBlue,
      fontWeight: "700",
      opacity: 0.4,
      position: "relative",
      top: moderateScale(25),
    },
  
    xContainer: {
      justifyContent: "flex-end",
      marginHorizontal: moderateScale(5),
    },
    oneToFiveContainer: {
      borderWidth: 1,
      width: moderateScale(314),
      height: moderateScale(80),
      borderRadius: moderateScale(35),
      borderColor: colors?.SaltBox,
      alignItems: "center",
      justifyContent: "center",
    },
    flatlistTouchStyle: {
      backgroundColor: colors?.SaltBox,
      borderRadius: moderateScale(10),
      height: moderateScale(54),
      width: moderateScale(54),
      justifyContent: "center",
      alignItems: "center",
    },
    valStyle: {
      fontSize: textScale(14),
      fontWeight: "600",
      color: colors?.prussianBlue,
      padding: moderateScale(15),
    },
    btnContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
  
    // renderBtmButton
    btmButtonMainContainer: {
      position: "absolute",
      bottom: moderateScale(20),
      alignSelf: "center",
    },
    trainingText: {
      color: colors?.SaltBox,
      fontWeight: "400",
      fontSize: textScale(14),
      alignSelf: "center",
      marginTop: moderateScale(10),
    },
    valTextStyle: {
      fontSize: textScale(180),
      color: colors?.royalOrange,
      fontWeight: "700",
    },
  });

export default styles;