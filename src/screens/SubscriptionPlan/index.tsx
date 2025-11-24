import {
  Alert,
  FlatList,
  ImageBackground,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./style";
import CommonHeader from "../../components/Header/commonHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { imagePath } from "../../assets/png/imagePath";
import { strings } from "../../constant/strings";
import {
  getAvailablePlan,
  onSubscribe,
  onUpgradePlan,
  useInAppPurchases,
} from "../../components/Hooks/useInAppPurchases";
import PlanItem from "./PlanItem";
import allActions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  getBuySubscriptionDetail,
  getSeekerInfoRedux,
  getSubscriptionPlanData,
} from "../../redux/selector";
import { getCountryCode } from "../../constant/getCountryCode";
import { API_FUN_NAMES } from "../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../constant/appConstant";
import CommonLoader from "../../components/Loader";
import {
  MEMBERSHIP_DURATION,
  PLATEFORM,
  SUBSCRIPTION_NAVIGATION_FROM,
  SubscriptionButtonENUM,
} from "../../constant/ENUM";
import navigationString from "../../navigation/navigationString";
import ToastApiResponse from "../../components/Toast/ToastApiResponse";
import logger from "../../constant/logger";
import { useIsFocused } from "@react-navigation/native";
import { SubscriptionStrings } from "./SubscriptionStrings";
import { PLAN_IDS } from "../../utils/PlanIds";
import { cancelSubscription } from "../../utils/CommonMethods";
import { showToast } from "../../redux/actions/toastActions";
import { use } from "i18next";
let countryCode = "";
let userInfo: any = {};
interface SubscriptionPlanProps {
  navigation: any;
  route: any;
}
const SubscriptionPlan: React.FC<SubscriptionPlanProps> = ({
  navigation,
  route,
}) => {
  const getseekerInfoRedux = useSelector(getSeekerInfoRedux());

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const subscriptionDetail = useSelector(getBuySubscriptionDetail());
  const plansData = useSelector(getSubscriptionPlanData());
  const insets = useSafeAreaInsets();
  const { products } = useInAppPurchases();
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [alreadyHavePlan, setAlreadyHavePlan] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [currencySymbol, setCurrencySymbol] = useState<string>("");

  useEffect(() => {
    if (getseekerInfoRedux?.userId) {
      userInfo = getseekerInfoRedux;
    }
  }, [getseekerInfoRedux]);

  useEffect(() => {
    getPurchasePlan();
    fetchSubscriptionList();
    // Fetch current currency conversion on component mount
    currentConverter();
  }, [isFocused]);

  const getPurchasePlan = async () => {
    const result_ = await getAvailablePlan();

    if (result_?.length) {
      setAlreadyHavePlan(true);
    } else {
      setAlreadyHavePlan(false);
    }
  };

  const fetchSubscriptionList = async () => {
    countryCode = await getCountryCode();

    setIsLoading(true);
    allActions.SubscriptionAction.getSubscriptionPlans(
      dispatch,
      "",
      API_FUN_NAMES?.getSubscriptionPlans,
      countryCode
    )
      .then((response: any) => {
        setIsLoading(false);

        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (userInfo?.basicInformation?.isFreeTrialActive) {
            const removeBasicFromList = response?.data?.filter(
              (item: any) => item?.duration != MEMBERSHIP_DURATION?.BASIC
            );
            let freeTrialObject = {
              id: Date.now(),
              name: "14 Days Free Trial",
              duration: MEMBERSHIP_DURATION?.TRIAL,
              planDescription:
                "Experiance every feature for 14 days\nNo credit card required",
              appleProductId: "",
              googleProductId: "",
              mostUsedPlan: "",
              isCurrentPlan: true,
              subscriptionFor: "",
              planPrice: {},
              features: [
                {
                  id: 1,
                  name: "All premium features free",
                },
              ],
            };
            const updatedList: any = [freeTrialObject, ...removeBasicFromList];

            setSubscriptionList(updatedList);
          } else {
            const filterArray = response?.data?.filter(
              (item: any) =>
                item?.duration == MEMBERSHIP_DURATION?.BASIC &&
                item?.isCurrentPlan
            );

            if (filterArray?.length) {
              setSubscriptionList(response?.data);
            } else {
              const filterData: any = response?.data?.filter(
                (item: any) => item?.duration !== MEMBERSHIP_DURATION?.BASIC
              );
              setSubscriptionList(filterData);
            }
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        logger("error", err);
      });
  };

  const checkPremiumPlan = () => {
    const filterArray: any = subscriptionList.filter(
      (item: any) =>
        (item?.duration == "Monthly" || item?.duration == "Yearly") &&
        item?.isCurrentPlan
    );

    if (filterArray?.length) {
      return filterArray[0]?.duration;
    } else {
      return "";
    }
  };
  const renderItem = (items: { item: any; index: number }) => (
    <PlanItem
      navigation={navigation}
      item={items?.item}
      index={items?.index}
      buyButtonClicked={(item: any, status: any) => {
        subscriptionButtonClick(item, status);
      }}
      premiumPlan={checkPremiumPlan()}
    />
  );
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

  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const printMessage = (code: any, msg: any) => {
    setToasterDetails({
      showToast: true,
      code: code,
      message: msg,
    });
  };

  const subscriptionButtonClick = async (item: any, status: any) => {
    if (status == SubscriptionButtonENUM?.cancel) {
      cancelSubscription();
    } else if (status == SubscriptionButtonENUM?.cancelled) {
      printMessage(
        TOAST_STATUS?.ERROR,
        "You have already cancelled this subscription."
      );
    } else if (status == SubscriptionButtonENUM?.upgrade) {
      let selectedProductId =
        Platform?.OS == PLATEFORM?.android
          ? item?.googleProductId
          : item?.appleProductId;
      let matchProductId: any = products.find(
        (item: any) => item?.productId == selectedProductId
      );

      const resultUpgrade: any = await onUpgradePlan(
        matchProductId,
        subscriptionDetail?.productId
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
          stackPop: 2,
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
        purchaseResponse: JSON.stringify(allPlanData),
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
            stackPop: 2,
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

  const renderFooter = () => (
    <View>
      <Text style={styles?.termsView}>
        {
          "14 days free trial, then $12.00. You won’t be charged if you cancel before the end of trail period. Cancel anytime in subscriptions on google play, you agree to the zumlo’s plans"
        }
      </Text>

      <View style={styles?.termsContainer}>
        <Text style={styles?.blueText}>{"Terms of Services"}</Text>
        <Text style={styles?.orText}>{" or "}</Text>
        <Text style={styles?.blueText}>{"Privacy Policy"}</Text>
      </View>
    </View>
  );

  const currentConverter = async () => {
    try {
      setIsLoading(true);
      let url = "https://api.twelvedata.com/currency_conversion?symbol=";
      let currentCurrency = "TRY";
      let convertedCurrency = "USD";
      let amount = 200;
      let apiKey = "e8cd1c5bddf141e995f5152f621c70db";
      const response = await fetch(
        `${url}${currentCurrency}/${convertedCurrency}&amount=${amount}&apikey=${apiKey}`
      );

      if (response?.status == STATUS_CODES?.RESPONSE_OK) {
        const data = await response.json();

        console.log("data_____", data?.amount);

        // USDAmount = data?.rates?.USD;
      }
    } catch (error: any) {}
  };
  return (
    <ImageBackground
      style={[styles?.pcontainer, { paddingTop: insets.top }]}
      source={imagePath?.SubscriptionPlanBG}
    >
      <CommonHeader
        isBackIcon={true}
        iconContainer={styles?.iconContainer}
        onBackPress={() => navigation.goBack()}
      />

      <Text style={styles?.subtitle_text}>
        {"Feel more supported, every day"}
      </Text>
      <TouchableOpacity onPress={() => currentConverter()}>
        <Text style={styles?.title_text}>
          {"Invest in your well-being—choose the support\nthat fits you best."}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={subscriptionList}
        renderItem={renderItem}
        style={styles?.listView}
        keyExtractor={(item: any) => item.id}
        // ListFooterComponent={renderFooter}
      />

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

export default SubscriptionPlan;
