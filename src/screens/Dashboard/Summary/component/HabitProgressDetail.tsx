import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import CommonHeader from "../../../../components/Header/commonHeader";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import allActions from "../../../../redux/actions";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../../../constant/appConstant";
import {
  Enum_SummaryTabFromValue,
  SHOW_MODAL_FOR_ENUM,
} from "../../../../constant/ENUM";
import MultiGoalProgress from "../../Wellness/Overview/MultiGoalProgress";
import CommonLoader from "../../../../components/Loader";
import { PoppinsItalic } from "../../../../assets/fonts";
import { Streaks } from "../../../../assets";
import { LabelValue } from "./HabitTrackingOverview";
import { strings } from "../../../../constant/strings";
import logger from "../../../../constant/logger";

interface HabitPropgressProps {
  navigation?: any;
  route?: any;
}
const HabitProgressDetail: React.FC<HabitPropgressProps> = ({
  navigation,
  route,
}) => {
  const { habitId } = route?.params;
  const [isLoader, setIsLoader] = useState(false);
  const [progressDetails, setProgressDetails] = useState<any>(null);
  useEffect(() => {
    if (habitId) {
      getHabitProgress();
    }
  }, [habitId]);
  const getHabitProgress = async () => {
    setIsLoader(true);
    try {
      const request = { habitId };
      const response = await allActions?.HabitAction?.getHabitProgressAPI(
        request,
        API_FUN_NAMES?.getHabitProgressAPI
      );
      logger("response____", response);
      if (response) {
        setIsLoader(false);
        if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
          setProgressDetails(response?.data);
        }
      }
    } catch (error) {
      setIsLoader(false);
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={styles.flex1}>
        <View style={styles.backButtonHeaderContainer}>
          <CommonHeader
            headerName={`Habits`}
            onBackPress={() => navigation.goBack()}
            iconContainer={styles.iconContainer}
          />
        </View>
        {isLoader ? (
          <CommonLoader />
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.habitNameText}>{progressDetails?.name}</Text>
            <MultiGoalProgress
              progress={progressDetails?.completionRate}
              goals={[
                {
                  progress: progressDetails?.completionRate,
                  color: "#FF9D48",
                },
              ]}
              from={Enum_SummaryTabFromValue?.JournalListing}
              fromScreen={SHOW_MODAL_FOR_ENUM?.HABITTAB}
            />
            <Text
              style={{
                fontSize: textScale(14),
                color: colors?.SurfCrest,
                textAlign: "center",
                marginBottom: moderateScale(20),
                marginHorizontal: moderateScale(19),
              }}
            >
              {"Progress takes practice. You’re showing up—and that counts."}
            </Text>
            <View style={styles.detailsContainer}>
              <View style={styles.detailsRow}>
                {LabelValue(
                  strings?.Completion_count,
                  `${Number(progressDetails?.completionCount)}/${Number(
                    progressDetails?.target
                  )}`
                )}

                {LabelValue(
                  "Target : ",
                  `${Number(progressDetails?.target).toFixed(0)} total sessions`
                )}
                {LabelValue(
                  "Average weekly completion : ",
                  `${Number(progressDetails?.avgWeeklyCompletion)} day`
                )}
              </View>
            </View>
            <View style={styles.streakContainer}>
              <View style={styles.streakInfo}>
                {/* {LabelValue(
                  strings?.Current_streak,
                  `${
                    Number(progressDetails?.currentStreak?.streak).toFixed(0) ||
                    0
                  }`
                )} */}
                <Text style={styles.statsLabel}>
                  {strings?.Current_streak}
                  <Text style={styles.statsValue}>
                    {Number(progressDetails?.currentStreak?.streak).toFixed(
                      0
                    ) || 0}
                    {Number(progressDetails?.currentStreak?.streak) > 1
                      ? " days"
                      : " day"}
                  </Text>
                </Text>
                {/* {LabelValue(
                  strings?.Longest_streak,
                  `${
                    Number(progressDetails?.longestStreak?.streak).toFixed(0) ||
                    0
                  }`
                )} */}
                <Text style={styles.statsLabel}>
                  {strings?.Longest_streak}
                  <Text style={styles.statsValue}>
                    {Number(progressDetails?.longestStreak?.streak).toFixed(
                      0
                    ) || 0}{" "}
                    {Number(progressDetails?.currentStreak?.streak) > 1
                      ? " days"
                      : " day"}
                  </Text>
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles?.habitName}>{"Streak"}</Text>
                <Text
                  style={[
                    styles?.streakText,
                    { fontSize: textScale(18), color: colors?.royalOrangeDark },
                  ]}
                >
                  {`${Number(progressDetails?.currentStreak?.streak)} day${
                    Number(progressDetails?.currentStreak?.streak) > 1
                      ? "s"
                      : ""
                  }`}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default HabitProgressDetail;

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  iconContainer: { backgroundColor: "#00000033" },
  backButtonHeaderContainer: {
    paddingHorizontal: moderateScale(19),
    marginBottom: moderateScale(9),
  },
  contentContainer: {
    flex: 1,
    marginTop: moderateScale(20),
  },
  habitNameText: {
    fontSize: textScale(24),
    fontWeight: "500",
    color: colors?.royalOrangeDark,
    textAlign: "center",
    // fontFamily: PoppinsItalic,
  },
  detailsContainer: {
    marginHorizontal: moderateScale(19),
  },
  detailsRow: {
    gap: moderateScale(10),
  },
  streakContainer: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(19),
    backgroundColor: "rgba(35, 85, 98, 1)",
    padding: moderateScale(9),
    borderRadius: moderateScale(16),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  streakRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakText: {
    fontSize: textScale(24),
    fontWeight: "500",
    color: colors?.SurfCrest,
  },
  streakInfo: {
    justifyContent: "space-around",
  },
  statsLabel: {
    color: colors?.SurfCrest,
    fontSize: textScale(18),
    fontWeight: "400",
  },
  statsValue: {
    color: colors?.royalOrangeDark,
    fontSize: textScale(16),
    fontWeight: "600",
  },
  habitNameLabel: {
    color: colors?.SurfCrest,
    fontSize: textScale(16),
    fontWeight: "500",
    textAlign: "center",
  },
  habitName: {
    color: colors?.SurfCrest,
    fontSize: textScale(16),
    fontWeight: "600",
    // textAlign: "center",
  },
});
