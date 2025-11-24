import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { imagePath } from "../../assets/png/imagePath";
import { height, moderateScale, width } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { StringSubscription } from "./StringSubscription";
import navigationString from "../../navigation/navigationString";
import allActions from "../../redux/actions";
import { API_FUN_NAMES } from "../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../constant/appConstant";
import logger from "../../constant/logger";
import CommonLoader from "../../components/Loader";
import { getCountryCode } from "../../constant/getCountryCode";
import { useDispatch } from "react-redux";
import { textLabelSize } from "../../utils/TextConfig";

let textColor: any = colors?.SurfCrest;

interface SubscriptionPlanProps {
  navigation: any;
  route: any;
}
const ForFreshUserSubscription: React.FC<SubscriptionPlanProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [planList, setPlanList] = useState([]);

  useEffect(() => {
    fetchSubscriptionList();
  }, []);
  const fetchSubscriptionList = async () => {
    setisLoading(true);
    let countryCode = await getCountryCode();

    allActions.SubscriptionAction.getSubscriptionPlans(
      dispatch,
      "",
      API_FUN_NAMES?.getSubscriptionPlans,
      countryCode
    )
      .then((response: any) => {
        setisLoading(false);
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setPlanList(response?.data);
        }
      })
      .catch((err) => {
        setisLoading(false);
        logger("error_list_", err);
      });
  };

  const viewDetailClick = () => {
    navigation?.navigate(navigationString.PlanListOnboarding, {
      planList: planList,
    });
  };

  const startFreeTrail = async () => {
    setisLoading(true);
    let requestbody = {};
    allActions.SubscriptionAction.StartFreeTrial(
      requestbody,
      API_FUN_NAMES?.StartFreeTrial
    )
      .then((response: any) => {
        setisLoading(false);
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (response?.data?.id) {
            navigation?.goBack();
          }
        } else {
          Alert?.alert("Status", response?.message);
        }
      })
      .catch((err) => {
        setisLoading(false);
        logger("error_err_buy_plan", err);
      });
  };

  return (
    <ImageBackground
      style={[styles?.backgroudImageStyle]}
      source={imagePath?.journal_2}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles?.titleStyle}>
          {/* {StringSubscription?.Start_Your_Free} */}
          {"Your 14-day\npremium pass awaits"}
        </Text>
        <Text style={styles?.subTitleStyle}>
          {/* {StringSubscription?.Experiance_every_feature_for} */}
          {
            "All features. All access. All yours for the\nnext 14 days — no card needed."
          }
        </Text>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => startFreeTrail()}
          style={[styles.footerButton, styles?.topStyle]}
        >
          <Text style={styles?.buttonStyle}>
            {/* {StringSubscription?.Start_14_Days_Free_Trial} */}
            {"Start my free trial"}
          </Text>
        </TouchableOpacity>
        <View style={styles?.horizontalLine} />
        <Text style={styles?.fieldStyle}>
          {/* {StringSubscription?.What_happen_after_my_trail} */}
          {"After the 14 days"}
        </Text>
        <View style={styles?.detailStyle}>
          <View style={styles?.dotStyle} />

          <Text style={styles?.detailText}>
            {/* {StringSubscription?.after_trial_one} */}
            {
              "No upgrade? The plan rolls into Basic — free forever, with essential features."
            }
          </Text>
        </View>

        <View style={styles?.detailStyle}>
          <View style={styles?.dotStyle} />
          <Text style={styles?.detailText}>
            {/* {StringSubscription?.after_trial_two} */}
            {"Want to keep Premium? Switch to Monthly or Yearly anytime."}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => viewDetailClick()}>
        <Text style={styles?.viewPlansText}>
          {/* {StringSubscription?.View_Plans} */}
          {"View plans"}
        </Text>
      </TouchableOpacity>

      {isLoading && (
        <View
          style={{
            position: "absolute",
            height: height,
            width: width,
          }}
        >
          <CommonLoader />
        </View>
      )}
    </ImageBackground>
  );
};

export default ForFreshUserSubscription;

const styles = StyleSheet.create({
  backgroudImageStyle: {
    flex: 1,
    paddingTop: moderateScale(100),
    paddingHorizontal: moderateScale(20),
  },
  titleStyle: {
    fontSize: textLabelSize?.titleFont,
    fontWeight: "700",
    color: textColor,
    textAlign: "center",
    marginTop: moderateScale(10),
  },
  subTitleStyle: {
    fontSize: textLabelSize?.subtTitleFont,
    fontWeight: "400",
    color: textColor,
    textAlign: "center",
    marginTop: moderateScale(15),
    fontStyle: "italic",
  },
  topStyle: {
    marginTop: moderateScale(50),
  },
  horizontalLine: {
    height: moderateScale(0.7),
    backgroundColor: colors?.polishedPine,
    marginVertical: moderateScale(20),
  },
  fieldStyle: {
    fontSize: textLabelSize?.titleFont,
    fontWeight: "600",
    color: textColor,
    textAlign: "center",
    marginTop: moderateScale(25),
  },
  detailStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(15),
  },
  dotStyle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: textColor,
    marginRight: 15,
  },
  detailText: {
    fontSize: textLabelSize?.subtTitleFont,
    fontWeight: "400",
    color: textColor,
  },
  footerButton: {
    backgroundColor: colors?.activeStrock,
    marginHorizontal: moderateScale(20),

    paddingVertical: moderateScale(20),
    alignItems: "center",
    borderRadius: moderateScale(80),
    overflow: "hidden",
    marginTop: moderateScale(10),
  },
  buttonStyle: {
    fontSize: textLabelSize?.titleFont,
    fontWeight: "500",
    color: colors?.SurfCrest,
  },
  viewPlansText: {
    marginBottom: moderateScale(50),
    textAlign: "center",
    fontSize: textLabelSize?.subtTitleFont,
    textDecorationLine: "underline",
    color: colors?.royalOrangeDark,
    fontWeight: "500",
  },
});
