import {
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  value?: any;
  onChangeText?: any;
  newSpecInputView?: ViewStyle;
  newSpecInput?: TextStyle;
  placeholder?: any;
  isFocused?: string;
  placeholderTextColor?: any;
}
const TextInputStretch: React.FC<Props> = ({
  value,
  onChangeText,
  newSpecInputView,
  newSpecInput,
  placeholder,
  isFocused,
  placeholderTextColor,
}) => {
  const textInputRef = useRef<TextInput>(null); // used for opening keyboard and showing input box at the same time
  useEffect(() => {
    // used for opening keyboard and showing input box at the same time
    console.log("isFocused", isFocused);
    if (isFocused === "True") {
      textInputRef?.current?.focus();
    } else {
      textInputRef?.current?.blur();
    }
  }, [isFocused]);

  return (
    <View style={[styles.newSpecInputView, newSpecInputView]}>
      <TextInput
        ref={textInputRef}
        textAlignVertical={"top"}
        style={[styles.newSpecInput, newSpecInput]}
        placeholder={placeholder || "Describe other"}
        multiline
        numberOfLines={5}
        placeholderTextColor={placeholderTextColor || colors.grey}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TextInputStretch;

const styles = StyleSheet.create({
  newSpecInput: {
    // height: moderateScale(60),
    width: "auto",
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.SurfCrest,
    paddingVertical: moderateScale(11),
  },
  newSpecInputView: {
    width: "auto",
    borderWidth: moderateScale(1),
    borderColor: colors.SurfCrest,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    minHeight: moderateScale(60),
    justifyContent: "center",
    maxHeight: moderateScale(150),
    marginHorizontal: moderateScale(19),
    // paddingVertical:moderateScale(15)
  },
});
