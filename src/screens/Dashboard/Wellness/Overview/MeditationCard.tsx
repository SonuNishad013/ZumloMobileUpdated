import React, { FunctionComponent } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Svg, { Circle, G, Path, Text as SvgText } from "react-native-svg";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import CircularProgress from "react-native-circular-progress-indicator";
interface MeditationCardProps {
  item?: any;
}

const MeditationCard: FunctionComponent<MeditationCardProps> = ({ item }) => {
  console.log("item-=-=-=>MeditationCard", item);

  const progressData = item?.progressBreakdown;

  // Calculate average percentage only
  const totalPercentage = progressData.reduce(
    (sum, day) => sum + day.progressPercentage,
    0 // Initial value
  );

  const averagePercentage = Math.round(totalPercentage / progressData.length);
  console.log(`Average Progress: ${averagePercentage}%`);

  const CustomGraph = () => {
    // Function to generate the path based on progressPercentage
    const generatePath = (progressData: any) => {
      const minY = 15; // Highest point (100%)
      const maxY = 30; // Lowest point (0%)
      const startX = 5; // Start position
      const endX = 75; // End position
      const stepX = (endX - startX) / (progressData.length - 1); // Space between points

      let path = `M${startX} ${mapToY(
        progressData[0].progressPercentage,
        minY,
        maxY
      )}`;

      for (let i = 1; i < progressData.length; i++) {
        const x = startX + stepX * i;
        const y = mapToY(progressData[i].progressPercentage, minY, maxY);
        path += ` T ${x} ${y}`;
      }
      console.log("path-=-=-=-=->", path);

      return path;
    };

    // Helper function to map progress percentage to Y coordinate
    const mapToY = (percentage: any, minY: any, maxY: any) => {
      return maxY - (percentage / 100) * (maxY - minY);
    };
    return (
      <Svg width={100} height={40} viewBox="0 0 80 40">
        <Path
          //   d="M5 30 Q 15 10, 25 20 T 45 25 T 65 15 T 75 30"
          d={generatePath(progressData)}
          stroke={colors.polishedPine}
          strokeWidth={5}
          fill="none"
          strokeLinecap={"round"}
        />
      </Svg>
    );
  };
  const RadiaBar = (item: any) => {
    console.log("item=-=-=-=-=-=-=RadiaBar>", item);

    return (
      <CircularProgress
        value={item.averagePercentage}
        title={"progress"}
        progressValueColor={colors.SurfCrest}
        titleColor={colors.SurfCrest}
        activeStrokeColor={colors.backgroundTheme}
        activeStrokeWidth={4}
        inActiveStrokeWidth={8}
        inActiveStrokeColor={`rgb(191,215,193)`}
        radius={25}
      />
    );
  };
  const getBackgroundColor = (item: any) => {
    console.log("item-=->-=>", item);

    // return "red";
    switch (item.graphType) {
      case "RadialBar":
        return colors.backgroundTheme;
      case "BarGraph":
        return colors.darkPrussianBlue;
      case "Analytics":
        return colors.darkPrussianBlue;
      case "ProgressBar":
        return colors.OceanGreen;

      default:
        return colors.OceanGreen || "white"; // Provide a fallback color
    }
  };
  const BarGraph = (progressBreakdown: any) => {
    console.log("progressBreakdown-=->", progressBreakdown);

    const data = item.progressBreakdown;

    // Calculate maximum percentage for scaling
    const maxPercentage = Math.max(
      ...data.map((item) => item.progressPercentage)
    );
    return (
      <View style={Bargraphstyles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={Bargraphstyles.chartContainer}>
            {data.map((item, index) => (
              <View key={index} style={Bargraphstyles.barGroup}>
                <View
                  style={[
                    Bargraphstyles.bar,
                    { height: (item.progressPercentage / maxPercentage) * 20 }, // 200 is max height
                  ]}
                ></View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };
  const ProgressBar = (item: any) => {
    return (
      <View
        style={{
          backgroundColor: colors.lightSurfCrest_,
          height: moderateScale(15),
          width: moderateScale(105),
          borderRadius: moderateScale(10),
          justifyContent: "center",
          padding: 2,
        }}
      >
        <View
          style={{
            width: moderateScale(item.item),
            backgroundColor: colors.darkPrussianBlue,
            height: moderateScale(10),
            borderRadius: moderateScale(10),
          }}
        />
      </View>
    );
  };
  const calculatePieSlice = (
    startAngle,
    endAngle,
    radius,
    centerX,
    centerY
  ) => {
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    return `M${centerX},${centerY} L${startX},${startY} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;
  };

  const CustomPieChart = ({ data, radius = 100 }) => {
    const centerX = radius;
    const centerY = radius;
    let startAngle = 0;

    return (
      <View style={DoughnutChartStyle.container}>
        <Svg width={radius * 2} height={radius * 2}>
          {data.map((item, index) => {
            const sliceAngle = (item.progressPercentage / 100) * 2 * Math.PI; // Convert percentage to angle
            const endAngle = startAngle + sliceAngle;
            const path = calculatePieSlice(
              startAngle,
              endAngle,
              radius,
              centerX,
              centerY
            );
            startAngle = endAngle;

            return (
              <Path
                key={index}
                d={path}
                fill={item.color}
                stroke="#fff"
                strokeWidth={1}
              />
            );
          })}
        </Svg>
      </View>
    );
  };
  const pieData = [
    {
      label: "Monday",
      progressValue: "6 hrs",
      progressPercentage: 12,
      color: "red",
    },
    {
      label: "Tuesday",
      progressValue: "7 hrs",
      progressPercentage: 43,
      color: "blue",
    },
    {
      label: "Wednesday",
      progressValue: "6 hrs",
      progressPercentage: 22,
      color: "grey",
    },
    {
      label: "Thursday",
      progressValue: "7 hrs",
      progressPercentage: 73,
      color: "black",
    },
    {
      label: "Friday",
      progressValue: "6 hrs",
      progressPercentage: 98,
      color: "yellow",
    },
    {
      label: "Saturday",
      progressValue: "7 hrs",
      progressPercentage: 21,
      color: "white",
    },
    {
      label: "Sunday",
      progressValue: "7 hrs",
      progressPercentage: 5,
      color: "orange",
    },
    // { label: "Sleep", value: 40 },
    // { label: "Work", value: 30 },
    // { label: "Exercise", value: 15 },
    // { label: "Leisure", value: 15 },
  ];

  return (
    console.log("item-=-=-=-=-=-=>", item, item.progressBreakdown),
    (
      <View
        style={[
          styles.card,
          {
            backgroundColor: getBackgroundColor(item),
          },
        ]}
      >
        <Image
          source={{ uri: item.image }}
          style={{
            width: moderateScale(40),
            height: moderateScale(40),
            borderRadius: 8,
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {item?.title} | <Text style={styles.titl2}>{item?.duration}</Text>
          </Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={styles.graphContainer}>
          {item.graphType === "BarGraph" && (
            <BarGraph item={item.progressBreakdown} />
          )}
          {item.graphType === "RadialBar" && (
            <RadiaBar averagePercentage={averagePercentage} />
          )}
          {item.graphType === "Analytics" && <CustomGraph />}
          {item.graphType === "ProgressBar" && (
            <ProgressBar item={averagePercentage} />
          )}
          {/* {item.graphType === "PieChart" && (
          <CustomPieChart data={pieData} radius={25} />
        )} */}

          {item.graphType !== "RadialBar" && (
            <Text style={styles.graphText}>
              {averagePercentage}
              <Text style={styles.graphText2}> min</Text>
            </Text>
          )}
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: colors.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "600",
  },
  titl2: {
    color: colors.SurfCrest,
    fontSize: textScale(10),
    fontWeight: "500",
  },
  description: {
    color: colors.SurfCrest,
    fontSize: textScale(10),
    marginTop: moderateScale(5),
  },
  graphContainer: {
    alignItems: "center",
  },
  graphText: {
    color: colors.SurfCrest,
    fontSize: textScale(16),
    fontWeight: "600",
  },
  graphText2: {
    color: colors.SurfCrest,
    fontSize: textScale(10),
    fontWeight: "600",
  },
});
const Bargraphstyles = StyleSheet.create({
  container: {
    height: 35,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2c3e50",
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    // height: 100,
    // width: 100,
    // paddingHorizontal: 8,
  },
  barGroup: {
    alignItems: "center",
    marginHorizontal: 2,
  },
  bar: {
    width: 5,
    backgroundColor: colors.OceanGreen,
    borderTopRightRadius: 1,
    borderTopLeftRadius: 1,
    marginBottom: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  percentageLabel: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 1,
  },
  dayLabel: {
    color: "#7f8c8d",
    fontSize: 2,
    textAlign: "center",
  },
});
const DoughnutChartStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MeditationCard;
