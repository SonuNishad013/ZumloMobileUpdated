import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import SnacksDetailsCmnCom from "../NutritionDetails/SnacksDetailsCmnCom";
import { imagePath } from "../../../assets/png/imagePath";

interface Props {
  data: any;
}
const SavedLists: React.FC<Props> = ({ data }) => {
  const renderItems = (item: any, index: any) => {
    console.log("first=-0", item);
    return (
      <View>
        <SnacksDetailsCmnCom
          title={item?.name}
          description={item?.description}
          icon={item?.icon}
          rating={item?.rating}
          bookmark={item?.bookmark}
        />
      </View>
    );
  };

  return (
    <View>
      <View style={styles.rowContainer}>
        <Text style={styles.totalText}>{"07"}</Text>
        <Text style={styles.totalRecipesText}>{"Total Recipes"}</Text>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item, index }) => renderItems(item, index)}
        />
      </View>
    </View>
  );
};

export default SavedLists;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
  },
  totalText: {
    color: colors.prussianBlue,
    fontWeight: "500",
    fontSize: textScale(14),
  },
  totalRecipesText: {
    color: colors.prussianBlue,
    fontWeight: "400",
    fontSize: textScale(10),
    alignSelf: "flex-end",
    paddingBottom: moderateScale(1),
    marginLeft: moderateScale(2),
  },
  flatListContainer: {
    marginHorizontal: moderateScale(5),
  },
});
