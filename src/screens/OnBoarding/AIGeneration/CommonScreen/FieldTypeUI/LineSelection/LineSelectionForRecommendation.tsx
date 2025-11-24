import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  moderateScale,
  textScale,
} from "../../../../../../constant/responsiveStyle";
import AddButton from "../../../../WellnessPlan/ReGenerateWellnessPlan/AddButton";
import {
  multiSelectedByIndex,
  singleSelectedByIndex,
} from "../../Helper/Helper";
import LineSeclectionButton from "../../../../../../components/OnBoardiingComponents/LineSeclectionButton";
import { imagePath } from "../../../../../../assets/png/imagePath";
import colors from "../../../../../../constant/colors";
import TextInputStretch from "../../../../../../components/OnBoardiingComponents/TextInputStretch";
import logger from "../../../../../../constant/logger";

interface Props {
  questionValue?: any;
  answerData?: any;
  answerIndex?: any;
  isImage?: boolean;
  ableData?: any;
  isActivityRegeneration?: any;
  isMulti?: boolean;
  setAnsweredValue: (val: any) => void;
}

const LineSelectionForRecommendation: React.FC<Props> = ({
  questionValue,
  answerData,
  answerIndex,
  isImage,
  ableData,
  isActivityRegeneration = false,
  isMulti = true,
  setAnsweredValue,
}) => {
  logger("questionValue______init", questionValue);
  const [data, setData] = useState<any[]>(
    questionValue?.stepFields[0]?.stepFieldOptions || []
  );
  useEffect(() => {
    setData(questionValue?.stepFields[0]?.stepFieldOptions || []);
  }, [questionValue]);

  const [otherValues, setOtherValues] = useState<{ [key: number]: string }>({});
  useEffect(() => {
    if (!ableData) return;

    const otherText = ableData?.regenerateStepQusOptionAns?.filter(
      (itm: any) => itm?.otherDescription
    );

    if (otherText?.length > 0 && questionValue?.stepFieldOptions) {
      const newOtherValues: { [key: number]: string } = {};

      questionValue.stepFieldOptions.forEach((item: any, index: number) => {
        if (item?.title === "Other") {
          newOtherValues[index] = otherText[0]?.otherDescription ?? "";
        }
      });

      setOtherValues((prev) => {
        const isSame = JSON.stringify(prev) === JSON.stringify(newOtherValues);
        return isSame ? prev : newOtherValues;
      });
    }
  }, [ableData, questionValue]);

  useEffect(() => {
    if (questionValue?.stepFieldOptions) {
      setData(questionValue?.stepFieldOptions);
    }
  }, [questionValue?.stepFieldOptions]);

  useEffect(() => {
    let regenerateStepQusOptionAns: {
      regenerateStepOptionId: any;
      otherDescription: string | null;
    }[] = [];

    if (!data) return;
    data.forEach((item, index) => {
      if (item.isSelected) {
        regenerateStepQusOptionAns.push(item?.optionID);
      }
    });

    if (questionValue !== undefined) {
      answerData({
        indexId: answerIndex,
        answer: {
          regenerateStepId: questionValue?.stepId,
          regenerateStepQusOptionAns,
        },
      });
    }
    setAnsweredValue({
      questionValue: questionValue?.stepFields[0],
    });
  }, [data, otherValues]);

  const handleOtherTextChange = (val: string, index: number) => {
    setOtherValues((prev) => ({
      ...prev,
      [index]: val,
    }));
  };

  const handleSelect = (index: number) => {
    if (isMulti) {
      setData(multiSelectedByIndex(data, index));
    } else {
      setData(singleSelectedByIndex(data, index));
    }
  };

  return (
    <View style={{ marginHorizontal: moderateScale(19) }}>
      <Text style={styles.title}>{questionValue?.stepName}</Text>
      {!isActivityRegeneration && (
        <Text style={styles.selectAtLeastOne}>{"Select at least one"}</Text>
      )}

      <FlatList
        data={data}
        extraData={otherValues}
        keyExtractor={(_, idx) => idx.toString()}
        style={{ marginTop: moderateScale(40) }}
        renderItem={({ item, index }) => (
          <>
            {item?.title === "Other" ? (
              <>
                <AddButton
                  containerStyle={{
                    marginVertical: moderateScale(10),
                    width: "auto",
                  }}
                  txt={"Other"}
                  onPress={() => handleSelect(index)}
                />

                {item?.isSelected && (
                  <TextInputStretch
                    newSpecInputView={{ marginHorizontal: moderateScale(0) }}
                    value={otherValues[index] || ""}
                    onChangeText={(val: any) =>
                      handleOtherTextChange(val, index)
                    }
                  />
                )}
              </>
            ) : (
              <LineSeclectionButton
                onPress={() => handleSelect(index)}
                isImage={isImage}
                source={item?.logo ? { uri: item?.logo } : imagePath?.People}
                title={item?.title}
                touchStyle={{
                  backgroundColor: item?.isSelected
                    ? colors.polishedPine
                    : "transparent",
                }}
                tintIconColor={colors?.SurfCrest}
                mainContainer={{ marginRight: moderateScale(10) }}
                isFormateRequired={false}
              />
            )}
          </>
        )}
      />
    </View>
  );
};

export default LineSelectionForRecommendation;

const styles = StyleSheet.create({
  title: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors.SurfCrest,
    marginTop: moderateScale(15),
  },
  subtitle: {
    fontSize: textScale(13),
    fontWeight: "400",
    color: colors.SurfCrest,
    marginTop: moderateScale(10),
  },
  selectAtLeastOne: {
    fontSize: textScale(13),
    fontWeight: "400",
    color: colors.SurfCrest,
    marginTop: moderateScale(10),
  },
});
