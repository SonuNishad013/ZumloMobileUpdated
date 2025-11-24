import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import {
  initialize,
  requestPermission,
  readRecords,
} from "react-native-health-connect";
import { TimeRangeFilter } from "react-native-health-connect/lib/typescript/types/base.types";
import PermissionsAndroid from "react-native-permissions";
import logger from "../../constant/logger";
const useSamsungDeviceHealthData = (date: Date) => {
  const [hasPermissions, setHasPermission] = useState(false);
  const [steps, setSteps] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);

  async function requestHealthPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        "android.permission.health.READ_STEPS",
        {
          title: "Health Data Permission",
          message: "This app needs access to your step count data.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permission granted");
      } else {
        console.log("Permission denied");
        readSamsungHealthData();
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const readSamsungHealthData = async () => {
    try {
      const isInitialized = await initialize();

      if (!isInitialized) {
        console.error("Health Connect not initialized.");
        setIsError(true);
        return;
      }

      const permissions = await requestPermission([
        { accessType: "read", recordType: "Steps" },
        { accessType: "read", recordType: "HeartRate" },
        { accessType: "read", recordType: "BloodPressure" },
        { accessType: "read", recordType: "SleepSession" },
        // { accessType: "read", recordType: "RestingHeartRate" },
      ]);

      if (!permissions) {
        Alert.alert("Permissions not granted.");
        setIsPermissionDenied(true);
        setIsError(true);
        return;
      }

      setHasPermission(true);
      setIsPermissionDenied(false);

      const startTime = new Date(date);
      startTime.setHours(0, 0, 0, 0);

      const endTime = new Date(date);
      endTime.setHours(23, 59, 59, 999);

      const timeRangeFilter: TimeRangeFilter = {
        // operator: "between",
        // startTime: startTime.toISOString(),
        // endTime: endTime.toISOString(),

        endTime: "2025-09-05T18:29:59.999Z",
        operator: "between",
        startTime: "2025-09-03T18:30:00.000Z",
      };

      const stepsData = await readRecords("Steps", { timeRangeFilter });
      const BPrecords = await readRecords("BloodPressure", { timeRangeFilter });
      const HeartRateRecords = await readRecords("HeartRate", {
        timeRangeFilter,
      });
      const SleepSessionRecords = await readRecords("SleepSession", {
        timeRangeFilter,
      });

      const totalSteps = stepsData.reduce((sum, cur) => sum + cur.count, 0);

      setSteps(totalSteps);
      setIsError(false);
    } catch (error) {
      console.error("Error reading Samsung Health data:", error);
      setIsError(true);
    }
  };

  const requestPermissionsAgain = () => {
    if (isPermissionDenied) {
      Alert.alert(
        "Permissions Required",
        "Samsung Health permissions are required to access your health data. Please grant permissions to continue.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Retry",
            onPress: () => readSamsungHealthData(),
          },
        ]
      );
    }
  };

  useEffect(() => {
    if (Platform.OS !== "android") return;
    // readSamsungHealthData();
    requestHealthPermissions();
  }, [date]);

  return {
    steps,
    hasPermissions,
    isError,
    isPermissionDenied,
    requestPermissionsAgain,
  };
};

export default useSamsungDeviceHealthData;
