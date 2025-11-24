import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import moment from "moment";
import CommonLineGraph from "../../components/Graph/CommonLineGraph";
import colors from "../../constant/colors";
import CircularProgressBar from "./CustomCircularBar";
import DailyActivitiesCard from "../../components/DailyActivitiesCard/DailyActivitiesCard";
import { processGoals } from "./helperFunction";
import { capitalizeFirstLetter } from "../../validations/capitalizeFirstLetter";
import { formatSentenceCase } from "../../helper/sentenceCase";

const GoalItem = ({ item, index }: any) => (
  <View
    style={[styles.goalContainer, index % 2 === 0 && styles.goalMarginRight]}
  >
    <Text style={styles.goalTitle}>
      {item?.desc === "endDate"
        ? moment(item.title).format("MM-DD-YYYY")
        : item?.title || "--"}
    </Text>
    <Text style={styles.goalDesc}>{convertKeyToString(item.desc)}</Text>
  </View>
);

const convertKeyToString = (data: string) => {
  const keyMapping: { [key: string]: string } = {
    durationOfPlan: "Duration of plan",
    regularActivity: "Regular activity",
    goalCount: "No. of Goals",
    endDate: "End Date",
    allActivities: "All activities",
  };
  return keyMapping[data] || "";
};

const WellnessCompleted = ({
  graphData,
  overviewData,
  goals,
  dailyActivities,
  navigation,
}: any) => {
  const filterKeys = ["activityFeedbackResponse", "goalProgress", "startDate"];
  const result: any[] = goals?.length !== 0 ? processGoals(goals) : [];

  const newData = {
    date: Object.keys(graphData),
    value: Object.values(graphData),
  };
  const [isSeeAll, setIsSeeAll] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {/* {Object.keys(graphData).length !== 0 && (
        <>
          <CommonLineGraph
            data={newData?.value.reverse()}
            days={newData?.date.reverse()}
          />
        </>
      )} */}

      {overviewData && (
        <FlatList
          data={overviewData}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item, index }) =>
            !filterKeys.includes(item?.desc) && (
              <GoalItem item={item} index={index} />
            )
          }
          keyExtractor={(item, index) => `${item.title}-${index}`}
        />
      )}

      {result?.length !== 0 && (
        <>
          <Text style={styles.goalProgressText}>Goals progress</Text>
          <FlatList
            data={result}
            numColumns={2}
            keyExtractor={(item, index) => "key" + index}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item, index }) => {
              const progress: number =
                (item?.GoalsProgress?.currentSubmition /
                  item?.GoalsProgress?.totalSubmition) *
                100;
              const GoalsProgressValue = () => {
                if (isNaN(progress)) {
                  return 0;
                }
                if (progress === Infinity) {
                  return 100;
                } else {
                  return progress.toFixed(1);
                }
              };

              const randomColors = [
                colors?.royalOrangeDark,
                colors?.backgroundTheme,
                colors?.polishedPine,
              ];
              const notEven = result?.length % 2 === 1;
              const lastIndex = notEven ? result?.length : result?.length - 1;

              return (
                <View
                  style={[
                    styles.goalProgressItem,
                    {
                      flex:
                        result.length / 2 != 0 || index == result.length - 1
                          ? 0.5
                          : 1,
                      backgroundColor: colors.surfCrustOp3,
                    },
                  ]}
                >
                  <>
                    <Text style={styles.goalProgressTitle}>
                      {formatSentenceCase(item?.title)}
                    </Text>
                    <CircularProgressBar
                      value={GoalsProgressValue()}
                      size={120}
                      color={
                        index % 3 === 1
                          ? randomColors[0]
                          : index % 3 === 2
                          ? randomColors[1]
                          : randomColors[2]
                      }
                    />
                  </>
                </View>
              );
            }}
          />
        </>
      )}
      {dailyActivities.length !== 0 && (
        <>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.dailyActivitiesText}>Daily activities</Text>
            {dailyActivities.length > 3 && (
              <TouchableOpacity onPress={() => setIsSeeAll(!isSeeAll)}>
                <Text
                  style={[
                    styles.dailyActivitiesText,
                    { color: colors?.royalOrangeDark },
                  ]}
                >
                  {isSeeAll ? `See less` : `See all`}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            data={!isSeeAll ? dailyActivities.slice(0, 3) : dailyActivities}
            contentContainerStyle={styles.dailyActivitiesContainer}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item, index }: any) => (
              <DailyActivitiesCard
                navigation={navigation}
                item={item}
                title={capitalizeFirstLetter(item?.title)}
                description={item?.activityType}
                minutes={item?.duration}
                count={item?.frequencyCount?.split(" ")[0]}
                frequency={item?.frequency}
                index={index}
              />
            )}
          />
        </>
      )}
    </View>
  );
};

export default WellnessCompleted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: moderateScale(30),
  },
  flatListContainer: {
    gap: moderateScale(10),
    justifyContent: "space-between",
    paddingVertical: moderateScale(15),
    marginBottom: moderateScale(25),
  },
  goalContainer: {
    backgroundColor: colors.surfCrustOp3,
    borderRadius: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: moderateScale(15),
    paddingVertical: moderateScale(30),
    marginTop: moderateScale(15),
  },
  goalTitle: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.royalOrange,
    textAlign: "center",
  },
  goalDesc: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors.SurfCrest,
  },
  goalMarginRight: {
    marginRight: moderateScale(15),
  },
  infoText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: textScale(14),
    padding: moderateScale(20),
    color: colors.royalOrange,
  },
  goalProgressText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginVertical: moderateScale(15),
  },
  columnWrapper: {
    gap: 10,
  },

  goalProgressItem: {
    gap: 10,
    backgroundColor: colors.surfCrustOp3,
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(15),
    marginBottom: moderateScale(19),
  },
  goalProgressTitle: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    padding: moderateScale(15),
  },
  dailyActivitiesText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginVertical: moderateScale(15),
  },
  dailyActivitiesContainer: {
    marginVertical: moderateScale(15),
    gap: moderateScale(15),
  },
});
