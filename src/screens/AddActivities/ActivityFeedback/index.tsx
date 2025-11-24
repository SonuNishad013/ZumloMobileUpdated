import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../../constant/colors";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonHeader from "../../../components/Header/commonHeader";
import CommonLoader from "../../../components/Loader";
import Global from "../../../global";
import CommonButton from "../../../components/Buttons/commonButton";
import { strings } from "../../../constant/strings";
import { fieldType } from "../../../constant/AllGlobalNameConstant";
import SliderView from "./SliderView";
import TextInputStretch from "../../../components/OnBoardiingComponents/TextInputStretch";
import {
  renderUpdatedStepOptionsSingle,
  updateAnswerRequest,
} from "../Helper/HelperFun";
import { LotusIcon } from "../../../assets";
import { styles } from "./styles";
import { imagePath } from "../../../assets/png/imagePath";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NewActivityDone from "../NewActivityDone";
import { moderateScale } from "../../../constant/responsiveStyle";
import { convertToMinutes } from "../../../components/Hooks/getMinFromHr";
import navigationString from "../../../navigation/navigationString";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { StackActions } from "@react-navigation/native";
import { event } from "../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import { capitalizeFirstLetter } from "../../../validations/capitalizeFirstLetter";
import { renderUpdatedStepOptions } from "../../../helper/FormHelpers";
import { aiProvider } from "../../../constant/appConstant";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";

interface Props {
  navigation?: any;
  route?: any;
}
const ActivityFeedback: React.FC<Props> = ({ navigation, route }) => {
  const { ActivityDetails, from, purpuse } = route?.params;
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [index, setIndex] = useState<any>(0);
  const [isDone, setIsDone] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    if (ActivityDetails) {
      if (
        route?.params?.purpuse == strings?.Edit ||
        route?.params?.purpuse == strings?.Replace
      ) {
        Call_GetEditableActivityQuestionsByIdAPI(ActivityDetails);
      } else {
        GetFeedbackQuestionsByCategoryID(ActivityDetails);
      }
    }
  }, []);
  const GetFeedbackQuestionsByCategoryID = async (ActivityDetails: any) => {
    setLoading(true);
    try {
      let requestbody = {};
      let params = {
        categoryId: route?.params?.ActivityQuestionsType
          ? route?.params?.ActivityQuestionsType
          : 2,
        activityId: ActivityDetails?.id,
        aiProvider: aiProvider?.ActivityFeedback,
      };
      await allActions.dashboardAction
        .GetActivitiesQuestionsByCategoryIdApi(
          dispatch,
          requestbody,
          API_FUN_NAMES?.GetActivitiesQuestionsByCategoryIdApi,
          params
        )
        .then((response: any) => {
          setLoading(false);
          if (response.statusCode == 200) {
            const filteredQuestions = filterQuestions(
              response?.data,
              convertToMinutes(ActivityDetails.duration)
            );

            setData(filteredQuestions);
          } else {
            setToasterDetails({
              showToast: true,
              code: 0,
              message: response?.message,
            });
          }
        })
        .catch((err) => {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err?.message,
          });
        });
    } catch (error) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
      setLoading(false);
    }
  };

  const Call_GetEditableActivityQuestionsByIdAPI = async (
    ActivityDetails: any
  ) => {
    setLoading(true);
    try {
      let requestbody = {};
      let params = {
        category: route?.params?.ActivityQuestionsType
          ? route?.params?.ActivityQuestionsType
          : 2,
        id: ActivityDetails?.id,
      };
      await allActions.dashboardAction
        .GetEditableActivityQuestionsByIdAPI(
          dispatch,
          requestbody,
          API_FUN_NAMES?.GetEditableActivityQuestionsByIdAPI,
          params
        )
        .then((response: any) => {
          setLoading(false);
          if (response.statusCode == 200) {
            setData(response?.data);
          } else {
            setToasterDetails({
              showToast: true,
              code: 0,
              message: response?.message,
            });
          }
        })
        .catch((err) => {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err?.message,
          });
        });
    } catch (error) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
      setLoading(false);
    }
  };

  function filterQuestions(question: any, duration: any) {
    const convertToMinutes = (duration: any) => {
      if (!duration || isNaN(duration)) return 0; // Handle undefined, null, or invalid values
      return Math.max(parseFloat(duration), 0); // Ensure it's a non-negative number
    };

    const durationInMinutes = convertToMinutes(duration);

    const filteredData: any[] = question?.filter((question: any) => {
      if (
        durationInMinutes > 1 &&
        question.stepName ===
          strings?.How_many_times_did_you_perform_this_activity_today
      ) {
        return false; // Remove this question if duration > 1
      }

      if (
        (durationInMinutes <= 1 || durationInMinutes === 0) &&
        question.stepName === strings?.How_long_did_you_do_this_activity_for
      ) {
        return false; // Remove this question if duration <= 1 or invalid
      }

      return true; // Keep all other questions
    });

    function ensureGapBetweenSliderAndScale(data: any[]) {
      let result = [...data];
      let i = 0;

      while (i < result.length - 1) {
        const current = result[i];
        const next = result[i + 1];

        const isSliderAndScalePair =
          (current.fieldType === "Slider" && next.fieldType === "Scale(1-5)") ||
          (current.fieldType === "Scale(1-5)" && next.fieldType === "Slider");

        if (isSliderAndScalePair) {
          // Find a position to insert `next` where it won't be adjacent to current
          let j = i + 2;
          while (j < result.length) {
            const prev = result[j - 1];
            const curr = result[j];
            if (
              prev.fieldType !== "Slider" &&
              prev.fieldType !== "Scale(1-5)" &&
              curr.fieldType !== "Slider" &&
              curr.fieldType !== "Scale(1-5)"
            ) {
              break;
            }
            j++;
          }

          // Move the next item to position `j`
          const [toMove] = result.splice(i + 1, 1);
          result.splice(j, 0, toMove);

          // Restart the loop since we modified the array
          i = 0;
          continue;
        }

        i++;
      }

      return result;
    }
    //new function re arranging data so that slider and scale are not adjacent
    const re_ArrangedData = ensureGapBetweenSliderAndScale(filteredData);
    return re_ArrangedData;
  }

  const SaveActivitiesFeedbackStepAnswer = async (req: any) => {
    setLoading(true);
    const rawData: any[] = [...data];
    let extractRequireData = rawData.find((obj: any) =>
      obj.hasOwnProperty(strings?.isActivityQuantitativeSpecificQuestion)
    );

    try {
      let requestbody = {
        activityId: ActivityDetails?.id,
        feedbackStepAnswer: req?.renderRequest,
        aiGeneratedQuestions: JSON.stringify(req?.aiGenerateQuestionsResponse),
        isActivityQuantitativeSpecificQuestion:
          extractRequireData?.isActivityQuantitativeSpecificQuestion,
        userTargetValue:
          extractRequireData?.otherAnswer || extractRequireData?.answer,
        aiProvider: aiProvider?.Goals,
      };

      // return;
      await allActions.OnBoarding.SaveActivitiesFeedbackStepAnswer(
        dispatch,
        requestbody,
        "SaveActivitiesFeedbackStepAnswer"
      )
        .then((response: any) => {
          setLoading(false);
          if (response.statusCode == 200) {
            setToasterDetails({
              showToast: true,
              code: 1,
              message: response?.message,
            });
            setIsDone(true);
          } else {
            setToasterDetails({
              showToast: true,
              code: 0,
              message: response?.message,
            });
          }
        })
        .catch((err) => {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err?.message,
          });
        });
    } catch (error) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
      setLoading(false);
    }
  };

  const backFunction = () => {
    if (index > 0) {
      setIndex((prevIndex: any) => {
        const newIndex = prevIndex - 1;
        Global.GlobalIndex = newIndex;

        return newIndex;
      });
    } else {
      navigation?.goBack();
    }
  };

  const nextFunction = async () => {
    const isValid = validateInput(index);
    if (!isValid) return;

    const currentQuestion = data[index];

    // Check if the current question is the issue question
    if (
      currentQuestion.stepName ===
      "Did you encounter any issues or difficulties while completing the activity?"
    ) {
      const selectedOption = currentQuestion.stepOptions.find(
        (option: any) => option.isSelected
      );

      if (selectedOption) {
        if (selectedOption.optionValue === "Yes") {
          setIndex(index + 1);
          Global.GlobalIndex = index + 1;

          return;
        }
        let create_request = await updateAnswerRequest(data);
        SaveActivitiesFeedbackStepAnswer(create_request);
        setIndex(index + 2);
        Global.GlobalIndex = index + 2;
        return;
      }
    }

    if (index === data.length - 1) {
      if (
        route?.params?.purpuse == "Edit" ||
        route?.params?.purpuse == "Replace"
      ) {
      } else {
        let create_request = await updateAnswerRequest(data);

        SaveActivitiesFeedbackStepAnswer(create_request); //uncomment this function for saving user activities feedback response
      }
    } else {
      setIndex(index + 1);
      Global.GlobalIndex = index + 1;
    }
  };

  const validateInput = (currentIndex: number) => {
    const currentQuestion = data[currentIndex];
    let isValid = true;
    return true;
  };

  const handleInputChange = (val: string, idx: number) => {
    const updateAnswer = [...data];
    updateAnswer[idx].otherAnswer = val;
    setData(updateAnswer);
  };
  const onActivityComplete = () => {
    if (from == "WellnessOverview") {
      navigation.dispatch(StackActions.popToTop());
      navigation.navigate(navigationString.Wellbeing, {
        screen: navigationString.WellnessOverview, // The specific screen inside the HomeTab
        params: {
          /* any additional params */
        },
      });

      setIsDone(false);
    } else if (from === "ExplorerActivity") {
      event.emit(strings.login_);

      AsyncStorageUtils.storeItemKey(
        AsyncStorageUtils.ISPLANNER_USER,
        JSON.stringify({
          isPlanner: false,
          isSelected: true,
        })
      );
    } else if (from === "DailyRoutine") {
      navigation.pop(2);
      navigation.navigate(navigationString.DailyRoutine);
      setIsDone(false);
    } else {
      navigation.goBack();
      setIsDone(false);
    }
  };
  const renderComponentUI = (idx: any) => {
    let type = data[idx]?.fieldType;
    let gotPurpuse = route?.params?.purpuse;

    switch (type) {
      case fieldType?.singleSelect:
        return (
          <FlatList
            keyExtractor={(item, index) => "key" + index}
            data={gotPurpuse ? data[idx]?.options : data[idx]?.stepOptions}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setData(renderUpdatedStepOptionsSingle(idx, index, data));
                }}
              >
                <View
                  style={[
                    styles.optionBox,
                    item?.isSelected && styles.optionBoxSelected,
                  ]}
                >
                  <Text style={styles.optionValue}>
                    {capitalizeFirstLetter(
                      gotPurpuse ? item : item?.optionValue
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        );
      case fieldType?.slider:
        if (
          data[idx].hasOwnProperty(
            strings?.isActivityQuantitativeSpecificQuestion
          )
        ) {
          if (data[idx]?.isActivityQuantitativeSpecificQuestion) {
            //we will render slider according to the terget value and unit .
            if (isNaN(parseInt(data[idx]?.targetValue, 10))) {
              return (
                <TextInputStretch
                  newSpecInputView={styles.textInputStretch}
                  value={data[idx]?.otherAnswer}
                  onChangeText={(val: any) => handleInputChange(val, idx)}
                  newSpecInput={styles.newSpecInput}
                />
              );
            } else {
              return (
                <View style={styles.sliderView}>
                  <SliderView
                    minShow
                    onValueChange={(val: any) => {
                      let normalValue = Number.parseFloat(val).toFixed(0);
                      handleInputChange(normalValue.toString(), idx);
                    }}
                    isMaxVal
                    progress={data[idx]?.otherAnswer}
                    maxVal={parseInt(data[idx]?.targetValue, 10) || 5}
                    unit={data[idx]?.unit}
                  />
                </View>
              );
            }
          } else {
            // we will render the text area here
            return (
              <TextInputStretch
                newSpecInputView={styles.textInputStretch}
                value={data[idx]?.otherAnswer}
                onChangeText={(val: any) => handleInputChange(val, idx)}
                newSpecInput={styles.newSpecInput}
              />
            );
          }
        }
        return (
          <View style={styles.sliderView}>
            <SliderView
              minShow
              onValueChange={(val: any) => {
                let normalValue = Number.parseFloat(val).toFixed(0);
                handleInputChange(normalValue.toString(), idx);
              }}
              isMaxVal
              progress={data[idx]?.otherAnswer}
              maxVal={convertToMinutes(ActivityDetails?.duration)}
            />
          </View>
        );
      case fieldType?.scale5:
        return (
          <View style={styles.sliderView}>
            <SliderView
              minShow
              onValueChange={(val: any) => {
                let normalValue = Number.parseFloat(val).toFixed(0);
                handleInputChange(normalValue.toString(), idx);
              }}
              isMaxVal
              maxVal={5}
              usedInActivityFeedback={true}
              progress={data[idx]?.otherAnswer}
            />
          </View>
        );
      case fieldType?.textArea:
        return (
          <TextInputStretch
            newSpecInputView={styles.textInputStretch}
            value={data[idx]?.otherAnswer}
            onChangeText={(val: any) => handleInputChange(val, idx)}
            newSpecInput={styles.newSpecInput}
          />
        );
      case fieldType?.multiSelect:
        return (
          <FlatList
            keyExtractor={(item, index) => "key" + index}
            data={data[idx]?.stepOptions}
            renderItem={({ item, index }: any) => {
              return (
                <>
                  {item?.optionValue !== "Other" && (
                    <TouchableOpacity
                      style={{ margin: moderateScale(10) }}
                      onPress={() => {
                        setData(
                          renderUpdatedStepOptions(
                            idx,
                            index,
                            data,
                            item?.optionValue
                          )
                        );
                      }}
                    >
                      <View
                        style={[
                          styles.optionBox,
                          item?.isSelected && styles.optionBoxSelected,
                        ]}
                      >
                        <Text style={styles.optionValue}>
                          {capitalizeFirstLetter(item?.optionValue)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </>
              );
            }}
          />
        );

      default:
        return (
          <View>
            <Text>UI Not Found</Text>
          </View>
        );
    }
  };

  return (
    <ScreenWrapper
      statusBarColor={isDone ? colors?.darkthemColor : colors?.pbRGB}
    >
      <ImageBackground
        source={
          isDone ? imagePath?.FeedbackDone : imagePath?.ActivityFeedbackBg
        }
        style={styles?.bgImage}
      >
        {!loading ? (
          <>
            {isDone ? (
              <NewActivityDone
                onPress={() => onActivityComplete()}
                from={from}
              />
            ) : (
              <>
                <CommonHeader
                  headerName="Activity Feedback"
                  onBackPress={backFunction}
                  mainContainer={styles.headerContainer}
                  iconContainer={styles.iconContainer}
                />
                <KeyboardAwareScrollView
                  showsVerticalScrollIndicator={false}
                  style={styles.scrollView}
                  contentContainerStyle={{
                    paddingBottom: moderateScale(40),
                  }}
                >
                  <View style={styles.container}>
                    <LotusIcon />
                  </View>
                  <Text style={styles.questionText}>
                    {[strings?.Edit, strings?.Replace].includes(purpuse)
                      ? data[index]?.question
                      : data[index]?.stepDescription ?? data[index]?.stepName}
                  </Text>
                  {renderComponentUI(index)}
                  <CommonButton
                    onPress={nextFunction}
                    btnName={
                      index === data.length - 1
                        ? strings?.submit
                        : strings?.NEXT
                    }
                    mainContainer={styles.commonButtonContainer}
                  />
                </KeyboardAwareScrollView>
              </>
            )}
          </>
        ) : (
          <CommonLoader />
        )}
      </ImageBackground>
      {toasterDetails?.showToaster && (
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
export default ActivityFeedback;
