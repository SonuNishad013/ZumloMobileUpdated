import { useNavigationContainerRef } from "@react-navigation/native";
import {
  community_Group_Invitation,
  community_Join_Request,
} from "../constant/notificationFormName";
import navigationString from "./navigationString";

const routenavigationRef = useNavigationContainerRef<any>();
export const handleNotificationNavigations = (notificationData: any) => {
  console.log("Handle Notification:", notificationData);
  const navigateToScreen = () => {
    console.log("notificationData->", notificationData);

    if (notificationData?.data?.FormName === community_Group_Invitation) {
      routenavigationRef.current?.navigate(navigationString?.Community, {
        screen: navigationString?.CommunityGroupDetails,
        params: {
          from: community_Group_Invitation,
          groupId: notificationData?.data?.Id,
        },
      });
    } else if (notificationData?.data?.FormName === community_Join_Request) {
      routenavigationRef.current?.navigate(navigationString?.Community, {
        screen: navigationString?.NotificationScreen,
        params: {
          from: community_Group_Invitation,
          groupId: notificationData?.data?.Id,
        },
      });
    } else {
      routenavigationRef.current?.navigate(navigationString?.ActivitesDetails, {
        id: notificationData?.data?.Id,
        from: "NotificationClick", //This ref is used for activity clicked navigation also
      });
    }
  };

  if (routenavigationRef.current) {
    console.log("you also come here in killed state ");
    navigateToScreen();
  } else {
    console.log("Navigation reference not ready. Retrying...");
    setTimeout(() => {
      navigateToScreen();
    }, 3000);
  }
};
