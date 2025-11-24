import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import { height, moderateScale } from "../../../constant/responsiveStyle";
import CommonInput from "../../../components/Inputs/commonInput";
import { strings } from "../../../constant/strings";
import BtmBtn from "../../UserGoals/zUserGoalscomponents/BtmBtn";
import Header from "../../UserGoals/zUserGoalscomponents/Header";
import navigationString from "../../../navigation/navigationString";
import EmoText from "./EmoText";
import * as AsyncStorage from "../../../utils/Storage/AsyncStorage";
import allActions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CommonLoader from "../../../components/Loader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import {
  getBuySubscriptionDetail,
  getSeekerInfoRedux,
} from "../../../redux/selector";
import { subscriptionFun } from "../../../constant/SubscriptionPlanValidation";
import { SUBSCRIPTION_NAVIGATION_FROM } from "../../../constant/ENUM";
import UpgradeModal from "../../SubscriptionPlan/UpgradeModal";
import { IAP_Strings } from "../../SubscriptionPlan/IAP_Strings";
import { textLabelSize } from "../../../utils/TextConfig";
var subscriptionStatus: any = false;

interface Props {
  navigation?: any;
  route?: any;
}
const MoodTrackInput: React.FC<Props> = ({ navigation, route }) => {
  const subscriptionDetail = useSelector(getBuySubscriptionDetail());
  const getseekerInfoRedux = useSelector(getSeekerInfoRedux());
  const dispatch = useDispatch();
  const { selectedOption, childData, parentData, onSwiperClick } =
    route?.params;
  const { DeviceID } = route?.params?.socketDetails;

  const [inputData, setInputData] = useState<any>({
    title: "",
    description: "",
    titleError: false,
    descriptionError: false,
    desErrorText: "",
    titleErrorText: "",
    showErrorText: false,
  });

  const desMaxLen = 150;
  const [filledWords, setFilledWords] = useState(0);
  const [userData_, setUserData_] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const init = async () => {
      subscriptionStatus = await subscriptionFun(
        subscriptionDetail,
        getseekerInfoRedux
      );
    };
    init();
  }, [subscriptionDetail]);

  useEffect(() => {
    isUserLoginToken();
  }, []);

  const isUserLoginToken = async () => {
    try {
      const loginUserData_ = await AsyncStorage.getItem(
        AsyncStorage.LOGIN_USER_DATA
      );
      console.log("loginUserData_", loginUserData_);

      // If loginUserData_ is not null, parse and set userData_
      if (loginUserData_ !== null) {
        setUserData_(JSON.parse(loginUserData_));
      }
    } catch (error) {
      console.error("Error retrieving login user data:", error);
    }
  };

  const dataInput = (val: any) => {
    setInputData({
      ...inputData,
      description: val,
      descriptionError: false,
      showErrorText: false,
    });
    setFilledWords(val.length);
    if (val.length > desMaxLen) {
      setInputData({
        ...inputData,
        description: val,
        descriptionError: true,
        desErrorText: "Max words",
        showErrorText: true,
      });
    }
  };
  const renderInputField = (item: any) => {
    switch (item?.item?.stepName) {
      case "Description":
        return (
          <CommonInput
            placeholderTextColor={colors?.grey}
            placeholder={"What's on your mind?"}
            textAlignVertical={"top"}
            // wordCount={true}
            multiline={true}
            // writeWords={filledWords}
            // maxWords={desMaxLen}
            // writeWordsStyle={{
            //   color: colors?.SurfCrest,
            //   fontSize: textLabelSize?.subtTitleFont,
            // }}
            isWidth={false}
            mainContainer={{
              height: (height * 55) / 100,
              borderColor: colors?.royalOrange,
              marginTop: moderateScale(25),
              // marginTop: moderateScale(55),
            }}
            inputText={{
              height: (height * 55) / 105,
              color: colors?.SurfCrest,
              marginTop: moderateScale(10),
            }}
            value={inputData?.description}
            onChangeText={(val: any) => dataInput(val)}
            errorMsg={inputData?.desErrorText}
            // isError={inputData?.showErrorText}
            backGroundColor={colors?.prussianBlue}
            borderColor={colors?.royalOrangeDark}
          />
        );
      default:
        return <View>{/* <Text>No Data to Show</Text> */}</View>;
    }
  };
  const renderItems = (item: any) => {
    return (
      <View style={style?.inputFieldContainer}>{renderInputField(item)}</View>
    );
  };

  const validateData = async (isSkip: boolean) => {
    // moodTrackingAPI(isSkip);
    if (subscriptionStatus) {
      moodTrackingAPI(isSkip);
    } else {
      setShowModal(true);
    }
  };

  const moodTrackingAPI = async (isSkip: boolean) => {
    // Validate input only if not skipped
    if (!isSkip) {
      if (!inputData?.description?.trim()) {
        setInputData((prev: any) => ({
          ...prev,
          descriptionError: true,
          desErrorText:
            "Please share your thoughts or tap `Maybe Later` to skip for now.",
          showErrorText: true,
        }));
        return;
      }

      if (inputData?.showErrorText) return;
    }

    setLoading(true);

    try {
      const requestBody = {
        moodTrackingStepId: parentData?.moodTrackingStepId,
        moodTrackingStepOptionId: selectedOption?.moodTrackingStepOptionId,
        title: null,
        description: isSkip ? null : inputData?.description,
        userId: userData_?.userId ?? 0,
        deviceId: DeviceID,
      };

      const response =
        await allActions.dashboardAction.SaveMoodTrackingQuestion(
          dispatch,
          requestBody,
          "SaveMoodTrackingQuestion"
        );

      const isSuccess = response?.statusCode === 200;

      if (isSuccess) {
        navigation?.navigate(navigationString?.TrackHistory, {
          type: strings?.moodTracking_,
          onSwiperClick,
          other: route?.params?.other,
        });

        setToasterDetails({
          showToast: true,
          code: 1,
          message: response?.message,
        });

        setTimeout(() => {
          setInputData({
            title: "",
            description: "",
            titleError: false,
            descriptionError: false,
            desErrorText: "",
            titleErrorText: "",
            showErrorText: false,
          });
        }, 1000);
      } else {
        setToasterDetails({
          showToast: true,
          code: 0,
          message: response?.message,
        });
      }
    } catch (error: any) {
      console.error("Error while saving:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <>
        <Header
          navigation={navigation}
          headerName={"Mood Tracking"}
          headerContainer={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 10,
          }}
          isSkip={!loading}
          onSkip={() => validateData(true)}
        />
        {!loading ? (
          <KeyboardAwareScrollView>
            <FlatList
              data={childData}
              keyExtractor={(item, index) => "key" + index}
              renderItem={renderItems}
              contentContainerStyle={{ paddingBottom: moderateScale(30) }}
              ListHeaderComponent={<EmoText data={selectedOption} />}
              ListFooterComponent={
                <BtmBtn
                  btnViewStyle={style?.btnBtnContainer}
                  btnName={"Share now"}
                  onPress={() => validateData(false)}
                />
              }
            />
          </KeyboardAwareScrollView>
        ) : (
          <CommonLoader />
        )}
        {toasterDetails?.showToast && (
          <ToastApiResponse
            data={toasterDetails}
            setToasterDetails={setToasterDetails}
            code={toasterDetails?.code}
            message={toasterDetails?.message}
          />
        )}
      </>
      <UpgradeModal
        navigation={navigation}
        visible={showModal}
        setShowModal={setShowModal}
        fromScreen={SUBSCRIPTION_NAVIGATION_FROM?.DASHBOARD}
        isPlanner={false}
        title={IAP_Strings?.mood_tracking_title}
        description={IAP_Strings?.mood_tracking_desc}
      />
    </ScreenWrapper>
  );
};

export default MoodTrackInput;

const style = StyleSheet.create({
  inputFieldContainer: {
    marginHorizontal: moderateScale(19),
  },
  btnBtnContainer: {
    position: "relative",
    bottom: moderateScale(0),
    marginTop: moderateScale(30),
  },
});
