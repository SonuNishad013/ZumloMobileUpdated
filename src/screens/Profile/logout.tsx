import React, { ReactElement, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import { DeleteAccount_, LogoutIcon } from "../../assets";
import colors from "../../constant/colors";
import LogoutModal from "../../components/CommonAlert/logoutModal";
import { strings } from "../../constant/strings";
import allActions from "../../redux/actions";
import { useDispatch } from "react-redux";
import navigationString from "../../navigation/navigationString";
import * as AsyncStorage from "../../utils/Storage/AsyncStorage";
import RNSecureKeyStore from "react-native-secure-key-store";
interface Props {
  navigation?: any;
  userLoginType?: any;
  userData?: any;
}

const Logout: React.FC<Props> = ({
  navigation,
  userLoginType,
  userData,
}): ReactElement => {
  const dispatch: any = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [deleteAccountAlert, setDeleteAccountAlert] = useState(false);
  const SignOut = async () => {
    let requestbody = {};
    allActions.Auth.SignOut(dispatch, requestbody, "SignOut")
      .then((response) => {
        clearAllAppData();
        console.log("SignOut");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearAllAppData = async () => {
    try {
      // Clear AsyncStorage
      // await AsyncStorage.clear();

      // Remove Secure Key Store keys manually

      const secureKeys = [
        AsyncStorage.KEY_TOKEN,
        AsyncStorage.ACCESS_TOKEN,
        AsyncStorage.LOGIN_USER_DATA,
        AsyncStorage.ISPLANNER_USER,
        AsyncStorage.ACCESS_TOKEN2,
        AsyncStorage.DUMMY,
        AsyncStorage.USERINFO,
        AsyncStorage.MPIN_TOKEN,
        AsyncStorage.MPIN_SET,
        AsyncStorage.BIOMETRIC_SET,
        AsyncStorage.USERDATA,
        AsyncStorage.MPIN_USERDATA,
        AsyncStorage.SOURCE_ID,
        AsyncStorage.BIOMETRICTYPE,
        AsyncStorage.GET_STARTED_SCREEN,
        AsyncStorage.GET_INVEST_EASY_MSG,
        AsyncStorage.GET_EASY_LINK_MSG,
        AsyncStorage.GLOBALCODEWITHCATEGORY,
        AsyncStorage.LOGIN_TYPE,
        AsyncStorage.SEEKERS_PROFILE_DATA,
        AsyncStorage.IS_WELLNESSPLAN_SELECTED,
        AsyncStorage.PRODUCT_TOUR_COMPLETED,
        AsyncStorage.PRIVACY_POLICY_IS_ENABLED,
        AsyncStorage.FCM_TOKEN,
        AsyncStorage.SEEKER_COMMUNITY_PROFLE,
        AsyncStorage.COUNTRY_CODE,
        AsyncStorage.ONBOARDING_QUESTIONS_RESPONSE,
      ]; // <-- Replace with your real keys

      for (const key of secureKeys) {
        try {
          await RNSecureKeyStore.remove(key);
        } catch (err) {
          console.warn(`Failed to remove key ${key}`, err);
        }
      }

      Alert.alert("Success", "All app cache and secure storage cleared.");
    } catch (err) {
      console.error("Error clearing app data", err);
      Alert.alert("Error", "Failed to clear app data");
    }
  };

  return (
    <View>
      {userLoginType == "email" || userLoginType == "phone" ? (
        <TouchableOpacity
          style={{
            // shadowColor: 'rgba(0, 0, 0, 1)',
            // shadowOpacity: 0.5,
            // shadowRadius: 5,
            // shadowOffset: {
            //   height: 5,
            //   width: 5,
            // },
            flexDirection: "row",
            marginTop: moderateScale(20),
            // backgroundColor:'grey',
            marginHorizontal: moderateScale(15),
            height: moderateScale(50),
            alignItems: "center",
            borderRadius: moderateScale(10),
            // borderRadius:moderateScale(5),
            borderColor: colors.royalOrange,
            borderWidth: moderateScale(1),
          }}
          onPress={() => {
            setDeleteAccountAlert(true);
          }}
        >
          <View style={styles.iconContainer}>
            <DeleteAccount_
              width={`${moderateScale(20)}`}
              height={`${moderateScale(20)}`}
            />
          </View>
          <Text
            style={{
              marginHorizontal: moderateScale(15),
              fontSize: textScale(13),
              color: "#FF9D48",
            }}
          >
            {"Delete Account"}
          </Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        style={{
          // shadowColor: 'rgba(0, 0, 0, 1)',
          // shadowOpacity: 0.5,
          // shadowRadius: 5,
          // shadowOffset: {
          //   height: 5,
          //   width: 5,
          // },
          borderWidth: moderateScale(1),
          flexDirection: "row",
          marginTop: moderateScale(20),
          backgroundColor: colors.SurfCrest,
          marginHorizontal: moderateScale(15),
          height: moderateScale(50),
          alignItems: "center",
          borderRadius: moderateScale(10),
          borderColor: colors.prussianBlue,
        }}
        onPress={() => setShowAlert(true)}
      >
        <View style={styles.iconContainer}>
          <LogoutIcon
            width={`${moderateScale(20)}`}
            height={`${moderateScale(20)}`}
          />
        </View>
        <Text
          style={{
            marginHorizontal: moderateScale(15),
            fontSize: textScale(13),
            color: colors.prussianBlue,
          }}
        >
          {"Logout"}
        </Text>
      </TouchableOpacity>

      {/* <LogoutModal
        isVisible={showAlert}
        onNo={() => setShowAlert(false)}
        onYes={SignOut}
        hideAlert={() => setShowAlert(false)}
      /> */}
      {/* <LogoutModal
        isVisible={deleteAccountAlert}
        title={strings.areyousure}
        description={strings.deleteuser}
        onNo={() => setDeleteAccountAlert(false)}
        onYes={() => {
          setDeleteAccountAlert(false);
          onDeleteAccount();
        }}
        hideAlert={() => setDeleteAccountAlert(false)}
        textStyle={{ width: moderateScale(270) }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    height: moderateScale(50),
    marginHorizontal: moderateScale(15),
    marginTop: moderateScale(15),
    borderColor: colors.royalOrange,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(5),
    justifyContent: "center",
  },
  logoutContent: {
    flexDirection: "row",
  },
  iconContainer: {
    width: moderateScale(60),
    alignItems: "center",
  },
  logoutText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.royalOrange,
    marginHorizontal: moderateScale(10),
  },
  deleteAccountButton: {
    height: moderateScale(50),
    marginHorizontal: moderateScale(15),
    marginTop: moderateScale(15),
    borderColor: colors.royalOrange,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteAccountText: {
    fontStyle: "italic",
    textDecorationLine: "underline",
    color: colors.themeColor,
    fontSize: textScale(14),
    fontWeight: "600",
  },
});

export default Logout;
