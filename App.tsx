import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import Route from "./src/navigation/route";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useNetworkInfo from "./src/config/network";
import NetworkModel from "./src/components/CommonAlert/NetworkModal";
import store from "./src/redux/store";
import { event } from "./src/navigation/emitter";
import * as AsyncStorage from "./src/utils/Storage/AsyncStorage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import loginTypes from "./src/redux/types/loginTypes";
import "react-native-devsettings";
import {
  checkAndInitFcm,
  checkNotificationPermission,
} from "./src/helper/firebaseHelper";
import {
  LogBox,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AppState,
  BackHandler,
} from "react-native";
import firebase from "@react-native-firebase/app";
import messaging from "@react-native-firebase/messaging";
import Config from "react-native-config";
import NewRelic from "newrelic-react-native-agent";
import * as appVersion from "./package.json";
import ErrorBoundary from "./src/constant/ErrorBoundaryWrapper";
import { backgrounColor } from "./src/constant/ProfileConstant";
import colors from "./src/constant/colors";
import { imagePath } from "./src/assets/png/imagePath";
import { moderateScale } from "./src/constant/responsiveStyle";
import { strings } from "./src/constant/strings";
import logger from "./src/constant/logger";
import { CreateUserDeviceCall } from "./src/redux/actions/loginAction";
import CommonAlert from "./src/components/CommonAlert/CommonAlert";
let appToken: string;

if (Platform.OS === "ios") {
  appToken = "AA4512f8ba27c4ed880f1ef18d852ee471e3a9af9c-NRMA"; //for base
  // appToken = "AAad692f9b1edff685dd901fd4db23527dd592bc05-NRMA"; ios-2
} else {
  appToken = "AAf956ad69acd0cef6e44db942c29fd72c3c62a899-NRMA";
}

const agentConfiguration = {
  //Android Specific
  // Optional:Enable or disable collection of event data.
  analyticsEventEnabled: true,

  // Optional:Enable or disable crash reporting.
  crashReportingEnabled: true,

  // Optional:Enable or disable interaction tracing. Trace instrumentation still occurs, but no traces are harvested. This will disable default and custom interactions.
  interactionTracingEnabled: true,

  // Optional:Enable or disable reporting successful HTTP requests to the MobileRequest event type.
  networkRequestEnabled: true,

  // Optional:Enable or disable reporting network and HTTP request errors to the MobileRequestError event type.
  networkErrorRequestEnabled: true,

  // Optional:Enable or disable capture of HTTP response bodies for HTTP error traces, and MobileRequestError events.
  httpResponseBodyCaptureEnabled: true,

  // Optional:Enable or disable agent logging.
  loggingEnabled: true,

  // Optional:Specifies the log level. Omit this field for the default log level.
  // Options include: ERROR (least verbose), WARNING, INFO, VERBOSE, AUDIT (most verbose).
  logLevel: NewRelic.LogLevel.INFO,

  // iOS Specific
  // Optional:Enable/Disable automatic instrumentation of WebViews
  webViewInstrumentation: true,

  // Optional:Set a specific collector address for sending data. Omit this field for default address.
  // collectorAddress: "",

  // Optional:Set a specific crash collector address for sending crashes. Omit this field for default address.
  // crashCollectorAddress: ""
};

const androidCredentials = {
  clientId: Config.FIREBASE_ANDROID_CLIENT_ID,
  appId: Config.FIREBASE_APP_ID,
  apiKey: Config.FIREBASE_ANDROID_API_KEY,
  storageBucket: "",
  messagingSenderId: "x",
  databaseURL: "x",
  projectId: "zumlo-9835c", //"zumlo-6dc05",//Staging
};
const iosCredentials = {
  clientId: Config.FIREBASE_IOS_CLIENT_ID,
  appId: Config.FIREBASE_IOS_APP_ID,
  apiKey: Config.FIREBASE_IOS_API_KEY,
  storageBucket: "zumlo-9835c.firebasestorage.app", //"zumlo-6dc05.appspot.com",//Staging
  projectId: "zumlo-9835c", //"zumlo-6dc05",//Staging
  persistence: true,
  databaseURL: "x",
  messagingSenderId: "x",
};

function App(): React.JSX.Element {
  const [exitAlert, setExitAlert] = useState(false);
  LogBox.ignoreLogs([
    "[NRMA] setInterActionName is not supported by iOS Agent",
  ]);
  useEffect(() => {
    checkAndInitFcm();
  }, []);
  const handleAppStateChange = async (nextAppState: string) => {
    if (nextAppState === "active") {
      // Try to get permission again
      const authStatus = await messaging().hasPermission();
      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        // Now get the FCM token
        const token = await messaging().getToken();
        console.log("FCM Token:", token);
        AsyncStorage?.storeItemKey(
          AsyncStorage?.FCM_TOKEN,
          JSON?.stringify(token)
        );
        CreateUserDeviceCall(store?.dispatch);
        // Call your HTTP request here to save token
      }
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        if (Platform.OS == "android") {
          setExitAlert(true);
          return true;
        }
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription.remove();
  }, []);
  //FCM_TOKEN
  const checkFCMExist = async () => {
    const fcmToken = await AsyncStorage.getItem(AsyncStorage?.FCM_TOKEN);
    if (fcmToken) {
      console.log("fcmToken_____ already exist--->", fcmToken);
    } else {
      console.log("fcmToken_____ Does not exist--->", fcmToken);
    }
  };
  useEffect(() => {
    checkFCMExist();
  }, []);

  useEffect(() => {
    initFirebase();

    setTimeout(() => {
      SplashScreen.hide();
    }, 3500);

    setTimeout(() => {
      if (NewRelic && typeof NewRelic.startAgent === "function") {
        try {
          NewRelic.startAgent(appToken, agentConfiguration);
          NewRelic.setJSAppVersion(appVersion.version);
        } catch (error) {
          logger("Error initializing NewRelic:", error);
        }
      } else {
        logger("NewRelic is not available in release mode.");
      }
    }, 1000);
  }, []);

  const initFirebase = async () => {
    const config = {
      name: "Zumlo",
    };
    const credentials: any = Platform.select({
      android: androidCredentials,
      ios: iosCredentials,
    });
    if (!firebase.apps.length) {
      await firebase.initializeApp(credentials, config);
    }

    checkNotificationPermission();
  };

  const readMessage = async () => {
    const InintialMessages = await messaging().getInitialNotification();
  };
  const { isInternetConnected } = useNetworkInfo();
  const [internetCheck, setInternetCheck] = useState(false);

  const dispatchData = (type: any, payload: any, dispatch: any) => {
    dispatch({
      type: type,
      payload: payload,
    });
  };

  useEffect(() => {
    if (isInternetConnected) {
      setInternetCheck(false);
    } else if (isInternetConnected === null) {
      setInternetCheck(false);
    } else {
      setInternetCheck(true);
    }
  }, [isInternetConnected]);

  const setNetworkPopupVisible = () => {
    if (isInternetConnected) {
      setInternetCheck(false);
    }
  };

  const isUserLoginToken = async (dispatch: any) => {
    try {
      GoogleSignin.signOut();
      AsyncStorage.removeItem(AsyncStorage?.LOGIN_TYPE);
      AsyncStorage.removeItem(AsyncStorage.ACCESS_TOKEN).then(() => {
        event.emit("logout");
        dispatchData(loginTypes.POST_SIGN_OUT_SUCCESS, "", dispatch);
        dispatch({
          type: loginTypes.POST_USERTYPE_SUCCESS,
          payload: { isLoginUser: false, userType: "explorer" },
        });
      });
      AsyncStorage.removeItem(AsyncStorage.ISPLANNER_USER);
    } catch (error) {
      logger("AsyncStorage error:", error);
    }
  };

  useEffect(() => {
    const handleSessionOut = () => {
      isUserLoginToken(store.dispatch);
    };
    event.on("sessionOut", handleSessionOut); // Register listener
    // Cleanup function
    return () => {
      event.off("sessionOut", handleSessionOut); // Ensure proper cleanup
    };
  }, []);

  useEffect(() => {
    readMessage();
    messaging().onNotificationOpenedApp((remoteMessage) => {
      logger("data callMessage -->onNotificationOpenedApp  ", remoteMessage);
    });
    messaging().onMessage(async (remoteMessage: any) => {
      logger("data callMessage -->onMessage  ", remoteMessage);
    });
    return () => { };
  }, []);
  const networkPopup = () => {
    return (
      <NetworkModel
        isVisible={internetCheck}
        setVisible={() => setNetworkPopupVisible()}
      />
    );
  };

  const BuggyComponent = () => {
    // This will throw an error intentionally
    throw new Error("This error was thrown during initial render!");
  };

  const ErrorFallback = (props: { error: Error; resetError: () => void }) => {
    return (
      <ImageBackground
        style={styles?.errorView}
        source={imagePath?.StartNowImg}
      >
        <Text style={styles?.titleText}>{strings?.Woops}</Text>
        <Text style={styles?.substitleText}>
          {strings?.Something_went_wrong}
        </Text>
        <Text style={styles?.subView}>{props.error.toString()}</Text>
        <TouchableOpacity
          onPress={props.resetError}
          style={styles?.clickButton}
        >
          <Text style={styles?.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <Route />
          {networkPopup()}
          {exitAlert && (
            <CommonAlert
              alertMessage={"Are you sure you want to exit the app?"}
              isVisible={true}
              alertLeftButtonText="CANCEL"
              alertRightButtonText="OK"
              customAlertTxtStyles={{
                textAlign: "center",
                marginBottom: moderateScale(10),
              }}
              alertLeftButtonOnPress={() => {
                setExitAlert(false);
              }}
              alertRightButtonOnPress={() => {
                setExitAlert(false);
                BackHandler.exitApp();
              }}
              isAlertIcon
            />
          )}
        </Provider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

export default App;

const styles = StyleSheet.create({
  errorView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: colors?.SurfCrest,
    fontWeight: "500",
    fontSize: moderateScale(20),
  },
  substitleText: {
    color: colors?.SurfCrest,
    fontWeight: "500",
    fontSize: moderateScale(20),
    marginTop: moderateScale(5),
  },
  subView: {
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: moderateScale(12),
    marginTop: moderateScale(10),
  },
  clickButton: {
    backgroundColor: colors?.polishedPine,
    paddingHorizontal: moderateScale(50),
    paddingVertical: moderateScale(10),
    marginTop: moderateScale(30),
    borderRadius: moderateScale(30),
  },
  buttonText: {
    color: colors?.SurfCrest,
    fontWeight: "500",
    fontSize: moderateScale(14),
  },
});
