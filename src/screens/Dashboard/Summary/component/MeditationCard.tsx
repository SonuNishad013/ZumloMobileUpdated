import React, { FunctionComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import Svg, { Path, Text as SvgText } from "react-native-svg";
import colors from "../../../../constant/colors";
import {
  moderateScale,
  textScale,
  width,
} from "../../../../constant/responsiveStyle";
import CircularProgress from "react-native-circular-progress-indicator";
import { imagePath } from "../../../../assets/png/imagePath";
import { APPLY_STATUS } from "../../../../constant/ENUM";
import { GRAPH_TYPE } from "./GraphType";
import { strings } from "../../../../constant/strings";
interface MeditationCardProps {
  item?: any;
  index?: number;
}
const MeditationCard: FunctionComponent<MeditationCardProps> = ({
  item,
  index,
}) => {
  const progressData = item?.progressBreakdown;

  // Calculate average percentage only
  const totalPercentage = progressData.reduce(
    (sum: any, day: any) => sum + day.progressPercentage,
    0 // Initial value
  );

  const averagePercentage = progressData?.length
    ? Math.round(totalPercentage / progressData.length)
    : 0;

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
      return path;
    };
    // Helper function to map progress percentage to Y coordinate
    const mapToY = (percentage: any, minY: any, maxY: any) => {
      return maxY - (percentage / 100) * (maxY - minY);
    };
    return (
      <Svg width={100} height={40} viewBox="0 0 80 40">
        <Path
          d={generatePath(progressData)}
          stroke={colors.royalOrange}
          strokeWidth={5}
          fill="none"
          strokeLinecap={"round"}
        />
      </Svg>
    );
  };
  const RadiaBar = (item: any) => {
    return (
      <CircularProgress
        value={30}
        title={"progress"}
        progressValueColor={colors.SurfCrest}
        titleColor={colors.SurfCrest}
        activeStrokeColor={colors.backgroundTheme}
        activeStrokeWidth={2}
        inActiveStrokeWidth={4}
        inActiveStrokeColor={`rgb(191,215,193)`}
        radius={25}
      />
    );
  };

  const BarGraph = (progressBreakdown: any) => {
    const data = item.progressBreakdown;
    // Calculate maximum percentage for scaling
    const maxPercentage = Math.max(
      ...data.map((item: any) => item.progressPercentage)
    );
    return (
      <View style={Bargraphstyles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={Bargraphstyles.chartContainer}>
            {data.map((item: any, index: any) => (
              <View key={index} style={Bargraphstyles.barGroup}>
                <View
                  style={[
                    Bargraphstyles.bar,
                    {
                      height: (item.progressPercentage / maxPercentage) * 20,
                    }, // 200 is max height
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
      <View style={style?.progressBarContainer}>
        <View
          style={[style?.progressBarView, { width: moderateScale(item.item) }]}
        />
      </View>
    );
  };

  // piechar will be used in futured that why this code is commented
  // const calculatePieSlice = (
  //   startAngle: any,
  //   endAngle: any,
  //   radius: any,
  //   centerX: any,
  //   centerY: any
  // ) => {
  //   const startX = centerX + radius * Math.cos(startAngle);
  //   const startY = centerY + radius * Math.sin(startAngle);
  //   const endX = centerX + radius * Math.cos(endAngle);
  //   const endY = centerY + radius * Math.sin(endAngle);

  //   const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

  //   return `M${centerX},${centerY} L${startX},${startY} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;
  // };
  // const CustomPieChart = ({ data, radius = 100 }: any) => {
  //   const centerX = radius;
  //   const centerY = radius;
  //   let startAngle = 0;

  //   return (
  //     <View style={DoughnutChartStyle.container}>
  //       <Svg width={radius * 2} height={radius * 2}>
  //         {data.map((item: any, index: any) => {
  //           const sliceAngle = (item.progressPercentage / 100) * 2 * Math.PI; // Convert percentage to angle
  //           const endAngle = startAngle + sliceAngle;
  //           const path = calculatePieSlice(
  //             startAngle,
  //             endAngle,
  //             radius,
  //             centerX,
  //             centerY
  //           );
  //           startAngle = endAngle;

  //           return (
  //             <Path
  //               key={index}
  //               d={path}
  //               fill={item.color}
  //               stroke="#fff"
  //               strokeWidth={1}
  //             />
  //           );
  //         })}
  //       </Svg>
  //     </View>
  //   );
  // };

  const activityBackgroundImages = [
    imagePath.ActivityListingBg,
    imagePath.ActivityListingBg3,
    imagePath.ActivityListingBg4,
  ];
  const getBackgroundImage = (index: number) => {
    return activityBackgroundImages[index % activityBackgroundImages.length];
  };
  const getCardContent = (item: any, index: any) => {
    return (
      <View style={style?.cardCountView}>
        <View style={style?.centerView}>
          <Text
            style={[
              style?.titleText,
              {
                color:
                  (index ?? 0) % 2 == 0
                    ? colors.SurfCrest
                    : colors.prussianBlue,
              },
            ]}
          >
            {item?.title}
          </Text>
          <Text
            style={[
              style?.descText,
              {
                color:
                  (index ?? 0) % 2 == 0
                    ? colors.SurfCrest
                    : colors.prussianBlue,
              },
            ]}
          >
            {strings?.divider}
          </Text>
          <Text
            style={[
              styles?.durationText,
              {
                color:
                  (index ?? 0) % 2 == 0
                    ? colors.SurfCrest
                    : colors.prussianBlue,
              },
            ]}
          >
            {item?.duration}
          </Text>
        </View>
        <Text
          style={[
            styles?.descStyle,
            {
              color:
                (index ?? 0) % 2 == 0 ? colors.SurfCrest : colors.prussianBlue,
            },
          ]}
        >
          {item?.description}
        </Text>
      </View>
    );
  };
  return (
    <ImageBackground
      style={[styles.card]}
      resizeMode={APPLY_STATUS?.stretch}
      source={getBackgroundImage(index ?? 0)}
    >
      {getCardContent(item, index)}
      <View style={styles.graphContainer}>
        {item.graphType === GRAPH_TYPE?.BarGraph && (
          <BarGraph item={item.progressBreakdown} />
        )}
        {(item.graphType === GRAPH_TYPE?.RadialBar ||
          item.graphType === GRAPH_TYPE?.Circular) && (
          <RadiaBar averagePercentage={averagePercentage} />
        )}

        {item.graphType === GRAPH_TYPE?.Analytics && <CustomGraph />}
        {(item.graphType === GRAPH_TYPE?.ProgressBar ||
          item.graphType === GRAPH_TYPE?.line) && (
          <ProgressBar item={averagePercentage} />
        )}

        {/* piechar will be used in futured that why this code is commented
         {item.graphType === "PieChart" && (
          <CustomPieChart data={pieData} radius={25} />
        )}  */}

        {item.graphType !== GRAPH_TYPE?.RadialBar && (
          <Text
            style={[
              styles.graphText,
              {
                color:
                  (index ?? 0) % 2 == 0
                    ? colors.SurfCrest
                    : colors.prussianBlue,
              },
            ]}
          >
            {averagePercentage}
            <Text
              style={[
                styles.graphText2,
                {
                  color:
                    (index ?? 0) % 2 == 0
                      ? colors.SurfCrest
                      : colors.prussianBlue,
                },
              ]}
            >
              {" " + "%"}
              {/* {" " + strings?.min_} */}
            </Text>
          </Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 15,
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
  durationText: {
    fontSize: textScale(10),
    fontWeight: "600",
  },
  descStyle: {
    fontSize: textScale(12),
    fontWeight: "600",
    marginTop: moderateScale(5),
    opacity: 0.7,
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
  },
  barGroup: {
    alignItems: "center",
    marginHorizontal: 2,
  },
  bar: {
    width: 5,
    backgroundColor: colors.royalOrange,
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
const style = StyleSheet.create({
  progressBarContainer: {
    backgroundColor: colors.lightSurfCrest_,
    height: moderateScale(15),
    width: moderateScale(105),
    borderRadius: moderateScale(10),
    justifyContent: "center",
    padding: 2,
    marginTop: moderateScale(30),
  },
  progressBarView: {
    backgroundColor: colors.darkPrussianBlue,
    height: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  cardCountView: {
    width: width / 2,
  },
  centerView: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: textScale(14),
    fontWeight: "600",
  },
  descText: {
    fontSize: textScale(14),
    fontWeight: "600",
  },
});

export default MeditationCard;
