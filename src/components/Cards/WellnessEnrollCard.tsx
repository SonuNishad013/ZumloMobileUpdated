import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import CommonButton from "../Buttons/commonButton";

interface Props {
    title?:string
    type?:string
    generated?:string
    btnName?:string
}
const WellnessEnrollCard: React.FC<Props> = ({title,type,generated,btnName}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {title}
      </Text>
      <View style={styles.buttonContainer}>
        <CommonButton
          btnName={type}
          mainContainer={styles.button}
          btnNameStyle={{ color: "#F5F7F8" }}
        />
        <CommonButton
          btnName={generated}
          mainContainer={{
            ...styles.largeButton,
            backgroundColor: colors?.SurfCrest,
          }}
          btnNameStyle={{ color: colors?.prussianBlue }}
        />
      </View>
      <CommonButton
        btnName={btnName}
        mainContainer={{
          ...styles.bottomButton,
        }}
        btnNameStyle={{ color: colors?.SurfCrest }}
      />
    </View>
  );
};

export default WellnessEnrollCard;
const styles = StyleSheet.create({
    container: {
      backgroundColor: colors?.SaltBox,
      borderRadius: moderateScale(20),
      paddingTop: moderateScale(23),
      paddingHorizontal: moderateScale(15),
      paddingBottom: moderateScale(20),
    },
    text: {
      fontSize: textScale(14),
      fontWeight: "400",
      color: colors?.white,
    },
    buttonContainer: {
      flexDirection: "row",
      marginTop: moderateScale(15),
      gap: moderateScale(10),
    },
    button: {
      width: moderateScale(85),
      height: moderateScale(27),
      backgroundColor: colors?.royalOrange,
    },
    largeButton: {
      width: moderateScale(177),
      height: moderateScale(27),
    },
    bottomButton: {
      width: moderateScale(297),
      height: moderateScale(49),
      marginTop: moderateScale(20),
      alignSelf: "center",
    },
  });