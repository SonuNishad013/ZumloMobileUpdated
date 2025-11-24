import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import {
  API_FUN_NAMES,
  SOCKET_FUN_NAME,
} from "../../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../../constant/appConstant";
import logger from "../../../constant/logger";
import { DATE_FORMAT } from "../../../constant/DateFormats";
import { CHAT } from "../../../constant/ENUM";

const useChatMessages = (
  connection_: any,
  connectionId_: any,
  userData: any,
  memberData: any,
  currentId_: any
) => {
  const dispatch: any = useDispatch();
  const [loader, setLoader] = useState(false);
  const [isLoadingAIResponse, setIsLoadingAIResponse] = useState(false);
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    getChat(false);
  }, []);
  const getChat = async (forFirstTime: boolean) => {
    let queryParams = `?senderMemberId=${currentId_}&receiverMemberId=${memberData?.id}`;
    try {
      const response: any = await allActions.communitiesAction.getChat(
        dispatch,
        {},
        API_FUN_NAMES?.getChat,
        queryParams
      );

      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        if (forFirstTime) {
          return response?.data;
        } else {
          setMessages(response?.data);
        }
      }
    } catch (err: any) {
      logger("err", err);
    }
  };

  const removeDuplicates = (messages: any) => {
    const uniqueMessages = new Map();
    messages.forEach((msg: any) => {
      uniqueMessages.set(msg.id, msg); // Stores only unique IDs
    });
    return Array.from(uniqueMessages.values());
  };
  const handleMesssages = useCallback(
    async (message: any) => {
      const getMessagesUpto = await getChat(true);
      if (getMessagesUpto.at(-1) === undefined) return;
      let lastOldId = getMessagesUpto[getMessagesUpto?.length - 1]?.id || 0;
      if (lastOldId === 0) return;
      const msg = {
        id: lastOldId + 1,
        senderMemberId: currentId_,
        receiverMemberId: memberData?.id,
        chatMessage: message,
        createdTime: moment().utc().format(DATE_FORMAT?.Date_with_time_seconds),
        chatSender: CHAT?.You,
      };

      setTimeout(() => {
        setMessages(() => {
          const filteredData = removeDuplicates(getMessagesUpto);
          return filteredData;
        });
      }, 200);
    },
    [connection_, messages]
  );
  useEffect(() => {
    if (connection_) {
      connection_.on(
        SOCKET_FUN_NAME?.ReceiveChatMessage,
        async (message: any) => {
          handleMesssages(message);
        }
      );

      const getChatData = async () => {
        const payload = {
          senderMemberId: currentId_, //owner
          receiverMemberId: memberData?.id,
          userId: userData?.userId,
          pageSize: 45,
          pageIndex: 0,
        };
        const getMessagesUpto = await getChat(true);
        try {
          await connection_.invoke("GetChatHistory", payload);
          await connection_.on("GetCommunityChatHistory", (res: any) => {
            setMessages(removeDuplicates(getMessagesUpto));
            setLoader(false);
          });
        } catch (err) {
          logger("err:getChatData", err);
        }
      };
      getChatData();
    } else {
      logger("connection_000>connection_ else", connection_);
    }
  }, [connection_, connectionId_]);

  const sendMessage = async (messageText: any) => {
    const getMessagesUpto = await getChat(true);
    if (connection_ && connectionId_) {
      const payload = {
        userId: userData?.userId, //login user id
        receiverMemberId: memberData?.id, //reciever Member id
        chatMessage: messageText,
        attachmentUrl: "",
        receiverUserId: memberData?.userId, //receiver's user ID
      };
      let lastOldId = getMessagesUpto[getMessagesUpto?.length - 1]?.id || 0;
      const msg = {
        id: lastOldId + 1,
        senderMemberId: currentId_,
        receiverMemberId: memberData?.id,
        chatMessage: messageText,
        createdTime: moment().utc().format(DATE_FORMAT?.Date_with_time_seconds),
        chatSender: CHAT?.Me,
      };
      try {
        await connection_.send(SOCKET_FUN_NAME?.SendMessage, payload);
        if (messageText)
          setTimeout(async () => {
            setMessages(() => {
              const filteredData = removeDuplicates([...getMessagesUpto, msg]);
              return filteredData;
            });
          }, 200);
        setIsLoadingAIResponse(true); // Start loading AI response
      } catch (err) {
        setIsLoadingAIResponse(true);
        logger("Something went wrong 1");
      }
    }
  };

  return {
    messages,
    sendMessage,
    loader,
    isLoadingAIResponse,
  };
};

export default useChatMessages;
