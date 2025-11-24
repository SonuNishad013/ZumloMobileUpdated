import { ImageBackground, StyleSheet, Text } from "react-native";
import React from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import { imagePath } from "../../../../assets/png/imagePath";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { strings } from "../../../../constant/strings";
import CommonButton from "../../../../components/Buttons/commonButton";
import navigationString from "../../../../navigation/navigationString";

interface Props {
  navigation?: any;
}
const ProfileCompletion: React.FC<Props> = ({ navigation }) => {
  return (
    <ScreenWrapper statusBarColor={"#3C839F"}>
      <ImageBackground
        source={imagePath?.RegistrationDone}
        style={styles?.mainContainer}
      >
        <Text style={styles?.heading}>
          {strings?.profileCompletion?.wooHoo}
        </Text>
        <Text style={styles?.description}>
          {strings?.profileCompletion?.profileSetup}
        </Text>
        <CommonButton
          btnName={"Continue"}
          onPress={() => {
            navigation?.navigate(navigationString.WellnessPlan);
          }}
        />
      </ImageBackground>
    </ScreenWrapper>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(19),
    paddingTop: moderateScale(80),
  },
  headingView: {
    alignItems: "center",
    paddingHorizontal: moderateScale(19),
    marginTop: moderateScale(80),
  },
  heading: {
    color: colors?.SurfCrest,
    fontWeight: "700",
    fontSize: textScale(26),
  },
  description: {
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(14),
    marginTop: moderateScale(20),
    width: moderateScale(300),
    textAlign: "center",
    marginBottom: moderateScale(30),
  },
});
export default ProfileCompletion;
