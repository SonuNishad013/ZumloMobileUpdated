import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import navigationString from "../../../navigation/navigationString";
import { RightArrowWithBackgrpoundIcon } from "../../../assets";
import { textLabelSize } from "../../../utils/TextConfig";
import { dashboardClickENUM } from "../../../constant/ENUM";

interface ProfileCardProps {
  navigation: any;
}
const ProfileCard: React.FC<ProfileCardProps> = ({
  navigation,
}: ProfileCardProps) => {
  return (
    <ImageBackground
      style={stylesInline?.Affirmations_bg}
      resizeMode="stretch"
      source={imagePath?.d_blue_4}
    >
      <View style={stylesInline?.position}>
        <Text style={stylesInline.overlayText}>
          {"Your story makes me better"}
        </Text>
        <Text style={stylesInline.suboverlayText}>
          {
            "The more I understand your world... the better I can support you..."
          }
        </Text>
        <TouchableOpacity
          style={stylesInline.upgradeButtonContainer}
          onPress={() => {
            navigation.navigate(navigationString.MyProfile, {
              from: dashboardClickENUM?.Dashboard,
            });
          }}
        >
          <View
            style={{
              width: moderateScale(25),
              height: moderateScale(25),
            }}
          />
          <Text style={stylesInline.upgradeText}>{"Share my story"}</Text>
          <RightArrowWithBackgrpoundIcon
            width={`${moderateScale(25)}`}
            height={`${moderateScale(25)}`}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ProfileCard;
const stylesInline = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  overlayText: {
    textAlign: "center",
    color: colors.royalOrange, // or whatever stands out on the SVG
    fontSize: textLabelSize?.titleFont,
    fontWeight: "600",
  },
  suboverlayText: {
    textAlign: "center",
    color: colors.SurfCrest, // or whatever stands out on the SVG
    fontSize: textLabelSize?.subtTitleFont,
    fontWeight: "600",
    marginTop: moderateScale(10),
    fontStyle: "italic",
    marginHorizontal: moderateScale(50),
  },
  upgradeButtonContainer: {
    backgroundColor: "rgb(54,87,103)",
    padding: moderateScale(5),
    borderRadius: moderateScale(20),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: moderateScale(15),
    marginHorizontal: moderateScale(40),
  },
  upgradeText: {
    color: colors.SurfCrest,
    fontSize: textScale(12),
    fontWeight: "600",
    marginHorizontal: moderateScale(5),
    textAlign: "center",
  },
  contain: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  position: {
    // position: "absolute",
    alignSelf: "center",
  },
  flatlistStyle: {
    gap: moderateScale(10),
  },
  Affirmations_bg: {
    height: moderateScale(140),

    justifyContent: "center",
  },
  headerView: {
    paddingHorizontal: moderateScale(19),
    marginTop: moderateScale(10),
  },
});
