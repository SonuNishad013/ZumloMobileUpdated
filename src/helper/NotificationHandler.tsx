import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";

type NotificationHandler = (notification: object | null) => void;

const useNotificationHandler = (
  handleNotificationNavigations: NotificationHandler
) => {
  useEffect(() => {
    const initializeMessaging = async () => {
      try {
        // Handle notification that opened the app
        const initialNotification = await messaging().getInitialNotification();
        if (initialNotification) {
          console.debug(
            "Handling____ initial notification:",
            initialNotification
          );
          handleNotificationNavigations(initialNotification);
        }

        // Handle background messages
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
          console.debug("Handling__:: background message:", remoteMessage);
          handleNotificationNavigations(remoteMessage);
        });
      } catch (error) {
        console.error("Error initializing messaging:", error);
      }
    };

    // Initialize Firebase messaging
    initializeMessaging();

    // Subscribe to notification-opened events
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(
      handleNotificationNavigations
    );

    // Cleanup on unmount
    return () => {
      unsubscribeOnNotificationOpened();
    };
  }, [handleNotificationNavigations]);
};

export default useNotificationHandler;
