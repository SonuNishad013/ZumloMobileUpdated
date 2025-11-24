import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

export const style = StyleSheet.create({
    // renderHeader
    headerMainContainer: {
      backgroundColor: colors?.prussianBlue,
      height: moderateScale(70),
      paddingTop: moderateScale(10),
      borderBottomLeftRadius: moderateScale(30),
      borderBottomRightRadius: moderateScale(30),
      paddingHorizontal: moderateScale(17),
    },
  
    // renderTimePicker
    TimePickerMainContainer: {
      marginTop: moderateScale(35),
    },

    datePickerMainContainer: {
      alignSelf: "center",
      marginTop: moderateScale(35),
    },
    selectDateTxt: {
      fontSize: textScale(14),
      color: colors?.LividBrown,
      fontWeight: "600",
    },
  
    valPickerContainer: {
      height: moderateScale(261.4),
      backgroundColor: colors?.SaltBox,
      borderRadius: moderateScale(15),
      justifyContent: "center",
      marginTop: moderateScale(7),
    },
    timePickerContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  
    // renderBtmButton
    BtmButtonMainContainer: {
      position: "absolute",
      bottom: moderateScale(20),
      alignSelf: "center",
    },
    flatBtm:{
        paddingBottom: moderateScale(90),
      }
  });