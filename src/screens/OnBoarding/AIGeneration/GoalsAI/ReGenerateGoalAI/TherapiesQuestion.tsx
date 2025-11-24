import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";
import { ItemSelectedLine } from "../../../../../components/OnBoardiingComponents/ItemSelectedLine";
import AddButton from "../../../WellnessPlan/ReGenerateWellnessPlan/AddButton";
import { validateName } from "../../../../../validations/validation";
import { multiSelectedByIndex } from "../../CommonScreen/Helper/Helper";
import TextInputStretch from "../../../../../components/OnBoardiingComponents/TextInputStretch";
import { strings } from "../../../../../constant/strings";

interface Props {
  questionValue?: any;
  answerData?: any;
  questionIndex?: any;
}
const TherapiesQuestion: React.FC<Props> = ({
  questionValue,
  answerData,
  questionIndex,
}) => {
  const [data, setData] = useState<any>(questionValue?.stepFieldOption);
  const [otherValue, setOtherValue] = useState("");
  const [otherField, setOtherField] = useState(false);

  useEffect(() => {
    if (questionValue?.stepFieldOptions != undefined) {
      setData(questionValue?.stepFieldOptions);
    }
  }, [questionValue?.stepFieldOptions]);
  useEffect(() => {
    let regenerateStepQusOptionAns = [];
    if (data == undefined) return;
    for (let item of data) {
      if (item.isSelected)
        regenerateStepQusOptionAns.push({
          regenerateStepOptionId: item?.stepOptionId,
          otherDescription: item?.title == "Other" ? otherValue : null,
        });
    }
    if (questionValue !== undefined) {
      answerData({
        indexId: questionIndex,
        answer: {
          regenerateStepId: questionValue?.regenerateStepId,
          regenerateStepQusOptionAns,
        },
      });
    }
  }, [data, otherValue]);

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item, index) => "key" + index}
        ListHeaderComponent={() => {
          return (
            <>
              <Text style={styles.title}>{questionValue?.stepName}</Text>
              <Text style={styles.subtitle}>{"Select at least one"}</Text>
            </>
          );
        }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                height: moderateScale(0.9),
                backgroundColor: colors?.surfCrustOp,
              }}
            />
          );
        }}
        renderItem={({ item, index }: any) => {
          return (
            <>
              {item?.title == "Other" ? (
                <>
                  {item?.isSelected ? (
                    setOtherField(true)
                  ) : (
                    <AddButton
                      containerStyle={{
                        marginVertical: moderateScale(20),
                        marginHorizontal: moderateScale(19),
                        width: "auto",
                      }}
                      txt={"Other"}
                      onPress={() => {
                        setData(multiSelectedByIndex(data, index));
                      }}
                    />
                  )}
                </>
              ) : (
                <ItemSelectedLine
                  onPress={() => {
                    setData(multiSelectedByIndex(data, index));
                  }}
                  title={item?.title}
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
                  source={item?.logo}
                  tintIconColor={
                    item?.isSelected ? colors?.royalOrange : colors?.SurfCrest
                  }
                />
              )}
            </>
          );
        }}
      />
      {otherField && (
        <TextInputStretch
          value={otherValue}
          onChangeText={(val: any) => {
            if (validateName(val)) {
              setOtherValue(val);
            }
          }}
        />
      )}
    </>
  );
};

export default TherapiesQuestion;

const styles = StyleSheet.create({
  title: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginTop: moderateScale(15),
    marginHorizontal: moderateScale(19),
  },
  subtitle: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(19),
  },
});
