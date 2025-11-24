//Remove unused code from this file
import { View, StyleSheet, Text, Platform } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import { strings } from "../../../constant/strings";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import SelectMinDuration from "../../../components/Inputs";
import SimpleSlider from "../../../components/Sliders";
import CommonButton from "../../../components/Buttons/commonButton";
import { useDispatch } from "react-redux";
import allActions from "../../../redux/actions";
import CommonInput from "../../../components/Inputs/commonInput";
import CommonLoader from "../../../components/Loader";
import moment, { min } from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";

interface Props {
  navigation?: any;
  SvgIcon?: any;
  route?: any;
}

const AddSteps: React.FC<Props> = ({ navigation, SvgIcon, route }) => {
  const isIOS = Platform?.OS === "ios";
  const { userData } = route?.params;
  const [minValue, setMinValue] = useState<number>(30);
  const [isMinError, setIsMinError] = useState<any>(false);
  const [minErrMsg, setMinErrMsg] = useState<any>("");

  const [steps, setSteps] = useState<any>(0);
  const [stepsErrMsg, setStepsErrMsg] = useState<any>("");
  const [isStepsError, setIsStepsError] = useState<any>(false);

  const [calories, setCalories] = useState<any>(0);
  const [caloriesErrMsg, setCaloriesErrMsg] = useState<any>("");
  const [isCaloriesError, setIsCaloriesError] = useState<any>(false);

  const [distance, setDistance] = useState<any>(0);
  const [distanceErrMsg, setDistanceErrMsg] = useState<any>("");
  const [isDistanceError, setIsDistanceError] = useState<any>(false);

  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);

  const validateInputs = () => {
    let isValid = true;

    if (!steps) {
      setStepsErrMsg("Steps is required");
      setIsStepsError(true);
      isValid = false;
    }
    if (!distance) {
      setDistanceErrMsg("Distance is required");
      setIsDistanceError(true);
      isValid = false;
    }
    if (!minValue) {
      setMinErrMsg("Duration is required");
      setIsMinError(true);
      isValid = false;
    }
    return isValid;
  };
  const handleSubmit = () => {
    if (validateInputs()) {
      createVitalsManually();
    }
  };

  const createVitalsManually = () => {
    setisLoading(true);
    try {
      let requestbody = {
        userId: userData?.userId,
        vitalType: 82,
        stepVitalData: {
          stepCount: Math.trunc(steps),
          distance: Math.trunc(distance),
          timeDuration: `${minValue}`,
          caloriesBurned: Number(calories),
          vitalUnit: "steps",
        },
        healthDataTypeId: 82,
        timestamp: moment(new Date()).utc().format(),
      };

      allActions.addDevice
        .createVitalsManually(dispatch, requestbody, "createVitalsManually")
        .then((response: any) => {
          if (response.statusCode == 200) {
            setisLoading(false);
            setToasterDetails({
              showToast: true,
              code: 1,
              message: response.message,
            });
            setTimeout(() => {
              navigation?.goBack();
            }, 1000);
          } else {
            setisLoading(false);
            setToasterDetails({
              showToast: true,
              code: 0,
              message: response.message,
            });
          }
        })
        .catch((err) => {
          setisLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err.message,
          });
        });
    } catch (error) {
      setisLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
    }
  };

  const caloriesNum = (val: any) => {
    setCalories(val.replace(/[^0-9]/g, ""));
  };
  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: moderateScale(30),
          marginHorizontal: moderateScale(19),
        }}
        enableOnAndroid={true}
        extraScrollHeight={isIOS ? 150 : 220}
        keyboardShouldPersistTaps="handled"
      >
        <CommonHeader
          headerName={strings?.addSteps}
          textStyle={{ color: colors?.SurfCrest }}
          iconContainer={styles?.headerICon}
          mainContainer={styles?.headerMCon}
          onBackPress={() => navigation.goBack()}
        />

        <SimpleSlider
          title={strings?.steps}
          onValueChange={(val: any) => {
            setIsStepsError(false);
            setSteps(val);
          }}
          value={Math.trunc(steps)}
          initialValue={0}
          lastValue={50000}
          disableMinTrackTintColor="#fff"
          maximumTrackTintColor={colors?.surfCrustOp}
          minimumTrackTintColor={colors?.royalOrange}
          cacheValue={1}
          progressValue={60}
        />

        <Text
          style={{
            fontSize: textScale(10),
            fontWeight: "400",
            color: colors?.royalOrange,
            marginTop: moderateScale(5),
            marginLeft: moderateScale(5),
          }}
        >
          {isStepsError ? stepsErrMsg : ""}
        </Text>

        <SimpleSlider
          title={strings?.distance}
          onValueChange={(val: any) => {
            setIsDistanceError(false);
            setDistance(val);
          }}
          barStyle={{
            backgroundColor: colors?.polishedPine,
          }}
          value={Number.parseFloat(distance).toFixed(2)}
          initialValue={0}
          lastValue={70}
          disableMinTrackTintColor="#fff"
          maximumTrackTintColor={colors?.surfCrustOp}
          minimumTrackTintColor={colors?.polishedPine}
          ValueTitle={true}
          ValueTitleText={" Km"}
          cacheValue={1}
          progressValue={0.5}
        />
        <Text
          style={{
            fontSize: textScale(10),
            fontWeight: "400",
            color: colors?.royalOrange,
            marginTop: moderateScale(10),
            marginLeft: moderateScale(5),
          }}
        >
          {isDistanceError ? distanceErrMsg : ""}
        </Text>
        <SelectMinDuration
          value={minValue}
          steps={1}
          title={strings?.min}
          onValueChange={(duration: number) => {
            setIsMinError(false);
            setMinValue(duration);
          }}
          Duration={minValue}
          onAssendingStepCount={() =>
            setMinValue(minValue > 0 ? minValue - 1 : 0)
          }
          onDessendingStepCount={() =>
            setMinValue(minValue < 180 ? minValue + 1 : 180)
          }
          maximumValue={180}
        />
        <Text
          style={{
            fontSize: textScale(10),
            fontWeight: "400",
            color: colors?.royalOrange,
            marginTop: moderateScale(10),
            marginLeft: moderateScale(5),
          }}
        >
          {isMinError ? minErrMsg : ""}
        </Text>

        <CommonInput
          placeholder={strings.caloriesBurned}
          placeholderTextColor={colors?.SurfCrest}
          mainContainer={{
            borderColor: colors.SurfCrest,
            marginTop: moderateScale(25),
          }}
          maxLength={4}
          value={calories}
          onChangeText={(text: any) => caloriesNum(text)}
          isError={isCaloriesError}
          errorMsg={caloriesErrMsg}
          backGroundColor={colors.SaltBox}
          borderColor={colors.royalOrange}
          isWidth={false}
          inputText={{ color: colors.SurfCrest }}
          keyboardType={"number-pad"}
        />

        <CommonButton
          mainContainer={{
            width: "auto",
            marginTop: moderateScale(30),
          }}
          btnName={strings?.submit}
          onPress={handleSubmit}
        />
        {isLoading && <CommonLoader />}
      </KeyboardAwareScrollView>
      {/* </View> */}
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
    </ScreenWrapper>
  );
};

export default AddSteps;

const styles = StyleSheet.create({
  headerMCon: { marginBottom: moderateScale(15), marginTop: moderateScale(15) },
  headerICon: { backgroundColor: colors?.backIconBg },
});
