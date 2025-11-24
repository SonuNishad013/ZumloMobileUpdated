import { StyleSheet, Text, TextInput, View, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AnswerTitle from "./AnswerTitle";
import { styles } from "./styles";
import ProficiencyLevelList from "./ProficiencyLevelList";
import {
  height,
  moderateScale,
  textScale,
} from "../../../../constant/responsiveStyle";
import CommonButton from "../../../../components/Buttons/commonButton";
import colors from "../../../../constant/colors";
import { imagePath } from "../../../../assets/png/imagePath";

const CustomizationNeeds = ({
  title,
  onPress,
  data,
  regenerationStepTypeId,
  currentIndex,
  fieldType,
}: any) => {
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [Index, setIndex] = useState(currentIndex);

  const onNext = () => {
    setCurrentInputValue("");
    onPress(
      regenerationStepTypeId,
      data.regenerateStepId,
      false,
      currentInputValue,
      currentIndex,
      fieldType
    );
  };
  const onChangeText = (text: any) => {
    let filteredText = text.replace(/[^a-zA-Z0-9,.'?!\-&\s]/g, "");
    setCurrentInputValue(filteredText);
  };
  return (
    console.log("currentIndex", currentIndex),
    (
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text style={styles.titleHeader}>{title}</Text>
        <TextInput
          multiline
          style={{
            height: moderateScale(150),
            width: "100%",
            fontSize: textScale(13),
            fontWeight: "400",
            borderWidth: 1,
            padding: moderateScale(20),
            color: colors?.SurfCrest,
            borderColor: colors?.SurfCrest,
            borderRadius: moderateScale(10),
            paddingTop: 20,
            textAlignVertical: "top",
          }}
          placeholder={"Describe here"}
          placeholderTextColor={colors?.SurfCrest}
          value={currentInputValue}
          onChangeText={onChangeText}
        />
        {/* <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginTop: moderateScale(15),
          alignItems: 'center',
          marginHorizontal: moderateScale(15)
        }}
      >
        <Image
          source={imagePath?.infoCircle}
          style={{ width: moderateScale(15), height: moderateScale(15) }}
        />
        <Text
          style={{
            fontSize: textScale(10),
            fontWeight: "400",
            color: colors?.royalOrangeDark,

          }}
        >

          {data?.stepDescription}
        </Text>
      </View> */}
        <View style={{ height: height / 2.5, justifyContent: "flex-end" }}>
          <CommonButton
            btnName={"NEXT"}
            mainContainer={styles.buttonContainer}
            onPress={() => onNext()}
          />
        </View>
      </View>
    )
  );
};

export default CustomizationNeeds;
