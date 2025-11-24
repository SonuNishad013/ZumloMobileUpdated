import React from "react";
import { View, StyleSheet, Text, ViewStyle, TextStyle } from "react-native";
import { textScale, moderateScale } from "../../constant/responsiveStyle";

export type Props = {
  percent?: any;
  mainContainer?: ViewStyle;
  firstProgressLayerView?: ViewStyle;
  textStyle?: TextStyle;
  bgLinearGreadiantColor?: any;
  innerText?: any;
  activeColor?: any;
  inactiveColor?: any;
};

const CircularProgress: React.FC<Props> = ({
  percent,
  mainContainer,
  firstProgressLayerView,
  textStyle,
  bgLinearGreadiantColor,
  innerText,
  activeColor,
  inactiveColor,
}) => {
  const propStyle = (percent: any, base_degrees: any) => {
    const rotateBy = base_degrees + percent * 3.6;
    return {
      transform: [{ rotateZ: `${rotateBy}deg` }],
      borderRightColor: activeColor,
      borderTopColor: activeColor,
    };
  };
  const renderThirdLayer = (percent: any) => {
    if (percent > 50) {
      return (
        <View
          style={[styles.secondProgressLayer, propStyle(percent - 50, 45)]}
        ></View>
      );
    } else {
      return (
        <View
          style={[
            styles.offsetLayer,
            {
              borderRightColor: inactiveColor,
              borderTopColor: inactiveColor,
            },
          ]}
        ></View>
      );
    }
  };
  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }
  return (
    <View style={[styles.container, { ...mainContainer }]}>
      <View
        style={[
          styles.firstProgressLayer,
          firstProgressLayerStyle,
          { ...firstProgressLayerView },
        ]}
      ></View>
      {renderThirdLayer(percent)}
      <Text style={[styles.percentageText, { ...textStyle }]}>{innerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: moderateScale(220),
    height: moderateScale(220),
    borderWidth: moderateScale(10),
    borderRadius: moderateScale(220),
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'white',
    // borderRadius: 8,
    paddingVertical: moderateScale(45),
    paddingHorizontal: moderateScale(25),
    // width: '100%',
    marginVertical: moderateScale(10),
    elevation: moderateScale(20),
    shadowColor: "rgb(90,61,91)",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  firstProgressLayer: {
    width: moderateScale(220),
    height: moderateScale(220),
    borderWidth: moderateScale(10),
    borderRadius: moderateScale(220),
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    transform: [{ rotateZ: "-135deg" }],
    // borderRightColor: 'red',
    // borderTopColor:'red',
  },
  secondProgressLayer: {
    width: moderateScale(220),
    height: moderateScale(220),
    position: "absolute",
    borderWidth: moderateScale(10),
    borderRadius: moderateScale(220),
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    transform: [{ rotateZ: "45deg" }],
  },
  offsetLayer: {
    width: moderateScale(220),
    height: moderateScale(220),
    position: "absolute",
    borderWidth: moderateScale(10),
    borderRadius: moderateScale(220),
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    // borderRightColor: '#E8E8E8',
    // borderTopColor: '#E8E8E8',
    transform: [{ rotateZ: "-135deg" }],
  },
  percentageText: {
    backgroundColor: "transparent",
    // color: '#666666',
    // lineHeight: moderateScale(12.38),
    fontSize: textScale(46),
    fontWeight: "300",
    textAlign: "center",
    position: "absolute",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: "100%",
    marginVertical: 10,
  },
  elevation: {
    elevation: 20,
    shadowColor: "#52006A",
  },
});

export default CircularProgress;
