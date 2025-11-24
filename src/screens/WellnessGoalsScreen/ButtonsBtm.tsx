import { StyleSheet } from "react-native";
import React from "react";
import { moderateScale } from "../../constant/responsiveStyle";
import CommonButton from "../../components/Buttons/commonButton";
import { strings } from "../../constant/strings";
import colors from "../../constant/colors";
import navigationString from "../../navigation/navigationString";
import { event } from "../../navigation/emitter";
import * as AsyncStorageUtils from "../../utils/Storage/AsyncStorage";
interface Props {
  navigation?: any;
}

const ButtonsBtm: React.FC<Props> = ({ navigation }) => {
  return (
    <>
      <CommonButton
        btnName={strings.startNow}
        onPress={() => {
          event.emit("login");

          AsyncStorageUtils.storeItemKey(
            AsyncStorageUtils.ISPLANNER_USER,
            JSON.stringify({ isPlanner: false, isSelected: true })
          );
          // navigation?.navigate(navigationString.Policy, { from:"goal",item: "planner",purpose:"fromWellness" });
        }}
        mainContainer={styles?.btnTopComtainer}
      />
      <CommonButton
        btnName={strings.regenerateCap_}
        mainContainer={styles.regenerateButton}
      />
    </>
  );
};

const styles = StyleSheet.create({
  regenerateButtonContainer: {
    paddingTop: moderateScale(20),
  },
  regenerateButton: {
    backgroundColor: "transparent",
    borderColor: colors.OceanGreen,
    borderWidth: moderateScale(1),
    marginTop: moderateScale(20),
    width: "auto",
  },
  btnTopComtainer: { marginTop: moderateScale(20), width: "auto" },
});

export default ButtonsBtm;
