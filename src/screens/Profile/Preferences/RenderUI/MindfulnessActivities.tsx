import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import CommonButton from "../../../../components/Buttons/commonButton";
import { strings } from "../../../../constant/strings";
import TextInputStretch from "../../../../components/OnBoardiingComponents/TextInputStretch";
import { validateName } from "../../../../validations/validation";
import { imagePath } from "../../../../assets/png/imagePath";
import AddButton from "../../../OnBoarding/WellnessPlan/ReGenerateWellnessPlan/AddButton";
import IconTextButtonWidthDynamic from "../../../../components/OnBoardiingComponents/IconTextButtonWidthDynamic";
import {
  renderUpdatedStepOptions,
  updateAnswerRequest,
  UpdatedStepOtherShow,
} from "../Helpers/HelperFun";
import MainHeading from "../MainHeading";
import LineHeading from "../LineHeading";
import { fieldType } from "../../../../constant/AllGlobalNameConstant";
import { removedPreferresSubHeading } from "../../../../constant/ProfileConstant";
import { formatSentenceCase } from "../../../../helper/sentenceCase";
import { getMainHeaderByCategoryName } from "../../ProfileSectionLabels/HeaderSubHeaderText";
import { textLabelSize } from "../../../../utils/TextConfig";
import { validateQuestionData } from "../../MedicalHistory/RenderUI/AllSelectionComponent/AllSelectionComponent";

interface Props {
  questions?: any;
  parentObject?: any;
  updatedAnswer?: any;
  isLoading?: any;
}

const MindfulnessActivities: React.FC<Props> = ({
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
      {data?.map((itemsData: any, idx: number) => {
        return (
          <View key={idx}>
            {removedPreferresSubHeading?.includes(
              itemsData?.stepName
            ) ? null : (
              <LineHeading questionHeading={itemsData?.stepDescription} />
            )}
            {[fieldType?.multiSelect].includes(itemsData?.fieldType) && (
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
                            setData(renderUpdatedStepOptions(idx, index, data));
                          }}
                          title={formatSentenceCase(item?.optionValue)}
                          isImage={true}
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
                    txt={"Add your own"}
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
        btnName={strings?.save}
        // onPress={() => updatedAnswer(updateAnswerRequest(data))}
        onPress={() => (isLoading ? null : onPress())}
      />
    </View>
  );
};

export default MindfulnessActivities;

const styles = StyleSheet.create({
  flatListContentContainer: {
    gap: moderateScale(15),
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
  },
  newSpecInput: {
    height: moderateScale(125),
    marginTop: moderateScale(10),
  },
});
