import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  selectedTouchable?: ViewStyle;
  onPress?: any;
  selectedItem?: ViewStyle;
  selectedText?: TextStyle;
  title?: any;
}
const FrequencyArea: React.FC<Props> = ({
  selectedTouchable,
  onPress,
  selectedItem,
  selectedText,
  title,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.touchableContainer, selectedTouchable]}
    >
      <View style={[styles.itemView, selectedItem]}>
        <Text style={[styles.itemText, selectedText]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FrequencyArea;

const styles = StyleSheet.create({
  touchableContainer: {
    borderRadius: moderateScale(25),
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  itemView: {
    backgroundColor: colors?.transparent,
    padding: moderateScale(10),
    borderRadius: moderateScale(25),
    overflow: "hidden",
  },
  itemText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.prussianBlue,
    paddingHorizontal: moderateScale(10),
  },
});
