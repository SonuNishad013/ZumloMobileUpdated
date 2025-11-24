import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import React from "react";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { imagePath } from "../../../../assets/png/imagePath";

interface AddButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  txt?: string;
  textStyle?: StyleProp<TextStyle>;
  tintColor?: string;
}

const AddButton: React.FC<AddButtonProps> = ({
  containerStyle,
  onPress,
  txt,
  textStyle,
  tintColor,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, containerStyle]}>
      <Text style={[styles.text, textStyle]}>
        <Image source={imagePath?.PlusImage} tintColor={tintColor} /> {txt}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: moderateScale(1),
    borderColor: colors?.royalOrangeDark,
    borderRadius: moderateScale(16),
    borderStyle: "dashed",
    width: "100%",
    // justifyContent: "center",
  },
  text: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.royalOrangeDark,
    marginVertical: moderateScale(20),
    marginHorizontal: moderateScale(15),
  },
});

export default AddButton;
