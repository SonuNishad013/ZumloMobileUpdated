import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import SeeAllHeaderWellness from "./commonHeader";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { StopIcon } from "../../../assets";

interface Props {
  healthInsightsData?: any;
}

const HealthInsightsWellness: React.FC<Props> = ({ healthInsightsData }) => {
  const renderFlatListData = (item: any, index: any) => {
    return (
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.title}>{item?.title}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{item?.value}</Text>
            <Text style={styles.meter}>{item?.meter}</Text>
          </View>
        </View>
        <View style={styles.indicator}></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SeeAllHeaderWellness
        name={"Health insights"}
        container={{ marginHorizontal: moderateScale(0) }}
      />
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <StopIcon height={moderateScale(19)} width={moderateScale(19)} />
        </View>
        <Text style={styles.headerText}>
          {"2 High Priority - take your vitals on time"}
        </Text>
      </View>
      <FlatList
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.flatList}
        data={healthInsightsData}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item, index }) => renderFlatListData(item, index)}
      />
    </View>
  );
};

export default HealthInsightsWellness;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: moderateScale(20),
  },
  itemContainer: {
    height: moderateScale(91),
    width: "auto",
    backgroundColor: colors?.SaltBox,
    borderRadius: moderateScale(15),
    paddingVertical: moderateScale(19),
    paddingHorizontal: moderateScale(17),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: moderateScale(5),
  },
  value: {
    fontSize: textScale(24),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  meter: {
    fontSize: textScale(10),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginBottom: moderateScale(4),
  },
  indicator: {
    height: moderateScale(36),
    width: moderateScale(112),
    // backgroundColor: "red",
  },
  header: {
    height: "auto",
    backgroundColor: "#F2E5D8",
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    borderColor: colors?.royalOrange,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(7),
  },
  iconContainer: {
    marginHorizontal: moderateScale(15),
  },
  headerText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.royalOrange,
    width: moderateScale(280),
  },
  separator: {
    height: moderateScale(15),
  },
  flatList: {
    marginTop: moderateScale(15),
  },
});
