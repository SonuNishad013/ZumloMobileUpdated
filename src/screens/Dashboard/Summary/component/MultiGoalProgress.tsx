import React, { FunctionComponent } from "react";
import { View, Text } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";

interface MultiGoalProgressProps {
  progress: number;
  goals: { progress: number; color: string }[];
  from?: string;
}
// const MultiGoalProgress = ({ goals = [], progress = 0 }) => {
const MultiGoalProgress: FunctionComponent<MultiGoalProgressProps> = ({
  progress,
  goals,
  from,
}) => {
  const baseRadius = 50;
  const strokeWidth = 12; // reduced from 14
  const gap = 6; // reduced from 16

  return (
    console.log("goals-=-=>", progress, goals),
    (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          {goals.map((goal, idx) => (
            <View
              key={idx}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: moderateScale(5),
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: goal.color,
                  borderRadius: 5,
                  marginRight: 5,
                }}
              />
              <Text
                style={{
                  color:
                    from == "WellnessOverviewDetails"
                      ? colors.prussianBlue
                      : colors.SurfCrest,
                  fontSize: textScale(12),
                  fontWeight: "600",
                }}
              >{`Goal ${idx + 1}`}</Text>
            </View>
          ))}
        </View>

        <Svg width="250" height="250">
          <G rotation="-90" origin="125,125">
            {goals.map((goal, index) => {
              const radius = baseRadius + index * (strokeWidth + gap);
              const circumference = 2 * Math.PI * radius;
              const activeOffset = circumference * (1 - goal.progress / 100);

              return (
                <>
                  {/* Inactive Red Track */}
                  <Circle
                    key={`bg-${index}`}
                    cx="125"
                    cy="125"
                    r={radius}
                    stroke={
                      from == "WellnessOverviewDetails"
                        ? `rgb(191,215,193)`
                        : `rgb(68,103,111)`
                    }
                    strokeWidth={strokeWidth}
                    fill="none"
                  />

                  {/* Active Progress */}
                  <Circle
                    key={`fg-${index}`}
                    cx="125"
                    cy="125"
                    r={radius}
                    stroke={goal.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={activeOffset}
                    fill="none"
                    strokeLinecap="round"
                  />
                </>
              );
            })}
          </G>
        </Svg>

        <View
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: [{ translateX: moderateScale(-25) }, { translateY: 0 }],
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: textScale(14),
              fontWeight: "bold",
              color: colors.SurfCrest,
            }}
          >
            {progress}%
          </Text>
          <Text
            style={{
              fontSize: textScale(10),
              fontWeight: "bold",
              color: colors.SurfCrest,
            }}
          >
            Progress
          </Text>
        </View>
      </View>
    )
  );
};

export default MultiGoalProgress;
