import {
  FlatList,
  ImageBackground,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../../../constant/colors";
import ScreenWrapper from "../../../../../components/SafeArea/SafeAreaWrapper";
import MusicPlayButton from "../../../../../components/OnBoardiingComponents/MusicPlayButton";
import { strings } from "../../../../../constant/strings";
import CommonHeader from "../../../../../components/Header/commonHeader";
import { imagePath } from "../../../../../assets/png/imagePath";
import { styles } from "./style";
import allActions from "../../../../../redux/actions";
import { useDispatch } from "react-redux";
import {
  moderateScale,
  textScale,
  width,
} from "../../../../../constant/responsiveStyle";
import CommonLoader from "../../../../../components/Loader";
import { NoDataIcon } from "../../../../../assets";
import { formatSentenceCase } from "../../../../../helper/sentenceCase";
import VideoPlayer from "../../../../../components/Player";
import { getVideoID } from "../../../../../helper/getVideoID";
import { API_FUN_NAMES } from "../../../../../constant/APIsFunctionNames";
import {
  STATUS_CODES,
  TOAST_STATUS,
} from "../../../../../constant/appConstant";
import logger from "../../../../../constant/logger";
import {
  AiResponseTypeEnum,
  Enum_durationLabel,
  Enum_durationMinutes,
  Enum_ParentCategory,
  Enum_RecommendationContentType,
  Enum_RecommendationListedIn,
  Enum_RecommendationType,
} from "../../../../../constant/ENUM";
import { findValueByKey } from "../../../../Dashboard/Summary/component/Hooks/transformGoalsFromAPI";
import { getThumbnailFromYoutubeURL } from "../../../../../helper/RecommendationHelper";
import CommonButton from "../../../../../components/Buttons/commonButton";
import ToastApiResponse from "../../../../../components/Toast/ToastApiResponse";
import FastImage from "react-native-fast-image";
import moment from "moment";

interface Props {
  navigation?: any;
  route?: any;
}
interface ItemsProps {
  link: string;
  duration: number | string;
  title: string;
}
interface RecommendationProps {
  items?: ItemsProps[] | null;
  description: string;
  recommendationGuid: string;
  title: string;
  logo: string;
  [key: string]: any;
}
const RecommendationList: React.FC<Props> = ({ navigation, route }) => {
  //Recommendation main page where we are rendering the details and videos.
  const {
    data,
    from,
    ActivityDetails,
    trackId,
    AigeneratedData,
    recomendationContentType,
    listRenderIn,
    videoLink,
    item,
    recommendationDetails,
    isComeFromActivitiesDetails,
    isPersonalTab,
  } = route?.params;

  const [recommendationsData, setrecommendationsData] = useState<any>([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [isLatest, setisLatest] = useState(true);
  const [isRecent, setisRecent] = useState(false);
  const [isPlayerVisible, setPlayerVisible] = useState(false);
  const [bookedSaved, setBookedSaved] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState("");
  const [bookThumbnail, setBookThumbnail] = useState("");
  const [recommendationDetails_, setRecommendationDetails_] =
    useState<RecommendationProps>({
      logo: "",
      items: recomendationContentType?.length
        ? [data]
        : recommendationDetails?.items || [],
      description: data?.description || "",
      recommendationGuid: "",
      title: data?.title || "",
    });
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    setBookedSaved(false);
    fetchThumbnail();
  }, []);

  const closePlayer = () => {
    setPlayerVisible(false);
    setCurrentVideoId("");
  };
  const dispatch = useDispatch();

  const getParentCategory = (responseType: string) => {
    switch (responseType) {
      case AiResponseTypeEnum?.activities:
        return Enum_ParentCategory?.Activities;
      case AiResponseTypeEnum?.goals:
        return Enum_ParentCategory?.Goals;
      case AiResponseTypeEnum?.wellnessPlan:
        return Enum_ParentCategory?.WellnessPlan;
      case AiResponseTypeEnum?.wellness:
        return Enum_ParentCategory?.WellnessPlan;
      case AiResponseTypeEnum?.recommendations:
        return Enum_ParentCategory?.Recommendations;
      default:
        return Enum_ParentCategory?.Activities;
    }
  };
  const setItemsInRecommendationDetails_ = () => {
    if (recommendationDetails_?.items) {
      console.log(
        "✅ Used: recommendationDetails_.items",
        recommendationDetails_.items
      );
      console.log(
        "📦 Setting items in recommendationDetails_:",
        recommendationDetails_.items
      );
      setRecommendationDetails_({
        ...recommendationDetails_,
        items: recommendationDetails_.items,
      });
    } else if (data) {
      console.log("✅ Used: [data]", [data]);
      console.log("📦 Setting items in recommendationDetails_:", [data]);
      setRecommendationDetails_({
        ...recommendationDetails_,
        items: [data],
      });
    } else if (recommendationsData?.recommendations) {
      console.log(
        "✅ Used: recommendationsData.recommendations",
        recommendationsData.recommendations
      );
      console.log(
        "📦 Setting items in recommendationDetails_:",
        recommendationsData.recommendations
      );
      setRecommendationDetails_({
        ...recommendationDetails_,
        items: recommendationsData.recommendations,
      });
    } else if (recommendationsData?.items) {
      console.log(
        "✅ Used: recommendationsData.items",
        recommendationsData.items
      );
      console.log(
        "📦 Setting items in recommendationDetails_:",
        recommendationsData.items
      );
      setRecommendationDetails_({
        ...recommendationDetails_,
        items: recommendationsData.items,
      });
    } else if (recommendationsData?.[0]?.recommendations) {
      console.log(
        "✅ Used: recommendationsData[0].recommendations",
        recommendationsData[0].recommendations
      );
      console.log(
        "📦 Setting items in recommendationDetails_:",
        recommendationsData[0].recommendations
      );
      setRecommendationDetails_({
        ...recommendationDetails_,
        items: recommendationsData[0].recommendations,
      });
    } else {
      console.log("✅ Used: fallback recommendationsData", recommendationsData);
      console.log(
        "📦 Setting items in recommendationDetails_:",
        recommendationsData
      );
      setRecommendationDetails_({
        ...recommendationDetails_,
        items: recommendationsData,
      });
    }
  };

  useEffect(() => {
    if (recommendationDetails_?.items?.length) {
      setrecommendationsData(data);
    } else {
      if (trackId?.length) {
        let recommendationID: any = data?.recommendationGuid;
        getRecommendationAPI(recommendationID);
      } else {
        let recommendationID: any = data?.id;
        !recomendationContentType?.length &&
          getRecommendationItemsInExistingRecordAPI(recommendationID);
      }
    }
    setItemsInRecommendationDetails_();
  }, []);

  const getDurationAndLabel = (duration: string) => {
    const durationMinutes = parseInt(duration || "0", 10);
    if (AigeneratedData?.responseType === AiResponseTypeEnum?.recommendations) {
      return "";
    } else {
      if (durationMinutes <= 5) {
        return `${Enum_durationMinutes?.VeryShort} ${Enum_durationLabel?.VeryShort}`;
      } else if (durationMinutes > 5 && durationMinutes <= 10) {
        return `${Enum_durationMinutes?.Short} ${Enum_durationLabel?.Short}`;
      } else if (durationMinutes > 10 && durationMinutes <= 15) {
        return `${Enum_durationMinutes?.ShortMedium} ${Enum_durationLabel?.ShortMedium}`;
      } else if (durationMinutes > 15 && durationMinutes <= 30) {
        return `${Enum_durationMinutes?.Medium} ${Enum_durationLabel?.Medium}`;
      } else if (durationMinutes > 30 && durationMinutes <= 45) {
        return `${Enum_durationMinutes?.MediumLong} ${Enum_durationLabel?.MediumLong}`;
      } else if (durationMinutes > 45 && durationMinutes <= 60) {
        return `${Enum_durationMinutes?.Long} ${Enum_durationLabel?.Long}`;
      } else if (durationMinutes > 60) {
        return `${Enum_durationMinutes?.VeryLong} ${Enum_durationLabel?.VeryLong}`;
      }
    }
  };

  const getRecommendationAPI = (id: any) => {
    setIsLoading(true);
    let requestbody = {
      userInput: `${data?.title}, ${getDurationAndLabel(
        ActivityDetails?.duration
      )}, ${
        AigeneratedData?.responseType !== AiResponseTypeEnum?.recommendations
          ? Enum_RecommendationType?.Activities
          : Enum_RecommendationType?.Recommendation
      }`,
      trackId: trackId,
      recommendationGuid: id,
      parentCategory: getParentCategory(AigeneratedData?.responseType),
    };
    allActions.RecommendationAction.getRecommendation(
      requestbody,
      API_FUN_NAMES?.LinkRecommendationItems
    )
      .then((response: any) => {
        console.log("get_data_", response);
        setIsLoading(false);
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          let array = { items: response?.data };
          setrecommendationsData(array);
          setRecommendationDetails_({
            ...recommendationDetails_,
            items: response?.data,
          });
        } else {
          setIsLoading(false);
          navigation?.goBack();
        }
      })
      .catch((err) => {
        console.log("get_data_error", err);
        setIsLoading(false);
        navigation?.goBack();
      });
  };
  const getRecommendationItemsInExistingRecordAPI = (id: any) => {
    setIsLoading(true);
    let requestbody = {
      userInput: data?.title,
      recommendationId: id,
      ParentCategory: 4, //delete this
    };
    allActions.RecommendationAction.RecommendationItemsInExistingRecord(
      requestbody,
      API_FUN_NAMES?.LinkRecommendationItems
    )
      .then((response: any) => {
        setIsLoading(false);
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          let array = { items: response?.data };
          // setrecommendationsData(array);
          setRecommendationDetails_({
            ...recommendationDetails_,
            items: response?.data,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const GetActivityRecommedationDetailsById = (
    activityId: any,
    recommendationId: any
  ) => {
    let req = {};
    setIsLoading(true);

    allActions.OnBoarding.GetActivityRecommedationDetailsById(
      dispatch,
      req,
      "GetActivityRecommedationDetailsById",
      `?activityId=${activityId}&recommendationId=${recommendationId}`
    )
      .then((response: any) => {
        console.log("response GetActivityRecommedationDetailsById", response);
        if (response?.statusCode == 200) {
          setIsLoading(false);
          setrecommendationsData(response?.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  // const onLinkClick = (item: any) => {
  //   let req = {
  //     activityId: ActivityDetails?.id,
  //     recommendationId: data?.id,
  //     recommendationDetailId: item?.id,
  //   };
  //   console.log("req for onLinkClick===>", req);

  //   setIsLoading(true);

  //   allActions.OnBoarding.SaveSelectedRecommendation(
  //     dispatch,
  //     req,
  //     "SaveSelectedRecommendation"
  //   )
  //     .then((response: any) => {
  //       console.log("response SaveSelectedRecommendation", response);
  //       if (response?.statusCode == 200) {
  //         setIsLoading(false);
  //         GetActivityRecommedationDetailsById(ActivityDetails?.id, data?.id);
  //         renderMusic(item?.link);
  //       }
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //     });
  // };
  const onVideoClick = (item: any, url: any) => {
    setCurrentVideoId(getVideoID(url));
    setPlayerVisible(true);
  };
  const result = (str: string): string[] => {
    let strArray = str
      .split(/,| and /)
      .map((s) => s.trim())
      .filter((s) => s.length);
    logger("strArray__", strArray);
    strArray.splice(2);
    logger("strArray__2", strArray.splice(3));
    return strArray.splice(1);
  };

  const API_CALL = async () => {
    if (bookedSaved) {
      setToasterDetails({
        showToast: true,
        code: TOAST_STATUS?.ERROR,
        message: "Already Saved in Personal List",
      });
      return;
    }
    setIsLoading(true);
    const requestBody = { ...data, isBookExit: true };
    const response =
      await allActions?.RecommendationAction?.saveBookRecommendations(
        requestBody,
        API_FUN_NAMES?.BookRecommendations
      );
    setIsLoading(false);
    setBookedSaved(true);
    if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
      setToasterDetails({
        showToast: true,
        code: TOAST_STATUS?.SUCCESS,
        message: response?.message,
      });
    } else {
      setToasterDetails({
        showToast: true,
        code: TOAST_STATUS?.ERROR,
        message: response?.message,
      });
    }
  };

  const fetchThumbnail = async () => {
    let formattedTitle = data?.bookTitle
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .join("+");
    let url = "https://www.googleapis.com/books/v1/volumes?q=";
    let title = formattedTitle;
    try {
      const response = await fetch(`${url}${title}`);
      if (response?.status == STATUS_CODES?.RESPONSE_OK) {
        const json = await response.json();
        if (json?.items?.length) {
          const originalUrl = json?.items[0]?.volumeInfo?.imageLinks?.thumbnail;
          const secureUrl = originalUrl.replace(/^http:\/\//i, "https://");
          setBookThumbnail(secureUrl);
        }
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SurfCrest}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode={"contain"}
        source={
          recomendationContentType === Enum_RecommendationContentType?.BOOKS
            ? {
                uri: bookThumbnail,
              }
            : {
                uri: !!recommendationDetails_?.items?.length
                  ? getThumbnailFromYoutubeURL(
                      recommendationDetails_?.items[0]?.link
                    )
                  : videoLink?.length
                  ? getThumbnailFromYoutubeURL(videoLink)
                  : item?.logo?.length
                  ? item?.logo
                  : null,
              }
        }
      >
        <CommonHeader
          onBackPress={() => navigation?.goBack()}
          mainContainer={styles.headerMainContainer}
          iconContainer={styles.headerIconContainer}
          textStyle={styles.headerTextStyle}
        />
      </ImageBackground>

      {recomendationContentType === Enum_RecommendationContentType?.BOOKS && (
        <>
          <View
            style={{
              flex: 1,
              marginTop: moderateScale(15),
              paddingHorizontal: moderateScale(19),
            }}
          >
            <ScrollView
              style={{
                flex: 1,
              }}
            >
              <Text style={styles?.bookTitle}>{data?.bookTitle}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles?.authorName}>{data?.author}</Text>
                {data?.emotionalBehavioralTriggers &&
                  result(data?.emotionalBehavioralTriggers).map((item: any) => {
                    return (
                      <View
                        style={{
                          paddingHorizontal: moderateScale(15),
                          backgroundColor: colors?.polishedPine,
                          borderRadius: moderateScale(15),
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: colors?.prussianBlue,
                            fontSize: textScale(10),
                            fontWeight: "400",
                          }}
                        >
                          {item}
                        </Text>
                      </View>
                    );
                  })}
              </View>
              <Text style={styles?.lebaleDescription}>{data?.summary}</Text>
              <Text style={styles?.bookLabel}>{strings?.Who_is_it_for}</Text>
              <Text style={styles?.lebaleDescription}>{data?.whoIsItFor}</Text>
              <Text style={styles?.bookLabel}>
                {strings?.Why_Youll_Love_It}
              </Text>
              <Text style={styles?.lebaleDescription}>
                {data?.whyYouWillLoveIt}
              </Text>
              <Text style={styles?.bookLabel}>{strings?.Zumlos_Takeaway}</Text>
              <Text style={styles?.lebaleDescription}>
                {data?.zumloTakeaway}
              </Text>
            </ScrollView>
            {listRenderIn !== Enum_RecommendationListedIn?.AiGeneration &&
              !isPersonalTab && (
                <CommonButton
                  btnName={
                    bookedSaved || data?.isBookExit
                      ? "Saved in Personal List"
                      : strings?.Add_to_reading_list
                  }
                  mainContainer={styles?.addToReading}
                  onPress={() => !data?.isBookExit && API_CALL()}
                  disabled={bookedSaved || data?.isBookExit}
                  btnNameStyle={{ color: colors?.SurfCrest }}
                />
              )}
          </View>
        </>
      )}
      {recomendationContentType !== Enum_RecommendationContentType?.BOOKS && (
        <>
          <View style={styles.mainContainer}>
            <View style={styles.textContainer}>
              {/* <Text
                  style={{
                    color: colors?.prussianBlue,
                    fontSize: textScale(24),
                    fontWeight: "600",
                    marginTop: moderateScale(15),
                    marginBottom: moderateScale(10),
                  }}
                >
                  {"Explore & Practice"}
                </Text> */}
              {/* <Text
                  style={{
                    color: colors?.prussianBlue,
                    fontSize: textScale(14),
                    fontWeight: "600",
                    marginBottom: moderateScale(10),
                  }}
                >
                  {
                    "Here’s something to guide the next few minutes. Breathe, move, or reflect—whatever feels right."
                  }
                </Text> */}
              {isComeFromActivitiesDetails && (
                <Text
                  style={{
                    color: colors?.prussianBlue,
                    fontSize: textScale(16),
                    fontWeight: "600",
                    marginBottom: moderateScale(10),
                  }}
                >
                  {"Curated for your activity:"}
                </Text>
              )}
              <Text
                style={[
                  styles.title,
                  { fontSize: textScale(14), fontWeight: "600" },
                ]}
              >
                {recommendationDetails_?.title || "Some sugesstions for you"}
              </Text>
              {recommendationDetails_?.description && (
                <Text style={styles.description}>
                  {recommendationDetails_?.description}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.recommendationsContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  marginTop: moderateScale(10),
                  width: width / 2,
                  justifyContent: "center",
                  height: moderateScale(30),
                  paddingHorizontal: moderateScale(19),
                }}
              >
                <Text
                  style={{
                    color: isLatest
                      ? colors.polishedPine
                      : colors.darkPrussianBlue,
                  }}
                >
                  {"Resources"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.div} />

            <FlatList
              data={
                recommendationDetails_?.items //These are new code added
                  ? recommendationDetails_?.items //These are new code added
                  : []
                // : data
                // ? [data]
                // : recommendationsData?.recommendations
                // ? recommendationsData?.recommendations
                // : recommendationsData?.items ||
                //   recommendationsData?.[0]?.recommendations ||
                //   recommendationsData
              }
              keyExtractor={(item, index) => "key" + index}
              ItemSeparatorComponent={() => {
                return <View style={styles.itemSeparator} />;
              }}
              renderItem={({ item }: any) => {
                let duration_: any = findValueByKey(item, "duration");
                logger("duration_______", duration_);

                return (
                  <>
                    <MusicPlayButton
                      isLatest={isLatest}
                      item={item}
                      activityContainer={styles.musicPlayButtonContainer}
                      title={item?.title}
                      durationMusic={parseDurationToMinutesString(duration_)}
                      onPress={() => onVideoClick(item, item.link)}
                      from={from}
                    />
                  </>
                );
              }}
            />
            <VideoPlayer
              videoId={currentVideoId}
              isVisible={isPlayerVisible}
              onClose={closePlayer}
            />
          </View>
        </>
      )}
      {IsLoading && <CommonLoader />}

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

export default RecommendationList; //Recommendation main page where we are rendering the details and videos.
export const parseDurationToMinutesString = (
  duration: string | number
): string => {
  logger("duration_______", duration);
  let totalSeconds: number = 0;

  if (typeof duration === "number") {
    // All numbers treated as seconds
    totalSeconds = duration;
  } else if (typeof duration === "string" && duration.trim()) {
    const input = duration.trim().toLowerCase();

    // ✅ If it's a pure number string like "611", treat as seconds
    if (/^\d+(\.\d+)?$/.test(input)) {
      totalSeconds = parseFloat(input);
    }
    // ✅ If format is hh:mm:ss or mm:ss
    else if (input.includes(":")) {
      const timeParts = input.split(":").map((part) => parseInt(part, 10));

      if (timeParts.length === 3 && timeParts.every((n) => !isNaN(n))) {
        const [hours, minutes, seconds] = timeParts;
        totalSeconds = hours * 3600 + minutes * 60 + seconds;
      } else if (timeParts.length === 2 && timeParts.every((n) => !isNaN(n))) {
        const [minutes, seconds] = timeParts;
        totalSeconds = minutes * 60 + seconds;
      } else {
        return "0 sec";
      }
    }
    // ✅ Check for multi-unit natural text like "1 min 34 secs"
    else if (
      /\d+\s*(hrs?|hours?|mins?|minutes?|secs?|seconds?)/.test(input) &&
      /\d+\s*(hrs?|hours?|mins?|minutes?|secs?|seconds?)/g.test(
        input.replace(/\d+\s*(hrs?|hours?|mins?|minutes?|secs?|seconds?)/, "")
      )
    ) {
      // if more than one time-unit phrase found → return as is
      return duration;
    }
    // ✅ Single number + unit (like "5 min", "2 hrs", "30 sec")
    else {
      const match = input.match(/^(\d+(?:\.\d+)?)(?:\s*(\w*))?$/);
      if (!match) return "0 sec";

      const value = parseFloat(match[1]);
      const unit = match[2];

      if (isNaN(value)) return "0 sec";

      switch (unit) {
        case "min":
        case "mins":
        case "minute":
        case "minutes":
          totalSeconds = value * 60;
          break;
        case "hr":
        case "hrs":
        case "hour":
        case "hours":
          totalSeconds = value * 3600;
          break;
        case "sec":
        case "secs":
        case "second":
        case "seconds":
        case "":
          totalSeconds = value;
          break;
        default:
          // If no known unit, treat as: seconds if < 60, otherwise minutes
          totalSeconds = value < 60 ? value : value * 60;
      }
    }
  } else {
    return "0 sec";
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${hours} hr${hours !== 1 ? "s" : ""} ${minutes} min${
      minutes !== 1 ? "s" : ""
    } ${seconds} sec${seconds !== 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    return `${minutes} min${minutes !== 1 ? "s" : ""} ${seconds} sec${
      seconds !== 1 ? "s" : ""
    }`;
  } else {
    return `${seconds} sec${seconds !== 1 ? "s" : ""}`;
  }
};
