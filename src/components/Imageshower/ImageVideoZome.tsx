import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { lookup } from "react-native-mime-types";
import {
  allowedImageFormats,
  allowedVideoFormats,
} from "../../constant/CommunityConstant";
import Video from "react-native-video";
import { CrossIcon } from "../../assets";

export interface CommonAlertProps {
  isVisible?: boolean;
  hideAlert?: () => void;
  source?: any;
}

const ImageVideoZome: React.FC<CommonAlertProps> = ({
  isVisible,
  hideAlert,
  source,
}) => {
  const mimeType: any = lookup(source?.uri);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={hideAlert}
      onBackButtonPress={hideAlert}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={hideAlert} style={styles.crossContainer}>
          <CrossIcon />
        </TouchableOpacity>
        {allowedImageFormats?.includes(mimeType) && (
          <Image style={styles.mediaStyle} source={source} />
        )}
        {allowedVideoFormats?.includes(mimeType) && (
          <View style={styles.videoWrapper}>
            <Video
              style={styles.videoStyle}
              source={source}
              resizeMode={"contain"}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(20),
    paddingTop: moderateScale(30),
    backgroundColor: colors?.SaltBox,
    borderRadius: moderateScale(10),
    alignItems: "center",
    alignSelf: "center",
    overflow: "hidden",
    zIndex: 10,
  },
  crossContainer: {
    position: "absolute",
    right: moderateScale(5),
    top: moderateScale(5),
    height: moderateScale(20),
    width: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  mediaStyle: {
    width: moderateScale(320),
    height: moderateScale(200),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: colors?.SurfCrest,
  },
  videoWrapper: {
    width: moderateScale(320),
    height: moderateScale(200),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: colors?.SurfCrest,
    overflow: "hidden", // Ensures video respects the border radius
    backgroundColor: colors?.SurfCrest,
  },
  videoStyle: {
    width: "100%",
    height: "100%",
  },
});

export default ImageVideoZome;
