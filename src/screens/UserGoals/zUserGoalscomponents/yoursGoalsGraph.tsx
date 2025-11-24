import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { moderateScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

import { AreaChart, BarChart, Grid, LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { IndicatorIcon } from "../../../assets";
import CommonDoughnutGraph from "../../../components/Doughnut Graph";
interface Props {
  title?: string;
  value?: any;
  meter?: any;
  lastUpdate?: any;
  mainContainer?: ViewStyle;
  onPress?: () => void;
  graphName?: any;
  graphData?: any;
}
const YoursGoalsGraph: React.FC<Props> = ({
  title,
  value,
  meter,
  lastUpdate,
  mainContainer,
  onPress,
  graphName,
  graphData,
}) => {
  const [percentage, setPercentage] = useState(1);
  const [rotationValue, setRotationValue] = useState(90);
  const getGraph = (name: any) => {
    switch (name) {
      case "circleChart":
        return circleGraph()
      case "Bar":
        return barGraph();
      case "Chart":
        return chartGraph();
      case "lineChart":
        return lineGraph();
      default:
        break;
    }
  };

  const circleGraph = () => {
    return (
      <CommonDoughnutGraph
        degreeRotaion={20}
      />
    )


  }
  const lineGraph = () => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <LineChart
          style={{ height: moderateScale(110), width: moderateScale(150) }}
          data={graphData}
          svg={{ stroke: colors.royalOrange }}
          contentInset={{ top: 10, bottom: 30 }}
        >
          {/* <Grid />  for axis  */}
        </LineChart>
      </View>
    );
  };
  const chartGraph = () => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <AreaChart
          style={{ height: moderateScale(100), width: moderateScale(150) }}
          data={graphData}
          contentInset={{ top: 10, bottom: 30 }}
          curve={shape.curveNatural}
          svg={{ fill: colors.royalOrange }}
        ></AreaChart>
      </View>
    );
  };
  const barGraph = () => {
    const fill = colors.royalOrange;
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <BarChart
          style={{ height: moderateScale(150), width: moderateScale(150) }}
          data={graphData}
          svg={{ fill }}
          contentInset={{ top: 10, bottom: 30 }}
        ></BarChart>
      </View>
    );
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[style?.mainContainer, mainContainer]}>
        <View style={style?.dataContainer}>
          <Text style={style?.titleStyle}>{title}</Text>
          <View style={style?.titleValueContainer}>
            <Text style={style?.valueStyle}>{value}</Text>
            <Text style={style?.valueMeterStyle}>{meter}</Text>
          </View>
          <Text style={style?.updateTextStyle}>
            {"Last update"} {lastUpdate}
          </Text>
        </View>
        <View style={style?.graphContainer}>{getGraph(graphName)}</View>
      </View>
    </TouchableOpacity>
  );
};


const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    // backgroundColor:'red'
  },
  subContainer: {
    // width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: GlobalSize(24),
    // backgroundColor: 'red',
    padding: moderateScale(24),
  },
  meterOverlay: {
    bottom: "45%",
    alignItems: "center",
    position: "absolute",
  },
  meterArrow: {
    alignItems: "center",
    height: moderateScale(86),
    left: moderateScale(-4.4),
  },
  arrowStick: {
    height: moderateScale(135),
    width: moderateScale(30),
    zIndex: 1000,
  },
  arrowImage: {
    height: null,
    width: null,
    flex: 1,
    resizeMode: "contain",
    top: moderateScale(12.5),
    // transform: [{ rotate: '180deg' }]
  },
  arrowRotationPosition: {
    height: moderateScale(24),
    width: moderateScale(24),
    backgroundColor: "black",
    position: "absolute",
    bottom: moderateScale(6.2),
    borderRadius: 100,
  },
  title: {
    color: "#000000",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(17.07),
    marginTop: moderateScale(28),
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: moderateScale(20),
    paddingBottom: moderateScale(25),

    justifyContent: "center",
  },
  fuelFont: {
    color: "#000000",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(18.07),
  },
  textInputContainer2: {
    height: moderateScale(45),
    width: moderateScale(80),
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  input: {
    color: "#242424",
    fontSize: moderateScale(13),
    letterSpacing: moderateScale(-0.41),
    padding: 0,
  },
  percentageText: {
    color: "#242424",
    fontSize: moderateScale(16),
  },
  mainContainer: {
    height: moderateScale(198),
    width: moderateScale(162),
    borderRadius: moderateScale(15),
    backgroundColor: colors?.prussianBlue,
    overflow: "hidden",
    justifyContent: "space-between",
    marginHorizontal: moderateScale(7),
    marginTop: moderateScale(5),
  },
  dataContainer: {
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(15),
  },
  titleStyle: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "600",
  },
  titleValueContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  valueStyle: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(25),
    fontWeight: "500",
    marginTop: moderateScale(5),
  },
  valueMeterStyle: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(10),
    fontWeight: "400",
    marginLeft: moderateScale(2),
    paddingBottom: moderateScale(4.5),
  },
  updateTextStyle: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(10),
    marginTop: moderateScale(5),
    fontWeight: "400",
  },
  graphContainer: {
    // backgroundColor: "red",
    height: moderateScale(110),
    marginTop: moderateScale(5),
  },
});
export default YoursGoalsGraph;

// use like
{
  /* <YoursGoalsGraph
          title="CALORIES"
          value={"500"}
          meter={"Cal"}
          lastUpdate={"3m"}
        /> */
}
