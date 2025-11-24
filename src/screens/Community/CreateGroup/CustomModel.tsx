import {
  Alert,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import colors from "../../../constant/colors";
import { APPLY_STATUS } from "../../../constant/ENUM";
import { strings } from "../../../constant/strings";

interface Props {
  data?: any;
  onPress?: () => void;
  title?: any;
  description?: any;
  visible?: boolean;
}

const CustomModel: React.FC<Props> = ({
  data,
  onPress,
  title,
  description,
  visible,
}) => {
  return (
    <View>
      <Modal
        animationType={APPLY_STATUS?.none}
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert(strings?.Modal_has_been_closed);
        }}
      >
        <View style={styles.centeredView}>
          <ImageBackground
            style={styles.imageBackground}
            resizeMode={APPLY_STATUS?.contain}
            source={imagePath?.CommunityAlertBG}
          >
            <Text style={styles.welcomeText}>{title}</Text>
            <Text style={styles.subText}>{description}</Text>
            <TouchableOpacity
              onPress={onPress}
              style={styles.touchableButton}
            />
          </ImageBackground>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModel;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  imageBackground: {
    height: moderateScale(450),
    width: moderateScale(292),
    paddingHorizontal: moderateScale(20),
  },
  welcomeText: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.prussianBlue,
    textAlign: "center",
    marginTop: moderateScale(60),
    width: "89%",
    alignSelf: "center",
  },
  subText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.prussianBlue,
    textAlign: "center",
    marginTop: moderateScale(15),
    width: "99%",
    alignSelf: "center",
  },
  touchableButton: {
    height: moderateScale(90),
    width: moderateScale(90),
    borderRadius: moderateScale(50),
    backgroundColor: colors?.transparent,
    position: "absolute",
    bottom: -10,
    alignSelf: "center",
  },
});
