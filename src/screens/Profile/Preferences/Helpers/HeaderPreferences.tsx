import { StyleSheet } from "react-native";
import React from "react";
import CommonHeader from "../../../../components/Header/commonHeader";
import colors from "../../../../constant/colors";
import { moderateScale } from "../../../../constant/responsiveStyle";
import { formatSentenceCase } from "../../../../helper/sentenceCase";
import logger from "../../../../constant/logger";

interface Props {
  headerName?: string;
  onBackPress?: () => void;
  navigation?: any;
}

const HeaderPreferences: React.FC<Props> = ({
  headerName,
  onBackPress,
  navigation,
}) => {
  const headerNameText = (headerName: string | undefined) => {
    switch (headerName) {
      case "Health and Wellness":
        return "Health and Wellness";
      default:
        return "";
    }
  };
  return (
    <CommonHeader
      headerName={headerNameText(headerName) || formatSentenceCase(headerName)}
      onBackPress={() => {
        onBackPress ? onBackPress() : navigation?.goBack();
      }}
      iconContainer={styles.iconContainer}
      mainContainer={styles.mainContainer}
    />
  );
};

export default HeaderPreferences;

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
