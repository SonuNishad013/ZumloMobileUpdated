import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import colors from "../../../constant/colors";
import { rawData } from "./Dummy";

// Sample data (replace with your actual data)

const mapDataForGraph = (data: any) => {
  return data.map((item: any, index: any, array: any) => ({
    value: item.progress,
    label:
      index === 0
        ? "1"
        : index === array.length - 1
        ? `${new Date(item.date).getDate()}`
        : "", // Show only the first and last date labels
  }));
};

const MonthlyProgressChart = () => {
  const barData = mapDataForGraph(rawData);
  return (
    <View style={styles.container}>
      <LineChart
        areaChart
        data={barData}
        width={300}
        height={200}
        maxValue={100}
        isAnimated
        noOfSections={2}
        yAxisTextStyle={{ color: colors?.graphYAxix }}
        xAxisLabelTextStyle={{ color: colors?.graphYAxix }}
        lineGradientStartColor={colors.orangeOp}
        lineGradientEndColor={colors.traitSliderBar}
        dataPointsColor={colors.themeColor}
        backgroundColor={colors.SurfCrest}
        color={colors.themeColor}
        startFillColor={colors.themeColor}
        animationDuration={1200}
        xAxisThickness={2}
        xAxisColor={colors.themeColor}
        initialSpacing={1}
        showVerticalLines
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.SurfCrest,
  },
});

export default MonthlyProgressChart;
