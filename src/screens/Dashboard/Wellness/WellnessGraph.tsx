import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { GraphUp } from "../../../assets";
import CommonBoxButton from "../../../components/Buttons/commonBoxButton";

import { AreaChart, BarChart, Grid, LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

interface Props {
  onPress?: () => void;
  graphData?: any;
}

const WellnessGraph: React.FC<Props> = ({ onPress, graphData }) => {
  const chartGraphdata = [50, 55, 60, 75, 70, 50, 53, 24, 50]

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{"Good Job!"}</Text>
          <Text style={styles.description}>
            {"Your Achievements! Your Well-Being Journey Shines Bright!"}
          </Text>
        </View>
        <CommonBoxButton
          mainContainer={styles.buttonContainer}
          SvgIcon={GraphUp}
          onPress={onPress}
        />
      </View>
      <View
        style={{
          // height: moderateScale(115),
          // marginTop: moderateScale(50),

        }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <AreaChart
            style={{ height: moderateScale(100), width: width - moderateScale(30) }}
            data={chartGraphdata}
            contentInset={{ top: 10, bottom: 10 }}
            // contentInset={{
            //   top: moderateScale(10),
            //   // bottom: moderateScale(10) 
            // }}
            curve={shape.curveNatural}
            svg={{ fill: colors.royalOrange }}
          >
          </AreaChart>
        </View>
      </View>
    </View>
  );
};

export default WellnessGraph;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(286),
    backgroundColor: colors?.prussianBlue,
    borderRadius: moderateScale(20),
    marginTop: moderateScale(30),
    justifyContent: "space-between",
    overflow:"hidden"
  },
  contentContainer: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(20),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    width: moderateScale(188),
  },
  title: {
    color: colors?.white,
    fontSize: textScale(24),
    fontWeight: "700",
  },
  description: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "400",
  },
  buttonContainer: {
    height: moderateScale(47),
    width: moderateScale(47),
    borderRadius: moderateScale(15),
  },
});
