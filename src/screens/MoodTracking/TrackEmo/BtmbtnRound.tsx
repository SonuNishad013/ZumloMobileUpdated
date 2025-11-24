import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RoundButton from "../../../components/Buttons/roundButton";
import { moderateScale } from "../../../constant/responsiveStyle";
import { IconsNext } from "../../../assets";
import navigationString from "../../../navigation/navigationString";

interface Props {
  navigation?: any;
  onPress?: () => void;
}
const BtmbtnRound: React.FC<Props> = ({ navigation, onPress }) => {
  return (
    <View>
      <RoundButton
        mainContainer={style?.mainContainer}
        SvgIcon={IconsNext}
        onPress={onPress}
      />
    </View>
  );
};

export default BtmbtnRound;

const style = StyleSheet.create({
  mainContainer: {
    alignSelf: "center",
    marginTop: moderateScale(80),
  },
});
