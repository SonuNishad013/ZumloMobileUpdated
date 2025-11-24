import React from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import Modal from "react-native-modal";

import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import CommonButton from "../Buttons/commonButton";

export interface Props {
  isVisible?: any;
  hideAlert?: any;
  onYes?: () => void;
  onNo?: () => void;
  title?: string;
  description?: string;
  textStyle?: TextStyle;
  buttonTexts?: string[];
}

const LogoutModal: React.FC<Props> = ({
  isVisible,
  hideAlert,
  onYes,
  onNo,
  title,
  description,
  textStyle,
  buttonTexts,
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
              <View style={{ padding: moderateScale(20) }}>
                <Text
                  style={{
                    fontSize: textScale(18),
                    fontWeight: "600",
                    color: colors.SurfCrest,
                    textAlign: "center",
                  }}
                >
                  {title !== "" ? title : "Are you sure, you want to logout?"}
                </Text>
                <View
                  style={{
                    height: moderateScale(1),
                    backgroundColor: colors.white,
                    opacity: 0.1,
                    marginVertical: moderateScale(20),
                  }}
                />
                <Text
                  style={[
                    {
                      fontSize: textScale(14),
                      fontWeight: "600",
                      color: colors.SurfCrest,
                      textAlign: "center",
                    },
                    textStyle,
                  ]}
                >
                  {description !== ""
                    ? description
                    : "Once you logged out, you need to login again with your credentials."}
                </Text>
                <View
                  style={{
                    marginTop: moderateScale(20),
                    flexDirection: "row",
                    justifyContent:
                      buttonTexts?.length === 2 ? "space-between" : "center",
                  }}
                >
                  {buttonTexts?.length === 2 && (
                    <CommonButton
                      btnName={
                        buttonTexts
                          ? buttonTexts[0]
                          : !title
                          ? "No, I don't"
                          : "No"
                      }
                      mainContainer={{
                        height: moderateScale(34),
                        width: moderateScale(100),
                        borderColor: "#FF9D48",
                        borderWidth: moderateScale(1),
                        backgroundColor: "#6D597A",
                      }}
                      btnNameStyle={{
                        fontSize: textScale(14),
                        fontWeight: "600",
                        color: colors.royalOrange,
                        textAlign: "center",
                      }}
                      onPress={onNo}
                    />
                  )}
                  {buttonTexts?.length === 2 && (
                    <CommonButton
                      btnName={
                        buttonTexts
                          ? buttonTexts[1]
                          : !title
                          ? "Yes, log out"
                          : "Yes"
                      }
                      mainContainer={{
                        height: moderateScale(34),
                        width: moderateScale(100),
                        backgroundColor: "#DB4343",
                      }}
                      btnNameStyle={{
                        fontSize: textScale(14),
                        fontWeight: "600",
                        color: colors.SurfCrest,
                        textAlign: "center",
                      }}
                      onPress={onYes}
                    />
                  )}
                  {buttonTexts?.length === 1 && (
                    <CommonButton
                      btnName={
                        buttonTexts
                          ? buttonTexts[0]
                          : !title
                          ? "No, I don't"
                          : "No"
                      }
                      mainContainer={{
                        height: moderateScale(34),
                        width: moderateScale(100),
                        borderColor: "#FF9D48",
                        borderWidth: moderateScale(1),
                        backgroundColor: "#6D597A",
                      }}
                      btnNameStyle={{
                        fontSize: textScale(14),
                        fontWeight: "600",
                        color: colors.royalOrange,
                        textAlign: "center",
                      }}
                      onPress={onNo}
                    />
                  )}
                </View>
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
    backgroundColor: colors?.white,
    borderWidth: moderateScale(1),
    borderColor: colors?.themeColor,
    marginTop: moderateScale(10),
  },
  InvestBtnStyles: {
    fontSize: textScale(12),
    color: colors?.themeColor,
    lineHeight: textScale(19),
    fontWeight: "500",
    textAlign: "center",
  },
  AlertMessageStyle: {
    fontSize: textScale(14),
    color: "#000",
    // lineHeight: textScale(19),
    fontWeight: "500",
  },
  modelSubContainer: {
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6D597A",
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
export default LogoutModal;
