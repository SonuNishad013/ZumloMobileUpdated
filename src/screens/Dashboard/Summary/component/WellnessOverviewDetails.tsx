import { FunctionComponent, useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import TabSelector from "./tabSelector";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { strings } from "../../../../constant/strings";
import CommonHeader from "../../../../components/Header/commonHeader";
import { styles } from "../../Wellness/styles";
import MultiGoalProgress from "../../Wellness/Overview/MultiGoalProgress";
import allActions from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import { CupIcon } from "../../../../assets";
import navigationString from "../../../../navigation/navigationString";
import GoalsCard from "./goalComponent";
import { transformGoalsFromAPI } from "./Hooks/transformGoalsFromAPI";
import {
  aiProvider,
  discardActivityEnums,
} from "../../../../constant/appConstant";
import CommonLoader from "../../../../components/Loader";
import { getProgressMessage } from "./WellnessNGoalProgressMsg";
import { Enum_SummaryTabFromValue } from "../../../../constant/ENUM";

interface WellnessOverviewDetailsProps {
  navigation: any;
}

const WellnessOverviewDetails: FunctionComponent<
  WellnessOverviewDetailsProps
> = ({ navigation }) => {
  const dispatch = useDispatch();

  const tabMap = { Day: "1", Week: "2", Month: "3", Overall: "4" };
  const [goalProgressData, setGoalProgressData] = useState({
    data: [],
    avgProgress: 0,
    allProgressData: { title: "", description: "" },
  });
  const [yourGolasData, setyourGolasData] = useState([]);
  const [tabSelected, setSelectedTab] = useState("1");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetUserWellnessPlanProgress();
  }, [tabSelected]);

  const GetUserWellnessPlanProgress = async () => {
    const req = new URLSearchParams({
      graphFilter: `${tabSelected}`,
      aiProvider: `${aiProvider.Goals}`,
      category: `${discardActivityEnums.wellness}`,
    }).toString();
    setIsLoading(true);
    try {
      const response =
        await allActions.wellnessProgress.GetUserWellnessPlanProgress(
          dispatch,
          {},
          "GetUserSkippedCategory",
          req
        );
      if (response.statusCode === 200) {
        setIsLoading(false);
        let yourGolasData = transformGoalsFromAPI(response);
        setyourGolasData(yourGolasData);
        console.log("yourGolasData-=-=>", yourGolasData);

        const colors = ["#FFB64D", "#4DB38E", "#553D67", "#A66DD4", "#4DA6FF"]; // Add more if needed
        const goalData = response?.data?.wellnessProgress?.goalProgressOverview;
        const allProgressData =
          response?.data?.wellnessProgress?.progressStatus;
        const data = response?.data?.wellnessProgress?.goalProgressOverview.map(
          (goal, index) => ({
            color: colors[index % colors.length], // Safe dynamic coloring
            progress: goal?.progressSummary?.overallGoalProgressInPercentage,
          })
        );
        const totalProgress = goalData.reduce(
          (sum, goal) =>
            sum + goal?.progressSummary?.overallGoalProgressInPercentage,
          0
        );
        const avgProgress =
          goalData.length > 0 ? totalProgress / goalData.length : 0;
        console.log(data);
        setGoalProgressData({ data, avgProgress, allProgressData });
        console.log(data);

        console.log("-=-=-=avgProgress-=-=-=-=>", avgProgress);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const RenderHeader = () => (
    <View style={styles.headerContainer}>
      <CommonHeader
        onBackPress={() => navigation?.goBack()}
        headerName={strings?.WellnessOverview}
        iconContainer={styles.headerIconContainer}
        textStyle={styles.headerText}
        isBackIcon={true}
        mainContainer={styles.headerMainContainer}
      />
    </View>
  );

  return (
    <ScreenWrapper statusBarColor={colors.prussianBlue}>
      <View
        style={{
          backgroundColor: colors?.polishedPineOP2,
          borderBottomEndRadius: moderateScale(30),
          borderBottomStartRadius: moderateScale(30),
        }}
      >
        <RenderHeader />
      </View>

      <View style={{ flex: 1, backgroundColor: colors.SurfCrest }}>
        <TabSelector
          onChangeTab={(tab) => {
            setyourGolasData([]);
            setGoalProgressData({
              data: [],
              avgProgress: 0,
              allProgressData: { title: "", description: "" },
            });
            const value = tabMap[tab];
            setSelectedTab(value);
          }}
        />
        {isLoading ? (
          <CommonLoader />
        ) : (
          <ScrollView bounces={false}>
            <View
              style={{
                alignItems: "center",
                paddingHorizontal: moderateScale(10),
                gap: moderateScale(10),
                marginTop: moderateScale(20),
              }}
            >
              <Text style={styles?.titleText}>
                {" Tracking your wellness journey"}
              </Text>
              <Text style={styles?.subtitleText}>
                {`See how things are shaping up today. Whether it's a slow day or a strong one—every step adds up.`}
              </Text>
            </View>
            <View
              style={{
                marginTop: 5,
                marginHorizontal: moderateScale(15),
              }}
            >
              <MultiGoalProgress
                progress={goalProgressData?.avgProgress}
                goals={goalProgressData?.data}
                from={Enum_SummaryTabFromValue?.WellnessOverviewDetails}
              />
              <View
                style={{
                  marginVertical: moderateScale(5),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: moderateScale(5),
                  }}
                >
                  <CupIcon />
                  <Text
                    style={{
                      fontSize: textScale(14),
                      fontWeight: "600",
                      marginHorizontal: moderateScale(10),
                      color: colors.prussianBlue,
                    }}
                  >
                    {getProgressMessage(goalProgressData?.avgProgress)?.title}
                  </Text>
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.prussianBlue,
                    marginTop: moderateScale(10),
                  }}
                >
                  {getProgressMessage(goalProgressData?.avgProgress)?.message}
                </Text>
              </View>
            </View>
            {yourGolasData?.length > 0 && (
              <GoalsCard
                goalData={yourGolasData}
                onGoalCard={(id: any, goal: any) => {
                  console.log("id-=-=-=-=->", id, goal);
                  navigation.navigate(navigationString.Goaloverview, {
                    id: id,
                    data: goal?.activityProgressDetails,
                  });
                }}
              />
            )}
          </ScrollView>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default WellnessOverviewDetails;
