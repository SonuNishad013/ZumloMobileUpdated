import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  moderateScale,
  textScale,
  width,
} from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";
import DetailsBox from "../../../../../components/OnBoardiingComponents/DetailsBox";
import RoundButton from "../../../../../components/Buttons/roundButton";
import {
  defaultActivityImage,
  imagePath,
} from "../../../../../assets/png/imagePath";
import TaskCardOnBoarding from "../../../../../components/OnBoardiingComponents/TaskCardOnBoarding";
import navigationString from "../../../../../navigation/navigationString";
import {
  getActvityTitle,
  getTitleIcon,
} from "../../CommonScreen/Helper/Helper";
import { strings } from "../../../../../constant/strings";
import { formatSentenceCase } from "../../../../../helper/sentenceCase";
import logger from "../../../../../constant/logger";
import { getStartEndTimeByActivities } from "../../../../../helper/duration";
import allActions from "../../../../../redux/actions";
import { useDispatch } from "react-redux";

interface Props {
  mainTitle?: any;
  start_end_Date?: any;
  timeSystem?: any;
  preferred?: any;
  description?: any;
  roundButtonIcon?: any;
  isListShow?: boolean;
  onPress?: () => void;
  navigation?: any;
  combinData?: any;
  index?: any;
  duration?: any;
  item?: any;
  from: string;
  editModal?: boolean;
  onPressCheck?: any;
  showCircleButton?: Boolean;
  AigeneratedData?: any;
  purpuse?: string;
  editfor?: string;
  replcaeApiPayload?: any;
  ExistingID?: any;
  goalsFlatlistData?: any[];
  listedIn?: string;
}
const ListDataView: React.FC<Props> = ({
  mainTitle,
  start_end_Date,
  timeSystem,
  preferred,
  description,
  roundButtonIcon,
  isListShow,
  onPress,
  navigation,
  combinData,
  index,
  duration,
  item,
  from,
  editModal,
  onPressCheck,
  showCircleButton,
  AigeneratedData,
  purpuse,
  editfor,
  replcaeApiPayload,
  ExistingID,
  goalsFlatlistData,
  listedIn,
}) => {
  logger("listedIn___", listedIn);
  logger("goalsFlatlistData_____", goalsFlatlistData);
  const dispatch = useDispatch();
  const [combinedDataAll, setCombinedDataAll] = useState<any>([]);
  useEffect(() => {
    setCombinedDataAll([
      combinData?.morning,
      combinData?.afternoon,
      combinData?.evening,
    ]);
  }, [combinData]);
  const navScreen = (value: any, startEndTime?: string[][]) => {
    logger("goalsFlatlistData_____", goalsFlatlistData);

    console.log("itm-=-=-=", value);
    navigation?.navigate(navigationString?.ActivitesDetails, {
      activitesData: value,
      activitiesData: value?.id,
      from,
      AigeneratedData: {
        assistantResponse: { goals: goalsFlatlistData },
        trackId: AigeneratedData?.trackId,
        responseType: AigeneratedData?.responseType,
        threadId: AigeneratedData?.threadId,
      },
      isConflict: value?.isConflicts,
      purpuse,
      editfor,
      replcaeApiPayload,
      ExistingID,
      trackId: AigeneratedData?.trackId,
      startEndTime,
    });
  };
  function truncate(source: string, size: number) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }
  return (
    console.log("item=-=-=-=>", item),
    (
      <>
        <View style={styles.activityContainer}>
          <View style={{}}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: showCircleButton ? "auto" : width - moderateScale(60),
                // backgroundColor: "yellow",
              }}
            >
              {isListShow ? (
                <View style={{ flexDirection: "column" }}>
                  <DetailsBox
                    mainTitle={mainTitle ? `${index + 1}. ${mainTitle}` : "--"}
                    date={start_end_Date ? start_end_Date : "--"}
                    timeSystem={
                      timeSystem
                      // ? timeSystem.length > 18
                      //   ? timeSystem.substring(0, 18) + "..."`${index+1}. ${mainTitle}`
                      //   : timeSystem
                      // : "--"
                    }
                    preferred={preferred ? preferred : "--"}
                    description={description ? description : "--"}
                    container={{ width: width - moderateScale(100) }}
                    duration={duration}
                    item={item}
                  />
                  <View
                    style={{
                      marginTop: moderateScale(10),
                      width: width - moderateScale(100),
                    }}
                  >
                    <View
                      style={{
                        marginTop: moderateScale(20),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: moderateScale(10),
                        gap: moderateScale(5),
                      }}
                    >
                      <Text
                        style={[
                          styles.activitiesTitle,
                          { color: colors?.royalOrangeDark },
                        ]}
                      >
                        {"Your path, step by step"}
                      </Text>
                      <View
                        style={{
                          backgroundColor: colors.SurfCrest,
                          width: moderateScale(280),
                          height: moderateScale(1),
                        }}
                      />
                    </View>
                    <Text style={styles.activitiesSubtitle}>
                      {/* {formatSentenceCase(strings?.someActivites)} */}
                      {
                        "These daily actions are designed to move you toward your goal—one doable step at a time."
                      }
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.header}>
                  <RoundButton
                    mainContainer={styles.roundButtonContainer2}
                    PngIcon={true}
                    iconShow={imagePath?.SleepIcon}
                    iconStyle={styles.roundButtonIcon2}
                    isImageUrl={true}
                    url={item?.logo}
                  />
                  <Text style={styles.headerText} numberOfLines={1}>
                    {mainTitle
                      ? "Goal " +
                        `${index + 1}` +
                        ": " +
                        truncate(`${mainTitle}`, 32)
                      : "--"}
                  </Text>
                </View>
              )}
              {!showCircleButton && (
                <RoundButton
                  mainContainer={styles.roundButtonContainer}
                  PngIcon={true}
                  iconShow={imagePath?.UPArrow}
                  iconStyle={[styles.roundButtonIcon, roundButtonIcon]}
                  onPress={onPress}
                />
              )}
            </View>
          </View>
        </View>
        {isListShow && (
          <View
            style={[
              styles.detailsContainer,
              { backgroundColor: colors?.transparent },
            ]}
            //Goals activities section which is honeyDew color(surfcrest) is here for now I'm setting it to transparent.
          >
            <>
              {!combinData ? (
                <>
                  <Text style={styles?.noActivites}>
                    {formatSentenceCase(strings?.noActivites)}
                  </Text>
                </>
              ) : (
                <>
                  {combinedDataAll?.length > 0 && (
                    <>
                      {combinedDataAll.map((itm: any, index: any) => {
                        return (
                          console.log("itm-=-=-=>", {
                            itm,
                            combinedDataAll,
                            combinData,
                          }),
                          (
                            <>
                              {itm?.length > 0 && (
                                <>
                                  <View style={styles.listHeader}>
                                    {getTitleIcon(index)}
                                    <Text
                                      style={[
                                        styles.listHeaderText,
                                        { color: colors?.SurfCrest },
                                      ]}
                                    >
                                      {getActvityTitle(index)}{" "}
                                      {/* section where we are showing morning text with icon and ------- line  */}
                                    </Text>
                                    <View
                                      style={[
                                        styles.listHeaderDivider,
                                        { backgroundColor: colors?.SurfCrest },
                                      ]}
                                    />
                                  </View>
                                  <FlatList
                                    data={itm}
                                    keyExtractor={(item, index) =>
                                      "key" + index
                                    }
                                    style={{
                                      marginTop: moderateScale(5),
                                    }}
                                    renderItem={({ item, index }: any) => {
                                      let extractActivitiesFromGoals: any =
                                        goalsFlatlistData?.flatMap((items) =>
                                          items?.activities?.map((itm: any) => {
                                            return {
                                              schTime: itm?.scheduleTime,
                                              durations: itm?.duration,
                                            };
                                          })
                                        );

                                      let startEndTime: string[][] =
                                        getStartEndTimeByActivities(
                                          extractActivitiesFromGoals
                                        );
                                      logger("extractActivitiesFromGoals____", {
                                        extractActivitiesFromGoals,
                                        goalsFlatlistData,
                                        startEndTime,
                                        itm,
                                      });
                                      return (
                                        <View
                                          style={{
                                            flexDirection: "row",
                                            width: "100%",
                                            alignItems: "flex-start",
                                            gap: 5,
                                          }}
                                        >
                                          {editModal && (
                                            <Pressable
                                              onPress={() =>
                                                onPressCheck(item?.guid)
                                              }
                                              style={{
                                                height: moderateScale(18),
                                                width: moderateScale(18),
                                                borderWidth: moderateScale(1),
                                                borderColor: item?.isChecked
                                                  ? colors?.polishedPine
                                                  : colors.grayColorOP2, //pbRGB
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginTop: 5,
                                                borderRadius: moderateScale(5),
                                              }}
                                            >
                                              {item?.isChecked && (
                                                <Image
                                                  source={imagePath?.check}
                                                  style={{
                                                    tintColor:
                                                      colors.polishedPine,
                                                    height: moderateScale(13),
                                                    width: moderateScale(13),
                                                  }}
                                                />
                                              )}
                                            </Pressable>
                                          )}
                                          <TaskCardOnBoarding
                                            listedIn={listedIn}
                                            iconContainer={{
                                              backgroundColor:
                                                colors?.prussianBlue,
                                            }}
                                            titleTextStyle={{
                                              color: colors?.prussianBlue,
                                            }}
                                            subtitleTextStyle={{
                                              color: colors?.prussianBlue,
                                            }}
                                            isConflict={item?.isConflicts}
                                            conflictMessage={
                                              item?.conflictMessage
                                            }
                                            allData={item}
                                            cardPress={() => {
                                              allActions?.dashboardAction?.saveCurrentSuggestionsScheduleTime(
                                                dispatch,
                                                startEndTime
                                              );
                                              navScreen(item);
                                            }} //activities section card press
                                            container={{
                                              marginBottom: moderateScale(7),
                                              flex: 1,
                                              backgroundColor:
                                                colors?.SurfCrest, //activity card background color
                                            }}
                                            title={
                                              item?.title ? item?.title : "--"
                                            }
                                            subTitle={
                                              item?.subActivityName
                                                ? item?.subActivityName
                                                : "--"
                                            }
                                            time={
                                              item?.scheduleTime
                                                ? item?.scheduleTime
                                                : "--"
                                            }
                                            setDuration={
                                              item?.duration
                                                ? item?.duration
                                                : "--"
                                            }
                                            percentShowLine={{
                                              width: "1%",
                                            }}
                                            source={{
                                              uri:
                                                item?.logo && item?.logo !== ""
                                                  ? item?.logo
                                                  : defaultActivityImage,
                                            }}
                                          />
                                        </View>
                                      );
                                    }}
                                  />
                                </>
                              )}
                            </>
                          )
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </>
          </View>
        )}
      </>
    )
  );
};

export default ListDataView;

const styles = StyleSheet.create({
  activityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginTop: moderateScale(20),
  },
  activitiesTitle: {
    fontSize: textScale(18),
    fontWeight: "600",
    color: colors.SurfCrest,
  },
  activitiesSubtitle: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors.SurfCrest,
    marginTop: moderateScale(5),
  },
  roundButtonContainer: {
    height: moderateScale(33),
    width: moderateScale(33),
    backgroundColor: colors?.polishedPine,
    borderWidth: moderateScale(2),
    borderColor: colors?.SurfCrest,
  },
  roundButtonIcon: {
    height: moderateScale(16),
    width: moderateScale(16),
    tintColor: colors?.SurfCrest,
  },
  detailsContainer: {
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(15),
    marginTop: moderateScale(15),
    paddingBottom: moderateScale(15),
    paddingTop: moderateScale(5),
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(15),
  },
  listHeaderText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.prussianBlue,
    marginHorizontal: moderateScale(10),
  },
  listHeaderDivider: {
    flex: 1,
    borderWidth: moderateScale(2),
    borderColor: colors.prussianBlue,
    opacity: 1,
  },
  noActivites: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.prussianBlue,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  roundButtonContainer2: {
    borderColor: colors?.SurfCrest,
    backgroundColor: colors?.royalOrange,
    borderWidth: moderateScale(2),
    height: moderateScale(26),
    width: moderateScale(26),
  },
  roundButtonIcon2: {
    tintColor: colors?.prussianBlue,
    height: moderateScale(11),
    width: moderateScale(11),
  },
  headerText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(20),
    width: width - moderateScale(130),
  },
});
