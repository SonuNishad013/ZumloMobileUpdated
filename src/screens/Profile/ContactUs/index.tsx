import React, { ReactElement, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import { moderateScale, width } from "../../../constant/responsiveStyle";
import CommonHeader from "../../../components/Header/commonHeader";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import RenderHtml from "react-native-render-html";
import CommonLoader from "../../../components/Loader";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import { getGlobalCodeOptionsId } from "../../../helper/getGlobalCodes";
import { CODES } from "../../../constant/DefaultGlobalCode";
import { FORMS } from "../../../constant/ENUM";
import { strings } from "../../../constant/strings";
import PrivacyPolicyDetails from "../../../components/Pollicy/PrivacyPolicy";

interface Props {
  navigation?: any;
}

const PrivacyPolicy: React.FC<Props> = ({ navigation }): ReactElement => {
  const dispatch: any = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [privacyData, setPrivacyData] = useState<any>();
  const [codeValue, setCodeValue] = useState(CODES?.privacy_policy_code);

  const getGloablCode = async () => {
    const getGlobalCodeData = await AsyncStorageUtils.getItem(
      AsyncStorageUtils.GLOBALCODEWITHCATEGORY
    );
    const getConsentForm = await getGlobalCodeOptionsId(
      JSON.parse(getGlobalCodeData),
      FORMS?.ConsentFormType,
      FORMS?.PrivacyPolicy
    );
    if (getConsentForm?.globalCodeId?.length) {
      setCodeValue(getConsentForm?.globalCodeId);
    }
  };
  useEffect(() => {
    getConsentFormByType();
    getGloablCode();
  }, []);
  const getConsentFormByType = async () => {
    try {
      setIsLoading(true);
      let requestBody = {};
      await allActions.seekerDetails
        .GetConsentFormByType(
          dispatch,
          requestBody,
          API_FUN_NAMES?.GetConsentFormByType,
          codeValue
        )
        .then((res) => {
          setPrivacyData(res?.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };
  const source = {
    html: `${privacyData?.description}`,
  };

  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={styles.container}>
        <View style={[styles?.headerContainer]}>
          <CommonHeader
            onBackPress={() => navigation.goBack()}
            headerName={strings?.Privacy_Policy}
            iconContainer={styles?.iconContainer}
            textStyle={styles?.commonHeaderTextStyle}
            mainContainer={styles?.mainContainer}
          />
        </View>
        <ScrollView>
          <PrivacyPolicyDetails />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.themeColor,
  },
  headerContainer: {
    backgroundColor: colors?.prussianBlue,
    height: moderateScale(70),
    paddingTop: moderateScale(15),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    paddingHorizontal: moderateScale(19),
  },
  iconContainer: {
    backgroundColor: colors?.darkPrussianBlue,
  },
  mainContainer: {
    paddingBottom: moderateScale(15),
  },
  iconWrapper: {
    height: moderateScale(200),
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    marginHorizontal: moderateScale(15),
  },
  AgreeButtonView: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(100),
  },
  commonHeaderTextStyle: {
    color: colors?.SurfCrest,
  },
});
