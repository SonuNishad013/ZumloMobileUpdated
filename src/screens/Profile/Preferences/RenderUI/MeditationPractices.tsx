import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import CommonButton from "../../../../components/Buttons/commonButton";
import { strings } from "../../../../constant/strings";
import TextInputStretch from "../../../../components/OnBoardiingComponents/TextInputStretch";
import { validateName } from "../../../../validations/validation";
import CommonSheetDroppDown from "../../../../components/CommonDropDown/CommonSheetDroppDown";
import { imagePath } from "../../../../assets/png/imagePath";
import MeditationPracticesCard from "../../../../components/Cards/MeditationPracticesCard";
import AddButton from "../../../OnBoarding/WellnessPlan/ReGenerateWellnessPlan/AddButton";
import {
  renderUpdatedStepOptions,
  updateAnswerRequest,
  UpdatedStepOtherShow,
} from "../Helpers/HelperFun";
import MainHeading from "../MainHeading";
import LineHeading from "../LineHeading";
import { fieldType } from "../../../../constant/AllGlobalNameConstant";
import {
  colorBgIcon,
  colorMeditionIcon,
  colorMeditionIconBg,
  removedPreferresSubHeading,
} from "../../../../constant/ProfileConstant";
import { formatSentenceCase } from "../../../../helper/sentenceCase";
import { getMainHeaderByCategoryName } from "../../ProfileSectionLabels/HeaderSubHeaderText";
import { textLabelSize } from "../../../../utils/TextConfig";
import { getLineHeaderByStepName } from "../../ProfileSectionLabels/LineTextAddOtherCTA";
import { validateQuestionData } from "../../MedicalHistory/RenderUI/AllSelectionComponent/AllSelectionComponent";
interface Props {
  questions?: any;
  parentObject?: any;
  updatedAnswer?: any;
  isLoading?: any;
}
const MeditationPractices: React.FC<Props> = ({
  questions,
  parentObject,
  updatedAnswer,
  isLoading,
}) => {
  const [data, setData] = useState<any>(questions);
  const [parentObj, setParentObj] = useState<any>(parentObject);
  const [textInputFocused, setTextInputFocused] = useState("False"); // used for opening keyboard and showing input box at the same time
  useEffect(() => {
    if (questions !== data || parentObject !== parentObj) {
      setData(questions);
      setParentObj(parentObject);
    }
  }, [questions, parentObject]);

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
  const onPress = () => {
    if (validateQuestionData(data)) {
      updatedAnswer(updateAnswerRequest(data));
    }
  };
  return (
    <View>
      {/* <MainHeading heading={parentObj?.stepName} /> */}
      {parentObj?.stepName ? (
        <MainHeading
          heading={
            data[0]?.categoryName == strings?.Contraceptive_Use
              ? strings?.Women_Health
              : getMainHeaderByCategoryName(parentObj?.stepName)?.mainHeader ||
                parentObj?.stepName
          }
        /> //Header Text is managed here
      ) : null}
      {parentObj?.stepName &&
      getMainHeaderByCategoryName(parentObj?.stepName)?.subHeader ? (
        <MainHeading
          textStyle={{ fontSize: textLabelSize?.subHeaderTextSize }}
          heading={
            data[0]?.categoryName == strings?.Contraceptive_Use
              ? "Subtitle goes here smaller text"
              : getMainHeaderByCategoryName(parentObj?.stepName)?.subHeader ||
                "--"
          }
        /> //SubHeader Text is managed here
      ) : null}
      {data?.map(
        (itemsData: any, idx: any) => (
          console.log(
            "label_changes_itemsDatastepDescription",
            data?.map((itm: any) => itm?.stepDescription)
          ),
          (
            <View key={idx}>
              {removedPreferresSubHeading?.includes(
                itemsData?.stepName
              ) ? null : (
                <LineHeading
                  questionHeading={
                    getLineHeaderByStepName(
                      itemsData?.stepDescription,
                      itemsData
                    )?.textAboveLine || itemsData?.stepDescription
                  }
                />
              )}
              {[fieldType?.dropdown].includes(itemsData?.fieldType) && (
                <View style={styles.commonDropDownContainer}>
                  <CommonSheetDroppDown
                    mainContainerStyle={styles.commonSheetDropDownMainContainer}
                    placeholderStyle={styles.commonSheetDropDownPlaceholder}
                    containerStyle={styles.commonSheetDropDownContainer}
                    itemTextStyle={styles.commonSheetDropDownItemText}
                    selectedTextStyle={styles.commonSheetDropDownSelectedText}
                    activeColor={colors?.polishedPine}
                    iconColor={colors?.SurfCrest}
                    placeholder={"Select your level"}
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
              {[fieldType?.multiSelect].includes(itemsData?.fieldType) && (
                <>
                  <FlatList
                    data={itemsData?.stepOptions}
                    contentContainerStyle={styles.flatListContentContainer}
                    horizontal
                    keyExtractor={(item, index) => "key" + index}
                    style={styles.flatList}
                    renderItem={({ item, index }: any) => (
                      console.log("item=-=-=-=>", item),
                      (
                        <>
                          {item?.optionValue !== strings?.addSpecifications && (
                            <MeditationPracticesCard
                              title={formatSentenceCase(item?.optionValue)}
                              onPress={() => {
                                setData(
                                  renderUpdatedStepOptions(idx, index, data)
                                );
                              }}
                              tintColor={
                                colorBgIcon[index % colorMeditionIconBg?.length]
                              }
                              source={
                                item?.logo
                                  ? { uri: item?.logo }
                                  : imagePath?.CircleMed
                              }
                              containerStyle={{
                                borderColor: item?.isSelected
                                  ? colors?.polishedPine
                                  : colors?.SurfCrest,

                                backgroundColor:
                                  colorMeditionIconBg[
                                    index % colorMeditionIconBg?.length
                                  ],
                                borderWidth: moderateScale(2),
                              }}
                              imageStyle={{
                                tintColor:
                                  colorMeditionIcon[
                                    index % colorMeditionIconBg?.length
                                  ],
                              }}
                              titleStyle={{
                                color:
                                  colorMeditionIcon[
                                    index % colorMeditionIconBg?.length
                                  ],
                              }}
                              // sleepImage={}
                            />
                          )}
                        </>
                      )
                    )}
                  />
                </>
              )}
              <>
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
                        getMainHeaderByCategoryName(parentObj?.stepName)
                          ?.AddOtherCTA || strings?.other
                      }
                      textStyle={{
                        color: colors?.SurfCrest,
                      }}
                      tintColor={colors?.SurfCrest}
                      onPress={() => {
                        handleAddSpecifications(idx, data);
                        setTextInputFocused(
                          textInputFocused === "False" ? "True" : "False"
                        );
                      }}
                    />
                  </>
                )}
              </>
              {itemsData?.otherFieldCondition && (
                <TextInputStretch
                  isFocused={textInputFocused}
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
          )
        )
      )}
      <CommonButton
        mainContainer={styles.commonButtonContainer}
        isLoading={isLoading}
        btnName={
          getMainHeaderByCategoryName(parentObj?.stepName)?.CTAButton ||
          strings?.save
        }
        // onPress={() => updatedAnswer(updateAnswerRequest(data))}
        onPress={() => (isLoading ? null : onPress())}
      />
    </View>
  );
};

export default MeditationPractices;

const styles = StyleSheet.create({
  flatListContentContainer: {
    gap: moderateScale(15),
    marginBottom: moderateScale(20),
  },
  flatList: {
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(19),
  },

  textInputStretch: {
    marginHorizontal: moderateScale(19),
    borderRadius: moderateScale(15),
  },
  commonButtonContainer: {
    width: "auto",
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
  },
  addButtonContainer: {
    width: "auto",
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(15),
  },

  commonDropDownContainer: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(15),
  },
  commonSheetDropDownMainContainer: {
    backgroundColor: colors?.transparent,
    flex: 1,
    borderColor: colors?.SurfCrest,
  },
  commonSheetDropDownPlaceholder: {
    color: colors?.SurfCrest,
  },
  commonSheetDropDownContainer: {
    backgroundColor: colors?.SurfCrest,
    borderColor: colors?.SaltBox,
  },
  commonSheetDropDownItemText: {
    color: colors?.prussianBlue,
  },
  commonSheetDropDownSelectedText: {
    color: colors?.SurfCrest,
  },
});
