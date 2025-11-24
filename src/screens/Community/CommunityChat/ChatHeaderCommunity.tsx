import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AIAssistanceIcon, BackIcon, Online } from "../../../assets";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { imagePath } from "../../../assets/png/imagePath";
import { strings } from "../../../constant/strings";
import { APPLY_STATUS } from "../../../constant/ENUM";

interface Props {
  data?: any;
  isLoadingAIResponse?: any;
  navigation?: any;
}
const ChatHeaderCommunity: React.FC<Props> = ({
  data,
  isLoadingAIResponse,
  navigation,
}: any) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation?.goBack()}
        style={styles.iconContainer}
      >
        <BackIcon />
      </TouchableOpacity>

      <Image
        source={
          data?.aliasProfilePicture
            ? { uri: data?.aliasProfilePicture }
            : imagePath?.dummyProfileIcon
        }
        style={styles.image}
        resizeMode={APPLY_STATUS?.contain}
      />
      <Text style={styles.profileName}>{data?.aliasName}</Text>
    </View>
  );
};

export default ChatHeaderCommunity;
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: moderateScale(19),
    paddingVertical: moderateScale(12.5),
    backgroundColor: colors?.backgroundTheme,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.grey,
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    height: moderateScale(30),
    width: moderateScale(30),
    backgroundColor: colors.colorBack,
    borderRadius: moderateScale(7),
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: colors?.polishedPine,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
    marginHorizontal: moderateScale(5),
  },
  profileName: {
    color: colors.SurfCrest,
    fontWeight: "600",
    fontSize: textScale(14),
  },

  image: {
    height: moderateScale(38),
    width: moderateScale(38),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(0.2),
    borderColor: colors?.prussianBlue,
    marginHorizontal: moderateScale(15),
  },
});
