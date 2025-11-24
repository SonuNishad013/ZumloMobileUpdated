import React from "react";
import navigationString from "./navigationString";
import {
  AddBloodPressureVitals,
  AddDevice,
  AddHeartRate,
  AddManualReading,
  AddSleep,
  AddSteps,
  DynamicPrompts,
  QuestionsIndex,
} from "../screens";
import PairDevice from "../screens/AddDevices/PairDevice";
import DeviceConnect from "../screens/AddDevices/DeviceConnect";

const screens = [
  { name: navigationString.AddManualReading, component: AddManualReading },
  { name: navigationString.AddDevice, component: AddDevice },
  { name: navigationString.PairDevice, component: PairDevice },
  { name: navigationString.DeviceConnect, component: DeviceConnect },
  { name: navigationString.AddSteps, component: AddSteps },
  { name: navigationString.AddHeartRate, component: AddHeartRate },
  { name: navigationString.AddSleep, component: AddSleep },
  {
    name: navigationString.AddBloodPressureVitals,
    component: AddBloodPressureVitals,
  },
  { name: navigationString.DynamicPrompts, component: DynamicPrompts },
  { name: navigationString.QuestionsIndex, component: QuestionsIndex },
];
export default function (Stack: any, name: any) {
  return (
    <>
      {screens.map(({ name, component }) => (
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
