import { View, StyleSheet, ViewStyle } from "react-native";
import React, { ReactElement } from "react";
import CommonButton from "../../../components/Buttons/commonButton";
import { moderateScale } from "../../../constant/responsiveStyle";
import styles from "./styles";
import { strings } from "../../../constant/strings";
import colors from "../../../constant/colors";

const MultiButton: React.FC<{
  navigation?: any;
  onPress: any;
  buttonContainerStyle?: any;
  onSwiperClick: any;
  screenIndex?: any;
  setScreenIndex?: any;
  setNextSection?: any;
  buttonContainer?: ViewStyle;
  commonButtonStyle?: ViewStyle;
}> = ({
  navigation,
  onPress,
  buttonContainerStyle,
  onSwiperClick,
  screenIndex,
  setScreenIndex,
  setNextSection,
  buttonContainer,
  commonButtonStyle,
}): ReactElement => {
  return (
    <View style={[localStyles.container, buttonContainerStyle]}>
      <CommonButton
        btnName={"Add goal"}
        mainContainer={[styles.buttonContainer, buttonContainer]}
        onPress={() => onPress()}
      />
      <CommonButton
        btnName={"Maybe later"}
        mainContainer={[localStyles?.commonButtonStyle, commonButtonStyle]}
        onPress={() => {
          setNextSection(false);
          setScreenIndex(screenIndex - 1);
        }}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(20),
  },
  cancelText: {
    color: "white",
    fontSize: moderateScale(14),
    alignSelf: "center",
    marginTop: moderateScale(20),
  },
  commonButtonStyle: {
    backgroundColor: colors?.transparent,
    width: moderateScale(100),
    alignSelf: "center",
  },
});

export default MultiButton;
