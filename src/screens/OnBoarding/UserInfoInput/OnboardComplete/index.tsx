import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import LinearGradient from "react-native-linear-gradient";
import { ExcellentIcon, MedalIcon } from "../../../../assets";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { strings } from "../../../../constant/strings";
import CommonButton from "../../../../components/Buttons/commonButton";
import navigationString from "../../../../navigation/navigationString";
interface Props {
  navigation?: any;
}
const OnboardComplete: React.FC<Props> = ({ navigation }) => {
  const renderIcon = () => {
    return (
      <View style={styles?.iconContainer}>
        <MedalIcon />
      </View>
    );
  };
  const renderHeading = () => {
    return (
      <View style={styles?.headerContainer}>
        <Text style={styles?.heading}>
          {strings?.onboardComplete?.keepThriving}
        </Text>
        <Text style={styles?.headerText}>
          {strings?.onboardComplete?.congratulations}
        </Text>
      </View>
    );
  };
  const renderButton = () => {
    return (
      <View style={styles?.btnContainer}>
        <CommonButton
          btnName={"Continue"}
          onPress={() =>
            navigation?.navigate(navigationString?.ProfileCompletion)
          }
        />
      </View>
    );
  };
  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <LinearGradient
        colors={[colors?.prussianBlue, colors?.polishedPine]}
        style={styles.linearGradient}
      >
        {renderIcon()}
        {renderHeading()}
        {renderButton()}
      </LinearGradient>
    </ScreenWrapper>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingHorizontal: moderateScale(21),
  },
  heading: {
    fontSize: textScale(31),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  iconContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: { flex: 0.3 },
  headerText: {
    fontWeight: "400",
    fontSize: textScale(14),
    color: colors?.SurfCrest,
    marginTop: moderateScale(16),
  },
  btnContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default OnboardComplete;
