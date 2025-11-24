import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { ReactElement, useState } from "react";
import CommonHeader from "../../../components/Header/commonHeader";
import { strings } from "../../../constant/strings";
import { CalendarIcon, OrgDown } from "../../../assets";
import colors from "../../../constant/colors";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import { styles } from "./styles";
import DatePicker from "react-native-date-picker";
import CalendarComponent from "../../../components/CalendarComponent/CalendarComponent";
import moment from "moment";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../components/Loader";
import BPmeterType from "./BPmeterType";
import BtmCmnBtnVitals from "../AddSteps/BtmCmnBtnVitals";
import InputFeel from "./InputFeel";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import {
  getDateTimeInToDate,
  getUTCDateTimeNew,
} from "../../../helper/duration";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
interface Props {
  navigation?: any;
  route?: any;
}
const AddBloodPressureVitals: React.FC<Props> = ({
  navigation,
  route,
}): ReactElement => {
  const { userData } = route.params;
  const dispatch = useDispatch();
  const [feeling, setFeeling] = useState<any>("");
  const [startDateMessage, setStartDateMessage] = useState<any>("");
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(85);
  const [heartRate, setHeartRate] = useState(82);
  const [timeOpen, setTimeOpen] = useState(false);
  const [isStartDateSelected, setIsStartDateSelected] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<any>(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [time, setTime] = useState<any>(new Date());
  const [selectedDate, setSelectedDate] = useState<any>(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const incrementCounter = (type: any) => {
    if (type == "systolic") {
      setSystolic(systolic + 1);
    } else if (type == "diastolic") {
      setDiastolic(diastolic + 1);
    } else if (type == "heartRate") {
      setHeartRate(heartRate + 1);
    }
  };
  const decrementCounter = (type: any) => {
    if (type == "systolic") {
      if (systolic > 0) {
        setSystolic(systolic - 1);
      }
    } else if (type == "diastolic") {
      if (diastolic > 0) {
        setDiastolic(diastolic - 1);
      }
    } else if (type == "heartRate") {
      if (heartRate > 0) {
        setHeartRate(heartRate - 1);
      }
    }
  };

  const onSelectStartDate = (date: any) => {
    if (date) {
      setSelectedDate(date.dateString);
      setSelectedStartDate(moment(date.dateString).format("YYYY-MM-DD"));
      setShowStartDate(false);
      setStartDateMessage("");
      setIsStartDateSelected(true);
    } else {
      setIsStartDateSelected(false);
    }
  };

  console.log(
    "SelectedStartDate--->",
    selectedStartDate,
    feeling,
    isStartDateSelected
  );

  const createVitalsManually = () => {
    setIsLoading(true);
    let combinedDateTime = getDateTimeInToDate(
      `${selectedDate} ${moment(time)?.format("hh:mm a")}`,
      "YYYY-MM-DD hh:mm a"
    );

    try {
      let requestbody = {
        userId: userData?.userId,
        vitalType: 81,
        healthDataTypeId: 81,
        bloodPressureVitalData: {
          dateAndTimeForBP: getUTCDateTimeNew(combinedDateTime),
          systolic: systolic,
          diastolic: diastolic,
          heartRate: heartRate,
          description: "bp",
          vitalUnit: "mmHg",
        },
        timestamp: getUTCDateTimeNew(new Date()),
      };
      console.log("=====>>createVitalsManually", requestbody);
      allActions.addDevice
        .createVitalsManually(dispatch, requestbody, "createVitalsManually")
        .then((response: any) => {
          console.log("check getOnboardingStepsApi response ==>", response);
          if (response.statusCode == 200) {
            setIsLoading(false);
            setToasterDetails({
              showToast: true,
              code: 1,
              message: response.message,
            });
            setTimeout(() => {
              navigation?.goBack();
            }, 1000);
          } else {
            setIsLoading(false);
            setToasterDetails({
              showToast: true,
              code: 0,
              message: response.message,
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err.message,
          });
        });
    } catch (error) {
      setIsLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
    }
  };

  const dateTimePicker = () => (
    <>
      <Text style={styles.SelectDateTimeText}>{strings?.selectDateTime}</Text>
      <View style={styles?.DateTimeView}>
        <TouchableOpacity
          onPress={() => setShowStartDate(!showStartDate)}
          style={styles?.datePickerMainContainer}
        >
          <CalendarIcon />
          <Text style={styles?.datePickerText}>
            {moment(selectedStartDate, "YYYY-MM-DD").format("MMM DD, YYYY")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles?.datePickerMainContainer}
          onPress={() => setTimeOpen(true)}
        >
          <Text style={styles?.timePicker}>
            {moment(time).format("hh:mm A")}
          </Text>
          <OrgDown />
          <DatePicker
            modal
            open={timeOpen}
            date={time}
            mode="time"
            onConfirm={(time) => {
              setTimeOpen(false);
              setTime(time);
            }}
            onCancel={() => {
              setTimeOpen(false);
            }}
            theme={"light"}
          />
        </TouchableOpacity>
      </View>
    </>
  );

  const Meters = () => (
    <View style={styles.OuterView}>
      <Text
        style={[
          styles.SelectDateTimeText,
          {
            marginTop: 0,
          },
        ]}
      >
        {"Systolic / Diastolic / Heart Rate"}
      </Text>

      <BPmeterType
        title={strings?.systolic}
        value={systolic}
        decrementCounter={() => decrementCounter("systolic")}
        incrementCounter={() => incrementCounter("systolic")}
      />
      <BPmeterType
        title={strings?.diastolic}
        value={diastolic}
        decrementCounter={() => decrementCounter("diastolic")}
        incrementCounter={() => incrementCounter("diastolic")}
      />
      <BPmeterType
        title={strings?.heartrate}
        value={heartRate}
        decrementCounter={() => decrementCounter("heartRate")}
        incrementCounter={() => incrementCounter("heartRate")}
      />
      <InputFeel
        onChangeText={(data: any) => setFeeling(data)}
        bloodPressuredescription={`e.g., "Logged after workout", "Felt dizzy", or "Taken at rest"`}
      />
    </View>
  );
  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles?.mainViewContainer}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: moderateScale(50),
        }}
        enableOnAndroid={true}
        extraScrollHeight={moderateScale(120)}
        keyboardShouldPersistTaps="handled"
      >
        <CommonHeader
          headerName={strings?.bloodPressure}
          textStyle={{ color: colors?.SurfCrest }}
          iconContainer={styles?.headerICon}
          mainContainer={styles?.headerMCon}
          onBackPress={() => navigation.goBack()}
        />

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
            {"Log your blood pressure"}
          </Text>
          <Text
            style={{
              fontSize: textScale(14),
              color: colors.SurfCrest,
              textAlign: "center",
            }}
          >
            {
              "Keeping track of your numbers helps you understand what your body needs—no pressure (pun intended)"
            }
          </Text>
        </View>
        {dateTimePicker()}
        {Meters()}
        <BtmCmnBtnVitals
          createVitalsManually={createVitalsManually}
          CTAButton={"Save vitals"}
        />
        {isLoading && <CommonLoader />}
      </KeyboardAwareScrollView>

      <CalendarComponent
        visibility={showStartDate}
        setShowCalender={setShowStartDate}
        onSelectDate={onSelectStartDate}
        dateMessage={startDateMessage}
        maxDate={moment().format("DD-MMM-YYYY")}
        currentDate={
          selectedStartDate
            ? moment(selectedStartDate, "YYYY-MM-DD").format("DD-MMM-YYYY")
            : moment(new Date()).format("DD-MMM-YYYY")
        }
      />
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
    </ScreenWrapper>
  );
};
export default AddBloodPressureVitals;
