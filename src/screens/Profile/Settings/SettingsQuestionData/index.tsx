import { BackHandler, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useTransition } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../../components/Loader";
import { componentMapping_Lifestyle } from "../../../../constant/ProfileConstant";
import CommonHeader from "../../../../components/Header/commonHeader";
import allActions from "../../../../redux/actions";
import { addOtherFieldConditionAndAnswer } from "../../../../helper/FormHelpers";
import CustomToast from "../../../../components/Toast";
import * as AsyncStorage from "../../../../utils/Storage/AsyncStorage";
import {
  filterCategoryData,
  getAllGlobalCodesWithCategory,
} from "../../../../helper/getGlobalCodes";
import { useIsFocused } from "@react-navigation/native";
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";
import { strings } from "../../../../constant/strings";
import { capitalizeFirstLetter } from "../../../../validations/capitalizeFirstLetter";

interface Props {
  navigation?: any;
  route?: any;
}
const SettingsQuestionData: React.FC<Props> = ({ navigation, route }) => {
  const { itemData, categoryData }: any = route?.params;
  const dispatch: any = useDispatch();
  const [questions, setQuestions] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [renderType, setRenderType] = useState();
  const [questionIdx, setQuestionIdx] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  console.log("----->>", itemData, "------->", categoryData);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    if (!itemData && !categoryData) return;
    GetUserStepAndOptionsWithAnswers(
      itemData?.globalCodeId,
      categoryData?.categoryId
    );
  }, [itemData, categoryData]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        if (questionIdx > 0) {
          setQuestionIdx((prevIndex) => prevIndex - 1);
          return true;
        }
        return navigation?.goBack();
      }
    );

    return () => backHandler.remove();
  }, [questionIdx]);

  const saveAndUpdateUserAnswers = (req: any) => {
    setButtonLoading(true);

    let requestbody = {
      codeId: itemData?.globalCodeId,
      categoryId: categoryData?.categoryId,
      stepAnswers: req?.renderRequest,
    };
    allActions.seekerDetails
      .SaveAndUpdateUserAnswers(
        dispatch,
        requestbody,
        "SaveAndUpdateUserAnswers"
      )
      .then((response: any) => {
        if ([200, 204]?.includes(response?.statusCode)) {
          setToasterDetails({
            showToast: true,
            code: 1,
            message: response.message,
          });

          setTimeout(() => {
            navigation?.goBack();
            setButtonLoading(false);
          }, 2000);
        } else {
          setButtonLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: response.message,
          });
        }
      })
      .catch((err) => {
        setButtonLoading(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: err.message,
        });
      });
  };

  const GetUserStepAndOptionsWithAnswers = (
    globalCodes: any,
    categoryCode: any
  ) => {
    setIsLoading(true);
    if (globalCodes && categoryCode) {
      let requestbody = {
        codeId: globalCodes,
        categoryId: categoryCode,
      };
      allActions.seekerDetails
        .GetUserStepAndOptionsWithAnswers(
          dispatch,
          requestbody,
          "GetUserStepAndOptionsWithAnswers"
        )
        .then((response: any) => {
          if (response.statusCode == 200) {
            setIsLoading(false);
            // setQuestions(response?.data[0]?.steps);
            setQuestions(addOtherFieldConditionAndAnswer(response?.data[0]));
            setRenderType(response?.data[0]?.codeName);
          } else {
            setIsLoading(false);
            setToasterDetails({
              showToast: true,
              code: 0,
              message: response?.message,
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err?.message,
          });
        });
    } else {
      return;
    }
  };
  // const[a,setA]=useTransition()

  const renderUI = (uiShow: any) => {
    const Component = componentMapping_Lifestyle[uiShow];
    if (Component) {
      return (
        <Component
          questions={questions}
          questionIdx={questionIdx}
          type={renderType}
          isLoading={buttonLoading}
          setQuestionIdx={setQuestionIdx}
          navigation={navigation}
          updatedAnswer={(req: any) => saveAndUpdateUserAnswers(req)}
        />
      );
    }
    return (
      <View style={styles.centeredView}>
        <Text style={styles.unsupportedText}>Questions not supported</Text>
      </View>
    );
  };
  const backFunction = () => {
    if (questionIdx > 0) {
      setQuestionIdx(questionIdx - 1);
    } else navigation?.goBack();
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <CommonHeader
        headerName={capitalizeFirstLetter(itemData?.codeName)}
        onBackPress={() => backFunction()}
        iconContainer={{ backgroundColor: colors?.backIconBg }}
        mainContainer={styles.headerMainContainer}
      />
      {!isLoading ? (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          style={styles.mainContainer}
        >
          {renderUI(renderType)}
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
    </ScreenWrapper>
  );
};

export default SettingsQuestionData;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerMainContainer: {
    paddingBottom: moderateScale(15),
    paddingTop: moderateScale(15),
    paddingHorizontal: moderateScale(19),
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  unsupportedText: {
    fontSize: textScale(24),
    color: colors?.SurfCrest,
  },
  contentContainer: {
    paddingBottom: moderateScale(20),
  },
});
