import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CommonHeader from "../../../components/Header/commonHeader";
import { moderateScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";

interface Props {
  onBackPress?: () => void;
  navigation?: any;
}
const Header: React.FC<Props> = ({ navigation }) => {
  return (
      <CommonHeader
        onBackPress={() => navigation.goBack()}
        cal={true}
        headerName={strings?.myActivity}
        iconContainer={{
          backgroundColor: colors?.Daintree,
        }}
        textStyle={{
          color: colors?.SurfCrest,
        }}
        mainContainer={{
          paddingBottom: moderateScale(15),
          paddingTop: moderateScale(10),
          paddingHorizontal: moderateScale(17),
        }}
      />
  );
};
export default Header;
