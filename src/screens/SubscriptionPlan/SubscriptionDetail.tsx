import {
  Alert,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { imagePath } from "../../assets/png/imagePath";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackIcon, SentTicks } from "../../assets";
import CheckBoxSelect from "../../components/CustomToggle/CheckBoxSelect";
import navigationString from "../../navigation/navigationString";
import {
  MEMBERSHIP_DURATION,
  PLATEFORM,
  SubscriptionButtonENUM,
} from "../../constant/ENUM";
import CommonLoader from "../../components/Loader";
import allActions from "../../redux/actions";
import { API_FUN_NAMES } from "../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../constant/appConstant";
import ToastApiResponse from "../../components/Toast/ToastApiResponse";
import {
  getAvailablePlan,
  onSubscribe,
  onUpgradePlan,
  useInAppPurchases,
} from "../../components/Hooks/useInAppPurchases";
import { getBuySubscriptionDetail } from "../../redux/selector";
import { useSelector } from "react-redux";
import { SubscriptionStrings } from "./SubscriptionStrings";
import logger from "../../constant/logger";
import { PLAN_IDS } from "../../utils/PlanIds";
import { strings } from "../../constant/strings";
import { getCountryCode } from "../../constant/getCountryCode";
import { cancelSubscription } from "../../utils/CommonMethods";
let countryCode = "";
interface params {
  navigation: any;
  route: any;
}
const SubscriptionDetail: React.FC<params> = ({ navigation, route }) => {
  const { item, premiumPlan } = route?.params;
  const subscriptionDetail_ = useSelector(getBuySubscriptionDetail());

  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const { products } = useInAppPurchases();
  const [checkbox, setCheckbox] = useState(true);
  const [alreadyHavePlan, setAlreadyHavePlan] = useState(false);

  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    const init = async () => {
      countryCode = await getCountryCode();
    };

    init();
  });
  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getPurchasePlan();
  }, []);

  useEffect(() => {
    if (item?.duration == MEMBERSHIP_DURATION?.BASIC) {
      setCheckbox(true);
    }
  }, []);

  const getPurchasePlan = async () => {
    const result_ = await getAvailablePlan();
    if (result_?.length) {
      setAlreadyHavePlan(true);
    } else {
      setAlreadyHavePlan(false);
    }
  };

  const buyNowClick = async (status: any) => {
    if (status == SubscriptionButtonENUM?.cancel) {
      cancelSubscription();
    } else if (status == SubscriptionButtonENUM?.cancelled) {
      printMessage(
        TOAST_STATUS?.ERROR,
        "You have already cancelled this subscription."
      );
    } else {
      if (checkbox) {
        if (status == SubscriptionButtonENUM?.upgrade) {
          let selectedProductId =
            Platform?.OS == PLATEFORM?.android
              ? item?.googleProductId
              : item?.appleProductId;
          let matchProductId: any = products.find(
            (item: any) => item?.productId == selectedProductId
          );

          const resultUpgrade: any = await onUpgradePlan(
            matchProductId,
            subscriptionDetail_?.productId
          );
          let transactionReceipt = "";
          let transactionId = "";
          let transactionDate = null;
          let startDate = null;
          if (resultUpgrade) {
            let data =
              Platform?.OS == PLATEFORM?.ios ? resultUpgrade : resultUpgrade[0];
            transactionReceipt = data?.transactionReceipt;
            transactionId = data?.transactionId;
            transactionDate = data?.transactionDate;
            startDate = data?.transactionDate;

            buySubscriptionAPI(
              transactionReceipt,
              transactionId,
              transactionDate,
              startDate,
              item,
              resultUpgrade
            );
          }
        } else if (item?.duration == MEMBERSHIP_DURATION?.BASIC) {
          let transactionReceipt = MEMBERSHIP_DURATION?.BASIC;
          let transactionId = MEMBERSHIP_DURATION?.BASIC;
          let transactionDate = null;
          let startDate = null;
          buySubscriptionAPI(
            transactionReceipt,
            transactionId,
            transactionDate,
            startDate,
            item,
            ""
          );
        } else if (
          item?.duration == MEMBERSHIP_DURATION?.MONTHLY ||
          item?.duration == MEMBERSHIP_DURATION?.YEARLY
        ) {
          if (alreadyHavePlan) {
            Alert?.alert("Already Purchase Plan");
            return;
          }
          let selectedProductId =
            Platform?.OS == PLATEFORM?.android
              ? item?.googleProductId
              : item?.appleProductId;
          let matchProductId: any = products.find(
            (item: any) => item?.productId == selectedProductId
          );

          const result: any = await onSubscribe(matchProductId);

          let transactionReceipt = "";
          let transactionId = "";
          let transactionDate = null;
          let startDate = null;

          if (result) {
            let data = Platform?.OS == PLATEFORM?.ios ? result : result[0];

            transactionReceipt = data?.transactionReceipt;
            transactionId = data?.transactionId;
            transactionDate = data?.transactionDate;
            startDate = data?.transactionDate;

            buySubscriptionAPI(
              transactionReceipt,
              transactionId,
              transactionDate,
              startDate,
              item,
              result
            );
          }
        }
      } else {
        printMessage(TOAST_STATUS?.ERROR, "Please accept terms and conditions");
      }
    }
  };

  const renderButton = () => {
    let buttonText = "";
    let action = "";

    if (premiumPlan == "") {
      buttonText =
        item?.duration == MEMBERSHIP_DURATION?.MONTHLY
          ? "Go Monthly"
          : item?.duration == MEMBERSHIP_DURATION?.YEARLY
          ? "Go Yearly"
          : strings?.Upgrade;
      action = SubscriptionButtonENUM?.buy;
    } else {
      if (
        premiumPlan == MEMBERSHIP_DURATION?.MONTHLY &&
        item?.duration == MEMBERSHIP_DURATION?.MONTHLY
      ) {
        if (item?.isPlanCancelled) {
          action = SubscriptionButtonENUM?.cancelled;
          buttonText = "Subscription Cancelled";
        } else {
          action = SubscriptionButtonENUM?.cancel;
          buttonText = strings?.Cancel_subscription;
        }
      } else if (
        premiumPlan == MEMBERSHIP_DURATION?.MONTHLY &&
        item?.duration == MEMBERSHIP_DURATION?.YEARLY
      ) {
        action = SubscriptionButtonENUM?.upgrade;
        buttonText = strings?.Upgrade;
      } else if (
        premiumPlan == MEMBERSHIP_DURATION?.YEARLY &&
        item?.duration == MEMBERSHIP_DURATION?.MONTHLY
      ) {
        return;
      } else if (
        premiumPlan == MEMBERSHIP_DURATION?.YEARLY &&
        item?.duration == MEMBERSHIP_DURATION?.YEARLY
      ) {
        if (item?.isPlanCancelled) {
          action = SubscriptionButtonENUM?.cancelled;
          buttonText = "Subscription Cancelled";
        } else {
          action = SubscriptionButtonENUM?.cancel;
          buttonText = strings?.Cancel_subscription;
        }
      } else {
        return;
      }
    }
    return (
      <>
        {/* <View style={styles?.checkBoxView}>
          <CheckBoxSelect
            isYes={"No"}
            onChangeText={(val: any, idx: any) =>
              setCheckbox(val == "Yes" ? true : false)
            }
          />
          <Text style={styles?.terms}>
            By buying this plan, I am agree with these terms & conditions.{" "}
          </Text>
        </View> */}
        <TouchableOpacity
          style={styles?.upgradeButton}
          onPress={() => buyNowClick(action)}
        >
          <Text style={styles?.upgradeText}>{buttonText}</Text>
        </TouchableOpacity>
      </>
    );
  };

  const platformType = () => {
    if (Platform?.OS == PLATEFORM?.android) {
      return 1;
    } else {
      return 2;
    }
  };
  const planType_ = (duration: any) => {
    if (duration == MEMBERSHIP_DURATION?.BASIC) {
      return 3;
    } else if (duration == MEMBERSHIP_DURATION?.MONTHLY) {
      return 1;
    } else if (duration == MEMBERSHIP_DURATION?.YEARLY) {
      return 2;
    }
  };
  const printMessage = (code: any, msg: any) => {
    setToasterDetails({
      showToast: true,
      code: code,
      message: msg,
    });
  };

  const cancelSubscriptionAPI = async () => {
    setIsLoading(true);
    try {
      let payload = {
        planId: 74,
        productId: "basic",
        platformType: platformType(),
        planType: 3,
        transactionReceipt: MEMBERSHIP_DURATION?.BASIC,
        transactionId: MEMBERSHIP_DURATION?.BASIC,
        transactionDate: null,
        startDate: null,
        purchaseResponse: null,
        totalAmount: null,
        amountInUSD: null,
        currency: null,
        country: countryCode,
      };
      const response =
        await allActions?.SubscriptionAction?.buySubscriptionPlan(
          payload,
          API_FUN_NAMES?.buySubscription
        );
      setIsLoading(false);

      if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
        printMessage(
          TOAST_STATUS?.SUCCESS,
          SubscriptionStrings?.Basic_plan_active_succesfully
        );

        navigation?.navigate(navigationString?.SubscriptionStatus, {
          stackPop: 3,
          buyPlanType: SubscriptionStrings?.Cancel,
        });
      }
    } catch (err: any) {
      setIsLoading(false);
      printMessage(TOAST_STATUS?.SUCCESS, "Basic plan error :" + err?.message);
    }
  };
  const checkIsFreeTrialAdded = (item: any, productID: any) => {
    if (item?.duration == MEMBERSHIP_DURATION?.BASIC) {
      return true;
    } else {
      if (
        productID == PLAN_IDS?.MONTHLY_PLAN ||
        productID == PLAN_IDS?.YEARLY_PLAN
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const buySubscriptionAPI = async (
    transactionReceipt: any,
    transactionId: any,
    transactionDate: any,
    startDate: any,
    item: any,
    allPlanData: any
  ) => {
    setIsLoading(true);
    try {
      const { duration, id, appleProductId, googleProductId } = item;

      let planAmount = item?.planPrice?.price;
      let currency = item?.planPrice?.currency;

      let productID =
        Platform?.OS == PLATEFORM?.android ? googleProductId : appleProductId;

      let amount = planAmount;
      let currentCurrency = currency;
      let wantToConvertInto = "USD";
      let USDAmount = 0;

      let payload: any = {
        planId: id,
        productId: productID,
        platformType: platformType(),
        planType: planType_(duration),
        transactionReceipt: transactionReceipt,
        transactionId: transactionId,
        transactionDate: transactionDate,
        startDate: startDate,
        purchaseResponse: JSON.stringify(allPlanData),
        isFreeTrialApplied: checkIsFreeTrialAdded(item, productID),
        totalAmount: planAmount,
        currency: currency,
        country: countryCode,
      };

      if (
        currency != "USD" ||
        currency != "usd" ||
        item?.duration != MEMBERSHIP_DURATION?.BASIC
      ) {
        try {
          let url = "https://api.twelvedata.com/currency_conversion?symbol=";
          let apiKey = "e8cd1c5bddf141e995f5152f621c70db";

          const response = await fetch(
            `${url}${currentCurrency}/${wantToConvertInto}&amount=${amount}&apikey=${apiKey}`
          );

          if (response?.status == STATUS_CODES?.RESPONSE_OK) {
            const data = await response.json();
            USDAmount = data?.amount;
          }
          payload = {
            ...payload,
            amountInUSD: USDAmount,
          };
          integrateAPIBuyPlan(payload, item);
        } catch (error) {
          logger("currency_error_", error);
        }
      } else {
        payload = {
          ...payload,
          amountInUSD: amount,
        };
        integrateAPIBuyPlan(payload, item);
      }
    } catch (err: any) {
      setIsLoading(false);
      printMessage(TOAST_STATUS?.ERROR, err?.message);
    }
  };

  const integrateAPIBuyPlan = async (payload: any, item: any) => {
    try {
      const response =
        await allActions?.SubscriptionAction?.buySubscriptionPlan(
          payload,
          API_FUN_NAMES?.buySubscription
        );
      setIsLoading(false);
      if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
        printMessage(
          TOAST_STATUS?.SUCCESS,
          SubscriptionStrings?.Subscription_buy_succesfully
        );
        setTimeout(() => {
          navigation?.navigate(navigationString?.SubscriptionStatus, {
            stackPop: 3,
            buyPlanType: item?.duration,
          });
        }, 2500);
      } else {
        printMessage(TOAST_STATUS?.ERROR, response?.message);
      }
    } catch (err: any) {
      setIsLoading(false);
      printMessage(TOAST_STATUS?.ERROR, err?.message);
    }
  };

  return (
    <ImageBackground style={styles?.container} source={imagePath?.detail}>
      <View style={styles?.parentView}>
        <View
          style={[
            styles?.headerView,
            { marginTop: insets.top + moderateScale(15) },
          ]}
        >
          <TouchableOpacity
            style={styles?.backButtonView}
            onPress={() => goBack()}
          >
            <BackIcon />
          </TouchableOpacity>

          {item?.duration == MEMBERSHIP_DURATION?.BASIC ||
          item?.duration == MEMBERSHIP_DURATION?.TRIAL ? null : (
            <Text style={styles?.planNameView}>{item?.mostUsedPlan}</Text>
          )}
        </View>

        <Text style={styles?.titleText}>{item?.name}</Text>

        {/* <Text style={styles?.subTitleText}>{item?.planDescription}</Text> */}
        <Text style={styles?.subTitleText}>
          {"Best value, less to manage.\n"}
          <Text style={{ fontStyle: "italic", marginTop: 5 }}>
            {
              "A full year of calm, care, and clarity—always ready when you are."
            }
          </Text>
        </Text>

        <View style={styles?.sleepingLine} />

        <ScrollView>
          {item?.features.map((item: any, index: any) => {
            return (
              <View style={styles?.centerView}>
                <SentTicks height={15} width={15} />
                <Text style={styles?.featureTitle}>{item.name}</Text>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles?.sleepingLine} />

        <View style={styles?.footerView}>
          {item?.duration == MEMBERSHIP_DURATION?.BASIC ? (
            <Text style={styles?.priceText}>{"Life time free"}</Text>
          ) : item?.duration == MEMBERSHIP_DURATION?.TRIAL ? null : (
            <Text style={styles?.priceText}>{`${item?.planPrice?.currency} ${
              item?.planPrice?.price
            } / ${item?.duration.toLowerCase()}`}</Text>
          )}

          {item?.duration == MEMBERSHIP_DURATION?.BASIC ||
          item?.duration == MEMBERSHIP_DURATION?.TRIAL
            ? null
            : renderButton()}
        </View>
      </View>
      {isLoading && <CommonLoader />}
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
    </ImageBackground>
  );
};

export default SubscriptionDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parentView: {
    paddingHorizontal: moderateScale(20),
    flex: 1,
    // paddingBottom: moderateScale(150),
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButtonView: {
    borderWidth: moderateScale(1.5),
    borderColor: colors?.polishedPine,
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(12),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  planNameView: {
    color: colors?.white,
    backgroundColor: colors?.lightPurple,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(18),
    overflow: "hidden",
    fontSize: moderateScale(12),
  },
  titleText: {
    fontSize: moderateScale(24),
    fontWeight: "700",
    color: colors?.SurfCrest,
    marginTop: moderateScale(30),
  },
  subTitleText: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginTop: moderateScale(10),
  },
  sleepingLine: {
    height: moderateScale(0.8),
    backgroundColor: colors?.lightPurple,
    marginVertical: moderateScale(20),
  },
  centerView: {
    marginBottom: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
  },
  featureTitle: {
    fontSize: moderateScale(15),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginLeft: moderateScale(10),
  },
  priceText: {
    textAlign: "center",
    fontSize: moderateScale(26),
    fontWeight: "600",
    color: colors?.royalOrangeDark,
    marginTop: moderateScale(30),
    marginBottom: moderateScale(10),
  },
  termsText: {
    fontSize: moderateScale(14),
    fontWeight: "400",
    color: colors?.lightblue,
    marginLeft: moderateScale(15),
  },
  upgradeButton: {
    backgroundColor: colors?.polishedPine,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(25),
    marginBottom: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: colors?.polishedPine,
    marginTop: moderateScale(20),
  },
  upgradeText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "600",
  },
  footerView: {
    // position: "absolute",
    bottom: moderateScale(30),
    alignSelf: "center",
    width: "100%",
  },
  centerView_: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxView: {
    flexDirection: "row",
    alignItems: "center",
  },
  terms: {
    fontSize: moderateScale(14),
    fontWeight: "400",
    marginLeft: moderateScale(10),
    color: colors?.lightblue,
  },
});
