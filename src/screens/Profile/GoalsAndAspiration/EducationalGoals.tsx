import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import styles from "./styles";
import CommonInput from "../../../components/Inputs/commonInput";
import colors from "../../../constant/colors";
import TitleHeader from "./TitleHeader";
import AddButton from "./AddButton";
import CustomDatePicker from "./CustomDatePicker";
import MultiButton from "./MultiButton";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import allActions from "../../../redux/actions";
import CommonLoader from "../../../components/Loader";
import { useDispatch } from "react-redux";
import moment from "moment";
import CommonAlert from "../../../components/CommonAlert/CommonAlert";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import { event } from "../../../navigation/emitter";
import { capitalizeFirstLetter } from "../../../validations/capitalizeFirstLetter";
import CustomImage from "../../../components/ImageRender";
import navigationString from "../../../navigation/navigationString";
import { strings } from "../../../constant/strings";
import { CODES } from "../../../constant/DefaultGlobalCode";
import {
  API_FUN_NAMES,
  SOCKET_FUN_NAME,
} from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";

const EducationalGoals = ({
  data,
  navigation,
  goalID,
  short_longID,
  userData,
  onSwiperClick,
  screenIndex,
  setScreenIndex,
  setToasterDetails,
  from,
  setNextSection,
}: any) => {
  const [allData, setAllData] = useState<any>(data?.[0]?.globalCodeOptions);
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isNewAddedSpec, setIsNewAddedSpec] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acadamicval, setAcadamicval] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [acadmicErr, setAcadmicErr] = useState("");
  const dispatch = useDispatch();
  const [dateError, setDateError] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    let newData = allData.filter(
      (item: any) => item.codeName !== strings?.Other
    );
    newData = newData.map((item: any) => ({ ...item, isSelected: false }));
    setAllData(newData);
  }, []);

  const onAddNew = () => {
    setIsNewAddedSpec(true);
    let newObj = {
      globalCodeId: CODES?.education_code,
      codeName: "",
      isNewSpecification: true,
      isSelected: false,
    };
    setAllData([...allData, newObj]);
  };
  const onChangeAcadmicGoals = (text: any) => {
    if (text.length < 0) {
      setAcadmicErr("Share your learning goal to help us tailor your journey.");
    } else {
      setAcadmicErr("");
    }
    setAcadamicval(text);
  };
  const onChangeNewSpec = (text: any) => {
    setCurrentInputValue(text);
    setAllData((prev: any) =>
      prev.map((item: any) =>
        item.isNewSpecification ? { ...item, codeName: text } : item
      )
    );
  };
  const onActivitySelection = (item: any) => {
    const updatedArray = allData.map((val: any) => {
      if (val.globalCodeId === item.globalCodeId) {
        return { ...val, isSelected: !val.isSelected };
      }
      return val;
    });
    if (isError) {
      setIsError(!isError);
    } else {
      setIsError(false);
    }
    setAllData(updatedArray);
  };
  const onSaveEducationData = () => {
    let selectedData = allData
      .map((item: any) => {
        if (item.isSelected) {
          return item.globalCodeId;
        }
      })
      .filter((item: any) => item !== undefined);
    setIsLoading(true);
    let hasError = false;
    let academicError = false;
    let deadlineError = false;
    setErrorMessage("");
    setAcadmicErr("");
    setDateError("");
    if (
      selectedData.length > 0 ||
      (isNewAddedSpec && currentInputValue.trim() !== "")
    ) {
      hasError = false;
    } else {
      setErrorMessage(
        "Pick a field—or tap 'Something else' to specify your goal"
      );
      hasError = true;
    }
    if (acadamicval.trim() === "" || acadamicval.length < 0) {
      setAcadmicErr("Share your learning goal to help us tailor your journey.");
      academicError = true;
    } else {
      academicError = false;
    }
    if (moment(selectedDate).isSame(moment(), strings?.day)) {
      setDateError("Let us know your timeline. We’ll help you stay on track.");
      deadlineError = true;
    } else {
      deadlineError = false;
    }

    if (!hasError && !academicError && !deadlineError) {
      try {
        let requestbody = {
          userId: userData?.userId,
          goalCategoryId: short_longID,
          categoryId: goalID,
          educationGoals: {
            academicGoalDescription: acadamicval,
            fieldOfStudy: selectedData,
            otherFieldOfStudy: currentInputValue,
            targetCompletionDate: selectedDate.toISOString(),
          },
        };
        allActions.seekerDetails
          .CreateGoalAndAspirations(
            dispatch,
            requestbody,
            API_FUN_NAMES?.onSaveEducationData
          )
          .then((response: any) => {
            if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
              setIsError(false);
              setToasterDetails({
                showToast: true,
                code: TOAST_STATUS?.SUCCESS,
                message: response.message,
              });
              setTimeout(() => {
                setIsLoading(false);
                setIsAlert(true);
              }, 2000);
            } else {
              setIsLoading(false);
              setIsError(false);
            }
          })
          .catch((err) => {
            setIsLoading(false);
            setIsError(false);
          });
      } catch (error) {
        setIsLoading(false);
        setIsError(false);
      }
    } else {
      setIsLoading(false);
    }
  };
  return (
    <ScreenWrapper>
      <ScrollView style={stylesInternal?.container}>
        <Text style={styles.textSubHeaderTitle}>{"Learning Goals"}</Text>
        <TitleHeader
          title={"What do you want to learn or grow in? "}
          style={stylesInternal?.addMerginVertical}
        />
        <CommonInput
          placeholder={
            "Enter here - E.g., “I want to improve my writing skills”"
          }
          mainContainer={stylesInternal?.addTop}
          inputText={{ color: colors.SurfCrest }}
          placeholderTextColor={colors.SurfCrest}
          backGroundColor={colors.SaltBox}
          borderColor={colors.SurfCrest}
          isWidth={false}
          value={acadamicval}
          onChangeText={(text: any) => onChangeAcadmicGoals(text)}
        />
        {acadmicErr ? <Text style={styles.errorText}>{acadmicErr}</Text> : null}
        <TitleHeader title={"Which area are you most focused on right now? "} />
        <View>
          <FlatList
            data={allData}
            numColumns={2}
            keyExtractor={(item) => item.globalCodeId.toString()}
            renderItem={({ item, index }) => {
              return (
                <>
                  {!item.isNewSpecification && (
                    <TouchableOpacity
                      onPress={() => onActivitySelection(item)}
                      style={[
                        stylesInternal?.clickableView,
                        {
                          backgroundColor: item?.isSelected
                            ? colors?.polishedPine
                            : colors?.transparent,
                        },
                      ]}
                    >
                      <CustomImage
                        source={{ uri: item.imageURL }}
                        width={moderateScale(30)}
                        height={moderateScale(30)}
                        style={stylesInternal?.customImageStyle}
                        tintColor={colors?.SurfCrest}
                      />
                      <Text style={stylesInternal?.firstLetterStyle}>
                        {capitalizeFirstLetter(item?.codeName)}
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              );
            }}
          />
        </View>
        {isError || errorMessage ? (
          <View>
            <Text style={stylesInternal?.errorMessageStyle}>
              {errorMessage}
            </Text>
          </View>
        ) : null}
        {!isNewAddedSpec && (
          // <AddButton
          //   containerStyle={{ marginVertical: moderateScale(20) }}
          //   onPress={onAddNew}
          // />
          <AddButton
            containerStyle={styles.addButton}
            onPress={onAddNew}
            btnName={"It's something else"}
            plusImageStyle={{
              height: moderateScale(11),
              width: moderateScale(11),
            }}
            textStyle={{ marginHorizontal: 0, color: colors?.SurfCrest }}
          />
        )}

        {isNewAddedSpec && (
          <TextInput
            style={stylesInternal?.AddSpecView}
            placeholder={strings?.Specify_others}
            placeholderTextColor={colors?.SurfCrest}
            value={currentInputValue}
            onChangeText={onChangeNewSpec}
          />
        )}

        <CustomDatePicker
          title={"When would you like to reach this goal?"}
          innerTitle={"Pick a date"}
          showDatePicker={showDatePicker}
          selectedDate={selectedDate}
          setShowDatePicker={setShowDatePicker}
          setSelectedDate={(date: any) => {
            if (moment(date).isSame(moment(), strings?.day)) {
              setDateError(strings?.Please_select_a_target_date_for_your_goal);
            } else {
              setDateError("");
            }
            setShowDatePicker(false);
            setSelectedDate(date);
          }}
        />
        {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}
        <MultiButton
          onPress={() => onSaveEducationData()}
          navigation={navigation}
          onSwiperClick={onSwiperClick}
          screenIndex={screenIndex}
          setScreenIndex={setScreenIndex}
          setNextSection={() => {
            setNextSection(false);
          }}
        />
      </ScrollView>
      {isLoading && <CommonLoader />}

      <CommonAlert
        isVisible={isAlert}
        alertMessage={strings?.You_have_successfully_set_your_goal}
        alertLeftButtonOnPress={() => {
          setScreenIndex(screenIndex - 1);
        }}
        alertLeftButtonText={strings?.Set_more_goals}
        alertRightButtonOnPress={() => {
          setIsAlert(false);
          if (
            [
              strings?.fromExplorer,
              strings?.ExplorerActivity,
              strings?.AIGeneratedSkipped,
            ].includes(from)
          ) {
            const isFromAIGeneratedSkipped =
              from === strings?.AIGeneratedSkipped; //if user get from value equalevalent to AI skipped then set is planner tru else false because user is probably from explorer side
            event.emit(SOCKET_FUN_NAME?.login);
            AsyncStorageUtils.storeItemKey(
              AsyncStorageUtils.ISPLANNER_USER,
              JSON.stringify({
                isPlanner: isFromAIGeneratedSkipped,
                isSelected: true,
              })
            );
          } else {
            navigation?.navigate(navigationString.Home);
            navigation.pop(3);
          }
        }}
        alertRightButtonText={strings?.goToDashboard}
      />
    </ScreenWrapper>
  );
};

export default EducationalGoals;

const stylesInternal = StyleSheet.create({
  container: {
    // flex: 1,
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(-30),
  },
  addMerginVertical: {
    marginVertical: 1,
  },
  addTop: {
    marginTop: moderateScale(10),
  },
  clickableView: {
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(10),
    margin: 5,
    maxWidth: moderateScale(170),
    justifyContent: "flex-start",
    paddingStart: moderateScale(10),
    paddingEnd: moderateScale(40),
    gap: 10,
    borderColor: colors?.SurfCrest,
  },
  customImageStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  firstLetterStyle: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "400",
  },
  errorMessageStyle: {
    color: colors.royalOrange,
    marginTop: moderateScale(10),
  },
  AddSpecView: {
    height: moderateScale(60),
    width: "100%",
    fontSize: textScale(14),
    fontWeight: "600",
    borderWidth: 1,
    padding: moderateScale(10),
    color: colors?.SurfCrest,
    borderColor: colors?.SurfCrest,
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(10),
    paddingTop: 20,
    textAlignVertical: "top",
  },
});
