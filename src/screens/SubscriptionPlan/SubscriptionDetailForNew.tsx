import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { imagePath } from "../../assets/png/imagePath";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackIcon, SentTicks } from "../../assets";
import { MEMBERSHIP_DURATION } from "../../constant/ENUM";
import CommonLoader from "../../components/Loader";
import ToastApiResponse from "../../components/Toast/ToastApiResponse";

import { StringSubscription } from "./StringSubscription";
import { textLabelSize } from "../../utils/TextConfig";
interface params {
  navigation: any;
  route: any;
}
const SubscriptionDetailForNew: React.FC<params> = ({ navigation, route }) => {
  const { item } = route?.params;
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const goBack = () => {
    navigation.goBack();
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
        <Text style={styles?.subTitleText}>{item?.planDescription}</Text>
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
        <View style={styles?.footerView}>
          {item?.duration == MEMBERSHIP_DURATION?.BASIC ? (
            <Text style={styles?.priceText}>
              {StringSubscription?.Life_time_free}
            </Text>
          ) : item?.duration == MEMBERSHIP_DURATION?.TRIAL ? null : (
            <Text style={styles?.priceText}>{`${item?.planPrice?.currency} ${
              item?.planPrice?.price
            }/ ${item?.duration.toLowerCase()}`}</Text>
          )}
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

export default SubscriptionDetailForNew;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parentView: {
    paddingHorizontal: moderateScale(20),
    flex: 1,
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
    fontSize: textLabelSize?.headerTextSize,
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginTop: moderateScale(30),
  },
  subTitleText: {
    fontSize: textLabelSize?.subHeaderTextSize,
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginTop: moderateScale(10),
    fontStyle: "italic",
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
    fontSize: textLabelSize?.subtTitleFont,
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginLeft: moderateScale(10),
  },
  priceText: {
    fontSize: textLabelSize?.headerTextSize,
    fontWeight: "600",
    color: colors?.royalOrangeDark,
    marginTop: moderateScale(30),
    marginBottom: moderateScale(10),
  },
  footerView: {
    bottom: moderateScale(30),
    alignSelf: "center",
    width: "100%",
  },
});
