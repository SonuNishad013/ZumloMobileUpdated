import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import colors from "../../../constant/colors";
import StatusBarHeader from "../../Profile/Preferences/StatusBarHeader";
import Carousel from "react-native-snap-carousel";
import Video from "react-native-video";
import {
  allowedImageFormats,
  allowedVideoFormats,
} from "../../../constant/CommunityConstant";
import { lookup } from "react-native-mime-types";
import { moderateScale } from "../../../constant/responsiveStyle";
import { useFocusEffect } from "@react-navigation/native";
import { imagePath } from "../../../assets/png/imagePath";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import { APPLY_STATUS } from "../../../constant/ENUM";
import { strings } from "../../../constant/strings";
import CommonLoader from "../../../components/Loader";

interface Props {
  navigation?: any;
  route?: any;
}

const definedHeight = 350;

const ViewMedia: React.FC<Props> = ({ navigation, route }) => {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const { item } = route?.params;
  const carouselRef = useRef<any>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  const renderItem = useCallback(
    ({ item, index }: any) => {
      const mimeType = lookup(item) || "";
      if (allowedImageFormats?.includes(mimeType)) {
        return (
          <ImageBackground
            style={styles?.bgImageStyle}
            source={{ uri: item }}
            blurRadius={7}
          >
            <FastImage
              source={{
                uri: item,
                priority: FastImage.priority.high,
              }}
              style={[
                styles.mediaStyle,
                {
                  height: moderateScale(definedHeight),
                  marginBottom: moderateScale(100),
                },
              ]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </ImageBackground>
        );
      }
      if (allowedVideoFormats.includes(mimeType)) {
        return (
          <View style={styles?.mainView}>
            <View style={styles?.videoContainer}>
              <Video
                source={{ uri: item }}
                style={styles.videoStyle}
                controls
                playInBackground={false}
                playWhenInactive={false}
                resizeMode={APPLY_STATUS?.contain}
                repeat={false}
                muted={false}
                paused={index !== activeSlide}
                ignoreSilentSwitch={APPLY_STATUS?.ignore}
                onLoadStart={() => {
                  setLoading(true);
                }}
                onLoad={() => {
                  setLoading(false);
                }}
                onError={(e) => {
                  setLoading(false);
                }}
              />
            </View>
          </View>
        );
      }
      return null;
    },
    [activeSlide]
  );
  const insert = useSafeAreaInsets();
  return (
    <>
      <View style={styles?.parentView}>
        <TouchableOpacity
          style={styles?.crossButtonView}
          onPress={() => navigation.goBack()}
        >
          <Image style={styles?.crossImage} source={imagePath?.close} />
        </TouchableOpacity>

        <View style={styles?.viewCenter}>
          <Carousel
            ref={carouselRef}
            data={item?.content}
            layout={"default"}
            loop={false}
            renderItem={renderItem}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH}
            onSnapToItem={(index) => setActiveSlide(index)}
          />
        </View>

        {loading && <CommonLoader />}

        <View style={styles.indicatorNumber}>
          <Text style={styles.indigatorText}>{`${activeSlide + 1} / ${
            item?.content?.length
          }`}</Text>
        </View>
      </View>
    </>
  );
};

export default ViewMedia;

const styles = StyleSheet.create({
  mediaStyle: {
    width: "auto",
    borderRadius: moderateScale(10),
    borderColor: colors.SurfCrest,
  },
  videoStyle: {
    width: "100%",
    height: "100%",
  },
  bgImageStyle: {
    height: Dimensions?.get("screen")?.height,
    justifyContent: "center",
  },
  mainView: {
    height: Dimensions?.get("screen")?.height - moderateScale(200),
    justifyContent: "center",
    marginHorizontal: moderateScale(20),
  },
  videoContainer: {
    height: moderateScale(definedHeight),
    borderRadius: moderateScale(10),
    overflow: "hidden",
  },
  parentView: {
    backgroundColor: colors?.SurfCrest,
    flex: 1,
    borderRightColor: "red",
  },
  viewCenter: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  crossButtonView: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: colors?.SurfCrest,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors?.prussianBlue,
    marginTop: moderateScale(Platform?.OS == "android" ? 90 : 70),
    alignSelf: "flex-end",
    marginRight: moderateScale(20),
    position: "absolute",
    right: moderateScale(20),
    top: moderateScale(Platform?.OS == "android" ? 90 : 70),
    zIndex: 999,
  },
  crossImage: {
    height: 12,
    width: 12,
    resizeMode: "contain",
    tintColor: colors?.prussianBlue,
    marginRight: moderateScale(1),
  },
  indicatorNumber: {
    position: "absolute",
    left: "45%",
    backgroundColor: colors?.SurfCrest,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(15),
    top: (Dimensions?.get("screen").height * 40) / 100 + definedHeight,
    borderWidth: 1,
    borderColor: colors?.prussianBlue,
  },
  indigatorText: {
    color: colors?.prussianBlue,
    fontSize: moderateScale(14),
  },
});
