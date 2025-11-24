import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  height,
  moderateScale,
  textScale,
} from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";
import navigationString from "../../../navigation/navigationString";
import { APPLY_STATUS } from "../../../constant/ENUM";
import { textLabelSize } from "../../../utils/TextConfig";
import logger from "../../../constant/logger";

interface Props {
  title?: any;
  description?: any;
  setIsCommunityAlert?: any;
  userData?: any;
  navigation?: any;
  categoryData?: any;
}

const CommunityPopUp: React.FC<Props> = ({
  title,
  description,
  setIsCommunityAlert,
  userData,
  navigation,
  categoryData,
}) => {
  logger("userData______", userData);
  return (
    <View
      style={{
        height: height,
        justifyContent: "center",
        marginTop: moderateScale(-100),
      }}
    >
      <ImageBackground
        style={styles.imageBackground}
        resizeMode={APPLY_STATUS?.contain}
        source={imagePath?.CommunityAlertBG}
      >
        <Text style={styles.welcomeText}>{"Let’s get you connected"}</Text>
        <Text style={styles.subText}>
          {
            "You’re one tap away from real talk, shared stories, and quiet cheers from people who get it."
          }
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(navigationString?.AddAnonymousName, {
              userName: userData?.basicInformation?.firstName,
              pictureUrl: userData?.basicInformation?.profilePictureUrl,
              categoryDataAvatar: categoryData,
            });
            setIsCommunityAlert(false);
          }}
          style={styles.touchableButton}
        />
      </ImageBackground>
      <Text style={styles.SubwelcomeText}>{"Tap here"}</Text>
    </View>
  );
};

export default CommunityPopUp;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors?.black07,
  },
  imageBackground: {
    height: moderateScale(450),
    width: moderateScale(292),
    paddingHorizontal: moderateScale(20),
    alignSelf: "center",
  },
  welcomeText: {
    fontSize: textScale(20),
    fontWeight: "700",
    color: colors?.royalOrangeDark,
    textAlign: "center",
    marginTop: moderateScale(60),
    // width: "89%",
    alignSelf: "center",
  },
  SubwelcomeText: {
    fontSize: textLabelSize?.subtTitleFont,
    fontWeight: "500",
    color: colors?.prussianBlue,
    textAlign: "center",
    marginTop: moderateScale(10),
    marginLeft: moderateScale(10),
    alignSelf: "center",
  },
  subText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    textAlign: "center",
    marginTop: moderateScale(15),
    width: "99%",
    alignSelf: "center",
  },
  touchableButton: {
    height: moderateScale(90),
    width: moderateScale(90),
    borderRadius: moderateScale(50),
    backgroundColor: colors?.transparent,
    position: "absolute",
    bottom: -10,
    alignSelf: "center",
  },
});
