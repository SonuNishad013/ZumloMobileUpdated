import {  StyleSheet,  } from "react-native";
import React from "react";
import colors from "../../../../../../constant/colors";
import {
  moderateScale,
  textScale,
} from "../../../../../../constant/responsiveStyle";
import SpeedInput from "../../../../../UserGoals/SetIntensitySpeed/SpeedInput";

const TrainingSpeedSection: React.FC<any> = () => {

  return (
    <SpeedInput
    titleTextStyle={styles?.heading}
    speedAreaMainContainer={{ marginHorizontal: moderateScale(0) }}
    xStyle={{ color: colors?.white04 }}
    // oneToFiveContainer={{borderColor:colors?.royalOrange}}
    speedDataContainer={{marginTop:moderateScale(80)}}
    trainingText={{color:colors?.SurfCrest}}
  />
  ) 
};

export default TrainingSpeedSection;

const styles = StyleSheet.create({
  heading: {
    color: colors.SurfCrest,
    fontSize: textScale(24),
    fontWeight: "700",
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(30),
  },
});
