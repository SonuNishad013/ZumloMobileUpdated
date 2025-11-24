import React from "react";
import { StyleSheet, Text, View, TextStyle, ViewStyle } from "react-native";
import Modal from "react-native-modal";
import CommonButton from "../Buttons/commonButton";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import { alertMoDeatils } from "../../helper/AllAlertDetails";

export interface CommonAlertProps {
  isVisible?: boolean;
  hideAlert?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButtonTextStyle?: TextStyle;
  cancelButtonTextStyle?: TextStyle;
  confirmButtonStyle?: ViewStyle;
  cancelButtonStyle?: ViewStyle;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
  isAlertIcon?: boolean;
  AlertIcon?: any;
  type?: any;
}

const AlertModal: React.FC<CommonAlertProps> = ({
  isVisible,
  hideAlert,
  onConfirm,
  onCancel,
  confirmButtonStyle,
  cancelButtonStyle,
  confirmButtonTextStyle,
  cancelButtonTextStyle,
  titleStyle,
  messageStyle,
  isAlertIcon,
  AlertIcon,
  type,
}) => {
  const alertDetails = alertMoDeatils(type);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={hideAlert}
      onBackButtonPress={hideAlert}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.modalContainer}>
        {isAlertIcon && AlertIcon && (
          <View style={styles.iconContainer}>
            <AlertIcon width={moderateScale(50)} height={moderateScale(50)} />
          </View>
        )}
        {!!alertDetails?.title && (
          <View style={styles.textContainer}>
            <Text style={[styles.title, titleStyle]}>{alertDetails.title}</Text>
          </View>
        )}
        {!!alertDetails?.message && (
          <Text style={[styles.message, messageStyle]}>
            {alertDetails.message}
          </Text>
        )}
        <View
          style={[
            styles.buttonContainer,
            {
              width:
                !!alertDetails?.cancelButtonText &&
                !!alertDetails?.confirmButtonText
                  ? "100%"
                  : null,
            },
          ]}
        >
          {!!alertDetails?.cancelButtonText && (
            <CommonButton
              btnName={alertDetails.cancelButtonText}
              mainContainer={[styles.cancelButton, cancelButtonStyle]}
              btnNameStyle={[styles.cancelButtonText, cancelButtonTextStyle]}
              onPress={onCancel || hideAlert}
            />
          )}
          {!!alertDetails?.confirmButtonText && (
            <CommonButton
              btnName={alertDetails.confirmButtonText}
              mainContainer={[styles.confirmButton, confirmButtonStyle]}
              btnNameStyle={[styles.confirmButtonText, confirmButtonTextStyle]}
              onPress={onConfirm}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: moderateScale(20),
    backgroundColor: "#6D597A",
    borderRadius: 10,
    alignItems: "center",
  },
  iconContainer: {
    marginTop: moderateScale(-10),
    marginBottom: moderateScale(10),
  },
  title: {
    fontSize: textScale(18),
    fontWeight: "600",
    color: colors.royalOrangeDark,
    textAlign: "center",
    marginBottom: moderateScale(10),
  },
  message: {
    fontSize: textScale(14),
    color: colors.SurfCrest,
    textAlign: "center",
    marginBottom: moderateScale(20),
    marginTop: moderateScale(10),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // width: "100%",
    alignSelf: "center",
  },
  cancelButton: {
    height: moderateScale(34),
    width: moderateScale(145),
    borderColor: colors.SurfCrest,
    borderWidth: moderateScale(1),
    backgroundColor: "#6D597A",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    height: moderateScale(34),
    width: moderateScale(145),
    borderColor: colors.SurfCrest,
    borderWidth: moderateScale(1),
    backgroundColor: "#6D597A",
    // backgroundColor: "#DB4343",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.SurfCrest,
    textAlign: "center",
  },
  confirmButtonText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.SurfCrest,
    textAlign: "center",
  },
  textContainer: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: colors?.grayOp,
    marginBottom: moderateScale(5),
  },
});

export default AlertModal;
