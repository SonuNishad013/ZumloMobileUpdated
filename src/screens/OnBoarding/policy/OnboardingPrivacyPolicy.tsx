import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import WebView from "react-native-webview";
import {
  MedicalContent,
  PrivacyPolicyContent,
} from "../../../constant/HtmlContent";

import { height, moderateScale } from "../../../constant/responsiveStyle";
import CommonLoader from "../../../components/Loader";
import PrivacyPolicyDetails from "../../../components/Pollicy/PrivacyPolicy";
interface OnboardingPrivacyPolicyProps {
  navigation: any;
}
const OnboardingPrivacyPolicy: React.FC<OnboardingPrivacyPolicyProps> = ({
  navigation,
}) => {
  // const [isLoading, setIsLoading] = useState(true);

  return (
    <ScreenWrapper statusBarColor={colors?.privacyPolicyBG}>
      <View style={styles?.container}>
        <CommonHeader
          headerName=""
          onBackPress={() => navigation?.goBack()}
          mainContainer={{ paddingHorizontal: moderateScale(15) }}
        />

        <View style={styles?.webviewContainer}>
          {/* <WebView
            originWhitelist={["*"]}
            source={{
              uri: POLICY_URLS?.PRIVACY_POLICY,
            }}
            style={styles.webview}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() =>
              setTimeout(() => {
                setIsLoading(false);
              }, 200)
            }
          /> */}
          <PrivacyPolicyDetails />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default OnboardingPrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.privacyPolicyBG,
  },
  webviewContainer: {
    height: height,
    paddingHorizontal: moderateScale(10),
    backgroundColor: colors?.privacyPolicyBG,
    paddingBottom: moderateScale(50),
  },
  webview: {
    marginTop: moderateScale(10),
    backgroundColor: colors?.privacyPolicyBG,
  },
  loadingContainer: {
    height: height,
  },
});
