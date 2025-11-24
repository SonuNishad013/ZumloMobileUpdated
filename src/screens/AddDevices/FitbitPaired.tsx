import { View, Linking } from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import colors from "../../constant/colors";

import navigationString from "../../navigation/navigationString";
import allActions from "../../redux/actions";
import { useDispatch } from "react-redux";

import fitbitConfig from "../../config/fitbitConfig";
import moment from "moment";
import axios from "axios";
import qs from "qs";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import CommonLoader from "../../components/Loader";
import { fitbit_, fitbit_Client_Id } from "./HistoryVitalConstants";
import {
  AddDeviceHeader,
  DevicePairedView,
  View_AddVitalsButton,
} from "./AddDevicesComponents/AddDeviceComponents";
import VitalSummaryStyles from "./styles";
import logger from "../../constant/logger";

interface Props {
  navigation?: any;
  route?: any;
}

const FitbitPaired: React.FC<Props> = ({ route, navigation }): ReactElement => {
  const { user_details } = route?.params ?? { userId: 0 };
  console.log("check user_details======>", user_details, route);

  const dispatch = useDispatch();
  const userData = user_details;
  const [isLoading, setIsLoading] = useState(false);
  const [isQuery, setIsQuery] = useState("");
  useEffect(() => {
    saveConnectedDevice(userData);
  }, []);

  const getFitBitData = (deviceId: string) => {
    getAuthorization(fitbit_Client_Id, getHeartData, deviceId);
    getAuthorization(fitbit_Client_Id, getSleepData, deviceId);
    getAuthorization(fitbit_Client_Id, getStepData, deviceId);
  };

  const getAuthorization = async (client_id: any, cb: any, deviceId: any) => {
    logger("checkFitbitDtataAndParams_____", { client_id, cb, deviceId });

    const urlListener = Linking.addEventListener("url", handleUrl);
    function handleUrl(event: any) {
      urlListener?.remove();
      const query = event.url.slice(
        event.url.indexOf("=") + 1,
        event.url.indexOf("#")
      );
      console.log("check acecss token =-=-=>", query);
      setIsQuery(query);
      cb(query, deviceId);
    }
    const oauthurl = `https://www.fitbit.com/oauth2/authorize?${qs.stringify({
      client_id,
      response_type: "code",
      scope: "heartrate activity profile sleep",
      redirect_uri: "zumlo://fit", //"://fit",
      expires_in: "31536000",
    })}`;
    console.log(" oauthurl --> ", JSON.stringify(oauthurl));
    Linking.openURL(oauthurl).catch((err) => {
      console.log("error for getAuthorization", err);
    });
  };
  function getHeartData(access_token: any, deviceID: any) {
    logger("checkFitbitDtataAndParams2222_____", {
      access_token,
      deviceID,
    });
    let requestOptions = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + fitbitConfig.clientEncodeId,
      },
    };
    let body = {
      clientId: fitbitConfig.client_id,
      grant_type: "authorization_code",
      redirect_uri: "zumlo://fit", //"alertease://fit",
      code: access_token,
    };
    return axios
      .post(
        "https://api.fitbit.com/oauth2/token",
        qs.stringify(body),
        requestOptions
      )
      .then((response) => {
        console.log("response===> getHeartData", response);
        fetch(
          `https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json`,
          {
            headers: {
              Authorization: `Bearer ${response?.data?.access_token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((res) => {
            logger("checkFitbitDtataAndParams3333_____", res);
            if (res["activities-heart"]?.length > 0)
              getHeartRate(res, deviceID);
          });
      })
      .catch((err: any) => {
        console.log("check error for connection ", err);
        return null;
      });
  }
  async function getStepData(access_token: any, deviceID: any) {
    logger("checkFitbitDtataAndParams5555steps_____", {
      access_token,
      deviceID,
    });
    let requestOptions = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + fitbitConfig.clientEncodeId,
      },
    };
    let body = {
      clientId: fitbitConfig.client_id,
      grant_type: "authorization_code",
      redirect_uri: "zumlo://fit", //"alertease://fit",
      code: access_token,
    };
    console.log("result of getStepData -->body", body);

    // Get current date in required format
    let date = moment().format("YYYY-MM-DD");

    try {
      const response = await axios.post(
        "https://api.fitbit.com/oauth2/token",
        qs.stringify(body),
        requestOptions
      );
      console.log(
        "checkFitbitDtataAndParams6666steps_____response===> ",
        response
      );
      fetch(`https://api.fitbit.com/1/user/-/activities/date/${date}.json`, {
        headers: {
          Authorization: `Bearer ${response?.data?.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((res_1) => {
          console.log(
            "checkFitbitDtataAndParams7777steps_____resp for step count==>",
            res_1
          );
          if (res_1?.summary?.steps > 0) saveStepCountapi(res_1, deviceID);
        });
    } catch (err) {
      console.log("check error for connection ", err);
      return null;
    }
  }

  async function getSleepData(access_token: any, deviceID: any) {
    // logger("checkFitbitDtataAndParams9999sleep_____", {
    //   access_token,
    //   deviceID,
    // });
    let requestOptions = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + fitbitConfig.clientEncodeId,
      },
    };
    let body = {
      clientId: fitbitConfig.client_id,
      grant_type: "authorization_code",
      redirect_uri: "zumlo://fit", //"alertease://fit",
      code: access_token,
    };
    return axios
      .post(
        "https://api.fitbit.com/oauth2/token",
        qs.stringify(body),
        requestOptions
      )
      .then((response) => {
        // logger("checkFitbitDtataAndParams1010sleep_____", response);
        fetch(
          `https://api.fitbit.com/1.2/user/-/sleep/date/${moment().format(
            "YYYY-MM-DD"
          )}.json`,
          {
            headers: {
              Authorization: `Bearer ${response?.data?.access_token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((res) => {
            // console.log(
            //   "checkFitbitDtataAndParams1011sleep_____check resp for getSleepData===>",
            //   res
            // );
            if (res?.sleep.length > 0) saveSleepDataapi(res, deviceID);
          });
      })
      .catch((err: any) => {
        console.log("check error for connection ", err);
        return null;
      });
  }
  const saveConnectedDevice = (userData: any) => {
    setIsLoading(true);
    try {
      let requestbody = {
        userId: userData?.userId,
        deviceName: fitbit_,
        deviceTypeId: 64, // need to change while recieved the deviceTypeId from the resp of create device.
      };
      console.log("requestbody saveConnectedDevice", requestbody);
      allActions.addDevice
        .addDevice(dispatch, requestbody, "saveConnectedDevice")
        .then((response: any) => {
          console.log("responsesetConnectedDeviceId===>>", response);
          if (response?.statusCode == 200) {
            setIsLoading(false);
            getFitBitData(response.data);
          }
          console.log("response saveConnectedDevice", requestbody, response);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const saveStepCountapi = async (data: any, ConnectedDeviceId: any) => {
    console.log(
      "checkFitbitDtataAndParams8888steps_____cehck fitbit data-=-=>",
      ConnectedDeviceId,
      data
    );
    setIsLoading(true);
    if (ConnectedDeviceId) {
      try {
        let requestbody = {
          userId: userData?.userId,
          deviceId: ConnectedDeviceId,
          healthDataTypeId: 82,
          timestamp: moment().utc().format(),
          stepVitalData: {
            stepCount: `${data?.summary?.steps}`,
            distance: `${data?.summary?.distances[0]?.distance}`,
            timeDuration: `${data?.summary?.lightlyActiveMinutes}`,
            caloriesBurned: `${data?.summary?.caloriesBMR}`,
            vitalUnit: "steps",
          },
        };
        console.log("check req for saveStepCountapi", requestbody);
        await allActions.addDevice
          .CreateHealthData(dispatch, requestbody, "saveStepCounts")
          .then((response: any) => {
            setIsLoading(false);
            console.log("response saveHeatRate", requestbody, response);
          })
          .catch((err) => {
            setIsLoading(false);
          });
      } catch (error) {
        setIsLoading(false);
      }
    }
  };
  const getHeartRate = async (data: any, ConnectedDeviceId: any) => {
    logger("checkFitbitDtataAndParams4444_____", { data, ConnectedDeviceId });
    if (typeof ConnectedDeviceId === "number") {
      let heartData: any[] = data["activities-heart"];
      if (heartData[0]?.value?.restingHeartRate > 0)
        try {
          setIsLoading(true);
          let requestbody = {
            userId: userData?.userId,
            deviceId: ConnectedDeviceId,
            timestamp: moment().utc().format(),
            healthDataTypeId: 80,
            heartRateVitalData: {
              heartRateCount: heartData[0]?.value?.restingHeartRate,
              heartActivity: "Resting",
              vitalUnit: "bpm",
            },
          };
          console.log("check_req_for_getHeartRate==>", heartData, requestbody);

          allActions.addDevice
            .CreateHealthData(dispatch, requestbody, "saveHeartRate")
            .then((response: any) => {
              setIsLoading(false);
              console.log("response_saveHeartRate===>>>>", response);
            })
            .catch((err) => {
              setIsLoading(false);
            });
        } catch (error) {
          setIsLoading(false);
        }
    }
  };
  const saveSleepDataapi = (data: any, ConnectedDeviceId: any) => {
    // logger("checkFitbitDtataAndParams1012sleep_____", {
    //   data,
    //   ConnectedDeviceId,
    // });
    setIsLoading(true);
    if (ConnectedDeviceId) {
      try {
        let requestbody = {
          userId: userData?.userId,
          deviceId: ConnectedDeviceId,
          healthDataTypeId: 83,
          timestamp: moment().utc().format(),
          sleepVitalData: {
            sleepDuration: `${data?.summary?.totalSleepRecords}`,
            sleepType: "",
            sleepIcon: "happy",
            awakeTime: "",
            vitalUnit: "hrs",
          },
        };
        console.log("check req for sleep==>", data, requestbody);
        allActions.addDevice
          .CreateHealthData(dispatch, requestbody, "saveSleepData")
          .then((response: any) => {
            setIsLoading(false);
            console.log("response saveSleepData", requestbody, response);
          })
          .catch((err) => {
            setIsLoading(false);
          });
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  function onViewVitalPress() {
    navigation.navigate(navigationString.ActivityStats, {
      userData: userData,
    });
  }
  function onAddManualyPress() {
    navigation.navigate(navigationString.AddManualReading, {
      userData: user_details,
    });
  }
  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      <View style={VitalSummaryStyles?.innerView}>
        {AddDeviceHeader(navigation)}
        {DevicePairedView(isQuery, isLoading)}
        {View_AddVitalsButton(onViewVitalPress, onAddManualyPress)}
      </View>
      {isLoading && <CommonLoader />}
    </ScreenWrapper>
  );
};
export default FitbitPaired;
