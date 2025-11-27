import React from "react";
import {
  AddAnonymousName,
  AddMembersInGroup,
  AllCommunityFeed,
  AllCommunityGroups,
  Community,
  CommunityChat,
  CommunityGroupDetails,
  ComnunityUserList,
  ConnectionList,
  CreateFeedForGroup,
  CreateGroup,
  DynamicPrompts,
  GroupAllMembers,
  IndependentFeed,
  OtherSeekerProfile,
  QuestionsIndex,
  ReportFeed,
  ReportGroup,
  ReportUser,
} from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationString from "./navigationString";
import useHideTabBar from "../components/Hooks/useHideTabBar";
import NotificationScreen from "../screens/Dashboard/Notifications";
import SavedFeedsIconsOnly from "../screens/Community/SavedFeeds";
import ViewMedia from "../screens/Community/CommunityComponents/ViewMedia";

const Stack = createNativeStackNavigator();
const routesWithoutTabs = [
  navigationString.AddAnonymousName,
  navigationString.CreateGroup,
  navigationString.AddMembersInGroup,
  navigationString.CommunityGroupDetails,
  navigationString?.CreateFeedForGroup,
  navigationString?.OtherSeekerProfile,
  navigationString?.AllCommunityGroups,
  navigationString.DynamicPrompts,
  navigationString.QuestionsIndex,
  navigationString.NotificationScreen,
  navigationString.AllCommunityFeed,
  navigationString?.ComnunityUserList,
  navigationString?.ConnectionList,
  navigationString?.ReportFeed,
  navigationString?.ReportGroup,
  navigationString?.ReportUser,
  navigationString?.GroupAllMembers,
  navigationString?.CommunityChat,
  navigationString?.IndependentFeed,
  navigationString?.SavedFeedsIconsOnly,
  navigationString?.ViewMedia,
];

const screens = [
  { name: navigationString.Community, component: Community },
  { name: navigationString.AddAnonymousName, component: AddAnonymousName },
  {
    name: navigationString.CreateGroup,
    component: CreateGroup,
  },
  {
    name: navigationString.AddMembersInGroup,
    component: AddMembersInGroup,
  },
  {
    name: navigationString.CommunityGroupDetails,
    component: CommunityGroupDetails,
  },
  {
    name: navigationString.CreateFeedForGroup,
    component: CreateFeedForGroup,
  },
  {
    name: navigationString.OtherSeekerProfile,
    component: OtherSeekerProfile,
  },
  {
    name: navigationString.AllCommunityGroups,
    component: AllCommunityGroups,
  },
  {
    name: navigationString.AllCommunityFeed,
    component: AllCommunityFeed,
  },
  { name: navigationString.DynamicPrompts, component: DynamicPrompts },
  { name: navigationString.QuestionsIndex, component: QuestionsIndex },
  { name: navigationString.NotificationScreen, component: NotificationScreen },
  { name: navigationString?.ComnunityUserList, component: ComnunityUserList },
  { name: navigationString?.ConnectionList, component: ConnectionList },
  { name: navigationString?.GroupAllMembers, component: GroupAllMembers },

  { name: navigationString?.ReportFeed, component: ReportFeed },
  { name: navigationString?.ReportGroup, component: ReportGroup },
  { name: navigationString?.ReportUser, component: ReportUser },
  { name: navigationString?.CommunityChat, component: CommunityChat },
  { name: navigationString?.IndependentFeed, component: IndependentFeed },
  {
    name: navigationString?.SavedFeedsIconsOnly,
    component: SavedFeedsIconsOnly,
  },
  { name: navigationString.ViewMedia, component: ViewMedia },
];
const CommunityStack = () => {


  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={navigationString?.Community}
    >
      {screens.map((item) => {
        return (
          <Stack.Screen
            key={item?.name}
            name={item?.name}
            component={item?.component}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        );
      })}
    </Stack.Navigator>
  );
};
export default CommunityStack;
