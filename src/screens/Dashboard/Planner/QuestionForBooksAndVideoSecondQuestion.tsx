import React, { ReactElement, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";
import HeaderQuestion from "./HeaderQuestion";
import { aiProvider, STATUS_CODES } from "../../../constant/appConstant";
import { findValueByKey } from "../Summary/component/Hooks/transformGoalsFromAPI";
import navigationString from "../../../navigation/navigationString";
import {
  dashboardClickENUM,
  GlobalCategoryName,
  GlobalCodeName,
} from "../../../constant/ENUM";
import allActions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import * as AsyncStorage from "../../../utils/Storage/AsyncStorage";
import { getGlobalCodeOptionsId } from "../../../helper/getGlobalCodes";
import logger from "../../../constant/logger";
import CommonLoader from "../../../components/Loader";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";

interface Props {
  navigation?: any;
  route?: any;
}
const QuestionForBooksAndVideoSecondQuestion: React.FC<Props> = ({
  navigation,
  route,
}): ReactElement => {
  const { data, from } = route?.params;
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState<any>("");
  const [list, setList] = useState(dummyList);
  const [isLoader, setIsLoader] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    setCurrentQuestion(data[1]?.stepName);
    setList(data[1]?.stepFields[0]?.stepFieldOptions);
  }, [data]);

  const clickAction = (item: any, index: any) => {
    const arr = [...list];
    arr[index].status = !item.status;
    setList(arr);
  };
  const renderItems = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        onPress={() => clickAction(item, index)}
        style={item?.status ? styles.boxViewSelected : styles.boxView}
      >
        <Text style={styles?.boxText}>{item?.title}</Text>
      </TouchableOpacity>
    );
  };
  const nextClick = () => {
    const filterData = list.filter((item: any) => item?.status === true);
    if (filterData?.length) {
      const result: any[] = extractValidOptions(data);
      getAIResp(result);
    } else {
      // Alert?.alert("Error", strings?.Please_select_atleast_one_option);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: strings?.Please_select_atleast_one_option,
      });
    }
  };
  function extractValidOptions(rawData: any[]) {
    const result: {
      stepId: number;
      optionId: number;
      fieldId: number;
      isSkip: boolean;
    }[] = [];

    rawData.forEach((step) => {
      const stepId = step.stepID;

      step.stepFields?.forEach((field: any) => {
        const fieldId = field.fieldID;

        field.stepFieldOptions?.forEach((option: any) => {
          if (option.status === true) {
            result.push({
              stepId,
              optionId: option.optionID,
              fieldId,
              isSkip: false,
            });
          }
        });
      });
    });
    const map = new Map<
      string,
      { stepId: number; fieldId: number; optionId: number[]; isSkip: boolean }
    >();

    result.forEach((item: any) => {
      const key = `${item.stepId}_${item.fieldId}`;
      if (!map.has(key)) {
        map.set(key, {
          stepId: item.stepId,
          fieldId: item.fieldId,
          optionId: [item.optionId],
          isSkip: item.isSkip,
        });
      } else {
        map.get(key)!.optionId.push(item.optionId);
      }
    });

    return Array.from(map.values());
  }

  const getAIResp = async (result: any[]) => {
    setIsLoader(true);
    const getGlobalCodeData = await AsyncStorage.getItem(
      AsyncStorage.GLOBALCODEWITHCATEGORY
    );

    const catID = await getGlobalCodeOptionsId(
      JSON.parse(getGlobalCodeData),
      GlobalCategoryName.AIGenerationCategory,
      GlobalCodeName?.Recommendations
    );

    try {
      if (catID) {
        const requestBody = {
          categoryId: catID?.globalCodeId,
          linkRequired: false,
          aiProvider: aiProvider?.Goals,
          aspNetUserId: null,
          isCategorySelected: true,
          stepOption: result,
        };

        const response =
          await allActions.seekerDetails.GenerateRecommendationItems(
            dispatch,
            requestBody,
            API_FUN_NAMES?.GenerateRecommendationItems
          );
        if (response) {
          setIsLoader(false);
        }
        if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
          if (
            response?.data?.responseType.toLowerCase() ===
            strings.Recommendations.toLowerCase()
          ) {
            const isRecommendationsDataAvailable: any[] = findValueByKey(
              response,
              "recommendations"
            );
            if (
              Array.isArray(isRecommendationsDataAvailable) &&
              isRecommendationsDataAvailable?.length
            ) {
              navigation?.navigate(
                navigationString?.GeneratedRecommendationsAI,
                {
                  recommendationsData: response?.data,
                  from: from || dashboardClickENUM?.Dashbaord,
                }
              );
            } else {
              setToasterDetails({
                showToast: true,
                code: 0,
                message:
                  "Oops! Something went wrong connecting to the server. Please try again in a moment.",
              });
            }
          }
        }
      }
    } catch (error: any) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message:
          "Oops! Something went wrong connecting to the server. Please try again in a moment.",
      });
      setIsLoader(false);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      <HeaderQuestion
        navigation={navigation}
        title={strings?.Recommendations}
        goBack={() => navigation.goBack()}
      />
      <View style={styles?.container}>
        <Text style={styles?.titleStyle}>{currentQuestion}</Text>
        <Text style={styles?.subtitle}>{strings?.Select_at_least_one}</Text>
        <FlatList
          data={list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
          style={{ marginTop: moderateScale(20) }}
        />
      </View>

      <TouchableOpacity
        style={styles?.footerButtonStyle}
        onPress={() => nextClick()}
      >
        <Text style={styles?.footerText}>{strings?.Next}</Text>
      </TouchableOpacity>
      {isLoader && <CommonLoader />}
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

export default QuestionForBooksAndVideoSecondQuestion;

const dummyList = [
  {
    id: 1,
    name: "Improve sleep - 2",
    status: false,
  },
  {
    id: 2,
    name: "Build lasting habits - 2",
    status: false,
  },
  {
    id: 3,
    name: "Enhance fitness",
    status: false,
  },
  {
    id: 4,
    name: "Reduce stress",
    status: false,
  },
  {
    id: 5,
    name: "Eat healthier",
    status: false,
  },
];
const strings = {
  Recommendations: "Recommendations",
  Your_Current_Focus_Goals: "Your Current Focus & Goals",
  Which_of_these_best_description:
    "Which of these best description what you most want right now?",
  Next: "Next",
  Please_select_atleast_one_option: "Please select atleast one option",
  Select_at_least_one: "Select at least one",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  titleStyle: {
    fontSize: moderateScale(26),
    fontWeight: "500",
    color: colors?.SurfCrest,
  },
  subtitle: {
    fontSize: moderateScale(16),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginTop: moderateScale(10),
  },
  boxView: {
    borderWidth: moderateScale(1),
    borderColor: colors?.SurfCrest,
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(16),
    paddingLeft: moderateScale(15),
    marginTop: moderateScale(13),
    backgroundColor: colors?.transparent,
  },
  boxViewSelected: {
    borderWidth: moderateScale(1),
    borderColor: colors?.SurfCrest,
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(16),
    paddingLeft: moderateScale(15),
    marginTop: moderateScale(13),
    backgroundColor: colors?.polishedPine,
  },
  boxText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "400",
  },
  footerButtonStyle: {
    marginBottom: moderateScale(60),
    backgroundColor: colors?.polishedPine,
    marginHorizontal: moderateScale(20),
    alignItems: "center",
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(30),
  },
  footerText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "500",
  },
});
