import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { strings } from "../../constant/strings";
import {
  ArrowTransparent,
  CircleCheckGreen,
  SubscriptionPLanCrown,
} from "../../assets";
import navigationString from "../../navigation/navigationString";
import UpgradeModal from "./UpgradeModal";
import {
  MEMBERSHIP_DURATION,
  SubscriptionButtonENUM,
} from "../../constant/ENUM";
import { SubscriptionStrings } from "./SubscriptionStrings";

interface PlanItem {
  navigation: any;
  item: any;
  index: any;
  buyButtonClicked: any;
  premiumPlan: any;
}

const PlanItem: React.FC<PlanItem> = ({
  navigation,
  item,
  index,
  buyButtonClicked,
  premiumPlan,
}) => {
  const nextScreen = (item: any) => {
    navigation?.navigate(navigationString?.SubscriptionDetail, {
      item: item,
      premiumPlan: premiumPlan,
    });
  };

  const renderButton = (item: any) => {
    let buttonText = "";
    let action = "";
    let needtoShowButton = false;

    console.log("test_inder_", item);
    if (premiumPlan == "") {
      needtoShowButton = true;
      buttonText =
        item?.duration == MEMBERSHIP_DURATION?.MONTHLY
          ? "Go Monthly"
          : item?.duration == MEMBERSHIP_DURATION?.YEARLY
          ? "Go yearly"
          : strings?.Upgrade;
      action = SubscriptionButtonENUM?.buy;
    } else {
      if (
        premiumPlan == MEMBERSHIP_DURATION?.MONTHLY &&
        item?.duration == MEMBERSHIP_DURATION?.MONTHLY
      ) {
        needtoShowButton = true;

        if (item?.isPlanCancelled) {
          action = SubscriptionButtonENUM?.cancelled;
          buttonText = "Subscription Cancelled";
        } else {
          action = SubscriptionButtonENUM?.cancel;
          buttonText = strings?.Cancel_subscription;
        }
      } else if (
        ((needtoShowButton = true),
        premiumPlan == MEMBERSHIP_DURATION?.MONTHLY &&
          item?.duration == MEMBERSHIP_DURATION?.YEARLY)
      ) {
        (needtoShowButton = true), (action = SubscriptionButtonENUM?.upgrade);
        buttonText = strings?.Upgrade;
      } else if (
        premiumPlan == MEMBERSHIP_DURATION?.YEARLY &&
        item?.duration == MEMBERSHIP_DURATION?.MONTHLY
      ) {
        needtoShowButton = false;
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
        needtoShowButton = false;
      }
    }

    if (needtoShowButton) {
      return (
        <TouchableOpacity
          style={[
            styles?.upgradeButton,
            {
              backgroundColor:
                index % 2 === 0 ? colors.polishedPine : colors.SaltBox,
            },
          ]}
          onPress={() => buyNowClick(item, action)}
        >
          <Text style={styles?.upgradeText}>{buttonText}</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const buyNowClick = async (item: any, status: any) => {
    buyButtonClicked(item, status);
  };

  return (
    <View
      style={[
        styles?.container,
        {
          borderColor: index % 2 === 0 ? colors.polishedPine : colors.SaltBox,
        },
      ]}
    >
      <View style={styles?.topHeader}>
        <View style={styles.planTypeView}>
          <Text style={styles?.planText}>{item?.name}</Text>
          {/* <Text style={styles?.planText}>{"14-Day Free Trial"}</Text> */}
        </View>

        <View
          style={[
            styles?.planRecomendation,
            {
              backgroundColor:
                index % 2 === 0 ? colors.polishedPine : colors.royalOrangeDark,
            },
          ]}
        >
          <Text
            style={[
              styles?.planRecomdenatation,
              {
                color: index % 2 === 0 ? colors.SurfCrest : colors.prussianBlue,
              },
            ]}
          >
            {item?.isCurrentPlan ? strings?.Current_Plan : item?.mostUsedPlan}
          </Text>
        </View>
      </View>

      <View style={styles?.listInnerView}>
        <View style={styles?.rowView}>
          {item?.duration == MEMBERSHIP_DURATION?.BASIC ? (
            <>
              <Text
                style={[styles?.durationText, { marginTop: moderateScale(20) }]}
              >
                {"Life time free"}
              </Text>
            </>
          ) : item?.duration == MEMBERSHIP_DURATION?.TRIAL ? null : (
            <>
              <Text style={styles?.priceText}>{`${item?.planPrice?.currency} ${
                item?.planPrice?.price
              } ${"/ "}`}</Text>
              <Text style={styles?.durationText}>{item?.duration}</Text>
            </>
          )}
        </View>

        {/* <Text style={styles?.descView}>{item?.planDescription}</Text> */}
        <Text style={styles?.descView}>
          {"No card. No catch. Just try it."}
        </Text>
        <View
          style={[
            styles?.featureView,
            {
              backgroundColor:
                index % 2 === 0 ? colors.polishedPine : colors.SaltBox,
            },
          ]}
        >
          {/* <Text
            style={styles?.featureHeader}
          >{`${item?.features?.length} ${strings?.Features}`}</Text> */}
          <Text
            style={[
              styles?.featureHeader,
              { marginBottom: moderateScale(10), fontSize: textScale(12) },
            ]}
          >
            {
              "Explore every feature—free for 14 days. Feel how full support can actually feel."
            }
          </Text>

          {[
            "All premium features included",
            "Chat, plans, tracking & more",
            "Cancel anytime",
          ]
            ?.slice(0, 3)
            .map((item: any, index: any) => {
              return (
                <View style={styles?.featureInnerView}>
                  <View style={styles?.rowCenter}>
                    <CircleCheckGreen height={25} width={25} />
                    <Text style={styles?.featureTitle}>{item}</Text>
                  </View>
                </View>
              );
            })}
          <TouchableOpacity
            style={[
              styles?.rowCenter,
              {
                backgroundColor: colors?.buttonTransparent,
                borderRadius: moderateScale(15),
                paddingHorizontal: moderateScale(5),
                paddingVertical: moderateScale(2),
                justifyContent: "space-between",
              },
            ]}
            onPress={() => nextScreen(item)}
          >
            <Text style={styles?.viewDetails}>{"Explore this plan"}</Text>
            <ArrowTransparent height={25} width={25} />
          </TouchableOpacity>
        </View>

        {item?.duration == MEMBERSHIP_DURATION?.BASIC ||
        item?.duration == MEMBERSHIP_DURATION?.TRIAL
          ? null
          : renderButton(item)}
      </View>
    </View>
  );
};

export default PlanItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: moderateScale(2),

    borderRadius: moderateScale(12),
    marginTop: moderateScale(10),
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: moderateScale(20),
    alignItems: "center",
  },
  planRecomendation: {
    alignSelf: "flex-end",
    marginTop: moderateScale(5),
    marginRight: moderateScale(5),
    backgroundColor: colors?.polishedPine,
    borderTopRightRadius: moderateScale(12),
    borderBottomLeftRadius: moderateScale(12),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
  planRecomdenatation: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(12),
    fontWeight: "600",
  },
  rowView: {
    flexDirection: "row",
  },
  listInnerView: {
    paddingHorizontal: moderateScale(20),
  },
  priceText: {
    fontSize: moderateScale(18),
    fontWeight: "500",
    color: colors?.prussianBlue,
  },
  durationText: {
    fontSize: moderateScale(14),
    fontWeight: "400",
    color: colors?.prussianBlue,
    alignSelf: "flex-end",
  },
  planText: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: colors?.prussianBlue,
  },
  planTypeView: {
    marginTop: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    marginRight: moderateScale(20),
  },
  descView: {
    fontSize: moderateScale(12),
    fontWeight: "400",
    color: colors.prussianBlue,
    marginTop: moderateScale(10),
  },
  featureView: {
    marginTop: moderateScale(10),
    backgroundColor: colors?.polishedPine,
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  featureHeader: {
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: moderateScale(14),
  },
  featureInnerView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(4),
    justifyContent: "space-between",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  featureTitle: {
    fontSize: textScale(12),
    color: colors?.SurfCrest,
    // fontWeight: "600",
    marginLeft: moderateScale(5),
  },
  viewDetails: {
    fontSize: moderateScale(12),
    color: colors?.SurfCrest,
    fontWeight: "600",
    marginRight: moderateScale(2),
    marginLeft: moderateScale(5),
  },
  upgradeButton: {
    backgroundColor: colors?.prussianBlue,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(20),
    marginBottom: moderateScale(10),
    // borderWidth: moderateScale(1),
    // borderColor: colors?.prussianBlue,
  },
  upgradeText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: colors?.transparent,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(20),
    marginBottom: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: colors?.prussianBlue,
  },
  cancelText: {
    color: colors?.prussianBlue,
    fontSize: moderateScale(14),
    fontWeight: "600",
  },
});
