import React, { ReactElement } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { imagePath } from "../../../assets/png/imagePath";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import {
  RightArrowWithBackgrpoundIcon,
  SubscriptionPlancrownIcon,
} from "../../../assets";
import {
  APPLY_STATUS,
  SUBSCRIPTION_NAVIGATION_FROM,
} from "../../../constant/ENUM";
import navigationString from "../../../navigation/navigationString";
import { strings } from "../../../constant/strings";
interface Props {
  subscriptionDetail: any;
  basicInformation: any;
  navigation: any;
}

const SubscriptionPlanSuggestion: React.FC<Props> = ({
  subscriptionDetail,
  basicInformation,
  navigation,
}): ReactElement => {
  const featureClick = () => {
    navigation?.navigate(navigationString?.SubscriptionPlan, {
      fromScreen: SUBSCRIPTION_NAVIGATION_FROM?.DASHBOARD,
      isPlanner: false,
    });
  };

  const planStatus = () => {
    if (
      subscriptionDetail?.productId == "zumlo_yearly_plan" ||
      subscriptionDetail?.productId == "zumlo_yearly_plan_without_trial"
    ) {
      return "View Plans";
    } else {
      return "Upgrade Plan";
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.floatContainer}>
        <View style={styles.floatInnerContainer}>
          <Text style={styles.floatText}>{strings?.Current_Plan}</Text>
        </View>
      </View>
      <ImageBackground
        source={imagePath.DashboardSubscription}
        style={styles.bgImageContainer}
        resizeMode={APPLY_STATUS?.stretch}
      >
        <View style={styles.subcriptionCardContainer}>
          <View>
            <View style={styles.planNameContainer}>
              <SubscriptionPlancrownIcon />
              <Text style={styles.planNameText}>
                {basicInformation?.basicInformation?.isFreeTrialActive
                  ? "14-Day Free Trial"
                  : subscriptionDetail?.planName}
              </Text>
            </View>
            <Text style={styles.planDescriptionText}>
              {basicInformation?.basicInformation?.isFreeTrialActive
                ? `You have ${basicInformation?.basicInformation?.daysRemainingInFreeTrial} days remaining, Enjoy full access during your trial. Upgrade anytime.`
                : subscriptionDetail?.planDescription}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.upgradeButtonContainer}
            onPress={() => featureClick()}
          >
            <Text style={styles.upgradeText}>{planStatus()}</Text>
            <RightArrowWithBackgrpoundIcon
              width={`${moderateScale(25)}`}
              height={`${moderateScale(25)}`}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    marginTop: moderateScale(20),
  },
  bgImageContainer: {
    width: "100%",
  },
  floatContainer: {
    zIndex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    position: "absolute",
    width: "95%",
    top: moderateScale(-10),
  },
  floatInnerContainer: {
    backgroundColor: colors.SurfCrest,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(13),
    borderColor: colors.royalOrangeDark,
    borderWidth: moderateScale(2),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
  },
  floatText: {
    fontSize: moderateScale(12),
    color: colors.prussianBlue,
    fontWeight: "600",
  },
  subcriptionCardContainer: {
    padding: moderateScale(10),
    flexDirection: "column",
    justifyContent: "space-between",
  },
  planNameContainer: { flexDirection: "row", alignItems: "center" },
  planNameText: {
    fontSize: textScale(16),
    marginHorizontal: moderateScale(10),
    fontWeight: "700",
    color: colors?.prussianBlue,
  },
  planDescriptionText: {
    fontSize: textScale(13),
    marginTop: moderateScale(5),
    fontWeight: "500",
    color: colors?.prussianBlue,
  },
  planAmountText: {
    fontSize: textScale(24),
  },
  planBottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(20),
  },
  upgradeButtonContainer: {
    backgroundColor: colors.prussianBlue,
    borderRadius: moderateScale(20),
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: moderateScale(10),
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(8),
    alignItems: "center",
  },
  upgradeText: {
    color: colors.SurfCrest,
    fontSize: textScale(16),
    fontWeight: "600",
    marginHorizontal: moderateScale(5),
    marginRight: moderateScale(10),
  },
});
export default SubscriptionPlanSuggestion;
