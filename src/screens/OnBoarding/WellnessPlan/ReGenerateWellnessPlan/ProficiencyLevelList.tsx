import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { imagePath } from "../../../../assets/png/imagePath";
import colors from "../../../../constant/colors";

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

const ProficiencyLevelList = ({ onPress }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <View style={{ flexDirection: "row", alignSelf: "center" }}>
      {targetProfiencyLevelData.map((item, index) => {
        return (
          <TouchableOpacity
            style={{
              height: 109,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "white",
              margin: moderateScale(16),
              marginStart: 0,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              backgroundColor:
                selectedIndex === index ? colors?.polishedPine : "transparent",
            }}
            onPress={() => {
              onPress(item.title);
              setSelectedIndex(index);
            }}
          >
            <Image
              source={item?.image}
              style={{
                marginBottom: moderateScale(10),
              }}
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
  );
};

export default ProficiencyLevelList;
