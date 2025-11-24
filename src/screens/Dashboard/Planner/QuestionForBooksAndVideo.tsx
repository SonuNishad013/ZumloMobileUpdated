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
import navigationString from "../../../navigation/navigationString";
import HeaderQuestion from "./HeaderQuestion";
import * as AsyncStorage from "../../../utils/Storage/AsyncStorage";
import logger from "../../../constant/logger";
import apiConstant from "../../../constant/apiConstant";
import { ajaxGet } from "../../../config/apiService";
import { STATUS_CODES } from "../../../constant/appConstant";
import CommonLoader from "../../../components/Loader";
import { Enum_NavigateFrom } from "../../../constant/ENUM";
import { useDispatch } from "react-redux";
import onBoardingTypes from "../../../redux/types/onBoardingTypes";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";

interface Props {
  navigation?: any;
  route?: any;
}
const QuestionForBooksAndVideo: React.FC<Props> = ({
  navigation,
  route,
}): ReactElement => {
  const { from, reqData, newString } = route?.params || {};
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  useEffect(() => {
    getGlobalCode();
  }, []);
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
      navigation?.navigate(
        navigationString?.QuestionForBooksAndVideoSecondQuestion,
        { data: data, answers: filterData, from }
      );
    } else {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: strings?.Please_select_atleast_one_option,
      });
    }
  };

  const getGlobalCode = async () => {
    try {
      const getGlobalCodeData = await AsyncStorage.getItem(
        AsyncStorage.GLOBALCODEWITHCATEGORY
      );
      const arrayCodes = JSON.parse(getGlobalCodeData);
      const filterCode = arrayCodes?.filter(
        (item: any) => item?.categoryName == "AIGenerationCategory"
      );
      const filterId = filterCode[0]?.globalCodeOptions?.filter(
        (item: any) => item?.codeName == "IndividualRecommendations"
      );
      logger("filterId__", { filterId, filterCode });
      const codeId = filterId[0]?.globalCodeId;
      GetOnboardingSteps("", codeId);
    } catch (error) {
      logger("Error retrieving login user data:", error);
    }
  };
  const DispatchData = (type: string, payload: any) => {
    dispatch({
      type: type,
      payload: payload,
    });
  };
  const GetOnboardingSteps = (functionName: any, categoryId?: any) => {
    setIsLoading(true);
    DispatchData(onBoardingTypes?.GET_RECOMMENDATION_QUESTION_REQUEST, []);
    const url = apiConstant().GetOnboardingSteps + "?categoryId=" + categoryId;
    return ajaxGet(url, {}, functionName, null)
      .then((resp) => {
        setIsLoading(false);
        if (resp?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          DispatchData(
            onBoardingTypes?.GET_RECOMMENDATION_QUESTION_SUCCESS,
            resp?.data
          );
          setData(resp?.data);
          setList(resp?.data[0]?.stepFields[0]?.stepFieldOptions);
          setCurrentQuestion(resp?.data[0]?.stepName);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("testing_error", err);
        DispatchData(onBoardingTypes?.GET_RECOMMENDATION_QUESTION_FAILURE, []);
      });
  };
  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      <HeaderQuestion
        navigation={navigation}
        title={strings?.Recommendations}
        goBack={() => {
          if (from === Enum_NavigateFrom?.AIGenerated) {
            DispatchData(
              onBoardingTypes?.GET_RECOMMENDATION_QUESTION_REQUEST,
              []
            );
            navigation.navigate(navigationString.SelectActivity, {
              from: from,
              reqData: reqData,
              newString: newString,
            });
          } else {
            DispatchData(
              onBoardingTypes?.GET_RECOMMENDATION_QUESTION_REQUEST,
              []
            );
            navigation.pop(2);
          }
        }}
      />

      {!isLoading ? (
        <>
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
        </>
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

export default QuestionForBooksAndVideo;

const dummyList = [
  {
    id: 1,
    name: "Improve sleep",
    status: false,
  },
  {
    id: 2,
    name: "Build lasting habits",
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
