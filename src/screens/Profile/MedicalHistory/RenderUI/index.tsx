import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import allActions from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import * as AsyncStorage from "../../../../utils/Storage/AsyncStorage";
import { categoryName } from "../../../../constant/AllGlobalNameConstant";
import {
  filterCategoryData,
  filterglobalCodeOptionsDataId,
} from "../../../../helper/getGlobalCodes";
import CommonLoader from "../../../../components/Loader";
import { componentMapping_MedicalHistory } from "../../../../constant/ProfileConstant";
import HeaderHealthInfo from "../Helpers/HeaderHealthInfo";
import {
  addOtherFieldConditionAndAnswer,
  updateOptionsWithSelection,
} from "../Helpers/HelperFun";
import CommonAlert from "../../../../components/CommonAlert/CommonAlert";
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";
import logger from "../../../../constant/logger";
import { strings } from "../../../../constant/strings";
import { STATUS_CODES, TOAST_STATUS } from "../../../../constant/appConstant";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";

interface Props {
  navigation?: any;
  route?: any;
}
const MedicalHistoryRenders: React.FC<Props> = ({ navigation, route }) => {
  const { categoryId, globalCodeId, prevData, item, previousId }: any =
    route?.params;
  const dispatch: any = useDispatch();
  const [questions, setQuestions] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [renderType, setRenderType] = useState();
  const [isAlert, setIsAlert] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    setIsLoading(true);
    if (categoryId == undefined) return;
    getMedicalHistoryStepsByCodeId(categoryId, globalCodeId);
    getGlobalCode(categoryId);
  }, [categoryId]);

  const getGlobalCode = async (typeId: any) => {
    try {
      const getGlobalCodeData = await AsyncStorage.getItem(
        AsyncStorage.GLOBALCODEWITHCATEGORY
      );
      let getMedicalHistoryData1 = await filterCategoryData(
        JSON.parse(getGlobalCodeData),
        categoryName?.HealthInformation_PhysicalHealth
      );
      let getMedicalHistoryData2 = await filterCategoryData(
        JSON.parse(getGlobalCodeData),
        categoryName?.HealthInformation_MentalHealhtHistory
      );
      let getMedicalHistoryData3 = await filterCategoryData(
        JSON.parse(getGlobalCodeData),
        categoryName?.HealthInformation_MedicationAndTreatment
      );
      let getMedicalHistoryData4 = await filterCategoryData(
        JSON.parse(getGlobalCodeData),
        categoryName?.HealthInformation_EmotionalAndPsychologicalProfile
      );
      let getMedicalHistoryData5 = await filterCategoryData(
        JSON.parse(getGlobalCodeData),
        categoryName?.HealthInformation_SymptomTracking
      );
      const arrayConcat = getMedicalHistoryData1?.[0].globalCodeOptions?.concat(
        getMedicalHistoryData2?.[0].globalCodeOptions,
        getMedicalHistoryData3?.[0].globalCodeOptions,
        getMedicalHistoryData4?.[0].globalCodeOptions,
        getMedicalHistoryData5?.[0].globalCodeOptions
      );
      let getGlobalCodeOptionsData = await filterglobalCodeOptionsDataId(
        arrayConcat,
        typeId
      );
      setRenderType(getGlobalCodeOptionsData[0]?.codeName);
    } catch (error) {
      logger(strings?.Error_retrieving_login_user_data, error);
    }
  };

  const medicalHistoryStepAnswer = (req: any) => {
    setButtonLoading(true);
    if (req?.renderRequest?.length == 0) {
      setToasterDetails({
        showToast: true,
        code: TOAST_STATUS?.ERROR,
        message: "Select at least one answer",
      });
      setButtonLoading(false);
      return;
    }

    let requestbody = {
      groupOrderId: !previousId ? 0 : previousId,
      medicalHistoryRequests: req?.renderRequest,
    };
    allActions.seekerDetails
      .MedicalHistoryStepAnswer(
        dispatch,
        requestbody,
        API_FUN_NAMES?.MedicalHistoryStepAnswer
      )
      .then((response: any) => {
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setButtonLoading(true);
          setToasterDetails({
            showToast: true,
            code: TOAST_STATUS?.SUCCESS,
            message: response.message,
          });
          setTimeout(() => {
            navigation?.goBack();
          }, 1000);
        } else {
          setButtonLoading(true);
          setToasterDetails({
            showToast: true,
            code: TOAST_STATUS?.ERROR,
            message: response.message,
          });
        }
      })
      .catch((err) => {
        setButtonLoading(true);
        setToasterDetails({
          showToast: true,
          code: TOAST_STATUS?.ERROR,
          message: err.message,
        });
      });
  };

  const getMedicalHistoryStepsByCodeId = async (
    codeID: any,
    globalCodeId: any
  ) => {
    let data: any = await {
      questionId: codeID,
      globalId: globalCodeId,
    };

    let requestbody = {};
    allActions.seekerDetails
      .GetMedicalHistoryStepsByCodeId(
        dispatch,
        requestbody,
        API_FUN_NAMES?.GetMedicalHistoryStepsByCodeId,
        data
      )
      .then((response: any) => {
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setIsLoading(false);
          setScreen(response.data);
        } else {
          setIsLoading(false);
          setToasterDetails({
            showToast: true,
            code: TOAST_STATUS?.ERROR,
            message: response?.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setToasterDetails({
          showToast: true,
          code: TOAST_STATUS?.ERROR,
          message: err?.message,
        });
      });
  };
  const renderUI = (uiShow: any) => {
    const Component = componentMapping_MedicalHistory[uiShow];
    if (Component) {
      return (
        <Component
          questions={questions}
          isLoading={buttonLoading}
          updatedAnswer={(req: any) => medicalHistoryStepAnswer(req)}
        />
      );
    }

    return (
      <View style={styles?.noSupportContainer}>
        <Text style={styles?.noSupportText}>
          {strings?.Questions_not_supported}
        </Text>
      </View>
    );
  };
  const setScreen = async (allData: any) => {
    setQuestions(
      updateOptionsWithSelection(
        prevData,
        addOtherFieldConditionAndAnswer(allData)
      )
    );
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <HeaderHealthInfo headerName={item} navigation={navigation} />
      {!isLoading ? (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles?.contentContainer}
          style={styles?.mainContainer}
          extraHeight={100}
        >
          {renderUI(renderType)}
        </KeyboardAwareScrollView>
      ) : (
        <>{isLoading && <CommonLoader />}</>
      )}
      <CommonAlert
        isVisible={isAlert}
        alertMessage={strings?.Select_at_least_one_answer}
        alertLeftButtonText={strings?.OK}
        hideAlert={() => setIsAlert(false)}
        alertLeftButtonOnPress={() => setIsAlert(false)}
      />
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

export default MedicalHistoryRenders;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerText: {
    color: colors?.SurfCrest,
    fontSize: textScale(24),
    fontWeight: "500",
    marginTop: moderateScale(15),
    marginHorizontal: moderateScale(19),
  },
  contentContainer: {
    paddingBottom: moderateScale(30),
  },

  noSupportContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noSupportText: {
    fontSize: textScale(24),
    color: colors?.SurfCrest,
  },
});
