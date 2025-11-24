import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CircularProgress } from "react-native-circular-progress";
import { textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

const CircularProgressBar = ({ value, size, color }: any) => {
  return (
    <View style={styles.container}>
      <CircularProgress
        size={size}
        width={10}
        fill={value}
        tintColor={color}
        backgroundColor={colors.SurfCrest}
        rotation={210}
        lineCap="round"
        arcSweepAngle={300}
      >
        {() => (
          <View style={styles.textContainer}>
            <Text style={styles.text}>Progress</Text>
            <Text style={styles.valueText}>{`${value}%`}</Text>
          </View>
        )}
      </CircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 2,
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: textScale(12),
    color: colors?.SurfCrest,
    fontWeight: "400",
  },
  valueText: {
    fontSize: textScale(16),
    color: colors?.SurfCrest,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default CircularProgressBar;
