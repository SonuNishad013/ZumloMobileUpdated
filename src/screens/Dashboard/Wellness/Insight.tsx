import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import CommonButton from "../../../components/Buttons/commonButton";

interface Props {
  onPress?: () => void;
  insightsItem?: any;
}

const Insight: React.FC<Props> = ({ onPress, insightsItem }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{insightsItem?.title}</Text>
      <Text style={styles.description}>{insightsItem?.description}</Text>
      <CommonButton
        onPress={onPress}
        btnName={insightsItem?.btnName}
        mainContainer={styles.buttonContainer}
      />
    </View>
  );
};

export default Insight;

const styles = StyleSheet.create({
  container: {
    height: "auto",
    borderWidth: moderateScale(1),
    padding: moderateScale(14),
    borderRadius: moderateScale(15),
    borderColor: colors?.royalOrange,
    marginTop: moderateScale(30),
  },
  title: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.lightBlack,
  },
  description: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.lightBlack,
    marginTop: moderateScale(6),
  },
  buttonContainer: {
    height: moderateScale(30),
    width: moderateScale(151),
    alignSelf: "flex-end",
    marginTop: moderateScale(5),
  },
});
