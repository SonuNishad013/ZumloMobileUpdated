import { useEffect, useState } from "react";
import * as SignalR from "@microsoft/signalr";
import NetInfo from "@react-native-community/netinfo";
import appConstant from "../../../constant/appConstant";
import { log } from "console";
import logger from "../../../constant/logger";

const useNotificationConnection = (userToken: any, userData: any) => {
  const apiUrl = appConstant.notificationSocketurl;
  const [notificationConnection, setNotificationConnection] =
    useState<any>(null);
  const [isNotificationConnected, setisNotificationConnected] = useState(false);
  const [notificationConnectionId, setNotificationConnectionId] =
    useState(null);

  useEffect(() => {
    const createNotificationConnection = async () => {
      const newNotificationConnection: any = new SignalR.HubConnectionBuilder()
        .withUrl(`https://a0c0-115-244-167-18.ngrok-free.app/notification`, {
          // .withUrl(`${apiUrl}/notification`, {
          //https://504a-115-244-167-18.ngrok-free.app/
          skipNegotiation: true,
          transport: SignalR.HttpTransportType.WebSockets,
          accessTokenFactory: () => {
            // Replace with your logic for getting the token
            return userToken;
          },
        })
        .configureLogging(SignalR.LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      const getNotificationConnectionId = async (conn: any) => {
        try {
          const NotificationConnectionId = await conn.invoke(
            "GetConnectionId",
            userData?.userId
          );
          console.log(
            "connectionId-=-=>NotificationConnectionId",
            NotificationConnectionId
          );

          setNotificationConnectionId(NotificationConnectionId);
        } catch (e) {
          console.log("Error getting NotificationConnection ID:  ", e);
        }
      };

      newNotificationConnection.onclose((e: any) => {
        setisNotificationConnected(false);
      });

      try {
        await newNotificationConnection.start();
        await getNotificationConnectionId(newNotificationConnection);
        setNotificationConnection(newNotificationConnection);
        setisNotificationConnected(true);
      } catch (e) {
        logger("SignalR NotificationConnection Error: ", e);
      }
    };

    const setupNotificationConnection = async () => {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        createNotificationConnection();
      }

      const unsubscribe = NetInfo.addEventListener((state: any) => {
        setisNotificationConnected(state.isConnected);
        if (state.isConnected && !notificationConnection) {
          if (notificationConnectionId == null) {
            createNotificationConnection();
          }
        }
      });

      return () => {
        if (notificationConnection) {
          notificationConnection.stop();
        }
        unsubscribe();
      };
    };

    setupNotificationConnection();
  }, [userData]);
  return {
    notificationConnection,
    isNotificationConnected,
    notificationConnectionId,
  };
};

export default useNotificationConnection;
