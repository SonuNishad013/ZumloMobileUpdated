import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import { NoDataIcon } from "../../../../assets";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../../constant/responsiveStyle";
import HealthSymptoms from "./HealthSymptoms";
import AlcoholConsumption from "./AlcoholConsumption";
import Counsellings from "./Counsellings";
import ShortTermGoals from "./ShortTermGoals";
import LongTermGoals from "./LongTermGoals";
import MedicalConditions from "./MedicalConditions";
import FitnessActivityLevels from "./FitnessActivityLevels";
import StressorsAndTriggers from "./StressorsAndTriggers";
import CurrentMedications from "./CurrentMedications";
import allActions from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import navigationString from "../../../../navigation/navigationString";
import AlcoholConsumption2 from "./AlcoholConsumption2";
import AlcoholConsumption3 from "./AlcoholConsumption3";
import CommonHealthLoader from "../../../../components/Loader/CommonHealthLoader";
import CommonAlert from "../../../../components/CommonAlert/CommonAlert";
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";
import { aiProvider } from "../../../../constant/appConstant";
const WellnessPlanIndex = ({ navigation, route }: any) => {
  const { from, reqData1, fromWellnessOverView, isWellnessPrompt, newString } =
    route?.params;

  const [data, setData] = useState(route?.params?.wellnessQuestions);
  const [screenIndex, setScreenIndex] = useState(0);
  const [reqData, setReqData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReloadAgainMdoal, setIsReloadAgainMdoal] = useState(false);

  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const dispatch = useDispatch();
  console.log("from=====>", from, reqData1);

  const saveQuestion = (SelectedQuestionData: any) => {
    let req = {
      categoryId: 216,
      linkRequired: false,
      aiProvider: aiProvider?.WellnessPlan,
      questionsData: JSON.stringify(SelectedQuestionData),
    };
    setIsReloadAgainMdoal(false);
    setIsLoading(true);

    allActions.OnBoarding.GenerateOnboardingDetails(
      dispatch,
      req,
      "saveQuestion"
    )
      .then((response: any) => {
        console.log("response in wellness plan generation", response);
        if (response.statusCode == 200) {
          setToasterDetails({
            showToast: true,
            code: 1,
            message: response?.message,
          });
          console.log("wellness plan response after all questions", response);
          if (
            response?.data?.responseType == "Wellness plan" ||
            "wellness_gpt" ||
            "wellness"
          ) {
            setTimeout(() => {
              navigation.navigate(navigationString.WellnessPlan, {
                data: response.data,
                regenerateStepQuesAnswer: req,
                from:
                  from === "Wellness Prompt"
                    ? "Wellness Prompt"
                    : from == "Dashboard"
                    ? "Dashboard"
                    : from == "ExplorerActivity"
                    ? "ExplorerActivity"
                    : from
                    ? from
                    : "AIGenerated",
                reqData: reqData1,
                fromWellnessOverView: fromWellnessOverView,
                newString: newString,
              });
              setIsReloadAgainMdoal(false);
            }, 500);
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          } else {
            // Alert.alert("Retry");
          }
        } else {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: response?.message,
          });
          setIsLoading(false);
          setIsReloadAgainMdoal(true);
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

  const [medStepShow, setMedStepShow] = useState(false);

  const handleQuestionStep = (idx: any) => {
    console.log("first-09876567890-.<.>", idx);

    if (idx == 10 && !medStepShow) {
      setMedStepShow(true);
    } else {
      if (idx == 11) {
        saveQuestion(reqData);
      } else {
        setScreenIndex(idx);
      }
    }
  };
  const handleReqData = (data: any) => {
    reqData.push(data);
  };
  const [val, setVal] = useState(0);
  const [val2, setVal2] = useState(0);
  const [val3, setVal3] = useState(0);
  const handleVal = (val: any) => {
    setVal(val);
  };

  const handleVal2 = (val2: any) => {
    setVal2(val2);
  };

  const handleVal3 = (val3: any) => {
    setVal3(val3);
  };
  const renderScreens = () => {
    let AllQuestions = data.filter((item: any) => item.parentStepId == null);
    const currentStep = AllQuestions?.[screenIndex];
    if (!currentStep) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              height: height / 2,
              width: width,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NoDataIcon />
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              borderColor: colors.SurfCrest,
              borderStyle: "solid",
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                marginBottom: moderateScale(3),
                borderStyle: "solid",
                color: colors.SurfCrest,
                fontWeight: "800",
                fontSize: textScale(16),
              }}
            >
              {"Go Back"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    switch (currentStep.stepNumber) {
      case 0:
        return (
          <HealthSymptoms
            from={from}
            questionData={currentStep}
            allData={data}
            stepNumber={(index: any) => handleQuestionStep(index)}
            reqData={(data: any) => handleReqData(data)}
            navigation={navigation}
            isWellnessPrompt={isWellnessPrompt}
          />
        );
      case 1:
        return (
          <AlcoholConsumption
            questionData={currentStep}
            allData={data}
            stepNumber={(index: any) => handleQuestionStep(index)}
            reqData={(data: any) => handleReqData(data)}
            isNewData={true}
            handleVal={(val: any) => handleVal(val)}
            Val={val}
          />
        );
      case 2:
        return (
          <AlcoholConsumption2
            questionData={currentStep}
            allData={data}
            stepNumber={(index: any) => handleQuestionStep(index)}
            reqData={(data: any) => handleReqData(data)}
            handleVal={(val: any) => handleVal2(val)}
            Val={val2}
          />
        );
      case 3:
        return (
          <AlcoholConsumption3
            questionData={currentStep}
            allData={data}
            stepNumber={(index: any) => handleQuestionStep(index)}
            reqData={(data: any) => handleReqData(data)}
            handleVal={(val: any) => handleVal3(val)}
            Val={val3}
          />
        );
      case 4:
        return (
          <Counsellings
            questionData={currentStep}
            allData={data}
            stepNumber={(index: any) => handleQuestionStep(index)}
            reqData={(data: any) => handleReqData(data)}
          />
        );
      case 5:
        return (
          <ShortTermGoals
            questionData={currentStep}
            allData={data}
            stepNumber={(index: any) => handleQuestionStep(index)}
            reqData={(data: any) => handleReqData(data)}
          />
        );
      case 6:
        return (
          <LongTermGoals
            questionData={currentStep}
            allData={data}
            stepNumber={(index: any) => handleQuestionStep(index)}
            reqData={(data: any) => handleReqData(data)}
          />
        );
      case 7:
        return (
          <MedicalConditions
            questionData={currentStep}
            allData={data}
            stepNumber={(index: any) => handleQuestionStep(index)}
            reqData={(data: any) => handleReqData(data)}
          />
        );
      case 8:
        return (
          <FitnessActivityLevels
            questionData={currentStep}
            allData={data}
            stepNumber={(index: any) => handleQuestionStep(index)}
            reqData={(data: any) => handleReqData(data)}
          />
        );
      case 9:
        return (
          <StressorsAndTriggers
            questionData={currentStep}
            allData={data}
            stepNumber={(index: any) => handleQuestionStep(index)}
            reqData={(data: any) => handleReqData(data)}
          />
        );
      case 10:
        return (
          <CurrentMedications
            questionData={currentStep}
            allData={data}
            stepNumber={(index: any) => handleQuestionStep(index)}
            reqData={(data: any) => handleReqData(data)}
          />
        );
      default:
        return (
          <View>
            <Text>Unsupported field type</Text>
          </View>
        );
    }
  };
  return (
    <ScreenWrapper statusBarColor={colors.SaltBox}>
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
      {isLoading ? <CommonHealthLoader /> : <>{renderScreens()}</>}
      <CommonAlert
        isVisible={isReloadAgainMdoal}
        alertLeftButtonOnPress={() => {
          setIsReloadAgainMdoal(false);
          saveQuestion(reqData);
        }}
        alertLeftButtonText={"Reload"}
        alertRightButtonText={"Cancel"}
        alertMessage={
          "Due to some technical reason, we are not able to create wellness plan right now, you can try again or change your input."
        }
        alertRightButtonOnPress={() => setIsReloadAgainMdoal(false)}
      />
      <CommonAlert
        isVisible={medStepShow}
        alertLeftButtonOnPress={() => {
          // setIsReloadAgainMdoal(false);
          // saveQuestion(reqData);
          setMedStepShow(false);
          handleQuestionStep(11);
        }}
        alertLeftButtonText={"No"}
        alertRightButtonText={"Yes"}
        alertMessage={"Do you want to add medical conditions."}
        alertRightButtonOnPress={() => {
          handleQuestionStep(10);
          setMedStepShow(false);
        }}
      />
    </ScreenWrapper>
  );
};

export default WellnessPlanIndex;
