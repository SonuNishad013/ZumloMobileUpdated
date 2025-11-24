import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { formatSentenceCase } from "../../../../helper/sentenceCase";
interface HeaderCategoryItemProps {
  item: { codeName: string }; // Adjust type for 'item' as needed
  index: number;
  onPress: (index: number) => void;
  container2?: ViewStyle;
  touchableOpacity?: ViewStyle;
  text?: TextStyle;
  divider?: ViewStyle;
}

export const HeaderCategoryItem: React.FC<HeaderCategoryItemProps> = ({
  item,
  index,
  onPress,
  touchableOpacity,
  text,
  divider,
}) => {
  return (
    <TouchableOpacity
      style={[defaultStyles.touchableOpacity, touchableOpacity]}
      activeOpacity={0.8}
      onPress={() => onPress(index)}
    >
      <Text style={[defaultStyles.text, text]}>
        {formatSentenceCase(item?.codeName)}
      </Text>
      <View style={[defaultStyles.divider, divider]} />
    </TouchableOpacity>
  );
};

const defaultStyles = StyleSheet.create({
  container2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(30),
    marginHorizontal: moderateScale(19),
    marginBottom: moderateScale(20),
  },
  touchableOpacity: {
    justifyContent: "flex-end",
  },
  text: {
    fontSize: textScale(12),
    alignSelf: "center",
    fontWeight: "400",
    paddingBottom: moderateScale(12),
    textAlign: "center",
  },
  divider: {
    height: moderateScale(1.5),
  },
});
