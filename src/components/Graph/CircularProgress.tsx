import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import colors from "../../constant/colors";
import { textScale } from "../../constant/responsiveStyle";

interface CircularProgressProps {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage = 0,
  size = 100,
  strokeWidth = 10,
  progressColor,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const rotateInterpolation = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0deg", "180deg"],
  });

  const radius = (size - strokeWidth) / 2;
  const circleCircumference = 2 * Math.PI * radius;
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circleCircumference, 0],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Background Circle */}
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: "background: rgba(203, 226, 209, 0.2)",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "blue",
          },
        ]}
      >
        <View
          style={[
            styles.circle,
            {
              width: size - 7,
              height: size - 7,
              borderRadius: size / 2,
              borderWidth: 3,
              borderColor: progressColor,
              //   justifyContent: "center",
              alignSelf: "center",
              //   backgroundColor: "red",
            },
          ]}
        />
      </View>

      {/* Foreground Circle with Rotation */}
      <Animated.View
        style={[
          styles.progressCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: "background: rgba(203, 226, 209, 0.2)",
            transform: [{ rotate: rotateInterpolation }],
          },
        ]}
      />

      {/* Percentage Text */}
      <View style={styles.textContainer}>
        <Text style={styles.percentage}>{percentage}%</Text>
        <Text style={styles.label}>Progress</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  circle: {
    position: "absolute",
  },
  progressCircle: {
    position: "absolute",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  percentage: {
    fontSize: textScale(10),
    fontWeight: "bold",
    color: colors.SurfCrest,
  },
  label: {
    fontSize: textScale(8),
    color: colors.SurfCrest,
  },
});

export default CircularProgress;
