import { StyleSheet, View } from "react-native";
import React from "react";
import CommonHeader from "../../../components/Header/commonHeader";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";

interface Props {
  navigation?: any;
  headerName?: any;
}
const HeaderNutrition: React.FC<Props> = ({ navigation, headerName }) => {
  return (
    <View>
      <CommonHeader
        headerName={headerName}
        iconContainer={{ backgroundColor: colors?.lightGrey }}
        textStyle={{ color: colors?.prussianBlue }}
        mainContainer={{
          marginHorizontal: moderateScale(19),
          marginTop: moderateScale(15),
          paddingBottom: moderateScale(10),
        }}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default HeaderNutrition;

const style = StyleSheet.create({});
