import React, { ReactElement } from "react";
import { Text, View, StyleSheet } from "react-native";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { TermsAndConditionsIcon } from "../../../assets";
import CommonHeader from "../../../components/Header/commonHeader";
import CommonButton from "../../../components/Buttons/commonButton";
import { strings } from "../../../constant/strings";

interface Props {
  navigation?: any;
}

const TermsAndConditions: React.FC<Props> = ({ navigation }): ReactElement => {
  let data = {
    text: strings?.terms_data,
  };
  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <CommonHeader
            headerName={strings?.termsheader}
            mainContainer={styles.headerMainContainer}
            iconContainer={{ backgroundColor: colors.darkPrussianBlue }}
            onBackPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles?.iconView}>
          <TermsAndConditionsIcon />
        </View>
        <View style={styles?.passMarginHorizontal}>
          <Text style={styles?.textStyle}>{data?.text}</Text>
          <View style={styles?.passMarginvertical}>
            <CommonButton btnName={strings?.I_ve_agree_with_this} />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};
export default TermsAndConditions;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.SurfCrest,
  },
  headerContainer: {
    backgroundColor: colors.prussianBlue,
    height: moderateScale(75),
    borderBottomLeftRadius: moderateScale(25),
    borderBottomRightRadius: moderateScale(25),
  },
  headerMainContainer: {
    backgroundColor: colors.prussianBlue,
    marginHorizontal: moderateScale(15),
  },
  iconView: {
    height: moderateScale(200),
    justifyContent: "center",
    alignItems: "center",
  },
  passMarginHorizontal: {
    marginHorizontal: moderateScale(15),
  },
  textStyle: {
    fontSize: textScale(14),
    fontStyle: "italic",
    color: colors.prussianBlue,
    fontWeight: "400",
  },
  passMarginvertical: {
    marginVertical: moderateScale(20),
  },
});
