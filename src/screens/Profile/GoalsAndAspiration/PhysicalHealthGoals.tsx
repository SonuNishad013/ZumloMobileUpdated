import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import TitleHeader from "./TitleHeader";
import colors from "../../../constant/colors";
import AddButton from "./AddButton";
import CommonInput from "../../../components/Inputs/commonInput";
import CustomDatePicker from "./CustomDatePicker";
import MultiButton from "./MultiButton";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../components/Loader";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import moment from "moment";
import CommonAlert from "../../../components/CommonAlert/CommonAlert";
import { event } from "../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import navigationString from "../../../navigation/navigationString";
import { capitalizeFirstLetter } from "../../../validations/capitalizeFirstLetter";
import CustomImage from "../../../components/ImageRender";
import { strings } from "../../../constant/strings";
import { CODES } from "../../../constant/DefaultGlobalCode";
import {
  API_FUN_NAMES,
  SOCKET_FUN_NAME,
} from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import logger from "../../../constant/logger";
const PhysicalHealthGoals = ({
  navigation,
  data,
  emotionalGoals,
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
  const dispatch = useDispatch();
  const initialData = data?.[0]?.globalCodeOptions;
  const [physicalHealthData, setPhysicalHealthData] = useState(initialData);
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isNewAddedSpec, setIsNewAddedSpec] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [desiredOutcomes, setdesiredOutcomes] = useState("");
  const [isError, setisError] = useState(false);
  const [goalError, setGoalError] = useState("");
  const [desiredOutcomesError, setDesiredOutcomesError] = useState("");
  const [dateError, setDateError] = useState("");
  const [isAlert, setisAlert] = useState(false);
  useEffect(() => {
    const filteredData = physicalHealthData.filter(
      (item: any) => item.codeName !== strings?.Other
    );
    setPhysicalHealthData(filteredData);
  }, []);

  const onAddNew = () => {
    setIsNewAddedSpec(true);

    const newObj = {
      globalCodeId: !emotionalGoals ? CODES?.health_code : CODES?.health_code_,
      codeName: "",
      isNewSpecification: true,
      isSelected: false,
    };
    setPhysicalHealthData([...physicalHealthData, newObj]);
  };

  const onSavePhysicalHealthData = async () => {
    setisLoading(true);
    setGoalError("");
    setDesiredOutcomesError("");
    setDateError("");
    setisError(false);
    let hasError = false;

    // Filter selected goals
    const selectedData = physicalHealthData
      .filter(({ isSelected }: any) => isSelected)
      .map(({ globalCodeId }: any) => globalCodeId);

    // Validate goals or specific goal input
    if (selectedData.length === 0 && currentInputValue.trim() === "") {
      setGoalError(
        emotionalGoals
          ? "Let’s choose a goal—or share your own to help us guide you better."
          : "Please select at least one focus area" //error 1
      );
      hasError = true;
    }

    // Validate Desired Outcomes
    if (desiredOutcomes.trim() === "") {
      setDesiredOutcomesError(
        "Please share what feeling your best looks like."
      ); //error 2
      hasError = true;
    }

    // Validate Target Date
    if (
      moment(selectedDate).isSame(moment(), strings?.day) &&
      !emotionalGoals
    ) {
      setDateError("Please pick a date for your goal"); //error 3
      hasError = true;
    }

    // Proceed if no errors
    if (!hasError) {
      try {
        const requestBody = {
          userId: userData?.userId,
          goalCategoryId: short_longID,
          categoryId: goalID,
          [emotionalGoals
            ? strings?.emotionalWellBeingGoals
            : strings?.physicalHealthGoals]: {
            [`${emotionalGoals ? strings?.emotional : strings?.physical}${
              strings?.HealthObjectiveId
            }`]: selectedData,
            [`${strings?.other_}${
              emotionalGoals ? strings?.Emotional : strings?.Physical
            }${strings?.HealthObjective}`]: currentInputValue,
            desiredOutcomes,
            ...(emotionalGoals
              ? {}
              : { targetDate: selectedDate.toISOString() }),
          },
        };

        const response =
          await allActions.seekerDetails.CreateGoalAndAspirations(
            dispatch,
            requestBody,
            API_FUN_NAMES?.onSavePhysicalHealthData
          );

        if (response.statusCode === STATUS_CODES?.RESPONSE_OK) {
          setToasterDetails({
            showToast: true,
            code: TOAST_STATUS?.SUCCESS,
            message: response.message,
          });
          setTimeout(() => {
            setisLoading(false);
            setisAlert(true);
          }, 2000);
        } else {
          setisLoading(false);
          setisError(true);
        }
      } catch (error) {
        logger("Error saving data:", error);
        setisLoading(false);
        setisError(true);
      }
    } else {
      setisLoading(false);
      setisError(true);
    }
  };

  const onChangeNewSpec = (text: string) => {
    setCurrentInputValue(text);
    setPhysicalHealthData((prev: { isNewSpecification: any }[]) =>
      prev.map((item: { isNewSpecification: any }) =>
        item.isNewSpecification
          ? {
              ...item,
              codeName: text,
              isSelected: text?.trim() !== "",
            }
          : item
      )
    );
  };

  const onActivitySelection = (item: { globalCodeId: any }) => {
    const updatedArray = physicalHealthData.map(
      (val: { globalCodeId: any; isSelected: any }) =>
        val.globalCodeId === item.globalCodeId
          ? { ...val, isSelected: !val.isSelected }
          : val
    );
    if (isError) {
      setGoalError(
        !emotionalGoals
          ? strings?.Please_select_a_physical_health
          : strings?.Please_select_an_emotional
      );
      setisError(false);
    } else {
      setGoalError("");
    }
    setPhysicalHealthData(updatedArray);
  };

  const onChangeDesireOutcome = (text: string) => {
    if (text.trim() === "") {
      setDesiredOutcomesError(strings?.Please_enter_your_desired_outcomes);
    } else {
      setDesiredOutcomesError("");
    }

    setdesiredOutcomes(text);
  };
  const goBack = () => {
    setScreenIndex(screenIndex - 1);
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.textSubHeaderTitle}>
          {!emotionalGoals ? "Move & Feel Better" : "Emotional Balance"}
          {/* {"Move & Feel Better"} */}
        </Text>
        <TitleHeader
          title={
            !emotionalGoals
              ? "What’s your top focus for physical wellness?"
              : "What would help you feel more emotionally balanced? "
          }
        />
        <View style={styles.activityContainer}>
          {physicalHealthData?.map(
            (item: any, index: number) =>
              !item.isNewSpecification && (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => onActivitySelection(item)}
                    style={[
                      styles.activityButton,
                      item.isSelected && styles.selectedActivityButton,
                    ]}
                  >
                    <CustomImage
                      source={{ uri: item.imageURL }}
                      width={moderateScale(70)}
                      height={moderateScale(70)}
                      isTintColor={false}
                    />
                    <Text style={styles.activityText}>
                      {capitalizeFirstLetter(item?.codeName)}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
          )}
        </View>
        {goalError ? <Text style={styles.errorText}>{goalError}</Text> : null}
        {!isNewAddedSpec && (
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
            multiline
            style={styles.newSpecInput}
            value={currentInputValue}
            onChangeText={onChangeNewSpec}
            placeholder={"Tell me more about what you want to focus on"}
            placeholderTextColor={colors.SurfCrest}
          />
        )}
        <TitleHeader
          title={
            !emotionalGoals
              ? "What does feeling physically great look like for you?"
              : "Describe what emotional well-being looks like for you."
          }
        />

        <CommonInput
          placeholder={"Share here..."}
          mainContainer={styles.desiredOutcomesInput}
          inputText={{ color: colors.SurfCrest }}
          placeholderTextColor={colors.SurfCrest}
          backGroundColor={colors.SaltBox}
          borderColor={colors.SurfCrest}
          isWidth={false}
          value={desiredOutcomes}
          onChangeText={onChangeDesireOutcome}
        />
        {desiredOutcomesError ? (
          <Text style={styles.errorText}>{desiredOutcomesError}</Text>
        ) : null}
        {!emotionalGoals && (
          <>
            <CustomDatePicker
              showDatePicker={showDatePicker}
              selectedDate={selectedDate}
              innerTitle={strings?.selectDate}
              setShowDatePicker={setShowDatePicker}
              setSelectedDate={(date: any) => {
                if (moment(date)?.isSame(moment(), strings?.day)) {
                  setDateError(
                    strings?.Please_select_a_target_date_for_your_goal
                  );
                } else {
                  setDateError("");
                }
                setShowDatePicker(false);
                setSelectedDate(date);
              }}
              MainContainer={{
                borderColor: colors.SurfCrest,
              }}
              IconTintColor={true}
              isMaxDate
              MaxDate={new Date(strings?.maxDate)}
              title={"When would you like to reach this goal by?"}
            />
            <>
              {dateError ? (
                <Text style={styles.errorText}>{dateError}</Text>
              ) : null}
            </>
          </>
        )}

        <MultiButton
          onPress={onSavePhysicalHealthData}
          navigation={navigation}
          onSwiperClick={onSwiperClick}
          screenIndex={screenIndex}
          setScreenIndex={setScreenIndex}
          setNextSection={() => {
            setNextSection(false);
          }}
        />
        <CommonAlert
          isVisible={isAlert}
          alertMessage={"Goal set. You’re on your way."}
          alertLeftButtonOnPress={() => {
            goBack();
          }}
          isDescription
          DescriptionMessage={
            "We’ll use this goal to craft a personalized wellness path for you—complete with activities, tips, and support\nthat actually fit your life."
          }
          alertLeftButtonText={"Set another goal"}
          alertRightButtonOnPress={() => {
            setisAlert(false);
            if (
              [
                strings?.fromExplorer,
                strings?.ExplorerActivity,
                strings?.AIGeneratedSkipped,
              ].includes(from)
            ) {
              const isFromAIGeneratedSkipped =
                from === strings?.AIGeneratedSkipped; //if user get from value equalevalent to AI skipped then set is planner tru else false because user is probably from explorer side\
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
          alertRightButtonText={"Go to my dashboard"}
        />
      </ScrollView>
      {isLoading && <CommonLoader />}
    </View>
  );
};

export default PhysicalHealthGoals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: moderateScale(20),
  },
  textSubHeaderTitle: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginVertical: moderateScale(8),
  },
  activityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activityButton: {
    height: moderateScale(151),
    width: moderateScale(150),
    borderWidth: 1,
    borderColor: colors.SurfCrest,
    borderRadius: moderateScale(16),
    alignItems: "center",
    paddingVertical: moderateScale(20),
    gap: 10,
  },
  selectedActivityButton: {
    backgroundColor: colors.polishedPine,
  },
  activityImage: {
    height: moderateScale(70),
    width: moderateScale(70),
  },
  activityText: {
    fontSize: textScale(13),
    fontWeight: "600",
    color: colors.SurfCrest,
    margin: moderateScale(10),
    textAlign: "center",
  },
  addButton: {
    marginVertical: moderateScale(20),
    borderColor: colors?.SurfCrest,
    justifyContent: "center",
  },
  newSpecInput: {
    height: moderateScale(150),
    width: "100%",
    fontSize: textScale(14),
    fontWeight: "600",
    borderWidth: 1,
    padding: moderateScale(10),
    color: colors.SurfCrest,
    borderColor: colors.SurfCrest,
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(10),
    paddingTop: 20,
    textAlignVertical: "top",
  },
  desiredOutcomesInput: {
    marginTop: moderateScale(10),
  },
  errorText: {
    color: colors.royalOrange,
    marginTop: moderateScale(10),
  },
});
