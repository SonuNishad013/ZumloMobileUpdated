import { View, Text, StyleSheet, Alert, Linking } from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import colors from "../../constant/colors";
import CommonHeader from "../../components/Header/commonHeader";
import { strings } from "../../constant/strings";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import { AppleWatchIcon, AppleWatchTextIcon } from "../../assets";
import CommonButton from "../../components/Buttons/commonButton";
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";
import navigationString from "../../navigation/navigationString";
import allActions from "../../redux/actions";
import { useDispatch } from "react-redux";
import * as AsyncStorage from "../../utils/Storage/AsyncStorage";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import CommonLoader from "../../components/Loader";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import ToastApiResponse from "../../components/Toast/ToastApiResponse";
import { TOAST_STATUS } from "../../constant/appConstant";

interface Props {
  navigation?: any;
}

const ApplePaired: React.FC<Props> = ({ navigation }): ReactElement => {
  const [steps, setSteps] = useState(0);
  const [userData, setuserData] = useState<any>();
  const [SaveHeartRateSamples, setSaveHeartRateSamples] = useState<any>();
  const [ConnectedDeviceId, setConnectedDeviceId] = useState<any>();
  const [issaveConnectedDevice, setissaveConnectedDevice] = useState(false);

  const [ConnectStatus, setConnectStatus] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isLoading2, setisLoading2] = useState(true);
  const [isDataSame, setisDataSame] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const focus = useIsFocused();
  const [jumpToSettings, setJumpToSettings] = useState<boolean>(false);
  const [hasUserAllowedDataSharing, setHasUserAllowedDataSharing] =
    useState<boolean>(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    setisLoading2(true);
    isUserLoginToken();
    setTimeout(() => {
      setisLoading2(false);
    }, 10000);
  }, []);

  const isUserLoginToken = async () => {
    try {
      const loginUserData = await AsyncStorage.getItem(
        AsyncStorage.LOGIN_USER_DATA
      );
      console.log("loginUserData===?", loginUserData);

      // If loginUserData is not null, parse and set userData
      if (loginUserData !== null) {
        setuserData(JSON.parse(loginUserData));
        saveConnectedDevice(JSON.parse(loginUserData));
      }
    } catch (error) {
      console.error("Error retrieving login user data:", error);
    }
  };

  const dispatch = useDispatch();
  // Define the HealthKit permissions
  const healthKitPermissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.StepCount,
        AppleHealthKit.Constants.Permissions.HeartRate,
      ],
      write: [AppleHealthKit.Constants.Permissions.StepCount],
    },
  };

  // Check HealthKit authorization status
  // Check Permission Status

  // Define the permissions you want to check
  const permissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.Steps,
        AppleHealthKit.Constants.Permissions.HeartRate,
        AppleHealthKit.Constants.Permissions.BloodPressureDiastolic,
        AppleHealthKit.Constants.Permissions.BloodPressureSystolic,
        AppleHealthKit.Constants.Permissions.SleepAnalysis,

        AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      ],
      write: [
        AppleHealthKit.Constants.Permissions.Steps,
        AppleHealthKit.Constants.Permissions.HeartRate,
        AppleHealthKit.Constants.Permissions.BloodPressureDiastolic,
        AppleHealthKit.Constants.Permissions.BloodPressureSystolic,
        AppleHealthKit.Constants.Permissions.SleepAnalysis,
      ],
    },
  } as HealthKitPermissions;

  // Function to check authorization status
  const checkHealthKitPermissions = (check: boolean) => {
    AppleHealthKit.getAuthStatus(permissions, (error, result) => {
      if (error) {
        console.error("Error getting HealthKit auth status:", error);
        return;
      }
      if (
        result.permissions.read.some((item) => item == 2) &&
        result.permissions.write.some((item) => item == 2)
      ) {
        setHasUserAllowedDataSharing(true);
        getHeartRateSamples();
        getSleepSamples();
        getStepCount();
        getBloodPressureSamples();
      }
      if (
        result.permissions.read.some((item) => item == 1) &&
        result.permissions.write.some((item) => item == 1)
      ) {
        setHasUserAllowedDataSharing(false);

        Alert.alert(
          "Health Data Access",
          "To enable health data access, go to Settings > Privacy & Security > Health > Zumlo.",
          [
            {
              text: "Open Settings",
              onPress: () => {
                Linking.openURL("App-prefs:root=Health");
                navigation?.pop(1);
              },
            },
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => setHasUserAllowedDataSharing(false),
            },
          ]
        );
      }
    });
  };

  // Call the function inside useEffect or when needed
  useEffect(() => {
    if (AppleHealthKit.initHealthKit) {
      AppleHealthKit.initHealthKit(permissions, (error, result) => {
        checkHealthKitPermissions(false);
        if (error) {
          console.error("Error initializing HealthKit:", error);

          if (error.includes("Permissions not allowed")) {
            console.warn(
              "Permissions were denied. Please enable them in the Health app."
            );
          }
          return;
        }
        console.log("check resp===>", permissions);
        setIsAuthorized(true);
      });
    } else {
      console.log("initHealthKit function is not available");
    }

    if (focus && jumpToSettings) {
      checkHealthKitPermissions(true);
    }
  }, [jumpToSettings]);

  const checkHealthPermissions = () => {
    AppleHealthKit.getAuthStatus({}, (err, results) => {
      if (err) {
        console.error("Error checking HealthKit status:", err);
        Alert.alert(
          "Error",
          "Unable to determine HealthKit permissions. Please try again later."
        );
        return;
      }

      console.log("HealthKit Authorization Status:", results);
      if (
        results === AppleHealthKit.Constants.AuthorizationStatus.NOT_DETERMINED
      ) {
        Alert.alert(
          "Permission Required",
          "HealthKit permissions have not been granted yet. Would you like to enable them?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Grant Access", onPress: initializeHealthKit },
          ]
        );
      } else if (
        results === AppleHealthKit.Constants.AuthorizationStatus.SHARING_DENIED
      ) {
        Alert.alert(
          "Permission Denied",
          "HealthKit permissions were denied. Please enable them in your device settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]
        );
      } else {
        Alert.alert(
          "Permissions Verified",
          "HealthKit permissions are already granted."
        );
        setIsAuthorized(true);
      }
    });
  };

  const saveConnectedDevice = (userData: any) => {
    setisLoading(true);
    try {
      let requestbody = {
        userId: userData?.userId,
        deviceName: "Apple",
        deviceTypeId: 63, // need to change while recieved the deviceTypeId from the resp of create device.
      };
      console.log("requestbody", requestbody);

      allActions.addDevice
        .addDevice(dispatch, requestbody, "saveConnectedDevice")
        .then((response: any) => {
          if (response?.statusCode == 200) {
            setisLoading(false);
            setConnectedDeviceId(response?.data);
            setissaveConnectedDevice(true);
          }
        })
        .catch((err) => {
          setisLoading(false);
          showToasterDetails(TOAST_STATUS?.ERROR, err?.message);
        });
    } catch (error) {
      setisLoading(false);
      showToasterDetails(TOAST_STATUS?.ERROR, strings?.somethingWrong);
    }
  };
  const getHeartRateSamples = () => {
    let options: any = {
      unit: "bpm", // optional; default 'bpm'
      startDate: new Date(2021, 0, 0).toISOString(), // required
      endDate: new Date().toISOString(), // optional; default now
      ascending: false, // optional; default false
      limit: 10, // optional; default no limit
    };
    console.log("check options", options);

    AppleHealthKit.getHeartRateSamples(
      options,
      (err: Object, results: Array<HealthValue>) => {
        if (err) {
          return;
        }
        console.log("results for heart beat==>", results);
        setSaveHeartRateSamples(results);
        if (results.length > 0) saveHeatRate(results?.[0]);
      }
    );
  };
  const getSleepSamples = () => {
    let options = {
      startDate: new Date(2021, 0, 0).toISOString(), // required
      endDate: new Date().toISOString(), // optional; default now
      limit: 10, // optional; default no limit
      ascending: true, // optional; default false
    };
    AppleHealthKit.getSleepSamples(
      options,
      (err: Object, results: Array<HealthValue>) => {
        if (err) {
          return;
        }
        console.log("results sleep", results);
        if (results.length > 0) saveSleepData(results?.[0]);
      }
    );
  };
  const getStepCount = () => {
    let options = {
      includeManuallyAdded: true,
    };
    const options1 = {
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
    let distance;
    AppleHealthKit.getDistanceWalkingRunning(
      options1,
      (err: Object, results: HealthValue) => {
        if (err) {
          console.log("Distance error", err);
          return;
        }

        console.log("Distance walked/run in meters:", results);
        const distanceInKm = results.value / 1000;
        console.log("Distance in kilometers:", distanceInKm);

        // Optionally, save this
        distance = distanceInKm;
        // saveDistance(distanceInKm);
      }
    );
    AppleHealthKit.getStepCount(
      options,
      (err: Object, results: HealthValue) => {
        if (err) {
          return;
        }
        console.log("results getStepCount", results);
        if (results?.value !== 0) {
          saveStepCounts(results, distance);
        }
        // saveStepCounts(results);
      }
    );
  };
  const getBloodPressureSamples = () => {
    let options: any = {
      unit: "mmhg", // optional; default 'mmhg'
      startDate: new Date(2021, 0, 0).toISOString(), // required
      endDate: new Date().toISOString(), // optional; default now
      ascending: false, // optional; default false
      limit: 10, // optional; default no limit
    };
    AppleHealthKit.getBloodPressureSamples(
      options,
      (err: Object, results: Array<HealthValue>) => {
        if (err) {
          return;
        }
        console.log("results getBloodPressureSamples", results);
        if (results.length > 0) saveBP_Data(results);
      }
    );
  };
  function convertToLocalISO(dateString: any) {
    // Create a Date object from the original date string
    const date = new Date(dateString);

    // Format the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

    // Combine the components into the ISO 8601 format
    const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

    return isoString;
  }
  //save data apis
  const saveStepCounts = async (data: any, distance: any) => {
    const timestamp1 = moment(convertToLocalISO(data?.endDate));
    // const timestamp2 = moment(convertToLocalISO(new Date()));
    // const isSame = timestamp1.isSame(timestamp2);

    // console.log("==>request==>", data, isSame, timestamp1, timestamp2);

    // return
    // if (!isSame) {

    setisLoading(true);
    // setisDataSame(false)
    try {
      let requestbody = {
        userId: userData?.userId,
        deviceId: ConnectedDeviceId,
        healthDataTypeId: 82,
        timestamp: `${convertToLocalISO(data?.endDate)}`,
        stepVitalData: {
          stepCount: `${data?.value}`,
          distance: `${distance ? distance : ""}`,
          // "timeDuration": "",
          // "caloriesBurned": '',
          vitalUnit: "stpes",
        },
      };
      console.log(
        "check req for step apple==>",
        convertToLocalISO(data?.endDate),
        requestbody
      );
      await allActions.addDevice
        .CreateHealthData(dispatch, requestbody, "saveStepCounts")
        .then((response: any) => {
          setisLoading(false);
          console.log("check sleep count====>saveStepCounts", response);
        })
        .catch((err) => {
          setisLoading(false);
          showToasterDetails(TOAST_STATUS?.ERROR, strings?.somethingWrong);
        });
    } catch (error) {
      setisLoading(false);
      showToasterDetails(TOAST_STATUS?.ERROR, strings?.somethingWrong);
    }
    // } else {
    //     // setisDataSame(true)
    // }
  };
  //save heart beat
  const saveHeatRate = async (data: any) => {
    setisLoading(true);
    try {
      let requestbody = {
        userId: userData?.userId,
        deviceId: ConnectedDeviceId,
        healthDataTypeId: 80,
        timestamp: moment(data?.startDate).utc().toISOString(),
        heartRateVitalData: {
          heartRateCount: Number(data?.value.toFixed(0)),
          // "heartActivity": "",
          vitalUnit: "bpm",
        },
      };
      console.log("check req for heart apple==>", data, requestbody);

      await allActions.addDevice
        .CreateHealthData(dispatch, requestbody, "saveStepCounts")
        .then((response: any) => {
          setisLoading(false);
          console.log("response saveHeatRate", requestbody, response);
        })
        .catch((err) => {
          setisLoading(false);
          showToasterDetails(TOAST_STATUS?.ERROR, strings?.somethingWrong);
        });
    } catch (error) {
      setisLoading(false);
      showToasterDetails(TOAST_STATUS?.ERROR, strings?.somethingWrong);
    }
  };

  //save Sleep
  const saveSleepData = async (data: any) => {
    // Assuming data.startDate and data.endDate are strings
    const startDate = moment(data.startDate);
    const endDate = moment(data.endDate);

    const duration = moment.duration(endDate.diff(startDate));

    // Extract hours, minutes, and seconds from the duration
    const diffInHours = Math.floor(duration.asHours());

    setisLoading(true);
    try {
      let requestbody = {
        userId: userData?.userId,
        deviceId: ConnectedDeviceId,
        healthDataTypeId: 83,
        timestamp: moment(data?.startDate).utc().toISOString(),

        sleepVitalData: {
          sleepDuration: diffInHours,
          // "sleepType": "",
          sleepIcon: "happy",
          // "awakeTime": '',
          vitalUnit: "hrs",
        },
      };
      await allActions.addDevice
        .CreateHealthData(dispatch, requestbody, "saveSleepData")
        .then((response: any) => {
          setisLoading(false);
          console.log("response saveSleepData", requestbody, response);
        })
        .catch((err) => {
          setisLoading(false);
          showToasterDetails(TOAST_STATUS?.ERROR, strings?.somethingWrong);
        });
    } catch (error) {
      setisLoading(false);
      showToasterDetails(TOAST_STATUS?.ERROR, strings?.somethingWrong);
    }
  };
  //save BP
  const saveBP_Data = (data: any) => {
    console.log("data===>", data, data?.startDate);

    setisLoading(true);
    try {
      let requestbody = {
        userId: userData?.userId,
        deviceId: ConnectedDeviceId,
        healthDataTypeId: 81,
        timestamp: moment(data?.[0]?.startDate).utc().toISOString(),
        bloodPressureVitalData: {
          dateAndTimeForBP: moment(data?.[0]?.startDate).utc().toISOString(),
          systolic: data?.[0]?.bloodPressureSystolicValue,
          diastolic: data?.[0]?.bloodPressureDiastolicValue,
          // "heartRate": '',
          // "description": "",
          vitalUnit: "bpm",
        },
      };
      console.log("check req for BP apple==>", data, requestbody);
      allActions.addDevice
        .CreateHealthData(dispatch, requestbody, "saveSleepData")
        .then((response: any) => {
          setisLoading(false);
          console.log("response saveSleepData", requestbody, response);
        })
        .catch((err) => {
          setisLoading(false);
          showToasterDetails(TOAST_STATUS?.ERROR, strings?.somethingWrong);
        });
    } catch (error) {
      setisLoading(false);
      showToasterDetails(TOAST_STATUS?.ERROR, strings?.somethingWrong);
    }
  };
  const showToasterDetails = (code: number, msg: string) => {
    setToasterDetails({
      showToast: true,
      code: code,
      message: msg,
    });
  };

  const Header = () => (
    <CommonHeader
      headerName={strings?.headerDeviceConnecting}
      // isCross
      onBackPress={() => navigation.goBack()}
      onCancel={() => navigation.navigate(navigationString.PlannerDashboard)}
      mainContainer={{ marginTop: moderateScale(15) }}
    />
  );

  const DevicePairedView = () => (
    <View style={styles.pairDeviceOuterView}>
      <View style={styles.pairDeviceView}>
        <AppleWatchIcon />
        <AppleWatchTextIcon />
      </View>
      <View style={styles.line} />
      <View style={styles.PairDeviceTextView}>
        <Text style={styles.DevicePairedText}>
          {!hasUserAllowedDataSharing
            ? "Device not connected"
            : strings?.DevicePaired}
        </Text>
        <Text style={styles.nextToViewText}>
          {!hasUserAllowedDataSharing
            ? "To enable health data access, go to Settings > Privacy & Security > Health > Zumlo."
            : strings?.PairNext}
        </Text>
        <Text style={styles.nextToViewText}>
          {
            "*Note: Please allow read permissions for fetching health data from Health App "
          }
        </Text>
      </View>
    </View>
  );

  const AddVitalsButton = (goToSettings: boolean) => (
    <View
      style={{
        marginTop: moderateScale(35),
      }}
    >
      {goToSettings ? (
        <CommonButton
          btnName={"Go to settings"}
          onPress={() => {
            Linking.openURL("App-prefs:root=Health");
            navigation?.pop(1);
          }}
        />
      ) : (
        <CommonButton
          btnName={"View Vital"}
          onPress={() =>
            navigation.navigate(navigationString.ActivityStats, {
              userData,
            })
          }
        />
      )}
      <View style={styles.backToDashboard}>
        <Text
          style={styles.backToDashboardText}
          onPress={() =>
            navigation.navigate(navigationString.AddManualReading, {
              userData: userData,
            })
          }
        >
          {"Add Manually"}
        </Text>
      </View>
    </View>
  );
  return (
    <ScreenWrapper statusBarColor={colors.backgroundTheme}>
      <View style={styles?.innerView}>
        {Header()}
        {DevicePairedView()}
        {AddVitalsButton(!hasUserAllowedDataSharing)}
      </View>
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
      {isLoading2 && <CommonLoader />}
    </ScreenWrapper>
  );
};
export default ApplePaired;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.backgroundTheme,
  },
  innerView: {
    // alignSelf: "center",
    // width: moderateScale(334),
    marginHorizontal: moderateScale(19),
  },
  pairDeviceOuterView: {
    paddingTop: moderateScale(100),
  },
  pairDeviceView: {
    alignItems: "center",
    height: moderateScale(200),
    justifyContent: "space-between",
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
    lineHeight: 16.8,
    textAlign: "center",
    fontSize: textScale(14),
    marginTop: moderateScale(8),
  },
  ButtonsView: {
    position: "absolute",
    top: moderateScale(450),
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
