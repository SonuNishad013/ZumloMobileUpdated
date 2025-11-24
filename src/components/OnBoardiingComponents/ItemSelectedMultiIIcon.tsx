import {
  Image,
  ImageBackground,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { imagePath } from "../../assets/png/imagePath";
import { moderateScale, textScale } from "../../constant/responsiveStyle";

interface Props {
  container?: ViewStyle;
  onPress?: () => void;
  innerCircle?: ViewStyle;
  imageBackground?: ImageStyle;
  imageStyle?: ImageStyle;
  titleStyle?: TextStyle;
  title?: any;
  source?: any;
}
const ItemSelectedMultiIIcon: React.FC<Props> = ({
  container,
  onPress,
  imageBackground,
  innerCircle,
  imageStyle,
  titleStyle,
  title,
  source,
}) => {
  return (
    <View style={[styles.container, container]}>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground
          source={source}
          style={[styles.imageBackground, imageBackground]}
        >
          <View style={[styles.innerCircle, innerCircle]}>
            <Image
              source={imagePath?.PlusIcon}
              style={[styles.imageStyle, imageStyle]}
            />
            <Text numberOfLines={2} style={[styles.titleStyle, titleStyle]}>
              {title}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default ItemSelectedMultiIIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: moderateScale(10),
  },
  imageBackground: {
    height: moderateScale(135),
    width: moderateScale(135),
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: moderateScale(120),
    width: moderateScale(120),
    borderRadius: moderateScale(120),
    borderWidth: moderateScale(1),
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    height: moderateScale(20),
    width: moderateScale(20),
    marginTop: moderateScale(15),
  },
  titleStyle: {
    fontSize: textScale(10),
    fontWeight: "600",
    marginTop: moderateScale(10),
    textAlign: "center",
    height: moderateScale(30),
    width: moderateScale(90),
  },
});
