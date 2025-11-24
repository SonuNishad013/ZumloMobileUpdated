import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React from "react";
import colors from "../../../constant/colors";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import { APPLY_STATUS } from "../../../constant/ENUM";
import { strings } from "../../../constant/strings";

const StepOne = ({ onPress, data, userData }: any) => {
  return (
    <ImageBackground
      source={{ uri: data?.[0]?.imageURL }}
      style={styles?.container}
      resizeMode={APPLY_STATUS?.contain}
    >
      <Text style={styles?.titleStyle}>
        {strings?.Setting_and_achieving_personal_goals}
      </Text>
      <View>
        {data.map((elem: any) => {
          return (
            <TouchableOpacity
              style={styles?.codeView}
              onPress={() => onPress(elem.codeName, elem)}
            >
              <Text style={styles?.codeText}>{elem.codeName}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ImageBackground>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  titleStyle: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors?.SurfCrest,
    textAlign: "center",
    margin: moderateScale(30),
  },
  codeView: {
    margin: moderateScale(10),
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors?.royalOrangeDark,
  },
  codeText: {
    fontSize: textScale(14),
    fontWeight: "500",
    color: colors?.royalOrangeDark,
    marginVertical: moderateScale(20),
    marginHorizontal: width * 0.31,
  },
});
