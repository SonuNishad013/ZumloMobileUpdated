import {
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";
import styles from "./styles";

interface Props {
  title?: any;
  titleTextStyle?: TextStyle;
  speedAreaMainContainer?: ViewStyle;
  xStyle?: TextStyle;
  oneToFiveContainer?: ViewStyle;
  flatlistTouchStyle?: ViewStyle;
  valStyle?: TextStyle;
  onPress?: () => void;
  speedDataContainer?: ViewStyle;
  trainingText?: TextStyle;
  WellBeingDis?: any;
}
const SpeedInput: React.FC<Props> = ({
  titleTextStyle,
  speedAreaMainContainer,
  xStyle,
  oneToFiveContainer,
  flatlistTouchStyle,
  speedDataContainer,
  trainingText,
  WellBeingDis,
}) => {
  const [speedValue, setSpeedValue] = useState<any>({});
  const [speedIndex, setSpeedIndex] = useState<number>(0);
  const getData = (index: number, item: any) => {
    setSpeedValue(item);
    setSpeedIndex(index);
  };
  const data = [
    {
      key: 1,
    },
    {
      key: 2,
    },
    {
      key: 3,
    },
    {
      key: 4,
    },
    {
      key: 5,
    },
  ];

  return (
    <View style={[styles?.speedAreaMainContainer, speedAreaMainContainer]}>
      <Text style={[styles?.titleTextStyle, titleTextStyle]}>
        {WellBeingDis}
      </Text>
      <View style={[styles?.speedDataContainer, speedDataContainer]}>
        <Text style={styles?.valTextStyle}>
          {speedIndex + 1}
          <Text style={[styles?.xStyle, xStyle]}>{"X"}</Text>
        </Text>

        <View
          style={[
            styles?.oneToFiveContainer,
            oneToFiveContainer,
            {
              borderColor:
                speedIndex == 2 ? colors?.polishedPine : colors?.royalOrange,
            },
          ]}
        >
          <FlatList
            horizontal
            data={data}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item, index }) => {
              return (
                <View style={styles?.btnContainer}>
                  <TouchableOpacity
                    onPress={() => getData(index, item)}
                    style={[
                      styles?.flatlistTouchStyle,
                      flatlistTouchStyle,
                      {
                        backgroundColor:
                          index === speedIndex
                            ? getBackgroundColor(index)
                            : "transparent",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles?.valStyle,
                        {
                          color:
                            index == speedIndex
                              ? colors?.prussianBlue
                              : colors?.polishedPine,
                        },
                      ]}
                    >
                      {item?.key}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>

        <Text style={[styles?.trainingText, trainingText]}>
          {getText(speedIndex)}
        </Text>
      </View>
    </View>
  );
};

export default SpeedInput;

const getText = (idx: any) => {
  switch (idx) {
    case 0:
      return "I want to start training";
    case 1:
      return "I train 1-2 times a week";
    case 2:
      return "I train 3-5 times a week";
    case 3:
      return "I train 5-7 times a week";
    case 4:
      return "I train more than 7 times a week";
    default:
      return "";
  }
};
const getBackgroundColor = (index: any) => {
  switch (index) {
    case 0:
      return colors?.polishedPine;
    case 1:
      return colors?.SurfCrest;
    case 2:
      return colors?.lightOrange01;
    case 3:
      return colors?.lightOrange;
    case 4:
      return colors?.royalOrange;
    default:
      return "";
  }
};
