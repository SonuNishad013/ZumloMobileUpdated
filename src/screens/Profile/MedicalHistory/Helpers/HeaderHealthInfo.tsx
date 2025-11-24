import { StyleSheet } from "react-native";
import React from "react";
import CommonHeader from "../../../../components/Header/commonHeader";
import colors from "../../../../constant/colors";
import { moderateScale } from "../../../../constant/responsiveStyle";

interface Props {
  headerName?: string;
  onBackPress?: () => void;
  navigation?: any;
}

const HeaderHealthInfo: React.FC<Props> = ({
  headerName,
  onBackPress,
  navigation,
}) => {
  return (
    <CommonHeader
      headerName={headerName}
      onBackPress={() => {
        onBackPress ? onBackPress() : navigation?.goBack();
      }}
      iconContainer={styles.iconContainer}
      mainContainer={styles.mainContainer}
    />
  );
};

export default HeaderHealthInfo;

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: colors?.backIconBg,
  },
  mainContainer: {
    paddingBottom: moderateScale(15),
    paddingTop: moderateScale(15),
    paddingHorizontal: moderateScale(19),
  },
});
