import React, { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";
import Tabbar from "./BottomTabBar/TabBar";
import {
  CommunityBottomIcon,
  GraphBottomIcon,
  HomeBottomIcon,
  ProfileBottomIcon,
  SecondBottomIcon,
} from "../../assets";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

const icons: Record<string, React.ReactElement> = {
  Home: (
    <HomeBottomIcon
      height={`${moderateScale(30)}`}
      width={`${moderateScale(30)}`}
    />
  ),
  Wellbeing: (
    <SecondBottomIcon
      height={`${moderateScale(30)}`}
      width={`${moderateScale(30)}`}
    />
  ),
  Summary: (
    <GraphBottomIcon
      height={`${moderateScale(30)}`}
      width={`${moderateScale(30)}`}
    />
  ),
  Community: (
    <CommunityBottomIcon
      height={`${moderateScale(30)}`}
      width={`${moderateScale(30)}`}
    />
  ),
  Profile: (
    <ProfileBottomIcon
      height={`${moderateScale(30)}`}
      width={`${moderateScale(30)}`}
    />
  ),
};

interface Route {
  name: string;
  label: string;
}

const routes: Route[] = [
  { name: "Home", label: "Home" },
  { name: "Wellbeing", label: "Wellbeing" },
  { name: "Summary", label: "Summary" },
  { name: "Community", label: "Community" },
  { name: "Profile", label: "Profile" },
];

const ZumloTab: React.FC<any> = (props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let keyboardEventListeners: any;

    if (Platform.OS === "android") {
      keyboardEventListeners = [
        Keyboard.addListener("keyboardDidShow", () => setVisible(false)),
        Keyboard.addListener("keyboardDidHide", () => setVisible(true)),
      ];
    }

    return () => {
      if (Platform.OS === "android") {
        keyboardEventListeners?.forEach((eventListener: any) =>
          eventListener.remove()
        );
      }
    };
  }, []);

  return (
    <Tabbar
      tabs={routes.map(({ name, label }) => ({
        name,
        focusedIcon: icons[name],
        activeIcon: React.cloneElement(icons[name], {
          height: `${moderateScale(25)}`,
          width: `${moderateScale(25)}`,
        }),
        inactiveIcon: React.cloneElement(icons[name], {
          height: `${moderateScale(25)}`,
          width: `${moderateScale(25)}`,
        }),
        label,
      }))}
      tabBarContainerBackground={true ? colors.backgroundTheme : "#0095DA"}
      tabBarBackground={colors.SurfCrest}
      activeTabBackground={true ? colors.backgroundTheme : "#0095DA"}
      transitionSpeed={100}
      labelStyle={{ color: "#ffff", fontWeight: "600", fontSize: textScale(10) ,textAlign:'center',marginTop:5}}
      onTabChange={(event) => props.navigation.navigate(event?.name)}
      visible={visible}
      {...props}
    />
  );
};

export default ZumloTab;
