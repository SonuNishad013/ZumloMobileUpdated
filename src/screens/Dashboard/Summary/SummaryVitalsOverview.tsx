import { useIsFocused } from "@react-navigation/native";
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
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import _ from "underscore";
import allActions from "../../../redux/actions";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import CommonButton from "../../../components/Buttons/commonButton";
import navigationString from "../../../navigation/navigationString";
import { NoDataIcon } from "../../../assets";
import CommonLoader from "../../../components/Loader";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import * as AsyncStore from "../../../utils/Storage/AsyncStorage";
import { getSeekerDetailsData } from "../../../redux/selector";
import logger from "../../../constant/logger";
let user_id = "";

interface Props {
  navigation?: any;
  route?: any;
  userData: any;
}
const SummaryVitalsOverview: React.FC<Props> = ({
  route,
  navigation,
  userData,
}): ReactElement => {
  const props = {
    activeStrokeWidth: 10,
    inActiveStrokeWidth: 10,
    inActiveStrokeOpacity: 0.2,
  };
  let userDataRedux = useSelector(getSeekerDetailsData());
  logger("userDataRedux", userDataRedux?.data?.userId);
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

  useEffect(() => {
    const getUserTokenn = async () => {
      let USERINFO = await AsyncStore.getItem(AsyncStore.LOGIN_USER_DATA);
      const parsedUserInfo = JSON.parse(USERINFO);

      if (parsedUserInfo?.token && parsedUserInfo?.userId) {
        user_id = parsedUserInfo?.userId;
      }
    };
    getUserTokenn();
  }, [isFocused]);

  const getVitalsActivityStatus = () => {
    setIsLoading(true);

    let userIDData = userDataRedux?.data?.userId;
    let requestbody = {};
    allActions.addDevice
      .getVitalsActivityStatus(
        dispatch,
        requestbody,
        "getVitalsActivityStatus",
        "/" + userIDData
      )
      .then((response: any) => {
        setIsLoading(false);
        if (response.statusCode == 200) {
          setStats(response?.data);
          setSystolicMaxScore(response?.data?.vitalTypesMaxScore?.systolic);
          setDiastoticMaxScore(response?.data?.vitalTypesMaxScore?.diastolic);
          setHeartRateMaxScore(response?.data?.vitalTypesMaxScore?.heartRate);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const BPHeader = (data: any, isForStep?: boolean) => {
    return (
      <View>
        <View
          style={{
            flexDirection: !data.vitalUnit ? "column" : "row",
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
            {isForStep ? "Steps" : "Blood Pressure"}
          </Text>
          {!data.vitalUnit && (
            <View
              style={{
                backgroundColor: "#4EA69240",
                width: "100%",
                height: moderateScale(115),
                borderRadius: moderateScale(20),
                marginTop: moderateScale(10),
                alignItems: "center",
                justifyContent: "center",
                gap: moderateScale(10),
              }}
            >
              <Text style={{ color: colors?.SurfCrest }}>
                {isForStep
                  ? "(Auto-tracked if connected) — or add manually"
                  : "Add your latest reading"}
              </Text>
              <CommonButton
                btnName={"Add"}
                mainContainer={{
                  height: moderateScale(20),
                  width: moderateScale(50),
                }}
                btnNameStyle={{ fontSize: textScale(12), fontWeight: "600" }}
                onPress={() =>
                  isForStep
                    ? navigation.navigate(navigationString.AddSteps, {
                        from: "Add Vitals",
                        userData: userData?.data,
                      })
                    : navigation.navigate(
                        navigationString.AddBloodPressureVitals,
                        {
                          from: "Add Vitals",
                          userData: userData?.data,
                        }
                      )
                }
              />
            </View>
          )}

          {data?.vitalUnit && (
            <Text
              style={{
                color: colors?.SurfCrest,
                fontWeight: "400",
                fontSize: textScale(10),
              }}
            >
              {!data?.createdDate
                ? "No date found"
                : moment(
                    moment(
                      isForStep
                        ? data?.createdDate
                        : data?.dateAndTimeForBP + "Z"
                    ).toLocaleString()
                  ).format("MMM DD,hh:mm A")}
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
                userData: userData?.data,
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
    return (
      <>
        {isEmpty ? null : (
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
                userData: userData?.data,
                type: "StepCount",
              })
            }
            disabled={isEmpty}
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
      <View>
        <Text
          style={{
            color: colors?.SurfCrest,
            fontWeight: "600",
            fontSize: textScale(14),
          }}
        >
          {"Sleep"}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#4EA69240",
            height: moderateScale(180),
            width: moderateScale(160),
            paddingHorizontal: moderateScale(15),
            borderRadius: moderateScale(20),
            marginTop: moderateScale(10),
            paddingTop: moderateScale(10),
          }}
          onPress={() =>
            navigation.navigate(navigationString.VitalSummary, {
              userData: userData?.data,
              type: "Sleep",
            })
          }
          disabled={!data?.sleepDuration}
        >
          {data?.sleepDuration ? (
            <View style={{}}>
              <View style={{ marginBottom: moderateScale(10) }}>
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
            <View style={{ flex: 1 }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  gap: moderateScale(10),
                }}
              >
                <Text style={{ color: colors.SurfCrest, textAlign: "center" }}>
                  {"Log your sleep hours"}
                </Text>
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
                      userData: userData?.data,
                    })
                  }
                />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  const heartRate = (data: any) => {
    return (
      <View>
        <Text
          style={{
            color: colors?.SurfCrest,
            fontWeight: "600",
            fontSize: textScale(14),
          }}
        >
          {"Heart rate"}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#4EA69240",
            height: moderateScale(180),
            width: moderateScale(160),
            paddingHorizontal: moderateScale(15),
            borderRadius: moderateScale(20),
            marginTop: moderateScale(10),
            paddingTop: moderateScale(10),
          }}
          onPress={() =>
            navigation.navigate(navigationString.VitalSummary, {
              userData: userData?.data,
              type: "HeartRate",
            })
          }
          disabled={!data?.heartRateCount}
        >
          {data?.heartRateCount ? (
            <>
              <View style={{ marginBottom: moderateScale(10) }}>
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
            <View style={{ flex: 1 }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  gap: moderateScale(10),
                }}
              >
                <Text
                  style={{
                    color: colors.SurfCrest,
                    textAlign: "center",
                  }}
                >
                  {"Add your heart rate reading"}
                </Text>
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
                      userData: userData?.data,
                    })
                  }
                />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.transparent }}>
      {stats !== undefined ? (
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: moderateScale(10),
              gap: moderateScale(10),
              paddingVertical: moderateScale(20),
            }}
          >
            <Text
              style={{
                fontSize: textScale(20),
                fontWeight: "600",
                color: colors?.royalOrangeDark,
              }}
            >
              {"Your wellness vitals"}
            </Text>
            <Text
              style={{
                fontSize: textScale(14),
                color: colors.SurfCrest,
                textAlign: "center",
              }}
            >
              {
                "Your vitals help tell your wellness story. Add what feels helpful and track it at your own pace."
              }
            </Text>
          </View>
          {BPHeader(stats?.bloodPressureVitalData)}
          {!stats.bloodPressureVitalData?.vitalUnit
            ? null
            : diagnosis(stats?.bloodPressureVitalData)}
          <View style={{ marginTop: moderateScale(40) }}>
            {BPHeader(stats?.stepVitalData, true)}
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

      <View style={{ marginBottom: moderateScale(100) }} />
    </View>
  );
};
export default SummaryVitalsOverview;

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
