import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import colors from "../../../constant/colors";
import CustomImage from "../../../components/ImageRender";

const DevelopingSkills = ({ onPress, item, selectedData }: any) => {
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
    selectedData(updatedArray);
  };
  return (
    <View style={styles?.container}>
      {data.map((item: any, index: any) => {
        return (
          <TouchableOpacity
            style={[
              styles?.clickableView,
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
              width={moderateScale(22)}
              height={moderateScale(22)}
              isTintColor={false}
              mainContainer={styles?.addBottom}
            />
            <Text style={styles?.codeName}>{item?.codeName}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default DevelopingSkills;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
  },
  clickableView: {
    height: 109,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "white",
    marginTop: moderateScale(16),
    marginHorizontal: moderateScale(16),
    marginStart: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  addBottom: {
    marginBottom: moderateScale(5),
  },
  codeName: {
    fontSize: textScale(10),
    fontWeight: "700",
    color: "white",
  },
});
