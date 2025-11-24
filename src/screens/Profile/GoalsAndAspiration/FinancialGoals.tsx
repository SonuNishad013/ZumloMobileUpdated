import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import CommonInput from "../../../components/Inputs/commonInput";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { FINANCIAL_GOALS_DATA } from "./data";
import styles from "./styles";
import TitleHeader from "./TitleHeader";
import MultiButton from "./MultiButton";
import allActions from "../../../redux/actions";
import CommonLoader from "../../../components/Loader";
import { useDispatch } from "react-redux";
import CommonAlert from "../../../components/CommonAlert/CommonAlert";
import { event } from "../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import { capitalizeFirstLetter } from "../../../validations/capitalizeFirstLetter";
import CustomImage from "../../../components/ImageRender";
import { singleSelectedByIndex } from "../../../constant/CustomHook/CommonFunctions";
import navigationString from "../../../navigation/navigationString";
import { strings } from "../../../constant/strings";
import {
  API_FUN_NAMES,
  SOCKET_FUN_NAME,
} from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import { APPLY_STATUS } from "../../../constant/ENUM";
import logger from "../../../constant/logger";

const FinancialGoals = ({
  onPress,
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
  const removeValuesFromObjects = (data: any) => {
    console.log("FINANCIAL_GOALS_DATA", FINANCIAL_GOALS_DATA);
    return data?.map((item: any) => {
      const { value, ...rest } = item;
      return rest;
    });
  };

  const [allData, setAllData] = useState<any>(data?.[0]?.globalCodeOptions);
  const [fieldsData, setFieldsData] = useState<any>(
    removeValuesFromObjects(FINANCIAL_GOALS_DATA)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    financialGoalDescription: false,
    targetAmount: false,
    timeframe: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    financialGoalDescription: "",
    targetAmount: "",
    timeframe: "",
  });

  const dispatch = useDispatch();
  const [isAlert, setIsAlert] = useState(false);
  useEffect(() => {
    let newData = allData?.filter(
      (item: any) => item.codeName !== strings?.Other
    );
    newData = newData.map((item: any) => ({ ...item, isSelected: false }));
    setAllData(newData);
  }, []);

  const validateFields = () => {
    let isValid = true;
    const newErrorState = {
      financialGoalDescription: false,
      targetAmount: false,
      timeframe: false,
    };
    const newErrorMessage = {
      financialGoalDescription: "",
      targetAmount: "",
      timeframe: "",
    };

    if (!fieldsData?.[0]?.value?.trim()) {
      newErrorState.financialGoalDescription = true;
      newErrorMessage.financialGoalDescription =
        "Let’s start by naming your goal—it can be anything you care about."; //error 1
      isValid = false;
    }

    if (fieldsData?.[1]?.value && isNaN(fieldsData?.[1]?.value)) {
      newErrorState.targetAmount = true;
      newErrorMessage.targetAmount =
        "Just pop in a number—it helps us keep things realistic and motivating.";
      isValid = false;
    }

    const selectedData = allData?.filter((item: any) => item.isSelected);
    if (selectedData.length === 0) {
      newErrorState.timeframe = true;
      newErrorMessage.timeframe =
        "Choose a timeframe so we can pace your journey right."; //error 2 timeframe
      isValid = false;
    }

    setIsError(newErrorState);
    setErrorMessage(newErrorMessage);

    return isValid;
  };

  const saveFinancialGoalsData = () => {
    if (!validateFields()) {
      return;
    }

    setIsLoading(true);
    let selectedData = allData
      .map((item: any) => {
        if (item.isSelected) {
          return item.globalCodeId;
        }
      })
      .filter((item: any) => item !== undefined);

    let requestbody = {
      userId: userData?.userId,
      goalCategoryId: short_longID,
      categoryId: goalID,
      financialGoals: {
        financialGoalDescription: fieldsData?.[0]?.value,
        targetAmount: Number(fieldsData?.[1]?.value),
        timeFrameId: selectedData?.[0],
      },
    };
    allActions.seekerDetails
      .CreateGoalAndAspirations(
        dispatch,
        requestbody,
        API_FUN_NAMES?.saveFinancialGoalsData
      )
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setToasterDetails({
            showToast: true,
            code: TOAST_STATUS?.SUCCESS,
            message: response?.message,
          });
          setTimeout(() => {
            setIsLoading(false);
            setIsAlert(true);
          }, 2000);
        } else {
          setIsLoading(false);
          setToasterDetails({
            showToast: true,
            code: TOAST_STATUS?.ERROR,
            message: response?.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setToasterDetails({
          showToast: true,
          code: TOAST_STATUS?.ERROR,
          message: err,
        });
      });
  };

  const onActivitySelection = (index: any) => {
    let data = [...allData];
    let updatedArray = singleSelectedByIndex(data, index);
    setAllData(updatedArray);
  };

  return (
    <>
      <ScrollView style={stylesInternal?.container}>
        <Text style={styles.textSubHeaderTitle}>{"Money Goals"}</Text>
        {fieldsData.map((elem: any, index: number, a: any, b: any) => {
          logger("elem___", elem);
          return (
            <View key={index} style={stylesInternal?.addTop}>
              <TitleHeader
                title={elem?.question}
                style={stylesInternal?.addVertical}
              />
              <CommonInput
                placeholder={elem?.placeHolder}
                mainContainer={stylesInternal?.addTop}
                value={elem.value}
                inputText={{ color: colors.SurfCrest }}
                onChangeText={(value: any) => {
                  const filteredText =
                    elem.title == strings?.Target_Amount
                      ? value.replace(/\D/g, "")
                      : value;
                  let data = [...fieldsData];
                  data[index].value = filteredText;
                  setFieldsData(data);
                }}
                placeholderTextColor={colors.SurfCrest}
                backGroundColor={colors.SaltBox}
                borderColor={colors.SurfCrest}
                isWidth={false}
                maxLength={elem.title == strings?.Target_Amount ? 7 : null}
                keyboardType={
                  elem.title == strings?.Target_Amount
                    ? APPLY_STATUS?.number_pad
                    : APPLY_STATUS?.email_address
                }
              />
              {isError.financialGoalDescription && index === 0 && (
                <Text style={stylesInternal?.errorMessageStyle}>
                  {errorMessage.financialGoalDescription}
                </Text>
              )}
              {isError.targetAmount && index === 1 && (
                <Text style={stylesInternal?.errorMessageStyle}>
                  {errorMessage.targetAmount}
                </Text>
              )}
            </View>
          );
        })}

        <TitleHeader title={"When would you like to reach this goal?"} />
        <View style={stylesInternal?.flexRowView}>
          {allData?.map((item: any, index: any) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => onActivitySelection(index)}
                style={[
                  stylesInternal?.clickOnFirstLetter,
                  {
                    backgroundColor: item.isSelected
                      ? colors?.polishedPine
                      : colors?.transparent,
                  },
                ]}
              >
                <CustomImage
                  source={{ uri: item.imageURL }}
                  width={moderateScale(60)}
                  height={moderateScale(60)}
                  isTintColor={false}
                />

                <Text style={stylesInternal?.firstLetterText}>
                  {capitalizeFirstLetter(item.codeName)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {isError.timeframe && (
          <Text style={{ color: colors.royalOrange, marginTop: 5 }}>
            {errorMessage.timeframe}
          </Text>
        )}
        <MultiButton
          onPress={() => saveFinancialGoalsData()}
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
    </>
  );
};

export default FinancialGoals;

const stylesInternal = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: moderateScale(20),
  },
  addTop: {
    marginTop: moderateScale(10),
  },
  addVertical: {
    marginVertical: moderateScale(5),
  },
  errorMessageStyle: {
    color: colors.royalOrange,
    marginTop: moderateScale(5),
  },
  flexRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clickOnFirstLetter: {
    width: moderateScale(150),
    height: moderateScale(150),
    alignItems: "center",
    padding: moderateScale(15),
    borderWidth: 1,
    borderColor: "white",
    borderRadius: moderateScale(16),

    justifyContent: "center",
    gap: moderateScale(10),
  },
  firstLetterText: {
    fontSize: textScale(13),
    fontWeight: "600",
    color: colors.SurfCrest,
    margin: moderateScale(10),
    textAlign: "center",
  },
});
