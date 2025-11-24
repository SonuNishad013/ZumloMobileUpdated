import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { imagePath } from "../../assets/png/imagePath";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { ItemSelectedPropsCircle } from "./ItemSelectedPropsCircle";

interface Props {}
const PortionSizes: React.FC<Props> = () => {
  const data = [
    {
      title: "Small",
      icon: imagePath?.RecipeIcon,
      isSelected: false,
    },
    {
      title: "Medium",
      icon: imagePath?.RecipeIcon,
      isSelected: false,
    },
    {
      title: "Large",
      icon: imagePath?.RecipeIcon,
      isSelected: false,
    },
  ];

  const getCircleSize = (index: number) => {
    const sizes = [
      { size: moderateScale(110), fontSize: textScale(10), label: "Small" },
      { size: moderateScale(140), fontSize: textScale(14), label: "Medium" },
      { size: moderateScale(170), fontSize: textScale(24), label: "Large" },
    ];
    return sizes[index % sizes.length];
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item, index }) => {
          return (
            <ItemSelectedPropsCircle
              onPress={() => {}}
              innerCircle={{
                borderColor: item?.isSelected
                  ? colors?.transparent
                  : colors?.SurfCrest,
                height: getCircleSize(index).size,
                width: getCircleSize(index).size,
              }}
              imageStyle={{
                tintColor: item?.isSelected
                  ? colors?.prussianBlue
                  : colors?.SurfCrest,
                height: moderateScale(30),
                width: moderateScale(30),
              }}
              titleStyle={{
                color: item?.isSelected
                  ? colors?.prussianBlue
                  : colors?.SurfCrest,
                fontSize: getCircleSize(index).fontSize,
              }}
              title={item?.title}
              source={imagePath?.OrgBgCurve}
              tintColor={
                item?.isSelected ? colors?.royalOrange : colors?.SaltBox
              }
              container={{
                flex: 1,
                marginTop: moderateScale(30),
              }}
              imageBackground={{
                height: getCircleSize(index).size,
                width: getCircleSize(index).size,
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default PortionSizes;

const styles = StyleSheet.create({});
