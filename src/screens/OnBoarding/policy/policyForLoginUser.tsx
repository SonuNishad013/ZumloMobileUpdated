import { View, Text, FlatList } from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import navigationString from "../../../navigation/navigationString";
import CommonButton from "../../../components/Buttons/commonButton";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";
import { DocImage } from "../../../assets";
import { strings } from "../../../constant/strings";
import { useDispatch } from "react-redux";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import PolicyHeader from "./PolicyHeader";
import allActions from "../../../redux/actions";
import LoaderSalt from "../../../components/Loader/LoaderSalt";
import { event } from "../../../navigation/emitter";
import { styles } from "./styles";

interface Props {
  navigation?: any;
  route?: any;
}

const PolicyForLoginUser: React.FC<Props> = ({
  navigation,
  route,
}): ReactElement => {
  const { purpose } = route?.params;
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [consentFormText, setConsentFormText] = useState("");
  useEffect(() => {
    getConsentFromData_Api();
  }, []);

  const getConsentFromData_Api = () => {
    let requestbody = {
      description: "consent for seeker",
    };
    let description = "consent for seeker";
    allActions.OnBoarding.GetConsentForm(
      dispatch,
      requestbody,
      "getConsentFromData_Api",
      `${"description=" + description}`
    )
      .then((response: any) => {
        console.log("requestbody", requestbody);
        if (response.statusCode == 200) {
          setConsentFormText(response?.data?.description);
        } else {
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };
  const content = () => {
    return <Text style={styles.contentText}>{consentFormText}</Text>;
  };
  const getNav = (purpose: any) => {
    console.log("check ===-=>purpose======>", purpose);
    switch (purpose) {
      case "CreateNewPassword":
        console.log("fdjhhhdfghjd");

        event.emit("login");

        setTimeout(() => {
          navigation.navigate(navigationString?.UserType);
        }, 2000);
        break;
    }
    return;
  };
  const AgreeButton = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: moderateScale(100),
        }}
      >
        <CommonButton btnName={strings.Agree} onPress={() => getNav(purpose)} />
      </View>
    );
  };

  return (
    console.log("check purpose into login user==>", purpose),
    (
      <ScreenWrapper statusBarColor={colors?.prussianBlue}>
        <View style={{ flex: 1, backgroundColor: colors?.SurfCrest }}>
          <PolicyHeader navigation={navigation} />
          <FlatList
            data={["1"]}
            keyExtractor={(item, index) => "key" + index}
            renderItem={() => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    marginHorizontal: moderateScale(19),
                    marginTop: moderateScale(30),
                  }}
                >
                  <DocImage />
                  {content()}
                  {isLoading && (
                    <>
                      <LoaderSalt />
                    </>
                  )}
                </View>
              );
            }}
          />

          {AgreeButton()}
        </View>
      </ScreenWrapper>
    )
  );
};
export default PolicyForLoginUser;
