import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { NoInternetIcon } from "../../assets";
import colors from "../../constant/colors";
import CommonButton from "../Buttons/commonButton";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import { formatSentenceCase } from "../../helper/sentenceCase";

export interface Props {
  alertMessage?: any;
  isVisible?: any;
  setVisible?: any;
}

const NetworkModel: React.FC<Props> = ({
  alertMessage,
  isVisible,
  setVisible,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      // animationIn={'fadeIn'}
      style={styles.modelCtnr}
    >
      <ScrollView>
        <View style={styles.noInterImg}>
          <NoInternetIcon />
        </View>
        <View style={styles.noIntrCtnr}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.noIntrTxt}>
              {formatSentenceCase("No Internet Connection")}
            </Text>
            <Text style={styles.noIntrDesc}>
              {formatSentenceCase(
                "You are not connected to the Internet. Make sure Wifi is on, Airplane mode is off and try again."
              )}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CommonButton
              mainContainer={{}}
              btnName="Retry"
              btnNameStyle={styles.btnTxt}
              onPress={() => setVisible()}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modelCtnr: {
    margin: 0,
    backgroundColor: "#E5E5E5",
    alignItems: undefined,
    justifyContent: undefined,
    flex: 1,
  },
  noInterImg: { alignItems: "flex-end", marginTop: moderateScale(60) },
  noIntrCtnr: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(70),
  },
  noIntrTxt: {
    fontSize: textScale(22),
    lineHeight: moderateScale(30),
    fontWeight: "700",
    color: colors?.themeColor,
  },
  noIntrDesc: {
    fontSize: textScale(14),
    lineHeight: moderateScale(19),
    fontWeight: "400",
    color: "#666666",
    paddingHorizontal: moderateScale(30),
    textAlign: "center",
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(70),
  },
  btnTxt: {
    fontSize: textScale(14),
    lineHeight: moderateScale(19),
    fontWeight: "700",
  },
});
export default NetworkModel;
