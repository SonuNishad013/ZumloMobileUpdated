import { ReactElement, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CurvedHeader from "../../../components/Header/commonCurvedHeader";
import {
  height,
  moderateScale,
  textScale,
} from "../../../constant/responsiveStyle";
import { BiometricIcon, FaceAuth, ForwordBackArrowIcon } from "../../../assets";
import { strings } from "../../../constant/strings";
// import TouchID from "react-native-touch-id"; Biometric code will be used in future
interface EnableBiometricProps {
  navigation?: any;
}
const EnableBiometric: React.FC<EnableBiometricProps> = ({
  navigation,
}): ReactElement => {
  const [fingerPrintAvl, setFingerPrintAvl] = useState(false);
  const [biometricType, setBiometryType] = useState("");
  useEffect(() => {
    // onBiometric()
  }, []);

  // Biometric code will be used in future

  // const onBiometric = () => {
  //     const optionalConfigObject = {
  //         unifiedErrors: false,// use unified error messages (default false)
  //         passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
  //     }

  //     TouchID.isSupported(optionalConfigObject)
  //         .then(biometryType => {
  //             console.log("check biometryType",biometryType);

  //             // setFingerPrintAvl(true);
  //             // if (biometryType !== 'FaceID') {
  //             //     setBiometryType('fingerPrint');
  //             // } else if (biometryType === 'FaceID') {
  //             //     setBiometryType('FaceID');
  //             // }
  //         })
  //         .catch(error => {
  //             console.log("check erro==>",error);

  //             setFingerPrintAvl(false);
  //         });
  // }
  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      <View style={styles?.container}>
        <CurvedHeader
          mainContainer={styles?.curveView}
          headerName={strings?.Security_Privacy}
          iconContainer={{ backgroundColor: colors.darkbackgroundTheme }}
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles?.mainView}>
          <View style={styles?.childView}>
            <View style={styles?.spaceBetweenView}>
              <View>
                <Text style={styles?.enableIdText}>
                  {strings?.Enable_Touch_ID}
                </Text>
                <Text style={styles?.descText}>
                  {
                    strings?.Create_your_face_identity_to_unlock_application_using_your_face
                  }
                </Text>
              </View>
              <TouchableOpacity
              // onPress={() => onBiometric()}
              >
                <BiometricIcon />
              </TouchableOpacity>
            </View>
            <View style={styles?.rowCenter}>
              <Text style={styles?.addRight}>
                {strings?.Or_Just_enter_password}
              </Text>
              <ForwordBackArrowIcon />
            </View>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default EnableBiometric;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SurfCrest,
  },
  curveView: {
    backgroundColor: colors?.backgroundTheme,
  },
  mainView: {
    marginHorizontal: moderateScale(15),
    height: height / 1.1,
    justifyContent: "center",
    alignItems: "center",
  },
  childView: {
    height: height / 1.5,
    justifyContent: "space-between",
  },
  spaceBetweenView: {
    height: height / 1.7,
    justifyContent: "space-between",
    alignItems: "center",
  },
  enableIdText: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors.prussianBlue,
  },
  descText: {
    marginTop: moderateScale(5),
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.SaltBox,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  addRight: {
    marginRight: moderateScale(10),
  },
});
