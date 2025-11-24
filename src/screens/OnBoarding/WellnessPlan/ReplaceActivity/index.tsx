import React, { ReactElement, useEffect, useState } from "react";
import { View, ScrollView, Text, BackHandler, Alert } from "react-native";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import CommonButton from "../../../../components/Buttons/commonButton";
import Global from "../../../../global";
import * as AsyncStorageUtils from "../../../../utils/Storage/AsyncStorage";
import {
  filterCategoryData,
  filterglobalCodeOptionsData,
  getGlobalCodeOptionsId,
} from "../../../../helper/getGlobalCodes";
import allActions from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../../components/Loader";

import CommonHealthLoader from "../../../../components/Loader/CommonHealthLoader";
import CommonHeader from "../../../../components/Header/commonHeader";
import navigationString from "../../../../navigation/navigationString";
import CommonAlert from "../../../../components/CommonAlert/CommonAlert";
import {
  allStepName,
  categoryName,
  codeName,
  fieldType,
} from "../../../../constant/AllGlobalNameConstant";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { strings } from "../../../../constant/strings";
import CustomToast from "../../../../components/Toast";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import LineSelection from "../../AIGeneration/CommonScreen/FieldTypeUI/LineSelection/LineSelection";
import TextAreaInput from "../../AIGeneration/CommonScreen/FieldTypeUI/TextAreaInput/TextAreaInput";
import CircleSelection from "../../AIGeneration/CommonScreen/FieldTypeUI/CircleSelection/CircleSelection";
import { aiProvider } from "../../../../constant/appConstant";
import logger from "../../../../constant/logger";

interface Props {
  navigation?: any;
  route?: any;
}
const RepplaceWellnessActivity: React.FC<Props> = ({
  navigation,
  route,
}): ReactElement => {
  const {
    trackId,
    from,
    newString,
    reqData,
    guids,
    responseType,
    parentCategory,
    regenerateQuestionsResponsebyUser,
  } = route.params;

  const dispatch: any = useDispatch();
  const [index, setIndex] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [responseMap, setResponseMap] = useState<any[]>([]);
  const [activitiesGlobalCode, setActivitiesGlobalCode] = useState<any>(0);
  const [questionData, setQuestionData] = useState<any>([]);
  const [isAlert, setIsAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [aiLoader, setAiLoader] = useState(false);
  const [goalsGlobalCode, setgoalsGlobalCode] = useState(null);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  // new code
  useEffect(() => {
    (async function () {
      const globalCode =
        responseType === "goals"
          ? await getGlobalCodeForGoals()
          : await getGlobalCode();
      logger("globalCode_____", globalCode);
    })();
  }, [responseType]);

  const getGlobalCodeForGoals = async () => {
    try {
      const getGlobalCodeData = await AsyncStorageUtils.getItem(
        AsyncStorageUtils.GLOBALCODEWITHCATEGORY
      );
      let getOnboardingGlobalData = await filterCategoryData(
        JSON.parse(getGlobalCodeData),
        categoryName?.aiGenerationCategory
      );
      let getGlobalCodeOptionsData = await filterglobalCodeOptionsData(
        getOnboardingGlobalData?.[0].globalCodeOptions,
        codeName?.RegenerateGoals
      );
      setgoalsGlobalCode(getGlobalCodeOptionsData?.[0]?.globalCodeId);
      if (!regenerateQuestionsResponsebyUser) {
        await getRegenerateOnboardingDetails(
          getGlobalCodeOptionsData?.[0]?.globalCodeId
        );
      }
      return getGlobalCodeOptionsData?.[0]?.globalCodeId;
    } catch (error) {
      console.error("Error retrieving login user data:", error);
    }
  };
  // new code

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        if (!aiLoader) {
          if (index > 0) {
            setIndex((prevIndex: any) => prevIndex - 1);
            return true;
          }
          return navigation?.goBack();
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [index]);
  const getGlobalCode = async () => {
    try {
      const getGlobalCodeData = await AsyncStorageUtils.getItem(
        AsyncStorageUtils.GLOBALCODEWITHCATEGORY
      );

      let getOnboardingGlobalData = await filterCategoryData(
        JSON.parse(getGlobalCodeData),
        categoryName?.aiGenerationCategory
      );

      let getGlobalCodeOptionsData = await filterglobalCodeOptionsData(
        getOnboardingGlobalData?.[0].globalCodeOptions,
        codeName?.RegenerateActivity
      );

      setActivitiesGlobalCode(getGlobalCodeOptionsData?.[0]?.globalCodeId);
      if (!regenerateQuestionsResponsebyUser) {
        await getRegenerateOnboardingDetails(
          getGlobalCodeOptionsData?.[0]?.globalCodeId
        );
      }
      return getGlobalCodeOptionsData?.[0]?.globalCodeId;
    } catch (error) {
      console.error("Error retrieving login user data:", error);
    }
  };

  const logGlobalCodeIds = async () => {
    const getGlobalCodeData = await AsyncStorageUtils.getItem(
      AsyncStorageUtils.GLOBALCODEWITHCATEGORY
    );
    const myGlobalCodeId_for_RegenerateGoals = await getGlobalCodeOptionsId(
      JSON.parse(getGlobalCodeData),
      categoryName?.aiGenerationCategory,
      "RegenerateGoals"
    );
    const myGlobalCodeId_for_RegenerateActivity = await getGlobalCodeOptionsId(
      JSON.parse(getGlobalCodeData),
      categoryName?.aiGenerationCategory,
      "RegenerateActivity"
    );

    return {
      myGlobalCodeId_for_RegenerateGoals,
      myGlobalCodeId_for_RegenerateActivity,
    };
  };
  const getRegenerateOnboardingDetails = async (
    getRegenerateOnboardingDetailsId: any
  ) => {
    setisLoading(true);

    const {
      myGlobalCodeId_for_RegenerateGoals,
      myGlobalCodeId_for_RegenerateActivity,
    } = await logGlobalCodeIds();

    let requestbody = {};
    await allActions.OnBoarding.GetRegenerateOnboardingDetails(
      dispatch,
      requestbody,
      "getRegenerateOnboardingDetails",
      responseType === "goals"
        ? myGlobalCodeId_for_RegenerateGoals?.globalCodeId
        : myGlobalCodeId_for_RegenerateActivity?.globalCodeId
    )
      .then((response: any) => {
        setisLoading(false);
        if (response.statusCode == 200) {
          if (response?.data != null && response?.data.length != 0) {
            setQuestionData(response?.data);
          }
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };

  const renderComponentUI = (idx: any) => {
    const uiShow = questionData[idx]?.fieldType;

    switch (uiShow) {
      case fieldType?.multiSelect:
        return (
          <LineSelection
            questionValue={questionData[idx]}
            answerIndex={idx}
            answerData={(data: any) => resultPush(data)}
            ableData={responseMap[idx]}
            isActivityRegeneration={true}
            isMulti={true}
          />
        );
      case fieldType?.textArea:
        return (
          <TextAreaInput
            questionValue={questionData[idx]}
            answerIndex={idx}
            answerData={(data: any) => resultPush(data)}
            ableData={responseMap[idx]}
            placeHolder={"Describe here(optional)"}
          />
        );
      case fieldType?.singleSelect:
        return (
          <LineSelection
            questionValue={questionData[idx]}
            answerIndex={idx}
            answerData={(data: any) => resultPush(data)}
            ableData={responseMap[idx]}
            isActivityRegeneration={true}
            isMulti={false}
          />
        );
      default:
        return (
          <View>
            <Text
              style={{
                fontSize: textScale(24),
                alignSelf: "center",
                fontWeight: "600",
                color: colors?.polishedPine,
              }}
            >
              Not UI supportable
            </Text>
          </View>
        );
    }
  };

  const backFunction = () => {
    if (index > 0) {
      setIndex(index - 1);
      Global.GlobalIndex = index - 1;
    } else navigation?.goBack();
  };
  const RegenerateSelectedActivitiesDetails = async (globalCode: any) => {
    setAiLoader(true);

    // Format the regenerateStepQuesAnswer array from responseMap
    const formattedAnswers = responseMap.map((response: any, index: number) => {
      // For TextArea type questions
      if (questionData[index]?.fieldType === fieldType?.textArea) {
        return {
          regenerateStepId: questionData[index]?.regenerateStepId,
          answer: response?.answer || "",
          regenerateStepQusOptionAns: [],
          isSkip: false,
        };
      }

      // For MultiSelect and SingleSelect type questions
      return {
        regenerateStepId: questionData[index]?.regenerateStepId,
        answer: "",
        regenerateStepQusOptionAns: response?.regenerateStepQusOptionAns?.map(
          (ans: any) => ({
            regenerateStepAnswerId: ans?.regenerateStepAnswerId || 0,
            regenerateStepOptionId: ans?.regenerateStepOptionId,
            otherDescription: ans?.otherDescription || "",
          })
        ),
        isSkip: false,
      };
    });

    const {
      myGlobalCodeId_for_RegenerateGoals,
      myGlobalCodeId_for_RegenerateActivity,
    } = await logGlobalCodeIds();
    const requestbody = {
      guids: guids,
      trackId: trackId || "",
      aiProvider: aiProvider?.WellnessPlan,
      linkRequired: false,
      categoryId:
        responseType === "goals"
          ? myGlobalCodeId_for_RegenerateGoals?.globalCodeId
          : myGlobalCodeId_for_RegenerateActivity?.globalCodeId,
      parentCategory: parentCategory,
      regenerateStepQuesAnswer: formattedAnswers,
      responseType: responseType,
      userScheduledTimeSlot: "",
    };

    try {
      const response =
        responseType !== "goals"
          ? await allActions.OnBoarding.RegenerateSelectedActivitiesDetails(
              dispatch,
              requestbody,
              "RegenerateSelectedActivitiesDetails"
            )
          : await allActions.OnBoarding.RegenerateSelectedGoalDetails(
              dispatch,
              requestbody,
              "RegenerateSelectedActivitiesDetails"
            );

      setAiLoader(false);

      if (response.statusCode === 200) {
        navigation.navigate(navigationString.WellnessPlan, {
          data: response.data,
          regenerateStepQuesAnswer: "",
          from: from,
          reqData: reqData,
          fromWellnessOverView: false, // or set to an appropriate value
          newString: newString,
          // regenerateQuestionsResponsebyUser: formattedAnswers,
        });
      } else {
        setToasterDetails({
          showToast: true,
          code: 0,
          message: response?.message || "Something went wrong",
        });
      }
    } catch (err: any) {
      setAiLoader(false);
    }
  };
  const onPressNext = () => {
    if (index == questionData?.length - 1) {
      if (responseMap[index]?.regenerateStepQusOptionAns?.length > 0) {
        RegenerateSelectedActivitiesDetails(null);
      } else {
        if (questionData[index]?.fieldType == fieldType?.textArea) {
          RegenerateSelectedActivitiesDetails(null);
        } else {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: strings?.pleaseSelectOption_orAddYour,
          });
        }
      }
    } else {
      if (questionData[index]?.fieldType == fieldType?.textArea) {
        // if (!responseMap[index]?.answer) {
        //   setToasterDetails({
        //     showToast: true,
        //     code: 0,
        //     message: strings?.textAreaError,
        //   });
        // } else {
        setIndex(index + 1);
        Global.GlobalIndex = index + 1;
        // }
      } else {
        if (responseMap[index]?.regenerateStepQusOptionAns?.length > 0) {
          setIndex(index + 1);
          Global.GlobalIndex = index + 1;
        } else {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: strings?.pleaseSelectOption_orAddYour,
          });
        }
      }
    }
  };

  const resultPush = (data: any) => {
    let listData: any = [...responseMap];
    listData[data?.indexId] = data?.answer;
    setResponseMap(listData);
  };

  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      {!isLoading ? (
        <>
          {aiLoader ? (
            <CommonHealthLoader />
          ) : (
            <>
              <CommonHeader
                headerName={
                  questionData[index]?.fieldName
                    ? questionData[index]?.fieldName
                    : `Replace ${responseType}`
                }
                onBackPress={() => backFunction()}
                mainContainer={{
                  marginTop: moderateScale(15),
                  paddingBottom: moderateScale(15),
                  marginHorizontal: moderateScale(19),
                }}
                iconContainer={{ backgroundColor: colors?.saltDark }}
              />
              <KeyboardAwareScrollView
                style={{ flex: 1 }}
                extraHeight={150}
                showsVerticalScrollIndicator={false}
              >
                {questionData?.length != 0 && renderComponentUI(index)}
              </KeyboardAwareScrollView>
              <CommonButton
                onPress={() => onPressNext()}
                btnName={"NEXT"}
                mainContainer={{
                  width: "auto",
                  marginBottom: moderateScale(30),
                  marginHorizontal: moderateScale(19),
                }}
              />
            </>
          )}
        </>
      ) : (
        <CommonLoader />
      )}
      {toasterDetails?.showToast && (
        <CustomToast
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
    </ScreenWrapper>
  );
};

export default RepplaceWellnessActivity;
