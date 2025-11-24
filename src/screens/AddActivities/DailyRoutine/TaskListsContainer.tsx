import { Pressable, SectionList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CommonButton from "../../../components/Buttons/commonButton";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import TaskDetails from "./TaskDetails";
import {
  Bin,
  MoonIcon,
  MorningIcon,
  SunIcon,
  RecycleIcon_,
  EditPenOrange,
  NoDataIcon,
} from "../../../assets";
import { strings } from "../../../constant/strings";
import navigationString from "../../../navigation/navigationString";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getSeekerDetailsData } from "../../../redux/selector";
import allActions from "../../../redux/actions";
import SwipeableFlatList from "react-native-swipeable-list";
import LogoutModal from "../../../components/CommonAlert/logoutModal";
import HabitItem from "../../Dashboard/Planner/HabitItem";
import {
  DailyRouteTab_ENUM,
  Enum_ButtonTextValue,
  Enum_HabitItemIsFrom,
  HabitListOpenFrom_ENUM,
} from "../../../constant/ENUM";

interface Props {
  navigation?: any;
  morningTaskData?: any;
  from?: any;
  isSameDay?: any;
  selectedDate?: any;
  setIsLoading: (val: any) => void;
  callApiAgain: (val: any) => void;
  selectedTab?: string; // Added selectedTab prop
  datePickFromCalender?: any;
  setHabitListData?: any;
}
const TaskListsContainer: React.FC<Props> = ({
  morningTaskData,
  navigation,
  from = false,
  isSameDay,
  selectedDate,
  setIsLoading,
  callApiAgain,
  selectedTab,
  datePickFromCalender,
  setHabitListData,
}) => {
  const dispatch = useDispatch();
  let userData = useSelector(getSeekerDetailsData());
  //Animation for showing deleted and edit icons on activity's More option click CODE START FRO HERE
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [deleteAccountAlert, setDeleteAccountAlert] = useState(false);
  const [activitySelected, setActivitySelected] = useState<any>();
  const [buttonTextValues, setButtonTextValues] = useState<string[]>();
  //Animation for showing deleted and edit icons on activity's More option click CODE END FRO HERE

  const DeleteActivity = async (id: number) => {
    try {
      if (!id) {
        console.error("Invalid activity ID");
        return;
      }
      if (!userData?.data?.userId) {
        console.error("User ID is missing");
        return;
      }
      setIsLoading(true);
      let requestBody = {
        activityId: id, // Fixed incorrect assignment
        userId: userData.data.userId, // Ensured userId is included
      };

      const response = await allActions.dashboardAction.DeleteActivityByIdApi(
        dispatch,
        requestBody,
        "DeleteActivityByIdApi"
      );
      if (response?.statusCode === 200) {
        setDeleteAccountAlert(false);
        callApiAgain({ response, callApiAgain: true });
      } else {
        setDeleteAccountAlert(false);
        callApiAgain({ response, callApiAgain: false });
      }
    } catch (error) {
      setDeleteAccountAlert(false);
      callApiAgain({ response: error, callApiAgain: false });
    } finally {
      setDeleteAccountAlert(false);
      setIsLoading(false);
    }
  };

  const renderSectionHeader = ({ section }: { section: any }) => (
    <>
      {section?.data?.length > 0 && (
        <View
          style={[
            styles.sectionHeader,
            {
              marginTop:
                section.title === strings.morning
                  ? moderateScale(1)
                  : moderateScale(15),
            },
          ]}
        >
          {section.title === strings.morning ? (
            <MorningIcon width={moderateScale(20)} height={moderateScale(20)} />
          ) : (
            <>
              {section.title === "Night" ? (
                <MoonIcon
                  width={`${moderateScale(20)}`}
                  height={`${moderateScale(20)}`}
                />
              ) : (
                <SunIcon
                  width={`${moderateScale(20)}`}
                  height={`${moderateScale(20)}`}
                />
              )}
            </>
          )}
          <Text style={styles.sectionHeaderText}>
            {section.title} ({section.data.length})
          </Text>
          <View style={styles.listHeaderDivider} />
        </View>
      )}
    </>
  );

  type Item = {
    id: number;
    name: string;
    subject: string;
    text: string;
  };
  interface RenderItemProps {
    [key: string]: any;
  }
  interface QuickActionsProps {
    index: number;
    item: Item;
    onEditClick: (item: any) => void;
    deleteItem: (item: Item) => void;
    onReplaceClick: (item: Item) => void;
  }
  const QuickActions = ({
    item,
    onEditClick,
    deleteItem,
    onReplaceClick,
  }: QuickActionsProps) => {
    return (
      <View style={styles.qaContainer}>
        <View style={[styles.button, { borderColor: colors.green02 }]}>
          <Pressable onPress={() => onEditClick(item)}>
            <EditPenOrange />
          </Pressable>
        </View>
        <View style={[styles.button, { borderColor: colors.green02 }]}>
          <Pressable onPress={() => onReplaceClick(item)}>
            <RecycleIcon_ />
          </Pressable>
        </View>

        <View style={[styles.button]}>
          <Pressable
            onPress={() => deleteItem(item)}
            style={{
              padding: 0,
              paddingRight: moderateScale(10),
            }}
          >
            <Bin />
          </Pressable>
        </View>
      </View>
    );
  };
  const onReplaceClick = (item: any) => {
    navigation?.navigate(navigationString?.EditReplaceActivies, {
      ActivityDetails: item,
      isMedicineActivity: item.duration === "",
      from: "DailyRoutine",
      ActivityQuestionsType: 1,
      purpuse: "Replace",
      userId: userData?.data?.userId,
    });
  };
  const deleteItem = (item: any) => {
    //manage state for showing custom alert

    if (item?.goalsActivitiesCount > 1 || item?.activityFrom === "Activities") {
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
      from: "DailyRoutine",
      ActivityQuestionsType: 5,
      purpuse: "Edit",
    });
  };

  const extractItemKey = (item: Item) => {
    return item.id.toString();
  };
  const renderItem = ({
    item,
    section,
    index,
  }: {
    item: any;
    section: any;
    index: number;
  }) => {
    const key = `${section.title}_${index}`;

    return (
      <SwipeableFlatList
        keyExtractor={extractItemKey}
        data={[item]}
        renderItem={({ item }: RenderItemProps) => (
          <View style={styles.itemContainer}>
            <TaskDetails
              data={item}
              section={section}
              mainBoxContainer={{
                backgroundColor:
                  item?.status == "Completed"
                    ? colors?.SurfCrest
                    : colors.SaltBox,
                borderWidth: moderateScale(1),
                borderColor: colors.SurfCrest,
              }}
              titleTextStyle={{
                color:
                  item?.status == "Completed"
                    ? colors.prussianBlue
                    : colors.white,
              }}
              timeTextStyle={{
                color:
                  item?.status == "Completed"
                    ? colors.prussianBlue
                    : colors.white,
              }}
              streakTextStyle={{
                color:
                  item?.status == "Completed"
                    ? colors.prussianBlue
                    : colors.white,
              }}
              onPress={() =>
                navigation.navigate(navigationString.ActivitesDetails, {
                  from: "Dashboard",
                  activitesData: item,
                  isSameDay: isSameDay,
                  mainTab: "Dashboard",
                })
              }
              activityImageContainerStyle={{
                borderColor: colors?.SurfCrest,
                borderWidth: 1,
                top: 18,
                width: moderateScale(45),
                height: moderateScale(45),
                right: 10,
              }}
              from={from}
              animationKey={key}
              expandedKey={expandedKey}
              morningTaskData={morningTaskData}
              setExpandedKey={setExpandedKey}
            />
          </View>
        )}
        maxSwipeDistance={170}
        renderQuickActions={({ index, item }: { index: number; item: Item }) =>
          QuickActions({ index, item, onEditClick, deleteItem, onReplaceClick })
        }
        bounceFirstRowOnMount={true} // THIS IS THE WORKAROUND
      />
    );
  };

  return (
    <View style={styles.container}>
      <CommonButton
        btnName={
          isSameDay
            ? strings.yourTodayRoutine
            : `Your routine for ${moment(selectedDate).format("Do MMM ")}`
        }
        mainContainer={styles.buttonContainer}
        btnNameStyle={styles.buttonText}
        disabled
        TextFormatDisable={!isSameDay}
      />
      <View style={styles.contentContainer}>
        {selectedTab == DailyRouteTab_ENUM?.ACTIVITIES ? (
          <>
            {morningTaskData.some(
              (category: any) => category.data && category.data.length > 0 //checking if we got any activity
            ) ? (
              <SectionList
                sections={morningTaskData}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
              />
            ) : (
              <View style={styles?.dailyRoutineEmptyListContainer}>
                <NoDataIcon
                  height={moderateScale(120)}
                  width={moderateScale(120)}
                />
                <Text style={styles?.dailyRoutineEmptyText}>
                  {/* {strings?.No_Activity_found} */}
                  {"Nothing’s on the list just yet."}
                </Text>
                <Text style={styles?.subdailyRoutineEmptyText}>
                  {/* {strings?.No_Activity_found} */}
                  {
                    "Want to explore something new—or build a habit that sticks? "
                  }
                </Text>
              </View>
            )}
          </>
        ) : (
          <HabitItem
            navigation={navigation}
            comeFrom={HabitListOpenFrom_ENUM?.ACTIVITY_LIST}
            date={datePickFromCalender}
            isFrom={Enum_HabitItemIsFrom?.DAILYROUTINE}
            setHabitListData={(val: any) => setHabitListData(val)}
          />
        )}
      </View>
      <LogoutModal
        isVisible={deleteAccountAlert}
        title={
          activitySelected?.goalsActivitiesCount > 1 ||
          activitySelected?.activityFrom === "Activities"
            ? "Are you sure?"
            : "Warning!"
        }
        description={
          activitySelected?.goalsActivitiesCount > 1 ||
          activitySelected?.activityFrom === "Activities"
            ? "You wanted to delete this activity?"
            : "You can not delete this activity."
        }
        onNo={() => {
          setDeleteAccountAlert(false);
        }}
        onYes={() => {
          activitySelected?.goalsActivitiesCount > 1 ||
          activitySelected?.activityFrom === "Activities"
            ? DeleteActivity(activitySelected?.id)
            : setDeleteAccountAlert(false); //DeleteActivity(activitySelected?.id);
        }}
        hideAlert={() => setDeleteAccountAlert(false)}
        textStyle={{ width: moderateScale(270) }}
        buttonTexts={buttonTextValues}
      />
    </View>
  );
};

export default TaskListsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    top: 38,
    alignSelf: "center",
    zIndex: 1,
    height: moderateScale(37),
    width: moderateScale(271),
    borderRadius: moderateScale(10),
    backgroundColor: colors?.SurfCrest,
  },
  buttonText: {
    color: colors?.SaltBox,
    fontWeight: "400",
  },
  contentContainer: {
    marginTop: moderateScale(20),
    borderTopLeftRadius: moderateScale(45),
    borderTopRightRadius: moderateScale(45),
    flex: 1,
    backgroundColor: colors?.SaltBox,
    paddingTop: moderateScale(50),
    paddingBottom: moderateScale(30),
  },
  sectionHeader: {
    marginHorizontal: moderateScale(15),
    flexDirection: "row",
    height: moderateScale(30),
    alignItems: "center",
  },
  sectionHeaderText: {
    fontSize: textScale(16),
    color: colors.SurfCrest,
    marginHorizontal: moderateScale(10),
  },
  itemContainer: {
    marginHorizontal: moderateScale(20),
  },
  listHeaderDivider: {
    flex: moderateScale(1),
    borderWidth: moderateScale(1),
    borderColor: colors.grey,
    opacity: 0.2,
  },
  button: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    height: 80,
    alignSelf: "center",
    top: moderateScale(19),
    borderRightWidth: 1,
  },
  qaContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    // backgroundColor: "red",
  },
  buttonText_: {
    fontWeight: "bold",
    opacity: 0.9,
    fontSize: 16,
  },
  myHabitlowerText: {
    color: "rgba(4, 58, 78, 1)",
    fontSize: textScale(24),
    fontWeight: "500",
  },
  dailyRoutineEmptyListContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(10),
    marginTop: moderateScale(100),
  },
  dailyRoutineEmptyText: {
    fontSize: textScale(14),
    fontWeight: "500",
    color: colors?.SurfCrest,
    textAlign: "center",
  },
  subdailyRoutineEmptyText: {
    fontSize: textScale(12),
    fontWeight: "500",
    color: colors?.SurfCrest,
    textAlign: "center",
    paddingHorizontal: moderateScale(20),
  },
});
