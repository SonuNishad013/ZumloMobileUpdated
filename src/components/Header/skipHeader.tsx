import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  mainContainer?: ViewStyle;
  onPress?: () => void;
  currentIndex: any;
}
const SkipHeader: React.FC<Props> = ({
  mainContainer,
  onPress,
  currentIndex,
}) => {
  const data = [
    {
      key: 1,
      backgroundColor: colors?.royalOrange,
    },
    {
      key: 2,
      backgroundColor: colors?.royalOrange,
    },
    {
      key: 3,
      backgroundColor: colors?.royalOrange,
    },
    {
      key: 4,
      backgroundColor: colors?.royalOrange,
    },
    {
      key: 5,
      backgroundColor: colors?.royalOrange,
    },
    {
      key: 6,
      backgroundColor: colors?.royalOrange,
    },
  ];

  return (
    <View
      style={{
        marginTop: moderateScale(10),
        marginHorizontal: moderateScale(19),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: moderateScale(228),
        }}
      >
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          {data.map((elem, index) => {
            return (
              <TouchableOpacity key={elem.key}>
                {index <= currentIndex ? (
                  <View
                    style={[
                      styles?.mainContainer,
                      mainContainer,
                      {
                        backgroundColor: colors?.royalOrange,
                      },
                    ]}
                  ></View>
                ) : (
                  <View style={[styles?.mainContainer, mainContainer]}></View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {currentIndex > 2 ? (
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{
              color: colors?.royalOrange,
              fontWeight: "500",
              fontSize: textScale(16),
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    height: moderateScale(6),
    width: moderateScale(45.59),
    borderColor: colors?.royalOrange,
    borderRadius: moderateScale(35),
  },
});
export default SkipHeader;
