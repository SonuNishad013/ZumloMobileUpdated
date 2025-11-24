import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextStyle,
  ViewStyle,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import CommonButton from "../Buttons/commonButton";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import { imagePath } from "../../assets/png/imagePath";

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
  cancelButtonText?: any;
  confirmButtonText?: any;
  message?: any;
  title?: any;
}

const AlertGroupInvitation: React.FC<CommonAlertProps> = ({
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

  cancelButtonText,
  confirmButtonText,
  message,
  title,
}) => {
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
        {title && (
          <View style={styles.textContainer}>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
          </View>
        )}
        {message && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: moderateScale(20),
            }}
          >
            <Text style={[styles.message, messageStyle]}>{message}</Text>
            <View style={[styles.imageContainer]}>
              <Image source={imagePath.dummyProfileIcon} style={styles.image} />
            </View>
          </View>
        )}
        <View
          style={[
            styles.buttonContainer,
            {
              width: cancelButtonText && confirmButtonText ? "100%" : null,
            },
          ]}
        >
          {cancelButtonText && (
            <CommonButton
              btnName={cancelButtonText}
              mainContainer={[styles.cancelButton, cancelButtonStyle]}
              btnNameStyle={[styles.cancelButtonText, cancelButtonTextStyle]}
              onPress={onCancel || hideAlert}
            />
          )}
          {confirmButtonText && (
            <CommonButton
              btnName={confirmButtonText}
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
    // alignItems: "center",
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
    marginTop: moderateScale(20),
  },
  cancelButton: {
    height: moderateScale(34),
    width: moderateScale(100),
    borderColor: colors.royalOrange,
    borderWidth: moderateScale(1),
    backgroundColor: "#6D597A",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    height: moderateScale(34),
    width: moderateScale(100),
    backgroundColor: "#DB4343",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.royalOrange,
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
  imageContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(15),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors?.royalOrange,
  },
  imageContainer1: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(15),
  },
  image: {
    width: "95%",
    height: "95%",
    borderRadius: moderateScale(13),
  },
});

export default AlertGroupInvitation;
