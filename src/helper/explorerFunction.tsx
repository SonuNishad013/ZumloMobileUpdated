import appConstant from "../constant/appConstant";
import * as AsyncStorageUtils from "../utils/Storage/AsyncStorage";
import ToastMsg from "../components/Hooks/useToast";
import { event } from "../navigation/emitter";
import { strings } from "../constant/strings";
export const onSelectExplorer = async (
  userData: any,
  dispatch: any,
  allActions: any,
  from?: any,
  navigation?: any,
  nav?: any,
  isPlanner?: boolean,
  DeviceID?: any
) => {
  console.log("check data in userData", isPlanner, nav);
  const userTokenn = await AsyncStorageUtils.getItem(
    AsyncStorageUtils.ACCESS_TOKEN
  );
  console.log("userTokennuserTokenn", userTokenn);
  let req = {
    userId: userData?.userId !== undefined ? userData?.userId : 0,
    strategyTypeId: ["fromExplorer", "ExplorerActivity"]?.includes(from)
      ? appConstant.explorer_planner_type.explorer
      : appConstant.explorer_planner_type.planner,
  };

  try {
    const response = await allActions.OnBoarding.SaveSeekerPlannerExplorerId(
      dispatch,
      req,
      "saveQuestion"
    );

    console.log("response for save planner=-?>", response);

    if (response?.statusCode === 200) {
      // Show success message
      ToastMsg("success", "Success", response?.message);

      // Emit events and handle navigation
      // nav?.emitEvent && event.emit(strings.login_);//We are not emitting on any explorer card click
      // nav?.emitEvent &&
      //   nav?.nav === "ResourceLibrary" &&
      //   event.emit(strings.resourceLibrary);// for now we are not using this and we don not have resource library

      // Store planner selection in AsyncStorage
      await AsyncStorageUtils.storeItemKey(
        AsyncStorageUtils.ISPLANNER_USER,
        JSON.stringify({
          isPlanner: isPlanner === undefined ? false : isPlanner,
          isSelected: true,
        })
      ); //saving user type in asyncstorage planner or explorer

      if (
        ["fromExplorer", "ExplorerActivity"]?.includes(from) &&
        nav?.emitEvent === false &&
        nav !== undefined //navigation part handling start from here
      ) {
        console.log("response for save planner=-?> here==>", DeviceID);
        navigation.navigate(nav?.nav, {
          onSwiperClick: false, //if we set it false then on click on next screen will come back from the back icon press
          userData: userData, // navigating to the desiganted screen with user data
          onSwiperChatClick: true,
          from,
          userTokenn,
          goBackOnMoodTracking: true,
          socketDetails: {
            // connectionId: connectionId,
            // connection: connection,
            // userData: userDetails,
            DeviceID: DeviceID,
          },
        });
      } else {
        console.log("response for save planner=-?> here==>DeviceID", DeviceID);

        event.emit(strings.login_);
        await AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.ISPLANNER_USER,
          JSON.stringify({
            isPlanner: isPlanner === undefined ? false : isPlanner,
            isSelected: true,
            forResourceLibrary: nav?.nav === "ResourceLibrary" ? true : false,
          })
        );
      }
      return response; // Return the resolved response
    } else {
      return response; // Return the response in case of failure too
    }
  } catch (err) {
    console.error("Error in SaveSeekerPlannerExplorerId:", err);
    return undefined; // Explicitly return undefined in case of an error
  }
};
