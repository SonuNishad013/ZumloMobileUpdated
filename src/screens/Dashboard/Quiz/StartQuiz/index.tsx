import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import CommonHeader from "../../../../components/Header/commonHeader";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { PersonOrg } from "../../../../assets";
import CommonButton from "../../../../components/Buttons/commonButton";
import navigationString from "../../../../navigation/navigationString";

interface Props {
  navigation?: any;
}

const StartQuiz: React.FC<Props> = ({ navigation }) => {
  return (
    <ScreenWrapper statusBarColor={colors.SaltBox}>
      <CommonHeader
        onBackPress={() => navigation?.goBack()}
        headerName="Quiz"
        mainContainer={styles.headerContainer}
      />
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.headerText}>
            {"Let's enhance positive thinking"}
          </Text>

          <Text style={styles.subHeaderText}>
            {`Let's elevate your mindset together. Focus on positivity every day`}
          </Text>
        </View>

        <View>
          <PersonOrg />
        </View>
        <View />
        <CommonButton
          onPress={() => navigation?.navigate(navigationString?.QuizQuestions)}
          btnName={"Lets's start"}
          mainContainer={styles.buttonContainer}
        />
        <Text onPress={() => {}} style={styles.skipText}>
          Skip
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default StartQuiz;

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: moderateScale(19),
    paddingBottom: moderateScale(10),
    paddingTop: moderateScale(15),
  },
  mainContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  headerText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.SurfCrest,
    alignSelf: "center",
  },
  subHeaderText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.SurfCrest,
    textAlign: "center",
    width: moderateScale(274),
    marginTop: moderateScale(20),
  },
  buttonContainer: {
    width: "auto",
    marginHorizontal: moderateScale(19),
  },
  skipText: {
    fontSize: textScale(14),
    color: colors.SurfCrest,
    fontWeight: "500",
    marginBottom: moderateScale(20),
  },
});
