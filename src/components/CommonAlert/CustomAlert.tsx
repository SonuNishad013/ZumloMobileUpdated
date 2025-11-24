import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import {
  height,
  moderateScale,
  textScale,
} from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

const CustomAlert = ({
  heading,
  subHeading,
  visible,
  onRequestClose,
  onSkip,
  onYes,
  imageSource,
  onYesStyle,
  onSkipStyle,
  backgroundImageStyle,
  issubHeading,
  leftButtonText,
  leftButtonTextStyle,
  rightButtonText,
  rightButtonTextStyle,
  headingSubHeadingTextColor,
}: any) => {
  return (
    <>
      {visible ? (
        <View>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={visible}
              onRequestClose={onRequestClose}
            >
              <View style={styles.centeredView}>
                <ImageBackground
                  source={imageSource}
                  style={[styles?.backgroundImageStyle, backgroundImageStyle]}
                  resizeMode={"contain"}
                >
                  <View style={styles.modalView}>
                    <Text
                      style={[styles.modalText, headingSubHeadingTextColor]}
                    >
                      {heading}
                    </Text>
                    {issubHeading && (
                      <Text
                        style={[
                          styles?.subHeadingTextStyle,
                          headingSubHeadingTextColor,
                        ]}
                      >
                        {subHeading}
                      </Text>
                    )}

                    <View style={styles?.buttonView}>
                      <TouchableOpacity
                        style={[styles.button, onSkipStyle]}
                        onPress={onSkip}
                      >
                        <Text style={[styles.textStyle, leftButtonTextStyle]}>
                          {leftButtonText}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.button, styles.buttonClose, onYesStyle]}
                        onPress={onYes}
                      >
                        <Text style={[styles.textStyle, rightButtonTextStyle]}>
                          {rightButtonText}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </Modal>
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    height: moderateScale(320),
    width: moderateScale(350),
    marginTop: moderateScale(200),
    marginBottom: moderateScale(-15),
  },
  button: {
    borderRadius: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
    height: moderateScale(43),
    width: moderateScale(110),
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: colors?.backgroundTheme,
  },
  textStyle: {
    color: colors?.SurfCrest,
    fontWeight: "500",
    fontSize: textScale(14),
  },
  modalText: {
    marginBottom: moderateScale(10),
    // textAlign: "center",
    color: colors?.SurfCrest,
    fontWeight: "700",
    fontSize: textScale(24),
  },
  buttonView: {
    flexDirection: "row",
    width: moderateScale(280),
    // gap: moderateScale(20),
    marginTop: moderateScale(20),
    justifyContent: "space-between",
    // marginHorizontal: moderateScale(10),
    // backgroundColor:'red'
  },
  imageStyle: {
    width: moderateScale(336),
    height: moderateScale(160),
    resizeMode: "contain",
    // backgroundColor: "red",
    marginBottom: moderateScale(20),
  },
  subHeadingTextStyle: {
    fontWeight: "400",
    fontSize: textScale(14),
    textAlign: "center",
    marginHorizontal: moderateScale(20),
  },
  backgroundImageStyle: {
    width: moderateScale(350),
    // height: Platform.OS === "ios" ? "auto" : height / 2,
    borderRadius: moderateScale(30),
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default CustomAlert;
