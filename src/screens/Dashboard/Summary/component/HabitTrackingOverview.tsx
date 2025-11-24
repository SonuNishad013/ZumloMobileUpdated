import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getPlan } from "./NodataView";
import { HabitTrackingIcon, Streaks } from "../../../../assets";
import colors from "../../../../constant/colors";
import CommonLoader from "../../../../components/Loader";
import {
  Enum_HabitItemIsFrom,
  Enum_SummaryTabFromValue,
  SHOW_MODAL_FOR_ENUM,
} from "../../../../constant/ENUM";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import WellnessHeader from "./WellnessHeader";
import { strings } from "../../../../constant/strings";
import MultiGoalProgress from "../../Wellness/Overview/MultiGoalProgress";
import CommonButton from "../../../../components/Buttons/commonButton";
import navigationString from "../../../../navigation/navigationString";
interface HabitTrackingProps {
  addJournal?: any;
  isLoading: boolean;
  hasData?: boolean;
  habitOverviewData?: any;
  navigation: any;
}
const HabitTrackingOverview: React.FC<HabitTrackingProps> = ({
  addJournal,
  isLoading,
  hasData,
  habitOverviewData,
  navigation,
}) => {
  const DataForCircularGraph = {
    goals: [
      {
        progress: habitOverviewData?.completionRate,
        color: "#FF9D48",
      },
    ],
    progress: habitOverviewData?.completionRate,
  };

  return (
    <View style={styles.container}>
      {hasData ? (
        <View style={styles.innerContainer}>
          <WellnessHeader
            title={"Your Habit Progress"}
            subtitle={
              "Small actions. Daily wins. Here’s how your habits are shaping up."
            }
            subtitleStyle={{ textAlign: "center" }}
          />
          <MultiGoalProgress
            progress={DataForCircularGraph?.progress}
            goals={DataForCircularGraph?.goals}
            from={Enum_SummaryTabFromValue?.JournalListing}
            fromScreen={SHOW_MODAL_FOR_ENUM?.HABITTAB}
          />
          <View style={styles.statsRow}>
            {LabelValue(
              strings?.Total_Habits_Tracked,
              `${Number(habitOverviewData?.totalHabitsTracked).toFixed(0)}`
            )}
            {LabelValue(
              strings?.Habits_Completed,
              `${Number(habitOverviewData?.habitsCompleted).toFixed(0)}`
            )}
          </View>
          {LabelValue(
            strings?.Completion_Rate,
            `${Number(habitOverviewData?.completionRate).toFixed(2)}%`
          )}
          {habitOverviewData?.longestStreak?.streak !== 0 && (
            <>
              <Text style={styles?.streakLabel}>{"Longest streak"}</Text>
              <Text
                style={[
                  styles?.streakLabel,
                  {
                    fontWeight: "400",
                    marginTop: moderateScale(4),
                  },
                ]}
              >
                {"Your most consistent habit so far."}
              </Text>

              <View style={styles.streakContainer}>
                <View style={styles.streakInfo}>
                  <Text style={styles?.habitName}>{strings?.Habit_name}</Text>
                  <Text
                    style={[
                      styles?.streakLabel,
                      {
                        fontWeight: "600",
                        marginTop: moderateScale(4),
                        color: colors?.royalOrangeDark,
                      },
                    ]}
                  >
                    {habitOverviewData?.longestStreak?.title}
                  </Text>
                </View>
                <View style={styles.streakRow}>
                  <Text style={styles?.habitName}>{"Streak"}</Text>
                  <Text
                    style={[
                      styles?.streakText,
                      {
                        fontSize: textScale(20),
                        fontWeight: "600",
                        marginTop: moderateScale(4),
                        color: colors?.royalOrangeDark,
                      },
                    ]}
                  >
                    {`${Number(habitOverviewData?.longestStreak?.streak)} day${
                      Number(habitOverviewData?.longestStreak?.streak) > 1
                        ? "s"
                        : ""
                    }`}
                  </Text>
                </View>
              </View>
            </>
          )}
          {habitOverviewData?.currentStreak?.streak !== 0 && (
            <>
              <Text style={styles?.streakLabel}>{"Current streak"}</Text>
              <Text
                style={[
                  styles?.streakLabel,
                  {
                    fontWeight: "400",
                    marginTop: moderateScale(4),
                  },
                ]}
              >
                {"Your strongest streak so far."}
              </Text>

              <View style={styles.streakContainer}>
                <View style={styles.streakInfo}>
                  <Text style={styles?.habitName}>{strings?.Habit_name}</Text>
                  <Text
                    style={[
                      styles?.streakLabel,
                      {
                        fontWeight: "600",
                        marginTop: moderateScale(4),
                        color: colors?.royalOrangeDark,
                      },
                    ]}
                  >
                    {habitOverviewData?.currentStreak?.title}
                  </Text>
                </View>
                <View style={styles.streakRow}>
                  <Text style={styles?.habitName}>{"Streak"}</Text>
                  <Text
                    style={[
                      styles?.streakText,
                      {
                        fontSize: textScale(20),
                        fontWeight: "600",
                        marginTop: moderateScale(4),
                        color: colors?.royalOrangeDark,
                      },
                    ]}
                  >
                    {`${Number(habitOverviewData?.currentStreak?.streak)} day${
                      Number(habitOverviewData?.currentStreak?.streak) > 1
                        ? "s"
                        : ""
                    }`}
                  </Text>
                </View>
              </View>
            </>
          )}
          <CommonButton
            btnName="View all habits"
            mainContainer={styles.buttonContainer}
            onPress={() => {
              navigation?.navigate(navigationString?.AllHabitList, {
                isFrom: Enum_HabitItemIsFrom?.HABITPROGRESS,
              });
            }}
          />
          <View style={{ paddingTop: moderateScale(100) }} />
        </View>
      ) : (
        <>
          {getPlan(
            {
              title: "Tiny habits, big shifts",
              subTitle:
                "Small daily actions can make a world of difference. Let’s build a routine that works for you—one habit at a time.",
              btnName: "Add a habit",
              description: "",
              icon: HabitTrackingIcon,
              isVitals: false,
              textColor: colors?.SurfCrest,
              backgroundColor: colors?.themeColor,
            },
            addJournal
          )}
        </>
      )}
      {isLoading && <CommonLoader />}
    </View>
  );
};

export default HabitTrackingOverview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(15),
  },
  statsLabel: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "400",
  },
  statsValue: {
    color: colors?.royalOrangeDark,
    fontSize: textScale(16),
    fontWeight: "600",
  },
  buttonContainer: {
    width: "100%",
    marginVertical: moderateScale(26),
  },
  streakContainer: {
    marginTop: moderateScale(9),
    backgroundColor: "rgba(35, 85, 98, 1)",
    padding: moderateScale(9),
    borderRadius: moderateScale(16),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  streakRow: {
    // flexDirection: "row",
    alignItems: "center",
  },
  streakText: {
    fontSize: textScale(24),
    fontWeight: "500",
    color: colors?.royalOrangeDark,
    maxWidth: moderateScale(250),
  },
  streakInfo: {
    justifyContent: "space-around",
    maxWidth: moderateScale(250),
  },
  habitNameLabel: {
    color: colors?.SurfCrest,
    fontSize: textScale(16),
    fontWeight: "500",
    textAlign: "center",
  },
  habitName: {
    color: colors?.SurfCrest,
    fontSize: textScale(15),
    fontWeight: "600",
    // textAlign: "center",
  },
  streakLabel: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "500",
    marginTop: moderateScale(19),
  },
});

export const LabelValue = (label: string, value: string) => {
  return (
    <Text style={styles.statsLabel}>
      {label}
      <Text style={styles.statsValue}>{value}</Text>
    </Text>
  );
};
