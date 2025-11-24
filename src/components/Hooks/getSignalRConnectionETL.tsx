import { useEffect, useState, useRef } from "react";
import * as SignalR from "@microsoft/signalr";
import NetInfo from "@react-native-community/netinfo";
import appConstant from "../../constant/appConstant";
import DeviceInfo from "react-native-device-info";
import logger from "../../constant/logger";

const useDynamicPromptingHub = (userToken: any, userID: any) => {
  const apiUrl = appConstant.AISocketurl;
  const [connection, setConnection] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionId, setConnectionId] = useState<string | null>(null);
  const hasInitialized = useRef(false); // Track initialization
  const isConnectionIdSet = useRef(false); // Track if connectionId is already set

  useEffect(() => {
    if (
      hasInitialized.current ||
      !userToken ||
      !userID ||
      isConnectionIdSet.current
    ) {
      // Skip effect if already initialized, dependencies are missing, or connectionId is already set
      return;
    }

    hasInitialized.current = true; // Mark initialization as done

    const createConnection = async () => {
      const DeviceID = await DeviceInfo.getUniqueId();

      const newConnection: any = new SignalR.HubConnectionBuilder()
        .withUrl(`${apiUrl}/dynamicPromptingHub`, {
          skipNegotiation: true,
          transport: SignalR.HttpTransportType.WebSockets,
          accessTokenFactory: () => {
            return userToken;
          },
        })
        .configureLogging(SignalR.LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      const getConnectionId = async (conn: any) => {
        try {
          const connectionId = await conn.invoke(
            "GetConnectionId",
            userID,
            DeviceID
          );

          if (connectionId && !isConnectionIdSet.current) {
            setConnectionId(connectionId);
            isConnectionIdSet.current = true; // Mark connectionId as set
          }
        } catch (e) {
          console.log("Error getting connection ID:  ", e);
        }
      };

      newConnection.onclose(() => {
        setIsConnected(false);
      });

      try {
        await newConnection.start();
        if (!isConnectionIdSet.current) {
          await getConnectionId(newConnection);
        }
        setConnection(newConnection);
        setIsConnected(true);
      } catch (e) {
        logger("SignalR Connection Error: ", e);
      }
    };

    const setupConnection = async () => {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        createConnection();
      }

      const unsubscribe = NetInfo.addEventListener((state: any) => {
        setIsConnected(state.isConnected);
        if (state.isConnected && !connection && !isConnectionIdSet.current) {
          createConnection();
        }
      });

      return () => {
        if (connection) {
          connection.stop();
        }
        unsubscribe();
      };
    };

    setupConnection();
  }, [userToken, userID]); // Dependencies for token and user ID

  return { connection, isConnected, connectionId };
};

export default useDynamicPromptingHub;
