import { Image, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { imagePath } from "../../../assets/png/imagePath";
import { moderateScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";

interface Props {
  isModalVisible?: any;
  onRequestClose?: any;
}
const SpeechModal: React.FC<Props> = ({ isModalVisible, onRequestClose }) => {
  return (
    <View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={onRequestClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={imagePath.MikeIcon} style={styles.gifStyle} />
            <Text style={styles.modalText}>{strings?.Listening}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SpeechModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: moderateScale(200),
    height: moderateScale(200),
    backgroundColor: colors.lightSurfCrest,
    borderRadius: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(10),
  },
  gifStyle: {
    width: moderateScale(100),
    height: moderateScale(100),
    resizeMode: "contain",
  },
  modalText: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(16),
    color: "#000",
    textAlign: "center",
  },
});
