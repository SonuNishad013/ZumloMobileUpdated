import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ImageBackground,
  BackHandler,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import ChatHeader from "./ChatHeader";
import { MicroPhone, SentIcon } from "../../assets";
import colors from "../../constant/colors";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import useChatMessages from "./useChatMessages";
import useChatConnection from "./useChatConnection";
import styles from "./Style";
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
import { imagePath } from "../../assets/png/imagePath";
import { strings } from "../../constant/strings";
import { height, moderateScale, width } from "../../constant/responsiveStyle";
import * as AsyncStorage from "../../utils/Storage/AsyncStorage";
import { event } from "../../navigation/emitter";
import CommonLoader from "../../components/Loader";
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";
import MessageLimitFinishModal from "./MessageLimitFinishModal";
import allActions from "../../redux/actions";
import { API_FUN_NAMES } from "../../constant/APIsFunctionNames";
import { useDispatch, useSelector } from "react-redux";
import { STATUS_CODES } from "../../constant/appConstant";
import logger from "../../constant/logger";
import {
  getBuySubscriptionDetail,
  getSeekerInfoRedux,
} from "../../redux/selector";
import { TextConfig } from "../../utils/TextConfig";
import { subscriptionFun } from "../../constant/SubscriptionPlanValidation";
import { IAP_Strings } from "../SubscriptionPlan/IAP_Strings";
import { values } from "underscore";
import { useFocusEffect } from "@react-navigation/native";

var subscriptionStatus: any = false;
let silenceTimeout: NodeJS.Timeout | undefined;

const ChatScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const finalResultRef = useRef("");
  const subscriptionDetail = useSelector(getBuySubscriptionDetail());
  const getseekerInfoRedux = useSelector(getSeekerInfoRedux());
  const flatListRef = useRef<FlatList>(null);
  const { connection, isConnected, connectionId } = useChatConnection(
    route.params.userData,
    route.params.userTokenn
  );
  const {
    messages,
    sendMessage,
    loader,
    isLoadingAIResponse,
    clearTextBox,
    setClearTextBox,
  } = useChatMessages(connection, connectionId, route.params.userData);
  const [Convo, setConvo] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const { from, reqData, onSwiperChatClick } = route?.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCanSendMsg, setisCanSendMsg] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // NEW: Voice state management
  interface VoiceState {
    isListening: boolean;
    hasFinalResults: boolean;
    lastPartialResult: string;
    finalResult: string;
    error: { code?: string; message?: string } | null; // Updated to match the actual error structure
  }

  // Then update your useState declaration:
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    hasFinalResults: false,
    lastPartialResult: "",
    finalResult: "",
    error: null,
  });
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (messages?.length > 0) {
      setConvo(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      subscriptionStatus = await subscriptionFun(
        subscriptionDetail,
        getseekerInfoRedux
      );
    };
    init();
  }, [subscriptionDetail]);

  useEffect(() => {
    getMessageCount();
  }, [messages]);

  const getMessageCount = async () => {
    allActions.SubscriptionAction.GetAIChatCountForSubscriptionPlan(
      dispatch,
      "",
      API_FUN_NAMES?.getSubscriptionPlans
    )
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setMessageCount(response?.data?.chatCount);
        }
      })
      .catch((err) => {
        logger("API_ERROR_", err);
      });
  };

  // MODIFIED: onSendButtonClick with voice-specific handling
  const onSendButtonClick = () => {
    // For voice input, use the finalResult from voiceState
    const messageToSend = voiceState.hasFinalResults
      ? voiceState.finalResult
      : currentMessage;

    if (messageToSend.trim() === "") {
      console.warn("Attempted to send empty message");
      return;
    }

    if (subscriptionStatus) {
      sendMessage(messageToSend);
      setCurrentMessage("");
      finalResultRef.current = "";
      // Reset voice state after sending
      setVoiceState((prev) => ({
        ...prev,
        finalResult: "",
        hasFinalResults: false,
      }));
    } else {
      if (messageCount >= TextConfig?.AIChatmessageLimit) {
        setShowModal(true);
      } else {
        sendMessage(messageToSend);
        setCurrentMessage("");
        setVoiceState((prev) => ({
          ...prev,
          finalResult: "",
          hasFinalResults: false,
        }));
      }
    }
  };

  // MODIFIED: Voice event handlers
  useEffect(() => {
    Voice.onSpeechStart = () => {
      setVoiceState((prev) => ({
        ...prev,
        isListening: true,
        hasFinalResults: false,
        finalResult: "",
        lastPartialResult: "",
        error: null,
      }));
      setIsModalVisible(true);
      resetSilenceTimeout();
    };

    Voice.onSpeechRecognized = (e: SpeechRecognizedEvent) => {
      console.log("Speech recognized: ", e);
    };

    Voice.onSpeechEnd = () => {
      clearTimeout(silenceTimeout);
      setVoiceState((prev) => ({
        ...prev,
        isListening: false,
      }));

      // Delay modal closing to ensure final results are processed
      setTimeout(
        () => {
          setIsModalVisible(false);
          const latestResult = finalResultRef.current.trim();
          // Only proceed if we have valid results
          if (latestResult !== "") {
            setCurrentMessage(latestResult);
            setisCanSendMsg(true);
          }
        },
        //
        Platform?.OS === "ios" ? 500 : 1000
      );
    };

    Voice.onSpeechError = (e: SpeechErrorEvent) => {
      console.error("Speech error: ", e);
      setVoiceState((prev) => ({
        ...prev,
        isListening: false,
        error: e.error || null,
      }));
      setIsModalVisible(false);
    };

    Voice.onSpeechResults = (e: SpeechResultsEvent) => {
      console.log("Final speech results: ", e);
      if (e.value && e.value.length > 0 && e.value[0].trim() !== "") {
        finalResultRef.current = e.value[0]; // sync ref update
        setVoiceState((prev) => ({
          ...prev,
          finalResult: e.value[0],
          hasFinalResults: true,
        }));
      }
    };

    Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
      if (e.value && e.value.length > 0 && e.value[0].trim() !== "") {
        setVoiceState((prev) => ({
          ...prev,
          lastPartialResult: e.value[0],
        }));
        // Update UI with partial results but don't set as final message
        setCurrentMessage(e.value[0]);
      }
      resetSilenceTimeout();
    };

    return () => {
      clearTimeout(silenceTimeout);
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // MODIFIED: useEffect for message sending
  useEffect(() => {
    if (isCanSendMsg && voiceState.hasFinalResults) {
      onSendButtonClick();
      setisCanSendMsg(false);
    }
  }, [isCanSendMsg, voiceState.hasFinalResults]);

  const resetSilenceTimeout = () => {
    clearTimeout(silenceTimeout);
    silenceTimeout = setTimeout(() => {
      Voice.stop(); // Stop recognition
      setIsModalVisible(false); // Close modal after timeout
    }, 5000); // Adjust timeout duration as needed
  };

  // MODIFIED: toggleListening function
  const toggleListening = async () => {
    // Cancel any ongoing recognition
    if (voiceState.isListening) {
      try {
        await Voice.stop();
      } catch (e) {
        console.error("Error stopping voice: ", e);
      }
    }

    // Reset states
    setVoiceState({
      isListening: false,
      hasFinalResults: false,
      lastPartialResult: "",
      finalResult: "",
      error: null,
    });
    setCurrentMessage("");
    setisCanSendMsg(false);

    clearTimeout(silenceTimeout);
    setIsModalVisible(true);

    try {
      await Voice.start("en-US");
      resetSilenceTimeout();
    } catch (e) {
      console.error("Error starting voice: ", e);
      setIsModalVisible(false);
    }
  };

  // MODIFIED: Modal text to show partial results
  const renderModalText = () => {
    if (voiceState.error) {
      return "Error: " + voiceState.error;
    }
    if (voiceState.isListening) {
      return voiceState.lastPartialResult || "Listening...";
    }
    return "Processing...";
  };

  const renderItem = ({ item, index }) => {
    const isLastMessage = index === messages.length - 1;

    // Function to split text into sentences and highlight only questions
    const renderHighlightedText = (text) => {
      const sentences = text.match(/[^.!?]+[.!?]*/g) || []; // Split text by sentence-ending punctuation
      return sentences.map((sentence, idx) => {
        const isQuestion = sentence.trim().endsWith("?"); // Check if sentence ends with a question mark
        return (
          <Text
            key={idx}
            style={[
              styles.messageText,
              isQuestion && styles.highlightedText, // Apply highlighted style only to questions
            ]}
          >
            {sentence.trim()}
          </Text>
        );
      });
    };

    return (
      logger("currentMessage____", currentMessage),
      (
        <View style={{ marginHorizontal: moderateScale(15) }}>
          <TouchableOpacity
            style={[
              styles.messageContainer,
              {
                maxWidth: width - moderateScale(60),
                backgroundColor:
                  item.sender !== "User"
                    ? colors.prussianBlue
                    : `rgba(77, 58, 90, 1)`,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                borderBottomLeftRadius: item.sender !== "User" ? 0 : 10,
                borderBottomRightRadius: item.sender !== "User" ? 10 : 0,
                alignSelf: item.sender !== "User" ? "flex-start" : "flex-end",
                justifyContent:
                  item.sender !== "User" ? "flex-start" : "flex-end",
                borderColor:
                  item.sender !== "User"
                    ? colors.SurfCrest
                    : colors.royalOrange,
              },
            ]}
            onPress={() => setConvo(true)}
          >
            <View
              style={{
                justifyContent: "center",
              }}
            >
              {renderHighlightedText(item.jsonData)}
            </View>
          </TouchableOpacity>

          {item.sender === "User" && isLoadingAIResponse && isLastMessage ? (
            <View style={styles.mainContainer}>
              <Image source={imagePath.TypingAI} style={styles.loadingGif} />
            </View>
          ) : null}
        </View>
      )
    );
  };

  return (
    <ScreenWrapper
      statusBarColor={colors?.SaltBox}
      isFlexNeeded={Platform?.OS === "android" ? true : false}
    >
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={gifStyle.modalContainer}>
          <View style={gifStyle.modalContent}>
            <Image source={imagePath.MikeIcon} style={gifStyle.gifStyle} />
            {/* <Text style={gifStyle.modalText}>{renderModalText()}</Text> */}
          </View>
        </View>
      </Modal>
      <ImageBackground
        source={imagePath.ChatBackground}
        resizeMode={"cover"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {Convo && (
            <>
              <ChatHeader
                onPress={() => {
                  if (onSwiperChatClick) {
                    console.log("you back from  here gfhj");
                    event.emit(strings.login_);
                    AsyncStorage.storeItemKey(
                      AsyncStorage.ISPLANNER_USER,
                      JSON.stringify({ isPlanner: false, isSelected: true })
                    );
                  } else {
                    if (route?.params?.from === "AIGenerated") {
                      console.log("you back from  here 234");
                      event.emit(strings.login_);

                      AsyncStorage.storeItemKey(
                        AsyncStorage.ISPLANNER_USER,
                        JSON.stringify({ isPlanner: true, isSelected: true })
                      );
                    } else {
                      console.log("you back from  here");
                      navigation?.goBack();
                    }
                  }
                }}
                isBackIcon={Convo}
              />
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={
                  Platform.OS === "ios" ? moderateScale(50) : 1
                }
              >
                {!loader ? (
                  <AutoScrollFlatList
                    data={messages}
                    onScrollAnimationEnd={() => {
                      flatListRef.current?.scrollToEnd({ animated: false });
                    }}
                    initialNumToRender={messages?.length + 100}
                    ref={flatListRef}
                    threshold={20}
                    renderItem={renderItem}
                    keyExtractor={(item) => item?.id?.toString()}
                    scrollToEnd
                    onContentSizeChange={() =>
                      flatListRef.current?.scrollToEnd({ animated: false })
                    }
                    onLayout={() =>
                      flatListRef.current?.scrollToEnd({ animated: false })
                    }
                  />
                ) : (
                  <View
                    style={{
                      height: height * 0.74,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CommonLoader />
                  </View>
                )}
                <Footer
                  currentMessage={currentMessage}
                  setCurrentMessage={setCurrentMessage}
                  sendMessage={onSendButtonClick}
                  isLoading={isLoadingAIResponse}
                  toggleListening={toggleListening}
                />
              </KeyboardAvoidingView>
            </>
          )}
        </View>
      </ImageBackground>

      <MessageLimitFinishModal
        navigation={navigation}
        visible={showModal}
        setShowModal={setShowModal}
        title={IAP_Strings?.AI_chat_title}
        detail={IAP_Strings?.AI_chat_desc}
      />
    </ScreenWrapper>
  );
};

const Footer = ({
  currentMessage,
  setCurrentMessage,
  sendMessage,
  isLoading,
  toggleListening,
}: any) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputSubContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"I'm all ears. Just type away..."}
            value={currentMessage}
            onChangeText={setCurrentMessage}
            placeholderTextColor={colors.SilverChalice}
            multiline={true}
          />
        </View>
        <TouchableOpacity onPress={toggleListening}>
          <MicroPhone />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={sendMessage}
        disabled={
          isLoading == false ? (currentMessage.length > 0 ? false : true) : true
        }
        style={{
          opacity:
            isLoading == false ? (currentMessage.length > 0 ? 1 : 0.3) : 0.3,
        }}
      >
        <SentIcon />
      </TouchableOpacity>
    </View>
  );
};

const gifStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: moderateScale(200),
    height: moderateScale(200),
    backgroundColor: colors.lightSurfCrest,
    borderRadius: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(10),
  },
  gifStyle: {
    width: moderateScale(100),
    height: moderateScale(100),
    resizeMode: "contain",
  },
  modalText: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(16),
    color: "#000",
    textAlign: "center",
  },
});

export default ChatScreen;
