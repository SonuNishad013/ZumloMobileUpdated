import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CommonHeader from "../../../components/Header/commonHeader";
import { strings } from "../../../constant/strings";
import { moderateScale } from "../../../constant/responsiveStyle";

interface Props {
  navigation?: any;
}
const HeaderSignUp: React.FC<Props> = ({ navigation }) => {
  return (
    <CommonHeader
      headerName={strings.SigunpHeader}
      onBackPress={() => navigation.goBack()}
      mainContainer={{
        marginHorizontal: moderateScale(19),
        marginTop: moderateScale(15),
        marginBottom: moderateScale(15),
      }}
    />
  );
};

export default HeaderSignUp;

const styles = StyleSheet.create({});
