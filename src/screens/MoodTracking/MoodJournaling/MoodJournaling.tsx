import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import CommonInput from "../../../components/Inputs/commonInput";
import { strings } from "../../../constant/strings";
import CommonButton from "../../../components/Buttons/commonButton";
import allActions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CommonLoader from "../../../components/Loader";
import { fieldType } from "../../../constant/AllGlobalNameConstant";
import { TitleRegex } from "../../../validations/validation";
import { styles } from "./styles";
import navigationString from "../../../navigation/navigationString";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { event } from "../../../navigation/emitter";
import {
  getBuySubscriptionDetail,
  getSeekerInfoRedux,
} from "../../../redux/selector";
import { subscriptionFun } from "../../../constant/SubscriptionPlanValidation";
import {
  Enum_QuestionSourceType,
  SUBSCRIPTION_NAVIGATION_FROM,
} from "../../../constant/ENUM";
import UpgradeModal from "../../SubscriptionPlan/UpgradeModal";
import { IAP_Strings } from "../../SubscriptionPlan/IAP_Strings";
import logger from "../../../constant/logger";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import {
  aiProvider,
  STATUS_CODES,
  TOAST_STATUS,
} from "../../../constant/appConstant";
var subscriptionStatus: any = false;
interface Props {
  navigation?: any;
  route?: any;
}

const MoodJournaling: React.FC<Props> = ({ navigation, route }) => {
  const subscriptionDetail = useSelector(getBuySubscriptionDetail());
  const getseekerInfoRedux = useSelector(getSeekerInfoRedux());
  const { from, ActivityDetails } = route?.params ?? null;
  const { DeviceID } = route?.params?.socketDetails;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    titleError: false,
    descriptionError: false,
    titleErrorText: "",
    descriptionErrorText: "",
  });

  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const init = async () => {
      subscriptionStatus = await subscriptionFun(
        subscriptionDetail,
        getseekerInfoRedux
      );
    };
    init();
  }, [subscriptionDetail]);

  useEffect(() => {
    getMoodJournalingQuestion();
  }, []);
  const getMoodJournalingQuestion = () => {
    setIsLoading(true);

    const requestbody = {};
    allActions.dashboardAction
      .GetMoodJournalingQuestion(
        dispatch,
        requestbody,
        API_FUN_NAMES?.getMoodJournalingQuestion
      )
      .then((response: any) => {
        setIsLoading(false);
        if (response.statusCode === 200) {
          setQuestions(response.data);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: err?.message,
        });
      });
  };

  const getMoodJournalingStepId = (questions: any) => {
    const findQuestion = questions?.find((item: any) => item?.parentId === 0);
    return findQuestion?.moodTrackingStepId;
  };

  const saveMoodJournalingQuestion_ = async () => {
    setIsLoading(true);
    try {
      const requestbody = {
        moodJournalingStepId: getMoodJournalingStepId(questions),
        title: inputData?.title,
        description: inputData?.description,
        deviceId: DeviceID,
      };
      allActions.dashboardAction
        .SaveMoodJournalingQuestion(
          dispatch,
          requestbody,
          API_FUN_NAMES?.saveMoodJournalingQuestion
        )
        .then((response: any) => {
          setIsLoading(false);
          if (response.statusCode === 200) {
            if (from == "Activity") {
              saveActivityDetails(ActivityDetails);
            } else {
              navigation?.navigate(navigationString?.TrackHistory, {
                type: strings?.moodJournaling_,
                other: route?.params,
              });
            }
            const data = {
              DeviceID: DeviceID,
              isMoodJournaling: false,
              requestBody: response?.data?.aiRequest,
            };
          } else {
            setToasterDetails({
              showToast: true,
              code: 0,
              message: "Something went wrong!",
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err.message,
          });
        });
    } catch (error) {
      setIsLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
    }
  };

  const saveMoodJournalingQuestion = async () => {
    setIsLoading(true);
    try {
      const requestbody = {
        moodJournalingStepId: getMoodJournalingStepId(questions),
        title: inputData?.title,
        description: inputData?.description,
        deviceId: DeviceID,
        aiProvider: aiProvider?.MoodJournaling,
        questionSourceType: Enum_QuestionSourceType?.Manual,
      };

      allActions.dashboardAction
        .SaveMoodJournalingQuestion(
          dispatch,
          requestbody,
          API_FUN_NAMES?.saveMoodJournalingQuestion
        )
        .then((response: any) => {
          setIsLoading(false);
          if (response.statusCode === STATUS_CODES?.RESPONSE_OK) {
            navigation?.navigate(navigationString?.JournalStepFour, {
              isFrom: "Home",
            });
            setToasterDetails({
              showToast: true,
              code: TOAST_STATUS?.SUCCESS,
              message: response?.message,
            });
          } else {
            setToasterDetails({
              showToast: true,
              code: TOAST_STATUS?.ERROR,
              message: strings?.somethingWrong,
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err.message,
          });
        });
    } catch (error) {
      setIsLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
    }
  };

  const saveActivityDetails = async (ActivityDetails: any) => {
    let payload = {
      activityId: ActivityDetails.id,
      activityHistoryType: 3,
      formName: 95,
      formKeyId: 393,
      aiProvider: aiProvider?.Goals,
    };

    try {
      // Dispatch the action or call the API
      let resp = await allActions.OnBoarding.SaveActivityHistoryDetail(
        dispatch,
        payload,
        API_FUN_NAMES?.SaveActivityHistoryDetail
      );
      if (resp.statusCode == 200) {
        navigation?.navigate(navigationString?.TrackHistory, {
          type: strings?.moodJournaling_,
          // other: route?.params,
          other:
            from == "Activity"
              ? { from: "Activity", mainTab: route?.params?.other?.mainTab }
              : route?.params,
        });
      }
    } catch (error) {
      logger("Error saving activity history", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateInputs = () => {
    let isValid = true;
    let updatedData = { ...inputData };

    if (inputData?.title.trim() === "") {
      updatedData.titleError = true;
      updatedData.titleErrorText = strings?.titleRequired;
      isValid = false;
    } else {
      updatedData.titleError = false;
      updatedData.titleErrorText = "";
    }

    if (inputData?.description.trim() === "") {
      updatedData.descriptionError = true;
      updatedData.descriptionErrorText = strings?.descriptionRequired;
      isValid = false;
    } else {
      updatedData.descriptionError = false;
      updatedData.descriptionErrorText = "";
    }
    setInputData(updatedData);
    return isValid;
  };

  const handleSubmit = () => {
    saveMoodJournalingQuestion();
  };

  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <CommonHeader
        headerName={strings?.moodJournaling}
        mainContainer={styles.mainContainer}
        iconContainer={styles.iconContainer}
        onBackPress={() => navigation?.goBack()}
        isSeeAll
        onViewHistory={() => {
          navigation.navigate(navigationString.TrackHistory, {
            isGoback: true,
            type: strings?.moodJournaling_,
            other:
              from == "Activity"
                ? { from: "Activity", mainTab: route?.params?.other?.mainTab }
                : route?.params, //coming from normal tabs mood journaling icon click then this will go forward in this we have "from" props
            isViewHistoryClicked: true,
          });
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
        style={styles?.keyBoard}
      >
        {!isLoading && (
          <>
            <FlatList
              data={questions}
              keyExtractor={(item, index) => "key" + index}
              renderItem={({ item, index }: any) => (
                <>
                  {[fieldType?.textBox].includes(item?.fieldType) && (
                    <CommonInput
                      placeholderTextColor={colors?.SurfCrest}
                      placeholder={strings?.title}
                      isWidth={false}
                      mainContainer={styles.inputContainer}
                      value={inputData?.title}
                      onChangeText={(val: string) => {
                        if (TitleRegex(val)) {
                          setInputData({
                            ...inputData,
                            title: val,
                            titleError: false,
                          });
                        }
                      }}
                      backGroundColor={colors?.prussianBlue}
                      inputText={{ color: colors?.SurfCrest }}
                      borderColor={
                        inputData.titleError
                          ? colors?.royalOrangeDark
                          : colors?.SurfCrest
                      }
                      isError={inputData.titleError}
                      errorMsg={inputData.titleErrorText}
                    />
                  )}

                  {[fieldType?.textArea].includes(item?.fieldType) && (
                    <>
                      <CommonInput
                        placeholderTextColor={colors?.SurfCrest}
                        placeholder={strings.Wearehere}
                        textAlignVertical={"top"}
                        multiline
                        isWidth={false}
                        mainContainer={styles.textAreaContainer}
                        inputText={styles?.inputText}
                        value={inputData?.description}
                        onChangeText={(val: string) => {
                          setInputData({
                            ...inputData,
                            description: val,
                            descriptionError: false,
                          });
                        }}
                        backGroundColor={colors?.prussianBlue}
                        borderColor={
                          inputData.descriptionError
                            ? colors?.royalOrangeDark
                            : colors?.SurfCrest
                        }
                        isError={inputData.descriptionError}
                        errorMsg={inputData.descriptionErrorText}
                      />
                    </>
                  )}
                </>
              )}
            />
            <CommonButton
              mainContainer={styles.buttonContainer}
              btnName={strings?.submit}
              onPress={handleSubmit}
            />
          </>
        )}
      </KeyboardAwareScrollView>
      {isLoading && <CommonLoader />}
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}

      <UpgradeModal
        navigation={navigation}
        visible={showModal}
        setShowModal={setShowModal}
        fromScreen={SUBSCRIPTION_NAVIGATION_FROM?.DASHBOARD}
        isPlanner={false}
        title={IAP_Strings?.mood_journal_title}
        description={IAP_Strings?.mood_journal_title}
      />
    </ScreenWrapper>
  );
};

export default MoodJournaling;
