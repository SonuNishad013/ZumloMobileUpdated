import React, { FunctionComponent } from "react";
import { ImageBackground, Text, View } from "react-native";
import TimePickerMinutes from "../../../components/OnBoardiingComponents/TimePickerMinutes";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import { imagePath } from "../../../assets/png/imagePath";
import { height } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

interface SleepPatternProps {}

const SleepPattern: FunctionComponent<SleepPatternProps> = () => {
  const handleInputChange = (val: string, idx: number) => {
    // const updateAnswer = [...data];
    // updateAnswer[idx].otherAnswer = val;
    // setData(updateAnswer);
  };
  return (
    // <ScreenWrapper>
    <View style={{}}>
      <ImageBackground
        source={imagePath.DynamicPromptBG}
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: height,
        }}
      >
        <TimePickerMinutes
          value={5}
          onChangesTime={(val: any) => {
            let value = val?.toString();
            // handleInputChange(value, itemIdx);
          }}
        />
      </ImageBackground>
    </View>
    // </ScreenWrapper>
  );
};

export default SleepPattern;
