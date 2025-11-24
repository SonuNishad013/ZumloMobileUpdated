import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CommonInput from "../../../components/Inputs/commonInput";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";
import { moderateScale } from "../../../constant/responsiveStyle";

interface Props {
  onChangeText?: any;
  bloodPressuredescription?: string;
}
const InputFeel: React.FC<Props> = ({
  onChangeText,
  bloodPressuredescription,
}) => {
  return (
    <CommonInput
      placeholderTextColor={colors?.SurfCrest}
      placeholder={bloodPressuredescription || "Describe more..."}
      textAlignVertical={"top"}
      backGroundColor={"transparent"}
      borderColor={colors?.royalOrange}
      multiline={true}
      writeWordsStyle={{ color: colors?.SurfCrest }}
      mainContainer={{
        height: moderateScale(162),
        borderColor: colors?.royalOrange,
      }}
      inputText={{ height: moderateScale(130), color: colors?.SurfCrest }}
      isWidth={false}
      onChangeText={onChangeText}
    />
  );
};

export default InputFeel;

const styles = StyleSheet.create({});
