import { useLayoutEffect } from "react";

import {
  useNavigation,
  useRoute,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";

const useHideTabBar = (
  hiddenTabRoutesArray: Array<any>,
  fallbackRoute: string
) => {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? fallbackRoute;
    navigation.setOptions({
      tabBarVisible: !hiddenTabRoutesArray.includes(routeName),
    });
  }, [navigation, route]);
};

export default useHideTabBar;
