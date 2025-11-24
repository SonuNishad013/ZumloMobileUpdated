import { Alert, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import HeaderTitleDescription from "../commonComponent/HeaderTitleDescription";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { strings } from "../../../../constant/strings";
import navigationString from "../../../../navigation/navigationString";
import { event } from "../../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../../utils/Storage/AsyncStorage";
import allActions from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import logger from "../../../../constant/logger";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import { getSeekerName } from "../../../../redux/selector";
interface Props {
  navigation?: any;
  route?: any;
}
const PasswordChanged: React.FC<Props> = ({ navigation, route }) => {
  const { purpose, data } = route.params;
  let seekerName = useSelector(getSeekerName());

  useEffect(() => {
    const init = async () => {
      const respone = await allActions?.OnBoarding?.PredefinedActivitiesToUser(
        null,
        API_FUN_NAMES?.PredefinedActivitiesToUser
      );
      logger("PredefinedActivitiesToUser_response_", respone);
    };

    if (purpose == "email_sign" || purpose == "phone_sign") {
      init();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getNav(purpose);
    }, 3000);
  }, []);
  const getNav = (key: any) => {
    switch (key) {
      case "email_sign":
        return navigation.navigate(navigationString.Policy, {
          purpose: purpose,
        });
      case "forgot_password":
        return navigation.navigate(navigationString.LoginInput);
      case "phone_sign":
        AsyncStorageUtils.storeItemKey(AsyncStorageUtils.LOGIN_TYPE, "phone");
        return navigation.navigate(navigationString.Policy, {
          purpose: purpose,
        });
      // AsyncStorageUtils.storeItemKey(AsyncStorageUtils.LOGIN_TYPE, "phone");
      // event.emit("login");
      // setTimeout(() => {
      //   navigation.navigate(navigationString.UserType);
      // }, 2000);
      case "CreateNewPassword":
        return navigation.navigate(navigationString?.Policy, {
          purpose: navigationString.CreateNewPassword,
        });
      case "haveDrDetails":
        return navigation.navigate(navigationString?.Policy, {
          purpose: "haveDrDetails",
          data: data,
        });
      default:
        navigation.navigate(navigationString.Policy);
        break;
    }
  };

  const findName = () => {
    let name = "";
    if (seekerName?.length) {
      name = `You did it, ${seekerName}!`;
    } else {
      name = `You did it!`;
    }
    return name;
  };
  const renderIconTitleDescription = () => (
    <HeaderTitleDescription
      iconShow={true}
      title={
        purpose == "email_sign" || "phone_sign"
          ? findName()
          : strings.passwordChanged
      }
      description={
        purpose == "email_sign"
          ? "Account? ✓\nSupport? On the way\nNext stop: feeling better"
          : purpose == "haveDrDetails"
          ? "Account? ✓\nSupport? On the way\nNext stop: feeling better"
          : purpose == "CreateNewPassword"
          ? "Account? ✓\nSupport? On the way\nNext stop: feeling better"
          : purpose == "phone_sign"
          ? "Account? ✓\nSupport? On the way\nNext stop: feeling better"
          : purpose == "phone_Login"
          ? strings?.phoneVerfiy
          : strings.passwordChangedDes
      }
      titleTxtStyle={style.titleTxtStyle}
      descriptionTxtStyle={style.desTxtStyle}
    />
  );

  // phone_Login

  return (
    <ScreenWrapper statusBarColor={colors.SaltBox}>
      <View style={style.mainContainer}>{renderIconTitleDescription()}</View>
    </ScreenWrapper>
  );
};

export default PasswordChanged;
const style = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    alignContent: "center",
    flex: 1,
    justifyContent: "center",
  },
  titleTxtStyle: {
    fontSize: textScale(30),
    fontWeight: "500",
    alignSelf: "center",
    marginTop: moderateScale(30),
    textAlign: "center",
  },
  desTxtStyle: {
    textAlign: "center",
    width: moderateScale(275),
    fontSize: textScale(20),
    alignSelf: "center",
  },
  btnContainer: {
    alignSelf: "center",
    flex: 0.14,
  },
});
