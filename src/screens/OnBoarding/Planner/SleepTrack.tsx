import { ImageBackground, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import Slider from "@react-native-community/slider";
import ImagePickerWithText from "./ImagePickerWithText";

const SleepTrack = ({ allValue, answerData, sendAnser, indexItem }: any) => {
  console.log("=SleepTrack=>>", allValue);
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
        indexId: 5,
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
  const onSliderChange = (val: any, isIncrement: any) => {
    const index = val.toFixed() - 1;
    if (index >= 0 && index <= 4) {
      setIdx(index);
    }
  };

  return (
    <>
      <ImageBackground>
        <Text style={styles?.questionText}>{allValue?.stepName}</Text>
        <Slider
          style={{ height: 40 }}
          minimumValue={0}
          maximumValue={5}
          minimumTrackTintColor="#FF9D48"
          maximumTrackTintColor="#CBE2D1"
          thumbTintColor={"#FF9D48"}
          onValueChange={(val) => onSliderChange(val, true)}
          value={idx + 1}
        />

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
          flatMainContainer={styles?.flatMainContainer}
          imageStyle={styles?.imageStyle}
          indexItem={indexItem}
        />
      </ImageBackground>
    </>
  );
};

export default SleepTrack;

const styles = StyleSheet.create({
  questionText: {
    fontWeight: "500",
    fontSize: textScale(25),
    color: colors?.SurfCrest,
    textAlign: "center",
    alignSelf: "center",
    width: "87%",
  },
  flatMainContainer: {
    width: moderateScale(119.12),
    height: moderateScale(119.12),
  },
  imageStyle: {
    width: moderateScale(120),
    height: moderateScale(120),
  },
});
