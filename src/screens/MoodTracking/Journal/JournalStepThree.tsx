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
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { Enum_QuestionSourceType } from "../../../constant/ENUM";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import DeviceInfo from "react-native-device-info";
import CommonLoader from "../../../components/Loader";
import {
  aiProvider,
  STATUS_CODES,
  TOAST_STATUS,
} from "../../../constant/appConstant";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props {
  navigation?: any;
  route?: any;
}
const JournalStepThree: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [questions, setQuestions] = useState([]);
  const [DeviceID, setDeviceID] = useState("");
  const { title, isFrom } = route?.params;
  const [isLoading, setIsLoading] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const [answer, setAnswer] = useState("");
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
    if (answer == "") {
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
        questionSourceType: Enum_QuestionSourceType?.AiGenerated,
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
              message: "Enter the relevant data to proceed.",
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
      <Header navigation={navigation} title={"Your space to reflect"} />

      <View style={styles?.mainView}>
        <Text style={styles?.planNameView}>{title}</Text>

        <View style={styles?.customBox}>
          <KeyboardAwareScrollView style={styles.container}>
            <TextInput
              placeholder={"Write freely—anything you're feeling or thinking."}
              placeholderTextColor={colors?.SurfCrest}
              selectionColor={colors?.SurfCrest}
              style={styles?.textInputStyle}
              multiline={true}
              onChangeText={(val: any) => setAnswer(val)}
              returnKeyType="done"
            />
          </KeyboardAwareScrollView>
        </View>

        <TouchableOpacity
          style={styles.anserButton}
          onPress={() => answerClick()}
        >
          <Text style={styles?.answerText}>{"Save my journal"}</Text>
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

export default JournalStepThree;

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
    textAlign: "center",
    marginTop: moderateScale(10),
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
  customBox: {
    borderWidth: 1,
    borderColor: colors?.SurfCrest,
    borderRadius: moderateScale(20),
    marginTop: moderateScale(25),
    flex: 1,
    padding: moderateScale(20),
  },
  textInputStyle: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "400",
  },
});
