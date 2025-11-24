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
import TabSelector from "./tabSelector";
import allActions from "../../../../redux/actions";
import { useDispatch } from "react-redux";

import appConstant, {
  aiProvider,
  discardActivityEnums,
} from "../../../../constant/appConstant";
import {
  extractValueByObjKey,
  findValueByKey,
  transformSingleGoalResponse,
} from "./Hooks/transformGoalsFromAPI";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import { strings } from "../../../../constant/strings";
import { ActivityProgressTab } from "../../../../constant/ENUM";
import { BarChart } from "react-native-gifted-charts";
import moment from "moment";
import { ddd_ } from "../../../../constant/dateFormatConstants";
import logger from "../../../../constant/logger";
import CommonLoader from "../../../../components/Loader";

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
  const { data, id } = route.params;
  const tabMap = { Day: "1", Week: "2", Month: "3", Overall: "4" };
  interface ProgressBreakDownProps {
    label: string;
    progressPercentage: number;
  }
  interface GoalProgressData {
    routeData: any;
    goals: any;
    progressBreakDown: ProgressBreakDownProps[];
  }

  const [tabSelected, setSelectedTab] = useState("1");
  const [isLoading, setIsLoading] = useState(true);
  const [goalProgressData, setGoalProgressData] = useState<GoalProgressData>({
    routeData: [],
    goals: {
      overallGoalProgressInPercentage: 0, // Default value
    },
    progressBreakDown: [],
  });
  const setToInitialsState = () => {
    setGoalProgressData({
      routeData: [],
      goals: {
        overallGoalProgressInPercentage: 0,
      },
      progressBreakDown: [],
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    setGoalProgressData({
      routeData: route.params?.data,
      goals: {},
      progressBreakDown: [],
    });
  }, [navigation]);
  useEffect(() => {
    GetUserGoalProgressById();
  }, [tabSelected]);
  const GetUserGoalProgressById = async () => {
    const req = new URLSearchParams({
      goalId: `${id}`, //selected goal ID.
      filter: `${tabSelected}`,
      aiProvider: `${aiProvider.Goals}`,
      category: `${discardActivityEnums.goals}`,
    }).toString();
    setIsLoading(true);
    try {
      const response =
        await allActions.wellnessProgress.GetUserGoalProgressById(
          dispatch,
          {},
          API_FUN_NAMES?.GetUserGoalProgressById,
          req
        );
      let data = transformSingleGoalResponse(response);

      if (response.statusCode === 200) {
        setIsLoading(false);

        const breakDownProgress = extractValueByObjKey(
          response?.data,
          strings?.progressBreakdown_
        );
        setGoalProgressData({
          routeData: data?.goals?.activityDetails,
          goals: response?.data || {},
          progressBreakDown: breakDownProgress,
        });
      } else {
        setIsLoading(false);
        setToInitialsState();
      }
    } catch (error) {
      setIsLoading(false);
      setToInitialsState();
    }
  };
  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        style={{}}
        onPress={() => {
          navigation.navigate(navigationString.ActivityGoalOverview, {
            data: item.item,
          });
        }}
      >
        <MeditationCard item={item.item} index={item.index} />
      </TouchableOpacity>
    );
  };
  const getActivityHeader = (countOfActivity: number) => {
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
        >{`${countOfActivity === 1 ? "Activity" : "Activities"}`}</Text>
        <Text
          style={{
            fontSize: textScale(12),
            color: colors.prussianBlue,
            fontWeight: "600",
            marginTop: moderateScale(2),
          }}
        >
          {"Here’s what’s mapped out to help you achieve this goal."}
        </Text>
      </View>
    );
  };
  return (
    <ScreenWrapper statusBarColor={colors.darkPrussianBlue}>
      {getHeader(navigation)}
      <TabSelector
        onChangeTab={(tab) => {
          const value = tabMap[tab];
          setSelectedTab(value);
        }}
      />
      {isLoading ? (
        <View style={{ flex: 1, backgroundColor: colors?.SurfCrest }}>
          <CommonLoader />
        </View>
      ) : (
        <ScrollView style={Bargraphstyles?.mainScrollViewContainer}>
          <View style={{ flex: 1, backgroundColor: colors.SurfCrest }}>
            <View
              style={{
                alignItems: "center",
                paddingHorizontal: moderateScale(10),
                gap: moderateScale(10),
                marginVertical: moderateScale(20),
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
                  ? "Tracking your wellness journey"
                  : tabSelected == "2"
                  ? "Your week in review"
                  : tabSelected == "4"
                  ? "Your all-time progress"
                  : null}
              </Text>
              <Text
                style={{
                  fontSize: textScale(14),
                  color: colors.prussianBlue,
                  textAlign: "center",
                  marginBottom: moderateScale(20),
                }}
              >
                {tabSelected == "1"
                  ? "One activity today, one step closer. These small moments add up—and you’re already on your way. Come back tomorrow to keep the momentum going."
                  : tabSelected == "2"
                  ? "One activity today, one step closer. These small moments add up—and you’re already on your way. Come back tomorrow to keep the momentum going."
                  : tabSelected == "4"
                  ? "Look how far you’ve come! Every session adds up, every step counts. This is your wellness story in motion—and it’s just getting started."
                  : null}
              </Text>
            </View>
            <View style={Bargraphstyles?.CircularProgressContainer}>
              {goalProgressData?.goals?.timePeriod !==
                ActivityProgressTab?.Week_ && (
                <CircularProgress
                  value={Number(
                    goalProgressData?.progressBreakDown[0]
                      ?.progressPercentage || 0
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
              )}
              {goalProgressData?.goals?.timePeriod ===
                ActivityProgressTab?.Week_ && (
                // <View style={[Bargraphstyles.barChatContainer]}>
                //   <View style={Bargraphstyles?.labelContainer}>
                //     <Text style={{ color: colors?.red }}>
                //       {strings?.Progress_Percentage}
                //     </Text>
                //   </View>
                //   <BarChart
                //     hideRules={false}
                //     rulesThickness={1}
                //     rulesColor={colors?.polishedPine}
                //     rulesLength={width * 0.8}
                //     barWidth={22}
                //     noOfSections={3}
                //     barBorderRadius={4}
                //     frontColor={colors?.prussianBlue}
                // data={goalProgressData?.progressBreakDown.map((item: any) => {
                //   return {
                //     label: moment(item?.label).format(ddd_),
                //     value: item?.progressPercentage,
                //   };
                // })}
                //     yAxisThickness={0}
                //     xAxisThickness={0}
                //     isAnimated
                //   />
                // </View>

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
                        {strings?.Progress_Percentage}
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
                        maxValue={100}
                        frontColor={colors?.prussianBlue}
                        yAxisTextStyle={{ color: colors?.prussianBlue }}
                        xAxisLabelTextStyle={{ color: colors?.prussianBlue }}
                        data={goalProgressData?.progressBreakDown.map(
                          (item: any) => {
                            return {
                              label: moment(item?.label).format(ddd_),
                              value: item?.progressPercentage,
                            };
                          }
                        )}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        isAnimated
                        renderTooltip={(item: any, index: any) => {
                          return (
                            <View style={Bargraphstyles?.ToolTipContainer}>
                              <Text style={Bargraphstyles?.tooltipText}>
                                {Number(item.value).toFixed(0)}
                              </Text>
                            </View>
                          );
                        }}
                      />
                    </View>
                  </View>
                  <View style={Bargraphstyles?.GraphDescription}>
                    <Text style={Bargraphstyles?.GraphDescriptionText}>
                      {"You progress on daily basis"}
                    </Text>
                  </View>
                </>
              )}
            </View>
            <FlatList
              data={goalProgressData?.routeData}
              renderItem={renderItem}
              keyExtractor={(item, index) => "key" + index}
              style={Bargraphstyles?.ActivityListConatainer}
              ListHeaderComponent={() => {
                return getActivityHeader(goalProgressData?.routeData.length);
              }}
            />
          </View>
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};
const Bargraphstyles = StyleSheet.create({
  barChatContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: width - moderateScale(19),
    alignSelf: "center",
  },
  CircularProgressContainer: {
    height: height / 4,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    marginVertical: moderateScale(9),
  },
  ActivityListConatainer: {
    marginTop: moderateScale(19),
    marginBottom: moderateScale(50),
  },
  labelContainer: {
    transform: [{ rotate: "270deg" }],
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
  mainScrollViewContainer: { flex: 1, backgroundColor: colors?.SurfCrest },
});

export default GoalOverView;
