import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  titleIndex?: any;
  data: any;
  selectedColor?: string;
  unSelectedColor?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  itemContainerStyle?: ViewStyle;
  selectedTxtColor?: any;
  unSelectedTxtColor?: any;
}

const CustomToggleBar: React.FC<Props> = ({
  titleIndex,
  data,
  selectedColor,
  unSelectedColor,
  containerStyle,
  titleStyle,
  itemContainerStyle,
  selectedTxtColor,
  unSelectedTxtColor,
}) => {
  const [toggleIdx, setToggleIdx] = useState(0);

  const getTitleColor = (index: number) => {
    if (index == toggleIdx) return selectedTxtColor || colors?.SurfCrest;
    else return unSelectedTxtColor || colors?.grey;
  };
  const getDividerColor = (index: number) => {
    if (index == toggleIdx) return selectedColor ?? colors?.royalOrange;
    else return unSelectedColor ?? colors?.SaltBox;
  };

  useEffect(() => {
    titleIndex(toggleIdx);
  }, [toggleIdx]);
  return (
    <View style={[styles.container, containerStyle]}>
      {data?.map((item: any, index: any) => {
        return (
          <TouchableOpacity
            style={[
              styles.touchableOpacity,
              { ...item.containerStyle },
              itemContainerStyle,
            ]}
            activeOpacity={0.8}
            onPress={() => setToggleIdx(index)}
            key={"key" + index}
          >
            <Text
              style={[
                styles.text,
                {
                  color: getTitleColor(index),
                },
                titleStyle,
              ]}
            >
              {item?.title}
            </Text>
            <View
              style={[
                styles.divider,
                {
                  backgroundColor: getDividerColor(index),
                },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomToggleBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(30),
  },
  touchableOpacity: {
    // flex: 1,
    justifyContent: "flex-end",
  },
  text: {
    fontSize: textScale(14),
    alignSelf: "center",
    fontWeight: "400",
    paddingBottom: moderateScale(12),
  },
  divider: {
    height: moderateScale(1.5),
  },
});
