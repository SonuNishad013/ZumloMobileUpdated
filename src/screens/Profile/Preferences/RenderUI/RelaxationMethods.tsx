import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import { ItemSelectedLine } from "../../../../components/OnBoardiingComponents/ItemSelectedLine";
import { validateName } from "../../../../validations/validation";
import TextInputStretch from "../../../../components/OnBoardiingComponents/TextInputStretch";
import AddButton from "../../../OnBoarding/WellnessPlan/ReGenerateWellnessPlan/AddButton";
import CommonButton from "../../../../components/Buttons/commonButton";
import { strings } from "../../../../constant/strings";
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
import logger from "../../../../constant/logger";
import { validateQuestionData } from "../../MedicalHistory/RenderUI/AllSelectionComponent/AllSelectionComponent";

interface Props {
  questions?: any;
  parentObject?: any;
  updatedAnswer?: any;
  isLoading?: any;
}
const RelaxationMethods: React.FC<Props> = ({
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
  }, [questions, parentObject, data]);
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
      {data?.map((itemsData: any, idx: any) => {
        logger("itemsData___", itemsData?.stepDescription);
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
                                renderUpdatedStepOptions(idx, index, data)
                              );
                            }}
                            title={formatSentenceCase(item?.optionValue)}
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
                            // source={item?.logo}
                            tintIconColor={
                              item?.isSelected
                                ? colors?.royalOrange
                                : colors?.SurfCrest
                            }
                            source={item?.logo}
                          />
                        )}
                        {item?.optionValue === strings?.addSpecifications && (
                          <AddButton
                            containerStyle={[
                              styles.addButtonContainer,
                              {
                                backgroundColor: item?.isSelected
                                  ? colors?.polishedPine
                                  : colors?.transparent,
                                borderColor: item?.isSelected
                                  ? colors?.SurfCrest
                                  : colors?.royalOrange,
                              },
                            ]}
                            txt={strings?.other}
                            textStyle={{
                              color: item?.isSelected
                                ? colors?.SurfCrest
                                : colors?.royalOrange,
                            }}
                            tintColor={
                              item?.isSelected
                                ? colors?.SurfCrest
                                : colors?.royalOrange
                            }
                            onPress={() => {
                              setData(UpdatedStepOtherShow(idx, index, data));
                              setTextInputFocused(
                                textInputFocused === "False" ? "True" : "False"
                              );
                            }}
                          />
                        )}
                      </>
                    );
                  }}
                />
              </>
            )}
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
        // onPress={funAnswer}
        onPress={() => (isLoading ? null : onPress())}
      />
    </View>
  );
};

export default RelaxationMethods;

const styles = StyleSheet.create({
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
  textInputStretch: {
    marginHorizontal: moderateScale(19),
    borderRadius: moderateScale(15),
    marginTop: moderateScale(15),
  },
  spreader: {
    flex: 1,
    height: moderateScale(0.9),
    backgroundColor: colors?.surfCrustOp,
  },
});
