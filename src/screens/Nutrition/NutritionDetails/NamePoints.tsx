import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

interface Props {
  data?: any;
}
const NamePoints: React.FC<Props> = ({ data }) => {
  const renderitem = (item: any, index: any) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.innerItemContainer} />
        <Text style={styles.NameContainer}>{item?.name}</Text>
      </View>
    );
  };
  const RenderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.heyTextStyle}>
          {"Hi,"}
          <Text style={styles.userNameStyle}>{" Selena James!"}</Text>
        </Text>
        <Text style={styles.textDesciption}>
          {"Here are some of the healthy eating tips"}
        </Text>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item, index }) => renderitem(item, index)}
        contentContainerStyle={{ marginTop: moderateScale(20) }}
        ListHeaderComponent={() => RenderHeader()}
      />
    </View>
  );
};

export default NamePoints;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    marginVertical: moderateScale(20),
  },
  heyTextStyle: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors.prussianBlue,
  },
  userNameStyle: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors.prussianBlue,
  },
  textDesciption: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.prussianBlue,
  },

  iconStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(86),
    width: moderateScale(92),
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: moderateScale(3),
  },
  innerItemContainer: {
    height: moderateScale(4),
    width: moderateScale(4),
    borderRadius: moderateScale(4),
    backgroundColor: colors.prussianBlue,
  },
  NameContainer: {
    marginHorizontal: moderateScale(10),
    color: colors.prussianBlue,
    fontSize: textScale(14),
    fontWeight: "400",
  },
});
