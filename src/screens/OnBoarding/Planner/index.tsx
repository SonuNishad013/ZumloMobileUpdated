import { BackHandler, FlatList, ImageBackground, View } from "react-native";
import React, { useEffect, useState } from "react";
import PlannerActivity from "./PlannerAcitivity";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import { moderateScale } from "../../../constant/responsiveStyle";
import { useDispatch } from "react-redux";
import Global from "../../../global";
import colors from "../../../constant/colors";
import navigationString from "../../../navigation/navigationString";
import CommonButton from "../../../components/Buttons/commonButton";
import CommonHeader from "../../../components/Header/commonHeader";
import PhysicalHealth from "./PhysicalHealth";
import SocialConnection from "./SocialConnection";
import allActions from "../../../redux/actions";
import CommonLoader from "../../../components/Loader";
import SleepTrack from "./SleepTrack";
import DiagnosedScreen from "./DiagnosedScreen";
import ActivityStats from "./ActivityStats";
import StressLevel from "./StressLevel";
import { strings } from "../../../constant/strings";
import { styles } from "./styles";
import {
  filterData,
  screenImageBackground,
  screenwrapperColor,
} from "./Helper";
import CommonAlert from "../../../components/CommonAlert/CommonAlert";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import {
  filterCategoryData,
  filterglobalCodeOptionsData,
} from "../../../helper/getGlobalCodes";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
interface Props {
  navigation?: any;
  route: any;
}
const OnBoardingPlannerSteps: React.FC<Props> = ({ navigation, route }) => {
  console.log("route in OnBoardingPlannerSteps", route);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(true);
  const [index, setIndex] = useState<any>(0);
  const [onBoardingSteps, setOnBoardingSteps] = useState<any>([]);
  const [selectedIndex, setSelectedIndex] = useState<any>(1);
  const [isYesSelected, setisYesSelected] = useState(false);
  const [responseMap, setResponseMap] = useState<any>([]);
  const [isSkip, setIsSkip] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  // useEffect(() => {
  //   setIndex(index);
  // }, [isYesSelected]);
  useEffect(() => {
    getGlobalCode();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        if (index > 0) {
          setIndex((prevIndex: any) => prevIndex - 1);
          return true; // Prevent default behavior
        }
        return false; // Allow default behavior (exit app)
      }
    );

    return () => backHandler.remove();
  }, [index]);
  const getGlobalCode = async () => {
    try {
      const getGlobalCodeData = await AsyncStorageUtils.getItem(
        AsyncStorageUtils?.GLOBALCODEWITHCATEGORY
      );
      let getOnboardingGlobalData = await filterCategoryData(
        JSON?.parse(getGlobalCodeData),
        "AIGenerationCategory"
      );
      let getGlobalCodeOptionsData = await filterglobalCodeOptionsData(
        getOnboardingGlobalData?.[0]?.globalCodeOptions,
        "Onboarding"
      );
      await getOnboardingSteps(getGlobalCodeOptionsData?.[0]?.globalCodeId);
    } catch (error) {}
  };
  const getOnboardingSteps = async (getOnBoardingGlobalData: any) => {
    setisLoading(true);
    try {
      let requestbody = {};
      await allActions.OnBoarding.GetOnboardingSteps(
        dispatch,
        requestbody,
        "getOnboardingSteps",
        getOnBoardingGlobalData
      )
        .then((response: any) => {
          setisLoading(false);
          if (response.statusCode == 200) {
            console.log("testData_", response?.data);
            setOnBoardingSteps(response?.data);
          } else {
            setToasterDetails({
              showToast: true,
              code: 0,
              message: response?.message,
            });
          }
        })
        .catch((err) => {
          setisLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err?.message,
          });
        });
    } catch (error) {
      setisLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
    }
  };
  const backFunction = () => {
    if (index == onBoardingSteps.length - 1 && isYesSelected) {
      if (selectedIndex == 0) {
        navigation?.goBack();
      } else {
        setisYesSelected(false);
      }
    } else {
      if (index > 0) {
        setIndex(index - 1);
        Global.GlobalIndex = index - 1;
      } else navigation?.goBack();
    }
  };
  const nextFunction = () => {
    if (index == 6) {
      if (selectedIndex == 0) {
        navigation.navigate(navigationString.PlannerFlowCompleted, {
          reqData: responseMap,
          from: route?.params?.from,
        });
        setisYesSelected(false);
      } else if (isYesSelected) {
        navigation.navigate(navigationString.PlannerFlowCompleted, {
          reqData: responseMap,
          from: route?.params?.from,
        });
      } else {
        setisYesSelected(true);
      }
    } else {
      setIndex(index + 1);
      Global.GlobalIndex = index + 1;
    }
  };
  const resultPush = (data: any) => {
    let listData = [...responseMap];
    listData[data?.indexId] = data?.answer;
    setResponseMap(listData);
  };

  const updateListOrder = (object: any) => {
    return object;
  };
  const renderComponentUI = (idx: any) => {
    switch (idx) {
      case 0:
        return (
          <PlannerActivity
            allValue={filterData(onBoardingSteps, 0)}
            answerData={(data: any) => resultPush(data)}
            sendAnser={responseMap[idx]}
          />
        );
      case 1:
        return (
          <ActivityStats
            allValue={filterData(onBoardingSteps, 1)}
            answerData={(data: any) => resultPush(data)}
            sendAnser={responseMap[idx]}
          />
        );
      case 2:
        return (
          <PhysicalHealth
            allValue={filterData(onBoardingSteps, 2)}
            answerData={(data: any) => resultPush(data)}
            sendAnser={responseMap[idx]}
          />
        );
      case 3:
        return (
          <SocialConnection
            allValue={filterData(onBoardingSteps, 3)}
            answerData={(data: any) => resultPush(data)}
            sendAnser={responseMap[idx]}
          />
        );
      case 4:
        return (
          <StressLevel
            allValue={filterData(onBoardingSteps, 4)}
            answerData={(data: any) => resultPush(data)}
            sendAnser={responseMap[idx]}
          />
        );
      case 5:
        return (
          <SleepTrack
            allValue={filterData(onBoardingSteps, 5)}
            answerData={(data: any) => resultPush(data)}
            sendAnser={responseMap[idx]}
            indexItem={idx}
          />
        );
      case 6:
        return (
          <DiagnosedScreen
            allValue={filterData(onBoardingSteps, 6)}
            answerData={(data: any) => resultPush(data)}
            selectedIndex={(value: any) => setSelectedIndex(value)}
            isYesSelected={isYesSelected}
            onClickSkip={(value: any) => setIsSkip(value)}
            onPressSkip={(data: any) => {
              let listData = [...responseMap];
              listData[data?.indexId] = data?.answer;
              setResponseMap(listData);
              // seekerOnboardingStepAnswer(listData);
              navigation.navigate(navigationString.PlannerFlowCompleted, {
                reqData: responseMap,
                from: route?.params?.from,
              });
            }}
          />
        );
      case 7:
        navigation?.navigate(navigationString?.ProfileCompletion);
      default:
        break;
    }
  };
  return (
    <ScreenWrapper statusBarColor={screenwrapperColor(index)}>
      <ImageBackground
        style={{ flex: 1 }}
        source={screenImageBackground(index)}
      >
        {isLoading ? (
          <CommonLoader />
        ) : (
          <View
            style={{
              flex: 1,
              paddingHorizontal: moderateScale(19),
            }}
          >
            <CommonHeader
              iconContainer={{ backgroundColor: colors?.saltDark }}
              onBackPress={backFunction}
              mainContainer={styles?.headerMainContainer}
            />
            <FlatList
              data={["1"]}
              style={styles?.subContainer}
              keyExtractor={(item, index) => "key" + index}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: moderateScale(50),
              }}
              renderItem={() => {
                return <>{renderComponentUI(index)}</>;
              }}
            />
            <View style={styles?.buttonView}>
              <CommonButton
                onPress={() => nextFunction()}
                btnName={strings?.ContinueLowerCase}
                mainContainer={{
                  width: moderateScale(199),
                  alignSelf: "center",
                  marginBottom: moderateScale(30),
                  backgroundColor:
                    index == 2 || index == 4
                      ? colors?.SaltBox
                      : colors?.polishedPine,
                }}
              />
            </View>
          </View>
        )}
      </ImageBackground>
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
      {
        <CommonAlert
          isAlertIcon
          isVisible={isAlertOpen}
          alertRightButtonOnPress={() => setIsAlertOpen(false)}
          alertRightButtonText={"OK"}
          alertMessage={alertMsg}
        />
      }
    </ScreenWrapper>
  );
};

export default OnBoardingPlannerSteps;
