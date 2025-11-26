import React, { useEffect, useState, useRef } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import authNav from "./authNav";
import BottomTabRoute from "./BottomTab";
import onBoardingNav from "./onBoardingNav";
import { useDispatch, useSelector } from "react-redux";
import * as AsyncStorage from "../utils/Storage/AsyncStorage";
import { event } from "./emitter";
import _ from "underscore";
import navigationString from "./navigationString";
import { Alert, View } from "react-native";
import CommonLoader from "../components/Loader";
import NewRelic from "newrelic-react-native-agent";
import useNotificationHandler from "../helper/NotificationHandler";
import allActions from "../redux/actions";
import {
  community_Group_Invitation,
  community_Join_Request,
  liked_Feed,
  CommentedOnFeed,
  RepliedOnFeed,
  ReportedOnFeed,
} from "../constant/notificationFormName";
import { communityCode } from "../constant/CommunityConstant";
import useETLQuestions from "../components/Hooks/useETLQuestions";

import moment from "moment";
import { aiProvider } from "../constant/appConstant";
import logger from "../constant/logger";
import { findValueByKey } from "../screens/Dashboard/Summary/component/Hooks/transformGoalsFromAPI";
import ErrorModal from "../screens/OnBoarding/ErrorModal";
import { YYYY_MM_DD } from "../constant/dateFormatConstants";
import { getSeekerDetailsData } from "../redux/selector";
import DeviceInfo from "react-native-device-info";
let userInfo: any = {};
const AuthStack = createNativeStackNavigator();
const OnBoardingStack = createNativeStackNavigator();
let error_title: string = "";
let error_desc: string = "";

export default function App() {
  const isUserReachedDashboard: any = useSelector(
    (data: any) => data?.onBoardingReducer?.userType?.isLoginUser
  );
  const routeNameRef = useRef();
  const navigationRef = useRef();

  const dispatch = useDispatch();
  const [userToken, setUserToken] = useState<any>("");
  const [isLogout, setisLogout] = useState(false);
  const [UserType, setUserType] = useState<any>("");
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [productTourCompleted, setProductTourCompleted] = useState(false); // for product tour
  const [DynamicPromptingQuestionAvl, setDynamicPromptingQuestionAvl] =
    useState(true);
  const routenavigationRef = useNavigationContainerRef<any>(); //This ref is used for activity clicked navigation
  const [tabSwitch, setTabSwitch] = useState(false);
  const [isSecondLoader, setIsSecondLoader] = useState(false);
  const [isModal, setIsModal] = useState(false);

  // State for tracking API response status
  const [saveStatusCode, setSaveStatusCode] = useState<number | null>(null);

  useEffect(() => {
    // Fetch dynamic prompting question status
    const fetchData = async () => {
      let status = await GetUserMissingProfileDataPointQuestions(false);

      setSaveStatusCode(status);
    };

    !_.isEmpty(userToken) && fetchData();
  }, [userToken, DynamicPromptingQuestionAvl]); // Fetch only when dependencies change

  useEffect(() => {
    // If status code is 400, skip scheduling the interval
    if (
      saveStatusCode === 400 || // Prevent execution if status is 400
      _.isEmpty(userToken) ||
      !DynamicPromptingQuestionAvl ||
      !UserType?.isSelected
    ) {
      return;
    }

    const interval = setInterval(() => {
      const currentRoute = routenavigationRef.current?.getCurrentRoute()?.name;

      if (
        currentRoute !== navigationString.PlannerDashboard ||
        currentRoute === navigationString.DynamicPrompts ||
        currentRoute === navigationString.QuestionsIndex ||
        currentRoute === navigationString.ETLQuestionsIndex
      ) {
        return;
      } else {
        GetUserMissingProfileDataPointQuestions(true);
      }
    }, 1.1 * 60 * 1000); // 5 minutes in milliseconds. //dynamic prompting testing code uncomment this

    // Listener to clear interval when navigation changes to 'ChatScreen'
    const unsubscribe = routenavigationRef.current?.addListener("state", () => {
      const updatedRoute = routenavigationRef.current?.getCurrentRoute()?.name;
      if (updatedRoute === "ChatScreen") {
        clearInterval(interval);
      }
    });

    return () => {
      clearInterval(interval);
      unsubscribe && unsubscribe();
    };
  }, [
    saveStatusCode,
    userToken,
    DynamicPromptingQuestionAvl,
    UserType?.isSelected,
    5,
  ]);

  const GetUserMissingProfileDataPointQuestions = async (canNav?: boolean) => {
    try {
      let requestbody = {};
      const response =
        await allActions.dashboardAction.GetUserMissingProfileDataPointQuestions(
          dispatch,
          requestbody,
          "GetUserMissingProfileDataPointQuestions",
          `?maxRecordCount=${100}` //dynamic prompting testing code uncomment this set it 4
        );

      const hasEtl = response?.data
        ? findValueByKey(response?.data, "isEtl")
        : false;

      if (response.statusCode === 400 || response?.data?.length == 0) {
        const isDataEmpty = _.isEmpty(response?.data);
        setDynamicPromptingQuestionAvl(!isDataEmpty);
        return response.statusCode; // Return status to update state
      } else if (canNav) {
        const randomRoute = !hasEtl
          ? navigationString.DynamicPrompts
          : navigationString.ETLQuestionsIndex;

        const currentRoute_ = routenavigationRef.current?.getCurrentRoute();
        const currentRouteNamePlannerDashboard_ =
          currentRoute_?.name === "PlannerDashboard";
        if (!currentRouteNamePlannerDashboard_) return;
        if (hasEtl) {
          if (currentRouteNamePlannerDashboard_) {
            routenavigationRef.current?.navigate(randomRoute, {
              from: "DP",
              parsedResponseData: response,
              hasEtl: hasEtl,
            });
          }
        } else {
          if (currentRouteNamePlannerDashboard_) {
            routenavigationRef.current?.navigate(randomRoute, {
              from: "DP",
              parsedResponseData: response,
            });
          }
        }
      }
    } catch (err) {
      console.error("Error fetching dynamic prompting question:", err);
    }

    return null;
  };

  const isUserLoginToken = async () => {
    try {
      let loginUserInfoToken = await AsyncStorage.getItem(
        AsyncStorage.ACCESS_TOKEN
      );

      let IsProductTourCompleted = await AsyncStorage.getItem(
        AsyncStorage.PRODUCT_TOUR_COMPLETED
      );
      let userType = await AsyncStorage.getItem(AsyncStorage.ISPLANNER_USER);
      let parsedData = JSON?.parse(IsProductTourCompleted);
      setProductTourCompleted(parsedData?.isPorductTourCompleted);
      setUserType(JSON.parse(userType));
      setUserToken(loginUserInfoToken);
    } catch (error) {
      console.error("AsyncStorage error:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  // new code here
  const handleNotificationNavigations = async (notificationData: any) => {
    const collectDeviceId = await DeviceInfo.getUniqueId();
    logger("notificationData__::", notificationData);
    const navigateToScreen = () => {
      routenavigationRef.current?.reset({
        index: 0,
        routes: [{ name: navigationString?.PlannerDashboard }],
      });
      if (
        [community_Group_Invitation, community_Join_Request]?.includes(
          notificationData?.data?.FormName
        )
      ) {
        routenavigationRef.current?.navigate(
          navigationString?.NotificationScreen,
          {
            from: communityCode?.community,
          }
        );
      } else if (
        [liked_Feed, CommentedOnFeed, RepliedOnFeed, ReportedOnFeed]?.includes(
          notificationData?.data?.FormName
        )
      ) {
        routenavigationRef.current?.navigate(
          navigationString?.NotificationScreen,
          {
            from: communityCode?.community,
            params: {
              screen: navigationString?.IndependentFeed,
              params: {
                feedId: notificationData?.data?.feedId,
              },
            },
          }
        );
      } else if (notificationData?.data?.FormName === "Activities") {
        routenavigationRef.current?.navigate(
          navigationString?.ActivitesDetails,
          {
            id: notificationData?.data?.Id,
            from: "NotificationClick",
          }
        );
      } else if (notificationData?.data?.FormName === "Habit") {
        routenavigationRef.current?.navigate(navigationString?.HabitDetails, {
          date: moment().format(YYYY_MM_DD),
          from: "NotificationClick",
          NotificationData: notificationData?.data,
        });
      } else if (
        ["Mood Journaling", "Journaling"].includes(
          notificationData?.data?.FormName
        )
      ) {
        routenavigationRef.current?.navigate(navigationString?.JournalStepOne, {
          from: "NotificationClick",
          data: { title: "" },
        });
      } else if (notificationData?.data?.FormName === "Chat") {
        routenavigationRef.current?.navigate(navigationString?.ChatScreen, {
          from: "NotificationClick",
          userData: {
            userId: notificationData?.data?.userId,
          },
          userTokenn: userToken,
        });
      } else if (notificationData?.data?.FormName === "Mood Tracking") {
        routenavigationRef.current?.navigate(navigationString?.TrackEmo, {
          from: "NotificationClick",
          socketDetails: {
            DeviceID: collectDeviceId,
          },
        });
      } else {
        routenavigationRef.current?.navigate(
          navigationString?.PlannerDashboard,
          {
            from: "NotificationClick",
          }
        );
      }
    };

    if (routenavigationRef.current) {
      navigateToScreen();
    } else {
      setTimeout(() => {
        navigateToScreen();
      }, 3000);
    }
  };

  useNotificationHandler(handleNotificationNavigations);

  useEffect(() => {
    setIsLoading(true);
    const handleLogin = async () => {
      console.log(
        "Login detected, scheduling GetUserMissingProfileDataPointQuestions..."
      );

      // Run once, after 40s
      setTimeout(() => {
        if (typeof GetUserMissingProfileDataPointQuestions === "function") {
          GetUserMissingProfileDataPointQuestions(true);
        } else {
          console.error(
            "GetUserMissingProfileDataPointQuestions is not a function"
          );
        }
      }, 25000);
    };
    event.on("logout", () => {
      setUserToken(null);
      setisLogout(true);
      setTabSwitch(false);
    });
    event.on("login", isUserLoginToken);
    event.on("login", handleLogin);
    event.on("tabSwitch", handleTabSwitch);
    return () => {
      event.off("logout", isUserLoginToken);
      event.off("login", isUserLoginToken);
      event.off("login", handleLogin);
      event.off("tabSwitch", handleTabSwitch);
    };
  }, []);

  useEffect(() => {
    isUserLoginToken();
  }, []);

  useEffect(() => {
    const listener = (data: any) => {
      AIDynamicPromptingToMoodJournalAndTracking(data);
    };

    event.off("MJData"); // Remove any existing listener
    event.on("MJData", listener);

    return () => {
      event.off("MJData", listener);
    };
  }, []);

  const AIDynamicPromptingToMoodJournalAndTracking = async (data: any) => {
    try {
      let requestbody = {
        id: data?.requestBody?.id,
        userId: data?.requestBody?.userId,
        aiProvider: aiProvider?.DynamicPrompting,
        quoteMood: data?.requestBody?.quoteMood,
        model: data?.requestBody?.model,
        message: data?.requestBody?.message,
        responseType: data?.requestBody?.responseType,
        deviceId: data?.DeviceID,
        formType: data?.isMoodJournaling ? 1 : 2,
        signalRHubType: 3,
      };

      const response =
        await allActions.dashboardAction.AIDynamicPromptingToMoodJournalAndTracking(
          dispatch,
          requestbody,
          "AIDynamicPromptingToMoodJournalAndTracking"
        );
      const hasEtl = findValueByKey(response?.data, "isEtl");

      const randomRoute = !hasEtl
        ? navigationString.DynamicPrompts
        : navigationString.ETLQuestionsIndex;

      if (response?.statusCode === 200) {
        routenavigationRef.current?.navigate(randomRoute, {
          from: "MJ",
          parsedResponseData: response,
        });
      } else {
        Alert.alert("Something went wrong!");
      }
    } catch (err) {
      console.error("Error fetching dynamic prompting question:", err);
    }
  };
  const handleTabSwitch = () => {
    setIsSecondLoader(true);
    setTabSwitch(true);
    setTimeout(() => {
      setIsSecondLoader(false);
    }, 400);
  };
  const AuthNavigator = (name: any) => (
    <AuthStack.Navigator
      initialRouteName={
        isLogout || productTourCompleted
          ? navigationString.Login
          : navigationString.WelcomeScreen
      }
    >
      {authNav(AuthStack, name)}
    </AuthStack.Navigator>
  );

  const OnBoardingNavigator = (name: any) => (
    <OnBoardingStack.Navigator
      initialRouteName={
        isUserReachedDashboard
          ? navigationString.ExplorerDashboard
          : navigationString.UserType
      }
    >
      {onBoardingNav(OnBoardingStack, name)}
    </OnBoardingStack.Navigator>
  );
  const handleNavigationChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRoute = routenavigationRef.current?.getCurrentRoute();
    const currentRouteName = currentRoute?.name;
    const stackArray = routenavigationRef.getState().routes;
    logger("stackArray____", stackArray);
    if (previousRouteName !== currentRouteName && currentRouteName) {
      const interactionId = await NewRelic.startInteraction(
        `Screen: ${currentRouteName}`
      );

      NewRelic.setInteractionName(`Screen: ${currentRouteName}`);
      NewRelic.recordCustomEvent(
        "TestEvent",
        "TestEventName",
        new Map<string, any>([["message", "This is a test event"]])
      );

      routeNameRef.current = currentRouteName;

      // End interaction after a short delay if needed
      setTimeout(() => {
        NewRelic.endInteraction(interactionId);
      }, 1000);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CommonLoader />
      </View>
    );
  }
  if (isSecondLoader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CommonLoader />
      </View>
    );
  }

  return (
    <NavigationContainer
      ref={routenavigationRef}
      onReady={() => {
        routeNameRef.current =
          routenavigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={handleNavigationChange}
    >
      {_.isEmpty(userToken) ? (
        <AuthNavigator />
      ) : UserType?.isSelected ? (
        <BottomTabRoute
          initialRouteName={
            tabSwitch ? navigationString.Wellbeing : navigationString.Home
          }
        />
      ) : (
        <OnBoardingNavigator />
      )}

      <ErrorModal
        isVisible={isModal}
        title={error_title}
        description={error_desc}
        setIsModal={setIsModal}
      />
    </NavigationContainer>
  );
}
