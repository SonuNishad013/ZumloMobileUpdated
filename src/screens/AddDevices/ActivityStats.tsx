import React, { ReactElement, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CircularProgress, {
  CircularProgressBase,
} from "react-native-circular-progress-indicator";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import CommonHeader from "../../components/Header/commonHeader";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import navigationString from "../../navigation/navigationString";

import allActions from "../../redux/actions";
import { useDispatch } from "react-redux";
import moment from "moment";
import CommonButton from "../../components/Buttons/commonButton";
import { NoDataIcon } from "../../assets";
import { useIsFocused } from "@react-navigation/native";
import CommonLoader from "../../components/Loader";
import _ from "underscore";

interface Props {
  navigation?: any;
  route?: any;
}
const ActivityStats: React.FC<Props> = ({
  route,
  navigation,
}): ReactElement => {
  const { userData } = route?.params;
  const props = {
    activeStrokeWidth: 10,
    inActiveStrokeWidth: 10,
    inActiveStrokeOpacity: 0.2,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<any>();
  const [systolicMaxScore, setSystolicMaxScore] = useState(0);
  const [diastoticMaxScore, setDiastoticMaxScore] = useState(0);
  const [heartRateMaxScore, setHeartRateMaxScore] = useState(0);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    getVitalsActivityStatus();
  }, [isFocused]);

  const getVitalsActivityStatus = () => {
    setIsLoading(true);

    let data = userData?.userId !== undefined ? `${userData?.userId}` : `${0}`;
    let requestbody = {};
    allActions.addDevice
      .getVitalsActivityStatus(
        dispatch,
        requestbody,
        "getVitalsActivityStatus",
        "/" + data
      )
      .then((response: any) => {
        console.log("responseresponseresponse===>>", response);
        if (response.statusCode == 200) {
          setStats(response?.data);
          setSystolicMaxScore(response?.data?.vitalTypesMaxScore?.systolic);
          setDiastoticMaxScore(response?.data?.vitalTypesMaxScore?.diastolic);
          setHeartRateMaxScore(response?.data?.vitalTypesMaxScore?.heartRate);

          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const header = () => {
    return (
      <CommonHeader
        headerName={"Activities Stats"}
        iconContainer={{ backgroundColor: "#00000033" }}
        onBackPress={() => navigation.goBack()}
        mainContainer={{
          marginTop: moderateScale(10),
        }}
      />
    );
  };
  const dateTimeHeader = (data: any, isEmpty: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: colors?.SurfCrest,
            fontWeight: "600",
            fontSize: textScale(14),
          }}
        >
          {"Steps"}
        </Text>
        {isEmpty ? (
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CommonButton
                btnName={"Add"}
                mainContainer={{
                  height: moderateScale(20),
                  width: moderateScale(50),
                }}
                btnNameStyle={{ fontSize: textScale(12), fontWeight: "600" }}
                onPress={() =>
                  navigation.navigate(navigationString.AddSteps, {
                    from: "Add Vitals",
                    userData,
                  })
                }
              />
            </View>
          </View>
        ) : (
          <Text
            style={{
              color: colors?.SurfCrest,
              fontWeight: "400",
              fontSize: textScale(10),
            }}
          >
            {!data?.createdDate
              ? "No date found"
              : moment(moment(data?.createdDate + "Z").toLocaleString()).format(
                  "MMM DD,hh:mm A"
                )}
          </Text>
        )}
      </View>
    );
  };
  const BPHeader = (data: any) => {
    console.log("00--->>", data?.dateAndTimeForBP);
    console.log(
      "00--ccc->>",
      moment(moment(data?.dateAndTimeForBP + "Z").toLocaleString()).format(
        "MMM DD,hh:mm A"
      )
    );
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: colors?.SurfCrest,
              fontWeight: "600",
              fontSize: textScale(14),
            }}
          >
            {"Blood Pressure"}
          </Text>
          {!data.vitalUnit ? (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CommonButton
                  btnName={"Add"}
                  mainContainer={{
                    height: moderateScale(20),
                    width: moderateScale(50),
                  }}
                  btnNameStyle={{ fontSize: textScale(12), fontWeight: "600" }}
                  onPress={() =>
                    navigation.navigate(
                      navigationString.AddBloodPressureVitals,
                      {
                        from: "Add Vitals",
                        userData,
                      }
                    )
                  }
                />
              </View>
            </View>
          ) : (
            <Text
              style={{
                color: colors?.SurfCrest,
                fontWeight: "400",
                fontSize: textScale(10),
              }}
            >
              {
                !data?.createdDate
                  ? "No date found"
                  : moment(
                      moment(data?.dateAndTimeForBP + "Z").toLocaleString()
                    ).format("MMM DD,hh:mm A")
                // moment(stats?.bloodPressureVitalData?.createdDate).format(
                //   "MMM DD,hh:mm A"
                // )
              }
            </Text>
          )}
        </View>
      </View>
    );
  };

  const diagnosis = (data: any) => {
    return (
      <>
        {!data ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <NoDataIcon
              width={`${moderateScale(100)}`}
              height={`${moderateScale(100)}`}
            />
            <Text style={{ color: colors.SurfCrest }}>{"No Data Found!"}</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#4EA69240",
              height: moderateScale(165),
              // width: moderateScale(350),
              paddingHorizontal: moderateScale(15),
              borderRadius: moderateScale(20),
              marginTop: moderateScale(10),
              // justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() =>
              navigation.navigate(navigationString.VitalSummary, {
                userData,
                type: "BloodPressure",
              })
            }
          >
            <View style={{ flex: 0.7 }}>
              <CircularProgressBase
                {...props}
                value={(data?.systolic / systolicMaxScore) * 100}
                radius={70}
                clockwise={false}
                activeStrokeColor={"#4EA692"}
                inActiveStrokeColor={"#4EA692"}
              >
                <CircularProgressBase
                  {...props}
                  value={(data?.diastolic / diastoticMaxScore) * 100}
                  radius={50}
                  clockwise={false}
                  activeStrokeColor={"#CBE2D1"}
                  inActiveStrokeColor={"#CBE2D1"}
                >
                  <CircularProgressBase
                    {...props}
                    value={(data?.heartRate / heartRateMaxScore) * 100}
                    radius={30}
                    clockwise={false}
                    activeStrokeColor={"#FF9D48"}
                    inActiveStrokeColor={"#FF9D48"}
                  />
                </CircularProgressBase>
              </CircularProgressBase>
            </View>
            <View>
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
        )}
      </>
    );
  };
  const stepCount = (data: any) => {
    const isEmpty = Object.values(data).length === 0;
    console.log("data-=-=-=>isEmpty", isEmpty, data);
    return (
      <>
        {isEmpty ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <NoDataIcon
              width={`${moderateScale(100)}`}
              height={`${moderateScale(100)}`}
            />
            <Text style={{ color: colors.SurfCrest }}>{"No Data Found!"}</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#4EA69240",
              height: moderateScale(115),
              // width: moderateScale(350),
              paddingHorizontal: moderateScale(15),
              borderRadius: moderateScale(20),
              marginTop: moderateScale(10),
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() =>
              navigation.navigate(navigationString.VitalSummary, {
                userData,
                type: "StepCount",
              })
            }
          >
            <View>
              <Text style={styles?.reading}>
                {!isEmpty ? data?.stepCount && data?.stepCount + "" : "--"}
              </Text>
              <Text style={styles?.readingHeading}>Steps</Text>
            </View>
            <View>
              <Text style={styles?.reading}>
                {data?.distance !== (null || undefined)
                  ? Number(data?.distance).toFixed(1) + " km"
                  : "-- km"}
              </Text>
              <Text style={styles?.readingHeading}>Distance</Text>
            </View>
            <View>
              <Text style={styles?.reading}>
                {data?.timeDuration !== (null || "") && !isEmpty
                  ? data?.timeDuration + " min"
                  : "-- min"}
              </Text>
              <Text style={styles?.readingHeading}>Duration</Text>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };
  const sleepCount = (data: any) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#4EA69240",
          height: moderateScale(200),
          width: moderateScale(160),
          paddingHorizontal: moderateScale(15),
          borderRadius: moderateScale(20),
          marginTop: moderateScale(10),
          paddingTop: moderateScale(10),
        }}
        onPress={() =>
          navigation.navigate(navigationString.VitalSummary, {
            userData,
            type: "Sleep",
          })
        }
      >
        {data?.sleepDuration ? (
          <View style={{}}>
            <View style={{ marginBottom: moderateScale(10) }}>
              <Text style={styles?.readingHeading}>Sleep</Text>
              <Text style={styles?.reading}>{data?.sleepType}</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <CircularProgress
                value={data?.sleepDuration}
                radius={45}
                duration={2000}
                clockwise={false}
                progressValueColor={"#ecf0f1"}
                activeStrokeColor="#4EA692"
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
                {data?.awakeTime == null
                  ? "No date found"
                  : moment(
                      moment(data?.awakeTime + "Z").toLocaleString()
                    ).format("MMM DD,hh:mm A")}
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles?.readingHeading}>Sleep</Text>
              <CommonButton
                btnName={"Add"}
                mainContainer={{
                  height: moderateScale(20),
                  width: moderateScale(50),
                }}
                btnNameStyle={{ fontSize: textScale(12), fontWeight: "600" }}
                onPress={() =>
                  navigation.navigate(navigationString.AddSleep, {
                    from: "Add Vitals",
                    userData,
                  })
                }
              />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <NoDataIcon
                width={`${moderateScale(100)}`}
                height={`${moderateScale(100)}`}
              />
              <Text style={{ color: colors.SurfCrest }}>
                {"No Data Found!"}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  const heartRate = (data: any) => {
    console.log("data=========>", data);

    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#4EA69240",
          height: moderateScale(200),
          width: moderateScale(160),
          paddingHorizontal: moderateScale(15),
          borderRadius: moderateScale(20),
          marginTop: moderateScale(10),
          paddingTop: moderateScale(10),
        }}
        onPress={() =>
          navigation.navigate(navigationString.VitalSummary, {
            userData,
            type: "HeartRate",
          })
        }
      >
        {data?.heartRateCount ? (
          <>
            <View style={{ marginBottom: moderateScale(10) }}>
              <Text style={styles?.readingHeading}>Heart Rate</Text>
              <Text style={styles?.reading}>
                {!data?.heartRateCount && "No activity"}
              </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <CircularProgress
                value={data?.heartRateCount}
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
                {data?.createdDate == null
                  ? "No date found"
                  : moment(
                      moment(data?.createdDate + "Z").toLocaleString()
                    ).format("MMM DD,hh:mm A")}
              </Text>
            </View>
          </>
        ) : (
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles?.readingHeading}>Heart Rate</Text>
              <CommonButton
                btnName={"Add"}
                mainContainer={{
                  height: moderateScale(20),
                  width: moderateScale(50),
                }}
                btnNameStyle={{ fontSize: textScale(12), fontWeight: "600" }}
                onPress={() =>
                  navigation.navigate(navigationString.AddHeartRate, {
                    from: "Add Vitals",
                    userData,
                  })
                }
              />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <NoDataIcon
                width={`${moderateScale(100)}`}
                height={`${moderateScale(100)}`}
              />
              <Text style={{ color: colors.SurfCrest }}>
                {"No Data Found!"}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <ScreenWrapper statusBarColor={colors.lightprussianBlue}>
      {stats !== undefined ? (
        <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
          <View style={{ marginBottom: moderateScale(20) }}>{header()}</View>
          {BPHeader(stats?.bloodPressureVitalData)}
          {!stats.bloodPressureVitalData?.vitalUnit
            ? null
            : diagnosis(stats?.bloodPressureVitalData)}
          <View style={{ marginTop: moderateScale(40) }}>
            {dateTimeHeader(
              stats?.stepVitalData,
              Object.values(stats?.stepVitalData).length === 0
            )}
            {stepCount(stats?.stepVitalData)}
            <View
              style={{
                justifyContent: "space-between",
                flex: 1,
                flexDirection: "row",
                marginTop: moderateScale(10),
              }}
            >
              {sleepCount(stats?.sleepVitalData)}
              {heartRate(stats?.heartRateVitalData)}
            </View>
          </View>
        </ScrollView>
      ) : (
        <CommonLoader />
      )}
      {isLoading && <CommonLoader />}
    </ScreenWrapper>
  );
};
export default ActivityStats;

const styles = StyleSheet.create({
  daysTextStyle: {
    color: colors?.grey,
  },
  reading: {
    color: "#FF9D48",
    fontWeight: "600",
    fontSize: textScale(14),
  },
  readingHeading: {
    fontWeight: "400",
    fontSize: textScale(10),
    color: colors?.SurfCrest,
    marginBottom: moderateScale(10),
  },
});
