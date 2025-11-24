import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import colors from "../../../../constant/colors";
import CommonHeader from "../../../../components/Header/commonHeader";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../../constant/responsiveStyle";
import InitialFeedback from "./InitialFeedback";
import SpecificDislikes from "./SpecificDislikes";
import RelevanceToGoals from "./RelevanceToGoals";
import CustomizationNeeds from "./CustomizationNeeds";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import navigationString from "../../../../navigation/navigationString";
import { useDispatch } from "react-redux";
import allActions from "../../../../redux/actions";
import { NoDataIcon } from "../../../../assets";
import CommonHealthLoader from "../../../../components/Loader/CommonHealthLoader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CommonAlert from "../../../../components/CommonAlert/CommonAlert";
import { aiProvider, TOAST_STATUS } from "../../../../constant/appConstant";
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";
import { strings } from "../../../../constant/strings";

const GiveFeedback = ({ navigation, route }: any) => {
  console.log("route?.params?.data:", route?.params);
  console.log("route?.params?.data params", route?.params);
  console.log("route?.params?.data headerName", route?.params?.selectedIndex);
  const [allQueData, setAllQueData] = useState(route?.params?.data);
  const [screenIndex, setScreenIndex] = useState(
    route?.params?.selectedIndex || 0
  );
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [isAllQuestionSelect, setisAllQuestionSelect] = useState(false);
  const [SelectedQuestionData, setSelectedQuestionData] = useState({
    regenerateStepQuesAnswer: [],
  });
  const [IsReloadAgainMdoal, setIsReloadAgainMdoal] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const showToasterDetails = (code: number, msg: string) => {
    setToasterDetails({
      showToast: true,
      code: code,
      message: msg,
    });
  };

  useEffect(() => {
    if (isAllQuestionSelect) {
      saveQuestion(SelectedQuestionData);
    }
  }, [isAllQuestionSelect, SelectedQuestionData]);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);

      try {
        if (!route?.params?.data) return;

        setAllQueData(route.params.data);
        setScreenIndex(route.params.selectedIndex || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setisLoading(false);
      }
    };
    fetchData();
  }, [route?.params?.data]);

  const onNavigate = (
    questionID: any,
    selectedAnswerID: any,
    isOtherValue: any,
    currentInputValue: any,
    currentIndex: any,
    fieldType: any
  ) => {
    const dynamicReq = createDynamicReq(
      questionID,
      selectedAnswerID,
      isOtherValue,
      currentInputValue,
      fieldType
    );
    setSelectedQuestionData((prevData) =>
      updateRegenerateStepQuesAnswer(prevData, dynamicReq)
    );
    if (allQueData.length === screenIndex + 1) {
      setisAllQuestionSelect(true);
    } else {
      setisAllQuestionSelect(false);
      setScreenIndex((prev) => prev + 1);
    }
  };

  const createDynamicReq = (
    questionId: any,
    answerId: any,
    isOtherValue: any,
    answerText: any,
    fieldType: any
  ) => {
    // Check for special field types
    if (fieldType === "Slider (1-10 scale)") {
      return {
        regenerateStepId: questionId,
        answer: answerText,
      };
    }

    if (fieldType === "TextArea") {
      return {
        regenerateStepId: questionId,
        answer: answerText,
      };
    }

    const answerIds = Array.isArray(answerId) ? answerId : [answerId];

    const regenerateStepQusOptionAns = answerIds.map((id) => {
      let optionAns = {
        regenerateStepOptionId: id,
      };

      if (isOtherValue && id === answerIds[answerIds.length - 1]) {
        optionAns.answer = answerText;
      }

      return optionAns;
    });

    return {
      regenerateStepId: questionId,
      regenerateStepQusOptionAns: regenerateStepQusOptionAns,
    };
  };

  const updateRegenerateStepQuesAnswer = (prevData: any, newData: any) => {
    const regenerateStepQuesAnswer = [...prevData.regenerateStepQuesAnswer];

    // Check if the new data is in the special format
    if ("answer" in newData) {
      const existingIndex = regenerateStepQuesAnswer.findIndex(
        (item) => item.regenerateStepId === newData.regenerateStepId
      );
      if (existingIndex >= 0) {
        regenerateStepQuesAnswer[existingIndex] = newData;
      } else {
        regenerateStepQuesAnswer.push(newData);
      }
    }

    return { regenerateStepQuesAnswer };
  };

  const saveQuestion = (SelectedQuestionData: any) => {
    console.log("InitialFeedback-=->", SelectedQuestionData);

    setisLoading(true);
    let regenerateStepQuesAnswer =
      SelectedQuestionData.regenerateStepQuesAnswer;

    let requestbody = {
      categoryId: 216,
      aspNetUserId: "",
      regenerateStepQuesAnswer,
      linkRequired: false,
      aiProvider: aiProvider?.WellnessPlan,
    };
    allActions.OnBoarding.ReGenerateSeekerWellnessPlan(
      dispatch,
      requestbody,
      "saveQuestion"
    )
      .then((response: any) => {
        console.log(
          "response in ReGenerateSeekerWellnessPlan",
          response,
          route?.params?.from
        );
        setisLoading(false);
        showToasterDetails(
          TOAST_STATUS?.SUCCESS,
          response?.message || strings?.Request_completed_successfully
        );
        if (response.statusCode == 200) {
          setIsReloadAgainMdoal(false);
          console.log("saveTemporarySlotData");
          allActions?.dashboardAction?.saveTemporarySlotData(dispatch, []);
          //Clear the temporary slots when user click on start now ,show me more and back button
          setTimeout(() => {
            navigation.navigate(navigationString.WellnessPlan, {
              data: response.data,
              regenerateStepQuesAnswer: requestbody,
              from: route?.params?.from ? route?.params?.from : "ReGenerate",
              newString: route?.params?.newString,
              isWellPlanIDRequired: route?.params?.isWellPlanIDRequired,
              wellnessPlanId: route?.params?.wellnessPlanId,
            });
            setScreenIndex(0);
          }, 500);
        } else {
          setIsReloadAgainMdoal(true);
          showToasterDetails(
            TOAST_STATUS?.ERROR,
            response?.message || strings?.somethingWrong
          );
        }
      })
      .catch((err) => {
        setIsReloadAgainMdoal(true);
        setisLoading(false);
        showToasterDetails(
          TOAST_STATUS?.ERROR,
          err?.message || strings?.somethingWrong
        );
      });
  };

  const renderScreens = () => {
    console.log("allQueData", allQueData, screenIndex);

    const currentStep = allQueData?.[screenIndex];
    // const currentStep = allQueData?.[screenIndex];
    console.log("currentStep", currentStep.fieldType);
    if (!currentStep) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              height: height / 2,
              width: width,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NoDataIcon />
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              borderColor: colors.SurfCrest,
              borderStyle: "solid",
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                marginBottom: moderateScale(3),
                borderStyle: "solid",
                color: colors.SurfCrest,
                fontWeight: "800",
                fontSize: textScale(16),
              }}
            >
              {"Go Back"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    switch (currentStep.fieldType) {
      case "Dropdown":
        return (
          <InitialFeedback
            title={currentStep.stepName}
            quesData={currentStep.stepFieldOptions}
            fieldType={currentStep.fieldType}
            regenerationStepTypeId={currentStep.regenerateStepId}
            onPress={(
              questionID: any,
              selectedAnswerID: any,
              isOtherValue: any,
              currentInputValue: any,
              currentIndex: any,
              fieldType: any
            ) =>
              onNavigate(
                questionID,
                selectedAnswerID,
                isOtherValue,
                currentInputValue,
                currentIndex,
                fieldType
              )
            }
            isNewScreen={true}
            currentIndex={screenIndex}
          />
        );

      case "Multi-select Dropdown":
        return (
          <SpecificDislikes
            title={currentStep.stepName}
            quesData={currentStep.stepFieldOptions}
            fieldType={currentStep.fieldType}
            regenerationStepTypeId={currentStep.regenerateStepId}
            onPress={(
              questionID: any,
              selectedAnswerID: any,
              isOtherValue: any,
              currentInputValue: any,
              currentIndex: any,
              fieldType: any
            ) =>
              onNavigate(
                questionID,
                selectedAnswerID,
                isOtherValue,
                currentInputValue,
                currentIndex,
                fieldType
              )
            }
            isNewScreen={true}
            currentIndex={screenIndex}
          />
        );

      case "Slider (1-10 scale)":
        return (
          <RelevanceToGoals
            title={currentStep.stepName}
            quesData={currentStep}
            fieldType={currentStep.fieldType}
            regenerationStepTypeId={currentStep.regenerateStepId}
            onPress={(
              questionID: any,
              selectedAnswerID: any,
              isOtherValue: any,
              currentInputValue: any,
              currentIndex: any,
              fieldType: any
            ) =>
              onNavigate(
                questionID,
                selectedAnswerID,
                isOtherValue,
                currentInputValue,
                currentIndex,
                fieldType
              )
            }
            currentIndex={screenIndex}
          />
        );

      case "TextArea":
        return (
          <CustomizationNeeds
            title={currentStep.stepName}
            data={currentStep}
            fieldType={currentStep.fieldType}
            regenerationStepTypeId={currentStep.regenerateStepId}
            onPress={(
              questionID: any,
              selectedAnswerID: any,
              isOtherValue: any,
              currentInputValue: any,
              currentIndex: any,
              fieldType: any
            ) =>
              onNavigate(
                questionID,
                selectedAnswerID,
                isOtherValue,
                currentInputValue,
                currentIndex,
                fieldType
              )
            }
            currentIndex={screenIndex}
          />
        );

      default:
        return (
          <View>
            <Text>Unsupported field type</Text>
          </View>
        );
    }
  };

  const handleBack = () => {
    if (screenIndex === 0) {
      navigation?.goBack();
    } else {
      setScreenIndex((prev) => prev - 1);
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors.SaltBox}>
      <>
        {isLoading ? (
          <CommonHealthLoader />
        ) : (
          <>
            <CommonHeader
              onBackPress={handleBack}
              headerName={
                route?.params?.headerName
                  ? route?.params?.headerName
                  : "Give Feedback"
              }
              iconContainer={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
              textStyle={{ color: colors?.SurfCrest }}
              mainContainer={{
                paddingBottom: moderateScale(15),
                paddingTop: moderateScale(10),
                paddingHorizontal: moderateScale(17),
              }}
            />
            <KeyboardAwareScrollView>
              <ScrollView>{renderScreens()}</ScrollView>
            </KeyboardAwareScrollView>
          </>
        )}
      </>

      <CommonAlert
        isVisible={IsReloadAgainMdoal}
        alertLeftButtonOnPress={() => {
          setIsReloadAgainMdoal(false);
          saveQuestion(SelectedQuestionData);
        }}
        alertLeftButtonText={"Reload"}
        alertRightButtonText={"Cancel"}
        alertMessage={
          "Due to some technical reason, we are not able to create wellness plan right now, you can try again or change your input."
        }
        alertRightButtonOnPress={() => setIsReloadAgainMdoal(false)}
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
export default GiveFeedback;
