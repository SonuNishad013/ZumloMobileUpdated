import { ReactElement, useState } from "react";
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
import { FaceAuth, FingerAuth } from "../../../assets";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import navigationString from "../../../navigation/navigationString";
import { strings } from "../../../constant/strings";

interface SecurityProps {
  navigation?: any;
}
const Security: React.FC<SecurityProps> = ({ navigation }): ReactElement => {
  const [data, setdata] = useState([
    {
      id: 1,
      name: strings?.Face,
      desc: strings?.Enable_Face_Recognition,
      fullDesc: strings?.Create_your_face_identity_to_unlock_application,
      icon: <FaceAuth />,
    },
    {
      id: 2,
      name: strings?.Finger,
      desc: strings?.Fingerprint_Login,
      fullDesc: strings?.Fast_and_Secure_login_using_fingerprints,
      icon: <FingerAuth />,
    },
  ]);
  const renderItem = (item: any, index: any) => {
    return (
      <TouchableOpacity
        style={[
          style.maineConatiner,
          {
            backgroundColor: index == 0 ? colors.prussianBlue : colors.SaltBox,
          },
        ]}
        onPress={() => navigation.navigate(navigationString.EnableBiometric)}
      >
        <View style={style.innerContainer}>{item.icon}</View>
        <View style={style.lowerContainer}>
          <Text style={style.textStyle}>{item.desc}</Text>
          <Text style={[style.textStyle, style?.descText]}>
            {item.fullDesc}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      <View style={style?.container}>
        <CurvedHeader
          mainContainer={style?.curveView}
          headerName={strings?.Security_Privacy}
          iconContainer={style?.iconView}
        />
        <View style={style?.listView}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item, index }) => renderItem(item, index)}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Security;
const style = StyleSheet.create({
  maineConatiner: {
    height: moderateScale(180),
    borderRadius: moderateScale(15),
    marginTop: moderateScale(25),
  },
  innerContainer: {
    height: moderateScale(90),
    justifyContent: "center",
    alignItems: "center",
  },
  lowerContainer: {
    marginHorizontal: moderateScale(40),
    height: moderateScale(90),
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.SurfCrest,
  },
  descText: {
    textAlign: "center",
    fontWeight: "400",
    marginTop: moderateScale(10),
  },
  container: {
    flex: 1,
    backgroundColor: colors.SurfCrest,
  },
  curveView: {
    backgroundColor: colors?.backgroundTheme,
  },
  iconView: {
    backgroundColor: colors.darkbackgroundTheme,
  },
  listView: {
    marginHorizontal: moderateScale(15),
    marginTop: moderateScale(65),
  },
});
