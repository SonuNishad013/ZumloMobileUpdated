// useInAppPurchases.js
import { useEffect, useRef, useState } from "react";
import { Alert, Linking, Platform } from "react-native";
import * as RNIap from "react-native-iap";
import { PLAN_IDS } from "../../utils/PlanIds";

export const useInAppPurchases = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Platform-specific SKUs
  const SKUS =
    Platform.select({
      ios: [
        PLAN_IDS?.MONTHLY_PLAN,
        PLAN_IDS?.YEARLY_PLAN,
        PLAN_IDS?.MONTHLY_PLAN_WITHOUT_TRIAL,
        PLAN_IDS?.YEARLY_PLAN_WITHOUT_TRIAL,
      ],
      android: [
        PLAN_IDS?.MONTHLY_PLAN,
        PLAN_IDS?.YEARLY_PLAN,
        PLAN_IDS?.MONTHLY_PLAN_WITHOUT_TRIAL,
        PLAN_IDS?.YEARLY_PLAN_WITHOUT_TRIAL,
      ],
    }) ?? [];

  // get SubscriptionPlan
  useEffect(() => {
    const init = async () => {
      await RNIap.initConnection();

      try {
        const result = await RNIap.initConnection();
        const subs = await RNIap.getSubscriptions({ skus: SKUS });
        console.log("iap_data_plans_list", subs);
        setProducts(subs);
      } catch (err) {
        console.warn("IAP Error:", err);
        setError(err?.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    init();

    const purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
      async (purchase) => {
        const receipt = purchase.transactionReceipt;

        const originalTransactionId = purchase.originalTransactionIdentifierIOS;
        const transactionId = purchase.transactionId;

        console.log(
          "originalTransactionId : ",
          originalTransactionId,
          " _____ transactionId : ",
          transactionId
        );

        if (receipt) {
          try {
            const ackResult = await RNIap.finishTransaction({
              purchase: purchase,
              isConsumable: true,
            });
          } catch (ackErr) {
            console.log("iap_error", ackErr);
          }
        }
      }
    );
    return () => {
      RNIap.endConnection();
      purchaseUpdateSubscription.remove();
    };
  }, []);
  return { products, loading, error };
};

//buy SubscriptionPlan
export const onSubscribe = async (sku) => {
  try {
    const offerToken =
      Platform?.OS == "android"
        ? sku?.subscriptionOfferDetails[0]?.offerToken
        : null;

    const purchaseData = await RNIap.requestSubscription({
      sku: sku?.productId,
      ...(offerToken && {
        subscriptionOffers: [{ sku: sku?.productId, offerToken }],
      }),
    });
    console.log("iap_data_buy_successfully", purchaseData);
    return purchaseData;
  } catch (error) {
    console.log("iap_data_buy_error", error);

    if (error?.message.includes("The operation couldn’t be completed")) {
      Alert.alert("Failed", "Payment was not completed");
    } else {
      Alert.alert("Failed", error?.message);
    }

    return undefined;
  }
};

// upgrade plan
export const onUpgradePlan = async (sku, oldPlanId) => {
  console.log("upgrade_plan : ", sku, oldPlanId);
  // try {
  //   const offerToken =
  //     Platform?.OS == "android"
  //       ? sku?.subscriptionOfferDetails[0]?.offerToken
  //       : null;
  //   const purchaseData = await RNIap.requestSubscription({
  //     sku: sku?.productId,
  //     oldSkuAndroid: oldPlanId,
  //     ...(offerToken && {
  //       subscriptionOffers: [{ sku: sku?.productId, offerToken }],
  //     }),
  //   });
  //   console.log("iap_data_upgrade_successfully", purchaseData);
  //   return purchaseData;
  // } catch (error) {
  //   console.log("iap_data_upgrade_error", error);
  //   return undefined;
  // }

  try {
    await RNIap.initConnection();

    const purchases = await RNIap.getAvailablePurchases();
    const current = purchases.find((p) => p.productId === oldPlanId);

    if (purchases.length === 0) {
      onSubscribe(sku);
      return;
    }
    if (!current) {
      console.warn("No active plan found. Cannot upgrade.");
      return;
    }

    // Apple handles upgrade internally via system sheet

    const offerToken =
      Platform?.OS == "android"
        ? sku?.subscriptionOfferDetails[0]?.offerToken
        : null;

    const upgradeData = await RNIap.requestSubscription({
      sku: sku?.productId,
      oldSkuAndroid: oldPlanId,
      ...(offerToken && {
        subscriptionOffers: [{ sku: sku?.productId, offerToken }],
      }),
    });
    console.log("iap_data_buy_successfully", upgradeData);

    return upgradeData;
  } catch (error) {
    console.error("Upgrade error:", error?.message || error);
  } finally {
    RNIap.endConnection();
  }
};

// get already buy plan
export const getAvailablePlan = async () => {
  try {
    const purchases = await RNIap.getAvailablePurchases();
    console.log("iap_data_get_available_plan", purchases);
    return purchases;
  } catch (err) {
    console.log("iap_data_get_available_plan_error", err);
  }
};

// cancel subscription
export const subscriptionCancel = async (plan) => {
  if (Platform.OS === "ios") {
    Linking.openURL("https://apps.apple.com/account/subscriptions");
  } else {
    Linking.openURL(
      `https://play.google.com/store/account/subscriptions?package=com.zumlo.app&sku=${plan}`
    );
  }
};
