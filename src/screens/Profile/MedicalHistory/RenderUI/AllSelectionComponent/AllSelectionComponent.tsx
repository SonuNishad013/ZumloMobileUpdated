import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, width } from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";
import { imagePath } from "../../../../../assets/png/imagePath";
import CommonButton from "../../../../../components/Buttons/commonButton";
import { strings } from "../../../../../constant/strings";
import TextInputStretch from "../../../../../components/OnBoardiingComponents/TextInputStretch";
import { validateName } from "../../../../../validations/validation";
import { fieldType } from "../../../../../constant/AllGlobalNameConstant";
import { removedMedicalHistorySubHeading } from "../../../../../constant/ProfileConstant";
import MainHeading from "../../../Preferences/MainHeading";
import LineHeading from "../../../Preferences/LineHeading";
import {
  renderUpdatedStepOptions,
  renderUpdatedStepOptionsSingle,
  updateAnswerRequest,
  UpdatedStepOtherShow,
} from "../../Helpers/HelperFun";
import BoxButtonIcon from "../../../../../components/OnBoardiingComponents/BoxButtonIcon";
import RightCircleButton from "../../../../../components/Buttons/RightCircleButton";
import DatePickerInput from "../../../../../components/DatePicker/DatePickerInput";
import CommonSheetDroppDown from "../../../../../components/CommonDropDown/CommonSheetDroppDown";
import ItemSelectedLine from "../../../../../components/OnBoardiingComponents/ItemSelectedLine";
import AddButton from "../../../../OnBoarding/WellnessPlan/ReGenerateWellnessPlan/AddButton";
import DaySlider from "../../../../../components/Sliders/DaySlider";
import { ItemSelectedPropsCircle } from "../../../../../components/OnBoardiingComponents/ItemSelectedPropsCircle";
import CircleIconText from "../../../../../components/OnBoardiingComponents/CircleIconText";
import IconTextButtonWidthDynamic from "../../../../../components/OnBoardiingComponents/IconTextButtonWidthDynamic";
import ScaleItem from "../../../../../components/Scales/ScaleComponent";
import { styles } from "./styles";
import FrequencyArea from "../../../../../components/FrequencySelector/Frequency";
import DashedSlider from "../../../../../components/Sliders/DashedSlider";
import LineSeclectionButton from "../../../../../components/OnBoardiingComponents/LineSeclectionButton";
import TraitsSlider from "../../../../../components/Sliders/TraitsSlider";
import DescendingAscending from "../../../../../components/Scales/DescendingAscending";
import LevelScale from "../../../../../components/Scales/LevelScale";
import MoodWithSlider from "../../../../../components/AwesonmeCustomSlider/MoodWithSlider";
import FrequencyScale from "../../../../../components/FrequencySelector/FrequencyScale";
import { MM_DD_YYY } from "../../../../../constant/dateFormatConstants";
import moment from "moment";
import FrequencyCurve from "../../../../../components/FrequencySelector/FrequencyCurve";
import { formatSentenceCase } from "../../../../../helper/sentenceCase";
import { checkSelectedIf } from "../../../../../helper/FormHelpers";
import logger from "../../../../../constant/logger";
import { textLabelSize } from "../../../../../utils/TextConfig";
interface Props {
  questions?: any;
  updatedAnswer?: any;
  isLoading?: any;
}
export const validateQuestionData = (data: any[]) => {
  return true;
  for (let question of data) {
    const hasOptions =
      Array.isArray(question.stepOptions) && question.stepOptions.length > 0;

    if (hasOptions) {
      // 1.1 Get selected options
      const selectedOptions: any[] = question.stepOptions.filter(
        (opt: any) => opt?.isSelected
      );
      if (selectedOptions?.length < 1) {
        Alert.alert(
          "Missing selecteion",
          "You have missed some question options."
        );
        return false;
      }
      // 1.2 Check if "Add Your Specifications" is selected
      const isOtherSelected = selectedOptions.some(
        (opt: any) => opt?.optionValue === "Add Your Specifications"
      );

      if (isOtherSelected) {
        // 1.2.1 If otherAnswer is missing or empty
        if (!question.otherAnswer || question.otherAnswer.trim() === "") {
          Alert.alert(
            "Missing Other Answer",
            `You selected "Add Your Specifications" for: "${question.stepName}", but didn't fill the other answer.`
          );
          return false;
        }
      }

      // 1.3 Success if passed above conditions (can be optional unless full success report needed)
      console.log(`✅ Validated step with options: "${question.stepName}"`);
    } else {
      // 2. No options, validate answer and otherAnswer
      const hasAnswer = !!question.answer?.trim();
      const hasOtherAnswer = !!question.otherAnswer?.trim();

      if (!hasAnswer && !hasOtherAnswer) {
        Alert.alert(
          "Missing Answer",
          `You have not filled any answer for: "${question.stepName}".`
        );
        return false;
      }

      // 2.2 Success if either field is filled
      console.log(`✅ Validated step without options: "${question.stepName}"`);
    }
  }

  // All validations passed
  // Alert.alert("Success", "All questions are properly answered.");
  return true;
};
const AllSelectionComponent: React.FC<Props> = ({
  questions,
  updatedAnswer,
  isLoading,
}) => {
  const [data, setData] = useState<any>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [distance, setDistance] = useState<any>(0);
  useEffect(() => {
    if (questions !== data) {
      logger("label_changes_LineTextHeaderAndSubHeader______", {
        questions: questions[0]?.categoryName,
        QuestionList: questions?.map((item: any) => item?.stepName),
      });
      setData(questions);
    }
  }, [questions]);
  const handleInputChange = (val: string, idx: number) => {
    const updateAnswer = [...data];
    updateAnswer[idx].otherAnswer = val;
    setData(updateAnswer);
  };
  const handleAddSpecifications = (idx: number, data: any) => {
    let changesData = [...data];
    const addSpecIndex = changesData[idx]?.stepOptions.findIndex(
      (option: any) => option?.optionValue === strings?.addSpecifications
    );
    if (addSpecIndex !== -1) {
      setData(UpdatedStepOtherShow(idx, addSpecIndex, changesData));
    }
  };
  const transformedData = (data: any) => {
    return data.map((item: any) => ({
      id: item?.id,
      stepId: item?.stepId,
      optionOrder: item?.optionOrder,
      title: item?.optionValue,
      optionValue: item?.optionValue,
      value: item?.optionValue,
    }));
  };

  const getMainHeaderByCategoryName = (categoryName: string) => {
    logger("categoryName_____", categoryName);
    switch (categoryName) {
      //--------------Physical Health's Personal Section--------------------//
      case "Allergies":
        return {
          mainHeader: "Allergy Info",
          subHeader:
            "Sharing allergies helps us better personalize your care. Only add what you're comfortable with.",
          CTAButton: "Save my info",
        };
      case "Medical Conditions":
        return {
          mainHeader: "Medical Conditions",
          subHeader:
            "Let us know about any chronic conditions—only if you’re comfortable sharing.",
          CTAButton: "Save my info",
        };
      case "Recent Medical Visits":
        return {
          mainHeader: "",
          subHeader:
            "Track any doctor or clinic visits—sharing this helps us support you better.",
          CTAButton: "Save my info",
        };
      case "Past Hospitalizations":
        return {
          mainHeader: "",
          subHeader:
            "Add any hospital stays that might help us better understand your care history. Optional, and fully private.",
          CTAButton: "Save my info",
        };
      //--------------Physical Health's Personal Section--------------------//
      //--------------Physical Health's Family medical histor Section start--------------------//
      case "Family Medical History":
        return {
          mainHeader: "",
          subHeader:
            "You can share what feels relevant—everything here stays private",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      //--------------Physical Health's Family medical histor Section end--------------------//
      //--------------Menatl Health's Personal Mental health Section start--------------------//
      case "Personal Mental Health History":
        return {
          mainHeader: "Your mental health background",
          subHeader:
            "Your experiences matter—feel free to include what you’re comfortable sharing.",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };

      case "Family Mental Health History":
        return {
          mainHeader: "Family's Mental Wellness",
          subHeader:
            "Some mental health conditions can run in families. Knowing this helps us tailor support that actually fits you. (Only share what feels right—this is your space.) ",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      case "Current Medications":
        return {
          mainHeader: "",
          subHeader:
            "Track your current prescriptions so we can support you better. Optional, and kept private.",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      case "Medication Allergies or Side Effects":
        return {
          mainHeader: "",
          subHeader:
            "Let us know if you’ve had any allergic reactions or unwanted effects. It helps us personalize your care.",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      case "Past Medications":
        return {
          mainHeader: "",
          subHeader:
            "Record any medications you’ve used in the past—this helps us understand what worked and what didn’t.",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      case "Current Counseling":
        return {
          mainHeader: "",
          subHeader:
            "Log any ongoing therapy or counseling you're receiving—it helps us understand how you’re being supported.",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      case "Counseling History":
        return {
          mainHeader: "",
          subHeader:
            "Log any therapy you’ve tried in the past—only what feels relevant to share.",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      case "Emotional Well-Being":
        return {
          mainHeader: "",
          subHeader:
            "Gently check in on your emotional strengths—no pressure, just perspective.",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      case "Additional Associated Fields for Context":
        return {
          mainHeader: "Additional context on stress ",
          subHeader: "",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      case "":
        return {
          mainHeader: "",
          subHeader: "",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      case "Coping Mechanism":
        return {
          mainHeader: "",
          subHeader:
            "How do you usually cope with stress or tough moments? No judgment—just insight to better support you.",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      case "Thought Processes":
        return {
          mainHeader: "",
          subHeader:
            "Reflect on how your mind works—this helps us understand your thinking patterns more clearly.",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      case "Mood Patterns":
        return {
          mainHeader: "",
          subHeader:
            "Understand how your mood shifts and what supports you best—just share what feels helpful.",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      case "Personality Traits":
        return {
          mainHeader: "",
          subHeader:
            "There’s no right or wrong—just a better way to understand how you move through the world.",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      case "Behavioral Patterns":
        return {
          mainHeader: "",
          subHeader:
            "Reflect on your habits and what tends to trigger certain behaviors. This helps us understand what supports you best. ",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      case "":
        return {
          mainHeader: "",
          subHeader: "",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };

      case "":
        return {
          mainHeader: "",
          subHeader: "",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      case "":
        return {
          mainHeader: "",
          subHeader: "",
          CTAButton: "Save my info",
          AddOtherCTA: "",
        };
      default:
        return null;
    }
  };
  const getLineHeaderByStepName = (stepName: string, itemsData?: any) => {
    logger("lineText__________", { stepName, itemsData });
    switch (stepName) {
      //--------------Physical Health's Personal Section start --------------------//
      case "Allergy Severity":
        return {
          textAboveLine: "How severe is your reaction?",
          CTAForOther: "",
        };
      case "Chronic Conditions":
        return {
          textAboveLine: "What condition did they experience?",
          CTAForOther: "Add another condition",
        };
      case "Date":
        return {
          textAboveLine: "",
          CTAForOther: "Select date of visit",
        };
      //--------------Physical Health's Personal Section end--------------------//
      //--------------Physical Health's Family medical histor Section start--------------------//
      case "Family Member":
        return {
          textAboveLine: "Who is this about?",
          CTAForOther: "Add another ",
        };
      case "Medical condition in family member.":
        return {
          textAboveLine: "What condition did they experience?",
          CTAForOther: "Add another condition",
        };
      case "Reason for Visit":
        return {
          textAboveLine: "",
          CTAForOther: "Add your own reason",
        };
      //--------------Physical Health's Family medical histor Section end--------------------//
      //--------------Mental Health's FPersonal Mental histor Section start--------------------//

      case "Existing Diagnosis":
        return {
          textAboveLine:
            "Diagnoses you've experienced (Select all that apply):",
          CTAForOther: "Something else",
        };
      case "Date of Diagnosis":
        return {
          textAboveLine: "When was your diagnosis?",
          CTAForOther: "",
        };
      case "Recent Health Assessments":
        return {
          textAboveLine: "Recent evaluations",
          CTAForOther: "",
        };
      case "Anxiety Levels":
        return {
          textAboveLine:
            "Anxiety Levels\n(1 = calm & centered, 10 = highly anxious)",
          CTAForOther: "",
        };
      case "Stress Levels":
        return {
          textAboveLine:
            "Stress Levels\n(1 = relaxed, 10 = constant stress or burnout)",
          CTAForOther: "",
        };
      case "Emotional Resilience":
        return {
          textAboveLine:
            "Emotional resilience\n(1 = very fragile, 10 = highly adaptable)",
          CTAForOther: "",
        };
      case "Self-awareness":
        return {
          textAboveLine:
            "Self-awareness\n(1 = little awareness, 10 = deeply aware)",
          CTAForOther: "",
        };
      case "Empathy":
        return {
          textAboveLine:
            "Empathy\n(1 = disconnected, 10 = highly compassionate)",
          CTAForOther: "",
        };
      case "Other Mental Health Conditions":
        return {
          textAboveLine: "Anything else you’d like to share? ",
          CTAForOther: "",
        };
      case "Depression Symptoms":
        return {
          textAboveLine: "Have you experienced any of the following recently?",
          CTAForOther: "Add another symptom",
        };
      case "Mood":
        return {
          textAboveLine:
            "Mood Check-in\nHow would you describe your mood today?",
          CTAForOther: "",
        };
      case "Thought Processes":
        return {
          textAboveLine: "Describe how your thoughts tend to flow ?",
          CTAForOther: "",
        };
      case "Focus Levels":
        return {
          textAboveLine:
            "How would you rate your focus lately?\n1 = Easily distracted\n10 = Highly focused and steady ",
          CTAForOther: "",
        };
      case "Cognitive Distortions":
        return {
          textAboveLine: "Have you noticed any of these thinking patterns?",
          CTAForOther: "Add your own ",
        };
      case "Frequency":
        return {
          textAboveLine:
            itemsData?.categoryName === "Current Counseling"
              ? "How often do you attend sessions?"
              : "Frequency",
          CTAForOther: "",
        };
      case "Type of Therapy":
        return {
          textAboveLine: "",
          CTAForOther: "Add your own",
        };
      case "Any Progress":
        return {
          textAboveLine: "Any progress or changes you've noticed?",
          CTAForOther: "",
        };
      case "":
        return {
          textAboveLine: "",
          CTAForOther: "",
        };
      case "Therapist Name":
        return {
          textAboveLine: "Provider's name",
          CTAForOther: "",
        };
      case "":
        return {
          textAboveLine: "",
          CTAForOther: "",
        };
      case "Positive Coping Strategies":
        return {
          textAboveLine: "What helps you feel better? ",
          CTAForOther: "Add your own",
        };
      case "Negative Coping Strategies":
        return {
          textAboveLine: "What might not be serving you?",
          CTAForOther: "Add your own",
        };
      case "Specific Stressor Details":
        return {
          textAboveLine: "What specific situations tend to cause stress?",
          CTAForOther: "",
        };
      case "Frequency of Stress":
        return {
          textAboveLine: "How often do you experience stress?",
          CTAForOther: "",
        };
      case "Impact of Stress":
        return {
          textAboveLine: "How does stress tend to affect you? ",
          CTAForOther: "",
        };
      case "Effectiveness of Stress Management Techniques":
        return {
          textAboveLine: "How well do your current strategies work for you?",
          CTAForOther: "",
        };
      case "Typical Mood Fluctuations":
        return {
          textAboveLine: "How do your moods usually shift or cycle? ",
          CTAForOther: "",
        };
      case "Mood Triggers":
        return {
          textAboveLine: "What tends to affect your mood?",
          CTAForOther: "",
        };
      case "Mood Management Techniques":
        return {
          textAboveLine: "What tends to affect your mood?",
          CTAForOther: "",
        };

      case "Introvert vs. Extrovert":
        return {
          textAboveLine: "Where do you tend to draw your energy from?",
          CTAForOther: "",
        };
      case "Sensitivity to Criticism":
        return {
          textAboveLine:
            "How strongly do you react to feedback or criticism?\n1 = I stay unaffected\n10 = I take it very personally",
          CTAForOther: "",
        };
      case "Resilience and Adaptability":
        return {
          textAboveLine:
            "How easily do you adjust when things don’t go as planned?\n1 = I struggle to adapt\n10 = I adjust quickly and move on",
          CTAForOther: "",
        };
      case "Preference for Structured vs. Unstructured Activities":
        return {
          textAboveLine:
            "Do you prefer structured routines or more flexible, spontaneous days?\n1 = I thrive on structure\n10 = I prefer going with the flow ",
          CTAForOther: "",
        };

      case "Habits":
        return {
          textAboveLine: "Your go-to behaviors—good or not-so-good",
          CTAForOther: "",
        };
      case "Routines":
        return {
          textAboveLine: "What your day usually looks like?",
          CTAForOther: "",
        };
      case "Behavioral Triggers":
        return {
          textAboveLine: "What tends to lead to those habits? ",
          CTAForOther: "Add your own ",
        };

      default:
        return { textAboveLine: "", CTAForOther: "" };
    }
  };

  const saveButtonPress = () => {
    logger("updateAnswerRequest______", {
      answeredData: updateAnswerRequest(data),
      allQuestions: data,
    });
    // validateQuestionData(data);
    // return;
    if (validateQuestionData(data)) {
      updatedAnswer(updateAnswerRequest(data));
    }
    // updatedAnswer(updateAnswerRequest(data));
  };

  return (
    <View>
      {data[0]?.categoryName ? (
        <MainHeading
          heading={
            data[0]?.categoryName == strings?.Contraceptive_Use
              ? strings?.Women_Health
              : getMainHeaderByCategoryName(data[0]?.categoryName)
                  ?.mainHeader || data[0]?.categoryName
          }
        /> //Header Text is managed here
      ) : null}
      {data[0]?.categoryName &&
      getMainHeaderByCategoryName(data[0]?.categoryName)?.subHeader ? (
        <MainHeading
          textStyle={{ fontSize: textLabelSize?.subHeaderTextSize }}
          heading={
            data[0]?.categoryName == strings?.Contraceptive_Use
              ? "Subtitle goes here smaller text"
              : getMainHeaderByCategoryName(data[0]?.categoryName)?.subHeader ||
                "--"
          }
        /> //SubHeader Text is managed here
      ) : null}
      {data?.map((itemsData: any, idx: any) => {
        return (
          <View key={idx}>
            {removedMedicalHistorySubHeading?.includes(
              itemsData?.stepName
            ) ? null : (
              <LineHeading
                questionHeading={
                  getLineHeaderByStepName(itemsData?.stepName, itemsData)
                    ?.textAboveLine || itemsData?.stepName //Text above the line is managed here
                }
              />
            )}

            {[fieldType?.singleSelect].includes(itemsData?.fieldType) && (
              <>
                <FlatList
                  data={itemsData?.stepOptions}
                  numColumns={3}
                  keyExtractor={(item, index) => "key" + index}
                  columnWrapperStyle={styles.columnWrapper}
                  scrollEnabled={false}
                  contentContainerStyle={styles.flatListContentContainer}
                  style={styles.flatList}
                  renderItem={({ item, index }: any) => (
                    <>
                      {item?.optionValue !== strings?.addSpecifications && (
                        <BoxButtonIcon
                          onPress={() => {
                            setData(
                              renderUpdatedStepOptionsSingle(idx, index, data)
                            );
                          }}
                          title={item?.optionValue}
                          source={
                            item.logo ? { uri: item.logo } : imagePath?.PlusIcon
                          }
                          button={{
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,
                          }}
                        />
                      )}
                    </>
                  )}
                />
              </>
            )}
            {[fieldType?.numberSelect].includes(itemsData?.fieldType) && (
              <>
                <FlatList
                  data={itemsData?.stepOptions}
                  horizontal
                  scrollEnabled={false}
                  keyExtractor={(item, index) => "key" + index}
                  contentContainerStyle={styles.flatListContentContainer}
                  style={styles.flatList}
                  renderItem={({ item, index }: any) => (
                    <>
                      {item?.optionValue !== strings?.addSpecifications && (
                        <CommonButton
                          btnName={item?.optionValue}
                          onPress={() => {
                            setData(
                              renderUpdatedStepOptionsSingle(idx, index, data)
                            );
                          }}
                          mainContainer={{
                            height: moderateScale(54),
                            width: moderateScale(54),
                            borderRadius: moderateScale(8),
                            borderWidth: moderateScale(1),
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,

                            borderColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.SurfCrest,
                          }}
                        />
                      )}
                    </>
                  )}
                />
              </>
            )}
            {[fieldType?.circleSelect].includes(itemsData?.fieldType) && (
              <>
                <View
                  style={[
                    styles.container,
                    {
                      backgroundColor:
                        idx % 2 === 0
                          ? colors?.prussianBlue
                          : colors?.SurfCrest,
                      paddingVertical: moderateScale(4),
                    },
                  ]}
                >
                  <FlatList
                    data={itemsData?.stepOptions}
                    horizontal
                    keyExtractor={(item, index) => "key" + index}
                    renderItem={({ item, index }) => (
                      <ScaleItem
                        title={item?.optionValue}
                        isSelected={item?.isSelected}
                        onPress={() => {
                          setData(
                            renderUpdatedStepOptionsSingle(idx, index, data)
                          );
                        }}
                        textStyle={{
                          color:
                            idx % 2 === 0
                              ? colors?.SurfCrest
                              : colors?.prussianBlue,
                        }}
                      />
                    )}
                    contentContainerStyle={styles.flatListContentContainer2}
                  />
                </View>
              </>
            )}
            {[fieldType?.bubbleSelect].includes(itemsData?.fieldType) && (
              <>
                <View style={stylesInternal?.addHorizontal}>
                  {itemsData?.placeholder && (
                    <Text style={stylesInternal?.placeHolderText}>
                      {itemsData?.placeholder}
                    </Text>
                  )}
                  <FlatList
                    data={checkSelectedIf(itemsData?.stepOptions)}
                    horizontal
                    style={stylesInternal?.addTop}
                    scrollEnabled={false}
                    keyExtractor={(item, index) => "key" + index}
                    contentContainerStyle={stylesInternal?.contentContainer}
                    renderItem={({ item, index }) => (
                      <DashedSlider
                        onPress={() => {
                          setData(
                            renderUpdatedStepOptionsSingle(idx, index, data)
                          );
                        }}
                        title={item?.optionValue}
                        selected={item?.isSelected}
                        dashLine={{
                          borderColor:
                            itemsData?.stepOptions?.findIndex(
                              (option: any) => option?.isSelected
                            ) > index
                              ? colors?.royalOrange
                              : colors?.lightGrey,
                        }}
                      />
                    )}
                  />
                </View>
              </>
            )}
            {[fieldType?.singleCheck].includes(itemsData?.fieldType) && (
              <>
                <FlatList
                  data={itemsData?.stepOptions}
                  numColumns={2}
                  columnWrapperStyle={styles.columnWrapperForSingleCheck}
                  scrollEnabled={false}
                  keyExtractor={(item, index) => "key" + index}
                  contentContainerStyle={styles.flatListContentContainer}
                  style={styles.flatList}
                  renderItem={({ item, index }: any) => (
                    <>
                      {item?.optionValue !== strings?.addSpecifications && (
                        <>
                          <RightCircleButton
                            title={item?.optionValue}
                            isSelected={item?.isSelected}
                            onPress={() => {
                              setData(
                                renderUpdatedStepOptionsSingle(idx, index, data)
                              );
                            }}
                            buttonContainer={{
                              backgroundColor:
                                index % 2 == 0
                                  ? colors?.royalOrange
                                  : colors?.prussianBlue,
                              width: moderateScale(110),
                              justifyContent: "flex-start",
                            }}
                            iconContainer={{}}
                            buttonText={{
                              color:
                                index % 2 == 0
                                  ? colors?.prussianBlue
                                  : colors?.SurfCrest,
                            }}
                          />
                        </>
                      )}
                    </>
                  )}
                />
              </>
            )}
            {[fieldType?.levelSelect].includes(itemsData?.fieldType) && (
              <>
                {itemsData?.placeholder && (
                  <Text style={stylesInternal?.AddAnotherPlaceHolderStyle}>
                    {itemsData?.placeholder}
                  </Text>
                )}
                <LevelScale
                  data={itemsData?.stepOptions}
                  onChangeslevel={(index: any) => {
                    setData(renderUpdatedStepOptionsSingle(idx, index, data));
                  }}
                />
              </>
            )}
            {[fieldType?.desAscending].includes(itemsData?.fieldType) && (
              <>
                <DescendingAscending
                  data={itemsData?.stepOptions}
                  onChangesFrequency={(index: any) => {
                    setData(renderUpdatedStepOptionsSingle(idx, index, data));
                  }}
                />
              </>
            )}
            {[fieldType?.frequencySelect].includes(itemsData?.fieldType) && (
              <>
                <View style={styles.container3}>
                  <FlatList
                    data={itemsData?.stepOptions}
                    contentContainerStyle={styles.flatListContentContainer2}
                    horizontal
                    keyExtractor={(item, index) => "key" + index}
                    renderItem={({ item, index }) => {
                      return (
                        <FrequencyArea
                          title={formatSentenceCase(item?.optionValue)}
                          selectedItem={{
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,
                          }}
                          onPress={() => {
                            setData(
                              renderUpdatedStepOptionsSingle(idx, index, data)
                            );
                          }}
                        />
                      );
                    }}
                  />
                </View>
              </>
            )}
            {[fieldType?.singleDropdown].includes(itemsData?.fieldType) && (
              <View style={styles.commonDropDownContainer}>
                <CommonSheetDroppDown
                  mainContainerStyle={styles.commonSheetDropDownMainContainer}
                  placeholderStyle={styles.commonSheetDropDownPlaceholder}
                  containerStyle={styles.commonSheetDropDownContainer}
                  itemTextStyle={styles.commonSheetDropDownItemText}
                  selectedTextStyle={styles.commonSheetDropDownSelectedText}
                  activeColor={colors?.polishedPine}
                  iconColor={colors?.SurfCrest}
                  placeholder={
                    itemsData?.Placeholder
                      ? itemsData?.Placeholder
                      : strings?.Select_Age
                  }
                  value={
                    itemsData?.stepOptions?.find(
                      (elem: any) => elem?.isSelected
                    )?.optionValue
                      ? itemsData?.stepOptions?.find(
                          (elem: any) => elem?.isSelected
                        )?.optionValue
                      : ""
                  }
                  errMsg={""}
                  dropDownListData={transformedData(itemsData?.stepOptions)}
                  selectedItemData={(vall: any, index: any) => {
                    const newData = [...data];
                    const stepOptionsIndex = newData[
                      idx
                    ]?.stepOptions?.findIndex(
                      (elem: any) => elem?.id == vall.id
                    );
                    const stepOptions = newData[idx]?.stepOptions;
                    for (let i in stepOptions) {
                      stepOptions[i] = {
                        ...stepOptions[i],
                        value: stepOptions[i]?.optionValue,
                        isSelected: false,
                      };
                    }

                    stepOptions[stepOptionsIndex] = {
                      ...stepOptions[stepOptionsIndex],
                      isSelected: true,
                    };

                    newData[idx].stepOptions = stepOptions;
                    setData(newData);
                  }}
                />
              </View>
            )}
            {[fieldType?.waveSelect].includes(itemsData?.fieldType) && (
              <>
                <View style={stylesInternal?.frequencyView}>
                  <FrequencyScale
                    data={itemsData?.stepOptions}
                    onChangeFrequency={(index: any) => {
                      setData(renderUpdatedStepOptionsSingle(idx, index, data));
                    }}
                  />
                </View>
              </>
            )}

            {[fieldType?.frequencyCurve].includes(itemsData?.fieldType) && (
              <>
                <FrequencyCurve
                  data={itemsData?.stepOptions}
                  onValueChange={(index: any) => {
                    setData(renderUpdatedStepOptionsSingle(idx, index, data));
                  }}
                />
              </>
            )}

            {[fieldType?.multiSelect].includes(itemsData?.fieldType) && (
              <>
                <FlatList
                  data={itemsData?.stepOptions}
                  keyExtractor={(item, index) => "key" + index}
                  ItemSeparatorComponent={() => {
                    return <View style={styles?.spreader} />;
                  }}
                  renderItem={({ item, index }: any) => {
                    return (
                      <>
                        {item?.optionValue !== strings?.addSpecifications && (
                          <ItemSelectedLine
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
                            title={formatSentenceCase(item?.optionValue)}
                            tintIconColor={
                              item?.isSelected
                                ? colors?.royalOrange
                                : colors?.SurfCrest
                            }
                            isSelected={item?.isSelected}
                            imageStyle={{
                              tintColor: item?.isSelected
                                ? colors?.royalOrange
                                : colors?.SurfCrest,
                            }}
                            titleStyle={{
                              color: item?.isSelected
                                ? colors?.royalOrange
                                : colors?.SurfCrest,
                            }}
                            source={item?.logo}
                          />
                        )}
                      </>
                    );
                  }}
                />
              </>
            )}
            {[fieldType?.multiSelectLine].includes(itemsData?.fieldType) && (
              <>
                <FlatList
                  data={itemsData?.stepOptions}
                  style={styles.flatList}
                  keyExtractor={(item, index) => "key" + index}
                  renderItem={({ item, index }) => (
                    <>
                      {item?.optionValue !== strings?.addSpecifications && (
                        <LineSeclectionButton
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
                          isImage={true}
                          source={
                            item?.logo ? { uri: item?.logo } : imagePath?.People
                          }
                          title={formatSentenceCase(item?.optionValue)}
                          tintIconColor={colors?.SurfCrest}
                          mainContainer={{
                            marginRight: moderateScale(8),
                          }}
                          touchStyle={{
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,
                          }}
                          textStyle={styles.lineSelectionText}
                          isRightIcon={item?.isSelected ? true : false}
                        />
                      )}
                    </>
                  )}
                />
              </>
            )}
            {[fieldType?.singleSelectLine].includes(itemsData?.fieldType) && (
              <>
                <FlatList
                  data={itemsData?.stepOptions}
                  style={styles.flatList}
                  keyExtractor={(item, index) => "key" + index}
                  renderItem={({ item, index }) => (
                    <>
                      {item?.optionValue !== strings?.addSpecifications && (
                        <LineSeclectionButton
                          onPress={() => {
                            setData(
                              renderUpdatedStepOptionsSingle(idx, index, data)
                            );
                          }}
                          isImage={true}
                          source={
                            item?.logo ? { uri: item?.logo } : imagePath?.People
                          }
                          title={formatSentenceCase(item?.optionValue)}
                          tintIconColor={
                            item?.isSelected
                              ? colors?.prussianBlue
                              : colors?.SurfCrest
                          }
                          touchStyle={{
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,
                          }}
                          mainContainer={{
                            marginRight: moderateScale(8),
                          }}
                          textStyle={[
                            styles.lineSelectionText,
                            {
                              color: item?.isSelected
                                ? colors?.prussianBlue
                                : colors?.SurfCrest,
                            },
                          ]}
                          isRightIcon={item?.isSelected ? true : false}
                        />
                      )}
                    </>
                  )}
                />
              </>
            )}
            {[fieldType?.starMultiSelect].includes(itemsData?.fieldType) && (
              <FlatList
                data={itemsData?.stepOptions}
                numColumns={2}
                keyExtractor={(item, index) => "key" + index}
                style={{
                  marginTop: moderateScale(20),
                }}
                renderItem={({ item, index }: any) => {
                  return (
                    <>
                      {item?.optionValue !== strings?.addSpecifications && (
                        <ItemSelectedPropsCircle
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
                          imageBackground={stylesInternal?.bgImageView}
                          innerCircle={{
                            borderColor: item?.isSelected
                              ? colors?.transparent
                              : colors?.SurfCrest,
                            height: moderateScale(130),
                            width: moderateScale(130),
                          }}
                          imageStyle={{
                            tintColor: item?.isSelected
                              ? colors?.prussianBlue
                              : colors?.SurfCrest,
                            height: moderateScale(30),
                            width: moderateScale(30),
                          }}
                          titleStyle={{
                            color: item?.isSelected
                              ? colors?.prussianBlue
                              : colors?.SurfCrest,
                          }}
                          title={formatSentenceCase(item?.optionValue)}
                          tintIconColor={
                            item?.isSelected
                              ? colors?.prussianBlue
                              : colors?.SurfCrest
                          }
                          source={imagePath?.OrgBgCurve}
                          tintColor={
                            item?.isSelected
                              ? colors?.royalOrange
                              : colors?.SaltBox
                          }
                          iconSource={
                            item?.logo
                              ? { uri: item?.logo }
                              : imagePath?.PlusIcon
                          }
                          container={{
                            flex:
                              data.length / 2 != 0 || index == data.length - 1
                                ? 0.5
                                : 1,
                          }}
                        />
                      )}
                    </>
                  );
                }}
              />
            )}
            {[fieldType?.circleMultiSelect].includes(itemsData?.fieldType) && (
              <FlatList
                data={itemsData?.stepOptions}
                numColumns={3}
                keyExtractor={(item, index) => "key" + index}
                columnWrapperStyle={styles.columnWrapper}
                scrollEnabled={false}
                contentContainerStyle={styles.flatListContentContainer}
                style={styles.flatList}
                renderItem={({ item, index }: any) => (
                  <>
                    {item?.optionValue !== strings?.addSpecifications && (
                      <CircleIconText
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
                        title={formatSentenceCase(item?.optionValue)}
                        tintIconColor={
                          item?.isSelected
                            ? colors?.prussianBlue
                            : colors?.SurfCrest
                        }
                        textStyle={{
                          color: item?.isSelected
                            ? colors?.prussianBlue
                            : colors?.SurfCrest,
                        }}
                        mainContainer={{}}
                        containerStyle={{
                          backgroundColor: item?.isSelected
                            ? colors?.polishedPine
                            : colors?.transparent,
                          borderColor: colors?.SurfCrest,

                          margin: moderateScale(2),
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        imageStyle={{ tintColor: colors?.SurfCrest }}
                        source={item?.logo ? item?.logo : imagePath?.PlusIcon}
                      />
                    )}
                  </>
                )}
              />
            )}
            {
              <View style={styles?.multiSelectBoxContainer}>
                {[fieldType?.multiSelectBox].includes(itemsData?.fieldType) && (
                  <FlatList
                    data={itemsData?.stepOptions}
                    numColumns={3}
                    keyExtractor={(item, index) => "key" + index}
                    scrollEnabled={false}
                    contentContainerStyle={styles.flatListContentContainer}
                    style={styles.flatList}
                    renderItem={({ item, index }: any) => (
                      <>
                        {item?.optionValue !== strings?.addSpecifications && (
                          <BoxButtonIcon
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
                            title={formatSentenceCase(item?.optionValue)}
                            tintIconColor={
                              item?.isSelected
                                ? colors?.prussianBlue
                                : colors?.SurfCrest
                            }
                            text={{
                              color: item?.isSelected
                                ? colors?.prussianBlue
                                : colors?.SurfCrest,
                            }}
                            source={
                              item.logo
                                ? { uri: item.logo }
                                : imagePath?.PlusIcon
                            }
                            button={{
                              backgroundColor: item?.isSelected
                                ? colors?.polishedPine
                                : colors?.transparent,
                              margin: moderateScale(5),
                              width: width / 3.7,
                            }}
                          />
                        )}
                      </>
                    )}
                  />
                )}
              </View>
            }
            {[fieldType?.stretchMultiSelect, fieldType?.dropdown].includes(
              itemsData?.fieldType
            ) && (
              <>
                <FlatList
                  data={itemsData?.stepOptions}
                  columnWrapperStyle={stylesInternal?.wrapView}
                  numColumns={20}
                  keyExtractor={(item, index) => "key" + index}
                  scrollEnabled={false}
                  contentContainerStyle={styles.flatListContentContainer}
                  style={styles.flatList}
                  renderItem={({ item, index }: any) => (
                    <>
                      {item?.optionValue !== strings?.addSpecifications && (
                        <IconTextButtonWidthDynamic
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
                          title={formatSentenceCase(item?.optionValue)}
                          tintIconColor={
                            item?.isSelected
                              ? colors?.prussianBlue
                              : colors?.SurfCrest
                          }
                          isImage={
                            itemsData?.fieldType === fieldType?.dropdown
                              ? false
                              : true
                          }
                          iconSource={
                            item?.logo
                              ? { uri: item?.logo }
                              : imagePath?.DumbIcon
                          }
                          containerStyle={{
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,
                          }}
                          textStyle={{
                            color: item?.isSelected
                              ? colors?.prussianBlue
                              : colors?.SurfCrest,
                          }}
                          mainContainer={{
                            marginRight: moderateScale(8),
                          }}
                        />
                      )}
                    </>
                  )}
                />
              </>
            )}

            {[fieldType?.textArea].includes(itemsData?.fieldType) && (
              <>
                <TextInputStretch //Gynecological Conditions. stepName
                  newSpecInputView={styles.textInputStretch}
                  value={
                    data[idx]?.otherAnswer?.trim() == ""
                      ? ""
                      : data[idx]?.otherAnswer
                  }
                  onChangeText={(val: any) => handleInputChange(val, idx)}
                  newSpecInput={styles.newSpecInput}
                  placeholder={itemsData?.placeholder}
                />
              </>
            )}
            {[fieldType?.datePicker].includes(itemsData?.fieldType) && (
              <>
                <DatePickerInput
                  showDatePicker={showDatePicker}
                  selectedDate={moment(new Date())?.format(MM_DD_YYY)}
                  ShowDate={
                    data[idx]?.otherAnswer &&
                    data[idx]?.otherAnswer?.trim() !== ""
                      ? data[idx]?.otherAnswer
                      : getLineHeaderByStepName(itemsData?.stepName)
                          ?.CTAForOther || "Select date"
                  }
                  IconTintColor
                  setShowDatePicker={setShowDatePicker}
                  setSelectedDate={(date: any) => {
                    let dateFormat = moment(date).format(MM_DD_YYY);
                    setShowDatePicker(false);
                    handleInputChange(dateFormat, idx);
                  }}
                  isMaxDate={[
                    "Past Hospitalizations",
                    "Past Medications",
                    "Past Surgeries",
                    "Recent Medical Visits",
                  ].includes(data[0]?.categoryName)}
                  MaxDate={new Date()}
                />
              </>
            )}
            {[fieldType?.feelingSelect].includes(itemsData?.fieldType) && (
              <TraitsSlider
                prevAnswer={data[idx]?.otherAnswer}
                setStringValue={(val: any) => handleInputChange(val, idx)}
              />
            )}
            {[fieldType?.simleSlider].includes(itemsData?.fieldType) && (
              <>
                <DaySlider
                  onValueChange={(val: any) => {
                    let normalValue =
                      Number.parseFloat(val).toFixed(0) + strings?.Days;
                    handleInputChange(normalValue, idx);
                    setDistance(normalValue);
                  }}
                  barStyle={{
                    backgroundColor: colors?.royalOrange,
                  }}
                  value={
                    !!itemsData?.otherAnswer ? itemsData?.otherAnswer : distance //here we are checking for itemsData?.otherAnswer the answer we saved is coming inside this property
                  }
                  initialValue={0}
                  lastValue={70}
                  disableMinTrackTintColor={colors?.white}
                  maximumTrackTintColor={colors?.surfCrustOp}
                  minimumTrackTintColor={colors?.royalOrange}
                  ValueTitle={true}
                  ValueTitleText={strings?.Days}
                  cacheValue={1}
                  progressValue={
                    !!itemsData?.otherAnswer
                      ? parseInt(itemsData?.otherAnswer.match(/\d+/)[0], 10)
                      : distance
                  }
                  mainSliderContainer={{
                    marginTop: moderateScale(80),
                  }}
                />
              </>
            )}
            {[fieldType?.moodSelect].includes(itemsData?.fieldType) && (
              <MoodWithSlider
                value={data[idx]?.otherAnswer}
                onChangeSliderValue={(val: any) => {
                  let toString = val.toString();
                  handleInputChange(toString, idx);
                }}
              />
            )}

            {itemsData?.addOther && (
              <>
                <AddButton
                  containerStyle={[
                    styles.addButtonContainer,
                    {
                      backgroundColor: itemsData?.isOther
                        ? colors?.polishedPine
                        : colors?.transparent,
                      borderColor:
                        // itemsData?.isOther
                        // ?
                        colors?.SurfCrest,
                      // : colors?.royalOrange,
                      // justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                  txt={
                    getLineHeaderByStepName(itemsData?.stepName)?.CTAForOther ||
                    "Add another "
                  } //Need Other CTA button text is not then set default to other
                  textStyle={{
                    color:
                      //  itemsData?.isOther
                      //   ?
                      colors?.SurfCrest,
                    // : colors?.royalOrange,
                  }}
                  tintColor={
                    // itemsData?.isOther ? colors?.SurfCrest : colors?.royalOrange
                    colors?.SurfCrest
                  }
                  onPress={() => handleAddSpecifications(idx, data)}
                />
              </>
            )}
            {itemsData?.otherFieldCondition && (
              <TextInputStretch
                newSpecInputView={styles.textInputStretch}
                value={data[idx]?.otherAnswer}
                onChangeText={(val: any) => {
                  if (validateName(val)) {
                    const updateAnswer = [...data];
                    updateAnswer[idx].otherAnswer = val;
                    setData(updateAnswer);
                  }
                }}
              />
            )}
          </View>
        );
      })}
      {data?.length > 0 && (
        <CommonButton
          mainContainer={styles.commonButtonContainer}
          isLoading={isLoading}
          btnName={
            getMainHeaderByCategoryName(data[0]?.categoryName)?.CTAButton ||
            strings?.save
          }
          onPress={() => (isLoading ? null : saveButtonPress())}
        />
      )}
    </View>
  );
};

export default AllSelectionComponent;

const stylesInternal = StyleSheet.create({
  addHorizontal: {
    marginHorizontal: moderateScale(19),
  },
  placeHolderText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "400",
    marginTop: moderateScale(10),
  },
  addTop: {
    marginTop: moderateScale(15),
  },
  contentContainer: {
    height: moderateScale(70),
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
  },
  AddAnotherPlaceHolderStyle: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "400",
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(19),
  },
  frequencyView: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(29),
  },
  bgImageView: {
    height: moderateScale(140),
    width: moderateScale(140),
  },
  wrapView: {
    flexWrap: "wrap",
  },
});
