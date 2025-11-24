import { StyleSheet } from "react-native";
import React from "react";
import CommonHeader from "../../../components/Header/commonHeader";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";

interface Props {
  navigation?: any;
  hName?: string;
  skip?: boolean;
}

const HeaderWithSkip: React.FC<Props> = ({
  navigation,
  hName,
  skip = true,
}) => {
  return (
    <CommonHeader
      headerName={hName}
      iconContainer={{ backgroundColor: colors.darkPrussianBlue }}
      skip={skip}
      skipTextStyle={style?.skipTextStyle}
      mainContainer={style?.mainContainer}
      onBackPress={() => navigation.goBack()}
    />
  );
};

export default HeaderWithSkip;

const style = StyleSheet.create({
  skipTextStyle: {
    color: colors?.royalOrange,
    fontSize: textScale(16),
  },
  mainContainer: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(10),
    paddingBottom: moderateScale(20),
  },
});
