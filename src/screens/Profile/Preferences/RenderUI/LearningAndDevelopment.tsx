import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, width } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import { imagePath } from "../../../../assets/png/imagePath";
import CommonButton from "../../../../components/Buttons/commonButton";
import { strings } from "../../../../constant/strings";
import TextInputStretch from "../../../../components/OnBoardiingComponents/TextInputStretch";
import { validateName } from "../../../../validations/validation";
import AddButton from "../../../OnBoarding/WellnessPlan/ReGenerateWellnessPlan/AddButton";
import CircleIconText from "../../../../components/OnBoardiingComponents/CircleIconText";
import {
  renderUpdatedStepOptions,
  updateAnswerRequest,
  UpdatedStepOtherShow,
} from "../Helpers/HelperFun";
import LineHeading from "../LineHeading";
import MainHeading from "../MainHeading";
import { fieldType } from "../../../../constant/AllGlobalNameConstant";
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

const LearningAndDevelopment: React.FC<Props> = ({
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
    const addSpecIndex = changesData[idx].stepOptions.findIndex(
      (option: any) => option.optionValue === strings.addSpecifications
    );
    if (addSpecIndex !== -1) {
      setData(UpdatedStepOtherShow(idx, addSpecIndex, changesData));
    }
  };
  const handleInputChange = (val: string, idx: number) => {
    if (validateName(val)) {
      const updateAnswer = [...data];
      updateAnswer[idx].otherAnswer = val;
      setData(updateAnswer);
    }
  };
  const onPress = () => {
    if (validateQuestionData(data)) {
      updatedAnswer(updateAnswerRequest(data));
    }
  };
  return (
    <View>
      {/* <MainHeading heading={parentObj?.stepName} />
       */}
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
      {data?.map((itemsData: any, idx: number) => {
        logger(
          "label_changes_description",
          data?.map((item: any) => item?.stepDescription)
        );
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
                formatingNeeded={false}
              />
            )}
            {[fieldType?.multiSelect].includes(itemsData?.fieldType) && (
              <>
                <FlatList
                  data={itemsData?.stepOptions}
                  numColumns={3}
                  columnWrapperStyle={styles.columnWrapper}
                  scrollEnabled={false}
                  keyExtractor={(item, index) => "key" + index}
                  contentContainerStyle={styles.flatListContentContainer}
                  style={styles.flatList}
                  renderItem={({ item, index }: any) => (
                    <>
                      {item?.optionValue !== strings?.addSpecifications && (
                        <CircleIconText
                          onPress={() => {
                            setData(renderUpdatedStepOptions(idx, index, data));
                          }}
                          title={formatSentenceCase(item?.optionValue)}
                          containerStyle={{
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,
                            borderColor: colors?.SurfCrest,
                            // width: width / 3.7,
                            margin: moderateScale(4),
                            flex: 1,
                          }}
                          imageStyle={{ tintColor: colors?.SurfCrest }}
                          source={item?.logo ? item?.logo : imagePath?.PlusIcon}
                          tintIconColor={colors?.SurfCrest}
                        />
                      )}
                    </>
                  )}
                />
              </>
            )}

            {[fieldType?.textArea].includes(itemsData?.fieldType) && (
              <TextInputStretch
                newSpecInputView={styles.textInputStretch}
                value={data[idx]?.otherAnswer}
                onChangeText={(val: any) => handleInputChange(val, idx)}
                newSpecInput={styles.newSpecInput}
                placeholder={strings?.additionalComments}
                // isTextAlert={true}
              />
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
                    txt={strings?.other}
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
        );
      })}
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

export default LearningAndDevelopment;

const styles = StyleSheet.create({
  flatListContentContainer: {
    gap: moderateScale(15),
    marginBottom: moderateScale(20),
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
  },
  commonButtonContainer: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
    width: "auto",
  },
  addButtonContainer: {
    marginHorizontal: moderateScale(19),
    width: "auto",
  },
  newSpecInput: {
    height: moderateScale(125),
    marginTop: moderateScale(10),
  },
});
