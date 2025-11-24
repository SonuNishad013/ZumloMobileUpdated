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
import CircularProgress from "react-native-circular-progress-indicator";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../../constant/responsiveStyle";
import CommonHeader from "../../../../components/Header/commonHeader";
import MeditationCard from "./MeditationCard";
import navigationString from "../../../../navigation/navigationString";

interface GoalOverViewProps {
  navigation?: any;
  route?: any;
}
const getHeader = (navigation: any) => {
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
          headerName={"Goal overview"}
          onBackPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};
const GoalOverView: FunctionComponent<GoalOverViewProps> = ({
  navigation,
  route,
}) => {
  const { data } = route.params;
  const [routeData, setRouteData] = useState<any>(route.params?.data);
  console.log("route-=-=-=->", data);
  useEffect(() => {
    setRouteData(route.params?.data);
  }, [navigation]);
  const [selectedTab, setSelectedTab] = useState("Day");

  const renderItem = (item: any) => {
    let data = {
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
              label: "yesterday",
              progressValue: "5 hrs",
              progressPercentage: 55,
            },
          ],
          description: "Improve mindfulness and reduce stress",
          graphType: "circular",
        },
      ],
    };
    return (
      <TouchableOpacity
        style={{}}
        onPress={() => {
          console.log("check render item-=-=renderItem", item);

          navigation.navigate(navigationString.ActivityGoalOverview, {
            data,
          });
        }}
      >
        <MeditationCard item={item.item} />
      </TouchableOpacity>
    );
  };
  const getActivityHeader = () => {
    return (
      <View
        style={{
          width: width,
          marginHorizontal: moderateScale(15),
        }}
      >
        <Text
          style={{
            fontSize: textScale(20),
            color: colors.prussianBlue,
            fontWeight: "600",
          }}
        >{`${"Activities"}`}</Text>
        <Text
          style={{
            fontSize: textScale(12),
            color: colors.prussianBlue,
            fontWeight: "600",
            marginTop: moderateScale(2),
          }}
        >{`${"There’ll be 4-5 activities assigned to you."}`}</Text>
      </View>
    );
  };
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

  return (
    <ScreenWrapper statusBarColor={colors.darkPrussianBlue}>
      {getHeader(navigation)}
      <TabSelector />
      <ScrollView style={{ flex: 1, backgroundColor: colors?.red }}>
        <View style={{ flex: 1, backgroundColor: colors.SurfCrest }}>
          <View
            style={{
              height: height / 4,
              justifyContent: "center",
              alignItems: "center",
              width: width,
            }}
          >
            <CircularProgress
              value={10}
              title={"progress"}
              progressValueColor={colors.prussianBlue}
              titleColor={colors.prussianBlue}
              activeStrokeColor={colors.themeColor}
              activeStrokeWidth={8}
              inActiveStrokeWidth={16}
              inActiveStrokeColor={`rgb(191,215,193)`}
              radius={80}
              valueSuffix="%"
            />
          </View>
          <FlatList
            data={route?.params?.data}
            renderItem={renderItem}
            keyExtractor={(item, index) => "key" + index}
            ListHeaderComponent={() => {
              return getActivityHeader();
            }}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};
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
export default GoalOverView;
