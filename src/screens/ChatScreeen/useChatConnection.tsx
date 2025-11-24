import { useEffect, useState, useRef } from "react";
import * as SignalR from "@microsoft/signalr";
import NetInfo from "@react-native-community/netinfo";
import appConstant from "../../constant/appConstant";
import logger from "../../constant/logger";
import { useSelector } from "react-redux";
import { getSeekerDetailsData } from "../../redux/selector";
import { findValueByKey } from "../Dashboard/Summary/component/Hooks/transformGoalsFromAPI";

const useChatConnection = (userData: any, userToken: any) => {
  const apiUrl = appConstant.socketUrl;
  const [connection, setConnection] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionId, setConnectionId] = useState(null);
  const isConnecting = useRef(false);
  const hasConnectionId = useRef(false);
  let userDetails_ = useSelector(getSeekerDetailsData()); //|| userDetails_?.userId,
  const needUserId = findValueByKey(userDetails_, "userId");
  useEffect(() => {
    if (isConnecting.current || !userData || hasConnectionId.current) {
      return;
    }
    const createConnection = async () => {
      isConnecting.current = true;
      const newConnection: any = new SignalR.HubConnectionBuilder()
        .withUrl(`${apiUrl}/chat`, {
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

      const getConnectionId = async (conn) => {
        console.log("Fetching connection ID...", {
          conn,
          userDetails_,
          needUserId,
        });

        try {
          const newConnectionId = await conn.invoke(
            "GetConnectionId",
            userData?.userId || needUserId
          );
          console.log("Fetched connectionId: ", newConnectionId);
          setConnectionId(newConnectionId);
          hasConnectionId.current = true;
          return newConnectionId;
        } catch (e) {
          console.log("Error getting connection ID: ", e);
        }
      };

      newConnection.onclose(() => {
        setIsConnected(false);
        hasConnectionId.current = false;
      });

      try {
        await newConnection.start();
        await getConnectionId(newConnection);
        setConnection(newConnection);
        setIsConnected(true);
      } catch (e) {
        logger("SignalR Connection Error: ", e);
      } finally {
        isConnecting.current = false;
      }
    };

    const setupConnection = async () => {
      const state = await NetInfo.fetch();
      if (state.isConnected && !connectionId && !hasConnectionId.current) {
        await createConnection();
      }

      const unsubscribe = NetInfo.addEventListener(async (state: any) => {
        setIsConnected(state.isConnected);
        if (
          state.isConnected &&
          !connection &&
          !connectionId &&
          !hasConnectionId.current
        ) {
          await createConnection();
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
  }, [userData, connection]);

  return { connection, isConnected, connectionId };
};

export default useChatConnection;
