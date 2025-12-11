import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
  Platform,
  Alert,
} from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import { styles } from "./styles";
import navigationString from "../../../../navigation/navigationString";
import { imagePath } from "../../../../assets/png/imagePath";
import colors from "../../../../constant/colors";
import * as AsyncStorageUtils from "../../../../utils/Storage/AsyncStorage";
import { getAllGlobalCodesWithCategory } from "../../../../helper/getGlobalCodes";
import allActions from "../../../../redux/actions";
import { event } from "../../../../navigation/emitter";
import CommonLoader from "../../../../components/Loader";
import appConstant, { STATUS_CODES } from "../../../../constant/appConstant";
import onBoardingTypes from "../../../../redux/types/onBoardingTypes";
import {
  moderateScale,
  textScale,
  width,
} from "../../../../constant/responsiveStyle";
import DeviceInfo from "react-native-device-info";
import {
  MEMBERSHIP_DURATION,
  PLATEFORM,
  SUBSCRIPTION_NAVIGATION_FROM,
} from "../../../../constant/ENUM";
import { useIsFocused } from "@react-navigation/native";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import logger from "../../../../constant/logger";
import UpgradeModal from "../../../SubscriptionPlan/UpgradeModal";
import { IAP_Strings } from "../../../SubscriptionPlan/IAP_Strings";
import { getCountryCode } from "../../../../constant/getCountryCode";
import { textLabelSize } from "../../../../utils/TextConfig";
import ShimmerPlaceHolder from "../../../../components/SimmerEffect";
import FastImage from "react-native-fast-image";
let isPlanner: boolean = false;
let cardDesign = "2";
interface Props {
  navigation?: any;
}
interface loginProps {
  deviceToken: string;
  deviceType: number; // 1 for iOS, 2 for Android
  deviceModel: string;
  operatingSystem: string;
  osVersion: any;
  appVersion: string;
  timeZone: string;
  DeviceID: string;
}
const UserType: React.FC<Props> = ({ navigation }): ReactElement => {
  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState(true);
  const [userData, setuserData] = useState<any>();
  const isFocused = useIsFocused();
  const [showModal, setShowModal] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // getSubscriptionStatusFromServer(dispatch);
    setShowContent(true); //remove this
  }, []);

  const getSubscriptionStatusFromServer = async (dispatch: any) => {
    let requestbody = {};
    allActions.seekerDetails
      .GetSeekerPersonalInfo(
        dispatch,
        requestbody,
        API_FUN_NAMES?.getSeekerPersonalInfo
      )
      .then((response: any) => {
        setShowContent(true);
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (
            response?.data?.basicInformation?.isBetaUser ||
            response?.data?.basicInformation?.isOrganizationSeeker
          ) {
            logger("This is beta or org user");
          } else {
            if (
              response?.data?.basicInformation?.isFreeTrialActive === false &&
              response?.data?.basicInformation?.isFreeTrialAvailed === false
            ) {
              navigation?.navigate(navigationString?.ForFreshUserSubscription);
              logger("Subscription_plan : need to buy 14 days free trial");
            } else {
              if (
                response?.data?.basicInformation?.isFreeTrialActive === false &&
                response?.data?.basicInformation?.isFreeTrialAvailed === true
              ) {
                logger("Subscription_plan : Need to buy basic plan");
                fetchSubscriptionList();
              }
            }
          }
        } else {
          Alert?.alert("Status", response?.message);
        }
      })
      .catch((err) => {
        setShowContent(true);
        logger("error_err", err);
      });
  };

  const fetchSubscriptionList = async () => {
    const countryCode = await getCountryCode();
    allActions.SubscriptionAction.getSubscriptionPlans(
      dispatch,
      "",
      API_FUN_NAMES?.getSubscriptionPlans,
      countryCode
    )
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          const result = response?.data.filter(
            (item: any) => item?.duration == MEMBERSHIP_DURATION?.BASIC
          );
          const basicPlanId = result[0]?.id;
          userMoveToBasicPlan(basicPlanId, countryCode);
        }
      })
      .catch((err) => {
        logger("error_list_", err);
      });
  };

  const userMoveToBasicPlan = async (planID: any, countryCode: any) => {
    try {
      let payload = {
        planId: planID,
        productId: "basic",
        transactionId: MEMBERSHIP_DURATION?.BASIC,
        transactionReceipt: MEMBERSHIP_DURATION?.BASIC,
        purchaseResponse: null,
        transactionDate: null,
        totalAmount: null,
        amountInUSD: null,
        currency: null,
        country: countryCode,
        platformType: platformType(),
        planType: 3,
      };
      const response =
        await allActions?.SubscriptionAction?.buySubscriptionPlan(
          payload,
          API_FUN_NAMES?.buySubscription
        );
      if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
        logger("Successfully basic plan purchased");
      }
    } catch (err: any) { }
  };
  const platformType = () => {
    if (Platform?.OS == PLATEFORM?.android) {
      return 1;
    } else {
      return 2;
    }
  };

  useEffect(() => {
    GetConsentFormStatus();
  }, []);
  const GetConsentFormStatus = async () => {
    try {
      setisLoading(true);
      const requestBody = {};
      await allActions.Auth.GetConsentFormStatus(
        dispatch,
        requestBody,
        "GetConsentFormStatus"
      )
        .then((res) => {
          if (res?.statusCode === 200) {
            if (!res?.data?.isReadConsentForm) {
              setTimeout(() => {
                setisLoading(false);
                navigation.navigate(navigationString.InternalPolicy);
              }, 500);
            } else {
              setisLoading(false);
            }
          }
          // setisLoading(false);
        })
        .catch((err) => {
          setisLoading(false);
        });
    } catch (error) {
      setisLoading(false);
    }
  };

  useEffect(() => {
    isUserLoginToken();
    CreateUserDevice_API();
  }, []);
  const CreateUserDevice_API = async () => {
    const normalizeTimeZone = (tz: string) => {
      if (tz === "Asia/Calcutta") return "Asia/Kolkata";
      return tz;
    };

    const timeZone = normalizeTimeZone(
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );

    // let DeviceID = await DeviceInfo.getDeviceId();
    let DeviceID = await DeviceInfo.getUniqueId();
    const isEmulator = await DeviceInfo.isEmulator();

    let fcmToken = await AsyncStorageUtils?.getItem(
      AsyncStorageUtils?.FCM_TOKEN
    );

    let payload: loginProps = {
      deviceToken: JSON.parse(fcmToken),
      deviceType: 1,
      deviceModel: DeviceInfo.getModel() + ` isVirtual=${isEmulator}`,
      operatingSystem: Platform.OS,
      osVersion:
        Platform.OS === "android"
          ? JSON.stringify(Platform.Version)
          : Platform.Version,
      appVersion: DeviceInfo?.getVersion(),
      timeZone: timeZone,
      DeviceID: DeviceID,
    };
    try {
      // let requestbody = {
      //   ...payload,
      // };

      await allActions.seekerDetails
        .CreateUserDeviceInfo(dispatch, payload, "CreateUserDeviceInfo")
        .then((response: any) => {
          if (response.statusCode == 200) {
            return Promise.resolve(response);
          } else {
            return Promise.resolve(response);
          }
        })
        .catch((err: any) => {
          return Promise.resolve(err);
        });
    } catch (error) { }
  };
  const explainerContent = [
    {
      title: "Planner",
      name: "I’m a planner ",
      content:
        "I’d like to answer a few quick questions so Zumlo can tailor things just for me ",
      img: imagePath?.ExWelcome1,
      isPlanner: true,
    },
    {
      title: "Explorer",
      name: "I’m an explorer ",
      content: "I’ll explore on my own and get to know Zumlo at my own pace. ",
      img: imagePath?.PlWelcome1,
      isPlanner: false,
    },
  ];

  const isUserLoginToken = async () => {
    let loginUserData = await AsyncStorageUtils.getItem(
      AsyncStorageUtils.LOGIN_USER_DATA
    );
    if (loginUserData !== null) {
      setuserData(JSON.parse(loginUserData));
    }
  };

  useEffect(() => {
    getAllGlobalCodesWithCategory_();
    clearSavedReduxData();
  }, []);

  const clearSavedReduxData = () => {
    dispatch({
      type: onBoardingTypes.SAVE_SHORT_TERM_GOAL_DATA,
      payload: null,
    });
    dispatch({
      type: onBoardingTypes.SAVE_LONG_TERM_GOAL_DATA,
      payload: null,
    });
    dispatch({
      type: onBoardingTypes.SAVE_MEDICAL_CONDITIONS,
      payload: null,
    });
    dispatch({
      type: onBoardingTypes.FITNESS_ACTIVITY,
      payload: null,
    });
    dispatch({
      type: onBoardingTypes.SAVE_STRESSORS_TRIGGERS,
      payload: null,
    });
  };

  const getAllGlobalCodesWithCategory_ = async () => {
    let data = await getAllGlobalCodesWithCategory(allActions, dispatch);
    logger("data___GLOBALCODEWITHCATEGORY1", data);
    AsyncStorageUtils.storeItemKey(
      AsyncStorageUtils.GLOBALCODEWITHCATEGORY,
      JSON.stringify(data)
    );
  };

  const onSelectExplorer = () => {
    let req = {
      userId: userData?.id !== undefined ? userData?.userId : 0,
      strategyTypeId: appConstant.explorer_planner_type.explorer,
    };
    setisLoading(true);

    allActions.OnBoarding.SaveSeekerPlannerExplorerId(
      dispatch,
      req,
      "saveQuestion"
    )
      .then((response: any) => {
        setisLoading(false);

        event.emit("login");

        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.ISPLANNER_USER,
          JSON.stringify({ isPlanner: false, isSelected: true })
        );
      })
      .catch((err) => {
        setisLoading(false);
      });
  };
  const onSelecttype = (item: any) => {
    if (item.isPlanner) {
      navigation?.navigate(navigationString?.OnBoardingPlannerSteps);
    } else {
      navigation?.navigate(navigationString?.WelcomeExplorer);
    }
  };
  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      {showContent ? (
        <>
          <FlatList
            data={["1"]}
            scrollEnabled
            keyExtractor={(item, index) => "key" + index}
            renderItem={() => {
              return (
                <View style={styles?.container}>
                  <Text style={styles?.welcomeText}>
                    {"How would you like to\nbegin your journey? "}
                  </Text>
                  <Text
                    style={[
                      styles?.welcomeText,
                      {
                        fontSize: textLabelSize?.subHeaderTextSize,
                        fontWeight: "500",
                        marginTop: 15,
                        color: colors?.royalOrangeDark,
                      },
                    ]}
                  >
                    {
                      "You can take your time setting things up\nor dive right in — totally up to you. "
                    }
                  </Text>

                  {cardDesign == "1" ? (
                    <View style={styles?.typeView}>
                      {explainerContent.map((item: any, index: any) => {
                        return (
                          <TouchableOpacity onPress={() => onSelecttype(item)}>
                            <ImageBackground
                              source={item.img}
                              style={{
                                height: moderateScale(130),
                                justifyContent: "center",
                                padding: moderateScale(15),
                              }}
                              resizeMode={"contain"}
                            >
                              <View style={{ padding: moderateScale(10) }}>
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    fontSize: textScale(24),
                                    color: !item.isPlanner
                                      ? colors.SurfCrest
                                      : colors.prussianBlue,
                                    fontWeight: "700",
                                  }}
                                >
                                  {item.name}
                                </Text>
                                <Text
                                  numberOfLines={3}
                                  style={{
                                    fontSize: textLabelSize?.subtTitleFont,
                                    color: !item.isPlanner
                                      ? colors.SurfCrest
                                      : colors.prussianBlue,
                                    fontWeight: "400",
                                    width: moderateScale(200),
                                    marginTop: 5,
                                  }}
                                >
                                  {item?.content}
                                </Text>
                              </View>
                            </ImageBackground>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  ) : (
                    <>
                      <View style={styles?.cardContainer}>
                        <FastImage
                          source={imagePath?.usertype1}
                          resizeMode={FastImage.resizeMode.stretch}
                          style={styles?.cardOne}
                        >
                          <TouchableOpacity
                            onPress={() => onSelecttype(explainerContent[0])}
                            style={styles?.flexSet}
                          >
                            <Text style={styles?.titleText}>
                              {explainerContent[0].name}
                            </Text>
                            <Text style={styles?.subTitleText}>
                              {explainerContent[0]?.content}
                            </Text>
                          </TouchableOpacity>
                        </FastImage>

                        <FastImage
                          source={imagePath?.usertype2}
                          resizeMode={FastImage.resizeMode.stretch}
                          style={styles?.cardtwo}
                        >
                          <TouchableOpacity
                            onPress={() => onSelecttype(explainerContent[1])}
                            style={styles?.flexSet}
                          >
                            <Text style={styles?.titleText}>
                              {explainerContent[1].name}
                            </Text>
                            <Text style={styles?.subTitleText}>
                              {explainerContent[1]?.content}
                            </Text>
                          </TouchableOpacity>
                        </FastImage>
                      </View>
                    </>
                  )}
                </View>
              );
            }}
            contentContainerStyle={styles?.contentContainerStyle}
          />
          {isLoading && <CommonLoader />}

          <UpgradeModal
            navigation={navigation}
            visible={showModal}
            setShowModal={setShowModal}
            fromScreen={SUBSCRIPTION_NAVIGATION_FROM?.ONBOARD}
            isPlanner={isPlanner}
            title={IAP_Strings?.onborading_title}
            description={IAP_Strings?.onborading_desc}
          />
          {cardDesign == "2" && (
            <FastImage
              source={imagePath?.usertype_bg}
              style={styles?.bottomImage}
              resizeMode={FastImage.resizeMode.stretch}
            />
          )}
        </>
      ) : (
        <View style={styles?.shimmerViewContainer}>
          <ShimmerPlaceHolder
            width={width - moderateScale(60)}
            height={moderateScale(50)}
            backgroundColor={colors.SurfCrest}
          />
          <View style={{ marginTop: moderateScale(15) }}>
            <ShimmerPlaceHolder
              width={width - moderateScale(60)}
              height={moderateScale(50)}
              backgroundColor={colors.royalOrangeDark}
            />
          </View>

          <View style={styles?.shimmerRow}>
            <View style={{ marginRight: moderateScale(8) }}>
              <ShimmerPlaceHolder
                width={(width * 40) / 100}
                height={moderateScale(300)}
                backgroundColor={colors.polishedPine}
              />
            </View>
            <View style={{ marginLeft: moderateScale(8) }}>
              <ShimmerPlaceHolder
                width={(width * 40) / 100}
                height={moderateScale(300)}
                backgroundColor={colors.polishedPine}
              />
            </View>
          </View>
        </View>
      )}
    </ScreenWrapper>
  );
};

export default UserType;
