import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import { strings } from "../../../constant/strings";

const AddButton = ({
  containerStyle,
  onPress,
  isBtnName,
  btnName,
  textColor,
  isPlusIcon = true,
  plusImageStyle,
  textStyle,
  tintColor,
}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}
    >
      {isPlusIcon && (
        <Image
          source={!textColor ? imagePath?.PlusImage : imagePath?.PlusIcon}
          style={plusImageStyle}
          tintColor={tintColor || colors?.white}
        />
      )}
      <Text
        style={[
          styles?.textStyle,
          { color: !textColor ? colors?.royalOrangeDark : textColor },
          textStyle,
        ]}
      >
        {!btnName ? strings?.Other : "   " + btnName}
      </Text>
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors?.royalOrangeDark,
    borderRadius: moderateScale(16),
    borderStyle: "dashed",
    width: "100%",
    marginTop: moderateScale(20),
    flexDirection: "row",
    alignItems: "center",
    paddingStart: moderateScale(19),
  },
  textStyle: {
    fontSize: textScale(14),
    fontWeight: "500",
    marginVertical: moderateScale(20),
    marginHorizontal: moderateScale(15),
  },
});
