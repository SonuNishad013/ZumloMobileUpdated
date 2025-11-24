import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import BoxButtonIcon from "../../../components/OnBoardiingComponents/BoxButtonIcon";
import {
  Alarm,
  ClockSmallIcon,
  CountDownIcon,
  FrequencyIcon,
  NoDataIcon,
} from "../../../assets";
import { CircularProgress } from "react-native-circular-progress";
import colors from "../../../constant/colors";
import HeaderWithNameSeeAll from "../../../components/Header/HeaderWithNameSeeAll";
import CommonButton from "../../../components/Buttons/commonButton";
import { strings } from "../../../constant/strings";
import navigationString from "../../../navigation/navigationString";
import moment from "moment";
import styles from "./styles";
import { capitalizeFirstLetter } from "../../../validations/capitalizeFirstLetter";
import {
  calculateFillPercentage,
  getProgressText,
} from "../../../helper/duration";
import { ddd_DD_MMM_MMM } from "../../../constant/dateFormatConstants";
import logger from "../../../constant/logger";

export const Card = () => {
  return (
    <View>
      <View style={styles.activityContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{"Brilliant!"}</Text>
          <Text style={styles.descriptionText}>
            {"You have been doing this exercise for 6 days"}
          </Text>
        </View>
        <Image style={styles?.image} source={imagePath?.AIAssistanceIcon} />
      </View>
      <Image
        style={{
          position: "absolute",
          bottom: moderateScale(1),
          right: moderateScale(1),
        }}
        source={imagePath?.OrgSideIcon}
      />
    </View>
  );
};
export const ActivityInfo = ({ ActivityDetails, repeatation }: any) => {
  console.log("ActivityDetails___", { ActivityDetails, repeatation });
  logger("checkActivoity4ActINFO_________", ActivityDetails);
  const scheduleTimeIsArray = Array.isArray(ActivityDetails?.scheduleTime);

  return (
    <View>
      <View style={styles.activityInfoRow}>
        <BoxButtonIcon
          activeOpacity={0}
          button={styles.boxButtonIcon}
          source={{ uri: ActivityDetails?.logo }}
          image={styles.boxButtonIconImage}
        />
        <Text style={styles.activityInfoText}>
          {capitalizeFirstLetter(ActivityDetails?.name) ||
            capitalizeFirstLetter(ActivityDetails?.title)}
        </Text>
      </View>
      <Text
        style={{
          color: colors?.SurfCrest,
          fontSize: textScale(14),
          fontWeight: "600",
          marginTop: moderateScale(15),
          marginBottom: moderateScale(10),
        }}
      >
        {"Activity Info"}
      </Text>

      <IconText
        heading={"Type"}
        title={capitalizeFirstLetter(ActivityDetails?.activityType)}
      />
      <View style={styles.iconTextRow}>
        {!ActivityDetails?.isFeatured && (
          <>
            <IconText
              SvgIcon={FrequencyIcon}
              heading={"Schedule"}
              title={ActivityDetails?.frequency}
            />
            {ActivityDetails?.duration !== "N/A" && (
              <IconText
                SvgIcon={Alarm}
                heading={"Duration"}
                title={ActivityDetails?.duration}
              />
            )}
          </>
        )}

        <IconText
          SvgIcon={CountDownIcon}
          heading={"No. of sessions"}
          title={
            (ActivityDetails?.frequencyCount || 1) == 1
              ? repeatation + " Time"
              : repeatation + " Times"
          }
        />
      </View>
      <View
        style={{
          gap: moderateScale(10),
          flexDirection: "row",
          alignItems: "center",
          marginTop: moderateScale(20),
        }}
      >
        <Text
          style={[
            styles.activityDescription,
            {
              marginTop: moderateScale(0),
            },
          ]}
        >
          {"Time:"}
        </Text>

        {ActivityDetails &&
          ActivityDetails[
            scheduleTimeIsArray ? "scheduleTime" : "scheduleTimeArray"
          ].map(
            (
              item: string //scheduleTimeArray
            ) => (
              <Text
                style={{
                  fontSize: textScale(10),
                  fontWeight: "400",
                  color: colors?.SurfCrest,
                  marginLeft: moderateScale(5),
                }}
              >
                {item}
              </Text>
            )
          )}
      </View>
    </View>
  );
};
export const RecentActivites = ({
  data,
  totalHours,
  navigation,
  ActivityDetails,
  fromDetailsPage,
}: any) => {
  console.log("datadata->", ActivityDetails);

  const sortByCreatedDateDescending = (arr: any) => {
    // Sort the array by createdDate
    const sortedArray = arr?.slice()?.sort((a: any, b: any) => {
      // Convert createdDate from UTC to local time for comparison
      return moment.utc(a?.createdDate)?.diff(moment.utc(b?.createdDate));
    });

    // Map the sorted array to create a new array with formatted createdDate
    return sortedArray?.map((item: any) => ({
      ...item, // Spread the original item properties
      createdDate: moment
        .utc(item?.createdDate)
        .local()
        .format("YYYY-MM-DD HH:mm:ss"), // Format createdDate to local time
      stepAnswer: item?.stepAnswer?.map((step: any) => ({
        ...step,
        createdDate: moment
          .utc(step?.createdDate)
          .local()
          .format("YYYY-MM-DD HH:mm:ss"), // Format stepAnswer createdDate
      })),
    }));
  };

  return (
    <>
      {fromDetailsPage && (
        <HeaderWithNameSeeAll
          name={"Recent"}
          msg={"See all"}
          nameText={styles.headerNameText}
          textStyle={styles.headerTextStyle}
          container={styles.headerContainer}
          onPress={() => {
            navigation.navigate(navigationString.ActivityCalendarView, {
              ActivityDetails: ActivityDetails,
            });
          }}
        />
      )}
      {data.length > 0 ? (
        <>
          {sortByCreatedDateDescending(data)?.map((item: any) => {
            return (
              <View style={styles.recentActivityContainer}>
                <View>
                  <View
                    style={[
                      styles.recentActivityTextContainer,
                      {
                        flexDirection: "row",
                        alignItems: "flex-end",
                      },
                    ]}
                  >
                    <Text style={[styles.recentActivityTime]}>
                      {moment(item?.createdDate).format("hh:mm")}
                    </Text>
                    <Text style={[styles.recentActivityAM, {}]}>
                      {moment(item?.createdDate).format("A")}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.recentActivityAM,
                      {
                        marginLeft: moderateScale(2),
                        marginTop: moderateScale(3),
                        fontSize: textScale(12),
                      },
                    ]}
                  >
                    {moment(item?.createdDate).format(ddd_DD_MMM_MMM)}
                  </Text>
                  {item?.stepAnswer?.[2]?.answer && (
                    <Text style={[styles.recentActivityFeedback]}>
                      {item?.stepAnswer?.[2]?.answer}
                    </Text>
                  )}
                </View>

                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  {/* <CircularProgress
                    size={60}
                    width={6}
                    fill={item?.progress}
                    tintColor={colors?.SaltBox}
                    backgroundColor={colors?.lightGrey}
                    rotation={210}
                    lineCap="round"
                    arcSweepAngle={360}
                  >
                    {() => {
                      return (
                        console.log(
                          "getProgressText(ActivityDetails, item)",
                          getProgressText(ActivityDetails, item)
                        ),
                        (
                          <>
                            {ActivityDetails?.isFeatured ? (
                              <View style={styles.circularProgressContainer}>
                                <Text style={styles.circularProgressText}>
                                  {"100%"}
                                </Text>
                              </View>
                            ) : (
                              <View style={styles.circularProgressContainer}>
                                <Text style={styles.circularProgressText}>
                                  {Number(item?.progress).toFixed(0)}%
                                </Text>
                              </View>
                            )}
                          </>
                        )
                      );
                    }}
                  </CircularProgress> */}
                  <CircularProgress
                    size={60}
                    width={6}
                    // fill={parseInt(
                    //   getProgressText(ActivityDetails, item).replace("%", "")
                    // )}
                    fill={item?.progress}
                    tintColor={colors?.SaltBox}
                    backgroundColor={colors?.lightGrey}
                    rotation={210}
                    lineCap="round"
                    arcSweepAngle={360}
                  >
                    {() => {
                      return (
                        console.log(
                          "getProgressText(ActivityDetails, item)",
                          getProgressText(ActivityDetails, item)
                        ),
                        (
                          <>
                            {ActivityDetails?.isFeatured ? (
                              <View style={styles.circularProgressContainer}>
                                <Text style={styles.circularProgressText}>
                                  {"100%"}
                                </Text>
                              </View>
                            ) : (
                              <View style={styles.circularProgressContainer}>
                                <Text style={styles.circularProgressText}>
                                  {/* {getProgressText(ActivityDetails, item)} */}
                                  {Number(item?.progress).toFixed(0)}%
                                </Text>
                              </View>
                            )}
                          </>
                        )
                      );
                    }}
                  </CircularProgress>
                  <Text
                    style={{
                      fontSize: textScale(12),
                      color: colors.prussianBlue,
                      fontWeight: "600",
                      marginTop: moderateScale(5),
                    }}
                  >
                    {"Today's progress"}
                  </Text>
                </View>
              </View>
            );
          })}
        </>
      ) : null}
    </>
  );
};
export const Recommendations = ({
  //  inside the activity details screen where we are showing the complete now button

  recommendations,
  navigation,
  ActivityDetails,
  from,
  trackId,
  AigeneratedData,
}: any) => {
  console.log("recommendations_AigeneratedData===>", {
    recommendations,
  });
  interface RecommendationProps {
    items: any[];
    description: string;
    recommendationGuid: string;
    title: string;
    logo: string;
    [key: string]: any;
  }
  const recommendationReplica: RecommendationProps[] = recommendations;
  return (
    <>
      <Text
        style={{
          color: colors?.SurfCrest,
          fontSize: textScale(14),
          fontWeight: "600",
          marginTop: moderateScale(40),
        }}
      >
        {"Helpful resources"}
      </Text>
      <HeaderWithNameSeeAll
        name={
          "Short techniques to help you settle, breathe, and stay present.\nHere are some references that can be helpful while doing this activity"
        }
        nameText={styles.headerNameText}
        textStyle={styles.headerTextStyle}
        // container={styles.headerContainer}
        onPress={() =>
          navigation.navigate(navigationString?.RecomendationListing, {
            data: recommendations,
            AigeneratedData,
          })
        }
      />
      <Text
        style={{
          color: colors?.SurfCrest,
          fontSize: textScale(14),
          fontWeight: "600",
          marginTop: moderateScale(15),
          marginBottom: moderateScale(10),
        }}
      >
        {"Your videos"}
      </Text>

      {recommendationReplica !== undefined &&
      recommendationReplica?.length > 0 ? (
        <>
          <View style={{ gap: 10 }}>
            {recommendationReplica.map((item: RecommendationProps) => {
              return (
                <TouchableOpacity
                  style={styles.recommendationsContainer}
                  onPress={() =>
                    navigation.navigate(navigationString?.RecommendationList, {
                      //  inside the activity details screen where we are showing the complete now button
                      data: item,
                      from: from,
                      ActivityDetails: ActivityDetails,
                      trackId: trackId,
                      AigeneratedData,
                      item: item,
                      hasVideoItems: recommendationReplica?.length > 0,
                      recommendationDetails: item,
                      isComeFromActivitiesDetails: true,
                    })
                  }
                >
                  <Image
                    source={
                      item.logo ? { uri: item.logo } : imagePath.VideoPlayButton
                    }
                    style={styles.recommendationsImage}
                    resizeMode="contain"
                  />
                  <View style={styles.recommendationsTextContainer}>
                    <Text style={styles.recommendationsTitle}>
                      {capitalizeFirstLetter(item?.title)}
                    </Text>
                    <Text style={styles.recommendationsSubtitle}>
                      {capitalizeFirstLetter(item?.description)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <NoDataIcon
            width={`${moderateScale(200)}`}
            height={`${moderateScale(200)}`}
          />
          <Text style={{ color: colors.SurfCrest }}>{"No data found."}</Text>
        </View>
      )}
    </>
  );
};
export const BottomButtons = ({
  onPressStart,
  onPressLater,
  isFeatured,
  isConflict,
}: any) => {
  return (
    <>
      <CommonButton
        btnName={
          isConflict
            ? "Change time range"
            : isFeatured
            ? strings?.startNow
            : strings.completeNow
        }
        onPress={onPressStart}
        mainContainer={styles?.startBtn}
      />
    </>
  );
};
const IconText = ({ SvgIcon, title, heading }: any) => {
  return (
    <View style={styles.iconTextContainer}>
      {SvgIcon && (
        <SvgIcon height={moderateScale(20)} width={moderateScale(15)} />
      )}
      <Text
        style={[
          styles.iconText,
          SvgIcon && {
            marginLeft: moderateScale(5),
          },
        ]}
      >
        {heading}:
      </Text>
      <Text
        style={[
          styles.iconText,
          {
            marginRight: moderateScale(5),
          },
        ]}
      >
        {title ? title : ""}
      </Text>
    </View>
  );
};
