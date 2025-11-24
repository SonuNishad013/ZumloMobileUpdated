import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-svg-charts";
import * as Svg from "react-native-svg";

const data = {
  userId: 1,
  timePeriod: "Day",
  resultFor: "Activities",
  progressStatus: {
    title: "Excellent",
    Description: "",
  },
  activityProgressDetails: [
    {
      id: 101,
      title: "Sleep",
      duration: "8 hrs",
      startDate: "2025-01-28",
      endDate: "2025-06-31",
      scheduleTime: ["07:00 AM", "01:00 PM"],
      logo: "",
      frequency: "Daily",
      frequencyCount: "2 times",
      progressBreakdown: [
        { label: "Mon", progressValue: 6, progressPercentage: 75 },
        { label: "Tue", progressValue: 3, progressPercentage: 37 },
        { label: "Wed", progressValue: 5, progressPercentage: 62 },
        { label: "Thu", progressValue: 4, progressPercentage: 50 },
        { label: "Fri", progressValue: 5, progressPercentage: 62 },
        { label: "Sat", progressValue: 7, progressPercentage: 87 },
        { label: "Sun", progressValue: 5, progressPercentage: 62 },
      ],
      description: "Improve mindfulness and reduce stress",
      graphType: "circular",
    },
  ],
};

const BarChartComponent = () => {
  const chartData = data.activityProgressDetails[0].progressBreakdown;

  // Extract values for bars
  const values = chartData.map((item) => item.progressValue);
  const labels = chartData.map((item) => item.label);

  return (
    <View style={styles.container}>
      {/* Time Labels */}
      <View style={styles.timeLabels}>
        {[10, 8, 6, 4, 2].map((time, index) => (
          <Text key={index} style={styles.timeText}>
            {time} hr
          </Text>
        ))}
      </View>

      {/* Chart Section */}
      <View style={styles.chartContainer}>
        <BarChart
          style={{ height: 200 }}
          data={values}
          svg={{ fill: "#B8C8B8" }} // Default bar color
          contentInset={{ top: 10, bottom: 10 }}
          spacingInner={0.5}
        >
          {/* Custom Labels & Icons */}
          {chartData.map((item, index) => (
            <Svg.Text
              key={index}
              x={index * (300 / labels.length) + 20}
              y={190 - item.progressValue * 20}
              fontSize={14}
              fill="#0F2B3D"
              fontWeight="bold"
              textAnchor="middle"
            >
              {/* {index === 0 ? "🌙" : ""} */}
            </Svg.Text>
          ))}
        </BarChart>

        {/* Bottom Labels (Days) */}
        <View style={styles.labelsContainer}>
          {labels.map((label, index) => (
            <Text key={index} style={styles.dayText}>
              {label}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#E6F2E6",
    padding: 20,
    borderRadius: 10,
  },
  timeLabels: {
    justifyContent: "space-between",
    paddingRight: 10,
  },
  timeText: {
    fontSize: 14,
    color: "#0F2B3D",
  },
  chartContainer: {
    flex: 1,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  dayText: {
    fontSize: 14,
    color: "#0F2B3D",
  },
});

export default BarChartComponent;
