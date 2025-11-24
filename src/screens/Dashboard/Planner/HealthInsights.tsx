import React, { ReactElement } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { HeartIcon, PlusIcon, WhiteIcon, PlusIconWhite } from "../../../assets";
import SeeAllHeaderWellness from "../Wellness/commonHeader";
import navigationString from "../../../navigation/navigationString";
import moment from "moment";
import CircularProgress, {
  CircularProgressBase,
} from "react-native-circular-progress-indicator";
import { imagePath } from "../../../assets/png/imagePath";
import { strings } from "../../../constant/strings";
import ShimmerPlaceHolder from "../../../components/SimmerEffect";
import { DATE_FORMAT } from "../../../constant/DateFormats";
import { APPLY_STATUS } from "../../../constant/ENUM";
import logger from "../../../constant/logger";

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
  summaryTab?: boolean;
  DailyQuotes?: any;
}
const props = {
  activeStrokeWidth: 10,
  inActiveStrokeWidth: 10,
  inActiveStrokeOpacity: 0.2,
};
const HealthInsights: React.FC<Props> = ({
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
  summaryTab = false,
  DailyQuotes,
}): ReactElement => {
  const renderMiddleView = (item: any) => {
    switch (item.type) {
      case strings?.graphic:
        return (
          <View
            style={[styles.container, { backgroundColor: colors.polishedPine }]}
          >
            <View style={styles.textContainer}>
              <View style={{}}>
                <Text style={[styles.text, styles?.setTextColor_prussian]}>
                  {item?.name}
                </Text>
                <View style={styles.bpmContainer}>
                  <Text style={[styles.bpmText, styles?.setTextColor_prussian]}>
                    {item?.details?.bpm}
                  </Text>
                  <Text
                    style={[styles.bpmUnitText, styles?.setTextColor_prussian]}
                  >
                    {" "}
                    {strings?.bpm}
                  </Text>
                </View>
              </View>
              <HeartIcon />
            </View>
            <View style={styles.chartContainer}></View>
          </View>
        );
      case strings?.normalr:
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
            <View style={styles?.mmView}>
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

  const renderSleep = (data: any) => {
    return (
      <TouchableOpacity
        style={styles?.sleepView}
        onPress={() =>
          navigation.navigate(navigationString.ActivityStats, {
            userData,
            type: strings?.Sleep,
          })
        }
      >
        {data !== (null || undefined) ? (
          <View style={{}}>
            <View style={styles?.setBottom}>
              <Text style={styles?.readingHeading}>{strings?.Sleep}</Text>
              <Text style={styles?.reading}>{data?.sleepType}</Text>
            </View>
            <View style={styles?.alignmentCenter}>
              <CircularProgress
                value={(data?.sleepDuration / sleepMaxScore) * 9}
                radius={45}
                duration={2000}
                clockwise={false}
                progressValueColor={colors?.progressColor}
                activeStrokeColor={colors.lightOrange}
                maxValue={9}
                title={strings?.hrs}
                initialValue={data?.sleepDuration}
                titleColor={"white"}
                titleStyle={styles?.progressText}
              />
              <Text style={styles?.noDataText}>
                {data?.createdDate == null
                  ? strings?.No_date_found
                  : moment(
                      moment(data?.createdDate + "Z").toLocaleString()
                    ).format(DATE_FORMAT?.format_month_day_time)}
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
        style={styles?.stepView}
        onPress={() =>
          navigation.navigate(navigationString.ActivityStats, {
            userData,
            type: strings?.StepCount,
          })
        }
      >
        <View style={styles?.setHeight}>
          <Text style={styles?.readingHeading}>{strings?.Steps_}</Text>
          <View style={styles?.setpInnerView}>
            <View style={styles?.justify_space}>
              <View style={styles?.stepContainer}>
                <Text style={styles?.reading}>{data?.stepCount}</Text>
                <Text style={styles?.readingHeading}>{strings?.Steps_}</Text>
              </View>
              <View style={styles?.distanceView}>
                <Text style={styles?.reading}>
                  {data?.distance !== null && data?.distance !== undefined
                    ? Number(data?.distance).toFixed(1) + " km"
                    : "--km"}
                </Text>
                <Text style={styles?.readingHeading}>{strings?.distance}</Text>
              </View>
            </View>
            <View style={styles?.justify_space}>
              <View style={styles?.stepContainer}>
                <Text style={styles?.reading}>
                  {data?.caloriesBurned !== (null || undefined)
                    ? data?.caloriesBurned + " "
                    : "--"}
                </Text>
                <Text style={styles?.readingHeading}>
                  {strings?.caloriesBurned}
                </Text>
              </View>
              <View style={styles?.stepContainer}>
                <Text style={styles?.reading}>
                  {data?.timeDuration !== (null || undefined || "")
                    ? data?.timeDuration + " mins"
                    : "--mins"}
                </Text>
                <Text style={styles?.readingHeading}>{strings?.Duration}</Text>
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
        style={styles?.renderBpView}
        onPress={() =>
          navigation.navigate(navigationString.ActivityStats, {
            userData,
            type: strings?.BloodPressure,
          })
        }
      >
        <View style={styles?.BpView}>
          <View style={styles?.setBottom}>
            <Text style={styles?.readingHeading}>{strings?.BpVital}</Text>
          </View>
          <CircularProgressBase
            {...props}
            value={(data?.systolic / systolicMaxScore) * 100}
            radius={45}
            clockwise={false}
            activeStrokeColor={colors?.activeStrock}
            inActiveStrokeColor={colors?.inActiveStrock}
          >
            <CircularProgressBase
              {...props}
              value={(data?.diastolic / diastoticMaxScore) * 100}
              radius={35}
              clockwise={false}
              activeStrokeColor={colors?.activeStrock_1}
              inActiveStrokeColor={colors?.inActiveStrock_1}
            >
              <CircularProgressBase
                {...props}
                value={(data?.heartRate / heartRateMaxScore) * 100}
                radius={15}
                clockwise={false}
                activeStrokeColor={colors?.activeStrock_2}
                inActiveStrokeColor={colors?.activeStrock_2}
              />
            </CircularProgressBase>
          </CircularProgressBase>
        </View>
        <View style={styles?.bpCon}>
          <Text style={styles?.reading}>
            {!data?.systolic ? strings?.No_record : data?.systolic}
          </Text>
          <Text style={styles?.readingHeading}>{strings?.systolic}</Text>
          <Text style={styles?.reading}>
            {!data?.diastolic ? strings?.No_record : data?.diastolic}
          </Text>
          <Text style={styles?.readingHeading}>{strings?.diastolic}</Text>
          <Text style={styles?.reading}>
            {!data?.heartRate ? strings?.No_record : data?.heartRate}
          </Text>
          <Text style={styles?.readingHeading}>{strings?.heartrate}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderHeartRate = (data: any) => {
    logger("renderHeartRate___data______", { data, stats });
    return (
      <TouchableOpacity
        style={styles?.heartRateView}
        onPress={() =>
          navigation.navigate(navigationString.ActivityStats, {
            userData,
            type: strings?.HeartRate,
          })
        }
      >
        <View style={styles?.setBottom}>
          <Text style={styles?.readingHeading}>{strings?.heartrate}</Text>
          <Text style={styles?.reading}>
            {!data?.heartActivity ? strings?.No_activity : data?.heartActivity}
          </Text>
        </View>
        <View style={styles?.alignmentCenter}>
          <CircularProgress
            value={data?.heartRateCount}
            radius={45}
            duration={2000}
            clockwise={false}
            progressValueColor={colors?.progressColor}
            activeStrokeColor={colors?.polishedPine}
            maxValue={200}
            initialValue={data?.heartRateCount}
            title={strings?.BPM}
            titleColor={"white"}
            titleStyle={styles?.heartRatetext}
          />
          <Text style={styles?.hrView}>
            {data?.createdDate == null
              ? strings?.No_date_found
              : moment(
                  moment(
                    stats?.heartRateVitalData?.createdDate + "Z"
                  ).toLocaleString()
                ).format(DATE_FORMAT?.format_month_day_time)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const healthTips = () => {
    const tipsContent = DailyQuotes?.find(
      (item: any) => item?.type === "Tips"
    )?.content;

    return tipsContent?.length ? tipsContent : strings.healthQoute;
  };
  return (
    <View>
      <View style={styles?.healthBox}>
        <Text style={styles.headerhealthQouteText}>{"Tip of the day"}</Text>
        <Text style={styles.healthQouteText}>{healthTips()}</Text>
        <Image source={imagePath?.lamp} style={styles?.lampImage} />
      </View>

      <View style={styles?.rowView}>
        <ScrollView
          horizontal
          scrollEnabled={!isHealthInsights ? true : false}
          style={{ gap: moderateScale(10) }}
          contentContainerStyle={{
            justifyContent: "space-around",
            width: !isHealthInsights ? "auto" : "100%",
          }}
        >
          <View style={styles?.touchVIew}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationString.AddDevice, {
                  from: summaryTab ? strings?.SummaryTab : undefined,
                })
              }
              style={[
                styles?.summaryView,
                {
                  borderColor: summaryTab ? colors?.SurfCrest : colors?.SaltBox,
                },
              ]}
            >
              {summaryTab ? <PlusIconWhite /> : <PlusIcon />}
              <Text
                style={[
                  styles?.connectDeviceText,
                  { color: summaryTab ? colors?.SurfCrest : colors?.SaltBox },
                ]}
              >
                {strings?.Connect_device}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationString.AddManualReading, {
                  userData,
                  isDataAvailable,
                  from: summaryTab ? strings?.SummaryTab : undefined,
                })
              }
              style={[
                styles?.addIcon,
                {
                  borderColor: summaryTab ? colors?.SurfCrest : colors?.SaltBox,
                },
              ]}
            >
              {summaryTab ? <PlusIconWhite /> : <PlusIcon />}
              <Text
                style={[
                  styles?.addVital,
                  { color: summaryTab ? colors?.SurfCrest : colors?.SaltBox },
                ]}
              >
                {strings?.Add_vitals}
              </Text>
            </TouchableOpacity>
          </View>
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
                  {!stats.bloodPressureVitalData?.vitalUnit
                    ? null
                    : renderBP(stats.bloodPressureVitalData)}
                  {!stats?.stepVitalData?.stepCount &&
                  stats?.stepVitalData?.stepCount != 0
                    ? null
                    : renderSteps(stats?.stepVitalData)}
                  {!stats?.sleepVitalData?.sleepDuration
                    ? null
                    : renderSleep(stats?.sleepVitalData)}
                  {!stats?.heartRateVitalData?.heartActivity
                    ? null
                    : renderHeartRate(stats?.heartRateVitalData)}
                </>
              ) : (
                <View>
                  <ImageBackground
                    source={imagePath.NoHealthInsights}
                    style={[
                      styles.noHealthDataBackground,
                      { width: width * 0.52 },
                    ]}
                    resizeMode={APPLY_STATUS?.contain}
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
        </ScrollView>
      </View>
    </View>
  );
};

export default HealthInsights;
const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(10),
    height: moderateScale(191),
    width: moderateScale(150),
    marginRight: moderateScale(20),
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainView: {
    marginHorizontal: moderateScale(10),
  },
  rowView: {
    flexDirection: "row",
  },
  summaryView: {
    flex: 1,
    borderWidth: 1,
    width: moderateScale(100),
    borderRadius: moderateScale(15),
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  connectDeviceText: {
    fontSize: textScale(10),
    fontWeight: "600",
    marginTop: moderateScale(5),
  },
  addIcon: {
    flex: 1,
    borderWidth: 1,

    width: moderateScale(100),
    borderRadius: moderateScale(15),
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  addVital: {
    fontSize: textScale(10),
    fontWeight: "600",
    marginTop: moderateScale(5),
  },
  touchVIew: {
    marginHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: moderateScale(200),
    gap: moderateScale(10),
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
    width: moderateScale(210),
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
    fontSize: textScale(13),
    fontWeight: "600",
    color: colors.SurfCrest,
    marginBottom: moderateScale(10),
    marginHorizontal: moderateScale(15),
  },
  healthQouteContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: moderateScale(20),
    marginRight: moderateScale(20),
  },
  healthQouteBGImage: {
    marginTop: moderateScale(-10),
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: moderateScale(15),
  },
  healthQouteText: {
    fontSize: textScale(12),
    fontWeight: "500",
    color: colors.prussianBlue,
    textAlign: "center",
    marginHorizontal: moderateScale(25),
    marginTop: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  healthBox: {
    backgroundColor: colors?.royalOrangeDark,
    marginBottom: moderateScale(20),
    borderRadius: moderateScale(20),
    marginTop: moderateScale(20),
  },
  lampImage: {
    height: moderateScale(70),
    width: moderateScale(70),
    resizeMode: "contain",
    position: "absolute",
    top: moderateScale(-30),
    alignSelf: "center",
  },
  headerhealthQouteText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.prussianBlue,
    textAlign: "center",
    marginHorizontal: moderateScale(25),
    marginTop: moderateScale(40),
  },
  setTextColor_prussian: {
    color: colors.prussianBlue,
  },
  mmView: {
    flexDirection: "row",
    marginVertical: moderateScale(5),
    alignItems: "center",
  },
  sleepView: {
    backgroundColor: "#4EA692",
    height: moderateScale(200),
    width: moderateScale(160),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(20),
    paddingTop: moderateScale(10),
    marginLeft: moderateScale(10),
  },
  setBottom: {
    marginBottom: moderateScale(10),
  },
  alignmentCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    fontWeight: "400",
    fontSize: textScale(10),
    color: colors?.royalOrange,
  },
  noDataText: {
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(10),
    marginTop: moderateScale(10),
  },
  stepView: {
    backgroundColor: colors.prussianBlue,
    height: moderateScale(200),
    width: moderateScale(180),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(20),
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: moderateScale(10),
  },
  setHeight: {
    height: moderateScale(200),
  },
  setpInnerView: {
    width: width / 2.5,
    height: moderateScale(180),
    flexDirection: "column",
    justifyContent: "space-around",
  },
  justify_space: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  stepContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: width / 5,
  },
  distanceView: {
    justifyContent: "center",
    alignItems: "center",
    width: width / 5,
  },
  renderBpView: {
    backgroundColor: colors?.trendyPink,
    height: moderateScale(200),
    paddingHorizontal: moderateScale(4),
    borderRadius: moderateScale(20),
    alignItems: "center",
    flexDirection: "row",
  },
  BpView: {
    width: width / 4,
    marginHorizontal: 10,
    height: moderateScale(200),
    justifyContent: "center",
    alignItems: "center",
  },
  bpCon: {
    width: width / 5,
    marginHorizontal: 10,
    height: moderateScale(200),
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateView: {
    backgroundColor: colors.themeColor,
    height: moderateScale(200),
    width: moderateScale(160),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(20),
    paddingTop: moderateScale(10),
    marginLeft: moderateScale(10),
  },
  heartRatetext: {
    fontWeight: "400",
    fontSize: textScale(10),
    color: colors?.royalOrange,
  },
  hrView: {
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(10),
    marginTop: moderateScale(10),
  },
});
