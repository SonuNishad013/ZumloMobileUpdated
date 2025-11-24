import React, { FunctionComponent } from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import {
  Enum_SummaryTabFromValue,
  SHOW_MODAL_FOR_ENUM,
} from "../../../../constant/ENUM";
import { strings } from "../../../../constant/strings";

interface MultiGoalProgressProps {
  progress: number;
  goals: { progress: number; color: string }[];
  from?: string;
  goalContainer?: ViewStyle;
  fromScreen?: any;
}
const getCircleListNames = (idx: number, from?: string) => {
  switch (from) {
    case Enum_SummaryTabFromValue?.JournalListing:
      return idx === 0 ? strings?.Consecutive_days : strings?.Total_days;

    case Enum_SummaryTabFromValue?.WellnessOverviewDetails:
      return `Goal ${idx + 1}`;
    default:
      return `Goal ${idx + 1}`;
  }
};
const MultiGoalProgress: FunctionComponent<MultiGoalProgressProps> = ({
  progress,
  goals,
  from,
  goalContainer,
  fromScreen,
}) => {
  const baseRadius =
    from === Enum_SummaryTabFromValue?.JournalListing
      ? 90
      : goals?.length < 2
      ? 70
      : 50;
  const strokeWidth =
    from === Enum_SummaryTabFromValue?.JournalListing ? 15 : 12; // reduced from 14
  const gap = 6; // reduced from 16

  return (
    <View style={styles?.container}>
      {!SHOW_MODAL_FOR_ENUM?.HABITTAB && (
        <View style={[styles?.goalContainer, goalContainer]}>
          {goals.map((goal, idx) => (
            <View key={idx} style={styles?.innerGoalContainer}>
              <View
                style={[styles?.seperat_Goals, { backgroundColor: goal.color }]}
              />
              <Text
                style={[
                  styles?.GoalsText,
                  {
                    color:
                      from == "WellnessOverviewDetails"
                        ? colors.prussianBlue
                        : colors.SurfCrest,
                  },
                ]}
              >
                {getCircleListNames(idx, from)}
              </Text>
            </View>
          ))}
        </View>
      )}

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

      <View style={styles?.progressContainer}>
        <Text
          style={[
            styles?.progressText,
            {
              color:
                from === "WellnessOverviewDetails"
                  ? colors.prussianBlue
                  : colors.SurfCrest,
            },
          ]}
        >
          {fromScreen == SHOW_MODAL_FOR_ENUM?.JOURNAL
            ? Number(progress).toFixed(0)
            : Number(progress).toFixed(2) + "%"}
        </Text>
        <Text
          style={[
            styles?.progressTitleStyle,
            {
              color:
                from === "WellnessOverviewDetails"
                  ? colors.prussianBlue
                  : colors.SurfCrest,
            },
          ]}
        >
          {fromScreen == SHOW_MODAL_FOR_ENUM?.JOURNAL ? "Journals" : "Progress"}
        </Text>
      </View>
    </View>
  );
};

export default MultiGoalProgress;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  goalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  innerGoalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: moderateScale(5),
  },
  seperat_Goals: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  GoalsText: {
    fontSize: textScale(12),
    fontWeight: "600",
  },
  progressContainer: {
    position: "absolute",
    top: "45%",
    left: "43%",
    alignItems: "center",
  },
  progressText: {
    fontSize: textScale(14),
    fontWeight: "bold",
  },
  progressTitleStyle: {
    fontSize: textScale(10),
    fontWeight: "bold",
  },
});
