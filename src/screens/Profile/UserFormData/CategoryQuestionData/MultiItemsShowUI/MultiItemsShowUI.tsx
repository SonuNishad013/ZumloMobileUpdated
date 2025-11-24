import { FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  moderateScale,
  textScale,
  width,
} from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";
import { imagePath } from "../../../../../assets/png/imagePath";
import CommonButton from "../../../../../components/Buttons/commonButton";
import { strings } from "../../../../../constant/strings";
import TextInputStretch from "../../../../../components/OnBoardiingComponents/TextInputStretch";
import { validateName } from "../../../../../validations/validation";
import {
  allStepName,
  fieldType,
} from "../../../../../constant/AllGlobalNameConstant";
import {
  removedLifeStyleSubHeading,
  removedMedicalHistorySubHeading,
} from "../../../../../constant/ProfileConstant";
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
import QuestionDescription from "../../../../../components/OnBoardiingComponents/QuestionDescription";
import {
  bubbleBoxSelectUI,
  checkSelectedIf,
  renderUpdatedStepOptions,
  renderUpdatedStepOptionsSingle,
  updateAnswerRequest,
  UpdatedStepOtherShow,
} from "../../../../../helper/FormHelpers";
import MainHeading from "../../ExtraComponet/MainHeading";
import { styles } from "./styles";
import LineHeading from "../../ExtraComponet/LineHeading";
import MinBoxButtonIcon from "../../../../../components/OnBoardiingComponents/MinBoxButtonIcon";
import { formatSentenceCase } from "../../../../../helper/sentenceCase";
import { validateQuestionData } from "../../../MedicalHistory/RenderUI/AllSelectionComponent/AllSelectionComponent";
import logger from "../../../../../constant/logger";
import { getMainHeaderByCategoryName } from "../../../ProfileSectionLabels/HeaderSubHeaderText";
import { textLabelSize } from "../../../../../utils/TextConfig";

interface Props {
  questions?: any;
  updatedAnswer?: any;
  type?: any;
  isLoading?: boolean;
  headerName?: string;
}
const MultiItemsShowUI: React.FC<Props> = ({
  questions,
  updatedAnswer,
  type,
  isLoading,
  headerName,
}) => {
  const [data, setData] = useState<any>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [distance, setDistance] = useState<any>(0);
  const [textInputFocused, setTextInputFocused] = useState("False"); // used for opening keyboard and showing input box at the same time

  useEffect(() => {
    if (questions !== data) {
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
  console.log("first--type><<", type);
  const onPress = () => {
    if (validateQuestionData(data)) {
      updatedAnswer(updateAnswerRequest(data));
    }
  };
  const handlePlaceHolder = (stepName: string) => {
    logger("stepName______QUESTION", stepName);
    switch (stepName) {
      case "Your strengths in action":
        return `e.g., "I successfully led a team project…"`;
      case "Impact of your challenges":
        return `e.g., "Procrastination causes me stress…"`;
      case "Steps toward growth":
        return `e.g., "I started using a daily planner…"`;
      case "Self-Reflection on Strengths":
        return ` "My leadership skills help me..."`;
      case "Self-Reflection on Weaknesses":
        return `"Stress sometimes limits my productivity…"`;
      case "Support Needed for Improvement":
        return `"I’d benefit from time-management tools..."`;
      case "Insights from others":
        return `e.g., "My manager complimented my adaptability…"`;
      default:
        return "Type here...";
    }
  };
  const addOtherCTAButton = (stepName: string) => {
    logger("stepName______QUESTION_cta", stepName);
    switch (stepName) {
      case "Your key strengths":
        return "Add another";

      default:
        return "Other";
    }
  };
  return (
    <View>
      {type ? <MainHeading heading={formatSentenceCase(type)} /> : null}
      {logger("data_____formainHeader_", type, headerName)}
      {type && getMainHeaderByCategoryName(type, headerName)?.subHeader ? (
        <MainHeading
          textStyle={{ fontSize: textLabelSize?.subHeaderTextSize }}
          heading={
            data[0]?.categoryName == strings?.Contraceptive_Use
              ? "Subtitle goes here smaller text"
              : getMainHeaderByCategoryName(type, headerName)?.subHeader || "--"
          }
        /> //SubHeader Text is managed here
      ) : null}
      {data?.map((itemsData: any, idx: any) => {
        return (
          <View key={idx}>
            {removedLifeStyleSubHeading?.includes(
              itemsData?.stepName
            ) ? null : (
              <>
                {/* <QuestionDescription
                  stepDescription={itemsData?.stepDescription}
                  placeholder={itemsData?.placeholder}
                /> */}
                <LineHeading
                  questionHeading={formatSentenceCase(
                    itemsData?.stepDescription
                  )}
                  placeHolder={itemsData?.placeholder}
                />
                {/* {itemsData?.placeholder && (
                  <Text
                    style={{
                      color: colors?.SurfCrest,
                      fontSize: moderateScale(14),
                      fontWeight: "400",
                      marginTop: moderateScale(10),
                      marginHorizontal: moderateScale(19),
                    }}
                  >
                    {itemsData?.placeholder}
                  </Text>
                )} */}
              </>
            )}
            {[fieldType?.circleCurveSelect].includes(itemsData?.fieldType) && (
              <>
                <FlatList
                  data={itemsData?.stepOptions}
                  numColumns={2}
                  keyExtractor={(item, index) => "key" + index}
                  columnWrapperStyle={styles.columnWrapper}
                  scrollEnabled={false}
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
                          tintIconColor={
                            item?.isSelected
                              ? colors?.prussianBlue
                              : colors?.SurfCrest
                          }
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
                  keyExtractor={(item, index) => "key" + index}
                  scrollEnabled={false}
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
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,
                            borderWidth: moderateScale(1),
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
                <View
                  style={{
                    marginHorizontal: moderateScale(19),
                  }}
                >
                  {itemsData?.placeholder && (
                    <Text
                      style={{
                        color: colors?.SurfCrest,
                        fontSize: moderateScale(14),
                        fontWeight: "400",
                        marginTop: moderateScale(10),
                      }}
                    >
                      {itemsData?.placeholder}
                    </Text>
                  )}
                  <FlatList
                    data={itemsData?.stepOptions}
                    horizontal
                    keyExtractor={(item, index) => "key" + index}
                    style={{
                      marginTop: moderateScale(15),
                    }}
                    scrollEnabled={false}
                    contentContainerStyle={{
                      height: moderateScale(70),
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
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
            {[fieldType?.bubbleBoxSelect].includes(itemsData?.fieldType) && (
              <View
                style={{
                  marginHorizontal: moderateScale(19),
                  height: moderateScale(120),
                  paddingHorizontal: moderateScale(10),
                  borderRadius: moderateScale(10),
                  backgroundColor: bubbleBoxSelectUI(itemsData?.stepName)
                    ?.boxBackgroundColor,

                  marginTop: moderateScale(20),
                }}
              >
                <FlatList
                  data={checkSelectedIf(itemsData?.stepOptions)}
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
                      data={checkSelectedIf(itemsData?.stepOptions)}
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
                            ? colors?.polishedPine
                            : colors?.lightGrey,
                      }}
                      selectedText={{
                        color: bubbleBoxSelectUI(itemsData?.stepName)
                          ?.valueColor,
                      }}
                      borderColorSelected={colors?.polishedPine}
                      tintColor={
                        bubbleBoxSelectUI(itemsData?.stepName)?.imageTint
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
                      color: bubbleBoxSelectUI(itemsData?.stepName)?.textColor,
                    }}
                  >
                    {bubbleBoxSelectUI(itemsData?.stepName)?.startTitle}
                  </Text>
                  <Text
                    style={{
                      fontSize: textScale(10),
                      fontWeight: "400",
                      color: bubbleBoxSelectUI(itemsData?.stepName)?.textColor,
                    }}
                  >
                    {bubbleBoxSelectUI(itemsData?.stepName)?.endTitle}
                  </Text>
                </View>
              </View>
            )}
            {[fieldType?.singleCheck].includes(itemsData?.fieldType) && (
              <>
                <FlatList
                  data={itemsData?.stepOptions}
                  numColumns={2}
                  keyExtractor={(item, index) => "key" + index}
                  columnWrapperStyle={styles.columnWrapper}
                  scrollEnabled={false}
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
                  <Text
                    style={{
                      color: colors?.SurfCrest,
                      fontSize: moderateScale(14),
                      fontWeight: "400",
                      marginTop: moderateScale(10),
                      marginHorizontal: moderateScale(19),
                    }}
                  >
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
                    keyExtractor={(item, index) => "key" + index}
                    data={itemsData?.stepOptions}
                    contentContainerStyle={styles.flatListContentContainer2}
                    horizontal
                    renderItem={({ item, index }) => {
                      return (
                        <FrequencyArea
                          title={item?.optionValue}
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
                      : "Select age"
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
                <View
                  style={{
                    marginHorizontal: moderateScale(19),
                    marginTop: moderateScale(29),
                  }}
                >
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
            {
              <View style={styles?.multiSelectBoxContainer}>
                {[fieldType?.singleSelectBox].includes(
                  itemsData?.fieldType
                ) && (
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
                                renderUpdatedStepOptionsSingle(idx, index, data)
                              );
                            }}
                            title={item?.optionValue}
                            tintIconColor={
                              item?.isSelected
                                ? colors?.prussianBlue
                                : colors?.SurfCrest
                            }
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
            {/* For Multi selector */}
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
                            title={item?.optionValue}
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
                            tintIconColor={
                              item?.isSelected
                                ? colors?.royalOrange
                                : colors?.SurfCrest
                            }
                            // svgUrl=
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
                  keyExtractor={(item, index) => "key" + index}
                  style={styles.flatList}
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
                          isImage={
                            [
                              allStepName?.religious_Beliefs,
                              allStepName?.ethical_Principles,
                              allStepName?.best_Describe,
                              allStepName?.Personality_Type_MBTI,
                            ]?.includes(data[idx]?.stepName)
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
                          textStyle={styles.lineSelectionText}
                          isRightIcon={item?.isSelected ? true : false}
                        />
                      )}
                    </>
                  )}
                />
              </>
            )}

            {
              <View style={styles?.multiSelectBoxContainer}>
                {[fieldType?.minBoxSingleSelect].includes(
                  itemsData?.fieldType
                ) && (
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
                          <MinBoxButtonIcon
                            onPress={() => {
                              setData(
                                renderUpdatedStepOptionsSingle(idx, index, data)
                              );
                            }}
                            isIcon={false}
                            title={item?.optionValue}
                            source={
                              item.logo
                                ? { uri: item.logo }
                                : imagePath?.PlusIcon
                            }
                            button={{
                              backgroundColor: item?.isSelected
                                ? colors?.polishedPine
                                : colors?.transparent,
                              marginHorizontal: moderateScale(5),
                              width: width / 3.7,
                              height: moderateScale(45),
                              borderRadius: moderateScale(70),
                            }}
                            text={{
                              fontSize: textScale(14),
                            }}
                          />
                        )}
                      </>
                    )}
                  />
                )}
              </View>
            }
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
                          title={item?.optionValue}
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
                        title={item?.optionValue}
                        containerStyle={{
                          backgroundColor: item?.isSelected
                            ? colors?.polishedPine
                            : colors?.transparent,
                          borderColor: colors?.SurfCrest,
                          // width: width / 3.7,
                          margin: moderateScale(6),
                        }}
                        imageStyle={{ tintColor: colors?.SurfCrest }}
                        iconSource={
                          item?.logo ? { uri: item?.logo } : imagePath?.PlusIcon
                        }
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
                            title={item?.optionValue}
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
            {
              <View style={styles?.multiSelectBoxContainer}>
                {[fieldType?.minBoxMultiSelect].includes(
                  itemsData?.fieldType
                ) && (
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
                          <MinBoxButtonIcon
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
                            isIcon={false}
                            title={item?.optionValue}
                            source={
                              item.logo
                                ? { uri: item.logo }
                                : imagePath?.PlusIcon
                            }
                            button={{
                              backgroundColor: item?.isSelected
                                ? colors?.polishedPine
                                : colors?.transparent,
                              marginHorizontal: moderateScale(5),
                              width: width / 3.7,
                              height: moderateScale(45),
                              borderRadius: moderateScale(70),
                            }}
                            text={{
                              fontSize: textScale(14),
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
                  columnWrapperStyle={{ flexWrap: "wrap" }}
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
                          title={item?.optionValue}
                          isImage={
                            [
                              allStepName?.work_Schedule,
                              allStepName?.eating_Patterns,
                              allStepName?.common_Challenges,
                              allStepName?.social_Activities,
                              allStepName?.personality_Type_Big_Five,
                              allStepName?.key_Weaknesses,
                            ]?.includes(data[idx]?.stepName)
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
                            marginRight: [
                              allStepName?.work_Schedule,
                              allStepName?.eating_Patterns,
                              allStepName?.common_Challenges,
                              allStepName?.social_Activities,
                              allStepName?.personality_Type_Big_Five,
                              allStepName?.key_Weaknesses,
                            ]?.includes(data[idx]?.stepName)
                              ? moderateScale(10)
                              : moderateScale(30),
                          }}
                        />
                      )}
                    </>
                  )}
                />
              </>
            )}
            {/* Normal Answer TextArea */}
            {[fieldType?.textArea].includes(itemsData?.fieldType) && (
              <>
                {/* {itemsData?.placeholder && (
                  <Text
                    style={{
                      color: colors?.SurfCrest,
                      fontSize: moderateScale(14),
                      fontWeight: "400",
                      marginTop: moderateScale(10),
                      marginHorizontal: moderateScale(19),
                    }}
                  >
                    {itemsData?.placeholder}
                  </Text>
                )} */}
                <TextInputStretch
                  newSpecInputView={styles.textInputStretch}
                  value={data[idx]?.otherAnswer}
                  onChangeText={(val: any) => handleInputChange(val, idx)}
                  newSpecInput={styles.newSpecInput}
                  placeholder={
                    handlePlaceHolder(data[idx]?.stepDescription) ||
                    "Type here..."
                  }
                />
              </>
            )}
            {[fieldType?.datePicker].includes(itemsData?.fieldType) && (
              <>
                <DatePickerInput
                  showDatePicker={showDatePicker}
                  selectedDate={
                    data[idx]?.otherAnswer
                      ? new Date(data[idx]?.otherAnswer)
                      : new Date()
                  }
                  ShowDate={
                    data[idx]?.otherAnswer
                      ? moment(new Date(data[idx]?.otherAnswer)).format(
                          MM_DD_YYY
                        )
                      : MM_DD_YYY
                  }
                  IconTintColor
                  setShowDatePicker={setShowDatePicker}
                  setSelectedDate={(date: any) => {
                    let dateFormat = moment(date).format(MM_DD_YYY);
                    setShowDatePicker(false);
                    handleInputChange(dateFormat, idx);
                  }}
                  // minimumDate={()=>datePickerMinMaxTime(itemsData?.stepName)}
                />
              </>
            )}
            {[fieldType?.feelingSelect].includes(itemsData?.fieldType) && (
              <TraitsSlider
                value={data[idx]?.otherAnswer}
                setStringValue={(val: any) => handleInputChange(val, idx)}
              />
            )}
            {[fieldType?.simleSlider].includes(itemsData?.fieldType) && (
              <>
                <DaySlider
                  onValueChange={(val: any) => {
                    let normalValue =
                      Number.parseFloat(val).toFixed(0) + ` Days`;
                    handleInputChange(normalValue, idx);
                    setDistance(normalValue);
                  }}
                  barStyle={{
                    backgroundColor: colors?.royalOrange,
                  }}
                  // value={distance}
                  value={distance}
                  initialValue={0}
                  lastValue={70}
                  disableMinTrackTintColor="#fff"
                  maximumTrackTintColor={colors?.surfCrustOp}
                  minimumTrackTintColor={colors?.royalOrange}
                  ValueTitle={true}
                  ValueTitleText={" Days"}
                  cacheValue={1}
                  progressValue={0.5}
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
            {/* Other Button and Other Input */}
            {itemsData?.addOther && (
              <>
                <AddButton
                  containerStyle={[
                    styles.addButtonContainer,
                    {
                      backgroundColor: itemsData?.isOther
                        ? colors?.polishedPine
                        : colors?.transparent,
                      borderColor: colors?.SurfCrest,
                      alignItems: "center",
                    },
                  ]}
                  txt={
                    addOtherCTAButton(itemsData?.stepDescription) ||
                    strings?.other
                  }
                  textStyle={{
                    color: colors?.SurfCrest,
                  }}
                  tintColor={colors?.SurfCrest}
                  onPress={() => {
                    handleAddSpecifications(idx, data);
                    // used for opening keyboard and showing input box at the same time
                    setTextInputFocused(
                      textInputFocused === "False" ? "True" : "False"
                    );
                  }}
                />
              </>
            )}
            {itemsData?.otherFieldCondition && (
              <TextInputStretch
                isFocused={textInputFocused} // used for opening keyboard and showing input box at the same time
                newSpecInputView={styles.textInputStretch}
                value={data[idx]?.otherAnswer}
                onChangeText={(val: any) => {
                  // if (validateName(val)) {
                  const updateAnswer = [...data];
                  updateAnswer[idx].otherAnswer = val;
                  setData(updateAnswer);
                  // }
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
          btnName={strings?.Save}
          // onPress={() => updatedAnswer(updateAnswerRequest(data))} old
          onPress={() => (!isLoading ? onPress() : null)}
        />
      )}
    </View>
  );
};

export default MultiItemsShowUI;
