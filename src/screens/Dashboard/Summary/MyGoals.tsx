import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useTransition } from "react";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import StatsCard from "../../../components/Cards/StatsCard";
import { statsBackgroundColors } from "../../../constant/summaryConstant";
import { strings } from "../../../constant/strings";
import IconTextLine from "../../../components/SmallComponents/IconTextLine";
import { MorningIcon } from "../../../assets";
import GoalsCard from "./GoalsComponent";
import CommonGoalsGraph from "../../../components/CustomGraphs/CommonGoalsGraph";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import moment from "moment";
import CommonLoader from "../../../components/Loader";
import ActivitiesList from "../Planner/ActivitiesList";

interface Props {
  data?: any;
  from?: any;
  navigation?: any;
}
type GraphStateType = {
  WeeklyData: object;
  isDataAvailable: boolean;
  isWeeklySelected: boolean;
  allData?: any;
  Data?: any;
  monthlyAllData?: any;
};
type SelectedItemType = {
  WeeklyData?: any;
  MonthData?: any;
};
const MyGoals: React.FC<Props> = ({ data, from, navigation }) => {
  console.log("datadatadatadatadata->", data);
  const dispatch = useDispatch();
  const [myGoalsData, setMyGoalsData] = useState<any>([]);
  const [isFilterDropDwonSelected, setisFilterDropDwonSelected] =
    useState("Week");
  const [AllData, setAllData] = useState<any>();
  useEffect(() => {
    if (data == undefined) return;
    setMyGoalsData(data);
  }, [data]);
  const [isPending, startTransition] = useTransition();
  const [selectedStat, setSelectedStat] = useState<any>();
  const [isLoading, setisLoading] = useState(false);
  const [GoalsData, setGoalsData] = useState<GraphStateType>({
    WeeklyData: {},
    isDataAvailable: false,
    isWeeklySelected: true,
    allData: [],
    monthlyAllData: [],
    Data: [],
  });
  const [selectedItem, setselectedItem] = useState<SelectedItemType>({
    WeeklyData: [],
    MonthData: [],
  });
  // const handleSelectStat = (title: string, allData: any) => {
  //   console.log("allData=-=-=>", allData?.Data);
  //   setAllData(allData)
  //   setSelectedStat(title);
  // };
  useEffect(() => {
    callGoalsGraphData();
  }, []);
  const callGoalsGraphData = async () => {
    try {
      await GetGoalsGraphDataByDate(true);
      await GetGoalsGraphDataByDate(false);
    } catch (error) {
      console.error("Error during Goals Graph Data retrieval:", error);
    }
  };
  const GetGoalsGraphDataByDate = async (isWeeklySelected: boolean) => {
    let GoalsTimePeriod = isWeeklySelected ? 1 : 2;
    let todayDate = await new Date();
    setisLoading(true);
    let data = `${
      "?targetDate=" +
      `${moment(todayDate).format("YYYY-MM-DD")}` +
      "&GoalsTimePeriod=" +
      `${GoalsTimePeriod}`
    }`;
    try {
      let requestbody;
      await allActions.dashboardAction
        .GetGoalsGraphDataByDate(
          dispatch,
          requestbody,
          "GetGoalsGraphDataByDate",
          data
        )
        .then((response: any) => {
          console.log("response=-=-=>====???>>>", response);

          if (response?.statusCode == 200) {
            const result = response?.data?.goalsGraphDto.find((goal) =>
              goal.goalsProgressData.some(
                (progressData) => progressData.progress > 0
              )
            );
            console.log(
              "!isWeeklySelected ? result : prevState.monthlyAllData,"
            );

            // setGoalsData(prevState => ({
            //   WeeklyData: isWeeklySelected ? result : prevState.WeeklyData,
            //   isDataAvailable: hasProgressGreaterThanZero(response?.data?.goalsGraphDto),
            //   isWeeklySelected: isWeeklySelected,
            //   Data: response?.data,
            //   allData: {
            //     ...prevState.allData, // Preserve existing allData (if any)
            //     weekly: isWeeklySelected ? result : prevState.allData?.weekly,
            //     monthly: !isWeeklySelected ? result : prevState.allData?.monthly,
            //   },
            //   monthlyAllData: !isWeeklySelected ? result : prevState.monthlyAllData,

            // }));
            setGoalsData((prevState) => ({
              ...prevState,
              WeeklyData: isWeeklySelected ? result : prevState.WeeklyData,
              isDataAvailable: hasProgressGreaterThanZero(
                response?.data?.goalsGraphDto
              ),
              isWeeklySelected: isWeeklySelected,
              Data: {
                ...prevState.Data, // Preserve existing Data
                weekly: isWeeklySelected
                  ? Array.isArray(prevState.Data?.weekly)
                    ? [
                        ...prevState.Data.weekly,
                        ...response?.data?.goalsGraphDto,
                      ]
                    : [...response?.data?.goalsGraphDto]
                  : prevState.Data?.weekly,
                monthly: !isWeeklySelected
                  ? Array.isArray(prevState.Data?.monthly)
                    ? [
                        ...prevState.Data.monthly,
                        ...response?.data?.goalsGraphDto,
                      ]
                    : [...response?.data?.goalsGraphDto]
                  : prevState.Data?.monthly,
              },
              allData: {
                ...prevState.allData, // Preserve existing allData
                weekly: isWeeklySelected
                  ? Array.isArray(prevState.allData?.weekly)
                    ? [...prevState.allData.weekly, result]
                    : [result]
                  : prevState.allData?.weekly,
                monthly: !isWeeklySelected
                  ? Array.isArray(prevState.allData?.monthly)
                    ? [...prevState.allData.monthly, result]
                    : [result]
                  : prevState.allData?.monthly,
              },
              monthlyAllData: !isWeeklySelected
                ? result
                : prevState.monthlyAllData,
            }));

            console.log("result=-=-=-=>", result);
          }
          setisLoading(false);
        })
        .catch((err) => {});
    } catch (error) {
      setisLoading(false);
    }
  };
  const hasProgressGreaterThanZero = (data_: any) => {
    return data_.some((goal: any) =>
      goal.goalsProgressData.some(
        (progressData: any) => progressData.progress > 0
      )
    );
  };
  const formatDate = (isoDate: any) => {
    const dateObj = new Date(isoDate);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = dateObj.toLocaleString("en-US", { month: "short" });
    return `${day} ${month}`;
  };
  const calculateWeeklyAverages = (data: any) => {
    const chunkSize = 7;
    const weeklyData = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      const avgProgress =
        chunk.reduce((sum, item) => sum + item.progress, 0) / chunk.length;
      weeklyData.push({
        progress: Math.round(avgProgress * 100) / 100,
        date: chunk[0]?.date,
      });
    }

    return weeklyData;
  };
  const onhandleperiod = (state: any) => {
    setisFilterDropDwonSelected(state);
  };
  // const handleSelectStat = (title: string, allData: any) => {
  //   console.log("allData=-=-=>", allData?.Data);
  //   setAllData(allData)
  //   setSelectedStat(title);
  // };
  const handleSelectStat = async (
    title: string,
    id: any,
    weeklyData: any,
    monthlyData: any
  ) => {
    // setAllData(allData)
    setisLoading(true);
    setSelectedStat(title);
    let weekdata = await weeklyData.filter((item: any) => {
      if (id == item.id) {
        let selectedData = item.goalsProgressData;
        return selectedData;
      }
    });
    let monthData = await monthlyData.filter((item: any) => {
      if (id == item.id) {
        let selectedData = item.goalsProgressData;
        return selectedData;
      }
    });
    setselectedItem({
      WeeklyData: weekdata,
      MonthData: monthData,
    });
    setTimeout(() => {
      setisLoading(false);
    }, 5000);
  };

  return (
    console.log("selectedItem-=-==>", GoalsData, selectedItem),
    (
      <>
        {/* {
        GoalsData?.isDataAvailable && GoalsData?.Data?.monthly.length > 0 &&
        <>
          <IconTextLine title={strings.MyGoalsHeading} />
        </>
      } */}
        <View style={styles?.GoalsOuterView}>
          {from == "goals" ? (
            <>
              {GoalsData?.isDataAvailable && (
                <>
                  <>
                    <IconTextLine title={strings.MyGoalsHeading} />
                  </>
                  <FlatList
                    data={GoalsData?.Data?.monthly}
                    numColumns={2}
                    keyExtractor={(item, index) => "key" + index}
                    style={styles?.flatStyle}
                    columnWrapperStyle={styles.columnWrapper}
                    renderItem={({ item, index }) => (
                      <GoalsCard
                        currentStats={() => {
                          // handleSelectStat(item)}
                          handleSelectStat(
                            item,
                            item.id,
                            GoalsData?.Data?.weekly,
                            GoalsData?.Data?.monthly
                          );
                        }}
                        title={item?.title}
                        startDate={item?.startDate}
                        EndDate={item?.endDate}
                        container={{
                          backgroundColor:
                            item.title === selectedStat?.title
                              ? colors.OceanGreen
                              : statsBackgroundColors[
                                  index % statsBackgroundColors.length
                                ],
                          marginLeft: index % 2 === 0 ? 0 : moderateScale(5),
                          marginRight: index % 2 !== 0 ? 0 : moderateScale(5),
                          borderWidth: moderateScale(2),
                          borderColor:
                            item.title === selectedStat?.title
                              ? colors.orgDark
                              : colors.transparent,
                        }}
                      />
                    )}
                    ListHeaderComponent={(item: any) => {
                      return (
                        <View>
                          {selectedItem?.WeeklyData?.[0]?.goalsProgressData !==
                            undefined && (
                            <CommonGoalsGraph
                              data_={
                                isFilterDropDwonSelected == "Week"
                                  ? selectedItem?.WeeklyData?.[0]
                                      ?.goalsProgressData
                                  : calculateWeeklyAverages(
                                      selectedItem?.MonthData?.[0]
                                        ?.goalsProgressData
                                    )
                              }
                              selectableList={["Week", "Month"]}
                              setSelectedTimePeriod={onhandleperiod}
                              isWeeklySelected={GoalsData?.isWeeklySelected}
                              dates={[
                                formatDate(GoalsData?.WeeklyData?.startDate),
                                "",
                                "",
                                "",
                                "",
                                "",
                                formatDate(GoalsData?.WeeklyData?.endDate),
                              ]}
                            />
                          )}
                        </View>
                      );
                    }}
                  />
                  <View
                    style={{
                      marginTop: moderateScale(10),
                    }}
                  >
                    <View>
                      <ActivitiesList
                        activitesData={
                          selectedItem?.MonthData?.[0]?.activtiesData
                        }
                        isSeeAll={false}
                        inSummary={true}
                        navigation={navigation}
                      />
                    </View>
                  </View>
                </>
              )}
            </>
          ) : (
            <FlatList
              data={myGoalsData}
              numColumns={2}
              keyExtractor={(item, index) => "key" + index}
              style={styles?.flatStyle}
              columnWrapperStyle={styles.columnWrapper}
              renderItem={({ item, index }) => (
                <StatsCard
                  title={item?.title}
                  count={item?.count}
                  unit={item?.unit}
                  update={item?.update}
                  container={{
                    backgroundColor:
                      statsBackgroundColors[
                        index % statsBackgroundColors?.length
                      ],
                    marginLeft: index % 2 == 0 ? 0 : moderateScale(5),
                    marginRight: index % 2 != 0 ? 0 : moderateScale(5),
                  }}
                />
              )}
            />
          )}
        </View>
      </>
    )
  );
};

export default MyGoals;

const styles = StyleSheet.create({
  GoalsOuterView: {
    paddingTop: moderateScale(15),
  },
  OutOftext: {
    color: colors.royalOrange,
    fontSize: textScale(62),
    fontWeight: "700",
    fontFamily: "Poppins-Regular",
  },
  OutText: {
    fontWeight: "500",
    fontSize: textScale(24),
    color: colors.SilverChalice,
  },
  flatListContent: {
    gap: moderateScale(15),
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  flatStyle: {
    marginTop: moderateScale(20),
    gap: moderateScale(15),
  },
});
