import React from "react";
import colors from "../../../constant/colors";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { moderateScale } from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StringConstant } from "./StringConstant";
import navigationString from "../../../navigation/navigationString";
import { strings } from "../../../constant/strings";
interface Props {
  navigation?: any;
  route?: any;
}

const JournalStepFour: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { isFrom } = route?.params;
  const continueClick = () => {
    navigation.navigate(navigationString.IndependentJournals, {
      isGoback: false,
      type: strings?.moodJournaling_,
      other: route?.params,
      isViewHistoryClicked: true,
      isFrom: isFrom || "Home",
    });
  };
  return (
    <ImageBackground
      style={[styles?.container, { paddingTop: insets.top }]}
      source={imagePath?.status}
    >
      <Image source={imagePath.tick_} style={styles?.imageStyle} />
      <Text style={styles?.titleText}>{"Journal saved"}</Text>
      <Text style={styles?.substitleText}>
        {
          "Thanks for sharing. Reflection is a powerful step toward healing and clarity."
        }
      </Text>
      <TouchableOpacity
        style={styles?.upgradeButton}
        onPress={() => continueClick()}
      >
        <Text style={styles?.upgradeText}>{StringConstant?.Continue}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default JournalStepFour;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  upgradeText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "600",
  },
  titleText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(24),
    fontWeight: "700",
    textAlign: "center",
    marginTop: moderateScale(150),
  },
  substitleText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "400",
    textAlign: "center",
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(20),
  },
  upgradeButton: {
    backgroundColor: colors?.polishedPine,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(25),
    marginBottom: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: colors?.polishedPine,
    marginTop: moderateScale(40),
    marginHorizontal: moderateScale(80),
  },
  imageStyle: {
    height: moderateScale(100),
    width: moderateScale(100),
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: moderateScale(100),
  },
});
