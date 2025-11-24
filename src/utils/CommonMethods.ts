import { Alert, Linking, Platform } from "react-native";
import logger from "../constant/logger";
import { openSettings } from "react-native-permissions";
import { getThumbnailFromYoutubeURL } from "../helper/RecommendationHelper";
import { imagePath } from "../assets/png/imagePath";
import { examplerImage } from "../constant/RecommendationConstant";

export const loggerMessage = (message: any, error: any) => {
  logger(message, error);
};

export const showGalleryPermissionAlert = () => {
  Alert.alert(
    "Gallery Permission Needed",
    "Gallery access is required to select images. Please enable it in your app settings.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Open Settings",
        onPress: () => {
          openSettings().catch(() => {
            Alert.alert("Error", "Unable to open settings");
          });
        },
      },
    ]
  );
};

export const showCameraPermissionAlert = () => {
  Alert.alert(
    "Camera Permission Needed",
    "Camera access is required to use this feature. Please enable it in your app settings.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Open Settings",
        onPress: () => {
          openSettings().catch(() => {
            Alert.alert("Error", "Unable to open settings");
          });
        },
      },
    ]
  );
};

export const cancelSubscription = async () => {
  if (Platform?.OS === "ios") {
    Linking.openURL("https://apps.apple.com/account/subscriptions");
  } else {
    Linking.openURL("https://play.google.com/store/account/subscriptions");
  }
};

export const createThumbnail = (item: any) => {
  let value =
    item?.logo && !examplerImage.includes(item?.logo)
      ? { uri: item?.logo }
      : item?.link && !examplerImage.includes(item?.logo)
      ? getThumbnailFromYoutubeURL(item?.link)
      : imagePath?.VideoPlayButton;

  return value;
};
