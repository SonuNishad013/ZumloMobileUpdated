import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import CommonBoxButton from "../../../components/Buttons/commonBoxButton";
import ImagePickerWithText from "./ImagePickerWithText";
import { emojiIconDataReverse } from "../../../constant/fileConstant";

const StressLevel = ({ allValue, answerData, sendAnser }: any) => {
  const [idx, setIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
        indexId: 4,
        answer: {
          stepId: allValue?.stepID,
          optionId: allValue?.stepFields[0]?.stepFieldOptions[idx]?.optionID,
        },
      });
    }
  }, [idx, allValue]);
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
  // const onViewableItemsChanged = ({ viewableItems, changed }: any) => {
  //   let visibleIndex = viewableItems[0]?.index;
  //   if (visibleIndex >= 0) setIdx(visibleIndex);
  // };

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
          onPress={() => setIdx(index)}
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
      // onViewableItemsChanged={onViewableItemsChanged}
      />
      <FlatList
        scrollEnabled={false}
        data={emojiIconDataReverse}
        style={{ alignSelf: "center" }}
        horizontal
        keyExtractor={(item, index) => "key" + index}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles?.contentContainerStyle}
        renderItem={({ item, index }: any) => renderItems(item, index)}
      />
    </>
  );
};

export default StressLevel;

const styles = StyleSheet.create({
  contentContainerStyle: { alignItems: "center" },
  flatListMainContainer: { marginTop: moderateScale(25) },
  questionText: {
    fontWeight: "500",
    fontSize: textScale(25),
    color: colors?.SurfCrest,
    textAlign: "center",
    alignSelf: "center",
    width: "87%",
  },
});
