import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import SnacksDetailsCmnCom from "./SnacksDetailsCmnCom";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { FoodIcon } from "../../../assets";
import navigationString from "../../../navigation/navigationString";
import { style } from "./style";

interface Props {
  nutritionDiet?: any;
  onPress?: any;
  navigation?: any;
  route?: any;
}
const NutritionDietList: React.FC<Props> = ({
  nutritionDiet,
  onPress,
  navigation,
}) => {
  const renderData = (item: any, index: any) => {
    navigation?.navigate(navigationString?.NutritionRecipies, { itm: item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{"Some healthy snacks Recipes"}</Text>
      <FlatList
        keyExtractor={(item, index) => "key" + index}
        data={nutritionDiet}
        renderItem={({ item, index }) => {
          return (
            <SnacksDetailsCmnCom
              onPress={() => renderData(item, index)}
              title={item?.name}
              description={item?.description}
              icon={item?.icon}
              rating={item?.rating}
            />
          );
        }}
      />
      <Text style={styles.showMoreText}>{"SHOW MORE"}</Text>
      <FoodIcon style={styles?.foodIconStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(25),
    marginTop: moderateScale(25),
  },
  headerText: {
    color: colors?.prussianBlue,
    fontSize: textScale(14),
    fontWeight: "600",
    marginTop: moderateScale(20),
    marginBottom: moderateScale(5),
  },
  showMoreText: {
    fontSize: textScale(11),
    fontWeight: "400",
    color: colors?.prussianBlue,
    marginVertical: moderateScale(10),
    alignSelf: "flex-end",
  },
  foodIconStyle: { position: "absolute", bottom: -10, right: -10 },
});

export default NutritionDietList;
