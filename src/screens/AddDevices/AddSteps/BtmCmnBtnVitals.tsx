import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CommonButton from "../../../components/Buttons/commonButton";
import { moderateScale } from "../../../constant/responsiveStyle";
import { strings } from "../../../constant/strings";

interface Props {
  createVitalsManually?: () => void;
  CTAButton?: string;
}
const BtmCmnBtnVitals: React.FC<Props> = ({
  createVitalsManually,
  CTAButton,
}) => {
  return (
    <CommonButton
      mainContainer={{
        width: "auto",
        marginTop: moderateScale(30),
      }}
      btnName={CTAButton || strings?.submit}
      onPress={createVitalsManually}
    />
  );
};

export default BtmCmnBtnVitals;

const styles = StyleSheet.create({});
