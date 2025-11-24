import { View, Text, StyleSheet } from "react-native";
import React, { ReactElement, useState } from "react";
import colors from "../../constant/colors";
import { strings } from "../../constant/strings";
import CommonHeader from "../../components/Header/commonHeader";
import { moderateScale } from "../../constant/responsiveStyle";
import { Bluetooth } from "../../assets";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import CommonAlert from "../../components/CommonAlert/CommonAlert";

interface Props {
  navigation?: any;
}

const DeviceConnect: React.FC<Props> = ({ navigation }): ReactElement => {
  const Header = () => (
    <CommonHeader
      headerName={strings?.headerDeviceConnecting}
      // isCross
      onBackPress={() => navigation.goBack()}
    />
  );

  const BlueToothView = () => (
    <View style={styles.BluetoothView}>
      <Bluetooth width={moderateScale(339)} height={moderateScale(339)} />
      <View style={styles.BluetoothConnectionView}>
        <Text style={styles.bluetoothConnectionText}>
          {strings?.BluetoothConnection}
        </Text>
      </View>
    </View>
  );
  return (
    <ScreenWrapper statusBarColor={colors.backgroundTheme}>
      <View style={styles.container}>
        <View style={styles.innerView}>
          {Header()}
          {BlueToothView()}
        </View>
      </View>
    </ScreenWrapper>
  );
};
export default DeviceConnect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.themeColor,
    marginTop: moderateScale(15),
  },
  innerView: {
    width: moderateScale(334),
    alignSelf: "center",
  },
  BluetoothView: {
    alignItems: "center",
    paddingTop: moderateScale(50),
  },
  BluetoothConnectionView: {
    width: moderateScale(240),
    paddingTop: moderateScale(30),
  },
  bluetoothConnectionText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 14,
    color: colors?.SurfCrest,
    lineHeight: 16.8,
  },
});
