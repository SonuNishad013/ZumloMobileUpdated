import React from "react";
import { View, Text, FlatList, FlatListProps } from "react-native";
import { sortByCreatedDateDecending } from "../../helper/duration";
import { strings } from "../../constant/strings";
import StepsHistory from "./HistoryVitals/StepsHistory";
import SleepDataHistory from "./HistoryVitals/SleepHistory";
import HeartRateHistory from "./HistoryVitals/HeartRateHistory";
import AddBloodPressureHistory from "./HistoryVitals/AddBloodPressureHistory";
import VitalSummaryStyles from "./styles";

interface CommonHistoryProps<T> {
  data: T[];
  title: string;
  subTitle?: string;
  renderItem: FlatListProps<T>["renderItem"];
}

const CommonHistory = <T,>({
  data,
  title,
  renderItem,
  subTitle,
}: CommonHistoryProps<T>) => {
  if (data.length === 0) return null;

  return (
    <>
      <View style={VitalSummaryStyles?.commonHistoryContainer}>
        <Text style={VitalSummaryStyles?.commonHistoryText}>{title}</Text>
        <View style={VitalSummaryStyles?.commonHistoryDashline} />
      </View>
      {subTitle && (
        <Text style={VitalSummaryStyles?.commonHistoryTextSubtitle}>
          {subTitle}
        </Text>
      )}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => "key" + index}
      />
    </>
  );
};

const renderVitalHistory = (data: any[], type: any) => {
  console.log("type==>>>", type, data);
  return (
    <View>
      {type === "StepCount" && (
        <CommonHistory
          data={sortByCreatedDateDecending(data)}
          title={"Your step log"}
          subTitle={
            "A quick look at your recent activity—when you moved, how far you went, and how strong you showed up."
          }
          renderItem={({ item }) => <StepsHistory item={item} />}
        />
      )}
      {type === "Sleep" && (
        <CommonHistory
          data={sortByCreatedDateDecending(data)}
          title={strings?.recentHistory}
          renderItem={({ item }) => <SleepDataHistory item={item} />}
        />
      )}
      {type === "HeartRate" && (
        <CommonHistory
          data={sortByCreatedDateDecending(data)}
          title={strings?.recentHistory}
          renderItem={({ item }) => <HeartRateHistory item={item} />}
        />
      )}
      {type === "BloodPressure" && (
        <CommonHistory
          data={sortByCreatedDateDecending(data)}
          title={strings?.recentHistory}
          renderItem={({ item }) => <AddBloodPressureHistory item={item} />}
        />
      )}
    </View>
  );
};
export default renderVitalHistory;
