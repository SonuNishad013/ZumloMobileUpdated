import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import Picker from "react-native-animated-wheel-picker";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

interface Props {
  pickerData?: any;
  title?: any;
  mainContainer?: ViewStyle;
  onSelected?: any;
}

const TimePicker: React.FC<Props> = ({
  pickerData,
  title,
  mainContainer,
  onSelected,
}) => {
  return (
    <View style={[styles.mainContainer, mainContainer]}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <Picker
        pickerData={pickerData}
        textStyle={styles.pickerText}
        onSelected={onSelected}
        itemHeight={70}
        visible={3}
        style={styles.pickerContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: moderateScale(90),
    height: moderateScale(190),
  },
  titleContainer: {
    backgroundColor: colors.SurfCrest,
    width: moderateScale(70),
    borderRadius: moderateScale(20),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 2,
    top: moderateScale(11),
    paddingVertical: moderateScale(5),
  },
  titleText: {
    fontSize: textScale(14),
    fontWeight: "400",
    backgroundColor: colors.SurfCrest,
  },
  pickerText: {
    fontSize: textScale(24),
    fontWeight: "700",
  },
  pickerContainer: {
    paddingBottom: 10,
    zIndex: 1,
  },
});

export default TimePicker;
