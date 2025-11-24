import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  data?: any;
  mainContainer?: any;
  mainText?: any;
  iconShow?: boolean;
  source?: any;
  iconStyle?: any;
  SvgIcon?: any;
  iconShowSvg?: boolean;
}

export const DiseaseBox: React.FC<Props> = ({
  data,
  mainContainer,
  mainText,
  iconShow,
  source,
  iconStyle,
  SvgIcon,
  iconShowSvg,
}) => {
  return (
    <View style={[styles.container, mainContainer]}>
      {iconShow && <Image source={source} style={[styles.icon, iconStyle]} />}
      {iconShowSvg && (
        <SvgIcon
          height={`${moderateScale(12)}`}
          width={`${moderateScale(12)}`}
        />
      )}
      <Text style={[styles.text, mainText]}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(20),
    marginRight: moderateScale(15),
    backgroundColor: colors.SaltBox,
    paddingHorizontal: moderateScale(17),
    height: moderateScale(27),
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  icon: {
    height: moderateScale(12),
    width: moderateScale(12),
  },
  text: {
    color: colors.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "400",
    alignSelf: "center",
  },
});
