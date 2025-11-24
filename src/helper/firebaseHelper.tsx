import messaging from "@react-native-firebase/messaging";
import { AppState, PermissionsAndroid, Platform } from "react-native";
import * as AsyncStorage from "../utils/Storage/AsyncStorage";

export async function checkNotificationPermission() {
  try {
    // Ensure device is registered
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }

    if (Platform.OS === "ios") {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("✅ iOS Notification permission granted.");
        await getToken();
      } else {
        console.log("⚠️ iOS Notification permission denied.");
      }
    }

    if (Platform.OS === "android" && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("✅ Android Notification permission granted.");
        await getToken();
      } else {
        console.log("⚠️ Android Notification permission denied.");
      }
    }

    // For Android < 13 (no runtime permission required)
    if (Platform.OS === "android" && Platform.Version < 33) {
      await getToken();
    }
  } catch (err) {
    console.log("❌ Error while generating FCM Token:", err);
  }
}

export async function getToken() {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("Your Firebase Token is: ", fcmToken);
      AsyncStorage?.storeItemKey(
        AsyncStorage?.FCM_TOKEN,
        JSON?.stringify(fcmToken)
      );
      // Alert.alert("Success", fcmToken);
    } else {
      console.log('Failed", "No token received');
    }
  } catch (err: any) {
    // Alert.alert("FCM err", err);
    console.log("FCM err", err);
    // alert(err);
  }
}

export async function handleNotificationOpenedApp(remoteMessage: any) {
  console.log("remoteMessage in handleNotificationOpenedApp", remoteMessage);
}

export async function setNotificationListener() {
  messaging().onMessage((notification) => {
    console.log("ON_Messgaing-- remoteMessage", notification);
  });
  messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
    console.log("remoteMessage handling notificaiton here :", remoteMessage);
  });
  messaging().onNotificationOpenedApp(handleNotificationOpenedApp);
  messaging().getInitialNotification().then(handleNotificationOpenedApp);
}
export async function checkAndInitFcm() {
  try {
    const fcmToken = await AsyncStorage.getItem(AsyncStorage.FCM_TOKEN);
    const appState = AppState.currentState;

    if (!fcmToken && appState === "active") {
      console.log(
        "⚠️ FCM token missing & app is active → requesting permission..."
      );
      await checkNotificationPermission();
    } else {
      console.log("✅ FCM already initialized OR app not active.");
    }
  } catch (error) {
    console.error("❌ Error in checkAndInitFcm:", error);
  }
}
