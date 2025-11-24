import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, width } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import { imagePath } from "../../../../assets/png/imagePath";
import CommonButton from "../../../../components/Buttons/commonButton";
import { strings } from "../../../../constant/strings";
import TextInputStretch from "../../../../components/OnBoardiingComponents/TextInputStretch";
import { validateName } from "../../../../validations/validation";
import BoxButtonIcon from "../../../../components/OnBoardiingComponents/BoxButtonIcon";
import MainHeading from "../MainHeading";
import {
  renderUpdatedStepOptions,
  updateAnswerRequest,
  UpdatedStepOtherShow,
} from "../Helpers/HelperFun";
import { fieldType } from "../../../../constant/AllGlobalNameConstant";
import LineHeading from "../LineHeading";
import { removedPreferresSubHeading } from "../../../../constant/ProfileConstant";
import { formatSentenceCase } from "../../../../helper/sentenceCase";
import { getLineHeaderByStepName } from "../../ProfileSectionLabels/LineTextAddOtherCTA";
import { getMainHeaderByCategoryName } from "../../ProfileSectionLabels/HeaderSubHeaderText";
import { textLabelSize } from "../../../../utils/TextConfig";
import logger from "../../../../constant/logger";
import { validateQuestionData } from "../../MedicalHistory/RenderUI/AllSelectionComponent/AllSelectionComponent";

interface Props {
  questions?: any;
  parentObject?: any;
  updatedAnswer?: any;
  isLoading?: any;
}

const ActivityPreferences: React.FC<Props> = ({
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
      setData(moveAddYourSpecificationsToEnd(questions));
      setParentObj(parentObject);
    }
  }, [questions, parentObject]);

  const moveAddYourSpecificationsToEnd = (steps: any) => {
    return steps.map((step: any) => {
      const { stepOptions } = step;
      const addYourSpecOption = stepOptions?.filter(
        (option: any) => option?.optionValue === strings?.addSpecifications
      );
      const otherOptions = stepOptions?.filter(
        (option: any) => option?.optionValue !== strings?.addSpecifications
      );
      return {
        ...step,
        stepOptions: [...otherOptions, ...addYourSpecOption],
      };
    });
  };

  const onPress = () => {
    if (validateQuestionData(data)) {
      updatedAnswer(updateAnswerRequest(data));
    }
  };
  return (
    <View>
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

      {data?.map((itemsData: any, idx: any) => {
        console.log("label_changes_itemsData?.fieldType", itemsData);

        return (
          <View key={idx}>
            {removedPreferresSubHeading?.includes(
              itemsData?.stepName
            ) ? null : (
              <LineHeading
                questionHeading={
                  getLineHeaderByStepName(itemsData?.stepDescription, itemsData)
                    ?.textAboveLine || itemsData?.stepDescription
                }
              />
            )}
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {[fieldType?.multiSelect].includes(itemsData?.fieldType) && (
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
                            setData(renderUpdatedStepOptions(idx, index, data));
                          }}
                          title={formatSentenceCase(item?.optionValue)}
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
                        />
                      )}
                      {item?.optionValue == strings?.addSpecifications && (
                        <BoxButtonIcon
                          onPress={() => {
                            setData(UpdatedStepOtherShow(idx, index, data));
                            setTextInputFocused(
                              textInputFocused === "False" ? "True" : "False"
                            );
                          }}
                          title={
                            getLineHeaderByStepName(
                              itemsData?.stepDescription,
                              itemsData
                            )?.CTAForOther || strings?.other
                          }
                          source={
                            item.logo ? { uri: item.logo } : imagePath?.PlusIcon
                          }
                          button={{
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,
                            borderStyle: "dashed",
                            margin: moderateScale(5),
                            width: width / 3.7,
                          }}
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
                        />
                      )}
                    </>
                  )}
                />
              )}
            </View>

            {itemsData?.otherFieldCondition && (
              <TextInputStretch
                isFocused={textInputFocused} // used for opening keyboard and showing input box at the same time
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
      <CommonButton
        mainContainer={styles.commonButtonContainer}
        isLoading={isLoading}
        // onPress={() => updatedAnswer(updateAnswerRequest(data))}
        onPress={() => (isLoading ? null : onPress())}
        btnName={
          getMainHeaderByCategoryName(parentObj?.stepName)?.CTAButton ||
          strings?.save
        }
      />
    </View>
  );
};

export default ActivityPreferences;

const styles = StyleSheet.create({
  flatListContentContainer: {
    // gap: moderateScale(15),
    marginBottom: moderateScale(20),
    flexWrap: "wrap",
  },
  flatList: {
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(19),
  },
  columnWrapper: {
    // justifyContent: "space-between",
  },
  textInputStretch: {
    marginHorizontal: moderateScale(19),
    borderRadius: moderateScale(15),
    marginTop: moderateScale(15),
  },
  commonButtonContainer: {
    width: "auto",
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
  },
});
