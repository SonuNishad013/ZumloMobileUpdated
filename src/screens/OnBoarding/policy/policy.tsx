import {
  View,
  FlatList,
  useWindowDimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
} from "react-native";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import navigationString from "../../../navigation/navigationString";
import { imagePath } from "../../../assets/png/imagePath";
import CommonButton from "../../../components/Buttons/commonButton";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";
import { useDispatch } from "react-redux";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import CommonHeader from "../../../components/Header/commonHeader";
import allActions from "../../../redux/actions";
import { event } from "../../../navigation/emitter";
import RenderHtml from "react-native-render-html";
import { height, moderateScale } from "../../../constant/responsiveStyle";

import { HealthDataIcon, TermsconditionsIcon } from "../../../assets";
import ConsentItem from "./MedicalConditionsTerms";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import { getGlobalCodeOptionsId } from "../../../helper/getGlobalCodes";
import { GlobalCategoryName, GlobalCodeName } from "../../../constant/ENUM";
import logger from "../../../constant/logger";
import { POLICY_URLS } from "../../../constant/HtmlContent";
import WebView from "react-native-webview";
import CommonLoader from "../../../components/Loader";
import MedicalConsentScreen from "../../../components/Pollicy/MedicalConsentScreen";
import TermsOfService from "../../../components/Pollicy/TermsOfService";
import CommonAlert from "../../../components/CommonAlert/CommonAlert";

//post sign up
interface Props {
  navigation?: any;
  route?: any;
}

const Policy: React.FC<Props> = ({ navigation, route }): ReactElement => {
  const flatListRef = useRef<FlatList<any>>(null);
  const { purpose, data } = route?.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [privacyData, setPrivacyData] = useState<any>();
  const [medicalPrivacyPolicy, setmedicalPrivacyPolicy] = useState<any>();
  const [isCheck, setIsCheck] = useState(false);
  const { width } = useWindowDimensions();
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const [isNext, setIsNext] = useState(false);
  useEffect(() => {
    // getConsentFormByType();
    // getMedicalConsentPolicy();
  }, []);
  // Define the ConsentItemProps interface
  interface ConsentItemProps {
    id: number;
    label: string;
    type: "switch" | "checkbox";
    value: boolean;
    icon: ReactElement;
  }

  const [consentData, setConsentData] = useState<ConsentItemProps[]>([
    {
      id: 1,
      label: "Consent to use health data",
      type: "switch",
      value: false,
      icon: (
        <HealthDataIcon width={moderateScale(3)} height={moderateScale(13)} />
      ),
    },
    {
      id: 2,
      label: "I agree to the terms and conditions",
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
  useEffect(() => {
    console?.log("testData");
  }, []);

  const handleToggle = (id: number) => {
    const updatedData = consentData.map((item) =>
      item.id === id ? { ...item, value: !item.value } : item
    );
    setConsentData(updatedData);
  };

  const getConsentFormByType = async () => {
    try {
      setIsLoading(true);
      const requestBody = {};
      await allActions.seekerDetails
        .GetConsentFormByType(
          dispatch,
          requestBody,
          "GetConsentFormByType",
          "207"
        )
        .then((res) => {
          setPrivacyData(res?.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err?.message,
          });
        });
    } catch (error) {
      setIsLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
    }
  };
  const getMedicalConsentPolicy = async () => {
    const getGlobalCodeData = await AsyncStorageUtils.getItem(
      AsyncStorageUtils.GLOBALCODEWITHCATEGORY
    );
    const getMedicalConsentPolicyID = await getGlobalCodeOptionsId(
      JSON.parse(getGlobalCodeData),
      GlobalCategoryName.ConsentFormType,
      GlobalCodeName.MedicalConsent
    );
    logger(
      "getMedicalConsentPolicyID",
      JSON.parse(getGlobalCodeData),
      "getMedicalConsentPolicyID",
      getMedicalConsentPolicyID
    );
    try {
      setIsLoading(true);
      const requestBody = {};
      await allActions.seekerDetails
        .GetConsentFormByType(
          dispatch,
          requestBody,
          "getMedicalConsentPolicy",
          // "578"
          getMedicalConsentPolicyID?.globalCodeId
        )
        .then((res) => {
          console.log("medical consent policy", res);

          setmedicalPrivacyPolicy(res?.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err?.message,
          });
        });
    } catch (error) {
      setIsLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
    }
  };

  const SaveUserPrivacyPolicyInfo = () => {
    setIsLoadingButton(true);
    try {
      const requestBody = {
        isHealthConsentForDataUsage:
          consentData.find((item) => item.label.includes("health data"))
            ?.value || false,

        isTermsAndConditionsAccepted:
          consentData.find((item) =>
            item.label.includes("terms and conditions")
          )?.value || false,

        isPrivacyPolicyAccepted: true,
      };
      console.log("SaveUserPrivacyPolicyInfo req====>", requestBody);

      // setTimeout(() => {
      //   setIsLoadingButton(false);
      //   Alert.alert("saveuserproavacyPolicyInfo");
      // }, 3000);
      // return;
      allActions?.Auth.SaveUserPrivacyPolicyInfo(
        dispatch,
        requestBody,
        "SaveUserPrivacyPolicyInfo"
      )
        .then((response: any) => {
          console.log("response-=-=>", response);

          if (response.statusCode == 200) {
            setIsLoadingButton(false);
            switch (purpose) {
              case "phone_sign":
                event.emit("login");

                navigation.reset({
                  index: 0,
                  routes: [{ name: navigationString?.UserType }],
                });
                break;
              case "CreateNewPassword":
                event.emit("login");

                navigation.reset({
                  index: 0,
                  routes: [{ name: navigationString?.UserType }],
                });
                break;
              case "haveDrDetails":
                navigation.navigate(navigationString?.OnBoardedBy, {
                  from: navigationString?.CreateNewPassword,
                  data: data,
                });
                break;
              case "fromWellness":
                event.emit("login");

                navigation.reset({
                  index: 0,
                  routes: [{ name: navigationString?.PlannerDashboard }],
                });
                break;
              default:
                break;
            }
          } else {
            setIsLoadingButton(false);
            setToasterDetails({
              showToast: true,
              code: 0,
              message: response.message,
            });
          }
        })
        .catch((err) => {
          setIsLoadingButton(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err.message,
          });
        });
    } catch (error) {
      setIsLoadingButton(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
    }
  };

  const SaveConsentForm = async (isNext: boolean) => {
    setIsNext(true);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    if (isCheck && isNext) {
      try {
        setIsLoadingButton(true);
        const requestBody = {
          isReadConsentForm: isCheck,
        };
        // setTimeout(() => {
        //   setIsLoadingButton(false);
        //   Alert.alert("SaveConsentForm");
        // }, 3000);
        // return;
        await allActions.Auth.SaveConsentForm(
          dispatch,
          requestBody,
          "SaveConsentForm"
        )
          .then((res) => {
            SaveUserPrivacyPolicyInfo();
          })
          .catch((err) => {
            setIsLoadingButton(false);
            setToasterDetails({
              showToast: true,
              code: 0,
              message: err?.message,
            });
          });
      } catch (error) {
        setIsLoadingButton(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: error,
        });
      }
    } else {
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors.prussianBlue}>
      <View style={styles?.container_}>
        <View style={styles?.HeaderContain_}>
          <CommonHeader
            onBackPress={() => {
              isNext
                ? setIsNext(!isNext)
                : navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                  });
            }}
            headerName={
              isNext ? strings.healthConsent : strings?.Terms_of_services
            }
            isBackIcon={isNext ? true : false}
            textStyle={styles.textStyle}
            mainContainer={styles.mainContainer}
          />
        </View>
        <View style={styles?.webviewCOntainer_}>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <CommonLoader />
            </View>
          )}
          {isNext ? <MedicalConsentScreen /> : <TermsOfService />}
        </View>
      </View>
      <View style={styles?.bottomButton_}>
        <>
          {isNext ? (
            <>
              <View style={styles?.checkBox_}>
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
              <View style={styles?.imgContainer_}>
                <View style={styles?.checkBoxImg_}>
                  {isCheck && (
                    <Image
                      source={imagePath?.check}
                      style={styles?.imgStyle_}
                    />
                  )}
                </View>
              </View>
              <Text style={styles.agreementText}>
                {strings?.I_agree_to_the_terms_of_service}
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

export default Policy;

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
    marginHorizontal: moderateScale(10),
    justifyContent: "space-between",
  },
  flatListContent: {
    paddingBottom: moderateScale(50),
    flex: 1,
  },
  ViewFlat: {
    // alignItems: "center",
    // marginHorizontal: moderateScale(19),
    // marginTop: moderateScale(30),
    // height: 200,
    backgroundColor: "gray",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(30),
    marginHorizontal: moderateScale(28),
    // justifyContent: "space-between",
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
    // marginLeft: moderateScale(10),
  },
  AgreeButtonView: {
    justifyContent: "center",

    alignItems: "center",
    height: moderateScale(100),
  },
  container_: {
    flex: 1,
    backgroundColor: colors.privacyPolicyBG,
  },
  HeaderContain_: {
    backgroundColor: colors?.prussianBlue,
    paddingBottom: moderateScale(10),
    borderBottomRightRadius: moderateScale(30),
    borderBottomLeftRadius: moderateScale(30),
    marginBottom: moderateScale(10),
  },
  webviewCOntainer_: {
    flex: 1,
    marginHorizontal: moderateScale(10),
    backgroundColor: colors?.privacyPolicyBG,
  },
  webview_: { flex: 1, backgroundColor: colors?.privacyPolicyBG },
  bottomButton_: { backgroundColor: colors?.privacyPolicyBG },
  checkBox_: {
    paddingHorizontal: 20,
  },
  checkBoxImg_: {
    height: moderateScale(18),
    width: moderateScale(18),
    borderWidth: moderateScale(1),
    borderColor: colors.royalOrange,
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer_: {
    width: moderateScale(25),
  },
  imgStyle_: {
    tintColor: colors.royalOrange,
    height: moderateScale(13),
    width: moderateScale(13),
  },
  loadingContainer: {
    height: height,
  },
});
