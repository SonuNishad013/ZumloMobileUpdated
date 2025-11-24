import { useEffect, useState, useRef } from "react";
import * as SignalR from "@microsoft/signalr";
import NetInfo from "@react-native-community/netinfo";
import appConstant from "../../../constant/appConstant";
import logger from "../../../constant/logger";
import {
  API_FUN_NAMES,
  SOCKET_FUN_NAME,
} from "../../../constant/APIsFunctionNames";

const useChatConnection = (userData: any, userToken: any, deviceID: any) => {
  const apiUrl = appConstant.communitySocketUrl;
  const [connection_, setConnection_] = useState<any>(null);
  const [isConnected_, setIsConnected_] = useState(false);
  const [connectionId_, setConnectionId_] = useState(null);
  const isConnecting = useRef(false);
  const hasConnectionId = useRef(false);

  useEffect(() => {
    if (isConnecting.current || !userData || hasConnectionId.current) {
      return;
    }
    const createConnection = async () => {
      isConnecting.current = true;
      const newConnection: any = new SignalR.HubConnectionBuilder()
        .withUrl(`${apiUrl}/${SOCKET_FUN_NAME?.communityChat}`, {
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
          const newConnectionId = await conn.invoke(
            SOCKET_FUN_NAME?.GetConnectionId,
            userData?.userId,
            deviceID
          );

          setConnectionId_(newConnectionId);
          hasConnectionId.current = true;
        } catch (e) {
          logger("Error getting connection_ ID: ", e);
        }
      };
      newConnection.onclose(() => {
        setIsConnected_(false);
        hasConnectionId.current = false;
      });

      try {
        await newConnection.start();
        deviceID && getConnectionId(newConnection);
        setConnection_(newConnection);
        setIsConnected_(true);
      } catch (e) {
        setIsConnected_(false);
      } finally {
        isConnecting.current = false;
      }
    };

    const setupConnection = async () => {
      if (!connectionId_ && !hasConnectionId.current) {
        await createConnection();
      }
      const unsubscribe = NetInfo.addEventListener((state: any) => {
        setIsConnected_(state.isConnected_);
        if (!connection_ && !connectionId_ && !hasConnectionId.current) {
          createConnection();
        } else {
          setIsConnected_(true);
        }
      });

      return () => {
        if (connection_) {
          connection_.stop();
        }
        unsubscribe();
      };
    };
    setupConnection();
  }, [userData]);

  return { connection_, isConnected_, connectionId_ };
};

export default useChatConnection;
