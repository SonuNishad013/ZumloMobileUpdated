import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  backgrounColor,
  colorSleepPatternsBg,
  colorSleepPatternsText,
  removedMedicalHistorySubHeading,
} from "../../../../../constant/ProfileConstant";
import QuestionDescription from "../../../../../components/OnBoardiingComponents/QuestionDescription";
import {
  alertTypes,
  allStepName,
  fieldType,
} from "../../../../../constant/AllGlobalNameConstant";
import {
  moderateScale,
  textScale,
  width,
} from "../../../../../constant/responsiveStyle";
import { strings } from "../../../../../constant/strings";
import LineSeclectionButton from "../../../../../components/OnBoardiingComponents/LineSeclectionButton";
import { imagePath } from "../../../../../assets/png/imagePath";
import colors from "../../../../../constant/colors";
import TextInputStretch from "../../../../../components/OnBoardiingComponents/TextInputStretch";
import AddButton from "../../../../OnBoarding/WellnessPlan/ReGenerateWellnessPlan/AddButton";
import CommonButton from "../../../../../components/Buttons/commonButton";
import Global from "../../../../../global";
import TimePickerMinutes from "../../../../../components/OnBoardiingComponents/TimePickerMinutes";
import MeditationPracticesCard from "../../../../../components/Cards/MeditationPracticesCard";
import IconTextButtonWidthDynamic from "../../../../../components/OnBoardiingComponents/IconTextButtonWidthDynamic";
import { ItemSelectedPropsCircle } from "../../../../../components/OnBoardiingComponents/ItemSelectedPropsCircle";
import ItemSelectedLine from "../../../../../components/OnBoardiingComponents/ItemSelectedLine";
import BoxButtonIcon from "../../../../../components/OnBoardiingComponents/BoxButtonIcon";
import LineSliderCustom from "../../../../../components/OnBoardiingComponents/LineSliderCustom";
import CircleIconText from "../../../../../components/OnBoardiingComponents/CircleIconText";
import MealSelecter from "../../../../../components/OnBoardiingComponents/MealSelecter";
import DashedSlider from "../../../../../components/Sliders/DashedSlider";
import LevelScale from "../../../../../components/Scales/LevelScale";
import FrequencyCurve from "../../../../../components/FrequencySelector/FrequencyCurve";
import HalfCircle from "../../../../../components/OnBoardiingComponents/HalfCircle";
import HalfCircleSix from "../../../../../components/OnBoardiingComponents/HalfCircleSix";
import MoodWithSlider from "../../../../../components/AwesonmeCustomSlider/MoodWithSlider";
import BoxInputWithTitle from "../../../../../components/OnBoardiingComponents/BoxInputWithTitle";
import {
  bubbleBoxSelectUI,
  checkSelectedIf,
  getCircleSize,
  renderUpdatedStepOptions,
  renderUpdatedStepOptionsSingle,
  updateAnswerRequest,
  UpdatedStepOtherShow,
} from "../../../../../helper/FormHelpers";
import { formatSentenceCase } from "../../../../../helper/sentenceCase";
import IconCardTitleBottom from "../../../../../components/Cards/IconCardTitleBottom";
import logger from "../../../../../constant/logger";
import AlertModal from "../../../../../components/Alerts/AlertModal";
import { AlertCircle } from "../../../../../assets";
import { data } from "../../../../Dashboard/Planner/Dummy";

interface Props {
  questions?: any;
  updatedAnswer?: any;
  questionIdx?: any;
  setQuestionIdx?: any;
  type?: any;
  isLoading?: boolean;
  handleScrollUp?: any;
}
const SingleItmsShowUI: React.FC<Props> = ({
  questions,
  updatedAnswer,
  questionIdx,
  setQuestionIdx,
  type,
  isLoading,
  handleScrollUp,
}) => {
  logger("allDataThroughprops", {
    questions,
    updatedAnswer,
    questionIdx,
    setQuestionIdx,
    type,
    isLoading,
    handleScrollUp,
  });
  const [data, setData] = useState<any>([]);
  const [textInputFocused, setTextInputFocused] = useState("False");
  const [errorPopup, setErrorPopup] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [modalData, setModalData] = useState({
    type: "",
    confirmButtonPress: () => {},
    cancelButtonPress: () => {},
    AlertIcon: AlertCircle,
    isAlertIcon: false,
  });

  const handleConfirm = () => {
    setAlertVisible(false);
  };
  const handleCancel = () => {
    setAlertVisible(false);
  };
  useEffect(() => {
    if (questions !== undefined) {
      setData(questions);
    }
  }, [questions]);
  console.log("first----datadata------>>>>>>", data);
  console.log("first----questions------>>>>>>", questions);
  const handleAddSpecifications = (idx: number, data: any) => {
    let changesData = [...data];
    const addSpecIndex = changesData[idx]?.stepOptions.findIndex(
      (option: any) => option?.optionValue === strings?.addSpecifications
    );
    if (addSpecIndex !== -1) {
      setData(UpdatedStepOtherShow(idx, addSpecIndex, changesData));
    }
  };

  const handleInputChange = (val: string, idx: number) => {
    const updateAnswer = [...data];
    updateAnswer[idx].otherAnswer = val;
    setData(updateAnswer);
  };
  const onPressNext = () => {
    interface DataObjType {
      [key: string]: any;
      stepOptions: any[];
      answer: string;
      otherAnswer: string;
    }
    const dataReplica: DataObjType[] = data;
    if (questionIdx == data?.length - 1) {
      updatedAnswer(updateAnswerRequest(data));
    } else {
      setQuestionIdx(questionIdx + 1);
      handleScrollUp();
      Global.GlobalIndex = questionIdx + 1;
    }
    return;

    //Block for handling the answers
    const isCurrentQuestionHaveOption: boolean =
      dataReplica[questionIdx]?.stepOptions?.length > 0;
    const extractSelectedOptions =
      isCurrentQuestionHaveOption &&
      dataReplica[questionIdx]?.stepOptions?.filter(
        (item: any) => item?.isSelected
      );

    logger("QuestionsIDX______", {
      isCurrentQuestionHaveOption,
      extractSelectedOptions,
      currentQuest: dataReplica[questionIdx],
    });

    if (
      Array.isArray(extractSelectedOptions) &&
      extractSelectedOptions.length < 1
    ) {
      // handle the case where there are no selected options
      Alert.alert("Got issue ", "No option selected");
      return;
    } else if (extractSelectedOptions) {
      //If options is selected then its okay to go on next question
      const isOtherOptioSelected: any[] = extractSelectedOptions?.filter(
        (item: any) => item?.optionValue === "Add Your Specifications"
      );
      if (isOtherOptioSelected?.length > 0) {
        //if other option is selected check for other value
        if (!dataReplica[questionIdx]?.otherAnswer) {
          //If other value hasn't filled then throw validation message.
          Alert?.alert("Got issue", "Other value not filled.");
          return;
        } else {
          if (questionIdx == data?.length - 1) {
            updatedAnswer(updateAnswerRequest(data));
          } else {
            setQuestionIdx(questionIdx + 1);
            handleScrollUp();
            Global.GlobalIndex = questionIdx + 1;
          }
        }
      } else {
        //Here we add code for making the user to go on next question.
        if (questionIdx == data?.length - 1) {
          updatedAnswer(updateAnswerRequest(data));
        } else {
          setQuestionIdx(questionIdx + 1);
          handleScrollUp();
          Global.GlobalIndex = questionIdx + 1;
        }
      }
    } else {
      interface QuestionWithoutOptionProps {
        [key: string]: any;
        answer: string;
        otherAnswer: string;
      }
      const currentQuestionWithoutOption: QuestionWithoutOptionProps =
        dataReplica[questionIdx];
      logger(
        "currentQuestionWithoutOption_______",
        currentQuestionWithoutOption
      );
      if (
        currentQuestionWithoutOption?.answer ||
        currentQuestionWithoutOption?.otherAnswer
      ) {
        //Letting the user to go on next question if user has answered the question previously or currently.(If answered previously then response we will get inside of  currentQuestionWithoutOption?.answer this and user has answered now then we will get theresponse inside of  currentQuestionWithoutOption?.otherAnswer)
        if (questionIdx == data?.length - 1) {
          updatedAnswer(updateAnswerRequest(data));
        } else {
          setQuestionIdx(questionIdx + 1);
          handleScrollUp();
          Global.GlobalIndex = questionIdx + 1;
        }
      } else {
        //showing the alert if user haven't anwered the question
        Alert?.alert("got issue", "Fields are not filled");
        return;
      }
      //Handle without options question considering answer key's value and otherAnswer key's value
    }
  };

  const renderQuestionUI = (itemIdx: any) => {
    let type = data[itemIdx]?.fieldType;
    console.log("fieldType=-==-=>", type, fieldType);

    switch (type) {
      case fieldType?.singleSelectLine:
        return (
          <FlatList
            data={data[itemIdx]?.stepOptions}
            style={styles.flatList}
            keyExtractor={(item, index) => "key" + index}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <>
                {item?.optionValue !== strings?.addSpecifications && (
                  <LineSeclectionButton
                    onPress={() => {
                      setData(
                        renderUpdatedStepOptionsSingle(itemIdx, index, data)
                      );
                    }}
                    isImage={
                      [allStepName?.mentors]?.includes(data[itemIdx]?.stepName)
                        ? false
                        : true
                    }
                    source={
                      item?.logo ? { uri: item?.logo } : imagePath?.People
                    }
                    title={item?.optionValue}
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
                    textStyle={styles.flexText}
                    imageStyle={{
                      height: moderateScale(40),
                      width: moderateScale(40),
                    }}
                    isRightIcon={
                      [allStepName?.sleep_Quality]?.includes(
                        data[itemIdx]?.stepName
                      )
                        ? false
                        : item?.isSelected
                        ? true
                        : false
                    }
                  />
                )}
              </>
            )}
          />
        );
      case fieldType?.stretchSingleSelect:
        return (
          <>
            <FlatList
              data={data[itemIdx]?.stepOptions}
              columnWrapperStyle={{ flexWrap: "wrap" }}
              numColumns={20}
              keyExtractor={(item, index) => "key" + index}
              scrollEnabled={false}
              contentContainerStyle={{ gap: moderateScale(15) }}
              style={{
                marginHorizontal: moderateScale(19),
                marginTop: moderateScale(25),
              }}
              renderItem={({ item, index }: any) => (
                <>
                  {item?.optionValue !== strings?.addSpecifications &&
                    (console.log(" item?.logo -=>", item),
                    (
                      <IconTextButtonWidthDynamic
                        onPress={() => {
                          setData(
                            renderUpdatedStepOptionsSingle(itemIdx, index, data)
                          );
                        }}
                        title={item?.optionValue}
                        isImage={
                          // [allStepName?.income_Level]?.includes(
                          //   data[itemIdx]?.stepName
                          // )
                          //   ? false
                          //   : true
                          item?.logo ? true : false
                        }
                        iconSource={
                          item?.logo ? { uri: item?.logo } : imagePath?.DumbIcon
                        }
                        containerStyle={{
                          backgroundColor: item?.isSelected
                            ? colors?.polishedPine
                            : colors?.transparent,
                        }}
                        textStyle={{
                          marginRight: [
                            allStepName?.income_Level,
                            allStepName?.work_Schedule,
                            allStepName?.income_Level,
                          ]?.includes(data[itemIdx]?.stepName)
                            ? moderateScale(10)
                            : moderateScale(30),
                        }}
                      />
                    ))}
                </>
              )}
            />
          </>
        );
      case fieldType?.starSingleSelect:
        return (
          <FlatList
            data={data[itemIdx]?.stepOptions}
            keyExtractor={(item, index) => "key" + index}
            key={Math.ceil(data[itemIdx]?.stepOptions?.length / 2) ?? 4}
            numColumns={2}
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
                          renderUpdatedStepOptionsSingle(itemIdx, index, data)
                        );
                      }}
                      imageBackground={{
                        height: moderateScale(140),
                        width: moderateScale(140),
                      }}
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
                        height: "auto",
                        width: "auto",
                      }}
                      tintIconColor={
                        item?.isSelected
                          ? colors?.prussianBlue
                          : colors?.SurfCrest
                      }
                      title={item?.optionValue}
                      source={imagePath?.OrgBgCurve}
                      tintColor={
                        item?.isSelected ? colors?.royalOrange : colors?.SaltBox
                      }
                      iconSource={
                        item?.logo ? { uri: item?.logo } : imagePath?.PlusIcon
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
        );
      case fieldType?.singleSelectBox:
        return (
          <>
            {
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <FlatList
                  data={data[itemIdx]?.stepOptions}
                  numColumns={3}
                  keyExtractor={(item, index) => "key" + index}
                  scrollEnabled={false}
                  contentContainerStyle={{ gap: moderateScale(5) }}
                  style={styles.flatList}
                  renderItem={({ item, index }: any) => (
                    <>
                      {item?.optionValue !== strings?.addSpecifications && (
                        <BoxButtonIcon
                          onPress={() => {
                            setData(
                              renderUpdatedStepOptionsSingle(
                                itemIdx,
                                index,
                                data
                              )
                            );
                          }}
                          title={item?.optionValue}
                          tintIconColor={
                            item?.isSelected
                              ? colors?.prussianBlue
                              : colors?.SurfCrest
                          }
                          text={{
                            color: colors?.SurfCrest,
                          }}
                          source={
                            item.logo ? { uri: item.logo } : imagePath?.PlusIcon
                          }
                          width={35}
                          height={35}
                          button={{
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,
                            margin: moderateScale(5),
                            width: width / 3.7,
                            // height: moderateScale(120),
                            justifyContent: "space-evenly",
                            alignItems: "center",
                          }}
                          isTintColor={false}
                        />
                      )}
                    </>
                  )}
                />
              </View>
            }
          </>
        );
      case fieldType?.scaleSliderSelect:
        return (
          <LineSliderCustom
            items={data[itemIdx]?.stepOptions}
            itemIdx={itemIdx}
            onchangeOptionsValue={(idx: any) => {
              setData(renderUpdatedStepOptionsSingle(itemIdx, idx, data));
            }}
          />
        );
      // case fieldType?.arrowSelect:
      //   return (
      //     <>
      //       <ArrowImageSelector
      //         items={data[itemIdx]?.stepOptions}
      //         onChangeIndex={(idx: any) => {
      //           setData(renderUpdatedStepOptionsSingle(itemIdx, idx, data));
      //         }}
      //       />
      //     </>
      //   );

      case fieldType?.arrowSelect:
        return (
          <>
            <FlatList
              data={data[itemIdx]?.stepOptions}
              contentContainerStyle={styles.cardContentContainer}
              horizontal
              keyExtractor={(item, index) => "key" + index}
              style={[styles.flatList, { marginHorizontal: moderateScale(0) }]}
              renderItem={({ item, index }: any) => (
                <>
                  {item?.optionValue !== strings?.addSpecifications && (
                    <IconCardTitleBottom
                      title={item?.optionValue}
                      onPress={() => {
                        setData(
                          renderUpdatedStepOptions(
                            itemIdx,
                            index,
                            data,
                            item?.optionValue
                          )
                        );
                      }}
                      source={
                        item?.logo ? { uri: item?.logo } : imagePath?.CircleMed
                      }
                      containerStyle={{
                        borderColor: item?.isSelected
                          ? colors?.royalOrange
                          : colors?.SurfCrest,
                      }}
                      mainContainer={{
                        marginLeft:
                          index == 0 ? moderateScale(19) : moderateScale(0),
                      }}
                    />
                  )}
                </>
              )}
            />
          </>
        );

      case fieldType?.circleCurveSelectSix:
        return (
          <HalfCircleSix
            data={data[itemIdx]?.stepOptions}
            onChangeValue={(idx: any) => {
              setData(renderUpdatedStepOptionsSingle(itemIdx, idx, data));
            }}
            containerStyle={{
              right: 270,
            }}
          />
        );
      case fieldType?.circleCurveSelect:
        return (
          <HalfCircle
            data={data[itemIdx]?.stepOptions}
            onChangeValue={(idx: any) => {
              setData(renderUpdatedStepOptionsSingle(itemIdx, idx, data));
            }}
          />
        );
      case fieldType?.singleShadowSelect:
        return (
          <FlatList
            data={data[itemIdx]?.stepOptions}
            keyExtractor={(item, index) => "key" + index}
            contentContainerStyle={{
              gap: moderateScale(15),
              marginTop: moderateScale(30),
              marginHorizontal: moderateScale(19),
            }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setData(renderUpdatedStepOptionsSingle(itemIdx, index, data));
                }}
              >
                <View
                  style={[
                    {
                      borderRadius: moderateScale(11),
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: colors?.backIconBg2,
                      padding: moderateScale(17),
                      borderWidth: moderateScale(1),
                      borderColor: colors?.transparent,
                    },
                    item?.isSelected && {
                      borderColor: colors?.royalOrangeDark,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: textScale(14),
                      fontWeight: "600",
                      color: colors?.SurfCrest,
                    }}
                  >
                    {formatSentenceCase(item?.optionValue)}
                  </Text>
                  <Text
                    style={{
                      fontSize: textScale(14),
                      fontWeight: "400",
                      color: colors?.minGray,
                    }}
                  >
                    {formatSentenceCase(item?.optionLabel)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        );
      case fieldType?.mealSelect:
        return (
          <FlatList
            data={data[itemIdx]?.stepOptions}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item, index }) => {
              return (
                <MealSelecter
                  onPress={() => {
                    setData(
                      renderUpdatedStepOptionsSingle(itemIdx, index, data)
                    );
                  }}
                  title={item?.optionValue}
                  source={item?.logo ? { uri: item?.logo } : imagePath?.Table}
                  isSelected={item?.isSelected}
                  iconContainer={{
                    backgroundColor:
                      index === 0 ? colors?.transparent : colors?.lightGrey,
                  }}
                  touchableOpacity={{
                    marginTop:
                      data[itemIdx]?.stepOptions?.length - 1 === index
                        ? moderateScale(1)
                        : moderateScale(-1),
                  }}
                />
              );
            }}
          />
        );
      case fieldType?.starLevelSelect:
        return (
          <FlatList
            data={data[itemIdx]?.stepOptions}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item, index }) => {
              return (
                <ItemSelectedPropsCircle
                  onPress={() => {
                    setData(
                      renderUpdatedStepOptionsSingle(itemIdx, index, data)
                    );
                  }}
                  innerCircle={{
                    borderColor: item?.isSelected
                      ? colors?.transparent
                      : colors?.SurfCrest,
                    height: getCircleSize(index).size,
                    width: getCircleSize(index).size,
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
                    fontSize: getCircleSize(index).fontSize,
                    height: index == 2 ? moderateScale(50) : moderateScale(30),
                  }}
                  title={item?.optionValue}
                  source={imagePath?.OrgBgCurve}
                  tintColor={
                    item?.isSelected ? colors?.royalOrange : colors?.SaltBox
                  }
                  tintIconColor={
                    item?.isSelected ? colors?.prussianBlue : colors?.SurfCrest
                  }
                  container={{
                    flex: 1,
                    marginTop: moderateScale(30),
                  }}
                  imageBackground={{
                    height: getCircleSize(index).size,
                    width: getCircleSize(index).size,
                  }}
                />
              );
            }}
          />
        );

      case fieldType?.bubbleBoxSelect:
        return (
          <View
            style={{
              marginHorizontal: moderateScale(19),
              height: moderateScale(120),
              paddingHorizontal: moderateScale(10),
              borderRadius: moderateScale(10),
              backgroundColor: bubbleBoxSelectUI(data[itemIdx]?.stepName)
                ?.boxBackgroundColor,
              marginTop: moderateScale(20),
            }}
          >
            <FlatList
              data={checkSelectedIf(data[itemIdx]?.stepOptions)}
              horizontal
              keyExtractor={(item, index) => "key" + index}
              scrollEnabled={false}
              contentContainerStyle={{
                alignItems: "flex-end",
                justifyContent: "space-between",
                width: "100%",
              }}
              renderItem={({ item, index }) => (
                <DashedSlider
                  data={checkSelectedIf(data[itemIdx]?.stepOptions)}
                  //checkSelectedIf(data[itemIdx]?.stepOptions)
                  onPress={() => {
                    setData(
                      renderUpdatedStepOptionsSingle(itemIdx, index, data)
                    );
                  }}
                  title={item?.optionValue}
                  selected={item?.isSelected}
                  dashLine={{
                    borderColor:
                      data[itemIdx]?.stepOptions?.findIndex(
                        (option: any) => option?.isSelected
                      ) > index
                        ? colors?.polishedPine
                        : colors?.lightGrey,
                  }}
                  selectedText={{
                    color: bubbleBoxSelectUI(data[itemIdx]?.stepName)
                      ?.valueColor,
                  }}
                  borderColorSelected={colors?.polishedPine}
                  tintColor={
                    bubbleBoxSelectUI(data[itemIdx]?.stepName)?.imageTint
                  }
                />
              )}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: moderateScale(-10),
                marginBottom: moderateScale(20),
              }}
            >
              <Text
                style={{
                  fontSize: textScale(10),
                  fontWeight: "400",
                  color: bubbleBoxSelectUI(data[itemIdx]?.stepName)?.textColor,
                }}
              >
                {bubbleBoxSelectUI(data[itemIdx]?.stepName)?.startTitle}
              </Text>
              <Text
                style={{
                  fontSize: textScale(10),
                  fontWeight: "400",
                  color: bubbleBoxSelectUI(data[itemIdx]?.stepName)?.textColor,
                }}
              >
                {bubbleBoxSelectUI(data[itemIdx]?.stepName)?.endTitle}
              </Text>
            </View>
          </View>
        );

      case fieldType?.levelSelect:
        return (
          <LevelScale
            data={data[itemIdx]?.stepOptions}
            onChangeslevel={(index: any) => {
              console.log("itemIdx-->", itemIdx);
              console.log("index-->", index);
              console.log("data-111->", data);
              console.log(
                "renderUpdatedStepOptionsSingle(itemIdx, index, data)->",
                renderUpdatedStepOptionsSingle(itemIdx, index, data)
              );

              setData(renderUpdatedStepOptionsSingle(itemIdx, index, data));
              // let newData: any = [...data];
              // newData = newData[itemIdx].stepOptions[index].isSelected = true;
              // setData(newData);
            }}
          />
        );
      case fieldType?.frequencyCurve:
        return (
          <FrequencyCurve
            data={checkSelectedIf(data[itemIdx]?.stepOptions)}
            onValueChange={(index: any) => {
              setData(renderUpdatedStepOptionsSingle(itemIdx, index, data));
            }}
          />
        );

      case fieldType?.multiSelectLine:
        return (
          <FlatList
            data={data[itemIdx]?.stepOptions}
            style={styles.flatList}
            keyExtractor={(item, index) => "key" + index}
            key={Math.ceil(data[itemIdx]?.stepOptions?.length / 2) ?? 4}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <>
                {item?.optionValue !== strings?.addSpecifications && (
                  <LineSeclectionButton
                    onPress={() => {
                      setData(
                        renderUpdatedStepOptions(
                          itemIdx,
                          index,
                          data,
                          item?.optionValue
                        )
                      );
                    }}
                    isImage={
                      [
                        allStepName?.religious_Beliefs,
                        allStepName?.ethical_Principles,
                        allStepName?.best_Describe,
                      ]?.includes(data[itemIdx]?.stepName)
                        ? false
                        : true
                    }
                    source={
                      item?.logo ? { uri: item?.logo } : imagePath?.People
                    }
                    title={item?.optionValue}
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
                      styles.flexText,
                      {
                        color: item?.isSelected
                          ? colors?.prussianBlue
                          : colors?.SurfCrest,
                      },
                    ]}
                    isRightIcon={
                      [
                        allStepName?.religious_Beliefs,
                        allStepName?.ethical_Principles,
                        allStepName?.best_Describe,
                      ]?.includes(data[itemIdx]?.stepName)
                        ? false
                        : item?.isSelected
                        ? true
                        : false
                    }
                    imageStyle={{
                      height: [allStepName?.sleep_Quality]?.includes(
                        data[itemIdx]?.stepName
                      )
                        ? moderateScale(40)
                        : moderateScale(22),
                      width: true ? moderateScale(40) : moderateScale(22),
                    }}
                  />
                )}
              </>
            )}
          />
        );
      case fieldType?.multiCardSelect:
        return (
          <>
            <FlatList
              data={data[itemIdx]?.stepOptions}
              keyExtractor={(item, index) => "key" + index}
              contentContainerStyle={styles.cardContentContainer}
              horizontal
              style={[styles.flatList, { marginHorizontal: moderateScale(0) }]}
              renderItem={({ item, index }: any) => (
                <>
                  {item?.optionValue !== strings?.addSpecifications && (
                    <MeditationPracticesCard
                      title={item?.optionValue}
                      onPress={() => {
                        setData(
                          renderUpdatedStepOptions(
                            itemIdx,
                            index,
                            data,
                            item?.optionValue
                          )
                        );
                      }}
                      source={
                        item?.logo ? { uri: item?.logo } : imagePath?.CircleMed
                      }
                      isMedIcon={true}
                      isTintColor={false}
                      titleStyle={{
                        color:
                          colorSleepPatternsText[
                            index % colorSleepPatternsText?.length
                          ],
                        fontSize: textScale(24),
                        // top: moderateScale(-25),
                      }}
                      mainContainerView={{
                        marginLeft:
                          index == 0 ? moderateScale(19) : moderateScale(0),
                      }}
                      containerStyle={{
                        backgroundColor:
                          colorSleepPatternsBg[
                            index % colorSleepPatternsBg?.length
                          ],
                      }}
                      imageBackgroundStyle={{
                        marginTop: moderateScale(35),
                      }}
                      height={188}
                      mainContainer={{
                        backgroundColor: item?.isSelected
                          ? colors?.polishedPine
                          : colors?.SurfCrest,
                        marginLeft: moderateScale(0),
                      }}
                    />
                  )}
                </>
              )}
            />
          </>
        );

      case fieldType?.stretchMultiSelect:
        return (
          <>
            <FlatList
              data={data[itemIdx]?.stepOptions}
              keyExtractor={(item, index) => "key" + index}
              columnWrapperStyle={{ flexWrap: "wrap" }}
              numColumns={20}
              scrollEnabled={false}
              contentContainerStyle={{ gap: moderateScale(15) }}
              style={{
                marginHorizontal: moderateScale(19),
                marginTop: moderateScale(25),
              }}
              renderItem={({ item, index }: any) => (
                <>
                  {item?.optionValue !== strings?.addSpecifications && (
                    <IconTextButtonWidthDynamic
                      onPress={() => {
                        setData(
                          renderUpdatedStepOptions(
                            itemIdx,
                            index,
                            data,
                            item?.optionValue
                          )
                        );
                      }}
                      title={item?.optionValue}
                      tintIconColor={
                        item?.isSelected
                          ? colors?.prussianBlue
                          : colors?.SurfCrest
                      }
                      isImage={
                        [
                          allStepName?.work_Schedule,
                          allStepName?.eating_Patterns,
                          allStepName?.common_Challenges,
                          allStepName?.social_Activities,
                          allStepName?.personality_Type_Big_Five,
                          allStepName?.key_Weaknesses,
                        ]?.includes(data[itemIdx]?.stepName)
                          ? false
                          : true
                      }
                      iconSource={
                        item?.logo ? { uri: item?.logo } : imagePath?.DumbIcon
                      }
                      containerStyle={{
                        backgroundColor: item?.isSelected
                          ? colors?.polishedPine
                          : colors?.transparent,
                      }}
                      textStyle={{
                        marginRight: [
                          allStepName?.work_Schedule,
                          allStepName?.eating_Patterns,
                          allStepName?.common_Challenges,
                          allStepName?.social_Activities,
                          allStepName?.personality_Type_Big_Five,
                          allStepName?.key_Weaknesses,
                        ]?.includes(data[itemIdx]?.stepName)
                          ? moderateScale(10)
                          : moderateScale(30),
                        color: item?.isSelected
                          ? colors?.prussianBlue
                          : colors?.SurfCrest,
                      }}
                    />
                  )}
                </>
              )}
            />
          </>
        );

      case fieldType?.starMultiSelect:
        return (
          <FlatList
            data={data[itemIdx]?.stepOptions}
            keyExtractor={(item, index) => "key" + index}
            numColumns={2}
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
                            itemIdx,
                            index,
                            data,
                            item?.optionValue
                          )
                        );
                      }}
                      imageBackground={{
                        height: moderateScale(140),
                        width: moderateScale(140),
                      }}
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
                      tintIconColor={
                        item?.isSelected
                          ? colors?.prussianBlue
                          : colors?.SurfCrest
                      }
                      title={item?.optionValue}
                      source={imagePath?.OrgBgCurve}
                      tintColor={
                        item?.isSelected ? colors?.royalOrange : colors?.SaltBox
                      }
                      iconSource={
                        item?.logo ? { uri: item?.logo } : imagePath?.PlusIcon
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
        );

      case fieldType?.multiSelect:
        return (
          <>
            <FlatList
              data={data[itemIdx]?.stepOptions}
              keyExtractor={(item, index) => "key" + index}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{
                      flex: 1,
                      height: moderateScale(0.9),
                      backgroundColor: colors?.surfCrustOp,
                    }}
                  />
                );
              }}
              renderItem={({ item, index }: any) => {
                return (
                  <>
                    {item?.optionValue !== strings?.addSpecifications && (
                      <ItemSelectedLine
                        onPress={() => {
                          setData(
                            renderUpdatedStepOptions(
                              itemIdx,
                              index,
                              data,
                              item?.optionValue
                            )
                          );
                        }}
                        title={item?.optionValue}
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
        );

      case fieldType?.multiSelectBox:
        return (
          <>
            {
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <FlatList
                  data={data[itemIdx]?.stepOptions}
                  keyExtractor={(item, index) => "key" + index}
                  numColumns={3}
                  scrollEnabled={false}
                  contentContainerStyle={{ gap: moderateScale(15) }}
                  style={styles.flatList}
                  renderItem={({ item, index }: any) => (
                    <>
                      {item?.optionValue !== strings?.addSpecifications && (
                        <BoxButtonIcon
                          onPress={() => {
                            setData(
                              renderUpdatedStepOptions(
                                itemIdx,
                                index,
                                data,
                                item?.optionValue
                              )
                            );
                          }}
                          title={item?.optionValue}
                          tintIconColor={colors?.SurfCrest}
                          text={{
                            color: colors?.SurfCrest,
                          }}
                          source={
                            item.logo ? { uri: item.logo } : imagePath?.PlusIcon
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
              </View>
            }
          </>
        );
      case fieldType?.circleMultiSelect:
        return (
          <>
            <FlatList
              data={data[itemIdx]?.stepOptions}
              numColumns={3}
              keyExtractor={(item, index) => "key" + index}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              scrollEnabled={false}
              contentContainerStyle={{ gap: moderateScale(15) }}
              style={styles.flatList}
              renderItem={({ item, index }: any) => (
                <>
                  {item?.optionValue !== strings?.addSpecifications && (
                    <CircleIconText
                      onPress={() => {
                        setData(
                          renderUpdatedStepOptions(
                            itemIdx,
                            index,
                            data,
                            item?.optionValue
                          )
                        );
                      }}
                      title={item?.optionValue}
                      containerStyle={{
                        backgroundColor: item?.isSelected
                          ? colors?.polishedPine
                          : colors?.transparent,
                        borderColor: colors?.SurfCrest,

                        margin: moderateScale(6),
                      }}
                      textStyle={
                        {
                          // backgroundColor: 'red'
                        }
                      }
                      imageStyle={{ tintColor: colors?.SurfCrest }}
                      iconSource={
                        item?.logo ? { uri: item?.logo } : imagePath?.PlusIcon
                      }
                      tintIconColor={colors?.SurfCrest}
                      source={item?.logo}
                    />
                  )}
                </>
              )}
            />
          </>
        );

      case fieldType?.timePicker:
        return (
          <>
            <TimePickerMinutes
              value={data[itemIdx]?.otherAnswer}
              onChangesTime={(val: any) => {
                let value = val?.toString();
                handleInputChange(value, itemIdx);
              }}
            />
          </>
        );
      case fieldType?.textArea:
        return (
          <>
            <TextInputStretch
              newSpecInputView={styles.textInputStretch}
              value={data[itemIdx]?.otherAnswer}
              onChangeText={(val: any) => handleInputChange(val, itemIdx)}
              newSpecInput={styles.newSpecInput}
              placeholder={
                handlePlaceHolder(data[itemIdx]?.stepDescription) ||
                "Type here..."
              }
            />
          </>
        );
      case fieldType?.moodSelect:
        return (
          <MoodWithSlider
            value={data[itemIdx]?.otherAnswer}
            onChangeSliderValue={(val: any) => {
              let toString = val.toString();
              handleInputChange(toString, itemIdx);
            }}
          />
        );
      case fieldType?.textAreaBox:
        return (
          <>
            <BoxInputWithTitle
              value={data[itemIdx]?.otherAnswer}
              handleInputChange={(value: any) => {
                const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                if (numericValue === "" || parseInt(numericValue, 10) <= 24) {
                  handleInputChange(numericValue, itemIdx);
                }
              }}
            />
          </>
        );
      default:
        return (
          <View>
            <Text>UI Not Found</Text>
          </View>
        );
    }
  };

  logger("allReleventLogs___", {
    questions,
    updatedAnswer,
    questionIdx,
    setQuestionIdx,
    type,
    isLoading,
    handleScrollUp,
  });

  const handlePlaceHolder = (stepName: string) => {
    logger("stepName______QUESTION", stepName);
    switch (stepName) {
      case "What would make the app even better?":
        return "Add a suggestion…";
      case "What improvements would you like to see in the app?":
        return "Add a suggestion…";
      case "How has your interaction with the app changed?":
        return "Things that feel easier now, or ways you use Zumlo differently…";
      case "What do you expect from Zumlo?":
        return "Support, structure, inspiration… What’s important to you?";
      case "How has your experience been over time?":
        return "Have your habits changed? Do you find it more useful now?";
      default:
        return "Type here...";
    }
  };
  const otherCTAButton = (stepName: string) => {
    switch (stepName) {
      case "Sleep-related issues":
        return "Add another issue";

      default:
        break;
    }
  };
  // const mainCTAButton = (type: string) => {
  //   logger("type______", type);
  //   switch (type) {
  //     case "Sleep Patterns":
  //       return "All set!";

  //     default:
  //       break;
  //   }
  // };
  const mainCTAButton = (
    type: string
  ): { initialButton: string; lastButton: string } => {
    logger("type______", type);
    switch (type) {
      case "Sleep Patterns":
        return {
          initialButton: "Continue",
          lastButton: "All set!",
        };
      case "Daily Routines":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Substance Use":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Technology Usage":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Social Life":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Hobbies and Interest":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Exercise and Physical Activity":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Support Systems":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Dietary Habits":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "App Usage Patterns":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "User Feedback and Reviews":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Participation in Surveys and Research":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Cultural Practices":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Religious Beliefs":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Core Beliefs":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Moral Values":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Employment Status":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Social Activity Levels":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Mentors":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Social Connections":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };
      case "Impact of Social Media":
        return {
          initialButton: "Next",
          lastButton: "Submit",
        };

      // Add more cases as needed
      default:
        return {
          initialButton: "Continue",
          lastButton: "Submit",
        };
    }
  };
  return (
    console.log(" render data", data),
    (
      <View>
        {removedMedicalHistorySubHeading?.includes(
          data[questionIdx]?.stepName
        ) ? null : (
          <>
            <QuestionDescription
              stepDescription={
                [allStepName?.engagement_with_Educational_Content]?.includes(
                  data[questionIdx]?.stepName
                )
                  ? data[questionIdx]?.stepDescription
                  : formatSentenceCase(data[questionIdx]?.stepDescription)
              }
              placeholder={formatSentenceCase(data[questionIdx]?.placeholder)}
            />
            {renderQuestionUI(questionIdx)}
            {logger("data[questionIdx]_____", data[questionIdx])}
            {data[questionIdx]?.addOther && (
              <AddButton
                containerStyle={[
                  styles.addButtonContainer,
                  data[questionIdx]?.isOther
                    ? styles.addButtonSelected
                    : styles?.addButtonUnselected,
                ]}
                txt={
                  otherCTAButton(data[questionIdx]?.stepName) || strings?.other
                }
                textStyle={styles.textSelected}
                tintColor={colors?.SurfCrest}
                onPress={() => {
                  handleAddSpecifications(questionIdx, data);
                  setTextInputFocused(
                    textInputFocused === "False" ? "True" : "False"
                  );
                }}
              />
            )}
            {data[questionIdx]?.otherFieldCondition && (
              <TextInputStretch
                isFocused={textInputFocused}
                newSpecInputView={styles.textInputStretch}
                value={data[questionIdx]?.otherAnswer}
                onChangeText={(val: any) => {
                  // if (validateName(val)) {
                  const updateAnswer = [...data];
                  updateAnswer[questionIdx].otherAnswer = val;
                  setData(updateAnswer);
                  // }
                }}
              />
            )}
            <CommonButton
              onPress={() => (!isLoading ? onPressNext() : null)}
              // onPress={() => onPressNext()} old
              isLoading={isLoading}
              btnName={
                questionIdx === data?.length - 1
                  ? mainCTAButton(type)?.lastButton || strings?.submit
                  : mainCTAButton(type)?.initialButton ||
                    strings?.ContinueLowerCase
              }
              mainContainer={styles.commonButtonContainer}
            />
          </>
        )}

        <AlertModal
          isVisible={isAlertVisible}
          type={modalData?.type}
          isAlertIcon={modalData?.isAlertIcon}
          AlertIcon={modalData?.AlertIcon}
          hideAlert={() => setAlertVisible(false)}
          onConfirm={modalData?.confirmButtonPress}
          onCancel={handleCancel}
        />
      </View>
    )
  );
};

export default SingleItmsShowUI;

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(25),
  },
  lineSelectionButton: {
    backgroundColor: colors.transparent,
  },
  cardContentContainer: {
    gap: moderateScale(15),
    marginBottom: moderateScale(20),
  },
  meditationCard: {
    borderColor: colors.SurfCrest,
  },
  flexText: {
    flex: 1,
  },
  addButtonContainer: {
    width: "auto",
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(19),
  },
  addButtonSelected: {
    backgroundColor: colors.polishedPine,
    borderColor: colors.SurfCrest,
    alignItems: "center",
  },
  addButtonUnselected: {
    backgroundColor: colors.transparent,
    borderColor: colors.SurfCrest,
    alignItems: "center",
  },
  textInputStretch: {
    marginHorizontal: moderateScale(19),
    borderRadius: moderateScale(15),
    marginTop: moderateScale(15),
  },
  textSelected: {
    color: colors.SurfCrest,
  },
  newSpecInput: {
    height: moderateScale(125),
    marginTop: moderateScale(10),
  },
  textUnselected: {
    color: colors.royalOrange,
  },
  commonButtonContainer: {
    width: "auto",
    height: moderateScale(56),
    marginTop: moderateScale(40),
    // marginBottom: moderateScale(50),
    marginHorizontal: moderateScale(19),
  },
});
