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
}

const LineSelection: React.FC<Props> = ({
  questionValue,
  answerData,
  answerIndex,
  isImage,
  ableData,
  isActivityRegeneration = false,
  isMulti = true,
}) => {
  const [data, setData] = useState<any[]>(questionValue?.stepFieldOption || []);
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

  // useEffect(() => {
  //   if (!ableData) return;

  //   const otherText = ableData?.regenerateStepQusOptionAns?.filter(
  //     (itm: any) => itm?.otherDescription
  //   );

  //   if (otherText?.length > 0) {
  //     const newOtherValues: { [key: number]: string } = {};
  //     data.forEach((item, index) => {
  //       if (item?.title === "Other") {
  //         newOtherValues[index] = otherText[0]?.otherDescription ?? "";
  //       }
  //     });
  //     setOtherValues(newOtherValues);
  //   }
  // }, [ableData, data]);

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
    logger("questionValue____", questionValue);
    data.forEach((item, index) => {
      if (item.isSelected) {
        regenerateStepQusOptionAns.push({
          regenerateStepOptionId: item?.stepOptionId,
          otherDescription:
            item?.title === "Other" ? otherValues[index] || null : null,
        });
      }
    });

    if (questionValue !== undefined) {
      answerData({
        indexId: answerIndex,
        answer: {
          regenerateStepId: questionValue?.regenerateStepId,
          regenerateStepQusOptionAns,
        },
      });
    }
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
      <Text style={styles.subtitle}>{questionValue?.stepDescription}</Text>

      {!isActivityRegeneration && (
        <Text style={styles.selectAtLeastOne}>{"Select at least one"}</Text>
      )}

      <FlatList
        data={data.sort((a, b) => {
          if (a.title === "Other") return 1;
          if (b.title === "Other") return -1;
          return a.optionOrder - b.optionOrder;
        })}
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
                    onChangeText={(val) => handleOtherTextChange(val, index)}
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

export default LineSelection;

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
