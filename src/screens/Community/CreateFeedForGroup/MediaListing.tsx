import React, { useState, useCallback } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "../../../constant/responsiveStyle";
import CommonBoxButton from "../../../components/Buttons/commonBoxButton";
import { lookup } from "react-native-mime-types";
import colors from "../../../constant/colors";
import { CrossIcon } from "../../../assets";
import {
  allowedImageFormats,
  allowedVideoFormats,
} from "../../../constant/CommunityConstant";
import ImageVideoZome from "../../../components/Imageshower/ImageVideoZome";
import Video from "react-native-video";
import { APPLY_STATUS } from "../../../constant/ENUM";
import logger from "../../../constant/logger";

interface Props {
  setMediaUrls?: any;
  mediaUrls?: any;
}

const MediaListing: React.FC<Props> = ({ setMediaUrls, mediaUrls = [] }) => {
  const [isPhotoShow, setIsPhotoShow] = useState<{
    isShow: boolean;
    uri: string;
  }>({
    isShow: false,
    uri: "",
  });

  const handleDeleteMedia = useCallback(
    (index: number) => {
      const updatedMediaUrls = [...mediaUrls];
      updatedMediaUrls?.splice(index, 1);
      setMediaUrls?.(updatedMediaUrls);
    },
    [mediaUrls, setMediaUrls]
  );

  const handlePressItem = useCallback((uri: string) => {
    setIsPhotoShow({ isShow: true, uri });
  }, []);

  const renderItem = useCallback(
    ({ item, index }: any) => {
      const mimeType: any = lookup(item);
      return (
        <TouchableOpacity
          onPress={() => handlePressItem(item)}
          style={styles.itemContainer}
        >
          <CommonBoxButton
            onPress={() => handleDeleteMedia(index)}
            touchableOpacityStyle={styles.deleteButtonTouchable}
            mainContainer={styles.deleteButtonContainer}
            SvgIcon={CrossIcon}
            height={moderateScale(4)}
            width={moderateScale(4)}
          />
          {allowedImageFormats?.includes(mimeType) && (
            <Image
              style={styles.mediaStyle}
              source={{ uri: item }}
              resizeMode={APPLY_STATUS?.cover}
            />
          )}
          {allowedVideoFormats?.includes(mimeType) && (
            <View style={styles.videoWrapper}>
              <Video
                source={{ uri: item }}
                style={styles.videoStyle}
                resizeMode={APPLY_STATUS?.contain}
                muted={true}
              />
            </View>
          )}
        </TouchableOpacity>
      );
    },
    [handleDeleteMedia, handlePressItem]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mediaUrls}
        horizontal
        contentContainerStyle={styles.flatListContent}
        renderItem={renderItem}
        keyExtractor={(item, index) => "key" + index}
      />

      {isPhotoShow.isShow && (
        <ImageVideoZome
          isVisible={isPhotoShow.isShow}
          source={{ uri: isPhotoShow.uri }}
          hideAlert={() =>
            setIsPhotoShow({ ...isPhotoShow, isShow: false, uri: "" })
          }
        />
      )}
    </View>
  );
};

export default React.memo(MediaListing);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: moderateScale(20),
  },
  flatListContent: {
    gap: moderateScale(10),
  },
  itemContainer: {
    position: "relative",
    paddingHorizontal: moderateScale(2),
  },
  deleteButtonTouchable: {
    zIndex: 1,
  },
  deleteButtonContainer: {
    backgroundColor: colors.prussianBlue,
    height: moderateScale(10),
    width: moderateScale(10),
    borderRadius: moderateScale(5),
    position: "absolute",
    left: moderateScale(40),
  },
  mediaStyle: {
    height: moderateScale(48),
    width: moderateScale(48),
    borderColor: colors.SurfCrest,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  videoWrapper: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: colors.SurfCrest,
    overflow: "hidden",
  },
  videoStyle: {
    width: "100%",
    height: "100%",
  },
});
