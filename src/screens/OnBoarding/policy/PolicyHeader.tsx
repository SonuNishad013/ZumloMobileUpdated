import { StyleSheet, View } from "react-native";
import React from "react";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";
import CommonHeader from "../../../components/Header/commonHeader";
import { strings } from "../../../constant/strings";

interface Props {
  navigation?: any;
}

const PolicyHeader: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CommonHeader
        onBackPress={() => navigation.goBack()}
        headerName={strings?.termsheader}
        iconContainer={styles.iconContainer}
        textStyle={styles.textStyle}
        mainContainer={styles.mainContainer}
      />
    </View>
  );
};

export default PolicyHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.prussianBlue,
    height: moderateScale(70),
    paddingTop: moderateScale(10),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    paddingHorizontal: moderateScale(17),
  },
  iconContainer: {
    backgroundColor: colors?.Daintree,
  },
  textStyle: {
    color: colors?.SurfCrest,
  },
  mainContainer: {
    marginHorizontal: moderateScale(0),
  },
});
