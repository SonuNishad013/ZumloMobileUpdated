import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale } from "../../../../constant/responsiveStyle";
import CommonHeader from "../../../../components/Header/commonHeader";
import colors from "../../../../constant/colors";

interface Props {
  onBackPress?: () => void;
  headerName?: any;
  from?: string;
}
const WellnessHeader: React.FC<Props> = ({ onBackPress, headerName, from }) => {
  return (
    <CommonHeader
      mainContainer={{
        paddingHorizontal: moderateScale(15),
        marginBottom: moderateScale(15),
        marginTop: moderateScale(15),
      }}
      onBackPress={onBackPress}
      iconContainer={{ backgroundColor: colors?.saltDark }}
      headerName={headerName}
      isBackIcon={from === "AIGenerated" ? false : true}
    />
  );
};

export default WellnessHeader;

const styles = StyleSheet.create({});
