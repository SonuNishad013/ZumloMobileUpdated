import React, { ReactElement } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ForwordArrow } from "../../assets";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import SeeAllHeaderWellness from "../Dashboard/Wellness/commonHeader";
import { formatSentenceCase } from "../../helper/sentenceCase";

interface Props {
  navigation?: any;
  OtherSettingData?: any;
}

const OtherSetting: React.FC<Props> = ({
  navigation,
  OtherSettingData,
}): ReactElement => {
  const renderOtherSetting = (item: any): ReactElement => (
    <TouchableOpacity
      style={styles.OtherSettingItem}
      onPress={() => navigation.navigate(item?.nav)}
    >
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>{item?.icon && <item.icon />}</View>
        <Text style={styles.itemText}>{formatSentenceCase(item?.name)}</Text>
      </View>
      <ForwordArrow />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SeeAllHeaderWellness
        nameText={{
          color: colors.SurfCrest,
        }}
        name={"Other"}
        container={{ marginHorizontal: moderateScale(1) }}
      />
      <FlatList
        data={OtherSettingData}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item }) => renderOtherSetting(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(15),
    marginHorizontal: moderateScale(15),
    backgroundColor: colors.prussianBlue,
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
  },
  OtherSettingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: moderateScale(5),
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(22),
    width: moderateScale(22),
    backgroundColor: colors.darkprussianBlue,
    borderRadius: moderateScale(4),
    marginRight: moderateScale(10),
  },
  itemText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.SurfCrest,
  },
});

export default OtherSetting;
