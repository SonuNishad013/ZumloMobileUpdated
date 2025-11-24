import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import React from "react";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  title?: any;
  type?: any;
  time?: any;
  mainContainer?: ViewStyle;
  imageContainer?: ViewStyle;
  dataContainer?: ViewStyle;
  titleText?: TextStyle;
  typeText?: TextStyle;
  timeButtonContainer?: ViewStyle;
  timeText?: TextStyle;
  buttonContainer?: ViewStyle;
  onPress?: () => void;
  btnNameStyle?: TextStyle;
  image?: any;
}
const RecommendationCard: React.FC<Props> = ({
  title,
  type,
  time,
  mainContainer,
  imageContainer,
  dataContainer,
  titleText,
  typeText,
  timeButtonContainer,
  timeText,
  buttonContainer,
  onPress,
  btnNameStyle,
  image,
}) => {
  return (
    <View style={[style?.mainContainer, mainContainer]}>
      <View style={[style?.imageContainer, imageContainer]}>
        <Image source={image} />
      </View>
      <View style={[style?.dataContainer, dataContainer]}>
        <Text style={[style?.titleText, titleText]}>{title}</Text>
        <Text style={[style?.typeText, typeText]}>{type}</Text>
        <View style={[style?.timeButtonContainer, timeButtonContainer]}>
          <Text style={[style?.timeText, timeText]}>{time}</Text>
          <View style={[style?.buttonContainer, buttonContainer]}>
            <TouchableOpacity onPress={onPress}>
              <Text style={[style?.btnNameStyle, btnNameStyle]}>START</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors?.polishedPine,
    height: moderateScale(190),
    width: moderateScale(177),
    borderRadius: moderateScale(10),
    overflow: "hidden",
  },
  imageContainer: {
    alignSelf: "flex-end",
    height: moderateScale(90),
  },
  dataContainer: {
    marginHorizontal: moderateScale(11),
  },
  titleText: {
    fontSize: moderateScale(24),
    fontWeight: "700",
    color: colors?.SurfCrest,
  },
  typeText: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  timeButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: moderateScale(11),
  },
  timeText: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  buttonContainer: {
    height: moderateScale(30),
    width: moderateScale(71),
    borderRadius: moderateScale(25),
    backgroundColor: colors?.SurfCrest,
    alignItems: "center",
    justifyContent: "center",
  },
  btnNameStyle: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: colors?.prussianBlue,
  },
});
export default RecommendationCard;
