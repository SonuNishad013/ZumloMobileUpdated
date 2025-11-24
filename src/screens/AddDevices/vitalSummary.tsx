import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import CommonHeader from "../../components/Header/commonHeader";
import colors from "../../constant/colors";
import {
  height,
  moderateScale,
  textScale,
} from "../../constant/responsiveStyle";
import allActions from "../../redux/actions";
import { useDispatch } from "react-redux";
import moment from "moment";
import CommonLoader from "../../components/Loader";
import VitalSummaryStyles from "./styles";
import {
  durations,
  getGraphData,
  getSummaryName,
} from "./HistoryVitalConstants";
import VitalsBarchart from "./VitalsBarchart";
import renderVitalHistory from "./CommonHistory";

interface Props {
  navigation?: any;
  route?: any;
}
const VitalSummary: React.FC<Props> = ({ route, navigation }): ReactElement => {
  const { userData, type } = route?.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isMonthSelected, setIsMonthSelected] = useState(false);
  const [bloodPressureData, setBloodPressureData] = useState<any>([]);
  const [isCommonAlert, setIsCommonAlert] = useState(false);
  const [monthName, setMonthName] = useState(moment().format("MMMM"));
  const [updateDate, setUpdateDate] = useState(moment().format("YYYY-MM-DD"));
  const [selectedDuration, setSelectedDuration] = React.useState("day");
  const [recentHistoryData, setRecentHistoryData] = useState([]);

  useEffect(() => {
    let urlParams = {
      UserId: userData?.userId,
      StartDate: `${moment(new Date()).format("YYYY-MM-DD")}`,
      EndDate: `${moment(new Date()).format("YYYY-MM-DD")}`,
      Category: `${type}`,
    };
    GetVitalsActivityStatusSummary(urlParams, "day");
  }, []);

  const GetVitalsActivityStatusSummary = async (
    urlParams: Record<string, any>,
    selectedType: string
  ) => {
    try {
      setIsLoading(true);
      const response =
        await allActions.addDevice.GetVitalsActivityStatusSummary(
          dispatch,
          urlParams,
          "saveStepCounts"
        );
      if (response?.statusCode !== 200) {
        setIsLoading(false);
        return;
      }

      const vitalDataMap: Record<string, any> = {
        StepCount: response?.data?.stepVitalData,
        HeartRate: response?.data?.heartRateVitalData,
        Sleep: response?.data?.sleepVitalData,
        BloodPressure: response?.data?.bloodPressureVitalData,
      };

      const maxScoreMap: Record<string, any> = {
        HeartRate: response?.data?.vitalTypesMaxScore?.heartRate,
        Sleep: response?.data?.vitalTypesMaxScore?.sleep,
        BloodPressure: response?.data?.vitalTypesMaxScore?.bloodPressure,
      };

      const data = vitalDataMap[type];
      if (data) {
        setRecentHistoryData(data);

        const graphData = getGraphData(
          type,
          data,
          selectedType,
          maxScoreMap[type]
        );
        setBloodPressureData(graphData);
        setIsCommonAlert(graphData.length === 0);
      } else {
        setIsCommonAlert(true);
      }
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  };

  const onDurationSelection = (duration: any) => {
    const urlParams = {
      UserId: userData?.userId,
      StartDate: duration.startDate,
      EndDate: duration.endDate,
      Category: type,
    };
    GetVitalsActivityStatusSummary(urlParams, duration.key);
    setSelectedDuration(duration.key);
    setIsMonthSelected(duration.key === "month");
  };

  const handleMonthRender = (buttonType: string) => {
    setIsLoading(true);

    let currentDate = moment(updateDate, "YYYY-MM-DD");
    let updatedDate_;

    if (buttonType === "Previous") {
      updatedDate_ = currentDate.subtract(1, "month");
    } else {
      updatedDate_ = currentDate.add(1, "month");
    }
    const monthName = updatedDate_.format("MMMM");
    setMonthName(monthName);
    setUpdateDate(updatedDate_.format("YYYY-MM-DD"));
    let urlParams = {
      UserId: userData?.userId,
      StartDate: updatedDate_.startOf("month").format("YYYY-MM-DD"),
      EndDate: updatedDate_.endOf("month").format("YYYY-MM-DD"),
      Category: type,
    };
    GetVitalsActivityStatusSummary(urlParams, "month");
  };

  return (
    console.log("bloodPressureDatabloodPressureData", bloodPressureData),
    (
      <ScreenWrapper statusBarColor={colors.lightprussianBlue}>
        <CommonHeader
          headerName={getSummaryName(type) + " Summary"}
          iconContainer={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          onBackPress={() => navigation.goBack()}
          mainContainer={VitalSummaryStyles?.headerMainContainer}
        />
        <ScrollView
          style={VitalSummaryStyles.scrollableContainer}
          // contentContainerStyle={{ flex: 1 }} // for condition basis no data found
        >
          <View style={{ padding: moderateScale(10), flex: 1 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {durations.map((duration) => (
                <TouchableOpacity
                  key={duration.key}
                  style={[
                    VitalSummaryStyles?.durationButtonContainer,
                    {
                      borderBottomColor:
                        selectedDuration === duration.key
                          ? colors.SurfCrest
                          : colors.lightprussianBlue,
                    },
                  ]}
                  onPress={() => onDurationSelection(duration)}
                >
                  <Text style={{ color: colors.SurfCrest }}>
                    {duration.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {isMonthSelected && (
              <View style={VitalSummaryStyles.monthButtonContainer}>
                <TouchableOpacity
                  style={VitalSummaryStyles.monthButtonTextContain}
                  onPress={() => handleMonthRender("Previous")}
                >
                  <Text style={{ color: colors?.SurfCrest }}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    VitalSummaryStyles.monthButtonTextContain,
                    { backgroundColor: "rgba(255, 255, 255, 0.09)" },
                  ]}
                >
                  <Text style={{ color: colors?.SurfCrest, fontWeight: "600" }}>
                    {monthName}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[VitalSummaryStyles.monthButtonTextContain, {}]}
                  disabled={monthName === moment().format("MMMM")}
                  onPress={() => handleMonthRender("Next")}
                >
                  <Text style={{ color: colors?.SurfCrest }}>Next</Text>
                </TouchableOpacity>
              </View>
            )}
            <View
              style={{
                marginTop: moderateScale(10),
                // flex: 1,
                // alignItems: "center",  //For no data found it will work fine condition basis
                // justifyContent: "center",
              }}
            >
              {!isLoading && (
                <>
                  {!isCommonAlert ? (
                    <>
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
                            color: colors.SurfCrest,
                            marginBottom: moderateScale(4),
                          }}
                        >
                          {"Your movement in motion"}
                        </Text>
                        <Text
                          style={{
                            fontSize: textScale(14),
                            color: colors.SurfCrest,
                            textAlign: "center",
                          }}
                        >
                          {`Here’s how you’ve been moving lately. Every step, every distance—it's all part of building momentum for your well-being.`}
                        </Text>
                      </View>
                      <VitalsBarchart
                        type={type}
                        bloodPressureData={bloodPressureData}
                      />
                    </>
                  ) : (
                    <View
                      style={{
                        alignItems: "center",
                        paddingHorizontal: moderateScale(10),
                        gap: moderateScale(10),
                        paddingVertical: moderateScale(20),
                        justifyContent: "center",
                        height: height * 0.6,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: textScale(20),
                          fontWeight: "600",
                          color: colors.SurfCrest,
                          marginBottom: moderateScale(4),
                        }}
                      >
                        {type === "BloodPressure"
                          ? "No blood pressure logged yet"
                          : type == "HeartRate"
                          ? "No heart rate logged yet"
                          : type == "Sleep"
                          ? "No sleep logged yet"
                          : "No steps logged yet"}
                      </Text>
                      <Text
                        style={{
                          fontSize: textScale(14),
                          color: colors.SurfCrest,
                          textAlign: "center",
                        }}
                      >
                        {type === "BloodPressure"
                          ? "Logging your readings helps spot trends and support heart health."
                          : type == "HeartRate"
                          ? "Monitoring your heart rate helps you stay on top of your fitness and well-being."
                          : type == "Sleep"
                          ? "Track your rest to see patterns and improve your recharge time."
                          : "Your movement story starts whenever you’re ready. We’ll be right here to cheer you on—one step at a time."}
                      </Text>
                    </View>
                  )}
                </>
              )}
            </View>
          </View>

          {renderVitalHistory(recentHistoryData, type)}
          {isLoading && (
            <View style={VitalSummaryStyles.loaderContainer}>
              <CommonLoader />
            </View>
          )}
        </ScrollView>
      </ScreenWrapper>
    )
  );
};

export default VitalSummary;
