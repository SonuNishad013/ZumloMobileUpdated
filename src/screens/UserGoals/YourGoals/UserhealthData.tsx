import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale } from "../../../constant/responsiveStyle";
import YoursGoalsGraph from "../zUserGoalscomponents/yoursGoalsGraph";
import navigationString from "../../../navigation/navigationString";
import colors from "../../../constant/colors";

interface Props {
  data?: any;
  navigation?: any;
}
const UserhealthData: React.FC<Props> = ({ data, navigation }) => {
  const getbackgroundColor = (name: any) => {
    switch (name) {
      case "circleChart":
        return colors.prussianBlue;
      case "Bar":
        return colors.OceanGreen;
      case "Chart":
        return colors.backgroundTheme;
      case "lineChart":
        return colors.darkPrussianBlue;
      default:
        break;
    }
  };
  return (
    <View style={style?.detailsListMainContainer}>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item }) => {
          return (
            <>
              <YoursGoalsGraph
                title={item?.title}
                value={item?.value}
                meter={item?.meter}
                lastUpdate={item?.lastUpdate}
                onPress={() =>
                  navigation.navigate(navigationString?.MyActivity)
                }
                graphName={item.graphName}
                graphData={item?.graphData}
                mainContainer={{
                  backgroundColor: getbackgroundColor(item.graphName),
                }}
              />
            </>
          );
        }}
      />
    </View>
  );
};

export default UserhealthData;

const style = StyleSheet.create({
  detailsListMainContainer: {
    flexDirection: "row",
    marginHorizontal: moderateScale(15),
    flexWrap: "wrap",
    marginTop: moderateScale(18),
  },
});
