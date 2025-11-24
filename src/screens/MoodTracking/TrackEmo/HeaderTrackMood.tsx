import { StyleSheet } from "react-native";
import React from "react";
import CommonHeader from "../../../components/Header/commonHeader";
import { moderateScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { event } from "../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
interface Props {
  navigation?: any;
  onSwiper: boolean | undefined;
  isSeeAll?: any;
  onViewHistory?: () => void;
  route?: any;
}
const HeaderTrackMood: React.FC<Props> = ({
  navigation,
  onSwiper,
  isSeeAll = false,
  onViewHistory,
  route,
}) => {
  return (
    <CommonHeader
      onBackPress={() => {
        if (route?.params?.from === "ProductGuide") {
          navigation?.pop(3);
          return;
        }
        if (
          ["AIGeneratedSkipped", "fromExplorer"].includes(route?.params?.from)
        ) {
          if (route?.params?.goBackOnMoodTracking) {
            navigation?.goBack();
            return;
          } else {
            const isPLanner = route?.params?.from === "AIGeneratedSkipped";
            event.emit("login");

            AsyncStorageUtils.storeItemKey(
              AsyncStorageUtils.ISPLANNER_USER,
              JSON.stringify({ isPlanner: isPLanner, isSelected: true })
            );
            return;
          }
        }
        if (onSwiper) {
          navigation?.goBack();
          return;
        } else {
          navigation?.goBack();
        }
      }}
      mainContainer={style?.mainContainer}
      iconContainer={style?.iconContainer}
      isSeeAll={isSeeAll}
      onViewHistory={onViewHistory}
    />
  );
};

export default HeaderTrackMood;

const style = StyleSheet.create({
  mainContainer: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(15),
  },
  iconContainer: { backgroundColor: colors?.darkthemColor },
});
