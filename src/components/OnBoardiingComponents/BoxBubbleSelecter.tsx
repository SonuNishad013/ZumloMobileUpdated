import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import DashedSlider from "../Sliders/DashedSlider";
import { strings } from "../../constant/strings";

interface Props {}

const BoxBubbleSelecter: React.FC<Props> = () => {
  const data = [
    { title: "1", isSelected: false },
    { title: "2", isSelected: false },
    { title: "3", isSelected: false },
    { title: "4", isSelected: false },
    { title: "5", isSelected: true },
    { title: "1", isSelected: false },
    { title: "2", isSelected: false },
    { title: "3", isSelected: false },
    { title: "4", isSelected: false },
    { title: "5", isSelected: false },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item, index) => "key" + index}
        scrollEnabled={false}
        contentContainerStyle={styles.sliderContainer}
        renderItem={({ item }) => (
          <DashedSlider
            title={item?.title}
            selected={item?.isSelected}
            dashLine={{
              borderColor: colors?.lightGrey,
            }}
            borderColorSelected={colors?.polishedPine}
          />
        )}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{strings?.low}</Text>
        <Text style={styles.labelText}>{strings?.high}</Text>
      </View>
    </View>
  );
};

export default BoxBubbleSelecter;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(19),
    height: moderateScale(120),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: colors.prussianBlue,
  },
  sliderContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(-10),
    marginBottom: moderateScale(20),
  },
  labelText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors.SurfCrest,
  },
});
