import React, { ReactElement, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import CommonInput from "../../../components/Inputs/commonInput";
import colors from "../../../constant/colors";
import CalendarComponent from "../../../components/CalendarComponent/CalendarComponent";
import moment from "moment";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import { DownArrow } from "../../../assets";
import CommonButton from "../../../components/Buttons/commonButton";
import _ from "underscore";
import CommonHeader from "../../../components/Header/commonHeader";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import CreateGoalButton from "../../UserGoals/zUserGoalscomponents/createGoalButton";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { DD_MMM_YYYY_ } from "../../../constant/dateFormatConstants";
import LoaderSalt from "../../../components/Loader/LoaderSalt";

interface Props {
  navigation?: any;
  route?: any;
}

const InviteduserMedicalDetails: React.FC<Props> = ({
  route,
  navigation,
}): ReactElement => {
  const { email, data, SeekerID, medicalHiostoryData } = route?.params;
  const [MedicalHistory, setMedicalHistory] = useState(medicalHiostoryData);
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

  const ontreatmentNameChange = (treatmentName: any, Indx: any) => {
    let add = MedicalHistory.filter((item: any, index: any) => {
      if (index == Indx) {
        if (treatmentName == "") {
          MedicalHistory[index].diagnosis = "";
          return item;
        } else {
          return (MedicalHistory[index].diagnosis = treatmentName);
        }
      } else {
        return item;
      }
    });
    setMedicalHistory(add);
    return MedicalHistory;
  };

  const onmedicationChange = (treatmentName: any, Indx: any) => {
    let add = MedicalHistory.filter((item: any, index: any) => {
      item.medicalHistory_Medications.filter((ITEM: any, INDEX: any) => {
        if (index == Indx) {
          if (treatmentName == "") {
            item.medicalHistory_Medications[INDEX].medicationName = "";
            return ITEM;
          } else {
            return (item.medicalHistory_Medications[INDEX].medicationName =
              treatmentName);
          }
        } else {
          return ITEM;
        }
      });
      return item;
    });
    setMedicalHistory(add);
    // return MedicalHistory
  };
  const onSelectStartDate = (date: any, index: any, item: any) => {
    console.log("check date===?>", date, index, item);
    setShowStartDate(false);
    setStartDateMessage("");
    setisStartDateSelected(true);
    setMedicalHistory((prevState: any) => {
      console.log("cehck prev data=-==>", prevState, index);

      const updatedHistory = [...prevState];
      updatedHistory[index].diagnosisDate = date.dateString;
      return updatedHistory;
    });
  };

  const onSelectEndDate = (date: any, index: any) => {
    console.log("check date===?>", date, index);
    setShowEndDate(false);
    setEndDateMessage("");
    setisEndDateSelected(true);
    setMedicalHistory((prevState: any) => {
      const updatedHistory = [...prevState];
      updatedHistory[index].diagnosisEndDate = date.dateString;
      return updatedHistory;
    });
  };

  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const SaveOrUpdateSeekerInfoASync = () => {
    setisLoading(true);
    try {
      let seekerDetails = {
        seekerDetails: {
          email: `${email}`,
          seekerId: `${SeekerID}`,
        },
      };
      let requestbody = {
        medicalHistory: MedicalHistory.map((history: any) => ({
          historyID: history.historyID,
          seekerId: `${SeekerID}`,
          conditionName: history.conditionName,
          diagnosis: history.diagnosis,
          conditionDescription: history.conditionDescription,
          diagnosisDate: history.diagnosisDate,
          diagnosisEndDate: history.diagnosisEndDate,
          status: history.status,
          notes: history.notes,
          medicalHistory_Medications: history.medicalHistory_Medications.map(
            (medication: any) => ({
              medicalHistory_MedicationId:
                medication.medicalHistory_MedicationId,
              historyID: medication.historyID,
              medicationName: medication.medicationName,
            })
          ),
          medicalHistory_Allergies: history.medicalHistory_Allergies.map(
            (allergy: any) => ({
              medicalHistory_AllergiesId: allergy.medicalHistory_AllergiesId,
              historyID: allergy.historyID,
              allergyName: allergy.allergyName,
            })
          ),
          medicalHistory_ComplimentryTreatment:
            history.medicalHistory_ComplimentryTreatment.map(
              (treatment: any) => ({
                medicalHistory_ComplimentryTreatmentId:
                  treatment.medicalHistory_ComplimentryTreatmentId,
                historyID: treatment.historyID,
                complimentryTreatmentName: treatment.complimentryTreatmentName,
              })
            ),
        })),
      };
      allActions.Auth.SaveOrUpdateSeekerInfo(
        dispatch,
        requestbody,
        "SaveOrUpdateSeekerInfoASync"
      )
        .then((response) => {
          if (response.statusCode == 200) {
            setisLoading(false);
            navigation.goBack();
          } else {
            setisLoading(false);
          }
        })
        .catch((err) => {
          setisLoading(false);
          console.log("check error==>", err);
        });
    } catch (error) {
      setisLoading(false);
    }
  };
  const onAdd = (medicalHistory: any) => {
    const newObj = {
      historyID: 0,
      seekerId: 0,
      conditionName: null,
      diagnosis: null,
      conditionDescription: null,
      diagnosisDate: null,
      diagnosisEndDate: null,
      status: 0,
      notes: null,
      medicalHistory_Medications: [
        {
          medicalHistory_MedicationId: 0,
          historyID: 0,
          medicationName: null,
        },
      ],
      medicalHistory_Allergies: [
        {
          medicalHistory_AllergiesId: 0,
          historyID: 0,
          allergyName: null,
        },
      ],
      medicalHistory_ComplimentryTreatment: [
        {
          medicalHistory_ComplimentryTreatmentId: 0,
          historyID: 0,
          complimentryTreatmentName: null,
        },
      ],
    };
    setMedicalHistory([...medicalHistory, newObj]);
  };

  const renderData = (item: any) => {
    return (
      <View style={styles.container2}>
        <CommonInput
          mainContainer={styles.inputContainer}
          placeholder={"Treatment Name"}
          value={item?.item?.diagnosis}
          onChangeText={(text: any) => ontreatmentNameChange(text, item?.index)}
          errorMsg={treatmentNameErrMsg}
          isError={istreatmentNameError}
          inputText={styles.commontextStyle}
          placeholderTextColor={colors.lightprussianBlue}
        />
        <View
          style={{
            width: moderateScale(331),
            flexDirection: "row",
            marginHorizontal: moderateScale(15),
            justifyContent: "space-between",
          }}
        >
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
              {item?.item.diagnosisEndDate == null || "Invalid date" ? (
                <View style={style.dateHeight}>
                  <Text style={style.grayColor}>{"Start Date"}</Text>
                </View>
              ) : null}
              <View
                style={[style.flexRow, { justifyContent: "space-between" }]}
              >
                <Text
                  style={[
                    style.dateTxtStyle,
                    {
                      color: SelectedStartDate
                        ? "#222222"
                        : colors.prussianBlue,
                      fontSize: textScale(14),
                      fontWeight: "400",
                    },
                  ]}
                >
                  {item?.item?.diagnosisDate !== (null && "Invalid date")
                    ? moment(item?.item?.diagnosisDate).format(DD_MMM_YYYY_)
                    : "Select Date"}
                </Text>
                <DownArrow
                  height={`${moderateScale(13)}`}
                  width={`${moderateScale(13)}`}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: colors.darkErrorColor,
                marginHorizontal: moderateScale(5),
              }}
            >
              {StartdateMessage}
            </Text>
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
              {item?.item?.diagnosisEndDate == null || "Invalid date" ? (
                <View style={style.dateHeight}>
                  <Text style={style.grayColor}>{"End Date"}</Text>
                </View>
              ) : null}
              <View
                style={[style.flexRow, { justifyContent: "space-between" }]}
              >
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
                  {item?.item?.diagnosisEndDate !== (null && "Invalid date")
                    ? moment(item?.item?.diagnosisEndDate).format(DD_MMM_YYYY_)
                    : "Select Date"}
                </Text>
                <DownArrow
                  height={`${moderateScale(13)}`}
                  width={`${moderateScale(13)}`}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: colors.darkErrorColor,
                marginHorizontal: moderateScale(5),
              }}
            >
              {StartdateMessage}
            </Text>
          </View>
          <CalendarComponent
            visibility={showStartDate}
            setShowCalender={setShowStartDate}
            onSelectDate={(date) => onSelectStartDate(date, item.index, item)}
            dateMessage={StartdateMessage}
            maxDate={moment().format("DD-MMM-YYYY")}
            currentDate={
              item?.item?.diagnosisDate
                ? moment(item?.diagnosisDate).format("DD-MM-YYYY")
                : moment().format("DD-MMM-YYYY")
            }
          />
          <CalendarComponent
            visibility={showEndDate}
            setShowCalender={setShowEndDate}
            onSelectDate={(date) => onSelectEndDate(date, item.index)}
            dateMessage={EndDateMessage}
            maxDate={moment().format("DD-MMM-YYYY")}
            currentDate={
              item?.item?.diagnosisEndDate
                ? moment(item?.item?.diagnosisEndDate).format("DD-MM-YYYY")
                : moment().format("DD-MMM-YYYY")
            }
          />
        </View>
        <CommonInput
          mainContainer={styles.inputContainer}
          placeholder={"Medication"}
          value={item?.item?.medicalHistory_Medications?.[0]?.medicationName}
          onChangeText={(text: any) => onmedicationChange(text, item?.index)}
          errorMsg={medicationErrMsg}
          isError={ismedicationError}
          inputText={styles.commontextStyle}
          placeholderTextColor={colors.lightprussianBlue}
        />
        <View
          style={{
            borderWidth: moderateScale(0.3),
            borderColor: colors.lightprussianBlue,
            height: moderateScale(1),
            width: moderateScale(300),
          }}
        />
      </View>
    );
  };
  return (
    console.log("MedicalHistory", MedicalHistory),
    (
      <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <CommonHeader
              headerName={"Medical History"}
              mainContainer={styles.headerMainContainer}
              onBackPress={() => navigation.goBack()}
            />
          </View>
          <FlatList
            data={MedicalHistory}
            renderItem={renderData}
            keyExtractor={(item, index) => "key" + index}
            ListFooterComponent={() => (
              <View
                style={{
                  marginVertical: moderateScale(20),
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: moderateScale(15),
                }}
              >
                <View>
                  <CreateGoalButton
                    mainContainer={{
                      borderColor: colors.polishedPine,
                      marginBottom: moderateScale(20),
                      width: moderateScale(320),
                    }}
                    title={"Add New"}
                    titleStyle={{ color: colors.prussianBlue }}
                    iconStyle={{ tintColor: colors.prussianBlue }}
                    onPress={() => onAdd(MedicalHistory)}
                  />
                </View>
                <CommonButton
                  btnName={"Next"}
                  onPress={() => SaveOrUpdateSeekerInfoASync()}
                />
              </View>
            )}
          />
          {isLoading && <LoaderSalt />}
        </View>
      </ScreenWrapper>
    )
  );
};
export default InviteduserMedicalDetails;
const style = StyleSheet.create({
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
