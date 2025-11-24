import React, { useEffect, useState } from "react";
import colors from "../../../constant/colors";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "../../../constant/responsiveStyle";
import Header from "./Header";
import { imagePath } from "../../../assets/png/imagePath";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import navigationString from "../../../navigation/navigationString";
import { StringConstant } from "./StringConstant";
import DeviceInfo from "react-native-device-info";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import CommonLoader from "../../../components/Loader";
import {
  aiProvider,
  STATUS_CODES,
  TOAST_STATUS,
} from "../../../constant/appConstant";
import { Enum_QuestionSourceType } from "../../../constant/ENUM";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props {
  navigation?: any;
  route?: any;
}
const JournalStepTwo: React.FC<Props> = ({ navigation, route }) => {
  const { isFrom } = route?.params;
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const [answer, setAnswer] = useState("");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [DeviceID, setDeviceID] = useState("");
  useEffect(() => {
    async function fetchData() {
      const response = await DeviceInfo.getUniqueId();
      setDeviceID(response);
    }
    fetchData();
  }, []);

  useEffect(() => {
    getMoodJournalingQuestion();
  }, []);
  const getMoodJournalingQuestion = () => {
    setIsLoading(true);

    const requestbody = {};
    allActions.dashboardAction
      .GetMoodJournalingQuestion(
        dispatch,
        requestbody,
        API_FUN_NAMES?.getMoodJournalingQuestion
      )
      .then((response: any) => {
        setIsLoading(false);
        if (response.statusCode === 200) {
          setQuestions(response.data);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: err?.message,
        });
      });
  };

  const answerClick = () => {
    if (title == "") {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: "Please enter your title",
      });
    } else if (answer == "") {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: "Please enter your answer",
      });
    } else {
      saveMoodJournalingQuestion();
    }
  };

  const getMoodJournalingStepId = (questions: any) => {
    const findQuestion = questions?.find((item: any) => item?.parentId === 0);
    return findQuestion?.moodTrackingStepId;
  };

  const saveMoodJournalingQuestion = async () => {
    setIsLoading(true);
    try {
      const requestbody = {
        moodJournalingStepId: getMoodJournalingStepId(questions),
        title: title,
        description: answer,
        deviceId: DeviceID,
        aiProvider: aiProvider?.MoodJournaling,
        questionSourceType: Enum_QuestionSourceType?.Manual,
      };
      allActions.dashboardAction
        .SaveMoodJournalingQuestion(
          dispatch,
          requestbody,
          API_FUN_NAMES?.saveMoodJournalingQuestion
        )
        .then((response: any) => {
          setIsLoading(false);
          if (response.statusCode === STATUS_CODES?.RESPONSE_OK) {
            setAnswer("");
            navigation?.navigate(navigationString?.JournalStepFour, { isFrom });
            setToasterDetails({
              showToast: true,
              code: TOAST_STATUS?.SUCCESS,
              message: response?.message,
            });
          } else {
            setToasterDetails({
              showToast: true,
              code: TOAST_STATUS?.ERROR,
              message: "Something went wrong!",
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err.message,
          });
        });
    } catch (error) {
      setIsLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
    }
  };

  return (
    <ImageBackground
      style={[styles?.container, { paddingTop: insets.top }]}
      source={imagePath?.journal_3}
    >
      <Header navigation={navigation} title={StringConstant?.Journal} />
      <View style={styles?.mainView}>
        <Text style={styles?.planNameView}>
          {"Feel Lighter by Journaling Your Thoughts"}
        </Text>

        <View style={styles?.TitleStyle}>
          <TextInput
            placeholder={"Whats on your mind today? "}
            placeholderTextColor={colors?.SurfCrest}
            selectionColor={colors?.SurfCrest}
            style={styles?.textInputStyle}
            onChangeText={(val: any) => setTitle(val)}
          />
        </View>

        <View style={styles?.customBox}>
          <KeyboardAwareScrollView>
            <TextInput
              placeholder={"Share your thoughts..."}
              placeholderTextColor={colors?.SurfCrest}
              selectionColor={colors?.SurfCrest}
              style={styles?.textInputStyle}
              multiline={true}
              onChangeText={(val: any) => setAnswer(val)}
            />
          </KeyboardAwareScrollView>
        </View>

        <TouchableOpacity
          style={styles.anserButton}
          onPress={() => answerClick()}
        >
          <Text style={styles?.answerText}>{StringConstant?.Submit}</Text>
        </TouchableOpacity>
      </View>

      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}

      {isLoading && <CommonLoader />}
    </ImageBackground>
  );
};

export default JournalStepTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(70),
    paddingTop: moderateScale(25),
  },
  planNameView: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(24),
    fontWeight: "700",
  },
  anserButton: {
    backgroundColor: colors.polishedPine,
    marginTop: moderateScale(25),
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(30),
  },
  answerText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "600",
    textAlign: "center",
  },
  desctext: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "400",
    textAlign: "center",
    marginTop: moderateScale(15),
  },
  TitleStyle: {
    borderWidth: 1,
    borderColor: colors?.SurfCrest,
    borderRadius: moderateScale(15),
    marginTop: moderateScale(25),
    padding: moderateScale(15),
  },
  customBox: {
    borderWidth: 1,
    borderColor: colors?.SurfCrest,
    borderRadius: moderateScale(15),
    marginTop: moderateScale(15),
    flex: 1,
    padding: moderateScale(15),
  },
  textInputStyle: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "400",
  },
});
