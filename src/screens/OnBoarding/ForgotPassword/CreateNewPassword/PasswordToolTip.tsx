import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";

interface Props {
  hasUppercase?: any;
  hasLowercase?: any;
  hasNumber?: any;
  hasSpecialChar?: any;
  isLongEnough?: any;
  titleStyle?: TextStyle;
  criteriaContainer?: ViewStyle;
}

const PasswordToolTip: React.FC<Props> = ({
  hasUppercase,
  hasLowercase,
  hasNumber,
  hasSpecialChar,
  isLongEnough,
  titleStyle,
  criteriaContainer,
}) => {
  return (
    <>
      <Text style={[style.title, titleStyle]}>
        {"Your password must contain:"}
      </Text>
      <View style={[style.criteriaContainer, criteriaContainer]}>
        <View
          style={[
            style.criteria,
            {
              backgroundColor: hasUppercase
                ? colors.polishedPine
                : colors.traitSliderBar2,
            },
          ]}
        >
          <Text style={[hasUppercase ? style.valid : style.invalid]}>
            {"1 Capital letter"}
          </Text>
        </View>
        <View
          style={[
            style.criteria,
            {
              backgroundColor: hasLowercase
                ? colors.polishedPine
                : colors.traitSliderBar2,
            },
          ]}
        >
          <Text style={[hasLowercase ? style.valid : style.invalid]}>
            {"1 Small letter"}
          </Text>
        </View>
        <View
          style={[
            style.criteria,
            {
              backgroundColor: hasNumber
                ? colors.polishedPine
                : colors.traitSliderBar2,
            },
          ]}
        >
          <Text style={[hasNumber ? style.valid : style.invalid]}>
            {"1 Number"}
          </Text>
        </View>
        <View
          style={[
            style.criteria,
            {
              backgroundColor: hasSpecialChar
                ? colors.polishedPine
                : colors.traitSliderBar2,
            },
          ]}
        >
          <Text style={[hasSpecialChar ? style.valid : style.invalid]}>
            {"1 Symbol"}
          </Text>
        </View>
        <View
          style={[
            style.criteria,
            {
              backgroundColor: isLongEnough
                ? colors.polishedPine
                : colors.traitSliderBar2,
            },
          ]}
        >
          <Text style={[isLongEnough ? style.valid : style.invalid]}>
            {"8 Letters"}
          </Text>
        </View>
      </View>
    </>
  );
};

export default PasswordToolTip;

const style = StyleSheet.create({
  criteriaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: moderateScale(10),
  },
  criteria: {
    padding: moderateScale(3),
    borderRadius: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: moderateScale(5),
    backgroundColor: "red",
    marginRight: moderateScale(10),
  },
  valid: {
    color: colors.SurfCrest,
    borderRadius: moderateScale(15),
    textAlign: "center",
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    fontSize: textScale(10),
    fontWeight: "600",
  },
  invalid: {
    color: colors.SurfCrest,
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    fontSize: textScale(10),
    fontWeight: "600",
  },
  title: {
    fontSize: textScale(12),
    fontWeight: "500",
    color: colors?.royalOrange,
    marginTop: moderateScale(20),
  },
});
