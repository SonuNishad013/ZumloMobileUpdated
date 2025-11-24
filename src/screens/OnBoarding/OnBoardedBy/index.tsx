import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import HeaderWithSkip from "./HeaderWithSkip";
import BgIcon from "./BgIcon";
import DoctorDetails from "./DoctorDetails";
import BtmBtn from "../../UserGoals/zUserGoalscomponents/BtmBtn";
import navigationString from "../../../navigation/navigationString";
import { moderateScale } from "../../../constant/responsiveStyle";
import { strings } from "../../../constant/strings";
interface Props {
  navigation?: any;
  route?: any;
}
const OnBoardedBy: React.FC<Props> = ({ navigation, route }) => {
  const { data } = route?.params;
  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <BgIcon />
      <ScrollView contentContainerStyle={styles?.contentContainerStyle}>
        <DoctorDetails docterInfo={data} />
      </ScrollView>
      <BtmBtn
        btnName={strings?.continue}
        onPress={() =>
          navigation?.navigate(navigationString?.RegDoneProfileDetails)
        }
      />
    </ScreenWrapper>
  );
};
export default OnBoardedBy;

const styles = StyleSheet.create({
  contentContainerStyle: { paddingBottom: moderateScale(100) },
});
