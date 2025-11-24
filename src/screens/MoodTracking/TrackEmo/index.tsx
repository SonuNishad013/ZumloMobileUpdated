import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import LinearGradient from "react-native-linear-gradient";
import colors from "../../../constant/colors";
import { height, moderateScale } from "../../../constant/responsiveStyle";
import UserMood from "./UserMood";
import BtmbtnRound from "./BtmbtnRound";
import HeaderTrackMood from "./HeaderTrackMood";
import navigationString from "../../../navigation/navigationString";
import { useDispatch } from "react-redux";
import allActions from "../../../redux/actions";

import CommonLoader from "../../../components/Loader";
import { strings } from "../../../constant/strings";

interface Props {
  navigation?: any;
  route?: any;
}
const TrackEmo: React.FC<Props> = ({ navigation, route }) => {
  console.log("routes in TrackEmo", route);
  const [moodTxt, setMoodTxt] = useState<any>("");
  const [questionsData, setQuestionsData] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<any>();
  const { DeviceID } = route?.params?.socketDetails;

  let AllQuestions =
    questionsData?.length !== 0
      ? questionsData.filter((item: any) => item.parentId == 0)
      : [];

  let childData =
    questionsData?.length !== 0
      ? questionsData.filter(
          (item: any) => item?.parentId == AllQuestions[0]?.moodTrackingStepId
        )
      : [];

  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getMoodTrackingQuestion();
  }, []);

  const getMoodTrackingQuestion = async () => {
    setLoading(true);
    try {
      let requestbody = {};
      await allActions.dashboardAction
        .GetMoodTrackingQuestion(
          dispatch,
          requestbody,
          "GetMoodTrackingQuestion"
        )
        .then((response: any) => {
          setLoading(false);
          if (response.statusCode == 200) {
            setQuestionsData(response?.data);
            setSelectedOption(response?.data[0]?.moodTrackingStepOptions[0]);
          } else {
          }
        })
        .catch((err) => {});
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.statusBarColorMoodScreen}>
      <LinearGradient
        colors={colors?.backgroundColorEmojiScreen}
        style={{ height: height }}
      >
        <View style={style?.container}>
          <HeaderTrackMood
            route={route}
            navigation={navigation}
            onSwiper={route?.params?.onSwiperClick}
            onViewHistory={() => {
              navigation.navigate(navigationString.TrackHistory, {
                isGoback: true,
                type: strings?.moodTracking_,
                other: route?.params,
                isViewHistoryClicked: true,
              });
            }}
          />
          {!loading ? (
            <FlatList
              data={["1"]}
              keyExtractor={(item, index) => "key" + index}
              renderItem={() => (
                <View style={style?.flatlistContainer}>
                  <UserMood
                    userMood={(val: any) => setMoodTxt(val)}
                    data={AllQuestions[0]}
                    selectedOption={(val: any) => setSelectedOption(val)}
                  />
                  <BtmbtnRound
                    onPress={() =>
                      navigation?.navigate(navigationString?.MoodTrackInput, {
                        item: moodTxt,
                        allQues: questionsData,
                        childData: childData,
                        selectedOption: selectedOption,
                        parentData: AllQuestions[0],
                        onSwiperClick: route?.params?.onSwiperClick,
                        other: route?.params,
                        from: "Dashbaord",
                        socketDetails: {
                          DeviceID: DeviceID,
                        },
                      })
                    }
                  />
                </View>
              )}
            />
          ) : (
            <CommonLoader />
          )}
        </View>
      </LinearGradient>
    </ScreenWrapper>
  );
};

export default TrackEmo;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistContainer: {
    marginTop: moderateScale(80),
  },
});
