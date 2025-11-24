import { View, Text, StyleSheet, BackHandler, Alert } from "react-native";
import React, { ReactElement, useEffect } from "react";
import navigationString from "../../../navigation/navigationString";
import CommonButton from "../../../components/Buttons/commonButton";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import { WelcomeZumloICon, ZumloTextLogo } from "../../../assets";
import styles from "./styles"; // External styles for seekerButton
import { strings } from "../../../constant/strings";

interface Props {
  navigation?: any;
}

const LoginType: React.FC<Props> = ({ navigation }): ReactElement => {
  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      <View style={styles.container_}>
        <View style={styles.innerContainer}>
          <View
            style={{
              marginTop: moderateScale(-35),
              marginBottom: moderateScale(35),
            }}
          >
            <ZumloTextLogo />
          </View>

          <Text style={styles.titleText}>
            {"You’ve found your\nsafe space"}
          </Text>
          <Text style={styles.subtitleText}>
            {"Complete well-being, made personal "}
          </Text>
          <CommonButton
            btnName={"I’ve been here before"}
            onPress={() => navigation.navigate(navigationString.LoginInput)}
            mainContainer={styles.seekerButton}
            btnNameStyle={styles.seekerButtonText}
          />
          <CommonButton
            btnName={"I’m new to Zumlo "}
            onPress={() => navigation.navigate(navigationString.SeekerName)}
            mainContainer={styles.createAccountButton}
            btnNameStyle={styles.createAccountButtonText}
            TextFormatDisable
          />
        </View>
        <WelcomeZumloICon height={moderateScale(180)} />
      </View>
    </ScreenWrapper>
  );
};
export default LoginType;
