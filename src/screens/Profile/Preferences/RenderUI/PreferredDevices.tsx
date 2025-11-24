import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import { imagePath } from "../../../../assets/png/imagePath";
import CommonButton from "../../../../components/Buttons/commonButton";
import { strings } from "../../../../constant/strings";
import {
  renderUpdatedStepOptions,
  updateAnswerRequest,
} from "../Helpers/HelperFun";
import LineHeading from "../LineHeading";
import MainHeading from "../MainHeading";
import BoxButtonIcon from "../../../../components/OnBoardiingComponents/BoxButtonIcon";
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
const PreferredDevices: React.FC<Props> = ({
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
                numColumns={3}
                keyExtractor={(item, index) => "key" + index}
                columnWrapperStyle={styles.columnWrapper}
                scrollEnabled={false}
                contentContainerStyle={styles.flatListContentContainer}
                style={styles.flatList}
                renderItem={({ item, index }: any) => (
                  <>
                    {item?.optionValue == strings?.addSpecifications ? (
                      <>
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
                            borderStyle: "dashed",
                          }}
                        />
                      </>
                    ) : (
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
                        }}
                      />
                    )}
                  </>
                )}
              />
            )}
          </View>
        );
      })}
      <CommonButton
        mainContainer={styles.commonButtonContainer}
        isLoading={isLoading}
        btnName={"Save my preferences"}
        // onPress={() => updatedAnswer(updateAnswerRequest(data))}
        onPress={() => (isLoading ? null : onPress())}
      />
    </View>
  );
};

export default PreferredDevices;

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(25),
  },

  commonButtonContainer: {
    width: "auto",
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
  },

  flatListContentContainer: {
    gap: moderateScale(15),
    marginBottom: moderateScale(20),
  },

  columnWrapper: {
    justifyContent: "space-between",
  },
});
