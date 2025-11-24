import React, { ReactElement, useEffect, useState } from "react";
import { View, Text, BackHandler } from "react-native";
import ScreenWrapper from "../../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../../constant/colors";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";
import CommonButton from "../../../../../components/Buttons/commonButton";
import Global from "../../../../../global";
import Therapies from "./Therapies";
import TherapiesQuestion from "./TherapiesQuestion";
import navigationString from "../../../../../navigation/navigationString";
import * as AsyncStorageUtils from "../../../../../utils/Storage/AsyncStorage";
import {
  filterCategoryData,
  filterglobalCodeOptionsData,
} from "../../../../../helper/getGlobalCodes";
import allActions from "../../../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../../../components/Loader";
import CommonHealthLoader from "../../../../../components/Loader/CommonHealthLoader";
import {
  categoryName,
  codeName,
  fieldType,
} from "../../../../../constant/AllGlobalNameConstant";
import CommonAlert from "../../../../../components/CommonAlert/CommonAlert";
import CommonHeader from "../../../../../components/Header/commonHeader";
import { strings } from "../../../../../constant/strings";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomToast from "../../../../../components/Toast";
import LineSelection from "../../CommonScreen/FieldTypeUI/LineSelection/LineSelection";
import TextAreaInput from "../../CommonScreen/FieldTypeUI/TextAreaInput/TextAreaInput";
import {
  aiProvider,
  discardActivityEnums,
} from "../../../../../constant/appConstant";
import { getItemByCategoryAndCode } from "../../../../Profile/UpdateProfile/MyProfile/PersonalInfo/helper";
import {
  AiResponseTypeEnum,
  EditableType,
  GlobalCategoryName,
  GlobalCodeName,
} from "../../../../../constant/ENUM";
import { API_FUN_NAMES } from "../../../../../constant/APIsFunctionNames";
import logger from "../../../../../constant/logger";

interface Props {
  navigation?: any;
  route?: any;
}
const ReGenerateGoalAI: React.FC<Props> = ({
  navigation,
  route,
}): ReactElement => {
  const {
    from,
    reqData,
    editModal,
    GuIs,
    responseType,
    trackId,
    regenerateQuestionsResponsebyUser,
    editableType,
  } = route?.params;
  const dispatch: any = useDispatch();
  const [index, setIndex] = useState(0);
  const [questionData, setQuestionData] = useState<any>([]);
  const [goalsGlobalCode, setgoalsGlobalCode] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [responseMap, setResponseMap] = useState<any>([]);
  const [isAlert, setIsAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [aiLoader, setAiLoader] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  useEffect(() => {
    if (route?.params?.regenerateQuestionsResponsebyUser === undefined) {
      setResponseMap([]);
    } else {
      setResponseMap(route?.params?.regenerateQuestionsResponsebyUser);
    }
  }, []);
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

  useEffect(() => {
    (async () => {
      const globalCode = await getGlobalCode();

      if (!!regenerateQuestionsResponsebyUser) {
        setResponseMap(regenerateQuestionsResponsebyUser);
        setTimeout(() => {
          regenerateOnboardingDetails(globalCode);
        }, 200);
      }
    })();
  }, [regenerateQuestionsResponsebyUser]);

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
        codeName?.goals
      );
      setgoalsGlobalCode(getGlobalCodeOptionsData?.[0]?.globalCodeId);

      let category, code;
      if (editableType === EditableType?.GOALS) {
        category = GlobalCategoryName?.AIGenerationCategory;
        code = GlobalCodeName?.RegenerateGoals;
      } else if (editableType === EditableType?.ACTIVITIES) {
        category = GlobalCategoryName?.AIGenerationCategory;
        code = GlobalCodeName?.RegenerateActivity;
      } else {
        category = GlobalCategoryName?.AIGenerationCategory;
        code = GlobalCodeName?.Goals;
      }
      const regenerateGoalItem = await getItemByCategoryAndCode(category, code);
      await getRegenerateOnboardingDetails(regenerateGoalItem?.id);

      return getGlobalCodeOptionsData?.[0]?.globalCodeId;
    } catch (error) {
      logger("Error retrieving login user data:", error);
    }
  };

  //To get question before regenrating any thing
  const getRegenerateOnboardingDetails = async (
    getRegenerateOnboardingDetailsId: any
  ) => {
    setisLoading(true);

    let requestbody = {};
    await allActions.OnBoarding.GetRegenerateOnboardingDetails(
      dispatch,
      requestbody,
      API_FUN_NAMES?.getRegenerateOnboardingDetails,
      getRegenerateOnboardingDetailsId
    )
      .then((response: any) => {
        setisLoading(false);
        if (response.statusCode == 200) {
          if (response?.data != null && response?.data.length != 0) {
            setQuestionData(response?.data);
          } else {
            regenerateOnboardingDetails(getRegenerateOnboardingDetailsId);
          }
        } else {
          regenerateOnboardingDetails(getRegenerateOnboardingDetailsId);
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };
  //This API get the resposne from the AI after all questions answer submitted.
  const regenerateOnboardingDetails = async (
    getRegenerateOnboardingDetailsId: any
  ) => {
    setAiLoader(true);
    let requestbody = !editModal
      ? {
          categoryId: getRegenerateOnboardingDetailsId,
          aspNetUserId: null,
          regenerateStepQuesAnswer:
            responseMap.length !== 0
              ? responseMap
              : regenerateQuestionsResponsebyUser,
          linkRequired: false,
          aiProvider: aiProvider?.Goals,
        }
      : {
          categoryId: getRegenerateOnboardingDetailsId,
          regenerateStepQuesAnswer:
            responseMap.length !== 0
              ? responseMap
              : regenerateQuestionsResponsebyUser,
          linkRequired: false,
          aiProvider: aiProvider?.Goals,
          guids: GuIs,
          trackId: trackId,
          parentCategory: discardActivityEnums?.goals, //it should be for like goals activities and wellness plan 1,2,3 something like that
          responseType: route?.params?.GoalsGuid
            ? responseType
            : AiResponseTypeEnum?.activities,
          userScheduledTimeSlot: "",
        };
    try {
      const response: any = !editModal
        ? await allActions.OnBoarding.RegenerateOnboardingDetails(
            dispatch,
            requestbody,
            "regenerateOnboardingDetails"
          )
        : route?.params?.GoalsGuid !== undefined //RegenerateSelectedGoalDetails
        ? await allActions.OnBoarding.RegenerateSelectedGoalDetails(
            dispatch,
            requestbody,
            "RegenerateSelectedGoalDetails__"
          )
        : await allActions.OnBoarding.RegenerateSelectedActivitiesDetails(
            dispatch,
            requestbody,
            "RegenerateSelectedActivitiesDetails"
          );
      setAiLoader(false);

      setAiLoader(false);
      if (response.statusCode == 200) {
        allActions?.dashboardAction?.saveTemporarySlotData(dispatch, []);
        //Clear the temporary slots when user click on start now ,show me more and back button
        navigation?.navigate(navigationString?.GeneratedGoalAI, {
          goalsData: response?.data,
          anserData: responseMap,
          from: from,
          reqData: reqData,
          newString: route?.params?.newString,
          regenerateQuestionsResponsebyUser: responseMap,
        });
      } else {
        setAlertMsg(response?.message);
        setIsAlert(true);
      }
    } catch (err: any) {
      setAiLoader(false);
    }
  };

  const renderComponentUI = (idx: any) => {
    switch (idx) {
      case 0:
        return (
          <Therapies
            questionValue={questionData[0]}
            answerData={(data: any) => resultPush(data)}
            questionIndex={idx}
          />
        );
      case 1:
        return (
          <TherapiesQuestion
            questionValue={questionData[1]}
            answerData={(data: any) => resultPush(data)}
            questionIndex={idx}
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
  const renderComponentUI_ = (idx: any) => {
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
    if (index == questionData?.length - 1) {
      if (
        responseMap[index]?.regenerateStepQusOptionAns?.length > 0 ||
        editModal
      ) {
        regenerateOnboardingDetails(goalsGlobalCode);
      } else {
        setToasterDetails({
          showToast: true,
          Code: 0,
          message: strings?.pleaseSelectOption_orAddYour,
        });
      }
    } else {
      if (
        responseMap[index]?.regenerateStepQusOptionAns?.length > 0 ||
        editModal
      ) {
        setIndex(index + 1);
        Global.GlobalIndex = index + 1;
      } else {
        setToasterDetails({
          showToast: true,
          Code: 0,
          message: strings?.pleaseSelectOption_orAddYour,
        });
      }
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
                  editModal
                    ? `Replace selected ${String(editableType).toLowerCase()}`
                    : strings?.therapies
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
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                extraHeight={150}
              >
                {!editModal
                  ? renderComponentUI(index)
                  : renderComponentUI_(index)}
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
                    regenerateOnboardingDetails(goalsGlobalCode);
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
    </ScreenWrapper>
  );
};

export default ReGenerateGoalAI;
