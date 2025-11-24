import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import StatusBarHeader from "../../Profile/Preferences/StatusBarHeader";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import Carousel from "react-native-snap-carousel";
import {
  allowedImageFormats,
  allowedVideoFormats,
} from "../../../constant/CommunityConstant";
import { lookup } from "react-native-mime-types";
import { useFocusEffect } from "@react-navigation/native";
import Video from "react-native-video";
import { imagePath } from "../../../assets/png/imagePath";
import navigationString from "../../../navigation/navigationString";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { GrpNoData } from "../../../assets";
import { decodeSpaces, encodeSpaces } from "../../../helper/CommunityHelper";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../../constant/appConstant";
import logger from "../../../constant/logger";
import { APPLY_STATUS, COMPONENT_NAMES_ENUM } from "../../../constant/ENUM";
import { strings } from "../../../constant/strings";

interface Props {
  navigation?: any;
  route?: any;
}
const SCREEN_WIDTH = Dimensions.get("window").width;

const SavedFeedsIconsOnly: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { savedFeedsList } = route?.params;
  const isSavedFeedsListArray = Array.isArray(savedFeedsList);
  const [allSavedFeeds, setAllSavedFeeds] = useState<any>(savedFeedsList);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      SavedFeedsListAPI();
      setIsGoBackToFalse();
      return () => setIsFocused(false);
    }, [])
  );

  const setIsGoBackToFalse = () => {
    dispatch({
      type: API_FUN_NAMES?.PostDeleteOrUnsavedFromFeedDetails,
      payload: false,
    });
  };
  const SavedFeedsListAPI = () => {
    allActions?.communitiesAction
      .SavedFeedsList(dispatch, {}, API_FUN_NAMES?.SavedFeedsList)
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setAllSavedFeeds(response?.data);
        }
      })
      .catch((err) => {
        logger("error_save_feed", err);
      });
  };
  const carouselRef = useRef<any>(null);
  const renderItem = useCallback(
    ({ item }: any) => {
      const mimeType = lookup(item) || "";
      if (allowedImageFormats?.includes(mimeType)) {
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
              controls // Show default play, pause, seek, etc.
              playInBackground={false} // Prevents playing when app is in the background
              playWhenInactive={false} // Prevents playing when screen is inactive
              resizeMode={APPLY_STATUS?.cover} // Adjusts how the video is displayed
              repeat={false} // Loops the video
              muted={false} // Set to true to mute video
              paused={!isFocused} // Set to true to pause video
              ignoreSilentSwitch={APPLY_STATUS?.ignore} // Plays sound even if device is on silent mode
              onLoadStart={() => {
                console.log("test_data_load_start");
              }}
              onLoad={() => {
                console.log("test_data_on_load");
              }}
              onError={(e) => {
                console.error("test_data_error", e);
              }}
            />
          </View>
        );
      }

      return null;
    },
    [activeSlide]
  );
  const BgImages = [
    imagePath?.FeedOnlyTextBgLight,
    imagePath?.FeedOnlyTextBgDark,
  ];
  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <View
        style={{
          backgroundColor: colors?.SaltBox,
          flex: 1,
        }}
      >
        <StatusBarHeader
          headerName={"Your saved feeds"}
          navigation={navigation}
        />
        <View style={styles?.passMarginOnList}>
          <FlatList
            data={isSavedFeedsListArray ? allSavedFeeds : []}
            numColumns={3}
            keyExtractor={(item, index) => "key" + index}
            columnWrapperStyle={{
              gap: moderateScale(6),
            }}
            style={styles?.passMarginBottomonList}
            renderItem={({ item, index }) => {
              const isContainContent =
                Array.isArray(item?.content) && item?.content.length !== 0;
              return (
                <>
                  <Pressable
                    onPress={() =>
                      navigation?.navigate(navigationString?.IndependentFeed, {
                        feedId: item?.id,
                        changeHeader: COMPONENT_NAMES_ENUM?.FeedDetails,
                      })
                    }
                    style={styles.pressableStyle}
                  >
                    {!isContainContent && (
                      <ImageBackground
                        source={BgImages[index % 2]}
                        style={styles?.bgImageStyle}
                      >
                        <Text
                          style={{
                            color:
                              index % 2 === 0
                                ? colors?.prussianBlue
                                : colors?.SurfCrest,
                            textAlign: "center",
                          }}
                          numberOfLines={3}
                        >
                          {decodeSpaces(item?.title)}
                        </Text>
                      </ImageBackground>
                    )}

                    {item?.content?.length > 0 && (
                      <View style={styles?.crouselView}>
                        <Carousel
                          ref={carouselRef}
                          data={item?.content}
                          layout={APPLY_STATUS?.default}
                          loop={false}
                          renderItem={renderItem}
                          onSnapToItem={setActiveSlide}
                          sliderWidth={SCREEN_WIDTH}
                          itemWidth={SCREEN_WIDTH}
                        />
                      </View>
                    )}
                  </Pressable>
                </>
              );
            }}
            ListEmptyComponent={
              <View style={styles?.noGroupView}>
                <GrpNoData />
                <Text style={styles?.noGroupText}>
                  {strings?.No_saved_feeds}
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SavedFeedsIconsOnly;

const styles = StyleSheet.create({
  mediaStyle: {
    height: moderateScale(height / 4.5),
    width: (width - 60) / 3,
    borderRadius: moderateScale(10),
    borderColor: colors.SurfCrest,
  },
  videoWrapper: {
    height: moderateScale(height / 4.5),
    width: (width - 60) / 3,
    borderRadius: moderateScale(10),
    borderColor: colors.SurfCrest,
    overflow: "hidden",
  },
  videoStyle: {
    width: "100%",
    height: "100%",
  },
  passMarginOnList: {
    marginHorizontal: moderateScale(19),
  },
  passMarginBottomonList: {
    marginBottom: moderateScale(75),
  },
  pressableStyle: {
    height: moderateScale(height / 4.4),
    width: (width - 60) / 3,
    alignItems: "center",
    borderRadius: moderateScale(15),
    marginBottom: moderateScale(4),
  },
  bgImageStyle: {
    height: moderateScale(height / 4.5),
    width: (width - 60) / 3,
    borderRadius: moderateScale(15),
    overflow: "hidden",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(5),
  },
  crouselView: {
    height: moderateScale(height / 4.4),
    width: (width - 60) / 3,
  },
  noGroupView: {
    justifyContent: "center",
    alignItems: "center",
    height: height / 1.4,
    marginHorizontal: moderateScale(25),
  },
  noGroupText: {
    alignItems: "center",
    textAlign: "center",
    fontSize: textScale(16),
    color: colors?.SurfCrest,
    marginTop: moderateScale(5),
  },
});
