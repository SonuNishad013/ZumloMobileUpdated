import React, { ReactElement } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import {
  height,
  moderateScale,
  textScale,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { imagePath } from "../../../assets/png/imagePath";
import GreetingsCard from "../../../components/Cards/GreetingsCard";
import { capitalizeFirstLetter } from "../../../constant/CustomHook/CommonFunctions";
import { styles } from "./style";
import { APPLY_STATUS } from "../../../constant/ENUM";
interface Props {
  greetingMsg?: any;
  userData?: any;
  isLoading?: boolean;
  UserType: any;
}
const UserInfoWithQuates: React.FC<Props> = ({
  greetingMsg,
  userData,
  isLoading,
  UserType,
}): ReactElement => {
  let arr = [
    {
      id: 23326,
      userId: 436,
      category: "physical_health",
      type: "Tips",
      content:
        "Aim for a 10-minute daily walk to improve cardiovascular health and reduce stress.",
      isAIGenerated: true,
    },
    {
      id: 38310,
      userId: 1185,
      category: "emotional_health",
      type: "Quote",
      content:
        "Your value lies not in your appearance, but in the light you bring to the world. Let your inner radiance shine.",
      isAIGenerated: true,
    },
  ];
  return (
    <>
      <View style={style?.container}>
        <View style={style.profileContainer}>
          {!userData?.basicInformation?.profilePictureUrl ? (
            <>
              <View style={[style.profileImage, style?.mainView]}>
                <Text style={style?.textStyle}>
                  {userData?.basicInformation?.firstName?.charAt(0)}
                </Text>
              </View>
            </>
          ) : (
            <Image
              source={
                userData?.basicInformation?.profilePictureUrl
                  ? { uri: userData?.basicInformation?.profilePictureUrl }
                  : imagePath.ProfileIcon
              }
              style={style.profileImage}
              resizeMode={APPLY_STATUS?.stretch}
            />
          )}
          <View style={style.nameEmailContainer}>
            <Text style={style.nameText}>
              Hi,{" "}
              {userData?.basicInformation?.firstName
                ? capitalizeFirstLetter(userData?.basicInformation?.firstName)
                : ""}
            </Text>
          </View>
        </View>

        <GreetingsCard
          QuatesData={greetingMsg !== undefined ? greetingMsg : arr}
        />
      </View>
    </>
  );
};
export default UserInfoWithQuates;
const style = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    height: height / 8.5,
    alignItems: "center",
  },
  mainView: {
    backgroundColor: colors?.OceanGreen,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors?.SurfCrest,
  },
  textStyle: {
    fontSize: textScale(30),
    fontWeight: "700",
    fontFamily: "Poppins-Regular",
    color: colors.SurfCrest,
  },
  profileImage: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(32),
  },
  nameEmailContainer: {
    justifyContent: "center",
    marginHorizontal: moderateScale(10),
  },
  nameText: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors.SurfCrest,
  },
  container: {
    justifyContent: "space-between",
    backgroundColor: colors.backgroundTheme,
    borderBottomLeftRadius: moderateScale(25),
    borderBottomRightRadius: moderateScale(25),
    paddingHorizontal: moderateScale(15),
    paddingBottom: moderateScale(15),
  },
});
