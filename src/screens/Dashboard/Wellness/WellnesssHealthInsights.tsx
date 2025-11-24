import React, { ReactElement } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList,
} from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import {
  ColorableplusIcon,
  HeartIcon,
  PlusIcon,
  WhiteIcon,
} from "../../../assets";
import SeeAllHeaderWellness from "../Wellness/commonHeader";
import navigationString from "../../../navigation/navigationString";
import moment from "moment";
import CircularProgress, {
  CircularProgressBase,
} from "react-native-circular-progress-indicator";
import { imagePath } from "../../../assets/png/imagePath";
import { strings } from "../../../constant/strings";
import ShimmerPlaceHolder from "../../../components/SimmerEffect";
interface Props {
  navigation?: any;
  systolicMaxScore?: any;
  diastoticMaxScore?: any;
  heartRateMaxScore?: any;
  sleepMaxScore?: any;
  bloodPressureMaxScore?: any;
  stats?: any;
  userData?: any;
  isDataAvailable?: any;
  isHealthInsights?: any;
  isLoading?: boolean;
}
const props = {
  activeStrokeWidth: 10,
  inActiveStrokeWidth: 10,
  inActiveStrokeOpacity: 0.2,
};
const WellnessHealthInsight: React.FC<Props> = ({
  navigation,
  systolicMaxScore,
  diastoticMaxScore,
  heartRateMaxScore,
  sleepMaxScore,
  bloodPressureMaxScore,
  stats,
  userData,
  isDataAvailable,
  isHealthInsights,
  isLoading,
}): ReactElement => {
  const filterKeys = ["vitalTypesMaxScore"];
  const funtransformDataToKeyValueArray = (data: any) => {
    return Object.keys(data)
      .filter((key) => !filterKeys.includes(key))
      .map((key) => ({
        title: data[key],
        desc: key,
      }));
  };
  const result = funtransformDataToKeyValueArray(stats);
  const processedData = result.sort((a, b) => {
    if (Object.keys(a.title).length === 0) return 1;
    return -1;
  });

  console.log("result====>", result);
  const renderMiddleView = (item: any) => {
    switch (item.type) {
      case "graphic":
        return (
          <View
            style={[styles.container, { backgroundColor: colors.polishedPine }]}
          >
            <View style={styles.textContainer}>
              <View style={{}}>
                <Text style={[styles.text, { color: colors.prussianBlue }]}>
                  {item?.name}
                </Text>
                <View style={styles.bpmContainer}>
                  <Text
                    style={[styles.bpmText, { color: colors.prussianBlue }]}
                  >
                    {item?.details?.bpm}
                  </Text>
                  <Text
                    style={[styles.bpmUnitText, { color: colors.prussianBlue }]}
                  >
                    {" "}
                    {"bpm"}
                  </Text>
                </View>
              </View>
              <HeartIcon />
            </View>
            <View style={styles.chartContainer}></View>
          </View>
        );
      case "normal":
        return (
          <View
            style={[styles.container, { backgroundColor: colors.prussianBlue }]}
          >
            <View style={styles.textContainer}>
              <View>
                <Text style={[styles.text, { color: colors.SurfCrest }]}>
                  {item?.name}
                </Text>
              </View>
              <WhiteIcon />
            </View>
            <View style={styles.borderColorContainer}>
              <Text style={[styles.typeText, { color: colors.SurfCrest }]}>
                {item?.type}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginVertical: moderateScale(5),
                alignItems: "center",
              }}
            >
              <Text style={[styles.metricText, { color: colors.SurfCrest }]}>
                {"120"}
              </Text>
              <Text style={[styles.mmText, { color: colors.SurfCrest }]}>
                {"  " + "mm"}
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const Card: React.FC<{ item: any; index: number }> = ({ item, index }) => {
    return <>{renderMiddleView(item)}</>;
  };
  const renderSleep = (data: any) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#4EA692",
          height: moderateScale(200),
          width: moderateScale(160),
          paddingHorizontal: moderateScale(15),
          borderRadius: moderateScale(20),
          paddingTop: moderateScale(10),
        }}
        onPress={() =>
          navigation.navigate(navigationString.ActivityStats, {
            userData,
            type: "Sleep",
          })
        }
      >
        {data !== (null || undefined) ? (
          <View style={{}}>
            <View style={{ marginBottom: moderateScale(10) }}>
              <Text style={styles?.readingHeading}>Sleep</Text>
              <Text style={styles?.reading}>{data?.sleepType}</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <CircularProgress
                value={(data?.sleepDuration / sleepMaxScore) * 9}
                radius={45}
                duration={2000}
                clockwise={false}
                progressValueColor={"#ecf0f1"}
                activeStrokeColor={colors.lightOrange}
                maxValue={9}
                title={"hrs"}
                initialValue={data?.sleepDuration}
                titleColor={"white"}
                titleStyle={{
                  fontWeight: "400",
                  fontSize: textScale(10),
                  color: colors?.royalOrange,
                }}
              />
              <Text
                style={{
                  color: colors?.SurfCrest,
                  fontWeight: "400",
                  fontSize: textScale(10),
                  marginTop: moderateScale(10),
                }}
              >
                {
                  data?.createdDate == null
                    ? "No date found"
                    : moment(
                        moment(data?.createdDate + "Z").toLocaleString()
                      ).format("MMM DD,hh:mm A")
                  // moment(stats?.sleepVitalData?.awakeTime).format("MMM DD,hh:mm A")
                }
              </Text>
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };
  const renderSteps = (data: any) => {
    return (
      <TouchableOpacity
        style={{
          height: moderateScale(200),
          width: moderateScale(160),
          paddingHorizontal: moderateScale(15),
          paddingVertical: moderateScale(10),
          borderRadius: moderateScale(20),
          justifyContent: "space-between",
          alignItems: "center",
          borderColor: colors?.polishedPine,
          borderWidth: 1,
        }}
        onPress={() =>
          navigation.navigate(navigationString.ActivityStats, {
            userData,
            type: "StepCount",
          })
        }
      >
        <View style={{ height: moderateScale(200) }}>
          <Text
            style={[styles?.readingHeading, { paddingLeft: moderateScale(10) }]}
          >
            {"Steps"}
          </Text>
          <View
            style={{
              width: width / 2.5,
              height: moderateScale(180),
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: width / 5,
                }}
              >
                <Text style={styles?.reading}>{data?.stepCount}</Text>
                <Text style={styles?.readingHeading}>Steps</Text>
              </View>
              <View
                style={{
                  // width: moderateScale(150),
                  justifyContent: "center",
                  alignItems: "center",
                  width: width / 5,
                }}
              >
                <Text style={styles?.reading}>
                  {data?.distance !== null && data?.distance !== undefined
                    ? Number(data?.distance).toFixed(1) + " km"
                    : "--km"}
                </Text>
                <Text style={styles?.readingHeading}>Distance</Text>
              </View>
            </View>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <View
                style={{
                  width: width / 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles?.reading}>
                  {data?.caloriesBurned !== (null || undefined)
                    ? data?.caloriesBurned + " "
                    : "--"}
                </Text>
                <Text style={styles?.readingHeading}>Calories Burned</Text>
              </View>
              <View
                style={{
                  width: width / 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles?.reading}>
                  {data?.timeDuration !== (null || undefined)
                    ? data?.timeDuration + " mins"
                    : "--mins"}
                </Text>
                <Text style={styles?.readingHeading}>Duration</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderBP = (data: any) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: colors?.trendyPink,
          height: moderateScale(200),
          paddingHorizontal: moderateScale(4),
          borderRadius: moderateScale(20),
          alignItems: "center",
          flexDirection: "row",
          width: moderateScale(160),
        }}
        onPress={() =>
          navigation.navigate(navigationString.ActivityStats, {
            userData,
            type: "BloodPressure",
          })
        }
      >
        <View
          style={{
            width: width / 6.5,
            marginHorizontal: 10,
            height: moderateScale(200),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ marginBottom: moderateScale(10) }}>
            <Text style={styles?.readingHeading}>{"Blood Pressure"}</Text>
          </View>
          <CircularProgressBase
            {...props}
            value={(data?.systolic / systolicMaxScore) * 100}
            radius={45}
            clockwise={false}
            activeStrokeColor={"#4EA692"}
            inActiveStrokeColor={"#4EA692"}
          >
            <CircularProgressBase
              {...props}
              value={(data?.diastolic / diastoticMaxScore) * 100}
              radius={35}
              clockwise={false}
              activeStrokeColor={"#CBE2D1"}
              inActiveStrokeColor={"#CBE2D1"}
            >
              <CircularProgressBase
                {...props}
                value={(data?.heartRate / heartRateMaxScore) * 100}
                radius={15}
                clockwise={false}
                activeStrokeColor={"#FF9D48"}
                inActiveStrokeColor={"#FF9D48"}
              />
            </CircularProgressBase>
          </CircularProgressBase>
        </View>
        <View
          style={{
            // flex: 0.3,
            width: width / 6,
            marginHorizontal: 10,
            height: moderateScale(200),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles?.reading}>
            {!data?.systolic ? "No record" : data?.systolic}
          </Text>
          <Text style={styles?.readingHeading}>{"Systolic"}</Text>
          <Text style={styles?.reading}>
            {!data?.diastolic ? "No record" : data?.diastolic}
          </Text>
          <Text style={styles?.readingHeading}>{"Diastolic"}</Text>
          <Text style={styles?.reading}>
            {!data?.heartRate ? "No record" : data?.heartRate}
          </Text>
          <Text style={styles?.readingHeading}>{"Heart Rate"}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderHeartRate = (data: any) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: colors.themeColor,
          height: moderateScale(200),
          width: moderateScale(160),
          paddingHorizontal: moderateScale(15),
          borderRadius: moderateScale(20),
          paddingTop: moderateScale(10),
        }}
        onPress={() =>
          navigation.navigate(navigationString.ActivityStats, {
            userData,
            type: "HeartRate",
          })
        }
      >
        <View style={{ marginBottom: moderateScale(10) }}>
          <Text style={styles?.readingHeading}>Heart Rate</Text>
          <Text style={styles?.reading}>
            {!data?.heartActivity ? "No activity" : data?.heartActivity}
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <CircularProgress
            value={(data?.heartRateCount / heartRateMaxScore) * 100}
            radius={45}
            duration={2000}
            clockwise={false}
            progressValueColor={"#ecf0f1"}
            activeStrokeColor="#4EA692"
            maxValue={200}
            initialValue={data?.heartRateCount}
            title={"BPM"}
            titleColor={"white"}
            titleStyle={{
              fontWeight: "400",
              fontSize: textScale(10),
              color: colors?.royalOrange,
            }}
          />
          <Text
            style={{
              color: colors?.SurfCrest,
              fontWeight: "400",
              fontSize: textScale(10),
              marginTop: moderateScale(10),
            }}
          >
            {
              data?.createdDate == null
                ? "No date found"
                : moment(
                    moment(
                      stats?.heartRateVitalData?.createdDate + "Z"
                    ).toLocaleString()
                  ).format("MMM DD,hh:mm A")

              // moment(stats?.heartRateVitalData?.createdDate).format(
              //   "MMM DD,hh:mm A"
              // )
            }
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderUI = (item: any, data: any) => {
    switch (item) {
      case "bloodPressureVitalData":
        return renderBP(data);
      case "heartRateVitalData":
        return renderHeartRate(data);
      case "sleepVitalData":
        return renderSleep(data);
      case "stepVitalData":
        return renderSteps(data);

      default:
        break;
    }
  };
  return (
    <View>
      <SeeAllHeaderWellness name={"Health insights"} msg={""} />
      <View style={{ flexDirection: "row" }}>
        <ScrollView style={{ gap: moderateScale(10) }}>
          {isLoading ? (
            <ShimmerPlaceHolder
              width={moderateScale(210)}
              height={moderateScale(200)}
              backgroundColor={colors.darkthemeColor}
            ></ShimmerPlaceHolder>
          ) : (
            <>
              {!isHealthInsights ? (
                <>
                  <FlatList
                    data={processedData}
                    bounces={false}
                    keyExtractor={(item, index) => "key" + index}
                    scrollEnabled={false}
                    numColumns={2}
                    columnWrapperStyle={{
                      justifyContent: "space-around",
                    }}
                    contentContainerStyle={{ gap: moderateScale(15) }}
                    renderItem={({ item, index }) => {
                      const isSingleItemInRow =
                        processedData.length % 2 !== 0 &&
                        index === processedData.length - 1;
                      const noDataAvailable =
                        Object.keys(item?.title).length === 0;

                      return (
                        <View
                          style={{
                            flex: 1,
                            justifyContent: isSingleItemInRow
                              ? "flex-start"
                              : "center",
                            alignItems: "center",
                          }}
                        >
                          {!noDataAvailable &&
                            renderUI(item?.desc, item?.title)}
                        </View>
                      );
                    }}
                  />
                </>
              ) : (
                <View style={{}}>
                  <ImageBackground
                    source={imagePath.NoHealthInsights}
                    style={styles.noHealthDataBackground}
                    resizeMode={"contain"}
                  >
                    <View style={styles.innerImageBackground}>
                      <Text style={styles.noDataTextStyle}>
                        {strings.Track_today}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              )}
            </>
          )}
          <View
            style={{
              marginHorizontal: 10,
              justifyContent: "space-between",
              alignItems: "center",
              height: moderateScale(200),
              gap: moderateScale(10),
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate(navigationString.AddDevice)}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: colors?.polishedPine,
                height: moderateScale(100),
                borderRadius: moderateScale(15),
                borderStyle: "dashed",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ColorableplusIcon stroke={colors?.polishedPine} />
              <Text
                style={{
                  color: colors?.polishedPine,
                  fontSize: textScale(10),
                  fontWeight: "600",
                  marginTop: moderateScale(5),
                }}
              >
                {"Connect device"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationString.AddManualReading, {
                  userData,
                  isDataAvailable,
                })
              }
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: colors?.polishedPine,
                height: moderateScale(100),
                borderRadius: moderateScale(15),
                borderStyle: "dashed",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ColorableplusIcon stroke={colors?.polishedPine} />
              <Text
                style={{
                  color: colors?.polishedPine,
                  fontSize: textScale(10),
                  fontWeight: "600",
                  marginTop: moderateScale(5),
                }}
              >
                {"Add vitals "}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default WellnessHealthInsight;
const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(10),
    height: moderateScale(191),
    width: moderateScale(150),
    marginRight: moderateScale(20),
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: moderateScale(120),
    marginVertical: moderateScale(10),
  },
  text: {
    fontSize: textScale(10),
    fontWeight: "600",
  },
  bpmContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bpmText: {
    fontSize: textScale(15),
    fontWeight: "600",
  },
  bpmUnitText: {
    fontSize: textScale(12),
    textAlign: "center",
    fontWeight: "600",
  },
  chartContainer: {
    height: moderateScale(80),
    width: moderateScale(150),
  },
  borderColorContainer: {
    borderWidth: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(80),
    width: moderateScale(100),
    borderRadius: moderateScale(8),
  },
  typeText: {
    fontSize: textScale(15),
    fontWeight: "600",
  },
  metricText: {
    fontSize: textScale(15),
    fontWeight: "600",
  },
  mmText: {
    fontSize: textScale(12),
    fontWeight: "400",
  },
  daysTextStyle: {
    color: colors?.grey,
  },
  reading: {
    color: "#FF9D48",
    fontWeight: "600",
    fontSize: textScale(14),
    // marginTop: 10
  },
  readingHeading: {
    fontWeight: "400",
    fontSize: textScale(10),
    color: colors?.SurfCrest,
    marginBottom: moderateScale(10),
    // lineHeight: moderateScale(15)
  },
  noHealthDataBackground: {
    backgroundColor: colors.polishedPine,
    width: moderateScale(245),
    height: moderateScale(200),
    borderRadius: moderateScale(25),
  },
  innerImageBackground: {
    justifyContent: "flex-end",
    flexDirection: "column",
    height: moderateScale(200),
  },
  noDataTextStyle: {
    textAlign: "center",
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.SurfCrest,
    marginBottom: moderateScale(10),
    marginHorizontal: moderateScale(15),
  },
});
