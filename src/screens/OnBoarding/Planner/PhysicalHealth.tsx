import { StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import ImagePickerWithText from "./ImagePickerWithText";

interface Props {
  allValue?: any;
  navigation?: any;
  answerData?: any;
  sendAnser?: any;
}
const PhysicalHealth: React.FC<Props> = ({
  allValue,
  answerData,
  sendAnser,
}) => {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    previosSelected();
  }, []);

  const previosSelected = () => {
    let stepFieldOptions = allValue?.stepFields[0]?.stepFieldOptions;
    let index = stepFieldOptions?.findIndex(
      (elem: any) => elem.optionID == sendAnser?.optionId
    );
    if (index != -1) {
      setIdx(index ? index : 0);
      setSelected(index ? index : 0);
    }
  };

  useEffect(() => {
    if (allValue !== undefined) {
      answerData({
        indexId: 2,
        answer: {
          stepId: allValue?.stepID,
          optionId:
            allValue?.stepFields[0]?.stepFieldOptions[selected]?.optionID,
        },
      });
    }
  }, [allValue, selected]);

  const handleButtonClick = (isIncrement: boolean) => {
    setIsLoading(true);
    if (isIncrement) {
      setIdx((prevIndex) => prevIndex + 1);
      setSelected((prevIndex) => prevIndex + 1);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    } else {
      setIdx((prevIndex) => prevIndex - 1);
      setSelected((prevIndex) => prevIndex - 1);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };
  // const onViewableItemsChanged = ({ viewableItems, changed }: any) => {
  //   let visibleIndex = viewableItems[0]?.index;
  //   if (visibleIndex >= 0) setIdx(visibleIndex);
  // };

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
        // flatMainContainer={styles?.flatMainContainer}
        // imageStyle={styles?.imageStyle}
        mainContainer={{ marginTop: moderateScale(50) }}
        flatMainContainer={{
          width: moderateScale(200),
          height: moderateScale(200),
        }}
        imageStyle={{
          width: moderateScale(150),
          height: moderateScale(150),
        }}
        touchableOpacityStyle={{
          width: moderateScale(200),
          height: moderateScale(200),
          justifyContent: "center",
          alignItems: "center",
          borderRadius: moderateScale(100),
          borderWidth: idx == selected ? moderateScale(3) : moderateScale(0),
          borderColor: colors?.SurfCrest,
        }}
        touchableOpacityOnpress={() => setSelected(idx)}
      />
    </>
  );
};
export default PhysicalHealth;
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
    width: moderateScale(190),
    height: moderateScale(190),
  },
  imageStyle: {
    width: moderateScale(190),
    height: moderateScale(190),
  },
});
