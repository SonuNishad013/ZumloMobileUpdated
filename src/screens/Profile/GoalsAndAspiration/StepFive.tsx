import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import CommonButton from "../../../components/Buttons/commonButton";
import colors from "../../../constant/colors";
import {
  height,
  moderateScale,
  textScale,
} from "../../../constant/responsiveStyle";
import styles from "./styles";
import ProficiencyLevelList from "./ProficiencyLevelList";
import TitleHeader from "./TitleHeader";
import CommonInput from "../../../components/Inputs/commonInput";
import { DEVELOPING_NEW_SKILLS_DATA } from "./data";
import MultiButton from "./MultiButton";
import CustomDatePicker from "./CustomDatePicker";
import { useDispatch } from "react-redux";
import allActions from "../../../redux/actions";
import CommonLoader from "../../../components/Loader";
import { GoalsIcon1 } from "../../../assets";
import CommonAlert from "../../../components/CommonAlert/CommonAlert";
import { event } from "../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import navigationString from "../../../navigation/navigationString";
import {
  API_FUN_NAMES,
  SOCKET_FUN_NAME,
} from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import { strings } from "../../../constant/strings";
import { textLabelSize } from "../../../utils/TextConfig";
import logger from "../../../constant/logger";

const StepFive = ({
  item,
  onPress,
  nextSection,
  setNextSection,
  navigation,
  goalID,
  short_longID,
  onSwiperClick,
  userData,
  screenIndex,
  setScreenIndex,
  setToasterDetails,
  from,
}: any) => {
  const [fieldsData, setFieldsData] = useState(DEVELOPING_NEW_SKILLS_DATA);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [improvementVal, setImprovementVal] = useState("");
  const [selectedProficiency, setSelectedProficiency] = useState<any>();
  const [isError, setIsError] = useState(false);
  const [isError1, setIsError1] = useState(false);
  const [isError2, setIsError2] = useState(false);
  const [error4, setIsError4] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const saveEnhancingData = () => {
    if (!improvementVal) {
      setIsError4(true);
    }
    setIsLoading(true);
    try {
      let selectedData = selectedProficiency
        ?.map((item: any) => {
          if (item.isSelected) {
            return item.globalCodeId;
          }
        })
        .filter((item: any) => item !== undefined);
      let requestbody = {
        userId: userData?.userId,
        goalCategoryId: short_longID,
        categoryId: goalID,
        enhancingExistingSkill: {
          skillDescription: fieldsData?.[0]?.value,
          reasonForDevelopment: fieldsData?.[1]?.value,
          currentProficiencyLevelId:
            selectedData !== undefined ? selectedData?.[0] : "",
          improvementStrategies: improvementVal,
          targetDate: selectedDate.toISOString(),
        },
      };

      allActions.seekerDetails
        .CreateGoalAndAspirations(
          dispatch,
          requestbody,
          API_FUN_NAMES?.saveEnhancingData
        )
        .then((response: any) => {
          if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
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
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };
  const handleSelectedItem = (item: any) => {
    if (isError) {
      setIsError(!isError);
    } else {
      setIsError(false);
    }
    setSelectedProficiency(item);
  };
  const onNext = () => {
    const value: any[] = fieldsData?.map(() => {
      item?.value;
    });
    logger("value__", value);
    if (value[0] === undefined) {
      setIsError1(true);
    }
    if (value[1] === undefined) {
      setIsError2(true);
    }

    let selectedData = selectedProficiency
      ?.map((item: any) => {
        if (item.isSelected) {
          return item.globalCodeId;
        }
      })
      .filter((item: any) => item !== undefined);
    if (selectedData !== undefined) {
      onPress(fieldsData);
      setNextSection(true);
    } else {
      setIsError(true);
    }
  };

  return (
    <View style={stylesInternal?.container}>
      <ScrollView style={stylesInternal?.mainContainer}>
        <Text style={styles.textSubHeaderTitle}>
          {"Enhancing existing skill"}
        </Text>
        {!nextSection ? (
          <>
            {fieldsData.map((elem, index) => {
              return (
                <View style={stylesInternal?.addTop}>
                  <TitleHeader
                    title={elem.question}
                    style={stylesInternal?.addvertical}
                  />
                  <CommonInput
                    placeholder={elem?.placeHolder}
                    mainContainer={stylesInternal?.addTop}
                    value={elem.value}
                    inputText={{ color: colors.SurfCrest }}
                    onChangeText={(value: any) => {
                      const filteredText = value;
                      let data = [...fieldsData];
                      data[index].value = filteredText;
                      setFieldsData(data);
                    }}
                    placeholderTextColor={colors.SurfCrest}
                    backGroundColor={colors.SaltBox}
                    borderColor={colors.SurfCrest}
                    isWidth={false}
                  />
                  {isError1 && index == 0 ? (
                    <View style={stylesInternal?.addTop}>
                      <Text style={stylesInternal?.addorangeColor}>
                        {"Give your skill a name—we’ll help shape the path."}
                      </Text>
                    </View>
                  ) : null}
                  {isError2 && index == 1 ? (
                    <View style={stylesInternal?.addTop}>
                      <Text style={stylesInternal?.addorangeColor}>
                        {
                          "Let us know what’s driving you—it keeps things meaningful."
                        }
                      </Text>
                    </View>
                  ) : null}
                </View>
              );
            })}

            <TitleHeader title={"How would you rate your proficiency?"} />
            <ProficiencyLevelList
              onPress={() => {}}
              item={item?.[0]?.globalCodeOptions}
              setArray={handleSelectedItem}
            />
            {isError ? (
              <View style={stylesInternal?.addTop}>
                <Text style={stylesInternal?.addorangeColor}>
                  {"Choose the level that feels most true—you’ve got this."}
                </Text>
              </View>
            ) : null}
            <CustomDatePicker
              showDatePicker={showDatePicker}
              selectedDate={selectedDate}
              setShowDatePicker={setShowDatePicker}
              innerTitle={"Select a date that works for you"}
              setSelectedDate={(date: any) => {
                setShowDatePicker(false);
                setSelectedDate(date);
              }}
              title={strings?.Set_your_goal_deadline}
            />
            <View style={{ marginBottom: moderateScale(10) }}>
              <CommonButton
                btnName={"Continue"}
                mainContainer={styles.buttonContainer}
                onPress={() => onNext()}
              />
            </View>
          </>
        ) : (
          <>
            <View>
              <Text
                style={{
                  fontSize: textLabelSize?.titleFont,
                  color: colors?.SurfCrest,
                  marginBottom: moderateScale(20),
                  fontWeight: "400",
                }}
              >
                {
                  "Now that you've chosen your skill—how do you plan to improve it?"
                }
              </Text>
              <TextInput
                multiline
                style={stylesInternal?.strategyText}
                placeholder={
                  "E.g., “Take an advanced course, practice twice a week, get feedback from a mentor…"
                }
                placeholderTextColor={colors?.SurfCrest}
                value={improvementVal}
                onChangeText={(text: any) => {
                  const filteredText = text.replace(/[^a-zA-Z\s]/g, "");
                  setImprovementVal(filteredText);
                }}
              />
              {/* {error4 && (
                <Text>
                  {"Let’s add your plan—it helps us guide you forward."}
                </Text>
              )} */}
              {error4 ? (
                <View style={stylesInternal?.addTop}>
                  <Text style={stylesInternal?.addorangeColor}>
                    {"Let’s add your plan—it helps us guide you forward."}
                  </Text>
                </View>
              ) : null}
              {/* <View style={stylesInternal?.goalIconView}>
                <GoalsIcon1
                  width={`${moderateScale(80)}`}
                  height={`${moderateScale(200)}`}
                />
              </View> */}
              <MultiButton
                onPress={() => saveEnhancingData()}
                navigation={navigation}
                onSwiperClick={onSwiperClick}
                screenIndex={screenIndex}
                setScreenIndex={setScreenIndex}
                setNextSection={() => {
                  setNextSection(false);
                }}
              />
            </View>
          </>
        )}
      </ScrollView>

      <CommonAlert
        isVisible={isAlert}
        alertMessage={strings?.You_have_successfully_set_your_goal}
        alertLeftButtonOnPress={() => {
          setNextSection(false);
          setScreenIndex(screenIndex - 1);
        }}
        alertLeftButtonText={strings?.Set_more_goals}
        alertRightButtonOnPress={() => {
          setNextSection(false);
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
      {isLoading && <CommonLoader />}
    </View>
  );
};
export default StepFive;

const stylesInternal = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  },
  addTop: {
    marginTop: moderateScale(10),
  },
  addvertical: {
    marginVertical: moderateScale(5),
  },
  addorangeColor: {
    color: colors.royalOrange,
  },
  strategyText: {
    height: (height * 50) / 100,
    width: "100%",
    fontSize: textScale(14),
    fontWeight: "400",
    borderWidth: 1,
    padding: moderateScale(10),
    color: colors?.SurfCrest,
    borderColor: colors?.SurfCrest,
    borderRadius: moderateScale(10),
    textAlignVertical: "top",
    marginTop: moderateScale(10),
  },
  goalIconView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: moderateScale(200),
    alignItems: "center",
  },
});
