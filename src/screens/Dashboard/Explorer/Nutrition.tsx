import React, { ReactElement } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import SeeAllHeader from "../Planner/commonHeader";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import colors from "../../../constant/colors";

interface Props {
  navigation?: any;
  NutritionData?: any;
}

const Nutrition: React.FC<Props> = ({
  navigation,
  NutritionData,
}): ReactElement => {
  const renderNutrition = (item: any, index: any) => {
    return (
      <View style={styles.nutritionContainer}>
        <ImageBackground
          source={imagePath.nutritionCurved}
          resizeMode="contain"
          style={styles.backgroundImage}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{item?.title}</Text>
          </View>
        </ImageBackground>
        <View style={styles.imageContainer}>
          <Image
            source={imagePath.vegBucket}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {SeeAllHeader("Nutrition", "")}
      <View style={styles.flatListContainer}>
        <FlatList
          data={NutritionData}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item, index }) => renderNutrition(item, index)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(10),
  },
  flatListContainer: {
    marginHorizontal: moderateScale(15),
  },
  nutritionContainer: {
    borderRadius: moderateScale(10),
    height: moderateScale(192),
    backgroundColor: colors.prussianBlue,
    // backgroundColor:'red'
  },
  backgroundImage: {
    height: moderateScale(80),
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    width: moderateScale(200),
  },
  titleText: {
    color: colors.brightGray,
    textAlign: "center",
    fontSize: textScale(14),
    fontWeight: "600",
  },
  imageContainer: {
    backgroundColor: colors.prussianBlue,
    borderRadius: moderateScale(20),
  },
  image: {
    height: moderateScale(111),
    width: width - moderateScale(25),
  },
});

export default Nutrition;
