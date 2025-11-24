import {
  FlatList,
  Image,
  LayoutAnimation,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../constant/colors";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import TaskDetails from "../../AddActivities/DailyRoutine/TaskDetails";
import navigationString from "../../../navigation/navigationString";
import calculateDuration from "../../../helper/duration";
import moment from "moment";
import DetailsBox from "../../../components/OnBoardiingComponents/DetailsBox";
import { formatSentenceCase } from "../../../helper/sentenceCase";
import categorizeTasks from "../../AddActivities/DailyRoutine/categorizeTasks";
import { MoonIcon, MorningIcon, NoDataIcon, SunIcon } from "../../../assets";
import { strings } from "../../../constant/strings";
import { QuickActions } from "../../AddActivities/EditReplaceActivities/editReplaceHelperFunctions";
import SwipeableFlatList from "react-native-swipeable-list";
import LogoutModal from "../../../components/CommonAlert/logoutModal";
import { useDispatch, useSelector } from "react-redux";
import { getSeekerDetailsData } from "../../../redux/selector";
import allActions from "../../../redux/actions";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { Enum_ButtonTextValue } from "../../../constant/ENUM";

interface props {
  wellnessData?: any;
  navigation?: any;
  setIsLoading: (val: boolean) => void;
  getWellnessPlanDetails: () => void;
  setToasterDetails: (val: any) => void;
  setIsSwiping?: (val: boolean) => void;
}

type Item = {
  id: number;
  name: string;
  subject: string;
  text: string;
};
interface RenderItemProps {
  [key: string]: any;
}

const extractItemKey = (item: Item) => {
  return item.id.toString();
};

const ForDetailsWellnessPlan: React.FC<props> = ({
  wellnessData,
  navigation,
  setIsLoading,
  getWellnessPlanDetails,
  setToasterDetails,
  setIsSwiping,
}) => {
  let userData = useSelector(getSeekerDetailsData());
  const dispatch = useDispatch();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [goals, setGoals] = useState<any>(wellnessData?.goals);
  const [activityList, setactivityList] = useState<any>();
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [deleteAccountAlert, setDeleteAccountAlert] = useState(false);
  const [activitySelected, setActivitySelected] = useState<any>();
  const [isLastGoal, setIsLastGoal] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [buttonTextValues, setButtonTextValues] = useState<string[]>([
    Enum_ButtonTextValue?.CANCEL,
    Enum_ButtonTextValue?.DELETE,
  ]);

  useEffect(() => {
    if (wellnessData == undefined) return;
    setGoals(wellnessData?.goals);
  }, [wellnessData]);

  useEffect(() => {
    if (goals.length < 2) {
      setIsLastGoal(true);
    }
    const shortTermGoals = goals?.filter(
      (goal: any) => goal?.goalType === "Short-term"
    );
    const longTermGoals = goals?.filter(
      (goal: any) => goal?.goalType === "Long-term"
    );
    const activities = goals.map((goal: any) => goal.activities);
    setactivityList(activities);

    setData((prevData: any) => [
      { ...prevData[0], data: shortTermGoals },
      { ...prevData[1], data: longTermGoals },
    ]);
  }, [wellnessData]);

  const deleteItem = (item: any) => {
    setDeleteType("goals");

    if (isLastGoal) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: "You can't delete the last goal.",
      });
      return;
    } else {
      setActivitySelected(item);
      setDeleteAccountAlert(true);
    }
  };
  const deleteActivit_ = (item: any) => {
    setDeleteType("activities");
    console.log("deleteActivit__item", item);
    if (item?.goalsActivitiesCount === 1) {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: "You can't delete the last activity.",
      });
      return;
    } else {
      setActivitySelected(item);
      setDeleteAccountAlert(true);
    }
  };

  const onEditClick = (item: any) => {
    navigation?.navigate(navigationString?.EditReplaceActivies, {
      ActivityDetails: item,
      from: "WellnessOverview",
      ActivityQuestionsType: 6,
      purpuse: "Edit",
      editingFor: "Goals",
      userId: userData?.data?.userId,
    });
  };
  const onEditClickActivity_ = (item: any) => {
    navigation?.navigate(navigationString?.EditReplaceActivies, {
      ActivityDetails: item,
      isMedicineActivity: item.duration === "",
      from: "WellnessOverview",
      ActivityQuestionsType: 5,
      purpuse: "Edit",
      editingFor: "Activities",
    });
  };
  const onReplaceClick = (item: any) => {
    navigation?.navigate(navigationString?.EditReplaceActivies, {
      ActivityDetails: item,
      from: "WellnessOverview",
      ActivityQuestionsType: 2,
      purpuse: "Replace",
      editingFor: "Goals",
      userId: userData?.data?.userId,
    });
  };
  const onReplaceClickActivity_ = (item: any) => {
    navigation?.navigate(navigationString?.EditReplaceActivies, {
      ActivityDetails: item,
      isMedicineActivity: item.duration === "",
      from: "WellnessOverview",
      ActivityQuestionsType: 1,
      purpuse: "Replace",
      userId: userData?.data?.userId,
      editingFor: "Activities",
    });
  };
  const DeleteGoals = async (id: number) => {
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
        goalId: id, // Fixed incorrect assignment
        userId: userData.data.userId, // Ensured userId is included
      };

      const response = await allActions.dashboardAction.DeleteGoalByIdAPI(
        dispatch,
        requestBody,
        "DeleteGoalByIdAPI"
      );

      if (response?.statusCode === 200) {
        setDeleteAccountAlert(false);
        setIsLoading(true);
        getWellnessPlanDetails();
        setToasterDetails({
          showToast: true,
          code: 1,
          message: response?.message,
        });
      } else {
        setDeleteAccountAlert(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: "Oops! Something went wrong.",
        });
      }
    } catch (error) {
      setDeleteAccountAlert(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: "Oops! Something went wrong.",
      });
    } finally {
      setDeleteAccountAlert(false);
      setIsLoading(false);
    }
  };
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
        setIsLoading(true);
        getWellnessPlanDetails();
        setToasterDetails({
          showToast: true,
          code: 1,
          message: response?.message,
        });
      } else {
        setDeleteAccountAlert(false);
        setIsLoading(true);
        getWellnessPlanDetails();
        setToasterDetails({
          showToast: true,
          code: 0,
          message: "oops! Something went wrong.",
        });
      }
    } catch (error) {
      setDeleteAccountAlert(false);
      setIsLoading(true);
      getWellnessPlanDetails();
      setToasterDetails({
        showToast: true,
        code: 0,
        message: "Oops! Something went wrong.",
      });
    } finally {
      setDeleteAccountAlert(false);

      setIsLoading(false);
    }
  };

  //new code
  const categorizedData = categorizeTasks(
    activityList !== undefined ? activityList.flat() : []
  );
  const [data, setData] = useState([
    {
      title: "Short Term Goals",
      subTitle:
        "Guidance on developing healthy habits, setting goals, and maintaining overall well-being.",
      data: [
        {
          header: "Improve Sleep Quality",
          date: "2023-06-01",
          period: "Next month",
          cause: "Sleep",
        },
        {
          header: "Reduce anxiety symptoms",
          date: "2023-06-01",
          period: "Next month",
          cause: "Mental Health",
        },
      ],
      isOpen: false,
    },
    {
      title: "Long Term Goals",
      subTitle:
        "Guidance on developing healthy habits, setting goals, and maintaining overall well-being.",
      data: [
        {
          header: "Improve Sleep Quality",
          date: "2023-06-01",
          period: "six months",
          cause: "Physical Health",
        },
        {
          header: "Reduce anxiety symptoms",
          date: "2023-06-01",
          period: "six months",
          cause: "Lifestyle",
        },
      ],
      isOpen: false,
    },
  ]);

  const renderGoalSectionItem = ({
    section,
    index: sectionIndex,
  }: {
    section: any;
    index: number;
  }) => {
    const isExpanded = sectionIndex === expandedIndex;
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: moderateScale(10),
            marginHorizontal: moderateScale(4),
            marginTop: moderateScale(20),
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: textScale(24),
                color: colors?.SurfCrest,
                marginHorizontal: moderateScale(5),
              }}
            >
              {formatSentenceCase(section?.title)}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              height: moderateScale(33),
              width: moderateScale(33),
              backgroundColor: colors?.backgroundTheme,
              borderRadius: moderateScale(20),
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => handlePress(sectionIndex)}
          >
            <Image
              source={isExpanded ? imagePath?.UPArrow : imagePath?.RightArrow}
              style={{
                tintColor: colors?.SurfCrest,
                height: moderateScale(isExpanded ? 25 : 20),
                width: moderateScale(isExpanded ? 25 : 20),
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          collapsable={false}
        >
          {/* Render swipeable flatlist here  */}
          {isExpanded && (
            <SwipeableFlatList
              keyExtractor={extractItemKey}
              data={section?.data}
              onSwipeStart={() => setIsSwiping && setIsSwiping(true)}
              onSwipeEnd={() => setIsSwiping && setIsSwiping(false)}
              renderItem={({ item, index }: any) => {
                return (
                  <DetailsBox
                    duration={calculateDuration(item?.startDate, item?.endDate)}
                    mainTitle={item?.title}
                    date={moment(item?.startDate).format("YYYY-MM-DD")}
                    timeSystem={item.timeLine || item?.timeline}
                    preferred={item?.goalCategoryText || item?.goalCategory}
                    description={item?.description}
                    container={{
                      backgroundColor:
                        item?.goalTypeText == "Short-term"
                          ? colors?.prussianBlue
                          : colors?.backgroundTheme,
                      width: width / 1.14,
                      marginTop: moderateScale(10),
                    }}
                    item={item}
                  />
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
              bounceFirstRowOnMount={true} // THIS IS THE WORKAROUND
            />
          )}
          {/* Render swipeable flatlist here  */}
        </View>
      </View>
    );
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
      console.log("check itemjbkjbjknbjk", item),
      (
        <SwipeableFlatList
          keyExtractor={extractItemKey}
          data={[item]}
          renderItem={({ item }: RenderItemProps) => (
            <View style={{ marginHorizontal: moderateScale(0) }}>
              <TaskDetails
                data={item}
                section={section}
                mainBoxContainer={{
                  backgroundColor:
                    section.title === strings.morning
                      ? colors?.SurfCrest
                      : section.title === strings.Afternoon
                      ? colors.SaltBox
                      : section.title === "Night"
                      ? colors.saltLight
                      : colors.polishedPine,
                  borderWidth:
                    section.title === strings.morning
                      ? moderateScale(0)
                      : moderateScale(1),
                  borderColor:
                    section.title === strings.morning
                      ? colors?.SurfCrest
                      : colors.SurfCrest,
                  marginTop: moderateScale(10),
                  width: width / 1.18,
                }}
                activityImageContainerStyle={{
                  borderColor: colors?.SurfCrest,
                  borderWidth: 1,
                }}
                titleTextStyle={{
                  color:
                    section.title === strings.morning
                      ? colors.prussianBlue
                      : colors.white,
                  width: moderateScale(250),
                }}
                timeTextStyle={{
                  color:
                    section.title === strings.morning
                      ? colors.prussianBlue
                      : colors.white,
                }}
                streakTextStyle={{
                  color:
                    section.title === strings.morning
                      ? colors.prussianBlue
                      : colors.white,
                }}
                onPress={() =>
                  navigation?.navigate(navigationString?.ActivitesDetails, {
                    from: "WellnessOverview",
                    activitesData: item,
                    mainTab: "WellnessOverview",
                  })
                }
                isWellnessplanDetials={true}
                animationKey={key}
                expandedKey={expandedKey}
                morningTaskData={categorizedData}
                setExpandedKey={setExpandedKey}
              />
            </View>
          )}
          maxSwipeDistance={170}
          renderQuickActions={({
            index,
            item,
          }: {
            index: number;
            item: Item;
          }) =>
            QuickActions({
              item,
              onEditClick: onEditClickActivity_,
              deleteItem: deleteActivit_,
              onReplaceClick: onReplaceClickActivity_,
            })
          }
          bounceFirstRowOnMount={true} // THIS IS THE WORKAROUND
        />
      )
    );
  };
  const renderSectionHeader = ({ section }: { section: any }) => (
    <>
      {section?.data?.length > 0 && (
        <View
          style={{
            marginTop:
              section.title === strings.morning
                ? moderateScale(15)
                : moderateScale(20),
            marginBottom: moderateScale(5),
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            paddingLeft: moderateScale(5),
          }}
        >
          {section?.title === strings?.morning ? (
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: textScale(16),
                color: colors.SurfCrest,
                marginHorizontal: moderateScale(10),
              }}
            >
              {section?.title} ({section?.data?.length})
            </Text>
            <View
              style={{
                width: moderateScale(290),
                height: moderateScale(1),
                backgroundColor: colors.SurfCrest,
              }}
            />
          </View>
        </View>
      )}
    </>
  );
  const handlePress = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <View style={styles.planContainer}>
      {/* Goals List */}
      <FlatList
        data={data.filter((section) => section?.data?.length > 0)}
        keyExtractor={(item, index) => `goal-section-${index}`}
        renderItem={({ item: section, index }) =>
          renderGoalSectionItem({ section, index })
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false} // Disable scroll since it's nested in parent ScrollView
      />
      {categorizedData?.length > 0 && (
        <View
          style={{
            marginTop: moderateScale(40),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: moderateScale(20),
          }}
        >
          <Text
            style={{
              color: colors.SurfCrest,
              fontWeight: "600",
              fontSize: textScale(14),
              marginRight: moderateScale(10),
            }}
          >
            {categorizedData?.length > 0 ? "Activities" : "Activity"}
          </Text>
          <View
            style={{
              backgroundColor: colors.SurfCrest,
              width: moderateScale(280),
              height: moderateScale(1),
            }}
          />
        </View>
      )}
      <View style={{ marginHorizontal: moderateScale(10) }}>
        <SectionList
          sections={categorizedData || []}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      </View>
      <LogoutModal
        isVisible={deleteAccountAlert}
        title={"Are you sure?"}
        description={"You wanted to delete this?"}
        onNo={() => {
          setDeleteAccountAlert(false);
        }}
        onYes={() => {
          deleteType === "goals"
            ? DeleteGoals(activitySelected?.id)
            : DeleteActivity(activitySelected?.id);
        }}
        hideAlert={() => setDeleteAccountAlert(false)}
        textStyle={{ width: moderateScale(270) }}
        buttonTexts={buttonTextValues}
      />
    </View>
  );
};

export default ForDetailsWellnessPlan;

const styles = StyleSheet.create({
  planContainer: {
    // paddingHorizontal: moderateScale(5),
    backgroundColor: colors?.prussianBlue,
    paddingVertical: moderateScale(10),
  },
  itemContainer: {
    flexDirection: "row",
    marginTop: moderateScale(20),
  },
  itemTitle: {
    fontWeight: "700",
    fontSize: textScale(24),
    color: colors?.SurfCrest,
  },
  arrowContainer: {
    height: moderateScale(33),
    width: moderateScale(33),
    borderRadius: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors?.SaltBox,
  },
  arrowImage: {
    tintColor: colors?.SurfCrest,
  },
  detailsContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(15),

    marginTop: moderateScale(15),
  },
  sectionHeaderContainer: {
    marginHorizontal: moderateScale(15),
    flexDirection: "row",
    height: moderateScale(20),
    alignItems: "center",
  },
  sectionHeaderText: {
    fontSize: textScale(16),
    color: colors.SurfCrest,
    marginHorizontal: moderateScale(10),
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.SurfCrest,
    marginTop: moderateScale(20),
  },
});
