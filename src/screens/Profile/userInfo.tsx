import React from "react";
import { Text, View, StyleSheet, Image, ImageBackground } from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { imagePath } from "../../assets/png/imagePath";
import maskedEmail from "../../validations/maskedEmail";
import { capitalizeFirstLetter } from "../../constant/CustomHook/CommonFunctions";
import maskedMobile from "../../validations/maskedMobile";

const UserInformation = ({ UserInformationData }: any) => {
  const { basicInformation, contactInformation } = UserInformationData || {};

  return (
    <ImageBackground
      source={imagePath.ProfileBackground}
      style={styles.mainContainer}
      resizeMethod={"auto"}
      resizeMode={"stretch"}
    >
      <View style={styles.innerContainer}>
        {/* <Text style={styles.headerText}>Profile </Text> */}
        <View style={styles.profileContainer}>
          {!basicInformation?.profilePictureUrl ? (
            <>
              <View style={[styles.profileImage, styles?.letterContainer]}>
                <Text style={styles?.letterStyle}>
                  {basicInformation?.firstName?.charAt(0)}
                </Text>
              </View>
            </>
          ) : (
            <Image
              source={{ uri: basicInformation?.profilePictureUrl }}
              style={[styles.profileImage]}
              resizeMode="stretch"
            />
          )}

          <View style={styles.nameEmailContainer}>
            <Text style={styles.nameText}>
              Hi,{" "}
              {basicInformation?.firstName !== undefined
                ? capitalizeFirstLetter(basicInformation?.firstName)
                : ""}
            </Text>
            {contactInformation?.email && (
              <Text style={styles.emailText}>
                {contactInformation?.email !== undefined
                  ? maskedEmail(contactInformation?.email)
                  : maskedMobile(
                      contactInformation?.countryCode +
                        contactInformation?.phoneNumber
                    )}
              </Text>
            )}
            {basicInformation?.age > 0 && (
              <Text
                style={[styles?.ageText]}
              >{`Age ${basicInformation?.age}`}</Text>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default UserInformation;
const styles = StyleSheet.create({
  mainContainer: {
    height: moderateScale(200),
    width: width,
  },
  innerContainer: {
    justifyContent: "space-between",
    height: moderateScale(100),
    marginHorizontal: moderateScale(15),
  },
  headerText: {
    marginTop: moderateScale(20),
    fontSize: moderateScale(15),
    fontWeight: "600",
    color: colors.SurfCrest,
  },
  profileContainer: {
    flexDirection: "row",
    marginTop: moderateScale(30),
  },
  profileImage: {
    width: moderateScale(77),
    height: moderateScale(89),
    borderRadius: moderateScale(10),
    // borderWidth: 1,
  },
  nameEmailContainer: {
    justifyContent: "center",
    marginHorizontal: moderateScale(10),
    flex: 1,
  },
  nameText: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors.SurfCrest,
  },
  emailText: {
    marginTop: 5,
    fontSize: moderateScale(12),
    fontWeight: "600",
    color: colors.SurfCrest,
  },
  innerBoxContainer: {
    borderColor: colors.royalOrange,
    borderWidth: 1,
    borderRadius: moderateScale(50),
    padding: moderateScale(20),
    height: moderateScale(65),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerContentStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  commonTextStyle: {
    fontSize: moderateScale(12),
    fontWeight: "600",
    color: colors.SurfCrest,
  },
  commonTextStyle2: {
    fontSize: moderateScale(10),
    fontWeight: "600",
    color: colors.SurfCrest,
  },
  ageText: {
    fontSize: textScale(14),
    fontWeight: "600",
    marginTop: moderateScale(5),
    color: colors.SurfCrest,
  },
  letterContainer: {
    backgroundColor: colors?.OceanGreen,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors?.SurfCrest,
  },
  letterStyle: {
    fontSize: textScale(30),
    fontWeight: "700",
    fontFamily: "Poppins-Regular",
    color: colors.SurfCrest,
  },
});
