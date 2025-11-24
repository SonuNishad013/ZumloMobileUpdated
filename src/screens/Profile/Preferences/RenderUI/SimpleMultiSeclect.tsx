import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import LineSeclectionButton from "../../../../components/OnBoardiingComponents/LineSeclectionButton";
import { imagePath } from "../../../../assets/png/imagePath";
import CommonButton from "../../../../components/Buttons/commonButton";
import { strings } from "../../../../constant/strings";
import TextInputStretch from "../../../../components/OnBoardiingComponents/TextInputStretch";
import { validateName } from "../../../../validations/validation";
import {
  renderUpdatedStepOptions,
  renderUpdatedStepOptionsSingle,
  updateAnswerRequest,
} from "../Helpers/HelperFun";
import LineHeading from "../LineHeading";
import MainHeading from "../MainHeading";
import { fieldType } from "../../../../constant/AllGlobalNameConstant";
import { AlertCircle } from "../../../../assets";
import IconTextButtonWidthDynamic from "../../../../components/OnBoardiingComponents/IconTextButtonWidthDynamic";
import { removedPreferresSubHeading } from "../../../../constant/ProfileConstant";
import { formatSentenceCase } from "../../../../helper/sentenceCase";
import { getMainHeaderByCategoryName } from "../../ProfileSectionLabels/HeaderSubHeaderText";
import { textLabelSize } from "../../../../utils/TextConfig";
import logger from "../../../../constant/logger";
import { getLineHeaderByStepName } from "../../ProfileSectionLabels/LineTextAddOtherCTA";
import { validateQuestionData } from "../../MedicalHistory/RenderUI/AllSelectionComponent/AllSelectionComponent";

interface Props {
  questions?: any;
  parentObject?: any;
  updatedAnswer?: any;
  isLoading?: any;
}
const SimpleMultiSeclect: React.FC<Props> = ({
  questions,
  parentObject,
  updatedAnswer,
  isLoading,
}) => {
  const [data, setData] = useState<any>(questions);
  const [parentObj, setParentObj] = useState<any>(parentObject);

  useEffect(() => {
    if (questions !== data || parentObject !== parentObj) {
      setData(questions);
      setParentObj(parentObject);
    }
  }, [questions, parentObject, data]);

  const funAnswer = () => {
    updatedAnswer(updateAnswerRequest(data));
  };
  const handleInputChange = (val: string, idx: number) => {
    if (validateName(val)) {
      const updateAnswer = [...data];
      updateAnswer[idx].otherAnswer = val;
      setData(updateAnswer);
    }
  };

  const saveButtonPress = () => {
    logger("updateAnswerRequest______", {
      answeredData: updateAnswerRequest(data),
      allQuestions: data,
    });

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
      {data?.map((itemsData: any, idx: any) => {
        logger("label_changes__data_lineQuestion", {
          lineQuestion: data?.map((item: any) => item?.stepDescription),
          mainHeader: parentObj?.stepName,
        });
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
            {[fieldType?.multiSelect].includes(itemsData?.fieldType) && (
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
                            setData(renderUpdatedStepOptions(idx, index, data));
                          }}
                          source={
                            item?.logo ? { uri: item?.logo } : imagePath?.People
                          }
                          title={formatSentenceCase(item?.optionValue)}
                          touchStyle={{
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,
                          }}
                          textStyle={styles.lineSelectionText}
                        />
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
                  keyExtractor={(item, index) => "key" + index}
                  style={styles.flatList}
                  renderItem={({ item, index }) => (
                    <>
                      {item?.optionValue !== strings?.addSpecifications && (
                        <LineSeclectionButton
                          onPress={() => {
                            setData(
                              renderUpdatedStepOptionsSingle(idx, index, data)
                            );
                          }}
                          isImage
                          source={
                            item?.isSelected
                              ? imagePath?.SelectedCircle
                              : imagePath?.UnselectCircle
                          }
                          title={formatSentenceCase(item?.optionValue)}
                          touchStyle={{
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,
                          }}
                          textStyle={styles.lineSelectionText}
                        />
                      )}
                    </>
                  )}
                />
              </>
            )}
            {[fieldType?.dropdown].includes(itemsData?.fieldType) && (
              <>
                <FlatList
                  data={itemsData?.stepOptions}
                  keyExtractor={(item, index) => "key" + index}
                  columnWrapperStyle={styles?.columnWrapperStyle}
                  numColumns={20}
                  scrollEnabled={false}
                  contentContainerStyle={styles.flatListContentContainer}
                  style={styles.flatList}
                  renderItem={({ item, index }: any) => (
                    <IconTextButtonWidthDynamic
                      onPress={() => {
                        setData(
                          renderUpdatedStepOptionsSingle(idx, index, data)
                        );
                      }}
                      title={formatSentenceCase(item?.optionValue)}
                      containerStyle={{
                        backgroundColor: item?.isSelected
                          ? colors?.royalOrange
                          : colors?.transparent,
                        borderColor: item?.isSelected
                          ? colors?.royalOrange
                          : colors?.lightSurfCrest04,
                      }}
                      textStyle={{
                        marginRight: moderateScale(10),
                        marginLeft: moderateScale(5),
                        color: item?.isSelected
                          ? colors?.prussianBlue
                          : colors?.SurfCrest,
                      }}
                    />
                  )}
                />
              </>
            )}
            {[fieldType?.textArea].includes(itemsData?.fieldType) && (
              <>
                <TextInputStretch
                  newSpecInputView={styles.textInputStretch}
                  value={data[idx]?.otherAnswer}
                  onChangeText={(val: any) => handleInputChange(val, idx)}
                  newSpecInput={styles.newSpecInput}
                  placeholder={
                    "Any additional comments or preferences regarding app usability (optional)."
                  }
                />
                {/* <View style={styles.alertContainer}>
                  <AlertCircle
                    height={moderateScale(13)}
                    width={moderateScale(13)}
                    style={styles.alertIcon}
                  />
                  <Text style={styles.alertText}>
                    {`Any additional comments or preferences regarding app usability (optional).`}
                  </Text>
                </View> */}
              </>
            )}
          </View>
        );
      })}
      <CommonButton
        mainContainer={styles.commonButtonContainer}
        isLoading={isLoading}
        btnName={
          getMainHeaderByCategoryName(parentObj?.stepName)?.CTAButton ||
          strings?.save
        }
        // onPress={funAnswer}
        onPress={() => (isLoading ? null : saveButtonPress())}
      />
    </View>
  );
};

export default SimpleMultiSeclect;

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(25),
    gap: moderateScale(10),
  },

  lineSelectionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  lineSelectionText: {
    flex: 1,
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

  newSpecInput: {
    height: moderateScale(125),
    marginTop: moderateScale(10),
  },
  alertContainer: {
    marginTop: moderateScale(5),
    marginHorizontal: moderateScale(19),
    flexDirection: "row",
    justifyContent: "center",
  },
  alertIcon: {
    marginTop: moderateScale(2),
  },
  alertText: {
    fontSize: textScale(10),
    color: colors?.royalOrange,
    fontWeight: "400",
    marginLeft: moderateScale(5),
  },
  flatListContentContainer: {
    gap: moderateScale(15),
  },
  columnWrapperStyle: { flexWrap: "wrap" },
});
