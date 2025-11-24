import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import AnswerTitle from "./AnswerTitle";
import { styles } from "./styles";
import ProficiencyLevelList from "./ProficiencyLevelList";
import { height, moderateScale, textScale, width } from "../../../../constant/responsiveStyle";
import CommonButton from "../../../../components/Buttons/commonButton";
import { imagePath } from "../../../../assets/png/imagePath";
import colors from "../../../../constant/colors";

const DifficultyLevel = ({ title, onPress, quesData }: any) => {
  console.log("title, onPress ,quesData",title, onPress ,quesData);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  let targetProfiencyLevelData = [
    {
      image: imagePath?.beginner,
      title: "Too Easy",
    },
    {
      image: imagePath?.Intermediate,
      title: "Too Hard",
    },
    {
      image: imagePath?.Advance,
      title: "Just Right",
    },
  ];
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Text style={styles.titleHeader}>{title.stepName}</Text>
      <AnswerTitle title={"Select any"} />
      {/* <ProficiencyLevelList onPress={() => {}} /> */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: moderateScale(30) }}>
        {quesData.map((item, index) => {
          return (
            <TouchableOpacity
              style={{
                // height: 100,
                width: width/3,
backgroundColor:'red',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "white",
                margin: moderateScale(16),
                marginStart: 0,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                // backgroundColor:
                //   selectedIndex === index ? colors?.polishedPine : "transparent",
              }}
              onPress={() => {
                onPress(item.title);
                setSelectedIndex(index);
              }}
            >
              <Image
                source={ imagePath?.Intermediate}
                style={{
                  marginBottom: moderateScale(10),
                }}
                resizeMode='contain'
              />
              <Text
                style={{
                  fontSize: textScale(10),
                  fontWeight: "700",
                  color: "white",
                }}
              >
                {item?.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ height: height / 2, justifyContent: 'flex-end' }}>
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

export default DifficultyLevel;
