import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import { imagePath } from "../../../../assets/png/imagePath";
import CommonButton from "../../../../components/Buttons/commonButton";
import { strings } from "../../../../constant/strings";
import TextInputStretch from "../../../../components/OnBoardiingComponents/TextInputStretch";
import { validateName } from "../../../../validations/validation";
import { ItemSelectedPropsCircle } from "../../../../components/OnBoardiingComponents/ItemSelectedPropsCircle";
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
const HolisticHealthPractices: React.FC<Props> = ({
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
        return (
          <View key={idx}>
            {removedPreferresSubHeading?.includes(
              itemsData?.stepName
            ) ? null : (
              <LineHeading questionHeading={itemsData?.stepDescription} />
            )}
            {[fieldType?.multiSelect].includes(itemsData?.fieldType) && (
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
                            setData(renderUpdatedStepOptions(idx, index, data));
                          }}
                          innerCircle={{
                            borderColor: item?.isSelected
                              ? colors?.transparent
                              : colors?.SurfCrest,
                            height: moderateScale(140),
                            width: moderateScale(140),
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
                              data?.length / 2 != 0 || index == data?.length - 1
                                ? 0.5
                                : 1,
                          }}
                          tintIconColor={
                            item?.isSelected
                              ? colors?.prussianBlue
                              : colors?.SurfCrest
                          }
                        />
                      )}
                      {item?.optionValue == strings?.addSpecifications && (
                        <ItemSelectedPropsCircle
                          onPress={() => {
                            setData(UpdatedStepOtherShow(idx, index, data));
                            setTextInputFocused(
                              textInputFocused === "False" ? "True" : "False"
                            );
                          }}
                          innerCircle={{
                            borderColor: item?.isSelected
                              ? colors?.transparent
                              : colors?.SurfCrest,
                            borderStyle: "dashed",
                            height: moderateScale(140),
                            width: moderateScale(140),
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
                          title={formatSentenceCase(strings?.other)}
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

export default HolisticHealthPractices;

const styles = StyleSheet.create({
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
