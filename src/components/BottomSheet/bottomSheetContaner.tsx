import React, { useEffect } from "react";

import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ModalCancelBtnIcon } from "../../assets";
import { moderateScale } from "../../constant/responsiveStyle";
import useGetKeyboardHeight from "../Hooks/useGetKeyboardHeight";

interface Props {
  hasCancelBtn?: any;
  visibility?: any;
  handleModalVisibility?: any;
  containerStyles?: any;
  children?: any;
  includeAnimation?: boolean;
}

const BottomSheetContainer = ({
  hasCancelBtn = true,
  children,
  visibility,
  handleModalVisibility,
  containerStyles,
  includeAnimation = true,
}: Props) => {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const bounce = new Animated.Value(0);
  const TO_VALUE = height / 1.4;
  useEffect(() => {
    if (visibility) {
      Animated.timing(bounce, {
        useNativeDriver: false,
        toValue: TO_VALUE,
        duration: 400,
      }).start();
    } else {
      Animated.timing(bounce, {
        useNativeDriver: false,
        toValue: 0,
      }).start();
    }
  }, [visibility]);

  const { keyboardHeight } = useGetKeyboardHeight();
  const providePadding = () => {
    const isKeyboardOpened = keyboardHeight === 0;
    if (Platform.OS === "ios") {
      return isKeyboardOpened ? insets.bottom : keyboardHeight;
    } else {
      return insets.bottom;
    }
  };
  return (
    // <View>
    <Modal
      visible={visibility}
      transparent
      onRequestClose={handleModalVisibility}
      animationType={"fade"}
      supportedOrientations={["portrait", "landscape"]}
    >
      <TouchableWithoutFeedback
        onPress={handleModalVisibility}
        accessible={false}
      >
        <View style={[styles.modalOverlay]} />
      </TouchableWithoutFeedback>

      <View
        style={{
          ...styles.modalContent,
          width: width,
          bottom: 0,
          ...containerStyles,
        }}
      >
        {hasCancelBtn ? (
          <TouchableOpacity
            onPress={handleModalVisibility}
            style={{
              margin: moderateScale(10),
              alignSelf: "flex-end",
              marginRight: moderateScale(10) + insets.right,
            }}
          >
            <ModalCancelBtnIcon
              height={`${moderateScale(35)}`}
              width={`${moderateScale(35)}`}
            />
          </TouchableOpacity>
        ) : null}

        {includeAnimation ? (
          <Animated.View
            style={[
              styles.modalViewContainer,
              {
                marginHorizontal: insets.left,
                paddingBottom: insets.bottom,
                maxHeight: bounce,
              },
            ]}
          >
            {children}
          </Animated.View>
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            pointerEvents={"box-none"}
          >
            <View
              style={[
                styles.modalViewContainer,
                {
                  marginHorizontal: insets.left,
                  paddingBottom: providePadding(),
                  maxHeight: TO_VALUE,
                },
              ]}
            >
              {children}
            </View>
          </KeyboardAvoidingView>
        )}
      </View>
    </Modal>
    // </View>
  );
};

export default BottomSheetContainer;

const styles = StyleSheet.create({
  modalContent: {
    position: "absolute",
    bottom: 0,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.63)",
  },
  modalViewContainer: {
    backgroundColor: "white",
    borderTopRightRadius: moderateScale(15),
    borderTopLeftRadius: moderateScale(15),
  },
});
