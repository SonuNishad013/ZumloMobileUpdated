import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import {
  height,
  moderateScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { backgrounColor } from "../../../constant/ProfileConstant";
import { Positions } from "react-native-calendars/src/expandableCalendar";

interface Props {
  data?: any[];
  type?: string;
}

const CurvedLineChart: React.FC<Props> = ({ data = [], type = "week" }) => {
  const [maxValue, setMaxValue] = useState<number | undefined>(undefined);
  console.log("datadata", data);
  // Calculate the highest value using useCallback
  const calculateHighestValue = useCallback(() => {
    const { transformedData, hasLargeValue } = transformData(data);
    if (!transformedData.length) return { value: -Infinity };
    return transformedData.reduce(
      (max, current) => (current.value > max.value ? current : max),
      { value: -Infinity }
    );
  }, [data]);
  const transformData = (data: any[]) => {
    let hasLargeValue = false;

    const transformedData = data.map((item) => {
      if (item.value >= 1000) {
        hasLargeValue = true;
        return {
          ...item,
          value: Math.floor(item.value / 1000),
        };
      }
      return item;
    });

    console.log("Has value >= 1000:", hasLargeValue);
    return { transformedData, hasLargeValue };
  };

  // Update maxValue when the highest changes
  useEffect(() => {
    const highest = calculateHighestValue();
    setMaxValue(highest.value + 10); // Add padding of 30 for visualization
    console.log("Latest Highest Value:", highest);
  }, [calculateHighestValue]);
  const { transformedData, hasLargeValue } = transformData(data);
  console.log("transformedData, hasLargeValue", transformedData, hasLargeValue);
  return (
    console.log("datadata-=-=-=>", transformedData),
    (
      <View
        style={{
          height: height * 0.35,
          // backgroundColor: "red",
          // zIndex: 1,
          // width: width,
        }}
      >
        {maxValue !== undefined && (
          <LineChart
            animateOnDataChange
            areaChart // Render as an area chart
            curved // Makes the graph curved
            data={transformedData}
            height={height * 0.25} // Graph height
            showVerticalLines={false} // Hides vertical grid lines
            spacing={type === "Weekly" ? width * 0.125 : width * 0.17} // X-axis label spacing
            initialSpacing={1} // Gap from 0 to first label
            isAnimated // Enables animation
            color={colors?.royalOrangeDark} // Line color
            thickness={3} // Line thickness
            verticalLinesThickness={1}
            dataPointsColor={colors?.royalOrangeDark} // Color of data points
            startFillColor={colors?.royalOrangeDark} // Top area fill color
            endFillColor={colors?.prussianBlue} // Bottom area fill color
            startOpacity={0.5} // Top area opacity
            endOpacity={0.1} // Bottom area opacity
            hideRules={false} // Show/hide dashed horizontal lines
            xAxisColor={colors?.SurfCrest} // X-axis color
            yAxisColor={colors?.SurfCrest} // Y-axis color
            yAxisTextStyle={{
              color: colors?.SurfCrest,
            }} // Y-axis text style
            xAxisLabelTextStyle={{
              color: colors?.SurfCrest,
              width: 100,
              textAlign: "justify",
              marginLeft: 20,
              marginBottom: 20,
            }} // X-axis label text style
            yAxisLabelContainerStyle={{
              backgrounColor: "green",
              color: "green",
              Positions: "absolute",
            }}
            verticalLinesColor={"rgba(203, 226, 209, 0.07)"} // Vertical line color
            xAxisThickness={1}
            yAxisThickness={1}
            maxValue={maxValue} // Dynamically set max value
            hideDataPoints // Hide data points
            rotateLabel // Rotate x-axis labels
            rulesType="hashed" // Dashed or solid rule lines
            rulesThickness={1} // Rule line thickness
            rulesColor={colors?.surfCrustOp} // Rule line color
            noOfSections={5} // Number of sections on Y-axis
            labelsExtraHeight={moderateScale(18)} // Extra height for labels
            yAxisLabelSuffix={hasLargeValue ? "K" : ""} // Y-axis label suffix
            // pointerConfig={{
            //   pointerStripUptoDataPoint: true,
            //   pointerStripColor: 'lightgray',
            //   pointerStripWidth: 2,
            //   strokeDashArray: [2, 5],
            //   pointerColor: 'lightgray',
            //   radius: 4,
            //   pointerLabelWidth: 100,
            //   pointerLabelHeight: 120,
            //   pointerLabelComponent: items => {
            //     return (
            //       <View
            //         style={{
            //           height: 40,
            //           width: 100,
            //           backgroundColor: '#282C3E',
            //           borderRadius: 4,
            //           justifyContent:'center',
            //           paddingLeft:16,
            //         }}>
            //         <Text style={{color: 'lightgray',fontSize:12}}>{"Average"}</Text>
            //         <Text style={{color: 'white', fontWeight:'bold'}}>{items[0].value}</Text>
            //       </View>
            //     );
            //   },
            // }}
          />
        )}
      </View>
    )
  );
};

export default CurvedLineChart;
