import { View } from "react-native";
import React from "react";
import VitalSummaryStyles from "./styles";
import { BarChart } from "react-native-gifted-charts";
import colors from "../../constant/colors";
import { moderateScale, width } from "../../constant/responsiveStyle";
import { NoDataIcon } from "../../assets";
interface VitalsBarchartProps {
  bloodPressureData: any[];
  type?: string;
}
const VitalsBarchart: React.FC<VitalsBarchartProps> = ({
  bloodPressureData,
  type,
}) => {
  const getMaxValue = (): number => {
    const maxValue = Math.max(
      ...bloodPressureData.map((item: any) => item.value)
    );
    switch (type) {
      case "Sleep":
        return maxValue + 5;
      case "BloodPressure":
      case "HeartRate":
        return maxValue + 20;
      default:
        return maxValue + 100;
    }
  };
  const maxValue = (() => {
    const maxValueFromData = Math.max(
      ...bloodPressureData.map((item: any) => item.value)
    );
    if (type === "Sleep") {
      return maxValueFromData + 5;
    } else if (type === "BloodPressure" || type === "HeartRate") {
      return maxValueFromData + 20;
    } else {
      return maxValueFromData + 100;
    }
  })();

  const stepSize: any = (maxValue / 4).toFixed(0); // Divide the max value into 4 parts//BloodPressure,Sleep

  const parts = [
    "0",
    (stepSize * 1).toFixed(0),
    (stepSize * 2).toFixed(0),
    (stepSize * 3).toFixed(0),
  ];
  return (
    <View style={VitalSummaryStyles.container}>
      {bloodPressureData?.length > 0 ? (
        <BarChart
          showFractionalValues
          showYAxisIndices
          hideRules
          noOfSections={4}
          data={bloodPressureData}
          showGradient
          maxValue={getMaxValue()}
          frontColor={colors.royalOrangeDark}
          gradientColor={colors.lightOrange}
          backgroundColor={colors.lightprussianBlue}
          width={width - moderateScale(100)}
          xAxisLabelTextStyle={VitalSummaryStyles?.graphXaxisLabel}
          yAxisColor={colors.SurfCrest}
          xAxisColor={colors.SurfCrest}
          yAxisTextStyle={VitalSummaryStyles?.graphYaxisText}
          yAxisLabelTexts={parts}
        />
      ) : (
        <NoDataIcon
          width={`${moderateScale(300)}`}
          height={`${moderateScale(300)}`}
        />
      )}
    </View>
  );
};

export default VitalsBarchart;
