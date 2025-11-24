import React, { useState } from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import Modal from "react-native-modal";

import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import CommonButton from "../../components/Buttons/commonButton";

export interface Props {
  isVisible?: any;
  title?: string;
  description?: string;
  setIsModal?: any;
}

const ErrorModal: React.FC<Props> = ({
  isVisible,
  title,
  description,
  setIsModal,
}) => {
  return (
    <>
      {isVisible ? (
        <View>
          <Modal isVisible={isVisible} animationIn={"fadeIn"}>
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
                  {title}
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
                  ]}
                >
                  {description}
                </Text>
                <View
                  style={{
                    marginTop: moderateScale(20),
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <CommonButton
                    btnName={"Ok"}
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
                    onPress={() => setIsModal(false)}
                  />
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
export default ErrorModal;
