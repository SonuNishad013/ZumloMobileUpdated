import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import CommonBoxButton from "../../../components/Buttons/commonBoxButton";
import ImagePickerWithText from "./ImagePickerWithText";
import { emojiIconData, emojiIconData2 } from "../../../constant/fileConstant";

interface Props {
  allValue?: any;
  answerData?: any;
  sendAnser?: any;
}
const ActivityStats: React.FC<Props> = ({
  allValue,
  answerData,
  sendAnser,
}) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    previosidx();
  }, []);
  const previosidx = () => {
    let stepFieldOptions = allValue?.stepFields[0]?.stepFieldOptions;
    let index = stepFieldOptions?.findIndex(
      (elem: any) => elem.optionID == sendAnser?.optionId
    );
    if (index != -1) {
      setIdx(index ? index : 0);
    }
  };
  useEffect(() => {
    if (allValue !== undefined) {
      answerData({
        indexId: 1,
        answer: {
          stepId: allValue?.stepID,
          optionId: allValue?.stepFields[0]?.stepFieldOptions[idx]?.optionID,
        },
      });
    }
  }, [idx, allValue]);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = (isIncrement: boolean) => {
    setIsLoading(true);
    if (isIncrement) {
      setIdx((prevIndex) => prevIndex + 1);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    } else {
      setIdx((prevIndex) => prevIndex - 1);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };
  const renderItems = (item: any, index: any) => {
    return (
      <View style={styles?.flatListMainContainer}>
        <CommonBoxButton
          SvgIcon={item?.icon}
          mainContainer={{
            backgroundColor:
              index === idx ? colors?.royalOrange : "rgba(255, 255, 255, 0.7)",
            height: index === idx ? moderateScale(71) : moderateScale(57),
            width: index === idx ? moderateScale(71) : moderateScale(57),
            borderRadius: index === idx ? moderateScale(10) : moderateScale(0),
            opacity: index == idx ? 1 : 0.5,
            borderRightWidth: index == idx ? 0 : 1,
            borderColor: colors?.white,
            borderBottomStartRadius: index === 0 || index === idx ? 10 : 0,
            borderTopStartRadius: index === 0 || index === idx ? 10 : 0,
            borderBottomEndRadius: index === 4 || index === idx ? 10 : 0,
            borderTopEndRadius: index === 4 || index === idx ? 10 : 0,
          }}
          onPress={() => {
            setIdx(index);
          }}
        />
      </View>
    );
  };
  return (
    <>
      <Text style={styles?.questionText}>{allValue?.stepName}</Text>
      <ImagePickerWithText
        loader={isLoading}
        dataFlatList={allValue?.stepFields[0]?.stepFieldOptions}
        title={allValue?.stepFields[0]?.stepFieldOptions[idx]?.title}
        image={allValue?.stepFields[0]?.stepFieldOptions[idx]?.logo}
        optionLabel={
          allValue?.stepFields[0]?.stepFieldOptions[idx]?.optionLabel
        }
        index={idx}
        handleButtonClick={handleButtonClick}
        flatMainContainer={{
          width: moderateScale(250),
        }}
        touchableOpacityStyle={{
          width: moderateScale(250),
          alignItems: "center",
        }}
      />
      <FlatList
        scrollEnabled={false}
        data={emojiIconData2}
        keyExtractor={(item, index) => "key" + index}
        style={{ alignSelf: "center" }}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles?.contentContainerStyle}
        renderItem={({ item, index }: any) => renderItems(item, index)}
      />
    </>
  );
};

export default ActivityStats;

const styles = StyleSheet.create({
  contentContainerStyle: { alignItems: "center" },
  flatListMainContainer: { marginTop: moderateScale(40) },
  questionText: {
    fontWeight: "600",
    fontSize: textScale(25),
    color: colors?.SurfCrest,
    textAlign: "center",
    alignSelf: "center",
    width: "87%",
  },
});
