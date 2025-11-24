import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { capitalizeFirstLetter } from "../../../validations/capitalizeFirstLetter";
import CustomImage from "../../../components/ImageRender";

const ProficiencyLevelList = ({ onPress, item, setArray }: any) => {
  const [data, setdata] = useState<any>(item);
  const onActivitySelection = (item: any) => {
    data.map((val: any) => {
      val.isSelected = false;
      return { ...val };
    });
    const updatedArray = data.map((val: any) => {
      if (val.globalCodeId === item.globalCodeId) {
        return { ...val, isSelected: !val.isSelected };
      }
      return val;
    });
    setdata(updatedArray);
    setArray(updatedArray);
  };
  return (
    <View style={stylesInternal?.container}>
      {data.map((item: any, index: any) => {
        return (
          <TouchableOpacity
            style={[
              stylesInternal?.clickView,
              {
                backgroundColor: item.isSelected
                  ? colors?.polishedPine
                  : colors?.transparent,
              },
            ]}
            onPress={() => onActivitySelection(item)}
          >
            <CustomImage
              source={{ uri: item.imageURL }}
              width={moderateScale(30)}
              height={moderateScale(30)}
              isTintColor={false}
              mainContainer={stylesInternal?.addBottom}
            />
            <Text style={stylesInternal?.firstLetterStyle}>
              {capitalizeFirstLetter(item?.codeName)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ProficiencyLevelList;

const stylesInternal = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
  },
  clickView: {
    height: 109,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "white",
    margin: moderateScale(16),
    marginStart: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  addBottom: {
    marginBottom: moderateScale(10),
  },
  firstLetterStyle: {
    fontSize: textScale(10),
    fontWeight: "700",
    color: colors.SurfCrest,
  },
});
