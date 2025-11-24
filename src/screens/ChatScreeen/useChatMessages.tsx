import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSeekerDetailsData } from "../../redux/selector";

const useChatMessages = (connection, connectionId, userData) => {
  let userDetails_ = useSelector(getSeekerDetailsData()); //|| userDetails_?.userId,
  const needUserDetails = userData?.basicInformation
    ? userData
    : userDetails_?.data;

  const [messages, setMessages] = useState([
    {
      jsonData:
        "Hi " +
        `${
          needUserDetails?.basicInformation?.userName
            ? needUserDetails?.basicInformation?.userName
            : ""
        }` +
        ", I am here to listen. Tell me what's going on?",
      sender: "AI",
    },
  ]);
  const [clearTextBox, setClearTextBox] = useState(false);
  const [loader, setLoader] = useState(true);
  const [connectionData, setConnectionData] = useState(null);
  const [isLoadingAIResponse, setIsLoadingAIResponse] = useState(false); // New loading state for AI response

  useEffect(() => {
    setMessages([
      {
        jsonData:
          "Hi " +
          `${
            needUserDetails?.basicInformation?.userName
              ? needUserDetails?.basicInformation?.userName
              : ""
          }` +
          ", I am here to listen. Tell me what's going on?",
        sender: "AI",
      },
    ]);

    if (connection) {
      connection.on("ReceiveMessage", (message: any) => {
        let data;
        try {
          data = JSON.parse(message);
          console.log("Fetched connectionId: message-=-=-=>", data);
        } catch (error) {
          console.log("Error parsing message:", error);
          return;
        }

        if (data && data["Success"]) {
          data = data.Data.Message.replace(/^(?:```json|```)$/g, "").trim();

          console.log("data for repeated chat connection==>", data, connection);
          const msg = {
            sender: "AI",
            jsonData: data,
          };
          setMessages((prevMessages) => [...prevMessages, msg]);
          setIsLoadingAIResponse(false); // Stop loading when AI response is received
        }
        setLoader(false);
      });

      const getChatData = async () => {
        setLoader(true);
        const payload = {
          ConnectionId: connectionId,
          UserId: needUserDetails?.userId,
          CategoryName: "Chat",
          sender: "User",
          PageSize: 45,
          PageNumber: 1,
          IsGreeting: true,
        };
        console.log("Fetched connectionId: payload histor==>", payload);

        try {
          connection.invoke("GetUserAIChatHistory", payload);
          connection.on("GetUserAIChatHistory", (res: any) => {
            console.log(
              "Fetched connectionId: check resp for get history==>",
              res?.data?.messageData
            );

            setConnectionData(res);
            setMessages(res?.data?.messageData.reverse());
            setLoader(false);
          });
        } catch (err) {
          console.log("err-=-=>", err);
        }
      };

      getChatData();
    }
  }, [connection, connectionId]);
  console.log("onnection, connectionId", connection, connectionId);

  const sendMessage = async (messageText: any) => {
    setClearTextBox(false);
    if (connection && connectionId) {
      const payload = {
        ConnectedId: connectionId,
        UserId: needUserDetails?.userId,
        CategoryName: "Chat",
        jsonData: messageText,
        sender: "User",
        ConversationId: connectionData ? connectionData.data.conversationId : 0,
      };
      console.log("Fetched connectionId: sendMessage payload", payload);
      const msg = {
        sender: "User",
        jsonData: messageText,
      };
      try {
        await connection.send("SendMessage", payload);
        if (messageText) setMessages((prevMessages) => [...prevMessages, msg]);
        setIsLoadingAIResponse(true); // Start loading AI response
        setClearTextBox(true);
      } catch (err) {}
    }
  };

  return {
    messages,
    sendMessage,
    loader,
    isLoadingAIResponse,
    clearTextBox,
    setClearTextBox,
  }; // Return the new state
};

export default useChatMessages;
