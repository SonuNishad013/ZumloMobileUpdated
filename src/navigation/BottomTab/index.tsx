import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ZumloTab from "./ZumloTab";
import DashboardStack from "../dashboardTab";
import CommuntyStack from "../communityStack";
import ProfileStack from "../profileStack";
import navigationString from "../navigationString";
import WellnessStack from "../wellnessStack";
import { BackHandler } from "react-native";
import SummaryStack from "../summaryStack";
import { strings } from "../../constant/strings";

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
};
interface Route {
  initialRouteName?: any;
}
const tabs = [
  { name: navigationString.Home, component: DashboardStack },
  { name: navigationString.Wellbeing, component: WellnessStack },
  { name: navigationString.Summary, component: SummaryStack },
  { name: navigationString.Community, component: CommuntyStack },
  { name: navigationString.Profile, component: ProfileStack },
];

export default function BottomTabRoute({
  initialRouteName,
}: {
  initialRouteName?: string;
}) {
  const [isWellbeingfirst, setIsWellbeingfirst] = useState(false);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Tab.Navigator
      tabBar={(props) => <ZumloTab {...props} />}
      initialRouteName={initialRouteName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: ((route) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "";
          const rootScreens = [
            navigationString.PlannerDashboard,
            navigationString.WellnessOverview,
            navigationString.Summary,
            navigationString.Community,
            navigationString.Profile,
          ];
          // If routeName is empty, it means we are at the root of the stack (initial route)
          if (!routeName || rootScreens.includes(routeName)) {
            return {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              elevation: 0,
              borderTopWidth: 0,
            };
          }
          return { display: "none" };
        })(route),
      })}
    >
      {tabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
        />
      ))}
    </Tab.Navigator>
  );
}
