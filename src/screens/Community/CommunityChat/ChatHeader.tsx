import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BackIcon } from "../../../assets";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { imagePath } from "../../../assets/png/imagePath";
import { APPLY_STATUS } from "../../../constant/ENUM";
import { strings } from "../../../constant/strings";

interface Props {
  data?: any;
  isLoadingAIResponse?: any;
  navigation?: any;
}
const ChatHeader: React.FC<Props> = ({
  data,
  isLoadingAIResponse,
  navigation,
}: any) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity
          onPress={() => {
            navigation?.goBack();
          }}
          style={[
            styles.iconContainer,
            { opacity: isLoadingAIResponse ? 0.3 : 1 },
          ]}
        >
          <BackIcon />
        </TouchableOpacity>

        <View style={[styles.profileContainer]}>
          <View style={styles.imageContainer}>
            <Image
              source={
                data?.aliasProfilePicture
                  ? { uri: data?.aliasProfilePicture }
                  : imagePath?.dummyProfileIcon
              }
              style={styles.image}
              resizeMode={APPLY_STATUS?.contain}
            />
          </View>
          <View style={{ marginHorizontal: moderateScale(10) }}>
            <Text
              style={styles.profileName}
            >{`${strings?.Chat_with} ${data?.aliasName}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatHeader;
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: moderateScale(19),
    marginTop: moderateScale(10),
    paddingBottom: moderateScale(5),
  },
  headerLeft: {
    gap: moderateScale(15),
  },
  iconContainer: {
    height: moderateScale(30),
    width: moderateScale(30),
    backgroundColor: colors.colorBack,
    borderRadius: moderateScale(7),
    alignItems: "center",
    justifyContent: "center",

    marginTop: moderateScale(10),
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
  profileName: {
    color: colors.prussianBlue,
    fontWeight: "600",
    fontSize: textScale(14),
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
  profileStatus: {
    color: colors.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(10),
  },
  imageContainer: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.SurfCrest,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: moderateScale(0.2),
    borderColor: colors?.prussianBlue,
  },
  image: {
    height: moderateScale(38),
    width: moderateScale(38),
    borderRadius: moderateScale(20),
  },
});
