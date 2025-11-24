import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../constant/colors";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import MusicPlayButton from "../../components/OnBoardiingComponents/MusicPlayButton";
import { strings } from "../../constant/strings";
import CommonHeader from "../../components/Header/commonHeader";
import { styles } from "../../screens/OnBoarding/AIGeneration/CommonScreen/AllRecommendationList/style";
import {
  moderateScale,
  textScale,
  width,
} from "../../constant/responsiveStyle";
import VideoPlayer from "../../components/Player";
import { getVideoID } from "../../helper/getVideoID";
import * as AsyncStorageUtils from "../../utils/Storage/AsyncStorage";
import { event } from "../../navigation/emitter";
import allActions from "../../redux/actions";
import appConstant, { STATUS_CODES } from "../../constant/appConstant";
import ToastApiResponse from "../../components/Toast/ToastApiResponse";
import { findValueByKey } from "../Dashboard/Summary/component/Hooks/transformGoalsFromAPI";
import { parseDurationToMinutesString } from "../OnBoarding/AIGeneration/CommonScreen/AllRecommendationList";
import CommonLoader from "../../components/Loader";
import logger from "../../constant/logger";

interface Props {
  navigation?: any;
  route?: any;
}
interface StrinProps {
  [key: string]: string;
}
const STRINGS: StrinProps = {
  headerName: "Your breathing practice",
  quickReset: "Quick reset: just breathe ",
  meditationDescription:
    "This 5-minute guided meditation is designed to calm your mind and ground your body — press play when you’re ready. ",
  yourResources: "Your resources",
  iDidThis: "I did this",
};
const ExplorerActivityPreferences: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { data, from, userData } = route?.params;
  const [recommendationsData, setrecommendationsData] = useState(
    data?.recommendations?.[0]?.items
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayerVisible, setPlayerVisible] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState("");
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  logger("data_______", data);
  const closePlayer = () => {
    setPlayerVisible(false);
    setCurrentVideoId("");
  };
  useEffect(() => {
    setrecommendationsData(data?.recommendations?.[0]?.items);
  }, []);

  const onVideoClick = (item: any, url: any) => {
    setCurrentVideoId(getVideoID(url));
    setPlayerVisible(true);
  };

  const onYesIDidThisPress = async () => {
    setIsLoading(true);

    try {
      let req = {
        userId: userData?.userId !== undefined ? userData?.userId : 0,
        strategyTypeId: appConstant.explorer_planner_type.explorer,
      };
      const response = await allActions.OnBoarding.SaveSeekerPlannerExplorerId(
        "dispatch",
        req,
        "saveQuestion"
      );
      if (response) {
        setIsLoading(false);
        if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
          await AsyncStorageUtils.storeItemKey(
            AsyncStorageUtils.ISPLANNER_USER,
            JSON.stringify({
              isPlanner: false,
              isSelected: true,
            })
          );
          event.emit(strings.login_);
        }
      }
    } catch (error) {
      setIsLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: strings?.somethingWrong,
      });
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.darkPrussianBlue}>
      <View
        style={{
          marginHorizontal: moderateScale(15),
        }}
      >
        <CommonHeader
          onBackPress={() => navigation?.goBack()}
          mainContainer={styles.headerMainContainer}
          iconContainer={{
            backgroundColor: colors.darkPrussianBlue,
          }}
          textStyle={styles.headerTextStyle}
          headerName={STRINGS.headerName}
        />
      </View>
      <View style={style.logoContainer}>
        <ImageBackground
          style={style.logoImage}
          source={{ uri: data?.logo }}
          resizeMode="contain"
        />
      </View>
      <View style={style.bgDarkPrussianBlue}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, style.royalOrangeText]}>
            {STRINGS.quickReset}
          </Text>
          <Text style={style.surfCrestDescription}>
            {STRINGS.meditationDescription}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.recommendationsContainer,
          {
            backgroundColor: colors.darkPrussianBlue,
          },
        ]}
      >
        <View style={style.resourcesRow}>
          <Text style={style.resourcesTitle}>{STRINGS.yourResources}</Text>
          <View style={style.dashLine} />
        </View>
        <FlatList
          data={recommendationsData}
          ItemSeparatorComponent={() => {
            return <View style={styles.itemSeparator} />;
          }}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }: any) => {
            let duration_: any = findValueByKey(item, "duration");
            return (
              <>
                <MusicPlayButton
                  isLatest={true}
                  item={item}
                  activityContainer={style.activityContainer}
                  activitiesTitle={style.activitiesTitle}
                  title={item?.title}
                  durationMusic={parseDurationToMinutesString(duration_)}
                  onPress={() => onVideoClick(item, item.link)}
                  from={from}
                  activitiesSubtitle={style.activitiesSubtitle}
                />
              </>
            );
          }}
          ListFooterComponent={() => {
            return (
              <View style={style.footerContainer}>
                <TouchableOpacity
                  onPress={onYesIDidThisPress}
                  style={style.didThisButton}
                >
                  <Text style={style.didThisText}>{STRINGS.iDidThis}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <VideoPlayer
          videoId={currentVideoId}
          isVisible={isPlayerVisible}
          onClose={closePlayer}
        />
        {toasterDetails?.showToast && (
          <ToastApiResponse
            data={toasterDetails}
            setToasterDetails={setToasterDetails}
            code={toasterDetails?.code}
            message={toasterDetails?.message}
          />
        )}
      </View>
      {isLoading && <CommonLoader />}
    </ScreenWrapper>
  );
};

const style = StyleSheet?.create({
  footerContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: moderateScale(120),
  },
  didThisButton: {
    backgroundColor: colors?.polishedPine,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(30),
    padding: moderateScale(10),
    width: moderateScale(260),
    alignSelf: "center",
    paddingVertical: moderateScale(15),
  },
  didThisText: {
    color: colors.SurfCrest,
    fontSize: textScale(16),
    fontWeight: "500",
    alignSelf: "center",
  },
  activityContainer: {
    marginHorizontal: moderateScale(19),
    marginVertical: moderateScale(20),
    backgroundColor: "rgba(203, 226, 209, 0.12)",
    borderRadius: moderateScale(8),
    width: width - moderateScale(30),
    padding: moderateScale(10),
  },
  activitiesTitle: {
    color: colors.SurfCrest,
    marginHorizontal: moderateScale(8),
    width: width - moderateScale(120),
  },
  activitiesSubtitle: {
    color: colors.lightSurfCrest,
    marginHorizontal: moderateScale(8),
    fontSize: textScale(10),
  },
  dashLine: {
    height: moderateScale(0.5),
    backgroundColor: colors.SurfCrest,
    width: width - moderateScale(120),
    alignSelf: "center",
    marginHorizontal: moderateScale(15),
  },
  logoContainer: {
    height: moderateScale(204),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(13),
  },
  logoImage: {
    height: moderateScale(150),
    width: moderateScale(300),
  },
  bgDarkPrussianBlue: {
    backgroundColor: colors.darkPrussianBlue,
  },
  royalOrangeText: {
    color: colors.royalOrange,
  },
  surfCrestDescription: {
    color: colors.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "400",
    width: moderateScale(310),
    marginTop: moderateScale(10),
  },
  resourcesRow: {
    marginHorizontal: moderateScale(15),
    flexDirection: "row",
    marginTop: moderateScale(20),
  },
  resourcesTitle: {
    color: colors.SurfCrest,
    fontWeight: "600",
  },
});
export default ExplorerActivityPreferences;
