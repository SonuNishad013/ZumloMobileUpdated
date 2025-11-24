import React from "react";
import {
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
  TextStyle,
} from "react-native";
import colors from "../../constant/colors";
import { imagePath } from "../../assets/png/imagePath";
import { moderateScale } from "../../constant/responsiveStyle";

interface Props {
  title?: any;
  isSelected?: any;
  onPress?: any;
  textStyle?: TextStyle;
}
const ScaleItem: React.FC<Props> = ({
  title,
  isSelected,
  onPress,
  textStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      {isSelected ? (
        <ImageBackground
          source={imagePath?.ScalesCircle}
          style={styles.itemContainer}
          tintColor={colors?.polishedPine}
        >
          <Text
            style={[
              {
                color: colors?.SurfCrest,
              },
            ]}
          >
            {title}
          </Text>
        </ImageBackground>
      ) : (
        <Text style={[{ color: colors?.prussianBlue }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: moderateScale(32),
    height: moderateScale(32),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ScaleItem;
