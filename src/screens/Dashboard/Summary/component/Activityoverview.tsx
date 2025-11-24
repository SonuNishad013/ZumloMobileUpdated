import { FunctionComponent, useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../../constant/responsiveStyle";
import CommonHeader from "../../../../components/Header/commonHeader";

import TabSelector from "./tabSelector";
import allActions from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import ToastMsg from "../../../../components/Hooks/useToast";
import {
  aiProvider,
  discardActivityEnums,
} from "../../../../constant/appConstant";
import CircularProgress from "react-native-circular-progress-indicator";
import CommonLoader from "../../../../components/Loader";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  extractValueByObjKey,
  findValueByKey,
} from "./Hooks/transformGoalsFromAPI";
import moment from "moment";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import { strings } from "../../../../constant/strings";
import { BarChart } from "react-native-gifted-charts";
import { ActivityProgressTab, RatingEnum } from "../../../../constant/ENUM";
import { ddd_, YYYY_MMM_DD } from "../../../../constant/dateFormatConstants";
import logger from "../../../../constant/logger";
import { NoDataIcon } from "../../../../assets";
import { getRatingEnum } from "./helper";

interface ActivityGoalOverviewProps {
  navigation?: any;
  route?: any;
}
interface ProgressBreakDownProps {
  label: string;
  progressValue: string;
  progressPercentage: number;
}
interface activityDetails {
  details: any;
  activityArray?: Array<any>;
  progressBreakDown: ProgressBreakDownProps[];
}
let maXHeight = 200;
let baseValue = 100;
const ActivityGoalOverview: FunctionComponent<ActivityGoalOverviewProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const [selectedData, setselectedData] = useState(route?.params?.data);
  const [tabSelected, setSelectedTab] = useState("1");
  const [textHeight, setTextHeight] = useState(0);
  const { data } = route?.params;

  const tabMap: {
    [key: string]: string;
  } = { Day: "1", Week: "2", Month: "3", Overall: "4" };

  const [activityDetails, setactivityDetails] = useState<activityDetails>({
    details: route.params?.data,
    activityArray: [],
    progressBreakDown: [],
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [isLoader, setisLoader] = useState(false);

  useEffect(() => {
    setselectedData(route?.params?.data);
    setactivityDetails({
      details: route.params?.data,
      activityArray: [],
      progressBreakDown: extractValueByObjKey(
        route?.params?.data,
        strings?.progressBreakdown_
      ),
    });
  }, []);

  useEffect(() => {
    GetUserActivityProgressById();
  }, [tabSelected]);
  const GetUserActivityProgressById = async () => {
    setisLoader(true);
    const req = new URLSearchParams({
      ActivityId: `${route.params?.data?.id}`,
      Filter: `${tabSelected}`,
      aiProvider: `${aiProvider.Goals}`,
      Category: `${discardActivityEnums.activity}`,
    }).toString();

    try {
      const response =
        await allActions.wellnessProgress.GetUserActivityProgressById(
          dispatch,
          {},
          API_FUN_NAMES?.GetUserActivityProgressById,
          req
        );

      if (response.statusCode === 200) {
        setisLoader(false);

        setRecentActivities(
          extractValueByObjKey(response?.data, strings?.activityHistory)
        );

        const breakDownProgress = extractValueByObjKey(
          response?.data,
          strings?.progressBreakdown_
        );

        setactivityDetails({
          details: response?.data,
          activityArray: response?.data?.activityProgressDetails,
          progressBreakDown: breakDownProgress,
        });
      } else {
        ToastMsg("error", "Error", response?.message);
      }
    } catch (error) {
      ToastMsg("error", "Error", error);
    } finally {
      setisLoader(false);
    }
  };
  function getRatingEnumLabel(value: number) {
    const enumValue = getRatingEnum(value);
    return RatingEnum[enumValue];
  }
  const getHeader = () => {
    return (
      <View style={styles?.HeaderContainer}>
        <View style={styles?.commonHeaderContainer}>
          <CommonHeader
            headerName={strings?.Activity_overview}
            onBackPress={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  };
  interface ProgressItem {
    label: string;
    value: number;
  }

  const BarGraph = ({ item }: { item: ProgressItem }) => {
    if (!item) return null;

    return (
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chartContainer}>
            <View style={styles.barGroup}>
              <View
                style={[
                  styles.bar,
                  { height: (item.value / baseValue) * maXHeight },
                ]}
              />
              <Text style={styles.label}>{item.label}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };
  const headerRecentActivities = () => {
    return (
      <View
        style={[
          RecentActivitiesstyles.card,
          RecentActivitiesstyles?.headerContainer,
        ]}
      >
        <View style={RecentActivitiesstyles.dateBox}>
          <Text
            style={[
              RecentActivitiesstyles.dateText,
              RecentActivitiesstyles.HeaderDateText,
            ]}
          >
            {strings?.Date}
          </Text>
          <Text
            style={[
              RecentActivitiesstyles.monthText,
              RecentActivitiesstyles.headerMonthText,
            ]}
          >
            {strings?.Time_}
          </Text>
        </View>

        <Text style={[RecentActivitiesstyles.dayText, { flex: 0.5 }]}>
          {strings?.Day_}
        </Text>

        <Text style={[RecentActivitiesstyles.dayText]}>
          {strings?.Progress}
        </Text>

        {/* <Text style={RecentActivitiesstyles.statusText}>{getRatingEnumLabel}</Text> */}
        <Text style={RecentActivitiesstyles.statusText}>{strings?.status}</Text>
      </View>
    );
  };
  const RecentActivities = () => {
    return (
      <View style={RecentActivitiesstyles.container}>
        <Text style={RecentActivitiesstyles.heading}>
          {"Completed check-ins"}
        </Text>
        <Text
          style={{
            fontSize: textScale(14),
            color: colors.prussianBlue,
            // textAlign: "center",
          }}
        >
          {
            "Here’s what you’ve completed—proof that your small efforts are adding up. Keep showing up. You’re doing the work, and it shows."
          }
        </Text>
        <FlatList
          data={recentActivities.reverse()}
          keyExtractor={(item, index) => index.toString()}
          style={RecentActivitiesstyles?.flatListStyle}
          renderItem={({ item }) => {
            return (
              <View style={RecentActivitiesstyles.card}>
                <View style={[RecentActivitiesstyles.dateBox]}>
                  <Text
                    style={[
                      RecentActivitiesstyles.dateText,
                      { fontSize: textScale(10) },
                    ]}
                  >
                    {moment(item?.completedTime).date()}/
                    {moment(item?.completedTime).month() + 1}
                  </Text>

                  <Text
                    style={[
                      RecentActivitiesstyles.monthText,
                      { fontSize: textScale(9) },
                    ]}
                  >
                    {moment(item?.completedTime).format("hh:mm A")}
                  </Text>
                </View>

                <Text style={[RecentActivitiesstyles.dayText, { flex: 0.5 }]}>
                  {moment(item?.completedTime).format("ddd")}
                </Text>

                <View>
                  <AnimatedCircularProgress
                    size={60}
                    width={5}
                    fill={item?.progress}
                    tintColor="#FF8C42"
                    backgroundColor="#E8F0EB"
                    rotation={0}
                    lineCap="round"
                  >
                    {() => (
                      <Text style={RecentActivitiesstyles.hourText}>
                        {Number(item?.progress).toFixed(0)}%
                      </Text>
                    )}
                  </AnimatedCircularProgress>
                </View>

                <Text style={RecentActivitiesstyles.statusText}>
                  {getRatingEnumLabel(Number(item?.progress))}
                </Text>
              </View>
            );
          }}
          ListHeaderComponent={headerRecentActivities}
          ListHeaderComponentStyle={
            RecentActivitiesstyles?.headerRecentActivity
          }
          ListEmptyComponent={
            <View
              style={{
                height: height * 0.35,
                justifyContent: "center",
              }}
            >
              <NoDataIcon height={150} />
              <Text style={RecentActivitiesstyles?.noDataText}>
                {strings?.No_recent_activity_and_progress_found}
              </Text>
            </View>
          }
        />
      </View>
    );
  };
  return (
    <ScreenWrapper statusBarColor={colors.darkPrussianBlue}>
      {getHeader()}
      <TabSelector
        onChangeTab={(tab) => {
          const value = tabMap[tab];
          setSelectedTab(value);
        }}
      />
      <ScrollView style={{ flex: 1, backgroundColor: colors?.SurfCrest }}>
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: moderateScale(10),
            gap: moderateScale(10),
            paddingVertical: moderateScale(20),
            backgroundColor: colors.SurfCrest,
          }}
        >
          <Text
            style={{
              fontSize: textScale(20),
              fontWeight: "600",
              color: colors.prussianBlue,
              marginBottom: moderateScale(4),
            }}
          >
            {tabSelected == "1"
              ? "Today’s progress for this activity"
              : tabSelected == "2"
              ? "This week at a glance"
              : tabSelected == "4"
              ? "Your journey with this activity"
              : null}
          </Text>
          <Text
            style={{
              fontSize: textScale(14),
              color: colors.prussianBlue,
              textAlign: "center",
            }}
          >
            {tabSelected == "1"
              ? "Every time you show up, it counts. Your recent sessions are below—reflect on how it felt and keep the streak going."
              : tabSelected == "2"
              ? "Here’s your week of practice—see what’s working and where you might want to recommit. Small wins over time create big shifts."
              : tabSelected == "4"
              ? "This is your overall progress—proof of the time, care, and consistency you’ve invested in yourself. Be proud of it."
              : null}
          </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: colors.SurfCrest }}>
          {[ActivityProgressTab?.Day_, ActivityProgressTab?.Overall_]?.includes(
            activityDetails?.details?.timePeriod
          ) && (
            <View style={styles?.circularProgressContainer}>
              <CircularProgress
                value={Number(
                  activityDetails?.progressBreakDown[0]?.progressPercentage || 0
                )}
                valueSuffix="%"
                title={strings?.Progress}
                progressValueColor={colors.prussianBlue}
                titleColor={colors.prussianBlue}
                activeStrokeColor={colors.themeColor}
                activeStrokeWidth={8}
                inActiveStrokeWidth={16}
                inActiveStrokeColor={`rgb(191,215,193)`}
                radius={80}
              />
            </View>
          )}
          {activityDetails?.details?.timePeriod ===
            ActivityProgressTab?.Week_ && (
            <>
              <View
                style={[
                  Bargraphstyles.barChatContainer,
                  { flexDirection: "row" },
                ]}
              >
                <View
                  style={{
                    width: moderateScale(20),
                    height: moderateScale(150),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: colors?.prussianBlue,
                      transform: [{ rotate: "270deg" }],
                      width: moderateScale(100),
                      textAlign: "center",
                    }}
                  >
                    {findValueByKey(activityDetails?.details, strings?.unit_) ||
                      "Progress(%)"}
                  </Text>
                </View>
                <View>
                  <BarChart
                    hideRules={false}
                    rulesThickness={1}
                    rulesColor={colors?.polishedPine}
                    rulesLength={width * 0.7}
                    barWidth={22}
                    noOfSections={3}
                    barBorderRadius={4}
                    yAxisTextStyle={{ color: colors?.prussianBlue }}
                    xAxisLabelTextStyle={{ color: colors?.prussianBlue }}
                    maxValue={
                      parseInt(
                        findValueByKey(activityDetails?.details, "targetValue")
                      ) || 100
                    }
                    frontColor={colors?.prussianBlue}
                    data={activityDetails?.progressBreakDown.map(
                      (item: any) => {
                        return {
                          label: moment(item?.label).format(ddd_),
                          value: findValueByKey(
                            activityDetails?.details,
                            "isQuantitative"
                          )
                            ? parseInt(item?.progressValue)
                            : parseInt(item?.progressPercentage),
                        };
                      }
                    )}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    isAnimated
                    renderTooltip={(item: any, index: any) => {
                      return (
                        <View style={styles?.ToolTipContainer}>
                          <Text style={styles?.tooltipText}>
                            {Number(item.value).toFixed(0)}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
              <View style={styles?.GraphDescription}>
                <Text style={styles?.GraphDescriptionText}>
                  {`Your ${findValueByKey(
                    activityDetails?.details?.activityProgressDetails,
                    "title"
                  )} activity. How much ${
                    findValueByKey(
                      activityDetails?.details?.activityProgressDetails,
                      strings?.unit_
                    ) || "progress(%)"
                  } you have done each day.`}
                </Text>
              </View>
            </>
          )}

          <View>{RecentActivities()}</View>
        </View>
      </ScrollView>
      {isLoader && <CommonLoader />}
    </ScreenWrapper>
  );
};
const Bargraphstyles = StyleSheet.create({
  container: {
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
  barChatContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: width - moderateScale(19),
    alignSelf: "center",
  },
  labelContainer: {
    transform: [{ rotate: "270deg" }],
    backgroundColor: "red",
    width: 100,
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
  HeaderContainer: { backgroundColor: colors.SurfCrest },
  commonHeaderContainer: {
    height: moderateScale(80),
    backgroundColor: colors.darkprussianBlue,
    justifyContent: "center",
    padding: moderateScale(15),
    borderEndEndRadius: moderateScale(50),
    borderEndStartRadius: moderateScale(50),
  },
  circularProgressContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  GraphDescription: {
    paddingHorizontal: moderateScale(19),
    alignItems: "center",
    marginTop: moderateScale(9),
  },
  GraphDescriptionText: {
    fontSize: textScale(12),
    textAlign: "center",
    color: colors?.prussianBlue,
    fontWeight: "500",
  },
  ToolTipContainer: {
    marginLeft: -moderateScale(2),
    backgroundColor: colors?.polishedPine,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    position: "absolute",
    top: moderateScale(23),
  },
  tooltipText: { color: colors?.prussianBlue },
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
const RecentActivitiesstyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors?.SurfCrest,
    // marginTop: moderateScale(19),
  },
  flatListStyle: {
    marginBottom: moderateScale(210),
  },
  heading: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    marginBottom: moderateScale(12),
    color: "#1D3A30",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors?.SurfCrest,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#D6E8E1",
    justifyContent: "space-evenly",
    paddingHorizontal: moderateScale(15),
  },
  dateBox: {
    backgroundColor: "#1D3A50",
    paddingVertical: 8,

    borderRadius: 8,
    alignItems: "center",
    marginRight: 12,
    minWidth: moderateScale(70),
  },
  dateText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  HeaderDateText: { fontSize: textScale(10), fontWeight: "800" },
  monthText: {
    color: "#fff",
    fontSize: 12,
  },
  headerMonthText: { fontSize: textScale(8), fontWeight: "500" },
  dayText: {
    width: 40,
    fontSize: 16,
    fontWeight: "600",
    color: "#1D3A50",
    marginLeft: moderateScale(15),
    flex: 1,
    textAlign: "left",
  },
  hourText: {
    fontSize: 14,
    color: "#1D3A50",
  },
  statusText: {
    textAlign: "right",
    fontSize: 16,
    fontWeight: "600",
    color: "#1D3A50",
    flex: 1,
  },
  headerRecentActivity: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors?.prussianBlue,
  },
  headerContainer: { borderBottomWidth: 1, borderColor: "red" },
  noDataText: {
    fontSize: textScale(16),
    fontWeight: "500",
    color: colors?.prussianBlue,
    textAlign: "center",
  },
});
export default ActivityGoalOverview;
