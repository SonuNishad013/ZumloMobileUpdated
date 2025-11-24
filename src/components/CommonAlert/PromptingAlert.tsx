import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { imagePath } from "../../assets/png/imagePath";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

const WellnessModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <ImageBackground
            style={styles.modalContent}
            source={imagePath.PromptModal1}
            resizeMode={"stretch"}
          >
            {/* Header Text */}
            <Text
              style={[
                styles.titleText,
                {
                  color: "#1e2432",
                },
              ]}
            >
              Let’s Get to Know You!
            </Text>

            {/* Description */}
            <Text
              style={[
                styles.descriptionText,
                {
                  color: colors.darkPrussianBlue,
                },
              ]}
            >
              We’d highly recommend you to add your Medical Conditions to better
              generate your wellness plan.
            </Text>

            {/* Button */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: colors.darkthemColor,
                },
              ]}
              onPress={closeModal}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: "white",
                  },
                ]}
              >
                Add Details
              </Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    // width: "85%",
    backgroundColor: "#e8f2ff",
    borderRadius: 20,
    padding: moderateScale(40),
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: moderateScale(15),
  },
  descriptionText: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: moderateScale(15),
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderRadius: 10,
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  arrow: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginLeft: 8,
  },
});

export default WellnessModal;
