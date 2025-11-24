import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart, Grid, YAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import {
  Defs,
  LinearGradient as Gradient,
  Stop,
  Path,
  Line,
  Circle,
} from "react-native-svg";
import SplashScreen from "react-native-splash-screen";
import colors from "../../constant/colors";
import { moderateScale, width } from "../../constant/responsiveStyle";
import moment from "moment";
import { capitalizeFirstLetter } from "../../validations/capitalizeFirstLetter";
const GradientShadow = ({ line }: any) => (
  <Defs key={"gradient"}>
    <Gradient id={"shadow"} x1={"0"} y1={"0%"} x2={"0"} y2={"100%"}>
      <Stop offset={"0%"} stopColor={"rgba(255, 140, 66, 0.4)"} />
      <Stop offset={"80%"} stopColor={"rgba(255, 140, 66, 0)"} />
    </Gradient>
    <Path key={"shadow"} y={3} d={line} fill={"url(#shadow)"} strokeWidth={0} />
  </Defs>
);
const ShadowLine = ({ line }: any) => {
  return (
    <Path
      d={line}
      stroke={"rgba(255, 140, 66, 0.3)"} // Shadow color
      strokeWidth={6} // Adjust width for a thicker shadow
      fill={"none"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      style={{
        shadowColor: "rgba(255, 140, 66, 0.3)", // Shadow color
        shadowOffset: { width: 4, height: 4 }, // Offset shadow for better effect
        shadowOpacity: 0.8,
        shadowRadius: 3,
      }}
    />
  );
};

const CommonLineGraph = ({ data, Status, description, days }: any) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const VerticalLines = ({ x, height }: any) =>
    data.map((_: any, index: any) => (
      <Line
        key={index + JSON.stringify(height)}
        x1={x(index)}
        x2={x(index)}
        y1={"0%"}
        y2={height}
        stroke={"rgba(204, 228, 225, 0.4)"}
        strokeWidth={2}
      />
    ));

  const Circles = ({ x, y }: any) =>
    data.map((value: any, index: any) => (
      <Circle
        key={index + JSON.stringify(value)}
        cx={x(index)}
        cy={y(value)}
        r={8}
        stroke={"#8FE3CF"}
        strokeWidth={2}
        fill={"#002F3A"}
      />
    ));
  const graphTextData = [
    {
      id: 1,
      category: "Very Low Progress",
      percentage: "0% - 10%",
      title: "Starting Fresh",
      description:
        "You are getting started! Take this time to assess your goals and create a plan to tackle them next week.",
    },
    {
      id: 2,
      category: "Low Progress",
      percentage: "11% - 30%",
      title: "Gaining Momentum",
      description:
        "You've made some progress! Focus on identifying what's holding you back and adjust your strategy for next week.",
    },
    {
      id: 3,
      category: "Moderate Progress",
      percentage: "31% - 60%",
      title: "On the Right Track",
      description:
        "Good job! You're making steady progress. Stay consistent and keep your momentum going—success is within reach!",
    },
    {
      id: 4,
      category: "High Progress",
      percentage: "61% - 85%",
      title: "Great Effort!",
      description:
        "Well done! You've done a fantastic job this week. Keep pushing yourself to reach new heights—you're almost there!",
    },
    {
      id: 5,
      category: "Exceptional Progress",
      percentage: "86% - 100%",
      title: "Exceptional Achievement!",
      description:
        "Amazing work! You've excelled beyond your goals this week. Celebrate your achievements and set even bolder targets for the future!",
    },
  ];

  const sum = data.reduce((acc: any, curr: any) => acc + curr, 0);
  const avarageValue = sum / data?.length;
  const getRange = () => {
    switch (true) {
      case avarageValue >= 0 && avarageValue < 10:
        return 0;
      case avarageValue > 10 && avarageValue < 30:
        return 1;
      case avarageValue > 30 && sum < 60:
        return 2;
      case sum > 60 && avarageValue < 85:
        return 3;
      case avarageValue > 85 && avarageValue < 100:
        return 4;
      default:
        return -1; // Default case if no conditions match
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {capitalizeFirstLetter(graphTextData[getRange()]?.title)}
          </Text>
          {/* <UpArrowGraph /> */}
        </View>
        <Text style={styles.subtitle}>
          {capitalizeFirstLetter(graphTextData[getRange()]?.description)}
        </Text>

        <View
          style={{
            height: 200,
            flexDirection: "row",
          }}
        >
          <YAxis
            data={data}
            contentInset={{ top: 10, bottom: 10 }}
            svg={{
              fill: colors?.SurfCrest,
              fontSize: 10,
            }}
            numberOfTicks={5}
          />
          <View style={{ flex: 1 }}>
            <LineChart
              style={{ height: 200 }}
              data={data}
              curve={shape.curveMonotoneX}
              svg={{ stroke: "#FF8C42", strokeWidth: 4 }}
              contentInset={{ top: 20, bottom: 20, left: 20, right: 20 }} // Added left and right inset
            >
              <Grid
                svg={{ stroke: "rgba(0, 0, 0, 0)" }} // Remove horizontal grid lines
              />
              <VerticalLines />
              <GradientShadow />
              <ShadowLine />
              <Circles />
            </LineChart>
          </View>
        </View>

        <View style={styles.labels}>
          {days.map((day: any) => (
            <View key={day}>
              <Text style={styles.label}>{moment(day).format("ddd")}</Text>
              <Text style={styles.label}>{moment(day).format("DD")}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: moderateScale(15),
  },
  card: {
    width: width * 0.91,
    borderRadius: moderateScale(20),
    padding: moderateScale(15),
    backgroundColor: colors?.surfCrustOp3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.SurfCrest,
  },
  subtitle: {
    fontSize: 16,
    color: colors.SurfCrest,
    marginVertical: 10,
  },

  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: moderateScale(20),
  },
  label: {
    color: colors.SurfCrest,
    fontSize: 12,
  },
});

export default CommonLineGraph;
