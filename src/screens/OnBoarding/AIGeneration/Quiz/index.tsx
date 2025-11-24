import React, { FunctionComponent, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import {
  moderateScale,
  textScale,
  width,
} from "../../../../constant/responsiveStyle";
import { CorrentAnswerGrp, InCorrentAnswerGrp } from "../../../../assets";
import CommonButton from "../../../../components/Buttons/commonButton";
import allActions from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import { strings } from "../../../../constant/strings";
import styles from "./styles";
import { onSelectExplorer } from "../../../../helper/explorerFunction";
import CommonLoader from "../../../../components/Loader";
import navigationString from "../../../../navigation/navigationString";
import { capitalizeFirstLetter } from "../../../../validations/capitalizeFirstLetter";
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";

interface QuizProps {
  route?: any;
  navigation?: any;
}

const Quiz: FunctionComponent<QuizProps> = ({ route, navigation }: any) => {
  const [quizUpdatedData, setQuizUpdatedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userData, from, reqData, newString } = route.params;
  const [isSelectedAnswer, setIsSelectedAnswer] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const [quizData, setQuizData] = useState({
    ...route?.params?.QuizData,
    selectedOption: null,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      backAction
    );
    return () => backHandler.remove();
  }, []);
  const onSelectAnswer = (index: number) => {
    setIsSelectedAnswer(true);
    let data = quizData.options.map((item: any, Index: any) => {
      let newObj: any = {};
      newObj.optionText = item;
      if (Index == index) {
        newObj.isSelected = true;
      } else {
        newObj.isSelected = false;
      }
      return newObj;
    });
    setQuizData((prevState: any) => ({
      ...prevState,
      selectedOption: index,
    }));
    setQuizUpdatedData(data);
  };

  const renderOptions = ({ item, index }: any) => {
    const isSelected = quizData.selectedOption === index;
    return (
      <TouchableOpacity
        style={[styles.optionContainer, isSelected && styles.selectedOption]}
        onPress={() => (isSelectedAnswer ? null : onSelectAnswer(index))}
      >
        <Text style={styles.optionText}>{item}</Text>
      </TouchableOpacity>
    );
  };
  const isAnswerCorrect = () => {
    if (quizData.selectedOption === null) {
      return false;
    }
    const selectedAnswer = quizData.options[quizData.selectedOption];
    if (selectedAnswer === quizData.correctAnswer) {
      return true;
    }
    return false;
  };

  const onNext = async () => {
    let request = {
      userId: 0,
      quiz: [
        {
          question: quizData?.question,
          correctAnswer: quizData?.correctAnswer,
          options: quizUpdatedData,
        },
      ],
    };
    setIsLoading(true);
    try {
      await allActions.OnBoarding.SaveQuizFromAI(dispatch, request, "saveQuiz")
        .then((response: any) => {
          setIsLoading(false);
          if (response.statusCode == 200) {
            setToasterDetails({
              showToast: true,
              code: 1,
              message: response?.message,
            });
            onSelectExplorer(
              userData,
              dispatch,
              allActions,
              "saveQuiz",
              navigation,
              "",
              true
            );
          } else {
            setToasterDetails({
              showToast: true,
              code: 0,
              message: response?.message,
            });
          }
        })
        .catch((err) => {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err?.message,
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
  const skipButton = ({ navigation, from, reqData }: any) => (
    <View style={styles.container}>
      <Text
        style={styles.skipText}
        onPress={() => {
          if (from == "ExplorerActivity") {
            navigation?.goBack();
          } else {
            navigation.navigate(navigationString.SelectActivity, {
              from: from,
              reqData: reqData,
              newString: newString,
            });
          }
        }}
      >
        {"Maybe later"}
      </Text>
    </View>
  );
  return (
    <ScreenWrapper statusBarColor={colors.SaltBox}>
      <View
        style={{
          marginHorizontal: moderateScale(19),
          marginTop: moderateScale(19),
        }}
      >
        <Text
          style={{
            color: colors.royalOrangeDark,
            fontSize: textScale(24),
            paddingBottom: moderateScale(10),
            fontWeight: "600",
            marginTop: moderateScale(20),
          }}
        >
          {"Quick mind check "}
        </Text>
        <Text
          style={{
            color: colors.SurfCrest,
            fontSize: textScale(14),
            paddingBottom: moderateScale(20),
          }}
        >
          {
            "Take a quick moment to challenge your mind—let's boost that brainpower!"
          }
        </Text>
      </View>

      <FlatList
        data={quizData?.options}
        renderItem={renderOptions}
        ListHeaderComponent={
          <>
            <Text style={styles?.questionText}>
              {capitalizeFirstLetter(quizData?.question)}
            </Text>
            <Text
              style={{
                color: colors.SurfCrest,
                fontSize: textScale(12),
                paddingBottom: moderateScale(20),
                fontStyle: "italic",
              }}
            >
              {"Pick an answer, or skip if you're just browsing today."}
            </Text>
          </>
        }
        contentContainerStyle={styles?.contentContainerStyle}
        keyExtractor={(item, index) => index.toString()}
      />
      <>
        {!isSelectedAnswer ? (
          <>{skipButton({ navigation, from, reqData })}</>
        ) : (
          <>
            {isAnswerCorrect() ? (
              <CorrectAnswerUI QuizData={quizData} onNext={() => onNext()} />
            ) : (
              <InCorrectAnswerUI QuizData={quizData} onNext={() => onNext()} />
            )}
          </>
        )}
      </>

      {isLoading && <CommonLoader />}
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
    </ScreenWrapper>
  );
};

export default Quiz;

const CorrectAnswerUI = ({ QuizData, onNext }: any) => {
  return (
    <View
      style={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: colors.SurfCrest,
        height: moderateScale(420),
      }}
    >
      <View style={styles.innerBottomSheetView}>
        <View style={styles.justifyContent}>
          <CorrentAnswerGrp />
          <Text style={styles.AnswerText}>{"Great job. You nailed it!"}</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              borderRadius: moderateScale(10),
              marginTop: moderateScale(50),
              padding: moderateScale(12),
              width: width / 1.1,
              backgroundColor: colors.themeColor,
            }}
          >
            <Text style={styles.correctAns}>
              {QuizData?.correctAnswer + " \n  \n " + QuizData?.postAnswerText}
            </Text>
          </View>
        </View>
      </View>
      <CommonButton
        btnName={"Done"}
        mainContainer={styles.btnStyle}
        onPress={onNext}
      />
    </View>
  );
};
const InCorrectAnswerUI = ({ QuizData, onNext }: any) => {
  return (
    <View
      style={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: colors.SurfCrest,
        height: moderateScale(400),
      }}
    >
      <View style={styles.innerBottomSheetView}>
        <InCorrentAnswerGrp width={`${width}`} />
        <View style={styles.justifyContent}>
          <Text style={styles.AnswerText}>
            {"Nice try! Here’s a quick insight:"}
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              borderRadius: moderateScale(10),
              marginTop: moderateScale(20),
              padding: moderateScale(12),
              width: width / 1.1,
              backgroundColor: colors.themeColor,
            }}
          >
            <Text style={styles.correctAns}>
              {QuizData?.correctAnswer + " \n  \n " + QuizData?.postAnswerText}
            </Text>
          </View>
        </View>
      </View>
      <CommonButton
        btnName={"Done"}
        mainContainer={styles.btnStyle}
        onPress={onNext}
      />
    </View>
  );
};
