import React, { useState, useEffect, ReactElement } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
  Animated,
  ImageBackground,
} from "react-native";
import {
  BackIcon2,
  ChatIcon,
  ChatSendIcon,
  CloseIcon,
  DocumentIcon,
  EyeIcon,
  InfoIcon,
  MikeIcon,
} from "../../assets";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import colors from "../../constant/colors";
import {
  moderateScale,
  textScale,
  width,
} from "../../constant/responsiveStyle";
// import Voice, {
//     SpeechRecognizedEvent,
//     SpeechResultsEvent,
//     SpeechErrorEvent,
// } from '@react-native-community/voice';
import ImagePicker from "react-native-image-crop-picker";

interface Props {
  navigation?: any;
  item: any;
}
const ChatWithDr: React.FC<Props> = ({ navigation, item }): ReactElement => {
  // useEffect(() => {
  //     Voice.onSpeechStart = onSpeechStart;
  //     Voice.onSpeechRecognized = onSpeechRecognized;
  //     Voice.onSpeechEnd = onSpeechEnd;
  //     Voice.onSpeechError = onSpeechError;
  //     Voice.onSpeechResults = onSpeechResults;
  //     Voice.onSpeechPartialResults = onSpeechPartialResults;
  //     Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

  //     // Cleanup when the component unmounts
  //     return () => {
  //         Voice.destroy().then(Voice.removeAllListeners);
  //     };
  // }, []);
  const [state, setState] = useState({
    recognized: "",
    pitch: "",
    error: "",
    end: "",
    started: "",
    results: [],
    partialResults: [],
    docuemnt: "",
  });
  const [chatUser] = useState({
    name: "Robert Henry",
    profile_image: "https://randomuser.me/api/portraits/men/0.jpg",
    last_seen: "online",
  });

  const [currentUser] = useState({
    name: "John Doe",
  });
  const [imageData, setimageData] = useState();
  const [messages, setMessages] = useState([
    { sender: "John Doe", message: "Hi there!", time: "6:01 PM", doc: "" },
    {
      sender: "Robert Henry",
      message: "Hello, how are you doing?",
      time: "6:02 PM",
      doc: "",
    },
    // {
    //     sender: 'John Doe',
    //     message: 'I am good, how about you?',
    //     time: '6:02 PM',
    // },
    // {
    //     sender: 'John Doe',
    //     message: `😊😇`,
    //     time: '6:02 PM',
    // },
    // {
    //     sender: 'Robert Henry',
    //     message: `Can't wait to meet you.`,
    //     time: '6:03 PM',
    // },
    // {
    //     sender: 'John Doe',
    //     message: `That's great, when are you coming?`,
    //     time: '6:03 PM',
    // },
    // {
    //     sender: 'Robert Henry',
    //     message: `This weekend.`,
    //     time: '6:03 PM',
    // },
    // {
    //     sender: 'Robert Henry',
    //     message: `Around 4 to 6 PM.`,
    //     time: '6:04 PM',
    // },
    // {
    //     sender: 'John Doe',
    //     message: `Great, don't forget to bring me some mangoes.`,
    //     time: '6:05 PM',
    // },
    // {
    //     sender: 'Robert Henry',
    //     message: `Sure!`,
    //     time: '6:05 PM',
    // },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  function sendMessage(image: any) {
    if (inputMessage === "") {
      return setInputMessage("");
    }
    let t = getTime(new Date());
    setMessages([
      ...messages,
      {
        sender: currentUser.name,
        message: state?.results[0],
        // doc:imageData?.path,
        time: t,
      },
    ]);
    setInputMessage("");
  }

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            {/* <Icon
              name='angle-left'
              type='font-awesome'
              size={30}
              color='#fff'
            /> */}
            <ChatIcon />
          </TouchableOpacity>
          <Image
            style={styles.userProfileImage}
            source={{ uri: chatUser.profile_image }}
          />
          <View
            style={{
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 18 }}>
              {chatUser.name}
            </Text>
            <Text style={{ color: "#fff", fontWeight: "300" }}>
              {chatUser.last_seen}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          onPress={() => {
            Alert.alert("Audio Call", "Audio Call Button Pressed");
          }}
        >
          {/* <Icon name='call' size={28} color='#fff' /> */}
          <EyeIcon />
        </TouchableOpacity>
      ),
    });
  }, []);
  const onSpeechStart = (e: any) => {
    console.log("onSpeechStart: ", e);
    setState((prevState) => ({
      ...prevState,
      started: "√",
    }));
  };

  const onSpeechRecognized = (e: any) => {
    console.log("onSpeechRecognized: ", e);
    setState((prevState) => ({
      ...prevState,
      recognized: "√",
    }));
  };

  const onSpeechEnd = (e: any) => {
    console.log("onSpeechEnd: ", e);
    setState((prevState) => ({
      ...prevState,
      end: "√",
    }));
  };

  const onSpeechError = (e: any) => {
    console.log("onSpeechError: ", e);
    setState((prevState) => ({
      ...prevState,
      error: JSON.stringify(e.error),
    }));
  };

  const onSpeechResults = (e: any) => {
    console.log("onSpeechResults: ", e);
    setState((prevState) => ({
      ...prevState,
      results: e.value,
    }));
  };

  const onSpeechPartialResults = (e: any) => {
    console.log("onSpeechPartialResults: ", e);
    setState((prevState) => ({
      ...prevState,
      partialResults: e.value,
    }));
  };

  const onSpeechVolumeChanged = (e: any) => {
    console.log("onSpeechVolumeChanged: ", e);
    setState((prevState) => ({
      ...prevState,
      pitch: e.value,
    }));
  };

  const startRecognizing = async () => {
    setState((prevState) => ({
      ...prevState,
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
    }));

    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    setState((prevState) => ({
      ...prevState,
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
    }));
  };
  const onDocumentSelect = () => {
    // DocumentPicker.pick({
    //      allowMultiSelection: true
    //     }).then((resp=>
    //         {
    //         console.log("check resp===>",setState)

    //     })

    //     ).catch(err=>err)
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    }).then((image: any) => {
      setimageData(image);
      sendMessage(image);
      // setisImageSelected(true)
      // setimageErrMsg("");
    });
  };
  const chatHeader = () => {
    return (
      <View
        style={{
          height: moderateScale(40),
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{}}>
          <BackIcon2 />
        </View>
        <View style={{ flexDirection: "row", width: moderateScale(280) }}>
          <View
            style={{
              marginHorizontal: moderateScale(10),
              borderWidth: moderateScale(2),
              borderColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              height: moderateScale(32),
              width: moderateScale(32),
              borderRadius: moderateScale(26),
            }}
          >
            <View
              style={{
                height: moderateScale(30),
                width: moderateScale(30),
                borderRadius: moderateScale(15),
              }}
            >
              <Image
                source={{ uri: "https://picsum.photos/200/300" }}
                // resizeMode={'contain'}
                style={{
                  height: moderateScale(30),
                  width: moderateScale(30),
                  borderRadius: moderateScale(15),
                }}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: textScale(14),
                fontWeight: "600",
                color: colors.SurfCrest,
              }}
            >
              {"Name shb"}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  height: moderateScale(8),
                  width: moderateScale(8),
                  borderRadius: moderateScale(8),
                  backgroundColor: "green",
                }}
              />

              <Text
                style={{
                  fontSize: textScale(10),
                  fontWeight: "400",
                  color: colors.SurfCrest,
                }}
              >
                {"Active Always"}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <InfoIcon />
        </View>
      </View>
    );
  };
  return (
    console.log("state===>====>", state),
    console.log("check image===>", messages),
    (
      <ScreenWrapper statusBarColor={colors.backgroundTheme}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={{ marginHorizontal: moderateScale(15) }}>
              {chatHeader()}
            </View>
            <View style={{ backgroundColor: colors.grey, height: 1 }} />
            <FlatList
              keyExtractor={(item, index) => "key" + index}
              style={{ backgroundColor: colors.backgroundTheme }}
              inverted={true}
              data={JSON.parse(JSON.stringify(messages)).reverse()}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback>
                  <View style={{ marginTop: 6 }}>
                    <View
                      style={{
                        maxWidth: Dimensions.get("screen").width * 0.8,
                        backgroundColor: colors.prussianBlue,
                        alignSelf:
                          item.sender === currentUser.name
                            ? "flex-end"
                            : "flex-start",
                        marginHorizontal: 10,
                        padding: 10,
                        borderRadius: 24,
                        borderBottomLeftRadius:
                          item.sender === currentUser.name ? 24 : 0,
                        borderBottomRightRadius:
                          item.sender === currentUser.name ? 0 : 24,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.SurfCrest,
                          fontSize: 16,
                        }}
                      >
                        {item.message}
                      </Text>
                      <Text
                        style={{
                          color: colors.SurfCrest,
                          fontSize: 14,
                          alignSelf: "flex-end",
                        }}
                      >
                        {item.time}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />

            <View style={{ paddingVertical: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  width: width,
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    width: moderateScale(270),
                    borderWidth: moderateScale(1),
                    borderColor: colors.polishedPine,
                    borderRadius: moderateScale(35),
                  }}
                >
                  <View
                    style={{
                      marginHorizontal: moderateScale(5),
                      flexDirection: "row",
                      alignItems: "center",
                      height: moderateScale(52),
                    }}
                  >
                    <TouchableOpacity onPress={() => onDocumentSelect()}>
                      <DocumentIcon />
                    </TouchableOpacity>
                    <TextInput
                      defaultValue={inputMessage}
                      style={styles.messageInput}
                      placeholder="Type a message..."
                      onChangeText={(text) => setInputMessage(text)}
                      onSubmitEditing={() => {
                        sendMessage();
                      }}
                    />
                    <TouchableOpacity onPress={() => startRecognizing()}>
                      <Animated.View>
                        <MikeIcon />
                      </Animated.View>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.messageSendView}
                  onPress={() => {
                    sendMessage();
                  }}
                >
                  <ChatSendIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScreenWrapper>
    )
  );
};
export default ChatWithDr;
const styles = StyleSheet.create({
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userProfileImage: { height: "100%", aspectRatio: 1, borderRadius: 100 },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundTheme,
  },
  messageInputView: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 14,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});
