import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Linking,
} from "react-native";
import {
  RightArrowWithBackgrpoundIcon,
  ModalCancelBtnIcon,
} from "../../../assets";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";
import { textLabelSize } from "../../../utils/TextConfig";

const NotificationPopup = ({ visible, setShowModal }: any) => {
  const successClick = async () => {
    try {
      if (Platform.OS === "ios") {
        // iOS: open the app's settings page
        await Linking.openURL("app-settings:");
      } else {
        // Android: open the app's notification settings
        await Linking.openSettings();
      }
    } catch (error) {
      console.error("❌ Unable to open settings:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <View style={styles.overlay}>
        <View
          style={{
            width: "90%",
            height: 300,
            backgroundColor: colors?.SurfCrest,
            justifyContent: "space-around",
            alignItems: "center",
            borderRadius: moderateScale(20),
          }}
        >
          <TouchableOpacity
            style={styles?.crossView}
            onPress={() => setShowModal(false)}
          >
            <ModalCancelBtnIcon fill={"#f0f0"} stroke={"#f0f0"} />
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              gap: moderateScale(15),
              marginTop: moderateScale(20),
            }}
          >
            <Text
              style={{
                color: colors?.prussianBlue,
                fontWeight: "600",
                fontSize: textLabelSize?.mainTitle,
              }}
            >
              {"Stay Updated!"}
            </Text>
            <Text
              style={{
                color: colors?.prussianBlue,
                fontWeight: "500",
                fontSize: textLabelSize?.titleFont,
                textAlign: "center",
              }}
            >
              {"Turn on notifications to get important updates instantly."}
            </Text>
          </View>
          <View style={{ width: "90%" }}>
            <View>
              <TouchableOpacity
                style={styles?.upgradeButton}
                onPress={() => successClick()}
              >
                <View style={styles?.extraSpaceCover} />
                <Text style={styles?.upgradeText}>
                  {"Enable notifications"}
                </Text>
                <RightArrowWithBackgrpoundIcon
                  height={moderateScale(30)}
                  width={moderateScale(30)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    height: (Dimensions?.get("screen").height * 58) / 100,
    width: (Dimensions?.get("screen").width * 80) / 100,
    paddingHorizontal: moderateScale(30),
  },
  mainView: {
    justifyContent: "space-between",
    flex: 1,
  },
  topSpace: {
    marginTop: moderateScale((Dimensions?.get("screen").height * 2) / 100),
  },
  bottomSpace: {
    marginBottom: moderateScale(40),
  },
  dailyPromptText: {
    color: colors?.royalOrangeDark,
    fontSize: textLabelSize?.titleFont,
    fontWeight: "700",
    textAlign: "center",
    marginTop: moderateScale(35),
  },
  planNameView: {
    color: colors?.SurfCrest,
    fontSize: textLabelSize?.subtTitleFont,
    fontWeight: "700",
    textAlign: "center",
    marginTop: moderateScale(10),
    fontStyle: "italic",
  },
  descText: {
    color: colors?.royalOrangeDark,
    fontSize: textLabelSize?.titleFont,
    fontWeight: "600",
    textAlign: "center",
    fontStyle: "italic",
  },
  featureText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "400",
    textAlign: "center",
    marginTop: moderateScale(20),
  },
  upgradeButton: {
    backgroundColor: colors?.polishedPine,
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(30),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(15),
  },
  upgradeText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "500",
    textAlign: "center",
  },
  extraSpaceCover: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  crossView: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: colors?.backgroundTheme,
    borderRadius: moderateScale(30),
  },
});

export default NotificationPopup;
