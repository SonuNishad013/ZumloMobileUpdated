import { ImageBackground, Text, View } from "react-native";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import { PlannerFlowCompleted_ } from "../../../assets";
import CommonButton from "../../../components/Buttons/commonButton";
import navigationString from "../../../navigation/navigationString";
import { strings } from "../../../constant/strings";
import { useDispatch } from "react-redux";
import { formatSentenceCase } from "../../../helper/sentenceCase";
import allActions from "../../../redux/actions";
import appConstant from "../../../constant/appConstant";
import { event } from "../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { useState } from "react";

const PlannerFlowCompleted = ({ navigation, route }: any) => {
  console.log("route in PlannerFlowCompleted", route);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const dispatch = useDispatch();
  const { reqData, userData } = route?.params;
  const onViewTheResults = () => {
    if (route?.params?.from === "fromExplorer") {
      console.log("fromExplorer");
      saveQuestionnaireData();
    } else {
      AsyncStorageUtils?.storeItemKey(
        AsyncStorageUtils.ONBOARDING_QUESTIONS_RESPONSE,
        JSON.stringify({
          reqData,
        })
      );

      navigation.navigate(navigationString.SelectActivity, {
        reqData: reqData,
      });
    }
  };
  const saveQuestionnaireData = () => {
    let requestbody = {
      categoryId: 320,
      stepOptions: reqData,
    };
    allActions.OnBoarding.SaveOnboardingExplorerSteps(
      dispatch,
      requestbody,
      "SaveOnboardingExplorerSteps"
    )
      .then(async (response: any) => {
        if (response.statusCode == 200) {
          console.log("response in saveQuestionnaireData", response);
          let req = {
            userId: userData?.userId !== undefined ? userData?.userId : 0,
            strategyTypeId: appConstant.explorer_planner_type.explorer,
          };
          allActions.OnBoarding.SaveSeekerPlannerExplorerId(
            dispatch,
            req,
            "SaveSeekerPlannerExplorerId"
          )
            .then(async (response: any) => {
              console.log("response SaveSeekerPlannerExplorerId", response);
              event.emit(strings.login_);

              await AsyncStorageUtils.storeItemKey(
                AsyncStorageUtils.ISPLANNER_USER,
                JSON.stringify({
                  isPlanner: false,
                  isSelected: true,
                })
              );
            })
            .catch((err) => {
              setToasterDetails({
                showToast: true,
                code: 0,
                message: err?.message,
              });
            });
        }
      })
      .catch((err: any) => {
        setToasterDetails({
          showToast: true,
          code: 0,
          message: err?.message,
        });
      });
  };
  return (
    <ScreenWrapper statusBarColor={colors.darkthemColor}>
      <ImageBackground
        source={imagePath.PlanCreatedBackground}
        style={{
          flex: 1,
          width: width,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: height / 1.5,
            width: width,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PlannerFlowCompleted_
            width={`${moderateScale(80)}`}
            height={`${moderateScale(80)}`}
          />
          <View
            style={{
              marginTop: moderateScale(50),
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: moderateScale(30),
            }}
          >
            <Text
              style={{
                fontSize: textScale(28),
                textAlign: "center",
                fontWeight: "500",
                color: colors.SurfCrest,
              }}
            >
              {
                "You just shared a piece of your story — and I’m really grateful. "
              }
            </Text>
            <Text
              style={{
                marginTop: moderateScale(15),
                textAlign: "center",
                width: width / 1.1,
                fontSize: textScale(16),
                fontWeight: "400",
                color: colors.royalOrangeDark,
              }}
            >
              {route?.params?.from === "fromExplorer"
                ? strings?.Go_to_dashboard_n_Explorer
                : "Thank you for trusting me.\nI’m here to support you in a way\nthat actually fits your life."}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: height / 8,
            width: width,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <CommonButton
            btnName={
              route?.params?.from === "fromExplorer"
                ? "Go to dashboard"
                : "Explore your options"
            }
            onPress={() => onViewTheResults()}
          />
        </View>
        {toasterDetails?.showToaster && (
          <ToastApiResponse
            data={toasterDetails}
            setToasterDetails={setToasterDetails}
            code={toasterDetails?.code}
            message={toasterDetails?.message}
          />
        )}
      </ImageBackground>
    </ScreenWrapper>
  );
};
export default PlannerFlowCompleted;
