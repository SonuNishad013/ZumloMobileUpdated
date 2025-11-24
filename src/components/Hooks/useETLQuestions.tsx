import { useEffect, useState } from "react";
import { aiProvider } from "../../constant/appConstant";

const useETLQuestions = (
  connection: any,
  connectionId: any,
  userData: any,
  DeviceID: any,
  isMoodJournaling: boolean
) => {
  const [loader, setLoader] = useState(true);
  const [isLoadingAIResponse, setIsLoadingAIResponse] = useState(false);
  const [parsedResponseData, setParsedResponseData] = useState(null);

  useEffect(() => {
    if (!connection) {
      console.warn("No active connection available!");
      return;
    }

    const setupSocketListeners = () => {
      setLoader(true);

      console.log(
        "Setting up socket listener for isdynamicquestionrequired..."
      );

      // Avoid duplicate listeners

      connection.off("isdynamicquestionrequired");
      connection.on("isdynamicquestionrequired", async (res, key) => {
        try {
          const parsedResponse = JSON.parse(res);
          console.log(
            "Received isdynamicquestionrequired response:",
            parsedResponse,
            key
          );

          if (!key) return;

          const req = {
            UserId: parsedResponse.user_id,
            AIProvider: aiProvider?.ETL,
            QuoteMood: parsedResponse.quote_mood,
            Model: parsedResponse.model,
            Message: parsedResponse.message,
            ResponseType: parsedResponse.response_type,
            DeviceId: DeviceID,
            FormType: isMoodJournaling ? 1 : 2, //journal 1
            SignalRHubType: 3,
            id: parsedResponse.id,
          };

          console.log("Request for AI Dynamic Prompting:", req);

          // Invoke AI Dynamic Prompting
          connection
            .invoke("AIDynamicPromptingToMoodJournalAndTracking", req)
            .catch((err: any) =>
              console.error("Error invoking AI method:", err.toString())
            );

          // Handle AI response
          connection.off("DynamicPromptingResponse");
          connection.on("DynamicPromptingResponse", (response: any) => {
            console.log("Received DynamicPromptingResponse:", response);
            setParsedResponseData(response);
          });
        } catch (error) {
          console.error(
            "Error parsing isdynamicquestionrequired response:",
            error
          );
        }
      });
    };

    setupSocketListeners();

    // Cleanup to prevent duplicate listeners
    return () => {
      console.log("Cleaning up event listeners...");
      connection.off("isdynamicquestionrequired");
      connection.off("DynamicPromptingResponse");
    };
  }, [connection, connectionId, DeviceID]);

  return { loader, isLoadingAIResponse, parsedResponseData };
};

export default useETLQuestions;
