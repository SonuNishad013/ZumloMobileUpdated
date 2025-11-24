import React, { ReactElement } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import HeaderWithNameSeeAll from "../../../components/Header/HeaderWithNameSeeAll";
import { strings } from "../../../constant/strings";
interface Props {
  navigation?: any;
  DeviceData?: any;
}

const Device: React.FC<Props> = ({ navigation, DeviceData }): ReactElement => {
  const renderDeviceData = (item: any, index: any) => {
    return (
      <View style={styles.deviceContainer}>
        <View style={styles.iconContainer}>{item?.icon}</View>
        <View style={styles.textContainer}>
          <Text style={styles.deviceName}>{item?.name}</Text>
          <Text style={styles.deviceStatus}>{strings?.Device_Connected}</Text>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      ListHeaderComponent={() => (
        <HeaderWithNameSeeAll name={strings?.Device_Connected} />
      )}
      keyExtractor={(item, index) => "key" + index}
      data={DeviceData}
      renderItem={({ item, index }) => renderDeviceData(item, index)}
    />
  );
};
export default Device;
const styles = StyleSheet.create({
  deviceContainer: {
    backgroundColor: colors.royalOrange,
    height: moderateScale(100),
    borderRadius: moderateScale(15),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
  },
  iconContainer: {
    backgroundColor: colors.lightOrange,
    width: moderateScale(80),
    height: moderateScale(80),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(15),
  },
  textContainer: {
    marginHorizontal: moderateScale(10),
    width: moderateScale(250),
    height: moderateScale(80),
    justifyContent: "center",
    borderRadius: moderateScale(15),
  },
  deviceName: {
    fontSize: textScale(20),
    letterSpacing: 3,
    color: colors.white,
    fontWeight: "600",
  },
  deviceStatus: {
    fontSize: textScale(14),
    color: colors.prussianBlue,
  },
});
