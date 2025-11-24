import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale } from "../../../constant/responsiveStyle";
import InfoCard from "../zUserGoalscomponents/infoCard";

interface Props {
  listData?: any;
}

const GoalsList: React.FC<Props> = ({ listData }) => {
  return (
    <FlatList
      data={listData}
      style={style.flatList}
      keyExtractor={(item, index) => "key" + index}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={style.separator} />}
      renderItem={({ item }) => {
        return (
          <View>
            <InfoCard
              title={item?.title}
              description={item?.description}
              image={item?.image}
            />
          </View>
        );
      }}
      contentContainerStyle={style.flatListContainer}
    />
  );
};

export default GoalsList;
const style = StyleSheet.create({
  flatList: {
    marginTop: moderateScale(20),
  },
  separator: {
    marginTop: moderateScale(20),
  },
  flatListContainer: {
    paddingBottom: moderateScale(100),
  },
});
