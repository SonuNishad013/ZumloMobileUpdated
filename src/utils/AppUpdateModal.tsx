// AppUpdateModal.tsx
import React, { useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import colors from "../constant/colors";
import { moderateScale } from "../constant/responsiveStyle";
import DeviceInfo from "react-native-device-info";

interface AppUpdateModalProps {
  visible: boolean;
  onClose?: () => void;
  storeUrlIOS: string;
  storeUrlAndroid: string;
}

const AppUpdateModal: React.FC<AppUpdateModalProps> = ({
  visible,
  onClose,
  storeUrlIOS,
  storeUrlAndroid,
}) => {
  useEffect(() => {
    const currentVersion = DeviceInfo.getVersion();
  }, []);
  const handleUpdate = () => {
    const url = Platform.OS === "ios" ? storeUrlIOS : storeUrlAndroid;
    Linking.openURL(url);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{string?.Update_Available}</Text>
          <Text style={styles.message}>{string?.A_new_version_of_the_app}</Text>
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>{string?.Update_Now}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const string = {
  Update_Available: "Update Available",
  A_new_version_of_the_app:
    " A new version of the app is available. Please update to continue.",
  Update_Now: "Update Now",
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors?.modalBG,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    alignItems: "center",
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    marginBottom: moderateScale(10),
    color: colors?.prussianBlue,
  },
  message: {
    fontSize: moderateScale(16),
    textAlign: "center",
    marginBottom: moderateScale(25),
    color: colors?.prussianBlue,
  },
  button: {
    backgroundColor: colors?.polishedPine,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(25),
    borderRadius: moderateScale(8),
  },
  buttonText: {
    color: colors?.SurfCrest,
    fontWeight: "600",
  },
  closeText: {
    marginTop: moderateScale(15),
    fontSize: moderateScale(14),
    color: "gray",
  },
});

export default AppUpdateModal;
