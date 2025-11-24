import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import {
  height,
  moderateScale,
  textScale,
} from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import ListDataView from "../../screens/OnBoarding/AIGeneration/GoalsAI/GeneratedGoalAI/ListDataView";
import { formatSentenceCase } from "../../helper/sentenceCase";
import calculateDuration from "../../helper/duration";
import moment from "moment";
import { MM_DD_YYY } from "../../constant/dateFormatConstants";
import { categorizeTasks } from "../../screens/OnBoarding/AIGeneration/CommonScreen/Helper/Helper";
import { NoDataIcon } from "../../assets";
import SwipeableFlatList from "react-native-swipeable-list";
import { QuickActions } from "../../screens/AddActivities/EditReplaceActivities/editReplaceHelperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { getSeekerDetailsData } from "../../redux/selector";
import navigationString from "../../navigation/navigationString";
import LogoutModal from "../CommonAlert/logoutModal";
import allActions from "../../redux/actions";
import CommonLoader from "../Loader";
import { Ennum_ListedIn, Enum_ButtonTextValue } from "../../constant/ENUM";

interface Props {
  data?: any[];
  navigation: any;
  from: string;
}
type Item = {
  id: number;
  name: string;
  subject: string;
  text: string;
};
const itemSeperator = () => {
  return <View style={{ height: moderateScale(5) }} />;
};
const extractItemKey = (item: Item) => {
  return item.id.toString();
};
const IndepenedentGoalsList: React.FC<Props> = ({ data, navigation, from }) => {
  const [deleteAccountAlert, setDeleteAccountAlert] = useState(false);
  const [activitySelected, setActivitySelected] = useState<any>();
  const [buttonTextValues, setButtonTextValues] = useState<string[]>([
    Enum_ButtonTextValue?.CANCEL,
    Enum_ButtonTextValue?.DELETE,
  ]);
  const [goalsArray, setGoalsArray] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const createArray = (data: any) => {
    return data?.map((item: any) => {
      return { ...item, isShown: false };
    });
  };

  useEffect(() => {
    if (data == undefined) return;
    setGoalsArray(createArray(data));
  }, [data]);

  console.log("data---createArray>>>>>", goalsArray);

  const onPressRecommendation = (index: any) => {
    let tryData = [...goalsArray];
    tryData[index].isShown = !tryData[index]?.isShown;
    setGoalsArray(tryData);
  };
  let userData = useSelector(getSeekerDetailsData());
  const onReplaceClick = (item: any) => {
    console.log("your are replacing this ITEM", item);
    navigation?.navigate(navigationString?.EditReplaceActivies, {
      ActivityDetails: item,
      from: "IndependentGoals",
      ActivityQuestionsType: 2,
      purpuse: "Replace",
      userId: userData?.data?.userId,
      editingFor: "Goals",
    });
  };
  const deleteItem = (item: any) => {
    console.log("your are deleteing this ITEM", item);
    console.log("your are deleteing this ITEM", item);

    setActivitySelected(item);
    setDeleteAccountAlert(true);
  };

  const onEditClick = (item: any) => {
    console.log("itemuserDatauserData", item, "userData", userData);
    navigation?.navigate(navigationString?.EditReplaceActivies, {
      ActivityDetails: item,
      from: "IndependentGoals",
      ActivityQuestionsType: 6,
      purpuse: "Edit",
      editingFor: "Goals",
      userId: userData?.data?.userId,
    });
  };
  const dispatch = useDispatch();
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
        navigation.goBack();
      } else {
        setDeleteAccountAlert(false);
      }
    } catch (error) {
      setDeleteAccountAlert(false);
    } finally {
      setDeleteAccountAlert(false);

      setIsLoading(false);
    }
  };
  return (
    console.log("goalsArray-=->", goalsArray),
    (
      <View style={{ paddingBottom: 50 }}>
        <SwipeableFlatList //uncomment this code later on for edit/replace functionality
          keyExtractor={extractItemKey}
          data={goalsArray}
          renderItem={({ item, index }: any) => {
            return (
              <View
                style={{
                  marginTop: moderateScale(15),
                  borderWidth: 1,
                  borderColor: colors.OceanGreen,
                  borderRadius: moderateScale(10),
                  padding: moderateScale(10),
                  backgroundColor: colors?.prussianBlue,
                }}
              >
                <ListDataView
                  mainTitle={formatSentenceCase(item?.title)}
                  index={index}
                  duration={calculateDuration(item?.startDate, item?.endDate)}
                  start_end_Date={`${moment(item?.startDate).format(
                    MM_DD_YYY
                  )} to ${moment(item?.endDate).format(MM_DD_YYY)}`}
                  timeSystem={item?.timeline}
                  preferred={item?.goalCategory}
                  description={item?.description}
                  onPress={() => onPressRecommendation(index)}
                  isListShow={item?.isShown}
                  combinData={
                    item?.activities?.length > 0 &&
                    item?.activities &&
                    categorizeTasks(item?.activities)
                  }
                  navigation={navigation}
                  roundButtonIcon={
                    !item?.isShown && {
                      transform: [{ rotate: "180deg" }],
                    }
                  }
                  item={item}
                  from={from}
                  goalsFlatlistData={goalsArray}
                  listedIn={Ennum_ListedIn?.Goals}
                />
              </View>
            );
          }}
          ItemSeparatorComponent={itemSeperator}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: height * 0.6,
                }}
              >
                <NoDataIcon />
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
              forIndependentGoals: true,
            })
          }
          bounceFirstRowOnMount={true} // THIS IS THE WORKAROUND
        />
        <LogoutModal
          isVisible={deleteAccountAlert}
          title={"Are you sure?"}
          description={"You wanted to delete this goal?"}
          onNo={() => {
            setDeleteAccountAlert(false);
          }}
          onYes={() => {
            DeleteGoals(activitySelected?.id);
          }}
          hideAlert={() => setDeleteAccountAlert(false)}
          textStyle={{ width: moderateScale(270) }}
          buttonTexts={buttonTextValues}
        />
        {isLoading && <CommonLoader />}
      </View>
    )
  );
};

export default IndepenedentGoalsList;
