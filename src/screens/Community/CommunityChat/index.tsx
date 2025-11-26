import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  BackHandler,
  Keyboard,
  Image,
} from "react-native";
import colors from "../../../constant/colors";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import useChatMessages from "./useChatMessages";
import useChatConnection from "./useChatConnection";
import styles, { getMessageArea } from "./Style";
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
import { imagePath } from "../../../assets/png/imagePath";
import { height, moderateScale } from "../../../constant/responsiveStyle";
import CommonLoader from "../../../components/Loader";
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";
import ChatFooter from "./ChatFooter";
import SpeechModal from "./SpeechModal";
import { NoMessageIcon } from "../../../assets";
import { strings } from "../../../constant/strings";
import ChatHeaderCommunity from "./ChatHeaderCommunity";
import logger from "../../../constant/logger";
import { APPLY_STATUS, PLATEFORM } from "../../../constant/ENUM";
import { useSelector } from "react-redux";
import { profileDetailsCommunity } from "../../../redux/selector";
let silenceTimeout: NodeJS.Timeout | undefined;
interface Props {
  navigation?: any;
  route?: any;
}
const CommunityChat: React.FC<Props> = ({ navigation, route }: any) => {
  const { deviceID } = route.params;

  const flatListRef = useRef<any>(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCanSendMsg, setisCanSendMsg] = useState(false);
  const { connection_, isConnected_, connectionId_ }: any = useChatConnection(
    route.params.userData,
    route.params.userToken_,
    deviceID
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const memberDataCurrent = useSelector(profileDetailsCommunity());

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const { messages, sendMessage, loader } = useChatMessages(
    connection_,
    connectionId_,
    route.params.userData,
    route.params.memberData_,
    route.params.currentId_
  );
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

  const onSendButtonClick = () => {
    sendMessage(currentMessage);
    setCurrentMessage("");
  };
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      clearTimeout(silenceTimeout); // Clear timeout on unmount
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setIsModalVisible(true); // Open modal
    resetSilenceTimeout(); // Reset silence timeout

    setisCanSendMsg(false);
  };

  let sendMessageFlag = false; // Define outside of the component

  useEffect(() => {
    if (isCanSendMsg && !sendMessageFlag) {
      sendMessageFlag = true; // Lock sending
      onSendButtonClick();
      setisCanSendMsg(false); // Reset state
      setTimeout(() => {
        sendMessageFlag = false; // Unlock for next message
      }, 1000); // Prevent spam in a short duration
    }
  }, [isCanSendMsg]);

  const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    logger("Speech recognized: ", e);
  };

  const onSpeechEnd = () => {
    logger("Speech ended");
    if (Platform.OS === "ios") {
      clearTimeout(silenceTimeout); // Clear timeout

      // Optionally delay the modal closure to avoid clearing results too early
      setisCanSendMsg(true);
      setCurrentMessage("");
      setTimeout(() => {
        setIsModalVisible(false); // Close modal after recognition ends
      }, 500); // Delay to ensure the results are shown before closing
    } else {
      clearTimeout(silenceTimeout); // Clear timeout

      // Optionally delay the modal closure to avoid clearing results too early
      setIsModalVisible(false); // Close modal after recognition ends
      setCurrentMessage("");
      setTimeout(() => {
        setisCanSendMsg(true);
      }, 50); // Delay to ensure the results are shown before closing
    }
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    logger("Speech error: ", e.error);

    setIsModalVisible(false); // Close modal on error
    setisCanSendMsg(false);
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    logger("Speech results: ", e);
    if (e.value && e.value.length > 0 && e.value[0].trim() !== "") {
      setCurrentMessage(e.value[0]); // Update current message only if there's valid text
    } else {
      logger(
        "Empty or invalid speech result, retaining currentMessage:",
        currentMessage
      );
    }
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    if (e.value && e.value.length > 0 && e.value[0].trim() !== "") {
      setCurrentMessage(e.value[0]); // Update current message only if there's valid text
    } else {
      logger(
        "Empty or invalid partial result, retaining currentMessage:",
        currentMessage
      );
    }

    resetSilenceTimeout(); // Extend timeout when speech is detected
  };

  const resetSilenceTimeout = () => {
    clearTimeout(silenceTimeout);
    silenceTimeout = setTimeout(() => {
      Voice.stop(); // Stop recognition
      setIsModalVisible(false); // Close modal after timeout
    }, 5000); // Adjust timeout duration as needed
  };

  //prussianBlue
  const renderItem = ({ item, index }: any) => {
    const isSender = route.params.currentId_ === item?.senderMemberId;

    // Function to split text into sentences and highlight only questions
    const renderHighlightedText = (text: any, isSender: any) => {
      const sentences = text?.match(/[^.!]+[.!]*/g) || []; // Split text by sentence-ending punctuation

      return sentences.map((sentence: any, idx: any) => {
        // const isQuestion = sentence.trim().endsWith("?"); // Check if sentence ends with a question mark
        return (
          <View>
            <Text
              key={`${sentence}-${idx}`}
              style={[
                styles.messageText,
                false && styles.highlightedText,
                {
                  color:
                    isSender !== "You"
                      ? colors?.SurfCrest
                      : colors?.prussianBlue,
                },
              ]}
            >
              {sentence.trim()}
            </Text>
          </View>
        );
      });
    };

    return (
      <View
        style={[
          styles.innerViewContainer,
          { alignSelf: item.chatSender == "Me" ? "flex-end" : "flex-start" },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            styles.messageContainer,
            getMessageArea(item.chatSender !== "You"),
          ]}
          onPress={() => {}}
        >
          {renderHighlightedText(item?.chatMessage, item.chatSender)}
        </TouchableOpacity>
        {item.chatSender == "Me" && (
          <View style={{ marginLeft: moderateScale(15) }}>
            <Image
              source={
                memberDataCurrent?.aliasProfilePicture !== ""
                  ? { uri: memberDataCurrent?.aliasProfilePicture } //Logged in user Profile picture. My image
                  : imagePath?.dummyProfileIcon
              }
              style={styles.innerImageStyle}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    );
  };
  return (
    <ScreenWrapper
      statusBarColor={colors?.SaltBox}
      isFlexNeeded={Platform?.OS === "android" ? true : false}
    >
      <SpeechModal
        isModalVisible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      />
      <ImageBackground
        source={imagePath.ChatBackground}
        resizeMode={APPLY_STATUS?.cover}
        style={styles.addFlex}
      >
        <View style={styles.container}>
          <ChatHeaderCommunity
            data={route?.params?.memberData_}
            navigation={navigation}
          />

          <KeyboardAvoidingView
            style={styles.KeyboardAvoidingViewStyle}
            behavior={
              Platform.OS === PLATEFORM?.ios
                ? messages.length > 0
                  ? APPLY_STATUS?.padding
                  : APPLY_STATUS?.position
                : "height"
            }
            keyboardVerticalOffset={
              Platform.OS === PLATEFORM?.ios
                ? messages.length > 0
                  ? moderateScale(50)
                  : moderateScale(40)
                : moderateScale(15)
            }
          >
            {!loader ? (
              <>
                {messages?.length > 0 ? (
                  <AutoScrollFlatList
                    data={messages}
                    onScrollAnimationEnd={() => {
                      flatListRef.current?.scrollToEnd({ animated: false });
                    }}
                    initialNumToRender={messages?.length + 100}
                    ref={flatListRef}
                    threshold={20}
                    renderItem={renderItem}
                    contentContainerStyle={styles.contentContainerStyle}
                    keyExtractor={(item: any) => item?.id?.toString()}
                    onContentSizeChange={() =>
                      flatListRef.current?.scrollToEnd({ animated: false })
                    }
                    onLayout={() =>
                      flatListRef.current?.scrollToEnd({ animated: false })
                    }
                  />
                ) : (
                  <>
                    <View
                      style={
                        Platform?.OS == "ios"
                          ? styles?.hightView_ios
                          : styles?.hightView_android
                      }
                    >
                      {!isKeyboardVisible && (
                        <>
                          <NoMessageIcon />
                          <Text style={styles?.noMessage}>
                            {strings?.noMessage}
                          </Text>
                        </>
                      )}
                    </View>
                  </>
                )}
              </>
            ) : (
              <View
                style={
                  Platform?.OS == "ios"
                    ? styles?.hightView_ios
                    : styles?.hightView_android
                }
              >
                <CommonLoader />
              </View>
            )}
            <ChatFooter
              currentMessage={currentMessage}
              setCurrentMessage={setCurrentMessage}
              sendMessage={onSendButtonClick}
            />
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </ScreenWrapper>
  );
};

export default CommunityChat;
