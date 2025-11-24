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
import * as AsyncStorageUtils from "../../../../../utils/Storage/AsyncStorage";
import {
  filterCategoryData,
  filterglobalCodeOptionsData,
} from "../../../../../helper/getGlobalCodes";
import allActions from "../../../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../../../components/Loader";
import CommonHealthLoader from "../../../../../components/Loader/CommonHealthLoader";
import CommonHeader from "../../../../../components/Header/commonHeader";
import navigationString from "../../../../../navigation/navigationString";
import CommonAlert from "../../../../../components/CommonAlert/CommonAlert";
import LineSelection from "../../CommonScreen/FieldTypeUI/LineSelection/LineSelection";
import TextAreaInput from "../../CommonScreen/FieldTypeUI/TextAreaInput/TextAreaInput";
import {
  categoryName,
  codeName,
  fieldType,
} from "../../../../../constant/AllGlobalNameConstant";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { strings } from "../../../../../constant/strings";
import CustomToast from "../../../../../components/Toast";
import { aiProvider } from "../../../../../constant/appConstant";

interface Props {
  navigation?: any;
  route?: any;
}
const ReGenerateActivitesAI: React.FC<Props> = ({
  navigation,
  route,
}): ReactElement => {
  const {
    from,
    reqData,
    GuIs,
    filterSelected,
    editModal,
    trackId,
    responseType,
  } = route?.params;
  const dispatch: any = useDispatch();
  const [index, setIndex] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [responseMap, setResponseMap] = useState<any>([]);
  const [activitiesGlobalCode, setActivitiesGlobalCode] = useState<any>(0);
  const [questionData, setQuestionData] = useState<any>([]);
  const [isAlert, setIsAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [aiLoader, setAiLoader] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  console.log("from, reqData ===>", from, reqData);

  useEffect(() => {
    getGlobalCode();
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
        codeName?.activities
      );
      setActivitiesGlobalCode(getGlobalCodeOptionsData?.[0]?.globalCodeId);
      await getRegenerateOnboardingDetails(
        getGlobalCodeOptionsData?.[0]?.globalCodeId
      );
    } catch (error) {
      console.error("Error retrieving login user data:", error);
    }
  };
  const getRegenerateOnboardingDetails = async (
    getRegenerateOnboardingDetailsId: any
  ) => {
    setisLoading(true);

    let requestbody = {};
    await allActions.OnBoarding.GetRegenerateOnboardingDetails(
      dispatch,
      requestbody,
      "getRegenerateOnboardingDetails",
      // getRegenerateOnboardingDetailsId
      // 547
      editModal ? 547 : getRegenerateOnboardingDetailsId
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

  const regenerateOnboardingDetails = async (activitiesGlobalCode: any) => {
    setAiLoader(true);

    let requestbody = !editModal
      ? {
          categoryId: activitiesGlobalCode,
          aspNetUserId: null,
          regenerateStepQuesAnswer: responseMap,
          linkRequired: false,
          aiProvider: aiProvider?.Goals,
        }
      : {
          categoryId: activitiesGlobalCode,
          regenerateStepQuesAnswer: responseMap,
          linkRequired: false,
          aiProvider: aiProvider?.Goals,
          guids: GuIs,
          trackId: trackId,
          parentCategory: 2,
          responseType: responseType,
          userScheduledTimeSlot: "",
        };
    try {
      const response: any = !editModal
        ? await allActions.OnBoarding.RegenerateOnboardingDetails(
            dispatch,
            requestbody,
            "regenerateOnboardingDetails"
          )
        : await allActions.OnBoarding.RegenerateSelectedActivitiesDetails(
            dispatch,
            requestbody,
            "RegenerateSelectedActivitiesDetails"
          ); ///api/v1/Activities/RegenerateSelectedActivitiesDetails
      setAiLoader(false);
      console.log("requestbody_requestbody", requestbody);
      console.log("requestbody_response", response);
      if (response.statusCode == 200) {
        allActions?.dashboardAction?.saveTemporarySlotData(dispatch, []);
        // console.log("RegenerateSelectedActivitiesDetails", response);
        navigation?.navigate(navigationString?.GeneratedActivitiesAI, {
          activitesData: response?.data,
          anserData: responseMap,
          from: from,
          reqData: reqData,
          newString: route?.params?.newString,
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

  const onPressNext = () => {
    if (index == questionData?.length - 1) {
      // if (responseMap[index]?.regenerateStepQusOptionAns?.length > 0) {
      //   regenerateOnboardingDetails(activitiesGlobalCode);
      // } else {
      //   setToasterDetails({
      //     showToast: true,
      //     code: 0,
      //     message: strings?.pleaseSelectOption_orAddYour,
      //   });
      // }
      if (responseMap[index]?.regenerateStepQusOptionAns?.length > 0) {
        regenerateOnboardingDetails(activitiesGlobalCode);
      } else {
        if (questionData[index]?.fieldType == fieldType?.textArea) {
          regenerateOnboardingDetails(activitiesGlobalCode);
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
                    : "Replace activity"
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
                    regenerateOnboardingDetails(activitiesGlobalCode);
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

export default ReGenerateActivitesAI;
