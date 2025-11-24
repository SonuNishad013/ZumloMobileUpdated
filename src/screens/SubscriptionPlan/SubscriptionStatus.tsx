import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { imagePath } from "../../assets/png/imagePath";
import colors from "../../constant/colors";
import { moderateScale } from "../../constant/responsiveStyle";
import { strings } from "../../constant/strings";
import { MEMBERSHIP_DURATION } from "../../constant/ENUM";
import allActions from "../../redux/actions";
import { API_FUN_NAMES } from "../../constant/APIsFunctionNames";
import logger from "../../constant/logger";
import { useDispatch } from "react-redux";
import CommonLoader from "../../components/Loader";
import { STATUS_CODES } from "../../constant/appConstant";
import { SubscriptionStrings } from "./SubscriptionStrings";

interface params {
  navigation: any;
  route: any;
}
const SubscriptionStatus: React.FC<params> = ({ navigation, route }) => {
  const { stackPop, buyPlanType } = route?.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const continueClick = async () => {
    setIsLoading(true);
    let requestbody = {};
    allActions.seekerDetails
      .GetSeekerPersonalInfo(
        dispatch,
        requestbody,
        API_FUN_NAMES?.getSeekerPersonalInfo
      )
      .then((response: any) => {
        setIsLoading(false);
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          successCall();
        }
      })
      .catch((err) => {
        setIsLoading(false);
        logger("error_err", err);
      });
  };

  const successCall = () => {
    navigation.pop(stackPop);
  };

  const titleMessage = () => {
    if (buyPlanType == SubscriptionStrings?.Cancel) {
      return SubscriptionStrings?.Subscription_Cancelled;
    } else if (buyPlanType == MEMBERSHIP_DURATION?.BASIC) {
      return SubscriptionStrings?.Basic_Plan_Activated;
    } else if (
      buyPlanType == MEMBERSHIP_DURATION?.MONTHLY ||
      buyPlanType == MEMBERSHIP_DURATION?.YEARLY
    ) {
      return SubscriptionStrings?.succesTitle;
    }
  };
  const detailMessage = () => {
    if (buyPlanType == SubscriptionStrings?.Cancel) {
      return SubscriptionStrings?.cancel_plan_detail;
    } else if (buyPlanType == MEMBERSHIP_DURATION?.BASIC) {
      return SubscriptionStrings?.basic_plan_detail;
    } else if (
      buyPlanType == MEMBERSHIP_DURATION?.MONTHLY ||
      buyPlanType == MEMBERSHIP_DURATION?.YEARLY
    ) {
      return SubscriptionStrings?.plan_purchase_detail;
    }
  };
  return (
    <ImageBackground style={styles?.container} source={imagePath?.status}>
      <Text style={styles?.titleText}>{titleMessage()}</Text>
      <Text style={styles?.substitleText}>{detailMessage()}</Text>
      <TouchableOpacity
        style={styles?.upgradeButton}
        onPress={() => continueClick()}
      >
        <Text style={styles?.upgradeText}>{strings?.ContinueLowerCase}</Text>
      </TouchableOpacity>
      {isLoading && <CommonLoader />}
    </ImageBackground>
  );
};

export default SubscriptionStatus;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: moderateScale(20),
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
    marginHorizontal: moderateScale(40),
  },
  upgradeText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "600",
  },
  titleText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(24),
    fontWeight: "700",
    textAlign: "center",
    marginTop: moderateScale(70),
  },
  substitleText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "400",
    textAlign: "center",
    marginTop: moderateScale(20),
  },
});
