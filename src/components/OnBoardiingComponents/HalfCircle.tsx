import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Circle, Svg } from "react-native-svg";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { formatSentenceCase } from "../../helper/sentenceCase";

interface Props {
  data?: any;
  onChangeValue?: any;
}
const HalfCircle: React.FC<Props> = ({ data, onChangeValue }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(() => {
    const index = data?.findIndex((item: any) => item?.isSelected) ?? -1;
    return index !== -1 ? index : data?.length;
  });
  const [stepOptions, setStepOptions] = useState<any>([]);
  useEffect(() => {
    if (!data) return;
    setStepOptions(data);
  }, [data]);

  const handlePress = (index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    onChangeValue(selectedIndex);
  }, [selectedIndex]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Svg height="410" width="410" viewBox="0 0 410 410">
          {/* Increased the radius (r) of the main circle and adjusted cx/cy */}
          <Circle
            cx="200"
            cy="200"
            r="200"
            stroke={colors.SurfCrest}
            fill="none"
          />

          {/* Adjust the positions of the smaller circles */}
          <Circle cx="305" cy="30" r="6" fill={colors.SurfCrest} />
          <Circle cx="376" cy="105" r="6" fill={colors.SurfCrest} />
          <Circle cx="400" cy="200" r="6" fill={colors.SurfCrest} />
          <Circle cx="375" cy="300" r="6" fill={colors.SurfCrest} />
          <Circle cx="295" cy="375" r="6" fill={colors.SurfCrest} />
        </Svg>

        {stepOptions.map((option: any, index: any) => {
          // Dynamically calculate positions based on index if needed
          const positionStyles = getPositionStyles(index);

          return (
            <View key={option.id} style={[styles.label, positionStyles]}>
              <TouchableOpacity onPress={() => handlePress(index)}>
                <Text
                  style={[
                    styles.labelText,
                    selectedIndex === index && styles.selectedItem,
                  ]}
                >
                  {formatSentenceCase(option.optionValue)}
                </Text>
                <Text style={[styles.labelText, { fontSize: textScale(10) }]}>
                  {formatSentenceCase(option?.optionLabel)}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default HalfCircle;

// Function to dynamically get position styles based on index
const getPositionStyles = (index: number) => {
  const positions = [
    { top: 10, left: 350 },
    { top: 90, left: 410 },
    { top: 190, left: 430 },
    { top: 290, left: 400 },
    { top: 360, left: 320 },
  ];
  return positions[index] || {};
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(50),
  },
  container: {
    position: "relative",
    width: 400,
    height: 400,
    alignItems: "center",
    right: moderateScale(210),
  },
  label: {
    position: "absolute",
    alignItems: "center",
  },
  labelText: {
    fontSize: textScale(14),
    color: colors.SurfCrest,
    textAlign: "center",
    fontWeight: "400",
  },
  selectedItem: {
    color: colors.royalOrange,
    fontSize: textScale(24),
    fontWeight: "700",
  },
});
