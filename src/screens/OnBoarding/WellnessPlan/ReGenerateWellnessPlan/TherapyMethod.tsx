import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AnswerTitle from "./AnswerTitle";
import { styles } from "./styles";
import ProficiencyLevelList from "./ProficiencyLevelList";
import { height, moderateScale } from "../../../../constant/responsiveStyle";
import CommonButton from "../../../../components/Buttons/commonButton";
import colors from "../../../../constant/colors";

const TherapyMethod = ({ title, onPress, quesData }: any) => {
  const [learningIndex, setLearningIndex] = useState(1);
  const PickAnswer = quesData;
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Text style={styles.titleHeader}>{title.stepName}</Text>

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
      <View
        style={{
          marginBottom: moderateScale(10),
          height: height / 2.4,
          justifyContent: "flex-end",
        }}
      >
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

export default TherapyMethod;
