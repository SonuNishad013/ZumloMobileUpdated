import React from "react";
import { StyleSheet } from "react-native";
import CommonHeader from "../../../../../components/Header/commonHeader";
import { moderateScale } from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";
import logger from "../../../../../constant/logger";

interface Props {
  navigation?: any;
  title?: any;
  isBackIcon?: boolean;
  onBackPress?: () => void;
}
const MainHeaderAI: React.FC<Props> = ({
  navigation,
  title,
  isBackIcon,
  onBackPress,
}) => {
  return (
    <CommonHeader
      headerName={title}
      isBackIcon={isBackIcon || false}
      textContainer={[
        styles.textContainer,
        { marginLeft: isBackIcon ? moderateScale(10) : 0 },
      ]}
      onBackPress={() => {
        if (onBackPress) {
          onBackPress();
        } else {
          navigation?.goBack();
        }
      }}
      mainContainer={styles.mainContainer}
      iconContainer={styles.iconContainer}
    />
  );
};
export default MainHeaderAI;

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: moderateScale(0),
  },
  mainContainer: {
    marginTop: moderateScale(15),
    paddingBottom: moderateScale(15),
  },
  iconContainer: {
    backgroundColor: colors.darkPrussianBlue,
  },
});
