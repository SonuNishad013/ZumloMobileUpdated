import { StyleSheet, View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import IndepenedentGoalsList from "../../../../components/DashboardHelperComponent/IndepenedentGoalsList";
import { useDispatch } from "react-redux";
import allActions from "../../../../redux/actions";
import CommonLoader from "../../../../components/Loader";
import CommonHeader from "../../../../components/Header/commonHeader";
import { formatSentenceCase } from "../../../../helper/sentenceCase";
import {
  height,
  moderateScale,
  width,
} from "../../../../constant/responsiveStyle";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../../../constant/appConstant";
import { strings } from "../../../../constant/strings";
import { dashboardClickENUM } from "../../../../constant/ENUM";
import { useFocusEffect } from "@react-navigation/native";
interface Props {
  navigation?: any;
}
const IndependentGoalsScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [usersIndependentGoals, setUsersIndependentGoals] = useState<any[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useFocusEffect(
    useCallback(() => {
      GetUserIndividualGoalsList_API();
    }, [])
  );

  const GetUserIndividualGoalsList_API = async () => {
    setIsLoading(true);
    try {
      const response =
        await allActions.dashboardAction.GetUserIndividualGoalsList(
          dispatch,
          {},
          API_FUN_NAMES?.GetUserIndividualGoalsList
        );

      if (response.statusCode === STATUS_CODES?.RESPONSE_OK) {
        if (!!response && Array.isArray(response.data)) {
          setUsersIndependentGoals(response?.data);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        return Promise.resolve(response);
      }
    } catch (error: any) {
      setIsLoading(false);
      return Promise.reject(new Error(error));
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors.SurfCrest}>
      <View style={styles?.container}>
        <CommonHeader
          headerName={formatSentenceCase(strings?.Your_goals)}
          onBackPress={() => navigation?.goBack()}
          iconContainer={styles.iconContainer}
          mainContainer={styles.mainContainer}
          textStyle={styles?.headerText}
        />
        {isLoading ? (
          <View style={styles?.loderView}>
            <CommonLoader />
          </View>
        ) : (
          <IndepenedentGoalsList
            data={usersIndependentGoals}
            navigation={navigation}
            from={dashboardClickENUM?.Dashboard}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default IndependentGoalsScreen;

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: colors?.backIconBg,
  },
  mainContainer: {
    paddingBottom: moderateScale(15),
    paddingTop: moderateScale(15),
  },
  container: {
    flex: 1,
    backgroundColor: colors.SurfCrest,
    paddingHorizontal: moderateScale(19),
    marginBottom: moderateScale(50),
  },
  headerText: {
    color: colors?.prussianBlue,
    fontSize: moderateScale(16),
  },
  loderView: {
    height: height * 0.78,
    width: width,
    zIndex: 999,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
