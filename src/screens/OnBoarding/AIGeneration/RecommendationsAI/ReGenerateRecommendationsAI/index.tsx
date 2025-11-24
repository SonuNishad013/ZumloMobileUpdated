import React, { ReactElement, useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import ScreenWrapper from "../../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../../constant/colors";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";
import CommonButton from "../../../../../components/Buttons/commonButton";
import Global from "../../../../../global";
import * as AsyncStorageUtils from "../../../../../utils/Storage/AsyncStorage";
import { getGlobalCodeOptionsId } from "../../../../../helper/getGlobalCodes";
import allActions from "../../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CommonLoader from "../../../../../components/Loader";

import CommonHealthLoader from "../../../../../components/Loader/CommonHealthLoader";
import CommonHeader from "../../../../../components/Header/commonHeader";
import navigationString from "../../../../../navigation/navigationString";
import CommonAlert from "../../../../../components/CommonAlert/CommonAlert";
import { fieldType } from "../../../../../constant/AllGlobalNameConstant";
import CustomToast from "../../../../../components/Toast";
import { strings } from "../../../../../constant/strings";
import { aiProvider, STATUS_CODES } from "../../../../../constant/appConstant";
import logger from "../../../../../constant/logger";
import {
  dashboardClickENUM,
  GlobalCategoryName,
  GlobalCodeName,
} from "../../../../../constant/ENUM";
import { getRecommendationQuestion } from "../../../../../redux/selector";
import ToastApiResponse from "../../../../../components/Toast/ToastApiResponse";
import { ajaxGet } from "../../../../../config/apiService";
import apiConstant from "../../../../../constant/apiConstant";
import LineSelectionForRecommendation from "../../CommonScreen/FieldTypeUI/LineSelection/LineSelectionForRecommendation";
import { findValueByKey } from "../../../../Dashboard/Summary/component/Hooks/transformGoalsFromAPI";
import { API_FUN_NAMES } from "../../../../../constant/APIsFunctionNames";

interface Props {
  navigation?: any;
  route?: any;
}
const ReGenerateRecommendationsAI: React.FC<Props> = ({
  navigation,
  route,
}): ReactElement => {
  const { from, reqData } = route?.params;
  const dispatch: any = useDispatch();
  const getRecommendationQuestion_ = useSelector(getRecommendationQuestion());
  logger("getRecommendationQuestion___122_", getRecommendationQuestion_);
  const [index, setIndex] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [responseMap, setResponseMap] = useState<any>([]);

  const [questionData, setQuestionData] = useState<any>([]);
  const [isAlert, setIsAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [aiLoader, setAiLoader] = useState(false);
  const [requestPayload, setRequestPayload] = useState<any[]>([]);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    getGlobalCode();
  }, []);
  const getGlobalCode = async () => {
    try {
      const getGlobalCodeData = await AsyncStorageUtils.getItem(
        AsyncStorageUtils.GLOBALCODEWITHCATEGORY
      );

      const catIDInit = await getGlobalCodeOptionsId(
        JSON.parse(getGlobalCodeData),
        GlobalCategoryName.AIGenerationCategory,
        GlobalCodeName?.IndividualRecommendations
      );
      const catID = await getGlobalCodeOptionsId(
        JSON.parse(getGlobalCodeData),
        GlobalCategoryName.AIGenerationCategory,
        GlobalCodeName?.RegenerateRecommendations
      );
      GetOnboardingStepsRecommendationInitialsQuestion(
        catIDInit?.globalCodeId,
        catID?.globalCodeId
      );
    } catch (error) {
      console.error("Error retrieving login user data:", error);
    }
  };
  const GetOnboardingStepsRecommendationInitialsQuestion = async (
    categoryId: any,
    regenerateRecommendationsCategoryID: any
  ) => {
    setisLoading(true);
    const url = apiConstant().GetOnboardingSteps + "?categoryId=" + categoryId;
    return ajaxGet(url, {}, null, null)
      .then(async (resp) => {
        setisLoading(false);
        if (resp?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (resp?.data != null && resp?.data.length != 0) {
            GetOnboardingSteps(regenerateRecommendationsCategoryID, resp?.data);
          }
        }
      })
      .catch((err) => {
        setisLoading(false);
        console.log("testing_error", err);
      });
  };

  const GetOnboardingSteps = (categoryId: any, initialQuestion: any) => {
    setisLoading(true);
    const url = apiConstant().GetOnboardingSteps + "?categoryId=" + categoryId;
    return ajaxGet(url, {}, null, null)
      .then((resp) => {
        setisLoading(false);
        if (resp?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (resp?.data != null && resp?.data.length != 0) {
            const combineQuestions = initialQuestion?.concat(resp?.data);
            logger("combineQuestions____", combineQuestions);
            setQuestionData(combineQuestions);
          }
        }
      })
      .catch((err) => {
        setisLoading(false);
        console.log("testing_error", err);
      });
  };

  const getAIResp = async (result: any[]) => {
    setisLoading(true);
    const getGlobalCodeData = await AsyncStorageUtils.getItem(
      AsyncStorageUtils.GLOBALCODEWITHCATEGORY
    );

    const catID = await getGlobalCodeOptionsId(
      JSON.parse(getGlobalCodeData),
      GlobalCategoryName.AIGenerationCategory,
      GlobalCodeName?.Recommendations
    );

    try {
      if (catID) {
        const requestBody = {
          categoryId: catID?.globalCodeId,
          linkRequired: false,
          aiProvider: aiProvider?.Goals,
          aspNetUserId: null,
          isCategorySelected: true,
          stepOption: requestPayload,
        };
        logger("requestBody____", requestBody);
        const response =
          await allActions.seekerDetails.GenerateRecommendationItems(
            dispatch,
            requestBody,
            API_FUN_NAMES?.GenerateRecommendationItems
          );
        if (response) {
          setisLoading(false);
        }
        if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
          if (
            response?.data?.responseType.toLowerCase() ===
            strings.Recommendations.toLowerCase()
          ) {
            const isRecommendationsDataAvailable: any[] = findValueByKey(
              response,
              "recommendations"
            );
            if (
              Array.isArray(isRecommendationsDataAvailable) &&
              isRecommendationsDataAvailable?.length
            ) {
              navigation?.navigate(
                navigationString?.GeneratedRecommendationsAI,
                {
                  recommendationsData: response?.data,
                  from: from || dashboardClickENUM?.Dashbaord,
                }
              );
            } else {
            }
          }
        }
      }
    } catch (error: any) {
      setisLoading(false);
    } finally {
      setisLoading(false);
    }
  };
  const resultPush = (data: any) => {
    let listData: any = [...responseMap];
    listData[data?.indexId] = data?.answer;
    setResponseMap(listData);
  };
  const backFunction = () => {
    if (index > 0) {
      setIndex(index - 1);
      Global.GlobalIndex = index - 1;
    } else navigation?.goBack();
  };
  const onPressNext = () => {
    logger("onPressNext____", {
      index,
      quesLength: questionData?.length,
      requestPayload,
      responseMap,
    });
    if (index === questionData?.length - 1) {
      if (requestPayload[index]?.optionId?.length > 0) {
        getAIResp([]);
      } else {
        setToasterDetails({
          showToast: true,
          Code: 0,
          message: strings?.pleaseSelectOption_orAddYour,
        });
      }
    } else {
      if (requestPayload[index]?.optionId?.length < 0) {
        setToasterDetails({
          showToast: true,
          Code: 0,
          message: strings?.pleaseSelectOption_orAddYour,
        });
        return;
      } else {
        setIndex(index + 1);
      }
    }
  };

  const renderComponentUI = (idx: any) => {
    const uiShow = questionData[idx]?.stepFields[0]?.fieldType;
    // const uiShow = questionData[idx];

    switch (uiShow) {
      // case fieldType?.multiSelect:
      //   return (
      //     <LineSelection
      //       questionValue={questionData[idx]}
      //       answerIndex={idx}
      //       answerData={(data: any) => resultPush(data)}
      //     />
      //   );
      case fieldType?.multiSelect:
        return (
          <LineSelectionForRecommendation
            questionValue={questionData[idx]}
            answerIndex={idx}
            answerData={(data: any) => {
              resultPush(data);
            }}
            setAnsweredValue={(val: any) => {
              logger("setAnsweredValue___", val);
              let rawData: any[] = [...requestPayload];
              let payload = {
                stepId: val?.questionValue?.stepId,
                fieldId: val?.questionValue?.fieldID,
                optionId: val?.questionValue?.stepFieldOptions
                  .filter((option: any) => option.isSelected === true)
                  .map((option: any) => option.optionID),
                isSkip: false,
              };
              rawData[index] = payload;
              logger("rawData____withAnswerselected", rawData);
              setRequestPayload(rawData);
            }}
          />
        );
      // case fieldType?.textArea:
      //   return (
      //     <TextAreaInput
      //       questionValue={questionData[idx]}
      //       answerIndex={idx}
      //       answerData={(data: any) => resultPush(data)}
      //     />
      //   );
      // case fieldType?.singleSelect:
      //   return (
      //     <CircleSelection
      //       questionValue={questionData[idx]}
      //       answerIndex={idx}
      //       answerData={(data: any) => resultPush(data)}
      //     />
      //   );
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
                    : "Header"
                }
                onBackPress={() => backFunction()}
                mainContainer={{
                  marginTop: moderateScale(15),
                  paddingBottom: moderateScale(15),
                  marginHorizontal: moderateScale(19),
                }}
                iconContainer={{ backgroundColor: colors?.saltDark }}
              />
              <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
              >
                {questionData?.length != 0 && renderComponentUI(index)}
              </ScrollView>
              <CommonButton
                onPress={() => onPressNext()}
                btnName={index == questionData?.length - 1 ? "SUBMIT" : "NEXT"}
                mainContainer={{
                  width: "auto",
                  marginBottom: moderateScale(30),
                  marginHorizontal: moderateScale(19),
                }}
              />
              {isAlert && (
                <CommonAlert
                  alertMessage={alertMsg ? alertMsg : "Something went wrong."}
                  isVisible={true}
                  alertLeftButtonText="CANCEL"
                  alertRightButtonText="OK"
                  customAlertTxtStyles={{
                    textAlign: "center",
                    marginBottom: moderateScale(10),
                  }}
                  alertLeftButtonOnPress={() => {
                    setIsAlert(false);
                    navigation?.goBack();
                  }}
                  alertRightButtonOnPress={() => {
                    setIsAlert(false);
                    // regenerateOnboardingDetails(recommendationsGlobalCode);
                    getAIResp([]);
                  }}
                  isAlertIcon
                />
              )}
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

export default ReGenerateRecommendationsAI;
