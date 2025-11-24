import { FunctionComponent, useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import { moderateScale } from "../../../../constant/responsiveStyle";
import CommonHeader from "../../../../components/Header/commonHeader";
import BarChartComponent from "./BarChartComponent";

interface ActivityGoalOverviewProps {
  navigation?: any;
  route?: any;
}

const ActivityGoalOverview: FunctionComponent<ActivityGoalOverviewProps> = ({
  navigation,
  route,
}) => {
  const [selectedData, setselectedData] = useState(route?.params?.data);
  const [selectedTab, setSelectedTab] = useState("Day");

  console.log("route-=-=>", route);
  useEffect(() => {
    setselectedData(route?.params?.data);
  }, []);
  const getHeader = () => {
    return (
      <View style={{ backgroundColor: colors.SurfCrest }}>
        <View
          style={{
            height: moderateScale(80),
            backgroundColor: colors.darkprussianBlue,
            justifyContent: "center",
            padding: moderateScale(15),
            borderEndEndRadius: moderateScale(50),
            borderEndStartRadius: moderateScale(50),
            // borderRadius: moderateScale(10),
          }}
        >
          <CommonHeader
            headerName={"Activity overview"}
            onBackPress={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  };
  interface ProgressItem {
    label: string;
    value: number;
    // ... other properties
  }
  const TabSelector = () => {
    return (
      <View style={Tabstyles.container}>
        <View style={Tabstyles.tabContainer}>
          {["Day", "Week", "Overall"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={Tabstyles.tab}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  Tabstyles.tabText,
                  { color: `rgba(160, 160, 160, 1)` },
                  selectedTab === tab && Tabstyles.selectedTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={Tabstyles.indicatorContainer}>
          <View
            style={[
              Tabstyles.indicator,
              {
                left:
                  selectedTab === "Day"
                    ? "0%"
                    : selectedTab === "Week"
                    ? "33%"
                    : "66%",
              },
            ]}
          />
        </View>
      </View>
    );
  };
  const BarGraph = ({ item }: { item: ProgressItem }) => {
    console.log("item-=-=>", item);

    if (!item) return null;

    const progressData = data.activityProgressDetails[0].progressBreakdown;

    // Find max percentage for proper scaling
    const maxPercentage = Math.max(
      ...progressData.map((item) => item.progressPercentage || 0),
      1
    );

    return (
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chartContainer}>
            {/* {progressData.map((bar, index) => ( */}
            <View style={styles.barGroup}>
              <View
                style={[
                  styles.bar,
                  { height: (item.progressPercentage / maxPercentage) * 200 }, // Scaling max height = 200
                ]}
              />
              <Text style={styles.label}>{item.label}</Text>
            </View>
            {/* ))} */}
          </View>
        </ScrollView>
      </View>
    );
  };

  const data = {
    userId: 1,
    timePeriod: "Day",
    resultFor: "Activities",
    progressStatus: {
      title: "Excellent",
      Description: "",
    },
    activityProgressDetails: [
      {
        id: 101,
        title: "Sleep",
        duration: "8 hrs",
        startDate: "2025-01-28",
        endDate: "2025-06-31",
        scheduleTime: ["07:00 AM", "01:00 PM"],
        logo: "",
        frequency: "Daily",
        frequencyCount: "2 times",
        progressBreakdown: [
          {
            label: "Today",
            progressValue: "5 hrs",
            progressPercentage: 62.5,
          },
          {
            label: "e",
            progressValue: "5 hrs",
            progressPercentage: 78,
          },
          {
            label: "w",
            progressValue: "5 hrs",
            progressPercentage: 21,
          },
        ],
        description: "Improve mindfulness and reduce stress",
        graphType: "circular",
      },
    ],
  };
  return (
    console.log("selectedData-=-=>", selectedData),
    (
      <ScreenWrapper statusBarColor={colors.darkPrussianBlue}>
        {getHeader()}
        <TabSelector />
        <View style={{ flex: 1, backgroundColor: colors.SurfCrest }}>
          {/* <FlatList
            data={data.activityProgressDetails[0].progressBreakdown}
            renderItem={BarGraph}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          /> */}
          <BarChartComponent />
        </View>
      </ScreenWrapper>
    )
  );
};
const Bargraphstyles = StyleSheet.create({
  container: {
    // height: 35,
    backgroundColor: "red",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2c3e50",
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    // height: 100,
    // width: 100,
    // paddingHorizontal: 8,
  },
  barGroup: {
    alignItems: "center",
    marginHorizontal: 2,
  },
  bar: {
    width: 5,
    backgroundColor: colors.OceanGreen,
    borderTopRightRadius: 1,
    borderTopLeftRadius: 1,
    marginBottom: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  percentageLabel: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 1,
  },
  dayLabel: {
    color: "#7f8c8d",
    fontSize: 2,
    textAlign: "center",
  },
});
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F0E0",
  },
  container: {
    flexDirection: "row",
    padding: 10,
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 220,
  },
  barGroup: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  bar: {
    width: 30,
    backgroundColor: "#0E3441",
    borderRadius: 10,
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    color: "#0E3441",
  },
});
const Tabstyles = StyleSheet.create({
  container: {
    backgroundColor: colors.SurfCrest, // Light greenish background
    paddingVertical: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 16,
    color: "#A0A0A0", // Default text color
  },
  selectedTabText: {
    color: `rgba(4, 58, 78, 1)`,
    // Darker color for selected tab
    fontWeight: "bold",
  },
  indicatorContainer: {
    height: 2,
    backgroundColor: `rgba(163, 191, 171, 1)`,
    marginTop: 5,
    position: "relative",
  },
  indicator: {
    width: "33%",
    height: 2,
    backgroundColor: "#4B4B4B", // Highlight color
    position: "absolute",
  },
});
export default ActivityGoalOverview;
