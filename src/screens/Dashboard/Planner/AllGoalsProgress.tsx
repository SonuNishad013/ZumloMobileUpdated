import { StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import _ from "underscore";
import CommonGoalsGraph from "../../../components/CustomGraphs/CommonGoalsGraph";
import { ReactElement, useEffect, useState } from "react";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import moment from "moment";

import { moderateScale } from "../../../constant/responsiveStyle";
import CommonHeader from "../../../components/Header/commonHeader";
import { DATE_FORMAT } from "../../../constant/DateFormats";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../../constant/appConstant";
import { strings } from "../../../constant/strings";

interface Props {
  route?: any;
  navigation?: any;
}

const AllGoalsProgress: React.FC<Props> = ({
  route,
  navigation,
}): ReactElement => {
  const [GoalsData, setGoalsData] = useState<any>({
    GoalsData: {},
    isDataAvailable: false,
    isWeeklySelected: true,
  });
  const [isFilterDropDwonSelected, setisFilterDropDwonSelected] =
    useState(false);
  const [isLoading1, setisLoading1] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    GetGoalsGraphDataByDate(true);
  }, []);
  const GetGoalsGraphDataByDate = async (isWeeklySelected: boolean) => {
    let GoalsTimePeriod = isWeeklySelected ? 1 : 2;
    let todayDate = await new Date();
    setisLoading1(true);
    let data = `${
      "?targetDate=" +
      `${moment(todayDate).format(DATE_FORMAT?.format_year_month_date)}` +
      "&GoalsTimePeriod=" +
      `${GoalsTimePeriod}`
    }`;
    try {
      let requestbody;
      await allActions.dashboardAction
        .GetGoalsGraphDataByDate(
          dispatch,
          requestbody,
          API_FUN_NAMES?.GetGoalsGraphDataByDate,
          data
        )
        .then((response: any) => {
          if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
            setisFilterDropDwonSelected(false);
            setGoalsData({
              GoalsData: response?.data,
              isDataAvailable: hasProgressGreaterThanZero(
                response?.data?.goalsGraphDto
              ),
              isWeeklySelected: isWeeklySelected,
            });
          }
          setisLoading1(false);
        })
        .catch((err) => {});
    } catch (error) {
      setisLoading1(false);
    }
  };
  const hasProgressGreaterThanZero = (data_: any) => {
    return data_.some((goal: any) =>
      goal.goalsProgressData.some(
        (progressData: any) => progressData.progress > 0
      )
    );
  };
  const onhandleperiod = (state: any) => {
    setGoalsData((prevState: any) => ({
      ...prevState,
      isWeeklySelected: state === strings?.Week,
    }));
    setisFilterDropDwonSelected(true);
  };

  return (
    <ScreenWrapper statusBarColor={colors.prussianBlue}>
      <CommonHeader
        headerName={strings?.All_goals}
        mainContainer={styles?.buttonView}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles?.mainView}>
        {!_.isEmpty(GoalsData?.GoalsData) && (
          <View style={styles?.marginHorizontalSet}>
            <CommonGoalsGraph
              data_={GoalsData?.GoalsData.goalsGraphDto}
              selectableList={[strings?.Week, strings?.Month]}
              setSelectedTimePeriod={(data: any) => onhandleperiod(data)}
              isWeeklySelected={GoalsData?.isWeeklySelected}
            />
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default AllGoalsProgress;

const styles = StyleSheet.create({
  buttonView: {
    marginHorizontal: moderateScale(15),
  },
  mainView: {
    backgroundColor: colors?.prussianBlue,
    flex: 1,
  },
  marginHorizontalSet: {
    marginHorizontal: moderateScale(15),
  },
});
