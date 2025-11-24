import { BackHandler, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";
import CommonButton from "../../../../components/Buttons/commonButton";
import { strings } from "../../../../constant/strings";

interface Props {
  navigation?: any;
  route?: any;
}
const CategoryQuestionData: React.FC<Props> = ({ navigation, route }) => {
  const { data, codeId, categoryId, headerName }: any = route?.params;
  const dispatch: any = useDispatch();
  const scrollViewRef = useRef<any>(null);
  const [questions, setQuestions] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [renderType, setRenderType] = useState<any>();
  const [questionIdx, setQuestionIdx] = useState(0);
  const [apiParams, setApiParams] = useState<any>({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: "",
    message: "",
  });

  useEffect(() => {
    if (data == undefined && codeId == undefined && categoryId == undefined)
      return;
    setQuestions(addOtherFieldConditionAndAnswer(data));
    console.log(
      "addOtherFieldConditionAndAnswer(data)",
      addOtherFieldConditionAndAnswer(data),
      {
        originalData: data,
        modifiedData: addOtherFieldConditionAndAnswer(data),
      }
    );
    setRenderType(data?.codeName);
    setApiParams({ codeId: codeId, categoryId: categoryId });
  }, [data, codeId, categoryId]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        if (questionIdx > 0) {
          setQuestionIdx((prevIndex) => prevIndex - 1);
          handleScrollUp();
          return true;
        }
        return navigation?.goBack();
      }
    );

    return () => backHandler.remove();
  }, [questionIdx]);
  const handleScrollUp = () => {
    scrollViewRef.current?.scrollToPosition(0, 0, true);
  };

  const saveAndUpdateUserAnswers = (req: any) => {
    setButtonLoading(true);
    try {
      let requestbody = {
        codeId: apiParams?.codeId,
        categoryId: apiParams?.categoryId,
        stepAnswers: req?.renderRequest,
      };

      console.log("requestbody---->>>", requestbody);
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
    } catch (error) {
      setIsLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
    }
  };
  console.log("questions=-=-=-=-=>", questions);
  const renderUI = (uiShow: any) => {
    console.log("uiShow=-=-=-=-=>", uiShow);
    console.log("questions=-=renderUI-=-=111-=>", questions);

    const Component = componentMapping_Lifestyle[uiShow];
    if (Component) {
      return (
        <Component
          questions={questions}
          questionIdx={questionIdx}
          type={renderType}
          isLoading={buttonLoading}
          setQuestionIdx={setQuestionIdx}
          updatedAnswer={(req: any) => saveAndUpdateUserAnswers(req)}
          handleScrollUp={() => handleScrollUp()}
          headerName={headerName}
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
      handleScrollUp();
    } else navigation?.goBack();
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <CommonHeader
        headerName={headerName}
        onBackPress={() => backFunction()}
        iconContainer={{ backgroundColor: colors?.backIconBg }}
        mainContainer={styles.headerMainContainer}
      />
      {!isLoading ? (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          style={styles.mainContainer}
          bounces={false}
          extraScrollHeight={moderateScale(65)}
          ref={scrollViewRef}
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
      {/* <CommonButton
        mainContainer={{
          marginBottom: moderateScale(20),
          width: "auto",
          // position: "absolute",
          marginHorizontal: moderateScale(19),
          marginTop: moderateScale(10),
          // bottom: moderateScale(300),
        }}
      /> */}
    </ScreenWrapper>
  );
};

export default CategoryQuestionData;

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
    alignSelf: "center",
  },
  contentContainer: {
    paddingBottom: moderateScale(20),
  },
});
