import { Alert, Platform, StyleSheet, View } from "react-native";
import React, { useState, useCallback } from "react";
import { moderateScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import {
  allowedImageFormats,
  allowedVideoFormats,
  features,
  fromNav,
  switchCodes,
} from "../../../../constant/CommunityConstant";
import CommonBoxButton from "../../../../components/Buttons/commonBoxButton";
import ImagePicker from "react-native-image-crop-picker";
import PickerAlert from "../../../../components/Alerts/PickerAlert";
import { alertTypes } from "../../../../constant/AllGlobalNameConstant";
import { AlertCircle } from "../../../../assets";
import MediaListing from "../MediaListing";
import navigationString from "../../../../navigation/navigationString";
import { TOAST_STATUS, videoLimit } from "../../../../constant/appConstant";
import { PICKER, PLATEFORM } from "../../../../constant/ENUM";
import logger from "../../../../constant/logger";
import { strings } from "../../../../constant/strings";
import { openSettings } from "react-native-permissions";
import {
  showCameraPermissionAlert,
  showGalleryPermissionAlert,
} from "../../../../utils/CommonMethods";

interface Props {
  mediaUrls?: any;
  setMediaUrls?: any;
  navigation?: any;
  groupId?: any;
  toasterFunction?: any;
  loaderShowHide?: any;
  setmediaSize?: any;
}

const FeedFeatures: React.FC<Props> = ({
  mediaUrls,
  setMediaUrls,
  navigation,
  groupId,
  toasterFunction,
  loaderShowHide,
  setmediaSize,
}) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [modalData, setModalData] = useState<any>({
    type: "",
    onFirstPress: () => {},
    onSecondPress: () => {},
    cancelButtonPress: () => {},
    AlertIcon: AlertCircle,
    isAlertIcon: false,
  });
  const handleCancel = () => setIsAlertVisible(false);

  const selectTypeMedia = useCallback((isCamera: boolean) => {
    setIsAlertVisible(true);
    setModalData({
      type: alertTypes?.mediaType,
      onFirstPress: () => (isCamera ? openCamera(true) : openGallery(true)),
      onSecondPress: () => (isCamera ? openCamera(false) : openGallery(false)),
      cancelButtonPress: handleCancel,
    });
  }, []);

  const openCamera = useCallback(async (isImage: boolean) => {
    try {
      const media = await ImagePicker.openCamera({
        // width: moderateScale(320),
        // height: moderateScale(200),
        cropping: false,
        mediaType: isImage ? PICKER?.photo : PICKER?.video,
        compressVideoPreset: PICKER?.LowQuality,
        // videoQuality: PICKER?.low,
        freeStyleCropEnabled: true,
      });

      if (Platform?.OS == PLATEFORM?.android) {
        loaderShowHide(false);
      }

      if (media) {
        handleMediaSelection([media]);
      }
    } catch (error: any) {
      if (error?.code == "E_NO_CAMERA_PERMISSION") {
        showCameraPermissionAlert();
      }
      logger("Camera Error:", error);
    }
  }, []);

  const openGallery = useCallback(async (isImage: boolean) => {
    try {
      let media: any = null;

      media = await ImagePicker.openPicker({
        // width: moderateScale(320),
        // height: moderateScale(200),
        cropping: false,
        mediaType: isImage ? PICKER?.photo : PICKER?.video,
        multiple: false,
        compressVideoPreset: PICKER?.MediumQuality,
        freeStyleCropEnabled: true,
      });
      if (media) {
        const allowedFormats = isImage
          ? allowedImageFormats
          : allowedVideoFormats;
        const filteredMedia = (Array?.isArray(media) ? media : [media]).filter(
          (item) => allowedFormats.includes(item?.mime)
        );

        if (filteredMedia?.length === 0) {
          toasterFunction(
            TOAST_STATUS?.ERROR,
            `${strings?.Only} ${
              isImage
                ? strings?.image_support_format
                : strings?.video_support_format
            } ${strings?.files_are_allowed}`
          );
          return;
        }
        handleMediaSelection(filteredMedia);
      }
    } catch (error: any) {
      console.log("hellohello", error?.code);
      if (error?.code == "E_NO_LIBRARY_PERMISSION") {
        showGalleryPermissionAlert();
      }
      handleCancel();
    }
  }, []);

  const handleMediaSelection = (media: any) => {
    const validMedia = media?.filter((item: any) => validateMedia(item));
    const urls = validMedia?.map((item: any) => item?.path);
    const mediaSizes = validMedia?.map((item: any) => item?.size);

    setIsAlertVisible(false);
    setTimeout(() => {
      setMediaUrls((prevUrls: any) => [...urls, ...prevUrls]);
      setmediaSize((prevMediaSizes: any) => [...mediaSizes, ...prevMediaSizes]);
    }, 500);
  };

  const validateMedia = (media: any) => {
    if (allowedVideoFormats?.includes(media?.mime)) {
      const byte_ = media?.size / (1024 * 1024);

      console.log("byte_byte_", byte_);
      if (byte_ > videoLimit?.MB_5) {
        toasterFunction(
          TOAST_STATUS?.ERROR,
          strings?.Video_file_size_exceeds_5MB
        );
        return false;
      }
    } else if (media?.mime?.includes(strings?.image) && media?.size > 5242880) {
      toasterFunction(
        TOAST_STATUS?.ERROR,
        strings?.Image_file_size_exceeds_5MB
      );
      return false;
    }

    return true;
  };

  const checkTitle = (key: any) => {
    switch (key) {
      case switchCodes?.camera:
        selectTypeMedia(true);
        break;
      case switchCodes?.attachments:
        selectTypeMedia(false);
        break;
      case switchCodes?.tags:
        navigation?.navigate(navigationString?.AddMembersInGroup, {
          from: groupId == 0 ? fromNav?.individual_Feed : fromNav?.in_Group,
          groupId: groupId,
        });
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.buttonContainer}>
      {features?.map((itm, index) => (
        <CommonBoxButton
          onPress={() => checkTitle(itm?.title)}
          key={index?.toString()}
          touchableOpacityStyle={styles.buttonStyle}
          SvgIcon={itm?.icon}
        />
      ))}

      <PickerAlert
        isVisible={isAlertVisible}
        type={modalData?.type}
        isAlertIcon={modalData?.isAlertIcon}
        AlertIcon={modalData?.AlertIcon}
        hideAlert={handleCancel}
        onFirstPress={modalData?.onFirstPress}
        onSecondPress={modalData?.onSecondPress}
        onCancel={handleCancel}
      />

      <MediaListing mediaUrls={mediaUrls} setMediaUrls={setMediaUrls} />
    </View>
  );
};

export default FeedFeatures;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: moderateScale(10),
    bottom: moderateScale(moderateScale(20)),
    marginLeft: moderateScale(19),
  },
  buttonStyle: {
    height: moderateScale(48),
    width: moderateScale(48),
    borderColor: colors?.SurfCrest,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
});
