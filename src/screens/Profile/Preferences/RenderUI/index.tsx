import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import HeaderPreferences from "../Helpers/HeaderPreferences";
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
import {
  componentMapping,
  profileString,
} from "../../../../constant/ProfileConstant";
import {
  addOtherFieldConditionAndAnswer,
  updateOptionsWithSelection,
} from "../Helpers/HelperFun";
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";

interface Props {
  navigation?: any;
  route?: any;
}
const PreferencesRender: React.FC<Props> = ({ navigation, route }) => {
  const { categoryId, globalCodeId, prevData, item }: any = route?.params;
  const dispatch: any = useDispatch();
  const [questions, setQuestions] = useState<any>([]);
  const [parentData, setParentData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<any>(false);
  const [renderType, setRenderType] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const scrollViewRef = useRef<any>(null);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    setIsLoading(true);
    if (categoryId == undefined) return;
    getPreferenceStepsByCodeId(categoryId, globalCodeId);
    getGlobalCode(categoryId);
  }, [categoryId]);

  const getGlobalCode = async (typeId: any) => {
    try {
      const getGlobalCodeData = await AsyncStorage.getItem(
        AsyncStorage.GLOBALCODEWITHCATEGORY
      );
      let getOnboardingGlobalData = await filterCategoryData(
        JSON.parse(getGlobalCodeData),
        categoryName?.Preferences_DailyRoutine_HealthAndWellness
      );
      let getOnboardingGlobalData1 = await filterCategoryData(
        JSON.parse(getGlobalCodeData),
        categoryName?.Preferences_DailyRoutine_TechnologyAndAccessiblity
      );
      const arrayConcat =
        getOnboardingGlobalData?.[0].globalCodeOptions?.concat(
          getOnboardingGlobalData1?.[0].globalCodeOptions
        );
      let getGlobalCodeOptionsData = await filterglobalCodeOptionsDataId(
        arrayConcat,
        typeId
      );
      setRenderType(getGlobalCodeOptionsData[0]?.codeName);
    } catch (error) {
      console.error("Error retrieving login user data:", error);
    }
  };
  const preferenceStepAnswer = (req: any) => {
    setButtonLoading(true);

    let requestbody = req?.renderRequest;
    allActions.seekerDetails
      .PreferenceStepAnswer(dispatch, requestbody, "preferenceStepAnswer")
      .then((response: any) => {
        if (response.statusCode == 200) {
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
  const getPreferenceStepsByCodeId = async (codeID: any, globalCodeId: any) => {
    let data: any = await {
      questionId: codeID,
      globalId: globalCodeId,
    };

    let requestbody = {};
    allActions.seekerDetails
      .GetPreferenceStepsByCodeId(
        dispatch,
        requestbody,
        "getPreferenceStepsByCodeId",
        data
      )
      .then((response: any) => {
        if (response.statusCode == 200) {
          setIsLoading(false);
          setScreen(response.data);
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
  };
  const renderUI = (uiShow: any) => {
    const Component = componentMapping[uiShow];
    if (Component) {
      return (
        <Component
          questions={questions}
          parentObject={parentData}
          isLoading={buttonLoading}
          updatedAnswer={(req: any) => preferenceStepAnswer(req)}
        />
      );
    }

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: textScale(24),
            color: colors?.SurfCrest,
          }}
        >
          Questions not supported
        </Text>
      </View>
    );
  };
  const setScreen = async (allData: any) => {
    let questionsArray = await allData?.filter((allData: any) =>
      allData?.hasOwnProperty(profileString?.parentStepId)
    );
    let questionsObject = await allData?.filter(
      (allData: any) => !allData?.hasOwnProperty(profileString?.parentStepId)
    );
    setQuestions(
      questionsArray.length > 0
        ? updateOptionsWithSelection(
            prevData,
            addOtherFieldConditionAndAnswer(questionsArray)
          )
        : updateOptionsWithSelection(
            prevData,
            addOtherFieldConditionAndAnswer(allData)
          )
    );
    setParentData(questionsObject[0]);
  };
  return (
    console.log("renderType=-=-=>", renderType),
    (
      <ScreenWrapper statusBarColor={colors?.SaltBox}>
        <HeaderPreferences headerName={item} navigation={navigation} />
        {!isLoading ? (
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles?.contentContainer}
            style={styles?.mainContainer}
            extraScrollHeight={65}
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
    )
  );
};

export default PreferencesRender;

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
});
