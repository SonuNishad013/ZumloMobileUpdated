import React, {
  useRef,
  useCallback,
  memo,
  useMemo,
  useEffect,
  useState,
} from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
  ListRenderItem,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { imagePath } from "../../../assets/png/imagePath";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import navigationString from "../../../navigation/navigationString";
import colors from "../../../constant/colors";
import { useFocusEffect } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  navigation?: any;
}

interface ImageItem {
  images: any;
}

const ProductTour: React.FC<Props> = ({ navigation }) => {
  const [lastIndex, setLastIndex] = useState<number>(1);
  const [progressValue, setProgressValue] = useState<number>(0);
  const insets = useSafeAreaInsets();
  const STATUSBAR_HEIGHT = Platform.OS === "ios" ? insets?.top : 0;
  const images: any = useMemo(
    () => [
      { images: imagePath?.ProductTourslider1 },
      { images: imagePath?.ProductTourslider2 },
      { images: imagePath?.ProductTourslider3 },
      { images: imagePath?.ProductTourslider4 },
      { images: imagePath?.ProductTourslider5 },
    ],
    []
  );

  const flatListRef = useRef<FlatList>(null);
  const productTourSeen = async () => {
    AsyncStorageUtils.storeItemKey(
      AsyncStorageUtils.PRODUCT_TOUR_COMPLETED,
      JSON.stringify({
        isPorductTourCompleted: true,
      })
    );
  };

  const scrollToIndex = useCallback(
    (index: number) => {
      if (index !== images.length) {
        flatListRef.current?.scrollToIndex({ index, animated: true });
        setProgressValue(0);
        setLastIndex(index + 1);
      } else {
        productTourSeen();
        navigation.navigate(navigationString.Login);
      }
    },
    [images.length, navigation]
  );
  useFocusEffect(
    useCallback(() => {
      const totalTime = lastIndex === 1 ? 6000 : 6000;
      const stepTime = 50;
      const progressStep = stepTime / totalTime;
      let progressInterval: NodeJS.Timeout;
      setProgressValue(0);
      progressInterval = setInterval(() => {
        setProgressValue((prev) => {
          const nextProgress = prev + progressStep;
          if (nextProgress >= 1) {
            clearInterval(progressInterval);
            scrollToIndex(lastIndex);
            return 1;
          }
          return nextProgress;
        });
      }, stepTime);

      return () => {
        clearInterval(progressInterval);
      };
    }, [lastIndex, scrollToIndex])
  );

  const getColors = [
    colors?.SurfCrest,
    colors?.SurfCrest,
    colors?.SurfCrest,
    colors?.polishedPine,
    colors?.SurfCrest,
  ];
  const getStatusBarColor = [
    colors?.backgroundTheme,
    colors?.backgroundTheme,
    colors?.polishedPine,
    colors?.prussianBlue,
    colors?.SurfCrest,
    colors?.backgroundTheme,
  ];

  const renderItem: ListRenderItem<ImageItem> = useCallback(
    ({ item, index }) => (
      <ImageBackground
        source={item?.images}
        style={{ width: width, height: height }}
        resizeMode="cover"
      >
        <View
          style={{
            width: width * 0.9,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            position: "absolute",
            top: STATUSBAR_HEIGHT,
            alignSelf: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              height: 6,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {images?.map((ind: any, i: any) => {
              return (
                <>
                  {index !== i && (
                    <View
                      style={[
                        {
                          backgroundColor:
                            index > i
                              ? colors?.royalOrangeDark
                              : getColors[index],
                        },
                        styles?.dotStyle,
                      ]}
                    />
                  )}
                  {index === i && (
                    <Progress.Bar
                      progress={progressValue}
                      width={moderateScale(100)}
                      height={moderateScale(2)}
                      borderColor={colors?.royalOrangeDark}
                      unfilledColor={colors?.minGray}
                      color={colors?.royalOrangeDark}
                      borderRadius={moderateScale(20)}
                    />
                  )}
                </>
              );
            })}
          </View>
          <TouchableOpacity
            onPress={() => {
              productTourSeen();
              navigation.navigate(navigationString.Login);
            }}
            disabled={false}
          >
            <Text
              style={{
                fontSize: textScale(18),
                color: colors.royalOrangeDark,
                fontWeight: "400",
                paddingHorizontal: moderateScale(15),
                paddingVertical: moderateScale(2),
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      // // <View style={{ height: height, width: width, backgroundColor: "red" }}>
      //   {/* {SvgSlideIcon(item.images)} */}

      // {/* </View> */}
    ),
    [images, progressValue]
  );

  return (
    <ScreenWrapper statusBarColor={getStatusBarColor[lastIndex]}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={images}
          scrollEnabled={false}
          horizontal
          bounces={false}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </ScreenWrapper>
  );
};

export default memo(ProductTour);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    height: height,
    width: width,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: moderateScale(80),
    paddingHorizontal: moderateScale(19),
  },
  dotStyle: {
    height: moderateScale(5),
    width: moderateScale(5),
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(5),
  },
});
