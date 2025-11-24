import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import CommonButton from "../Buttons/commonButton";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import { alertMoDeatils } from "../../helper/AllAlertDetails";
import { CrossIcon } from "../../assets";

export interface CommonAlertProps {
  isVisible?: boolean;
  hideAlert?: () => void;
  onFirstPress?: () => void;
  onSecondPress?: () => void;
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

const EditActivitiesGoalsAlert: React.FC<CommonAlertProps> = ({
  isVisible,
  hideAlert,
  onFirstPress,
  onSecondPress,
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
        <TouchableOpacity
          onPress={hideAlert}
          style={{
            position: "absolute",
            right: moderateScale(5),
            top: moderateScale(5),
            height: moderateScale(20),
            width: moderateScale(20),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CrossIcon />
        </TouchableOpacity>

        {!!alertDetails?.title && (
          <View style={styles.textContainer}>
            <Text style={[styles.title, titleStyle]}>
              {alertDetails?.title}
            </Text>
          </View>
        )}
        {!!alertDetails?.message && (
          <Text style={[styles.message, messageStyle]}>
            {alertDetails?.message}
          </Text>
        )}

        <View style={styles?.btnContainer}>
          {!!alertDetails?.confirmButtonText && (
            <CommonButton
              btnName={alertDetails.confirmButtonText}
              mainContainer={[styles.confirmButton, confirmButtonStyle]}
              btnNameStyle={[styles.confirmButtonText, confirmButtonTextStyle]}
              onPress={onFirstPress}
            />
          )}
          {!!alertDetails?.confirmButtonText2 && (
            <CommonButton
              btnName={alertDetails.confirmButtonText2}
              mainContainer={[styles.confirmButton, confirmButtonStyle]}
              btnNameStyle={[styles.confirmButtonText, confirmButtonTextStyle]}
              onPress={onSecondPress}
            />
          )}
        </View>
        {!!alertDetails?.cancelButtonText && (
          <CommonButton
            btnName={alertDetails.cancelButtonText}
            mainContainer={[styles.cancelButton, cancelButtonStyle]}
            btnNameStyle={[styles.cancelButtonText, cancelButtonTextStyle]}
            onPress={onCancel || hideAlert}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: moderateScale(20),
    backgroundColor: "#6D597A",
    borderRadius: moderateScale(10),
    alignItems: "center",
  },
  iconContainer: {
    marginTop: moderateScale(-10),
    marginBottom: moderateScale(10),
  },
  title: {
    fontSize: textScale(18),
    fontWeight: "600",
    color: colors.SurfCrest,
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
    alignSelf: "center",
  },
  cancelButton: {
    height: moderateScale(34),
    width: "auto",
    backgroundColor: "#DB4343",
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(10),
  },
  confirmButton: {
    height: moderateScale(34),
    flex: 1,
    borderWidth: moderateScale(1),
    borderColor: colors.royalOrange,
    backgroundColor: "#6D597A",
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
    textAlign: "center",
    color: colors.royalOrange,
  },
  btnContainer: {
    flexDirection: "row",
    width: "auto",
    gap: moderateScale(10),
    marginTop: moderateScale(15),
  },
  textContainer: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: colors?.grayOp,
    marginBottom: moderateScale(5),
  },
});

export default EditActivitiesGoalsAlert;
