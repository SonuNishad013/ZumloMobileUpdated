import {
  Alert,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import CommonHeader from "../../../../components/Header/commonHeader";
import { strings } from "../../../../constant/strings";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import {
  DayType_ENUM,
  Enum_moodType,
  Enum_StatusBarStyle,
} from "../../../../constant/ENUM";
import GoalsCard from "./goalComponent";
import navigationString from "../../../../navigation/navigationString";
import MoodCalendar from "./MoodCalendar";
import MoodMeter from "../../../MoodTracking/TrackHistory/MoodMeter";
import moment from "moment";
import { imagePath } from "../../../../assets/png/imagePath";
import { graphValue } from "../../../MoodTracking/TrackHistory/AllMoodLists";
import { ddd_ } from "../../../../constant/dateFormatConstants";
import logger from "../../../../constant/logger";
interface JournalsOverviewProps {
  navigation: any;
  route: any;
}
const graphData = [
  {
    createdDate: "2025-06-23T05:53:45.0460035",
    descrption: "Feeling joyful……",
    logo: "https://zumlofilestorage.blob.core.windows.net/static-files/Excellent_02_20241204110658.svg",
    moodTrackingStepAnswerId: 301,
    moodType: "Neutral",
    tips: [],
  },
  {
    createdDate: "2025-06-24T05:53:45.0460035",
    descrption: "Feeling joyful……",
    logo: "https://zumlofilestorage.blob.core.windows.net/static-files/Excellent_02_20241204110658.svg",
    moodTrackingStepAnswerId: 301,
    moodType: "Feeling happy",
    tips: [],
  },
];
export interface MoodJournalSummary {
  moodJournalType: number; // Use enum if available (e.g., DayType_ENUM)
  days: number;
  ai: number;
  manual: number;
  totalRecords?: number;
}
const JournalsOverview: React.FC<JournalsOverviewProps> = ({
  navigation,
  route,
}) => {
  const { daysJournal, graph, summary, totalDays } = route?.params?.data;

  const [consecutiveProgress, setConsecutiveProgress] = useState(0);
  const [totalDaysProgress, setTotalDaysProgress] = useState(0);

  const [moodsBarGraphData, setMoodsBarGraphData] = useState<any>([]);

  const [consecutiveData, setConsecutiveData] = useState<MoodJournalSummary>({
    moodJournalType: 0,
    days: 0,
    ai: 0,
    manual: 0,
  });
  const [totalDaysData, setTotalDaysData] = useState<MoodJournalSummary>({
    moodJournalType: 0,
    days: 0,
    ai: 0,
    manual: 0,
    // totalRecords
  });

  useEffect(() => {
    const result_total_days_journal = summary.find(
      (item: any) => item?.moodJournalType == DayType_ENUM?.Total
    );
    const result_total_days_consecutive = summary.find(
      (item: any) =>
        item?.moodJournalType == DayType_ENUM?.Consecutive_journal_summary
    );

    setConsecutiveData(result_total_days_consecutive); //
    setTotalDaysData(result_total_days_journal);

    const graph_for_total =
      (result_total_days_journal?.totalRecords / totalDays) * 100;
    const graph_for_consecutive =
      (result_total_days_consecutive?.totalRecords / totalDays) * 100;

    setConsecutiveProgress(graph_for_consecutive);
    setTotalDaysProgress(graph_for_total);

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
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <StatusBar translucent barStyle={Enum_StatusBarStyle?.light_content} />
      <View style={styles?.backButtonHeaderContainer}>
        <CommonHeader
          headerName={strings?.Journals}
          onBackPress={() => navigation.goBack()}
          iconContainer={styles?.iconContainer}
        />
      </View>
      <ScrollView style={styles?.container}>
        <View style={[styles?.container, styles?.innerContainer]}>
          <Text style={styles?.descriptionText}>
            {
              strings?.There_will_be_Consecutive_days_journals_Total_days_journals
            }
          </Text>
          <View style={{ marginTop: moderateScale(20) }}>
            <GoalsCard
              goalData={[
                {
                  activities: 1,
                  color: colors?.royalOrangeDark,
                  id: 727,
                  item: { title: "Consecutive days" },
                  progress: consecutiveProgress,
                  title: "Consecutive days",
                  overviewType: "Journals",
                  numberOfprompts: {
                    AiPrompts: consecutiveData?.ai,
                    Custom: consecutiveData?.manual,
                  },
                  numberOfJournals: consecutiveData?.totalRecords,
                },
                {
                  activities: 2,
                  color: colors?.polishedPine,
                  id: 727,
                  item: { title: "Total days" },
                  progress: totalDaysProgress,
                  title: "Total days",
                  overviewType: "Journals",
                  numberOfprompts: {
                    AiPrompts: totalDaysData?.ai,
                    Custom: totalDaysData?.manual,
                  },
                  numberOfJournals: totalDaysData?.totalRecords,
                },
              ]}
              onGoalCard={(id: any, _: any, itemsPressed: any) => {
                console.log("itemsPressed", itemsPressed?.item?.title);

                let DayType =
                  itemsPressed?.item?.title == DayType_ENUM.Consecutive_days
                    ? DayType_ENUM.Consecutive
                    : DayType_ENUM.Total;

                console.log("testData_1", itemsPressed);
                console.log("testData_2", DayType);
                console.log("testData_3", summary);
                navigation?.navigate(navigationString?.IndependentJournals, {
                  selectedJournalType: itemsPressed,
                  dayType: DayType,
                  summary: summary,
                });
              }}
              isGoalsCard={true}
            />
          </View>
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
              renderItem={({ item, index }) => (
                <MoodMeter
                  time={moment(
                    moment(item?.createdDate + "Z").toLocaleString()
                  ).format(ddd_)}
                  source={item?.logo ? { uri: item?.logo } : imagePath?.SadIcon}
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
              )}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default JournalsOverview;

const styles = StyleSheet.create({
  container: { flex: 1 },
  iconContainer: { backgroundColor: "#00000033" },
  backButtonHeaderContainer: {
    paddingHorizontal: moderateScale(19),
  },
  innerContainer: {
    paddingHorizontal: moderateScale(19),
    marginTop: moderateScale(10),
  },
  descriptionText: {
    fontSize: textScale(12),
    color: colors?.SurfCrest,
    fontWeight: "400",
    textAlign: "center",
  },
  card: {
    backgroundColor: colors?.moodMeterContaner,
    borderRadius: moderateScale(18),
    paddingTop: moderateScale(40),
    paddingBottom: moderateScale(25),
    marginTop: moderateScale(15),
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
