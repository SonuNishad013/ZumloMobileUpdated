import { StyleSheet, View } from "react-native";
import React from "react";
import { moderateScale } from "../../../constant/responsiveStyle";
import CommonSearchBar from "../../../components/SearchBar/commonSearchBar";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";

interface Props {}
const Communities: React.FC<Props> = () => {
  return (
    <View>
      <View style={styles.addVerticalSpace}>
        <View style={styles.addHorizontalSpace}>
          <CommonSearchBar
            mainContainer={styles.container}
            isiconSize={true}
            iconSize={moderateScale(22)}
            placeholder={strings?.onlySearch}
          />
        </View>
      </View>
    </View>
  );
};

export default Communities;

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(22),
    height: moderateScale(45),
    backgroundColor: colors.lightSurfCrest,
  },
  addVerticalSpace: {
    marginVertical: moderateScale(15),
  },
  addHorizontalSpace: {
    marginHorizontal: moderateScale(15),
  },
});
