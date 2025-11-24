import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderWithNameSeeAll from "../../../components/Header/HeaderWithNameSeeAll";
import TaskCardOnBoarding from "../../../components/OnBoardiingComponents/TaskCardOnBoarding";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import navigationString from "../../../navigation/navigationString";
import ShimmerPlaceHolder from "../../../components/SimmerEffect";
import { formatSentenceCase } from "../../../helper/sentenceCase";
import SwipeableFlatList from "react-native-swipeable-list";
import { QuickActions } from "../../AddActivities/EditReplaceActivities/editReplaceHelperFunctions";
import { getSeekerDetailsData } from "../../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import LogoutModal from "../../../components/CommonAlert/logoutModal";
import allActions from "../../../redux/actions";
import {
  dashboardClickENUM,
  Enum_ButtonTextValue,
  Enum_HabitItemIsFrom,
  habitDays,
  habitFrequrency,
  HabitListOpenFrom_ENUM,
  habitStatus,
} from "../../../constant/ENUM";
import { strings } from "../../../constant/strings";
import logger from "../../../constant/logger";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../../constant/appConstant";
import { defaultActivityImage, imagePath } from "../../../assets/png/imagePath";
import moment from "moment";
import { DATE_FORMAT } from "../../../constant/DateFormats";
import HabitItem from "./HabitItem";
import { dashboardLabelAlignemnt } from "../../../utils/TextConfig";
import LabelHeader from "./LabelHeader";
interface Props {
  activitesData?: any;
  navigation?: any;
  isloading?: boolean;
  isSeeAll?: boolean;
  inSummary?: boolean;
  updateDashboardActivities: () => void;
  invertColor?: boolean;
  setHabitListData?: (val: any) => void;
  habitList?: any;
  setIsSwiping?: (val: boolean) => void;
}
type Item = {
  id: number;
  name: string;
  subject: string;
  text: string;
};
const ActivitiesList: React.FC<Props> = ({
  activitesData,
  navigation,
  isloading,
  isSeeAll = true,
  inSummary = false,
  updateDashboardActivities,
  invertColor = true,
  setHabitListData,
  habitList,
  setIsSwiping,
}) => {
  const [activites, setActivites] = useState<any>([]);
  const [deleteAccountAlert, setDeleteAccountAlert] = useState(false);
  const [activitySelected, setActivitySelected] = useState<any>();
  const [buttonTextValues, setButtonTextValues] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setActivites(activitesData);
  }, [activitesData]);

  const extractItemKey = (item: Item) => {
    return item?.id.toString();
  };
  let userData = useSelector(getSeekerDetailsData());
  const onReplaceClick = (item: any) => {
    navigation?.navigate(navigationString?.EditReplaceActivies, {
      ActivityDetails: item,
      isMedicineActivity: item.duration === "",
      from: dashboardClickENUM?.Dashboard,
      ActivityQuestionsType: 1,
      purpuse: strings?.Replace,
      userId: userData?.data?.userId,
    });
  };
  const deleteItem = (item: any) => {
    if (
      item?.goalsActivitiesCount > 1 ||
      item?.activityFrom === strings?.Activities_
    ) {
      setButtonTextValues([
        Enum_ButtonTextValue?.CANCEL,
        Enum_ButtonTextValue?.DELETE,
      ]);
    } else {
      setButtonTextValues([Enum_ButtonTextValue?.CANCEL]);
    }
    setActivitySelected(item);
    setDeleteAccountAlert(true);
  };

  const onEditClick = (item: any) => {
    navigation?.navigate(navigationString?.EditReplaceActivies, {
      ActivityDetails: item,
      isMedicineActivity: item.duration === "",
      from: dashboardClickENUM?.Dashboard,
      ActivityQuestionsType: 5,
      purpuse: strings?.Edit,
    });
  };
  const dispatch = useDispatch();
  const DeleteActivity = async (id: number) => {
    try {
      if (!id) {
        logger("Invalid activity ID");
        return;
      }
      if (!userData?.data?.userId) {
        logger("User ID is missing");
        return;
      }
      setIsLoading(true);
      let requestBody = {
        activityId: id,
        userId: userData.data.userId,
      };
      const response = await allActions.dashboardAction.DeleteActivityByIdApi(
        dispatch,
        requestBody,
        API_FUN_NAMES?.DeleteActivityByIdApi
      );

      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setDeleteAccountAlert(false);
        updateDashboardActivities();
      } else {
        setDeleteAccountAlert(false);
      }
    } catch (error) {
      logger("Exception in Delete", error);
      setDeleteAccountAlert(false);
    } finally {
      setDeleteAccountAlert(false);
      setIsLoading(false);
    }
  };

  return (
    <View>
      {activitesData?.length > 0 || habitList.length > 0 ? (
        <LabelHeader
          title={isSeeAll ? strings?.Today_task_events : strings?.Activities}
          showAll={isSeeAll}
          seelAllClick={() =>
            navigation.navigate(navigationString.DailyRoutine, {
              data: activitesData,
            })
          }
        />
      ) : null}

      <>
        {isloading || isLoading ? (
          <ShimmerPlaceHolder
            width={width - moderateScale(50)}
            height={moderateScale(110)}
            backgroundColor={colors.darkthemeColor}
          ></ShimmerPlaceHolder>
        ) : (
          <>
            <View collapsable={false}>
              <SwipeableFlatList
                collapsable={false}
                keyExtractor={extractItemKey}
                onSwipeStart={() => setIsSwiping && setIsSwiping(true)}
                onSwipeEnd={() => setIsSwiping && setIsSwiping(false)}
                data={activites.slice(0, 1)}
                renderItem={({ item, index }: any) => {
                  return (
                    <View style={{ marginBottom: moderateScale(10) }}>
                      <TaskCardOnBoarding
                        allData={item}
                        activeOpacity={1}
                        container={{
                          backgroundColor: invertColor
                            ? colors?.backgroundTheme
                            : item?.isCompleted
                            ? colors?.SaltBox
                            : colors?.polishedPine,
                        }}
                        source={{ uri: item?.logo || defaultActivityImage }}
                        percentShowLine={{
                          width: item?.isCompleted
                            ? "100%"
                            : item?.isInProgress,
                          backgroundColor: item?.isCompleted
                            ? colors?.royalOrange
                            : colors?.SurfCrest,
                        }}
                        isStreak={true}
                        title={
                          item?.title ? formatSentenceCase(item?.title) : "--"
                        }
                        subTitle={
                          item?.activity
                            ? formatSentenceCase(item?.activity)
                            : "--"
                        }
                        frequency={item?.frequency ? item?.frequency : "--"}
                        time={item?.scheduleTime ? item?.scheduleTime : "--"}
                        setDuration={item?.duration ? item?.duration : "--"}
                        isCompleted={item?.isCompleted == true ? true : false}
                        cardPress={() => {
                          navigation.navigate(
                            navigationString.ActivitesDetails,
                            {
                              from: dashboardClickENUM?.Dashboard,
                              activitesData: item,
                              mainTab: dashboardClickENUM?.Dashboard,
                            }
                          );
                        }}
                        inSummary={!inSummary}
                      />
                    </View>
                  );
                }}
                maxSwipeDistance={190}
                swipeThreshold={2}
                renderQuickActions={({ item }: { item: Item }) =>
                  QuickActions({
                    item,
                    onEditClick,
                    deleteItem,
                    onReplaceClick,
                  })
                }
                bounceFirstRowOnMount={true}
              />
            </View>

            <HabitItem
              navigation={navigation}
              comeFrom={HabitListOpenFrom_ENUM?.HOME}
              date={moment().format(DATE_FORMAT?.habitDateFormat)}
              setHabitListData={(val: any) =>
                setHabitListData && setHabitListData(val)
              }
              isFrom={Enum_HabitItemIsFrom?.HOME}
            />
          </>
        )}
      </>
      <LogoutModal
        isVisible={deleteAccountAlert}
        title={
          activitySelected?.goalsActivitiesCount > 1 ||
          activitySelected?.activityFrom === strings?.activities
            ? strings?.sure
            : strings?.Warning
        }
        description={
          activitySelected?.goalsActivitiesCount > 1 ||
          activitySelected?.activityFrom === strings?.activities
            ? strings?.You_wanted_to_delete_this_activity
            : strings?.You_can_not_delete_this_activity
        }
        onNo={() => {
          setDeleteAccountAlert(false);
        }}
        onYes={() => {
          activitySelected?.goalsActivitiesCount > 1 ||
          activitySelected?.activityFrom === strings?.activities
            ? DeleteActivity(activitySelected?.id)
            : setDeleteAccountAlert(false);
        }}
        hideAlert={() => setDeleteAccountAlert(false)}
        textStyle={{ width: moderateScale(270) }}
        buttonTexts={buttonTextValues}
      />
    </View>
  );
};

export default ActivitiesList;

const styles = StyleSheet.create({
  habitCardView: {
    backgroundColor: colors?.prussianBlue,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
  },
  centerView: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  centerViewWithTop: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: moderateScale(10),
  },
  habitTitle: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "600",
  },
  durationView: {
    flexDirection: "row",
  },
  durationType: {
    backgroundColor: colors?.SaltBox,
    alignSelf: "flex-start",
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(20),
    flexDirection: "row",
    alignItems: "center",
    height: moderateScale(25),
    marginTop: moderateScale(5),
  },
  calenderImage: {
    height: moderateScale(17),
    width: moderateScale(17),
    resizeMode: "contain",
    marginRight: moderateScale(5),
  },
  clockImageStyle: {
    height: moderateScale(25),
    width: moderateScale(25),
    resizeMode: "contain",
    marginLeft: moderateScale(5),
  },
  durationText: {
    color: colors?.SurfCrest,
    fontWeight: "600",
    fontSize: moderateScale(11),
  },
  durationDay: {
    backgroundColor: colors?.SaltBox,
    alignSelf: "flex-start",
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(20),
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    height: moderateScale(25),
    marginLeft: moderateScale(5),
    marginTop: moderateScale(5),
  },
  habitTime: {
    color: colors?.SurfCrest,

    fontSize: moderateScale(11),
    fontWeight: "400",
  },
  durationTime: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(11),
    fontWeight: "400",
    textAlign: "center",
  },
  timeCount: {
    color: colors?.royalOrange,
    fontWeight: "800",
    fontSize: moderateScale(11),
  },
  statusStyle: {
    marginTop: moderateScale(10),

    backgroundColor: colors?.buttonHabit,
    color: colors?.SurfCrest,
    alignSelf: "flex-start",
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(15),
    fontSize: moderateScale(12),
    fontWeight: "500",
    overflow: "hidden",
  },

  flexRow: {
    flexDirection: "row",
  },
  reminderText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(12),
    fontWeight: "400",
  },
});
