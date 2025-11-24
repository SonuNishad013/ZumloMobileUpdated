import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import LineSeclectionButton from "../../../../components/OnBoardiingComponents/LineSeclectionButton";
import { imagePath } from "../../../../assets/png/imagePath";
import CommonButton from "../../../../components/Buttons/commonButton";
import { strings } from "../../../../constant/strings";
import AddButton from "../../../OnBoarding/WellnessPlan/ReGenerateWellnessPlan/AddButton";
import TextInputStretch from "../../../../components/OnBoardiingComponents/TextInputStretch";
import { validateName } from "../../../../validations/validation";
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
import { validateQuestionData } from "../../MedicalHistory/RenderUI/AllSelectionComponent/AllSelectionComponent";
interface Props {
  questions?: any;
  parentObject?: any;
  updatedAnswer?: any;
  isLoading?: any;
}
const TherapyMethods: React.FC<Props> = ({
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
        console.log("itemsData?.fieldType=-=-=->", itemsData?.stepName);

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
                  style={styles.flatList}
                  keyExtractor={(item, index) => "key" + index}
                  renderItem={({ item, index }) => (
                    <>
                      {item?.optionValue !== strings?.addSpecifications && (
                        <LineSeclectionButton
                          onPress={() => {
                            setData(renderUpdatedStepOptions(idx, index, data));
                          }}
                          isImage={true}
                          source={
                            item?.logo ? { uri: item?.logo } : imagePath?.People
                          }
                          tintIconColor={
                            // item?.isSelected
                            // ? colors?.polishedPine
                            // :
                            colors?.SurfCrest
                          }
                          mainContainer={{
                            marginRight: moderateScale(8),
                          }}
                          title={formatSentenceCase(item?.optionValue)}
                          touchStyle={{
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,
                          }}
                          textStyle={styles.lineSelectionText}
                          isRightIcon={item?.isSelected ? true : false}
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
                              borderColor: colors?.SurfCrest,
                              alignItems: "center",
                            },
                          ]}
                          txt={formatSentenceCase(strings?.other)}
                          // txt={
                          //   getLineHeaderByStepName(itemsData?.stepName)
                          //     ?.CTAForOther || "Add another "
                          // }
                          textStyle={{
                            color: colors?.SurfCrest,
                          }}
                          tintColor={colors?.SurfCrest}
                          onPress={() => {
                            setData(UpdatedStepOtherShow(idx, index, data));
                            setTextInputFocused(
                              textInputFocused === "False" ? "True" : "False"
                            );
                          }}
                        />
                      )}
                    </>
                  )}
                />
              </>
            )}
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
        btnName={strings?.save}
        // onPress={() => updatedAnswer(updateAnswerRequest(data))}
        onPress={() => (isLoading ? null : onPress())}
      />
    </View>
  );
};

export default TherapyMethods;

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(25),
  },
  addButtonContainer: {
    width: "auto",
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
});
