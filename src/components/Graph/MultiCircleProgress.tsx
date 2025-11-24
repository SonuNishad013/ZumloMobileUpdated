import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");
const size = width * 0.6; // Adjust size based on screen width
const strokeWidth = 10;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

// Define the progress levels for each circle
const circles = [
  { color: "#4CAF50", progress: 80 }, // Outer Green (80%)
  { color: "#FFA726", progress: 60 }, // Middle Orange (60%)
  { color: "#5C3D6E", progress: 40 }, // Inner Purple (40%)
];

const MultiCircleProgress = () => {
  const animatedValues = useRef(
    circles.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    Animated.stagger(
      200,
      animatedValues.map((val, index) =>
        Animated.timing(val, {
          toValue: circles[index].progress,
          duration: 1000,
          useNativeDriver: false,
        })
      )
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {circles.map((circle, index) => {
          const strokeDashoffset = animatedValues[index].interpolate({
            inputRange: [0, 100],
            outputRange: [
              circumference,
              circumference * (1 - circle.progress / 100),
            ],
          });

          return (
            <React.Fragment key={index}>
              {/* Background Circle */}
              <Circle
                stroke={circle.color}
                fill="none"
                strokeWidth={strokeWidth}
                cx={size / 2}
                cy={size / 2}
                r={radius - index * 20} // Inner circles get smaller
                opacity={0.2} // Faded background color
              />

              {/* Progress Circle */}
              <Circle
                stroke={circle.color}
                fill="none"
                strokeWidth={strokeWidth}
                cx={size / 2}
                cy={size / 2}
                r={radius - index * 20}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                origin={`${size / 2}, ${size / 2}`}
              />
            </React.Fragment>
          );
        })}
      </Svg>

      {/* Center Text */}
      <View style={styles.textContainer}>
        <Text style={styles.percentage}>60%</Text>
        <Text style={styles.label}>Progress</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  percentage: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#173F5F",
  },
  label: {
    fontSize: 16,
    color: "#607D8B",
  },
});

export default MultiCircleProgress;
