import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AnswerTitle from "./AnswerTitle";
import { styles } from "./styles";
import ProficiencyLevelList from "./ProficiencyLevelList";
import { moderateScale } from "../../../../constant/responsiveStyle";
import CommonButton from "../../../../components/Buttons/commonButton";
import colors from "../../../../constant/colors";

const TimeCommitment = ({ title, onPress }: any) => {
  const [learningIndex, setLearningIndex] = useState(-1);
  const PickAnswer = [
    { title: "Required more time than I can commit" },
    { title: "Fit well into my schedule" },
    { title: "Had too little activity" },
  ];
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Text style={styles.titleHeader}>{title}</Text>

      <AnswerTitle title={"Select any"} />
      <FlatList
        contentContainerStyle={{ gap: moderateScale(15) }}
        data={PickAnswer}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item, index }) => {
          return (
            <CommonButton
              btnName={item?.title}
              onPress={() => {
                setLearningIndex(index);
              }}
              btnNameStyle={{ textAlign: "left" }}
              mainContainer={{
                borderWidth: 1,
                borderColor: colors?.SurfCrest,
                borderRadius: moderateScale(16),
                paddingHorizontal: moderateScale(15),
                justifyContent: "flex-start",
                width: "100%",
                backgroundColor:
                  index == learningIndex ? colors?.polishedPine : "transparent",
              }}
            />
          );
        }}
      />
      <View style={{ marginBottom: moderateScale(10) }}>
        <CommonButton
          btnName={"NEXT"}
          mainContainer={styles.buttonContainer}
          onPress={() => {
            onPress();
          }}
        />
      </View>
    </View>
  );
};

export default TimeCommitment;
