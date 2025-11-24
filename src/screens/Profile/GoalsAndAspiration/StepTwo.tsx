import {
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { imagePath } from "../../../assets/png/imagePath";
import { capitalizeFirstLetter } from "../../../validations/capitalizeFirstLetter";
import FastImage from "react-native-fast-image";
import { GOALS } from "../../../constant/ENUM";

const StepTwo = ({ onPress, data, from }: any) => {
  const getColor = (item: any) => {
    switch (item.codeName) {
      case GOALS?.Developing_New_Skill:
        return colors.SaltBox;
      case GOALS?.Physical_Health_Goals:
        return colors.prussianBlue;
      case GOALS?.Mental_Health_Goals:
        return colors.SurfCrest;
      case GOALS?.Emotional_Well_Being_Goals:
        return colors.SurfCrest;
      case GOALS?.Educational_Goals:
        return colors.themeColor;
      case GOALS?.Financial_Goals:
        return colors.SurfCrest;
      case GOALS?.Enhancing_Existing_Skill:
        return colors.SurfCrest;
      case GOALS?.Professional_Goals:
        return colors.prussianBlue;
      default:
    }
  };
  return (
    <>
      <ImageBackground
        style={styles?.container}
        source={imagePath?.GoalsSpiral}
      >
        <Text style={styles?.titleText}>
          {"Choose a focus area for your next goal"}
        </Text>

        <FlatList
          data={data}
          horizontal
          keyExtractor={(item, index) => "key" + index}
          contentContainerStyle={styles?.addTop}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles?.mainView}
                onPress={() => onPress(item.codeName, item)}
              >
                <FastImage
                  source={{
                    uri: item.imageURL,
                    priority: FastImage.priority.normal,
                  }}
                  style={styles?.imageStyle}
                  resizeMode={FastImage.resizeMode.contain}
                >
                  <Text
                    style={[
                      styles?.subtitleText,
                      { color: getColor(item), textAlign: "center" },
                    ]}
                  >
                    {capitalizeFirstLetter(item?.codeName)}
                  </Text>
                </FastImage>
              </TouchableOpacity>
            );
          }}
        />
      </ImageBackground>
    </>
  );
};

export default StepTwo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors?.SurfCrest,
    margin: moderateScale(20),
  },
  addTop: {
    marginTop: moderateScale(20),
  },
  mainView: {
    marginLeft: moderateScale(20),
    height: moderateScale(289),
  },
  imageStyle: {
    height: moderateScale(289),
    width: moderateScale(191),
    padding: moderateScale(15),
  },
  subtitleText: {
    fontSize: textScale(24),
    fontWeight: "700",
  },
});
