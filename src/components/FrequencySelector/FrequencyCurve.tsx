import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { formatSentenceCase } from "../../helper/sentenceCase";

const { width } = Dimensions.get("screen");

interface Props {
  data: any;
  onValueChange: (index: number | null, value: string | null) => void;
}

const FrequencyCurve: React.FC<Props> = ({ data, onValueChange }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(
    data?.findIndex((itm: any) => itm?.isSelected === true) ?? null
  );
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    if (data) {
      console.log("datadatadatadata===>>>", data);
      setOptions(data);
      const selectedIndex = data?.findIndex(
        (itm: any) => itm?.isSelected === true
      );
      setSelectedOption(selectedIndex);
      setSelectedValue(
        selectedIndex !== -1 ? data[selectedIndex]?.optionValue : null
      );
    }
  }, [data]);
  // data refresing everytime it will refresh only when index is changed.
  useEffect(() => {
    onValueChange(selectedOption, selectedValue);
  }, [selectedOption]);
  // }, [selectedOption, selectedValue]);

  const heightAdjustment = 12;
  const optionWidth =
    options?.length > 1 ? width / (options?.length - 1) : width;
  let curvePath = "";

  options.forEach((option: any, index: number) => {
    const x = index * optionWidth;
    const y = option.isSelected ? 50 - heightAdjustment : 50;

    if (index === 0) {
      curvePath = `M ${x} ${y}`;
    } else {
      const prevX = (index - 1) * optionWidth;
      const prevY = options[index - 1].isSelected ? 50 - heightAdjustment : 50;

      const controlX1 = prevX + (x - prevX) / 3;
      const controlY1 = prevY;
      const controlX2 = prevX + ((x - prevX) * 2) / 3;
      const controlY2 = y;

      curvePath += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x} ${y}`;
    }
  });

  const handleOptionPress = (index: number) => {
    setSelectedOption(index);
    setSelectedValue(options[index].optionValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.svgContainer}>
        <Svg width={width} height="90" viewBox={`0 0 ${width} 100`}>
          <Path
            d={curvePath}
            stroke="lightgray"
            strokeWidth="2"
            fill={colors?.transparent}
          />
        </Svg>
      </View>

      {selectedOption !== null && (
        <View style={styles?.selectedOptionContainer}>
          <Text style={styles?.selectedOptionText}>
            {selectedValue ?? "No value selected"}
          </Text>
        </View>
      )}

      <View style={styles.optionsContainer}>
        {options?.map((option: any, index: number) => (
          <View key={option.id}>
            <TouchableOpacity
              style={{
                height: moderateScale(50),
                justifyContent: "flex-end",
                bottom: moderateScale(40),
              }}
              onPress={() => handleOptionPress(index)}
            >
              <View
                style={[
                  styles.optionCircle,
                  { opacity: option?.isSelected ? 1 : 0 },
                ]}
              />
              <Text style={styles.optionText}>
                {formatSentenceCase(option?.optionValue)}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: moderateScale(19),
    height: moderateScale(150),
    marginTop: moderateScale(25),
  },
  svgContainer: {
    height: moderateScale(60),
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  optionCircle: {
    height: moderateScale(7),
    width: moderateScale(7),
    backgroundColor: colors.SurfCrest,
    position: "absolute",
    bottom: moderateScale(20),
    borderRadius: moderateScale(5),
    alignSelf: "center",
  },
  optionText: {
    fontSize: textScale(10),
    color: colors.SurfCrest,
  },
  selectedOptionContainer: {
    position: "absolute",
    bottom: moderateScale(130),
    borderRadius: moderateScale(5),
    backgroundColor: colors.royalOrange,
    width: "auto",
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(7),
    alignItems: "center",
    justifyContent: "center",
  },
  selectedOptionText: {
    color: colors.prussianBlue,
    fontWeight: "400",
    fontSize: textScale(14),
  },
});

export default FrequencyCurve;
