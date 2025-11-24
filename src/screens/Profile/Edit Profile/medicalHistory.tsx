import React, { ReactElement, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "./styles";
import CommonInput from "../../../components/Inputs/commonInput";
import colors from "../../../constant/colors";
import { validateName } from "../../../validations/validation";
import CalendarComponent from "../../../components/CalendarComponent/CalendarComponent";
import moment from "moment";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { DownArrow } from "../../../assets";
import CommonButton from "../../../components/Buttons/commonButton";
import _ from "underscore";
import { strings } from "../../../constant/strings";
import { DATE_FORMAT } from "../../../constant/DateFormats";
import { DDsMMMsYYYY } from "../../../constant/dateFormatConstants";
import { APPLY_STATUS } from "../../../constant/ENUM";

interface Props {
  navigation?: any;
  MedicalHistoryData?: any;
  setisMedicalHistoryCompleted?: any;
}

const MedicalHistory: React.FC<Props> = ({
  navigation,
  MedicalHistoryData,
  setisMedicalHistoryCompleted,
}): ReactElement => {
  const [treatmentName, settreatmentName] = useState("");
  const [treatmentNameErrMsg, settreatmentNameErrMsg] = useState("");
  const [istreatmentNameComplete, setistreatmentNameComplete] = useState(false);
  const [istreatmentNameError, setistreatmentNameError] = useState(false);

  const [medication, setmedication] = useState("");
  const [medicationErrMsg, setmedicationErrMsg] = useState("");
  const [ismedicationComplete, setismedicationComplete] = useState(false);
  const [ismedicationError, setismedicationError] = useState(false);

  const [showStartDate, setShowStartDate] = useState(false);
  const [SelectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [StartdateMessage, setStartDateMessage] = useState<any>("");
  const [isStartDateSelected, setisStartDateSelected] = useState(false);

  const [showEndDate, setShowEndDate] = useState(false);
  const [SelectedEndDate, setSelectedEndDate] = useState<any>(null);
  const [EndDateMessage, setEndDateMessage] = useState<any>("");
  const [isEndDateSelected, setisEndDateSelected] = useState(false);

  const ontreatmentNameChange = (treatmentName: any) => {
    if (treatmentName.trim() !== null && validateName(treatmentName)) {
      settreatmentName(treatmentName);
      setistreatmentNameError(false);
      setistreatmentNameComplete(true);
    } else {
      setistreatmentNameComplete(false);
      setistreatmentNameError(true);
      settreatmentNameErrMsg(strings?.Please_enter_valid_treatment_name);
    }
  };

  const onmedicationChange = (medication: any) => {
    if (medication.trim() !== null && validateName(medication)) {
      setmedication(medication);
      setismedicationError(false);
      setismedicationComplete(true);
    } else {
      setismedicationComplete(false);
      setismedicationError(true);
      setmedicationErrMsg(strings?.Please_enter_valid_medication);
    }
  };
  const onSelectStartDate = (date: any) => {
    if (date && date.dateString) {
      setSelectedStartDate(moment(date.dateString).format(DDsMMMsYYYY));
      setShowStartDate(false);
      setStartDateMessage("");
      setisStartDateSelected(true);
    } else {
      setisStartDateSelected(false);
    }
  };

  const onSelectEndDate = (date: any) => {
    if (date && date.dateString) {
      setSelectedEndDate(moment(date.dateString).format(DDsMMMsYYYY));
      setShowEndDate(false);
      setEndDateMessage("");
      setisEndDateSelected(true);
    } else {
      setisEndDateSelected(false);
    }
  };
  const onNext = () => {
    const validationRules = [
      {
        state: isEndDateSelected,
        errorState: setEndDateMessage,
        errorMessage: strings?.Please_select_end_date,
      },
      {
        state: isStartDateSelected,
        errorState: setStartDateMessage,
        errorMessage: strings?.Please_select_start_date,
      },
      {
        state: treatmentName.trim() !== "",
        errorState: settreatmentNameErrMsg,
        errorMessage: strings?.Please_enter_treatment_name,
      },
      { state: istreatmentNameComplete, errorState: setistreatmentNameError },
      {
        state: medication.trim() !== "",
        errorState: setmedicationErrMsg,
        errorMessage: strings?.Please_enter_medication,
      },
      { state: ismedicationComplete, errorState: setismedicationError },
    ];

    validationRules.forEach(({ errorState }: any) => errorState(""));

    validationRules.forEach(({ state, errorState, errorMessage }: any) => {
      if (typeof state === "boolean") {
        if (!state) {
          errorState(true);
          if (errorMessage) errorState(errorMessage);
        }
      } else if (!state) {
        errorState(true);
        if (errorMessage) errorState(errorMessage);
      }
    });

    const hasErrors = validationRules.some(({ state }) => !state);

    if (!hasErrors) {
      setisMedicalHistoryCompleted(true);
    }
  };
  return (
    <View style={styles.container2}>
      <CommonInput
        mainContainer={styles.inputContainer}
        placeholder={strings?.Treatment_Name}
        value={treatmentName}
        onChangeText={ontreatmentNameChange}
        errorMsg={treatmentNameErrMsg}
        isError={istreatmentNameError}
        inputText={styles.commontextStyle}
        placeholderTextColor={colors.lightprussianBlue}
      />
      <View style={style?.mainView}>
        <View>
          <TouchableOpacity
            onPress={() => setShowStartDate(!showStartDate)}
            style={[
              style.dateView,
              {
                borderColor:
                  StartdateMessage != ""
                    ? colors.darkErrorColor
                    : colors.polishedPine,
                backgroundColor:
                  StartdateMessage != ""
                    ? colors.errorColor
                    : colors.lightSurfCrest,
              },
            ]}
          >
            {SelectedStartDate ? (
              <View style={style.dateHeight}>
                <Text style={style.grayColor}>{strings?.Start_Date}</Text>
              </View>
            ) : null}
            <View style={[style.flexRow, style?.justify_between]}>
              <Text
                style={[
                  style.dateTxtStyle,
                  {
                    color: SelectedStartDate ? "#222222" : colors.prussianBlue,
                    fontSize: textScale(14),
                    fontWeight: "400",
                  },
                ]}
              >
                {SelectedStartDate ? SelectedStartDate : strings?.Start_Date}
              </Text>
              <DownArrow
                height={`${moderateScale(13)}`}
                width={`${moderateScale(13)}`}
              />
            </View>
          </TouchableOpacity>
          <Text style={style?.startDateStyle}>{StartdateMessage}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setShowEndDate(!showEndDate)}
            style={[
              style.dateView,
              {
                borderColor:
                  EndDateMessage != ""
                    ? colors.darkErrorColor
                    : colors.polishedPine,
                backgroundColor:
                  EndDateMessage != ""
                    ? colors.errorColor
                    : colors.lightSurfCrest,
              },
            ]}
          >
            {SelectedEndDate ? (
              <View style={style.dateHeight}>
                <Text style={style.grayColor}>{strings?.End_Date}</Text>
              </View>
            ) : null}
            <View style={[style.flexRow, style?.justify_between]}>
              <Text
                style={[
                  style.dateTxtStyle,
                  {
                    color: SelectedEndDate ? "#222222" : colors.prussianBlue,
                    fontSize: textScale(14),
                    fontWeight: "400",
                  },
                ]}
              >
                {SelectedEndDate ? SelectedEndDate : strings?.End_Date}
              </Text>
              <DownArrow
                height={`${moderateScale(13)}`}
                width={`${moderateScale(13)}`}
              />
            </View>
          </TouchableOpacity>
          <Text style={style?.startDateStyle}>{StartdateMessage}</Text>
        </View>
        <CalendarComponent
          visibility={showStartDate}
          setShowCalender={setShowStartDate}
          onSelectDate={onSelectStartDate}
          dateMessage={StartdateMessage}
          maxDate={moment().format(DDsMMMsYYYY)}
          currentDate={
            SelectedStartDate ? SelectedStartDate : moment().format(DDsMMMsYYYY)
          }
          minDate={new Date()}
        />
        <CalendarComponent
          visibility={showEndDate}
          setShowCalender={setShowEndDate}
          onSelectDate={onSelectEndDate}
          dateMessage={EndDateMessage}
          maxDate={moment().format(DDsMMMsYYYY)}
          currentDate={
            SelectedEndDate ? SelectedEndDate : moment().format(DDsMMMsYYYY)
          }
          minDate={new Date()}
        />
      </View>
      <CommonInput
        mainContainer={styles.inputContainer}
        placeholder={strings?.Medication}
        value={medication}
        onChangeText={onmedicationChange}
        errorMsg={medicationErrMsg}
        isError={ismedicationError}
        inputText={styles.commontextStyle}
        placeholderTextColor={colors.lightprussianBlue}
        keyboardType={APPLY_STATUS?.number_pad}
      />
      <View style={{ marginVertical: moderateScale(20) }}>
        <CommonButton btnName={strings?.Next} onPress={onNext} />
      </View>
    </View>
  );
};
export default MedicalHistory;
const style = StyleSheet.create({
  mainView: {
    width: moderateScale(331),
    flexDirection: "row",
    marginHorizontal: moderateScale(15),
    justifyContent: "space-between",
  },

  justify_between: {
    justifyContent: "space-between",
  },
  startDateStyle: {
    color: colors.darkErrorColor,
    marginHorizontal: moderateScale(5),
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  HeaderBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#0C548C",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
    borderBottomColor: "#0C548C",
  },
  headerBarTxt: {
    color: "#000000",
    textAlign: "center",
    fontWeight: "600",
    fontSize: textScale(16),
    lineHeight: textScale(24),
  },

  headerBarRightTxt: {
    color: "#2145A4",
    textAlign: "center",
    fontWeight: "600",
    fontSize: textScale(14),
    lineHeight: textScale(19),
    letterSpacing: textScale(0.375),
  },
  backPressStyle: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(22),
  },
  resetFilterStyle: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(22),
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(24),
    alignItems: "center",
  },
  statusView: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(10),
    alignItems: "center",
  },
  headerText: {
    textAlign: "center",
    fontSize: textScale(14),
    lineHeight: moderateScale(19),
    letterSpacing: moderateScale(0.4375),
    fontWeight: "500",
  },
  horizontaLine: {
    height: moderateScale(1),
    backgroundColor: "#EFEFEF",
    width: "100%",
    marginTop: moderateScale(24),
  },
  content: {
    paddingHorizontal: moderateScale(20),
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)",
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,1)",
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selector: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  activeSelector: {
    fontWeight: "bold",
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
    textAlign: "center",
  },
  buttonContainer: {
    borderWidth: 0,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  ResetButtonColor: { color: "#2145A4" },
  resetButtonStyle: {
    width: "50%",
    borderRadius: 0,
    height: moderateScale(50),
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  },
  applyFilterButton: {
    width: "50%",
    borderRadius: 0,
    height: moderateScale(50),
    backgroundColor: "#2145A4",
    borderColor: "#2145A4",
  },
  dateView: {
    width: moderateScale(160),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(15),
    padding: moderateScale(15),
    height: moderateScale(50),
    justifyContent: "center",
    borderColor: colors?.polishedPine,
    // marginHorizontal: width * .05,
    alignSelf: "center",
    paddingHorizontal: moderateScale(9),
    marginVertical: moderateScale(5),
  },
  dateHeight: {
    height: moderateScale(20),
  },
  grayColor: {
    color: colors?.prussianBlue,
    fontSize: textScale(14),
    fontWeight: "400",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateTxtStyle: {
    fontSize: textScale(15),
    color: "#999999",
    fontFamily: "Nunito",
  },
  errorShow: {
    top: -20,
    left: -10,
  },
});
