import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import colors from "../../constant/colors";
import CommonHeader from "../../components/Header/commonHeader";
import { strings } from "../../constant/strings";
import { moderateScale } from "../../constant/responsiveStyle";
import { SamsungWhite, Watch } from "../../assets";
import CommonButton from "../../components/Buttons/commonButton";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import allActions from "../../redux/actions";
import { useDispatch } from "react-redux";

import useSamungDeviceHealthData from "../../components/Hooks/useSamungDeviceHealthData";
import navigationString from "../../navigation/navigationString";
import CommonAlert from "../../components/CommonAlert/CommonAlert";
import CommonLoader from "../../components/Loader";

interface Props {
  navigation?: any;
  route?: any;
}

const PairDevice: React.FC<Props> = ({ navigation, route }): ReactElement => {
  const dispatch = useDispatch();
  const { user_details } = route?.params;
  const [userData, setuserData] = useState<any>(user_details);
  const [isLoading, setisLoading] = useState(false);
  const [ConnectedDeviceId, setConnectedDeviceId] = useState<any>();
  const [date, setDate] = useState(new Date());
  const { steps, isError } = useSamungDeviceHealthData(date);
  const [isDeviceConnected, setisDeviceConnected] = useState(false);
  const [isSavedData, setisSavedData] = useState(false);

  useEffect(() => {
    saveConnectedDevice(userData);
  }, [steps, isError]);
  console.log("steps-->steps==-=>", isError, steps, new Date().toISOString());

  const saveConnectedDevice = (userData: any) => {
    setisLoading(true);
    try {
      let requestbody = {
        userId: userData?.userId,
        deviceName: "Samsung",
        deviceTypeId: 65, // need to change while recieved the deviceTypeId from the resp of create device.
      };
      console.log("requestbody saveConnectedDevice", requestbody);
      allActions.addDevice
        .addDevice(dispatch, requestbody, "saveConnectedDevice")
        .then((response: any) => {
          console.log("response for samsung connection id", response, steps);

          if (response?.statusCode == 200) {
            setisLoading(false);
            setConnectedDeviceId(response.data);
            if (!isError) {
              console.log("steps", steps);
              if (steps !== 0) {
                saveStepCounts(response.data, steps);
              }

              setisDeviceConnected(false);
            } else {
              setisDeviceConnected(true);
            }
          }

          console.log("response saveConnectedDevice->", requestbody, response);
        })
        .catch((err) => {
          setisLoading(false);
        });
    } catch (error) {
      setisLoading(false);
    }
  };
  const saveStepCounts = async (ConnectedDeviceId: any, data: any) => {
    setisLoading(true);
    try {
      let requestbody = {
        userId: userData?.userId,
        deviceId: ConnectedDeviceId,
        healthDataTypeId: 82,
        timestamp: new Date().toISOString(),
        stepVitalData: {
          stepCount: `${data}`,
          vitalUnit: "km",
        },
      };
      console.log("check req for saveStepCounts==>", steps, data, requestbody);
      await allActions.addDevice
        .CreateHealthData(dispatch, requestbody, "saveStepCounts")
        .then((response: any) => {
          setisLoading(false);
          if (response?.statusCode == 200) {
            setisSavedData(true);
          } else {
            setisSavedData(false);
          }

          console.log("check sleep count====>", response);
        })
        .catch((err) => {
          setisLoading(false);
        });
    } catch (error) {
      setisLoading(false);
    }
  };
  const Header = () => (
    <CommonHeader
      headerName={strings?.headerDeviceConnecting}
      // isCross
      onBackPress={() => navigation.goBack()}
      mainContainer={{ marginTop: moderateScale(10) }}
      onCancel={() => navigation.goBack()}
    />
  );

  const DevicePairedView = () => (
    <View style={styles.pairDeviceOuterView}>
      <View style={styles.pairDeviceView}>
        <Watch width={moderateScale(141.56)} height={moderateScale(198.18)} />
        <SamsungWhite
          width={moderateScale(114.88)}
          height={moderateScale(30.68)}
        />
      </View>
      <View style={styles.line} />
      <View style={styles.PairDeviceTextView}>
        <Text style={styles.DevicePairedText}>
          {isSavedData && strings?.DevicePaired}
        </Text>
        <Text style={styles.nextToViewText}>
          {isSavedData
            ? strings?.PairNext
            : "No device connected with Zumlo. Please check app permission into the samsung health app."}
        </Text>
      </View>
    </View>
  );

  const AddVitalsButton = () => (
    <View style={styles.ButtonsView}>
      <CommonButton
        btnName={"View Vital"}
        onPress={() =>
          navigation.navigate(navigationString.ActivityStats, {
            userData,
          })
        }
      />
      <View style={styles.backToDashboard}>
        <Text
          onPress={() =>
            navigation.navigate(navigationString.AddManualReading, {
              userData: userData,
            })
          }
          style={styles.backToDashboardText}
        >
          {"Add Manually"}
        </Text>
      </View>
    </View>
  );
  return (
    <ScreenWrapper statusBarColor={colors.themeColor}>
      <View style={styles?.innerView}>
        {Header()}
        {DevicePairedView()}
        {AddVitalsButton()}
      </View>
      <CommonAlert
        isVisible={isDeviceConnected}
        alertMessage={
          "Samsung health app not connect, kinldy check your app permission in samsung health app."
        }
        alertLeftButtonOnPress={() => {
          setisDeviceConnected(false);
        }}
        alertLeftButtonText={"Ok"}
      />
      {isLoading && <CommonLoader />}
    </ScreenWrapper>
  );
};
export default PairDevice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.backgroundTheme,
  },
  innerView: {
    alignSelf: "center",
    width: moderateScale(334),
  },
  pairDeviceOuterView: {
    paddingTop: moderateScale(100),
  },
  pairDeviceView: {
    alignItems: "center",
    // paddingTop: moderateScale(50),
  },
  line: {
    borderBottomWidth: 0.4, // Adjust the width of the line as needed
    borderBottomColor: colors?.SurfCrest, // Adjust the color of the line as needed
    marginTop: moderateScale(30), // Adjust vertical spacing as needed
    width: moderateScale(272),
    alignSelf: "center",
  },
  PairDeviceTextView: {
    marginTop: moderateScale(10),
    alignItems: "center",
  },
  DevicePairedText: {
    color: colors?.royalOrangeDark,
    fontWeight: "600",
  },
  nextToViewText: {
    fontWeight: "400",
    color: colors?.SurfCrest,
    textAlign: "center",
  },
  ButtonsView: {
    position: "absolute",
    top: moderateScale(550),
    alignSelf: "center",
  },
  backToDashboard: {
    alignItems: "center",
    marginTop: moderateScale(50),
  },
  backToDashboardText: {
    fontWeight: "500",
    color: colors?.royalOrangeDark,
  },
});
