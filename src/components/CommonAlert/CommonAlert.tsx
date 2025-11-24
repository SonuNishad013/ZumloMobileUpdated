import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import { AlertCircle } from "../../assets";

export interface Props {
  alertMessage?: any;
  isVisible?: any;
  alertLeftButtonText?: any;
  alertRightButtonText?: any;
  alertLeftButtonOnPress?: any;
  alertRightButtonOnPress?: any;
  hideAlert?: any;
  customAlertTxtStyles?: TextStyle;
  isAlertIcon?: any;
  DescriptionMessage?: string;
  isDescription?: boolean;
}

const CommonAlert: React.FC<Props> = ({
  alertMessage,
  isVisible,
  alertLeftButtonText,
  alertRightButtonText,
  alertLeftButtonOnPress,
  alertRightButtonOnPress,
  hideAlert,
  customAlertTxtStyles,
  isAlertIcon,
  DescriptionMessage,
  isDescription = false,
}) => {
  return (
    <>
      {isVisible ? (
        <View>
          <Modal
            isVisible={isVisible}
            onBackdropPress={hideAlert}
            onBackButtonPress={hideAlert}
            animationIn={"fadeIn"}
          >
            <View style={styles.modelSubContainer}>
              {isAlertIcon && (
                <View style={{ marginVertical: moderateScale(5) }}>
                  <AlertCircle
                    width={`${moderateScale(50)}`}
                    height={`${moderateScale(50)}`}
                  />
                </View>
              )}
              <View
                style={{
                  alignItems: "center",
                  marginTop: moderateScale(20),
                  marginHorizontal: moderateScale(10),
                }}
              >
                <Text
                  style={[
                    styles.AlertMessageStyle,
                    customAlertTxtStyles,
                    { marginBottom: moderateScale(15), fontWeight: "700" },
                  ]}
                >
                  {alertMessage}
                </Text>
                {isDescription && (
                  <Text
                    style={[styles.AlertMessageStyle, customAlertTxtStyles]}
                  >
                    {DescriptionMessage}
                  </Text>
                )}
              </View>

              <View style={{ marginBottom: moderateScale(15) }} />
              <View style={styles.buttonContainer}>
                {alertLeftButtonText ? (
                  <TouchableOpacity
                    style={styles.InvestBtnBorderStyles}
                    activeOpacity={0.8}
                    onPress={alertLeftButtonOnPress}
                  >
                    <Text style={styles.InvestBtnStyles}>
                      {alertLeftButtonText}
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {alertRightButtonText ? (
                  <TouchableOpacity
                    style={[
                      styles.InvestBtnBorderStyles,
                      { marginLeft: moderateScale(20) },
                    ]}
                    activeOpacity={0.8}
                    onPress={alertRightButtonOnPress}
                  >
                    <Text style={styles.InvestBtnStyles}>
                      {alertRightButtonText}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  InvestBtnBorderStyles: {
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(4),
    backgroundColor: colors?.prussianBlue,
    borderWidth: moderateScale(1),
    borderColor: colors?.themeColor,
    marginTop: moderateScale(10),
    flex: 1,
  },
  InvestBtnStyles: {
    fontSize: textScale(12),
    color: "#f0fff0",
    lineHeight: textScale(19),
    fontWeight: "500",
    textAlign: "center",
  },
  AlertMessageStyle: {
    fontSize: textScale(14),
    color: colors.prussianBlue,
    fontWeight: "500",
    textAlign: "center",
  },
  modelSubContainer: {
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.SurfCrest,
    // backgroundColor: '#f0fff0',
    borderRadius: 10,
    paddingHorizontal: moderateScale(10),
  },
  buttonContainer: {
    marginBottom: moderateScale(20),
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
export default CommonAlert;
