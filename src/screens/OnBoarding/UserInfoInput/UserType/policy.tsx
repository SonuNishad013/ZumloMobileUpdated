import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
} from "react-native";
import React, { ReactElement, useEffect, useRef, useState } from "react";

import { imagePath } from "../../../../assets/png/imagePath";
import colors from "../../../../constant/colors";
import { strings } from "../../../../constant/strings";
import { useDispatch } from "react-redux";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import CommonHeader from "../../../../components/Header/commonHeader";
import allActions from "../../../../redux/actions";
import { height, moderateScale } from "../../../../constant/responsiveStyle";
import CommonButton from "../../../../components/Buttons/commonButton";
import { HealthDataIcon, TermsconditionsIcon } from "../../../../assets";
import ConsentItem from "../../policy/MedicalConditionsTerms";
import * as AsyncStorageUtils from "../../../../utils/Storage/AsyncStorage";
import logger from "../../../../constant/logger";
import { getGlobalCodeOptionsId } from "../../../../helper/getGlobalCodes";
import { GlobalCategoryName, GlobalCodeName } from "../../../../constant/ENUM";
import { POLICY_URLS } from "../../../../constant/HtmlContent";
import WebView from "react-native-webview";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../../../constant/appConstant";
import { getSubscriptionStatusFromServer } from "../../../../constant/getSubscriptionStatus";
import CommonLoader from "../../../../components/Loader";
import MedicalConsentScreen from "../../../../components/Pollicy/MedicalConsentScreen";
import TermsOfService from "../../../../components/Pollicy/TermsOfService";
import CommonAlert from "../../../../components/CommonAlert/CommonAlert";

//after sign up
interface Props {
  navigation?: any;
  route?: any;
}
interface ConsentItemProps {
  id: number;
  label: string;
  type: "switch" | "checkbox";
  value: boolean;
  icon: ReactElement;
}
const InternalPolicy: React.FC<Props> = ({
  navigation,
  route,
}): ReactElement => {
  const flatListRef = useRef<FlatList<any>>(null);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [privacyData, setPrivacyData] = useState<any>();
  const [medicalPrivacyPolicy, setmedicalPrivacyPolicy] = useState<any>();
  const [isCheck, setIsCheck] = useState(false);

  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const [isNext, setIsNext] = useState(false);
  const [exitAlert, setExitAlert] = useState(false);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);
  const [consentData, setConsentData] = useState<ConsentItemProps[]>([
    {
      id: 1,
      label: "I consent to Zumlo using my health data to personalize support. ",
      type: "switch",
      value: false,
      icon: (
        <HealthDataIcon width={moderateScale(13)} height={moderateScale(13)} />
      ),
    },
    {
      id: 2,
      label: "I’ve read and agree to the health consent terms. ",
      type: "checkbox",
      value: false,
      icon: (
        <TermsconditionsIcon
          width={moderateScale(13)}
          height={moderateScale(13)}
        />
      ),
    },
  ]);

  const handleToggle = (id: number) => {
    const updatedData = consentData.map((item) =>
      item.id === id ? { ...item, value: !item.value } : item
    );
    setConsentData(updatedData);
  };

  const SaveConsentForm = async (isNext: boolean) => {
    setIsNext(true);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    if (isCheck && isNext) {
      try {
        setIsLoading(true);
        const requestBody = {
          isHealthConsentForDataUsage:
            consentData.find((item) => item.label.includes("health data"))
              ?.value || false,

          isTermsAndConditionsAccepted:
            consentData.find((item) =>
              item.label.includes("terms and conditions")
            )?.value || false,

          isReadConsentForm: isCheck,
        };

        await allActions.Auth.SaveConsentForm(
          dispatch,
          requestBody,
          "SaveConsentForm"
        )
          .then((res) => {
            navigation.goBack();
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
          });
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      console.log("consent form is not accepted");
    }
  };
  return (
    <ScreenWrapper statusBarColor={colors.prussianBlue}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.privacyPolicyBG,
          marginTop: moderateScale(10),
        }}
      >
        <View
          style={{
            backgroundColor: colors?.prussianBlue,
            paddingBottom: moderateScale(10),
            borderBottomRightRadius: moderateScale(30),
            borderBottomLeftRadius: moderateScale(30),
            marginBottom: moderateScale(10),
          }}
        >
          <CommonHeader
            onBackPress={() => setIsNext(!isNext)}
            headerName={isNext ? "Health Data Consent" : "Terms of Service"}
            isBackIcon={isNext ? true : false}
            textStyle={styles.textStyle}
            mainContainer={styles.mainContainer}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: moderateScale(10),
            backgroundColor: colors?.privacyPolicyBG,
          }}
        >
          {isLoading && (
            <View style={styles.loadingContainer}>
              <CommonLoader />
            </View>
          )}
          {isNext ? <MedicalConsentScreen /> : <TermsOfService />}
        </View>
      </View>
      <View style={{ backgroundColor: colors?.privacyPolicyBG }}>
        <>
          {isNext ? (
            <>
              <View
                style={{
                  paddingHorizontal: 20,
                }}
              >
                {consentData.map((item) => (
                  <ConsentItem
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    type={item.type}
                    value={item.value}
                    icon={item.icon}
                    onToggle={handleToggle}
                  />
                ))}
              </View>
            </>
          ) : (
            <TouchableOpacity
              style={styles.footerContainer}
              onPress={() => setIsCheck(!isCheck)}
            >
              <View
                style={
                  {
                    // width: moderateScale(60),
                  }
                }
              >
                <View
                  style={{
                    height: moderateScale(18),
                    width: moderateScale(18),
                    borderWidth: moderateScale(1),
                    borderColor: colors.royalOrange,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isCheck && (
                    <Image
                      source={imagePath?.check}
                      style={{
                        tintColor: colors.royalOrange,
                        height: moderateScale(13),
                        width: moderateScale(13),
                      }}
                    />
                  )}
                </View>
              </View>
              <Text style={styles.agreementText}>
                {"I’ve read and agree to Zumlo’s Terms of Service."}
              </Text>
            </TouchableOpacity>
          )}
        </>
        <>
          <View style={styles.AgreeButtonView}>
            <CommonButton
              mainContainer={{
                backgroundColor:
                  isCheck && !isNext
                    ? colors?.polishedPine
                    : consentData.every((item) => item.value === true)
                    ? colors?.polishedPine
                    : colors.grayOp,
              }}
              isLoading={isLoadingButton}
              btnName={
                isNext
                  ? strings.ContinueLowerCase?.toUpperCase()
                  : strings.next?.toUpperCase()
              }
              onPress={() => {
                isCheck && SaveConsentForm(isNext);
              }}
              disabled={
                isCheck && !isNext
                  ? false
                  : consentData.every((item) => item.value === true)
                  ? false
                  : true
              }
            />
          </View>
        </>
      </View>
      {exitAlert && (
        <CommonAlert
          alertMessage={"Are you sure you want to exit the app?"}
          isVisible={true}
          alertLeftButtonText="CANCEL"
          alertRightButtonText="OK"
          customAlertTxtStyles={{
            textAlign: "center",
            marginBottom: moderateScale(10),
          }}
          alertLeftButtonOnPress={() => {
            setExitAlert(false);
          }}
          alertRightButtonOnPress={() => {
            setExitAlert(false);
            BackHandler.exitApp();
          }}
          isAlertIcon
        />
      )}
    </ScreenWrapper>
  );
};

export default InternalPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.privacyPolicyBG,
  },
  headerContainer: {
    backgroundColor: colors.prussianBlue,
    height: moderateScale(70),
    paddingTop: moderateScale(25),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    paddingHorizontal: moderateScale(5),
  },
  textStyle: {
    color: colors.SurfCrest,
  },
  mainContainer: {
    paddingBottom: moderateScale(15),
    marginHorizontal: moderateScale(10),
    justifyContent: "space-between",
  },
  flatListContent: {
    paddingBottom: moderateScale(50),
  },
  ViewFlat: {
    alignItems: "center",
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(30),
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(30),
    marginHorizontal: moderateScale(21),
  },

  checkBoxContainer: {
    height: moderateScale(20),
    width: moderateScale(20),
    // backgroundColor:'red',
    borderWidth: moderateScale(1),
    borderRadius: 2,
  },
  agreementText: {
    color: colors.royalOrange,
    fontSize: moderateScale(14),
    marginLeft: moderateScale(10),
  },
  AgreeButtonView: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(100),
  },
  loadingContainer: {
    height: height * 0.75,
  },
});
