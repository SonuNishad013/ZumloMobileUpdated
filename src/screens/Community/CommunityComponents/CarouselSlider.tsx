import React, { useState, useRef, useCallback } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import Video from "react-native-video";
import {
  allowedImageFormats,
  allowedVideoFormats,
} from "../../../constant/CommunityConstant";
import { lookup } from "react-native-mime-types";
import { moderateScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { APPLY_STATUS, LAYOUTS } from "../../../constant/ENUM";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface Props {
  list?: string[];
  autoPlay?: boolean;
  layout?: "default" | "stack" | "tinder";
  loop?: boolean;
}

const CarouselSlider: React.FC<Props> = ({
  list = [],
  autoPlay = false,
  layout = LAYOUTS?.default,
  loop = false,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<any>(null);

  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      const mimeType = lookup(item) || "";

      if (allowedImageFormats.includes(mimeType)) {
        return (
          <Image
            style={styles.mediaStyle}
            source={{ uri: item }}
            resizeMode={APPLY_STATUS?.cover}
          />
        );
      }

      if (allowedVideoFormats.includes(mimeType)) {
        return (
          <View style={styles.videoWrapper}>
            <Video
              source={{ uri: item }}
              style={styles.videoStyle}
              controls
              resizeMode={APPLY_STATUS?.contain}
            />
          </View>
        );
      }

      return null;
    },
    [activeSlide]
  );

  return (
    <View style={styles.mainImageContainer}>
      <Carousel
        ref={carouselRef}
        data={list}
        firstItem={0}
        autoplay={autoPlay}
        layout={layout}
        loop={loop}
        renderItem={renderItem}
        onSnapToItem={setActiveSlide}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainImageContainer: {
    backgroundColor: colors.SurfCrest,
    height: moderateScale(188),
    borderRadius: moderateScale(11),
  },
  mediaStyle: {
    width: moderateScale(310),
    height: moderateScale(188),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: colors.SurfCrest,
  },
  videoWrapper: {
    width: moderateScale(310),
    height: moderateScale(188),
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

export default React.memo(CarouselSlider);
