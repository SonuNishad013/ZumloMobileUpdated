import { View } from "react-native";
import React from "react";
import colors from "../../../constant/colors";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import navigationString from "../../../navigation/navigationString";
import BtmBtn from "../zUserGoalscomponents/BtmBtn";
import Header from "../zUserGoalscomponents/Header";
import SpeedInput from "./SpeedInput";

interface Props {
  navigation?: any;
}
const SetIntensitySpeed: React.FC<Props> = ({ navigation }) => {
  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={{ backgroundColor: colors?.SurfCrest, flex: 1 }}>
        <Header headerName={"Set Intensity"} navigation={navigation} />
        <SpeedInput />
        <BtmBtn
          btnName={"SAVE"}
          onPress={() => navigation.navigate(navigationString?.MyActivity)}
        />
      </View>
    </ScreenWrapper>
  );
};

export default SetIntensitySpeed;
