import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import React from "react";
import CommonHeader from "../../../../components/Header/commonHeader";
import {
  moderateScale,
  textScale,
  width,
} from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import { Successmark } from "../../../../assets";
import { textLabelSize } from "../../../../utils/TextConfig";

interface Props {
  onBackPress?: () => void;
  title?: string;
  description?: any;
  iconShow?: boolean;
  mainContainer?: ViewStyle;
  titleTxtStyle?: TextStyle;
  descriptionTxtStyle?: TextStyle;
  isBackIcon?: boolean;
}
const HeaderTitleDescription: React.FC<Props> = ({
  onBackPress,
  title,
  description,
  iconShow,
  mainContainer,
  titleTxtStyle,
  descriptionTxtStyle,
  isBackIcon = true,
}) => {
  return (
    <View style={[style?.mainContainer, mainContainer]}>
      {iconShow ? (
        <View style={style?.iconContainer}>
          <Successmark height={moderateScale(70)} width={moderateScale(70)} />
        </View>
      ) : (
        <CommonHeader onBackPress={onBackPress} isBackIcon={isBackIcon} />
      )}
      <Text style={[style?.titleTxtStyle, titleTxtStyle]}>{title}</Text>
      <Text style={[style?.descriptionTxtStyle, descriptionTxtStyle]}>
        {description}
      </Text>
    </View>
  );
};

export default HeaderTitleDescription;

const style = StyleSheet.create({
  mainContainer: {
    marginTop: moderateScale(-95),
  },
  titleTxtStyle: {
    fontSize: textLabelSize?.headerTextSize,
    fontWeight: "700",
    color: colors?.SurfCrest,
    marginTop: moderateScale(65),
  },

  descriptionTxtStyle: {
    fontSize: textLabelSize?.subHeaderTextSize,
    fontWeight: "400",
    color: colors?.royalOrangeDark,
    marginTop: moderateScale(10),
    // opacity: 0.6,
  },

  iconContainer: {
    alignSelf: "center",
  },
});
