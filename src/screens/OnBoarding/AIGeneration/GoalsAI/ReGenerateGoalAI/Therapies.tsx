import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";
import { imagePath } from "../../../../../assets/png/imagePath";
import { ItemSelectedPropsCircle } from "../../../../../components/OnBoardiingComponents/ItemSelectedPropsCircle";
import { multiSelectedByIndex } from "../../CommonScreen/Helper/Helper";
import { strings } from "../../../../../constant/strings";

interface Props {
  questionValue?: any;
  answerData?: any;
  questionIndex?: any;
}
const Therapies: React.FC<Props> = ({
  questionValue,
  answerData,
  questionIndex,
}) => {
  const [data, setData] = useState<any>(questionValue?.stepFieldOption);
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
          otherDescription: null,
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
  }, [data]);

  return (
    <View
      style={{
        marginHorizontal: moderateScale(19),
      }}
    >
      <Text style={styles.title}>{questionValue?.stepName}</Text>
      <Text style={styles.subtitle}>{strings?.goalsQuestionDes}</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => "key" + index}
        numColumns={2}
        style={{
          marginTop: moderateScale(20),
        }}
        renderItem={({ item, index }: any) => {
          return (
            <ItemSelectedPropsCircle
              onPress={() => {
                setData(multiSelectedByIndex(data, index));
              }}
              innerCircle={{
                borderColor: item?.isSelected
                  ? "transparent"
                  : colors?.SurfCrest,
              }}
              imageStyle={{
                tintColor: item?.isSelected
                  ? colors?.prussianBlue
                  : colors?.SurfCrest,
              }}
              titleStyle={{
                color: item?.isSelected
                  ? colors?.prussianBlue
                  : colors?.SurfCrest,
                fontSize: textScale(10),
              }}
              title={item?.title}
              source={imagePath?.OrgBgCurve}
              tintColor={
                item?.isSelected ? colors?.royalOrange : colors?.SaltBox
              }
              tintIconColor={
                item?.isSelected ? colors?.prussianBlue : colors?.SurfCrest
              }
              iconSource={
                item?.logo ? { uri: item?.logo } : imagePath?.PlusIcon
              }
            />
          );
        }}
      />
    </View>
  );
};

export default Therapies;

const styles = StyleSheet.create({
  title: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginTop: moderateScale(15),
  },
  subtitle: {
    fontSize: textScale(13),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginTop: moderateScale(10),
  },
});
