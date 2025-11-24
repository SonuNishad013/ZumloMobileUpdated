import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import { strings } from "../../../constant/strings";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  getSeekerDetailsData,
  getTemporarySlots,
  getUserBookedSlots,
  getCurrentSuggestionsScheduleTime,
} from "../../../redux/selector";
import CommonButton from "../../../components/Buttons/commonButton";
import allActions from "../../../redux/actions";
import CommonLoader from "../../../components/Loader";
import { updateActivityByGuid } from "../../../helper/amendDataHelper";
import navigationString from "../../../navigation/navigationString";
import { discardActivityEnums } from "../../../constant/appConstant";
import moment from "moment";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import DatePicker from "react-native-date-picker";
import { imagePath } from "../../../assets/png/imagePath";
import {
  checkAvailability,
  validateTimeSlotGaps,
} from "../EditReplaceActivities/editReplaceHelperFunctions";
import BookedSlotsModal from "../../../components/CommonAlert/BookedSlotsModal";
import logger from "../../../constant/logger";

interface Props {
  navigation?: any;
  route: any;
}

const UpdateScheduleTimeScreen: React.FC<Props> = ({ navigation, route }) => {
  const {
    AigeneratedData,
    activitesData,
    from,
    ExistingID,
    purpuse,
    fromUpdateScheduleTime,
    replcaeApiPayload,
    editfor,
  } = route?.params;
  const [selectedSlot, setSelectedSlot] = useState<any>([]);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const [mySelectedSlots, setMySelectedSlots] = useState<any>({
    morning: [],
    afternoon: [],
    evening: [],
    night: [],
  });
  let userData = useSelector(getSeekerDetailsData());
  console.log("userData_", userData?.data);
  const bookedSlotsData = useSelector(getUserBookedSlots());
  const getTemporarySlots_ = useSelector(getTemporarySlots());
  const getCurrentSuggestionsScheduleTime_ = useSelector(
    getCurrentSuggestionsScheduleTime()
  );
  logger(
    "getCurrentSuggestionsScheduleTime_",
    getCurrentSuggestionsScheduleTime_
  );
  const [isLoading, setIsLoading] = useState(false);
  const isScheduleTimeArray = Array.isArray(activitesData?.scheduleTime);
  const [showDatePicker, setShowDatePicker] = useState<boolean[]>([false]);
  const [myPickedSlots, setMyPickedSlots] = useState<string[]>([]);
  const [showBookedSlots, setShowBookedSlots] = useState(false);

  const [pickedTimeSlots, setPickedTimeSlots] = useState<string[]>(
    isScheduleTimeArray
      ? activitesData?.scheduleTime
      : activitesData?.scheduleTimeArray
  );

  const handleDatePickerVisibility = (index: number, visible: boolean) => {
    const newVisibility = [...showDatePicker];
    newVisibility[index] = visible;
    setShowDatePicker(newVisibility);
  };
  const dispatch = useDispatch();

  const saveTemporarySlotsLocaly = () => {
    const checkResult = checkAvailability(
      bookedSlotsData.concat(getTemporarySlots_),
      pickedTimeSlots,
      activitesData?.duration
    );
    const currentSelectedTime = checkResult.map((item: any) => [
      item.start,
      item.end,
    ]);
    console.log("AIGENERATEDDATA____before___update22212", {
      AigeneratedData,
      currentSelectedTime,
      getTemporarySlots_,
      cancatData: currentSelectedTime.concat(getTemporarySlots_),
    });
    // Call this function after the Call_UpdateActivityScheduledTimeWithGuidAPI gives 200 status code
    //save user selected slots temporary bases until the user start the activities
    allActions?.dashboardAction?.saveTemporarySlotData(
      dispatch,
      currentSelectedTime.concat(getTemporarySlots_)
    );
    //need to update  the keys and value pair of these keys 1. isConflist to true 2. conflictMessage:""3. scheduleTime  and 4. frequancyCount
    const updates = {
      isConflicts: false,
      scheduleTime: pickedTimeSlots,
      conflictMessage: "",
      frequencyCount:
        activitesData?.frequency === "Daily"
          ? `${pickedTimeSlots.length} time`
          : activitesData?.frequencyCount,
    };

    updateActivityByGuid(AigeneratedData, activitesData?.guid, updates);
    console.log("AIGENERATEDDATA____after___update", AigeneratedData);
    //handle navigation here and send updated data to back to AI generated screen
    //need to handle navigation dynamically according to the responseType from AigeneratedData goals, wellness plan and activities
    console.log(
      "navigation____check_AigeneratedData?.responseType",
      AigeneratedData?.responseType
    );

    if (AigeneratedData?.responseType === "goals") {
      console.log("navigation____check__1");
      navigation?.navigate(navigationString?.GeneratedGoalAI, {
        goalsData: AigeneratedData,
        from: from,
        editfor,
        purpuse,
        replcaeApiPayload,
      });
      return;
    }
    if (AigeneratedData?.responseType === "activities") {
      console.log("navigation____check__2");

      navigation?.navigate(navigationString?.GeneratedActivitiesAI, {
        activitesData: AigeneratedData,
        from: from,
        ExistingID,
        purpuse,
        replcaeApiPayload,
      });
      return;
    }
    if (
      ["Wellness plan", "wellness", "wellness_gpt"].includes(
        AigeneratedData?.responseType
      )
    ) {
      console.log("navigation____check__3", AigeneratedData);

      navigation?.navigate(navigationString?.WellnessPlan, {
        ...route?.params,
        data: AigeneratedData,
        from: from,
        fromUpdateScheduleTime: fromUpdateScheduleTime + 1,
      });
      return;
    }
  };

  //New code
  const showToaster = (code: number, message: string) => {
    setToasterDetails({
      showToast: true,
      code,
      message,
    });
  };

  const Call_UpdateActivityScheduledTimeWithGuidAPI = async () => {
    //need to handle validation here for picked slots with already booked slots
    console.log("bookedSlotsData_", bookedSlotsData);
    const timeGapNotFollowed = validateTimeSlotGaps(
      pickedTimeSlots,
      activitesData?.duration
    );
    const hasDuplicates =
      new Set(pickedTimeSlots).size < pickedTimeSlots.length;
    const checkResult = checkAvailability(
      bookedSlotsData.concat(getCurrentSuggestionsScheduleTime_),
      pickedTimeSlots,
      activitesData?.duration
    );
    const updates = {
      isConflicts: false,
      scheduleTime: pickedTimeSlots,
      conflictMessage: "",
      frequencyCount:
        activitesData?.frequency === "Daily"
          ? `${pickedTimeSlots.length} ${
              pickedTimeSlots.length > 1 ? "times" : "time"
            }`
          : activitesData?.frequencyCount,
    };
    console.log("bookedSlotsData_checkResult", {
      checkResult,
      hasDuplicates,
      timeGapNotFollowed,
      updates,
      getTemporarySlots_,
      bookedSlotsData,
    });

    try {
      if (!userData?.data?.userId) {
        console.log("User ID is missing");
        setToasterDetails({
          showToast: true,
          code: 0,
          message: "User ID is missing",
        });
        return;
      }
      if (!activitesData?.guid) {
        console.log("ser ID is missin activity ID is missing");
        setToasterDetails({
          showToast: true,
          code: 0,
          message: "ser ID is missin activity ID is missing",
        });
        return;
      }
      if (hasDuplicates) {
        showToaster(
          0,
          `Slots should not be same, please select different time slots`
        );
        return;
      }
      if (timeGapNotFollowed) {
        showToaster(
          0,
          `Please select time slots with a gap of ${activitesData?.duration}`
        );
        return;
      }
      if (
        checkResult?.filter((item: any) => item?.available === false).length > 0
      ) {
        showToaster(
          0,
          `Selected time slots are not available, please select different time slots`
        );
        return;
      }
      const SendGoalGuid = editfor === "Goals" && purpuse === "Replace";
      console.log("SendGoalGuid", { SendGoalGuid, editfor, purpuse });

      let requestbody = {
        userId: userData.data.userId,
        trackId: SendGoalGuid
          ? AigeneratedData.assistantResponse.goals[0].goalGuid
          : AigeneratedData?.trackId,
        guid: activitesData?.guid,
        scheduleTime: pickedTimeSlots,
        frequencyCount:
          activitesData?.frequency === "Daily"
            ? `${pickedTimeSlots.length} ${
                pickedTimeSlots.length > 1 ? "times" : "time"
              }`
            : activitesData?.frequencyCount,
        parentCategory:
          AigeneratedData?.responseType === "Wellness plan"
            ? discardActivityEnums?.wellness
            : AigeneratedData?.responseType === "activities"
            ? discardActivityEnums?.activity
            : discardActivityEnums?.goals,
      };
      console.log("requestbody in session timeout", {
        requestbody,
        pickedTimeSlots,
      });

      setIsLoading(true);
      allActions.seekerDetails
        .UpdateActivityScheduledTimeWithGuidAPI(
          dispatch,
          requestbody,
          "SessionTimeOutAPI"
        )
        .then((resp: any) => {
          setIsLoading(false);
          console.log(
            "response in UpdateActivityScheduledTimeWithGuidAPI===>>>",
            resp
          );
          if (resp.statusCode == 200) {
            setToasterDetails({
              showToast: true,
              code: 1,
              message: resp?.message,
            });
            saveTemporarySlotsLocaly();
          } else {
            console.log("get_another_status_code");
            setToasterDetails({
              showToast: true,
              code: 0,
              message: resp?.message,
            });
          }
        });
    } catch (error) {
      setIsLoading(false);
      console.log("check error", error);
    }
  };

  return (
    console.log("handleItemPress_item_____obje__Main_returm", {
      selectedSlot,
      mySelectedSlots,
    }),
    (
      <ScreenWrapper statusBarColor={colors.backgroundTheme}>
        <View style={{ flex: 1 }}>
          <CommonHeader
            headerName={strings.EditActivity}
            onBackPress={() => navigation?.goBack()}
            mainContainer={{
              marginHorizontal: moderateScale(19),
              height: moderateScale(50),
              alignItems: "center",
            }}
            iconContainer={{ backgroundColor: colors?.backIconBg2 }}
            // info
            onInfo={() => setShowBookedSlots(true)}
          />
          <View
            style={{
              flex: 1,
              marginHorizontal: moderateScale(19),
              gap: moderateScale(20),
              marginTop: moderateScale(20),
            }}
          >
            <Text style={styles.TextStyle}>
              Select the start time for the activity
            </Text>
            <View style={styles.sectionHeader}>
              <Text style={[styles.TextStyle, styles.TextStyleBold]}>
                Start Time
              </Text>
              <View style={styles.divider} />
            </View>

            <FlatList
              data={pickedTimeSlots}
              keyExtractor={(item, index) => "key" + index}
              contentContainerStyle={styles.flatListContent}
              ListFooterComponent={
                <>
                  <CommonButton
                    btnName={"Check booked slots"}
                    mainContainer={{
                      width: "auto",
                      height: moderateScale(56),
                      marginTop: moderateScale(20),
                      marginBottom: moderateScale(10),
                      backgroundColor: colors.royalOrange,
                    }}
                    btnNameStyle={{
                      color: colors.prussianBlue,
                    }}
                    onPress={() => {
                      setShowBookedSlots(true);
                    }}
                  />

                  <CommonButton
                    btnName={strings.save_}
                    onPress={Call_UpdateActivityScheduledTimeWithGuidAPI}
                    mainContainer={styles?.startBtn}
                  />
                </>
              }
              renderItem={({ item, index }) => {
                console.log("item_rj", item);
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() => handleDatePickerVisibility(index, true)}
                      style={{
                        height: moderateScale(56),
                        width: "100%",
                        borderWidth: 1,
                        borderColor: colors.royalOrange,
                        borderRadius: 16,
                        justifyContent: "space-between",
                        paddingStart: 18,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingEnd: 18,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.SurfCrest,
                          fontSize: moderateScale(14),
                        }}
                      >
                        {`Schedule time is ${item}`}
                      </Text>
                      <Image
                        source={imagePath?.dropdown}
                        tintColor={true ? colors.SurfCrest : colors.royalOrange}
                      />
                    </TouchableOpacity>
                    <DatePicker
                      modal
                      open={showDatePicker[index]}
                      date={item ? moment(item, "HH:mm").toDate() : new Date()}
                      mode="time"
                      onConfirm={(date) => {
                        let shallowCopy = [...myPickedSlots];
                        shallowCopy.push(moment(date).format("hh:mm A"));
                        console.log("shallowCopy__", shallowCopy);
                        const zeroxofPickedTimeSlots = [...pickedTimeSlots];
                        zeroxofPickedTimeSlots[index] =
                          moment(date).format("hh:mm A");
                        console.log("zeroxofPickedTimeSlots__", {
                          zeroxofPickedTimeSlots,
                        });
                        setPickedTimeSlots(zeroxofPickedTimeSlots);
                        setMyPickedSlots(shallowCopy);
                        // setPickedTimeSlots(shallowCopy);
                        handleDatePickerVisibility(index, false);
                      }}
                      title={`Schedule time ${
                        item?.optionValue ? item?.optionValue : item
                      }`}
                      onCancel={() => {
                        handleDatePickerVisibility(index, false);
                      }}
                    />
                  </View>
                );
              }}
            />
          </View>
          {isLoading && <CommonLoader />}
        </View>
        {toasterDetails?.showToast && (
          <ToastApiResponse
            data={toasterDetails}
            setToasterDetails={setToasterDetails}
            code={toasterDetails?.code}
            message={toasterDetails?.message}
          />
        )}
        <BookedSlotsModal
          isVisible={showBookedSlots}
          title={"Already booked slots."}
          description={"Viewable only"}
          onNo={() => {
            setShowBookedSlots(false);
          }}
          onYes={() => {
            setShowBookedSlots(false);
          }}
          hideAlert={() => setShowBookedSlots(false)}
          textStyle={{ width: moderateScale(270) }}
          buttonTexts={["Close"]}
          bookedSlotsData={bookedSlotsData.concat(
            getCurrentSuggestionsScheduleTime_
          )}
        />
      </ScreenWrapper>
    )
  );
};

export default UpdateScheduleTimeScreen;

const styles = StyleSheet.create({
  TextStyle: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "400",
  },
  TextStyleBold: {
    fontWeight: "600",
  },
  sectionHeader: {
    gap: moderateScale(5),
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateScale(10),
  },
  divider: {
    borderBottomWidth: 0.4,
    borderColor: colors.SurfCrest,
    flex: 1,
  },
  listContainer: {
    gap: moderateScale(9),
    marginTop: moderateScale(9),
    paddingBottom: `${moderateScale(20)}%`,
  },
  slotButton: {
    width: "23%",
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: moderateScale(10),
    marginHorizontal: moderateScale(4),
    borderRadius: moderateScale(50),
    borderColor: colors.SurfCrest,
  },
  selectedSlot: {
    backgroundColor: colors.polishedPine, // Change to selected color
    borderColor: colors.SurfCrest, // Change border color when selected
  },
  timeText: {
    fontSize: textScale(13),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
  selectedText: {
    color: colors.white, // Change text color when selected
  },
  startBtn: {
    width: "auto",
    marginTop: moderateScale(40),
  },
  // sectionHeader: {
  //   marginHorizontal: moderateScale(15),
  //   flexDirection: "row",
  //   height: moderateScale(30),
  //   alignItems: "center",
  // },
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
  flatListContent: {
    gap: moderateScale(15),
    marginTop: moderateScale(30),
  },
});
