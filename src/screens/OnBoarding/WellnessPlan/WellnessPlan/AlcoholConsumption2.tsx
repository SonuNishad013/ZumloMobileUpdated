import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import CommonButton from "../../../../components/Buttons/commonButton";
import WellnessHeader from "./WellnessHeader";
import CommonVerticalSlider from "../../../../components/CommonVerticalSlider/CommonVerticalSlider";
import { singleSelectedByIndex } from "../../AIGeneration/CommonScreen/Helper/Helper";

const AlcoholConsumption2 = ({
  questionData,
  stepNumber,
  reqData,
  handleVal,
  Val,
}: any) => {
  const [selectedSlider, setSelectedSlider] = useState(Val);
  const [rightSideData, setrightSideData] = useState(
    questionData?.stepFields?.[0]?.stepFieldOptions
  );
  const onNext = (selectedIndex: any, data: any) => {
    let data_ = data
      .map((item: any, index: any) => {
        let data_ = {
          optionID: item.optionID,
          Option: item.title,
        };
        return data_;
      })
      .filter((item: any) => item !== undefined);
    let Selecteddata = data
      .map((item: any, index: any) => {
        if (index == selectedIndex) {
          let data_ = {
            optionID: item.optionID,
            Option: item.title,
          };
          return data_;
        }
      })
      .filter((item: any) => item !== undefined);
    let apiReq = {
      StepId: questionData.stepID,
      "Questions:": questionData.stepName,
      Type: questionData.fieldName,
      Options: data_,
      OptionsAnswer: Selecteddata,
    };
    stepNumber(questionData?.stepNumber + 1);
    reqData(apiReq);
  };

  const questionSelection = () => {
    return (
      <View
        style={{
          marginVertical: moderateScale(20),
          gap: moderateScale(10),
          marginBottom: moderateScale(50),
          marginHorizontal: moderateScale(15),
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: textScale(25),
            color: colors?.SurfCrest,
          }}
        >
          {questionData?.stepName}
        </Text>
        <Text
          style={{
            fontWeight: "400",
            fontSize: textScale(14),
            color: colors?.SurfCrest,
          }}
        >
          {
            "How often do you use tobacco products?\nThis helps me better understand your lifestyle."
          }
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <WellnessHeader
        onBackPress={() => {
          stepNumber(questionData?.stepNumber - 1);
        }}
        headerName={questionData?.fieldName}
      />
      <FlatList
        data={["0"]}
        keyExtractor={(item, index) => "key" + index}
        renderItem={() => {
          return (
            <>
              {questionSelection()}
              <CommonVerticalSlider
                value={selectedSlider}
                min={0}
                max={rightSideData?.length - 1}
                step={1}
                onChange={(value) => {
                  let data = [...rightSideData];
                  let updatedArray = singleSelectedByIndex(data, value);
                  setrightSideData(updatedArray);
                  setSelectedSlider(value);
                  handleVal(value);
                }}
                labels={rightSideData}
                trackColor={colors?.lightSurfCrest34}
                containerStyle={{ alignSelf: "center" }}
                sliderStyle={{ backgroundColor: colors?.transparent }}
                scaleHeight={400}
                scaleWidth={90}
                indicatorStyle={{
                  top: rightSideData?.length - 1 == selectedSlider ? -70 : -35,
                }}
              />
              <CommonButton
                onPress={() => onNext(selectedSlider, rightSideData)}
                btnName={"Next"}
                mainContainer={{
                  alignSelf: "center",
                  marginTop: moderateScale(30),
                }}
              />
            </>
          );
        }}
        contentContainerStyle={{ paddingBottom: moderateScale(30) }}
      />
    </View>
  );
};

export default AlcoholConsumption2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: moderateScale(30),
    width: moderateScale(390),

    borderRadius: moderateScale(33),
  },
  bubbleContainer: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
    backgroundColor: colors?.surfCrustOp,
    alignItems: "center",
    justifyContent: "flex-end",
    borderColor: colors?.royalOrange,
    borderWidth: moderateScale(2),
    marginBottom: moderateScale(45),
    marginLeft: moderateScale(24),
  },
  bubbleText: {
    color: "transparent",
  },
});
