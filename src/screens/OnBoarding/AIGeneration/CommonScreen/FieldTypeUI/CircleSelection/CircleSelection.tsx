import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  moderateScale,
  textScale,
} from "../../../../../../constant/responsiveStyle";
import { ItemSelectedPropsCircle } from "../../../../../../components/OnBoardiingComponents/ItemSelectedPropsCircle";
import colors from "../../../../../../constant/colors";
import { imagePath } from "../../../../../../assets/png/imagePath";
import { singleSelectedByIndex } from "../../Helper/Helper";

interface Props {
  questionValue?: any;
  answerData?: any;
  answerIndex?: any;
}
const CircleSelection: React.FC<Props> = ({
  questionValue,
  answerData,
  answerIndex,
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
        indexId: answerIndex,
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
      <Text style={styles.subtitle}>{questionValue?.stepDescription}</Text>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item, index) => "key" + index}
        style={{
          marginTop: moderateScale(20),
        }}
        renderItem={({ item, index }: any) => {
          return (
            <ItemSelectedPropsCircle
              onPress={() => {
                setData(singleSelectedByIndex(data, index));
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
                height: moderateScale(30),
                width: moderateScale(30),
              }}
              titleStyle={{
                color: item?.isSelected
                  ? colors?.prussianBlue
                  : colors?.SurfCrest,
              }}
              title={item?.title}
              source={imagePath?.OrgBgCurve}
              tintColor={
                item?.isSelected ? colors?.royalOrange : colors?.SaltBox
              }
              iconSource={
                item?.logo ? { uri: item?.logo } : imagePath?.PlusIcon
              }
              tintIconColor={
                item?.isSelected ? colors?.prussianBlue : colors?.SurfCrest
              }
              container={{
                flex:
                  data.length / 2 != 0 || index == data.length - 1 ? 0.5 : 1,
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default CircleSelection;

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

// export default CircleSelection
