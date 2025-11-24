import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CommonButton from "../../../../components/Buttons/commonButton";
import { moderateScale } from "../../../../constant/responsiveStyle";
import { strings } from "../../../../constant/strings";
import colors from "../../../../constant/colors";

interface Props {
  onPressUpdate?: () => void;
  onPresCancel?: () => void;
  updateButtonLabel?: string;
  cancelButtonLabel?: string;
}
const UpdateCancelBtn: React.FC<Props> = ({
  onPressUpdate,
  onPresCancel,
  updateButtonLabel,
  cancelButtonLabel,
}) => {
  return (
    <>
      <CommonButton
        onPress={onPressUpdate}
        mainContainer={{
          height: moderateScale(52),
          marginTop: moderateScale(40),
          width: "auto",
        }}
        btnName={updateButtonLabel ?? strings?.update}
      />

      <CommonButton
        onPress={onPresCancel}
        mainContainer={{
          height: moderateScale(52),
          width: "auto",
          backgroundColor: "transparent",
        }}
        btnNameStyle={{ color: colors.prussianBlue }}
        btnName={cancelButtonLabel ?? "CANCEL"}
      />
    </>
  );
};

export default UpdateCancelBtn;

const styles = StyleSheet.create({});
