import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import WellnessHeader from "./WellnessHeader";
import { strings } from "../../../../constant/strings";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { CupIcon, NoActivity, journal } from "../../../../assets";
import colors from "../../../../constant/colors";
import CommonButton from "../../../../components/Buttons/commonButton";
import MultiGoalProgress from "../../Wellness/Overview/MultiGoalProgress";
import {
  DayType_ENUM,
  Enum_moodType,
  Enum_SummaryTabFromValue,
  SHOW_MODAL_FOR_ENUM,
} from "../../../../constant/ENUM";
import { getPlan } from "./NodataView";
import logger from "../../../../constant/logger";
import MoodMeter from "../../../MoodTracking/TrackHistory/MoodMeter";
import moment from "moment";
import { graphValue } from "../../../MoodTracking/TrackHistory/AllMoodLists";
import { imagePath } from "../../../../assets/png/imagePath";
import { ddd_ } from "../../../../constant/dateFormatConstants";
import navigationString from "../../../../navigation/navigationString";
import { getMoodIconsByMoodType } from "./helper";
interface JournalListingProps {
  onShowMore?: () => void;
  data: any;
  addJournal: () => void;
  navigation: any;
}

const journalProgress = 65;
const JournalListing: React.FC<JournalListingProps> = ({
  onShowMore,
  data,
  addJournal,
  navigation,
}) => {
  const { daysJournal, graph, summary, totalDays } = data;
  const [moodsBarGraphData, setMoodsBarGraphData] = useState<any>([]);

  const [totalJournalCount, setTotalJournalCount] = useState(0);
  const [journalRawData, setJournalRawData] = useState([
    { progress: 0, color: colors?.royalOrangeDark },
    { progress: 0, color: colors?.polishedPine },
  ]);
  useEffect(() => {
    logger("summary___", summary);
    if (!summary) {
      return;
    }
    const result_total_days_journal = summary.find(
      (item: any) => item?.moodJournalType == DayType_ENUM?.Total
    );
    const result_total_days_consecutive = summary.find(
      (item: any) =>
        item?.moodJournalType == DayType_ENUM?.Consecutive_journal_summary
    );
    setTotalJournalCount(result_total_days_journal?.totalRecords);

    const graph_for_total =
      (result_total_days_journal?.totalRecords / totalDays) * 100;
    const graph_for_consecutive =
      (result_total_days_consecutive?.totalRecords / totalDays) * 100;

    let arr = [
      {
        progress: graph_for_total > 100 ? 100 : graph_for_total,
        color: colors?.royalOrangeDark,
      },
      {
        progress: graph_for_consecutive > 100 ? 100 : graph_for_consecutive,
        color: colors?.polishedPine,
      },
    ];
    setJournalRawData(arr);
  }, [summary]);

  useEffect(() => {
    const getMoodType = (rating: number) => {
      if (rating <= 2) {
        return Enum_moodType?.Feeling_down;
      }
      if (rating <= 4) {
        return Enum_moodType?.Feeling_low;
      }
      if (rating <= 6) {
        return Enum_moodType?.Neutral;
      }
      if (rating <= 8) {
        return Enum_moodType?.Feeling_happy;
      }
      if (rating <= 10) {
        return Enum_moodType?.Feeling_extremely_joyful;
      }

      return "Unknown";
    };
    let arr = [];
    for (let i = 0; i < graph?.length; i++) {
      const formatted = graph[i]?.date.replace(/Z$/, "");

      let object = {
        createdDate: formatted,
        descrption: "",
        logo: "",
        moodTrackingStepAnswerId: i,
        moodType: getMoodType(
          graph[i]?.emotionRating / graph[i]?.numberOfRecords
        ),
        tips: [],
      };
      arr.push(object);
    }

    setMoodsBarGraphData(arr);
  }, [summary]);
  return (
    logger("journalRawData___", { journalRawData, totalJournalCount }),
    (
      <View style={{ flex: 1 }}>
        {data?.summary?.length ? (
          <>
            <WellnessHeader
              title={"Your journaling journey"}
              subtitle={
                "Each entry is a moment of reflection. Here’s a look at your journaling streaks, moods, and momentum."
              }
            />
            <MultiGoalProgress
              progress={totalJournalCount}
              goals={journalRawData}
              from={Enum_SummaryTabFromValue?.JournalListing}
              goalContainer={styles?.goalContainer}
              fromScreen={SHOW_MODAL_FOR_ENUM?.JOURNAL}
            />

            <Text
              style={[styles?.descriptionText, styles?.moodBarGraphDescription]}
            >
              {
                strings?.Emotional_stats_for_your_Consecutive_days_journals_Total_days_journals
              }
            </Text>
            <View style={styles.card}>
              <FlatList
                data={moodsBarGraphData}
                style={styles.flatList}
                keyExtractor={(item, index) => "key" + index}
                horizontal
                renderItem={({ item, index }) => {
                  return (
                    <MoodMeter
                      time={moment(
                        moment(item?.createdDate + "Z").toLocaleString()
                      ).format(ddd_)}
                      source={getMoodIconsByMoodType(item?.moodType)}
                      meterFill={{
                        height: graphValue(item?.moodType),
                        backgroundColor: "rgba(203, 226, 209, .8)",
                      }}
                      timeText={styles?.timeTextStyle}
                      container={{
                        marginRight: moderateScale(18),
                      }}
                      meterBackground={styles?.meterBackgroundStyle}
                      hideEmoji={graphValue(item?.moodType) === 0}
                    />
                  );
                }}
              />
            </View>

            <View style={styles?.showMeMoreButtonContainer}>
              <CommonButton
                btnName={strings?.Show_More}
                onPress={() => {
                  navigation?.navigate(navigationString?.IndependentJournals, {
                    dayType: 1,
                    summary: summary,
                  });
                }}

                // onPress={onShowMore}
              />
            </View>
          </>
        ) : (
          <>
            {getPlan(
              {
                title: "Your thoughts deserve a home ",
                subTitle:
                  "Got a feeling, want to vent, or just do a brain dump? Let it out here—no filter, no judgment, just you and me.",
                btnName: "Start writing ",
                description: "",
                icon: journal,
                isVitals: false,
                textColor: colors?.SurfCrest,
                backgroundColor: colors?.themeColor,
              },
              addJournal
            )}
          </>
        )}
      </View>
    )
  );
};

export default JournalListing;

const styles = StyleSheet.create({
  goalContainer: {
    width: "100%",
    justifyContent: "flex-start",
    gap: moderateScale(10),
    marginVertical: moderateScale(20),
  },
  progressTextContainer: {
    marginVertical: moderateScale(30),
  },
  progressTextIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(30),
  },
  encouragementHeaderText: {
    fontSize: textScale(14),
    fontWeight: "600",
    marginHorizontal: moderateScale(10),
    color: colors.SurfCrest,
  },
  encouragementDescText: {
    textAlign: "center",
    color: colors.SurfCrest,
  },
  showMeMoreButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(40),
    marginBottom: moderateScale(150),
  },
  descriptionText: {
    fontSize: textScale(12),
    color: colors?.SurfCrest,
    fontWeight: "400",
    textAlign: "center",
    marginTop: moderateScale(30),
  },
  card: {
    backgroundColor: colors?.moodMeterContaner,
    borderRadius: moderateScale(18),
    paddingTop: moderateScale(40),
    paddingBottom: moderateScale(25),
  },
  flatList: {
    paddingHorizontal: 12,
  },
  moodBarGraphDescription: {
    textAlign: "auto",
    marginVertical: moderateScale(10),
  },
  meterBackgroundStyle: {
    backgroundColor: "rgba(4, 58, 78, .25)",
  },
  timeTextStyle: {
    fontSize: textScale(10),
    color: colors?.SurfCrest,
    fontWeight: "600",
  },
});
