import { FunctionComponent } from "react";
import { Text, View } from "react-native";
import { getPlan } from "./NodataView";
import { strings } from "../../../../constant/strings";
import { NoActivity, NoVitals } from "../../../../assets";
import navigationString from "../../../../navigation/navigationString";

interface VitalProgressProps {
  VitalProgressData: any;
  navigation: any;
}

const VitalProgress: FunctionComponent<VitalProgressProps> = ({
  VitalProgressData,
  navigation,
}) => {
  console.log("VitalProgressData=-=-=>", VitalProgressData);

  function onManually(): void {}
  function onAddDevice(): void {
    navigation.navigate(navigationString.AddDevice, {
      from: "SummaryTab",
    });
  }

  return (
    <View>
      {VitalProgressData?.apiStatus ? (
        <Text>VitalProgress</Text>
      ) : (
        <>
          {getPlan(
            {
              title: strings.noVitalSummary,
              subTitle: strings.CreateVital,
              btnName: strings.addActivity,
              description: strings.vitalDescription,
              icon: NoVitals,
              isVitals: true,
            },
            function onProceed(): void {
              console.log("Navigating to add activity screen...");
            },
            onAddDevice,
            onManually
          )}
        </>
      )}
    </View>
  );
};

export default VitalProgress;
