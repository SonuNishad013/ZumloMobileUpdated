import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import { strings } from "../../../../constant/strings";
import colors from "../../../../constant/colors";
import { getPlan } from "./NodataView";
import { NoVitals } from "../../../../assets";
interface ActivityListingProps {
  addDevice: any;
  AddVitalManual: any;
}

const Vitals: FunctionComponent<ActivityListingProps> = ({
  addDevice,
  AddVitalManual,
}) => {
  return (
    <View style={styles.container}>
      {getPlan(
        {
          title: "Your body’s trying to tell you something ",
          subTitle:
            "Let’s keep an eye on the stuff that keeps you going—heartbeat, sleep, steps. Add it once, and I’ll track the rest. ",
          btnName: strings.addActivity,
          description: "",
          icon: NoVitals,
          isVitals: true,
          textColor: colors?.SurfCrest,
          backgroundColor: colors?.themeColor,
        },
        () => {},
        addDevice,
        AddVitalManual
      )}
    </View>
  );
};
export default Vitals;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
