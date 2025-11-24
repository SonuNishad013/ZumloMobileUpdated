import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import BoxButtonIcon from "./BoxButtonIcon";
import { imagePath } from "../../assets/png/imagePath";
import { formatSentenceCase } from "../../helper/sentenceCase";
import CustomImage from "../ImageRender";

interface Props {
  source?: any;
  title?: any;
  itemContainer?: ViewStyle;
  iconContainer?: ViewStyle;
  isSelected?: any;
  onPress?: () => void;
  text?: TextStyle;
  touchableOpacity?: ViewStyle;
  tintIconColor?: any;
}
const MealSelecter: React.FC<Props> = ({
  source,
  title,
  itemContainer,
  iconContainer,
  isSelected,
  onPress,
  text,
  touchableOpacity,
  tintIconColor,
}) => {
  return (
    <View style={[styles.itemContainer, itemContainer]}>
      <View style={[styles.iconContainer, iconContainer]}>
        {isSelected && (
          <BoxButtonIcon
            button={styles.boxButton}
            source={imagePath?.Tick}
            image={styles.boxButtonImage}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.touchableOpacity, touchableOpacity]}
      >
        {/* <Image source={source}  
        resizeMode="contain"
        style={{
        height:moderateScale(50),
        width:moderateScale(80)}}
        
        /> */}
        <CustomImage
          source={source}
          width={moderateScale(80)}
          height={moderateScale(50)}
          style={styles?.imageStyle}
          isTintColor={false}
        />
        <Text style={[styles.text, text]}>{formatSentenceCase(title)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MealSelecter;

const styles = StyleSheet.create({
  itemContainer: {
    height: moderateScale(110),
    marginTop: moderateScale(10),
    alignItems: "center",
  },
  iconContainer: {
    flex: 1,
    width: moderateScale(0.7),
    backgroundColor: colors?.lightGrey,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  boxButton: {
    height: moderateScale(26),
    width: moderateScale(26),
    borderRadius: moderateScale(13),
    backgroundColor: colors?.polishedPine,
    borderWidth: moderateScale(0),
    justifyContent: "center",
  },
  boxButtonImage: {
    height: moderateScale(20),
    width: moderateScale(20),
    marginTop: moderateScale(7),
  },
  touchableOpacity: {
    alignItems: "center",
    marginTop: moderateScale(-10),
  },
  text: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginTop: moderateScale(12),
  },
  imageStyle: {
    height: moderateScale(50),
    width: moderateScale(50),
    marginTop: moderateScale(15),
  },
});
