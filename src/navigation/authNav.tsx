import React from "react";
import navigationString from "./navigationString";
import {
  Login,
  LoginInput,
  WelcomeScreen,
  Policy,
  ForgotPassword,
  CreateNewPassword,
  PasswordChanged,
  OtpValidation,
  Register,
  OnBoardedBy,
  RegDoneProfileDetails,
  InviteduserBasicDetails,
  InviteduserContactDetails,
  InviteduserMedicalDetails,
  DiagnosedScreen,
  SleepTrack,
  SocialConnection,
  PhysicalHealth,
  PlannerActivity,
  SeekerName,
  QuestionsIndex,
  DynamicPrompts,
  OnboardingPrivacyPolicy,
} from "../screens";
import SubscriptionPlan from "../screens/SubscriptionPlan";

export const AuthScreens = [
  { name: navigationString.Login, component: Login },
  { name: navigationString.WelcomeScreen, component: WelcomeScreen },
  { name: navigationString.Register, component: Register },
  { name: navigationString.LoginInput, component: LoginInput },
  { name: navigationString.ForgotPassword, component: ForgotPassword },
  { name: navigationString.CreateNewPassword, component: CreateNewPassword },
  { name: navigationString.PasswordChanged, component: PasswordChanged },
  { name: navigationString.OtpValidation, component: OtpValidation },
  { name: navigationString.OnBoardedBy, component: OnBoardedBy },
  {
    name: navigationString.InviteduserContactDetails,
    component: InviteduserContactDetails,
  },
  {
    name: navigationString.InviteduserBasicDetails,
    component: InviteduserBasicDetails,
  },
  {
    name: navigationString.InviteduserMedicalDetails,
    component: InviteduserMedicalDetails,
  },
  { name: navigationString.Policy, component: Policy },
  {
    name: navigationString.RegDoneProfileDetails,
    component: RegDoneProfileDetails,
  },
  { name: "DiagnosedScreen", component: DiagnosedScreen },
  { name: "SleepTrack", component: SleepTrack },
  { name: "SocialConnection", component: SocialConnection },
  { name: "PhysicalHealth", component: PhysicalHealth },
  { name: "Activity", component: PlannerActivity },

  { name: navigationString.QuestionsIndex, component: QuestionsIndex },
  { name: navigationString.DynamicPrompts, component: DynamicPrompts },

  {
    name: navigationString.SeekerName,
    component: SeekerName,
  },
  {
    name: navigationString.SubscriptionPlan,
    component: SubscriptionPlan,
  },
  {
    name: navigationString.OnboardingPrivacyPolicy,
    component: OnboardingPrivacyPolicy,
  },
];
export default function (Stack: any, name: any) {
  return (
    <>
      {AuthScreens.map(({ name, component }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      ))}
    </>
  );
}
