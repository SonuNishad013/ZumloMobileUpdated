import React, { ReactElement, useEffect, useState } from "react";
import {
  View,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import StepTwo from "./StepTwo";
import RenderGoalsScreen from "./RenderGoalsScreen";
import CommonHeader from "../../../components/Header/commonHeader";
import CommonLoader from "../../../components/Loader";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import allActions from "../../../redux/actions";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";
import { event } from "../../../navigation/emitter";

import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import logger from "../../../constant/logger";
import {
  API_FUN_NAMES,
  SOCKET_FUN_NAME,
} from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import { strings } from "../../../constant/strings";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const GoalsAndAspiration: React.FC<{ navigation?: any; route: any }> = ({
  navigation,
  route,
}): ReactElement => {
  const [data, setData] = useState({});
  const [screenIndex, setScreenIndex] = useState(1);
  const [nextSection, setNextSection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [globalData, setGlobalData] = useState<any>();
  const [userData, setUserData] = useState<any>();
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    fetchGlobalCodes();
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const loginUserData = await AsyncStorageUtils.getItem(
        AsyncStorageUtils.LOGIN_USER_DATA
      );
      if (loginUserData) {
        setUserData(JSON.parse(loginUserData));
      }
    } catch (error) {
      logger("Error retrieving login user data:", error);
    }
  };

  const fetchGlobalCodes = async () => {
    setIsLoading(true);
    try {
      const requestbody = {};
      const response =
        await allActions.globalCode.getAllGlobalCodesWithCategory(
          dispatch,
          requestbody,
          API_FUN_NAMES?.getAllGlobalCodesWithCategory
        );

      if (response.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setGlobalData(response.data);
      } else {
        setToasterDetails({
          showToast: true,
          code: TOAST_STATUS?.SUCCESS,
          message: response.message,
        });
      }
    } catch (error: any) {
      setToasterDetails({
        showToast: true,
        code: TOAST_STATUS?.ERROR,
        message: error.message,
      });
      Alert.alert(strings?.Token_is_expired);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBack = () => {
    const isComingFromProductGuide =
      route?.params?.from === strings?.ProductGuide;
    const isFromAIGeneratedSkipped = [
      strings?.AIGeneratedSkipped,
      strings?.fromExplorer,
    ].includes(route?.params?.from);
    const isFirstScreen = screenIndex === 1;
    const hasSwiperClickAction = route?.params?.onSwiperClick;
    if (isComingFromProductGuide) {
      handleProductGuideBack(isFirstScreen);
    } else {
      handleDefaultBack(
        isFirstScreen,
        hasSwiperClickAction,
        isFromAIGeneratedSkipped
      );
    }
    updateScreenIndex();
  };

  const handleProductGuideBack = (isFirstScreen: any) => {
    if (isFirstScreen) {
      navigation?.pop(2); // Go back to bottom tabs profile stack
    } else {
      setScreenIndex(screenIndex - 1); // Go back to goals and aspirations main screen
      setNextSection(false);
    }
  };

  const handleDefaultBack = (
    isFirstScreen: any,
    hasSwiperClickAction: any,
    isFromAIGeneratedSkipped: boolean
  ) => {
    if (isFromAIGeneratedSkipped && isFirstScreen) {
      const isPlanner = route?.params?.from === strings?.AIGeneratedSkipped;
      event.emit(SOCKET_FUN_NAME?.login);
      AsyncStorageUtils.storeItemKey(
        AsyncStorageUtils.ISPLANNER_USER,
        JSON.stringify({ isPlanner: isPlanner, isSelected: true })
      );
    }
    if (isFirstScreen) {
      if (hasSwiperClickAction) {
        handleSwiperClick();
      } else {
        if (!isFromAIGeneratedSkipped) navigation?.goBack();
      }
    }
  };

  const handleSwiperClick = () => {
    event.emit(SOCKET_FUN_NAME?.login);
    AsyncStorageUtils.storeItemKey(
      AsyncStorageUtils.ISPLANNER_USER,
      JSON.stringify({ isPlanner: false, isSelected: true })
    );
  };

  const updateScreenIndex = () => {
    setScreenIndex(nextSection ? screenIndex : screenIndex - 1);
    setNextSection(false);
  };

  const handleNext = (updatedData: any) => {
    setData({ ...data, ...updatedData });
    setScreenIndex(screenIndex + 1);
  };

  const renderScreens = () => {
    if (!globalData) return null;
    let goalAchieveableData;
    switch (screenIndex) {
      case 1:
        goalAchieveableData = globalData.find(
          (item: any) => item.categoryName === strings?.GoalAchieveableCategory
        )?.globalCodeOptions;
        if (!goalAchieveableData) return null;
        return (
          <StepTwo
            data={goalAchieveableData}
            onPress={(goalType: any, selectedGoal: any) =>
              handleNext({ goalType, selectedGoal })
            }
            userData={userData}
            from={route?.params?.from}
          />
        );
      case 2:
        return (
          <RenderGoalsScreen
            data={data}
            userData={userData}
            globalData={globalData}
            nextSection={nextSection}
            setNextSection={setNextSection}
            setData={setData}
            screenIndex={screenIndex}
            setScreenIndex={setScreenIndex}
            onPress={(skillsDescription: any) =>
              handleNext({ skillsDescription })
            }
            navigation={navigation}
            onSwiperClick={route?.params?.onSwiperClick}
            setToasterDetails={(value: any) => {
              setToasterDetails(value);
            }}
            from={route?.params?.from}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors.backgroundTheme}>
      <View style={styles.container}>
        <CommonHeader
          onBackPress={handleBack}
          headerName={strings?.Setup_Goals}
          iconContainer={styles.headerIconContainer}
          textStyle={styles.headerTextStyle}
          mainContainer={styles.headerMainContainer}
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : moderateScale(50)}
        >
          {renderScreens()}
        </KeyboardAvoidingView>
        {isLoading && <CommonLoader />}

        {toasterDetails?.showToast && (
          <ToastApiResponse
            data={toasterDetails}
            setToasterDetails={setToasterDetails}
            code={toasterDetails?.code}
            message={toasterDetails?.message}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default GoalsAndAspiration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerIconContainer: {
    backgroundColor: colors.backgroundTheme,
  },
  headerTextStyle: {
    color: colors.SurfCrest,
  },
  headerMainContainer: {
    paddingBottom: moderateScale(15),
    paddingTop: moderateScale(10),
    paddingHorizontal: moderateScale(17),
  },
});
