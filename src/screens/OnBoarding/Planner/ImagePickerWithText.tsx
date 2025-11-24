import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { imagePath } from "../../../assets/png/imagePath";
import React from "react";
import CustomImage from "../../../components/ImageRender";
import { Enum_ComponentUsedInForCustomImage } from "../../../constant/ENUM";
import FastImage from "react-native-fast-image";

interface Props {
  dataFlatList?: any;
  title?: string;
  image?: any;
  optionLabel?: string;
  handleButtonClick?: any;
  index?: number;
  onViewableItemsChanged?: any;
  flatMainContainer?: ViewStyle;
  imageStyle?: any;
  mainContainer?: ViewStyle;
  socialBg?: boolean;
  headingSocial?: TextStyle;
  touchableOpacityStyle?: ViewStyle;
  touchableOpacityOnpress?: () => void;
  activeOpacity?: any;
  loader?: any;
  indexItem?: any;
}

const ImagePickerWithText: React.FC<Props> = ({
  dataFlatList,
  title,
  image,
  optionLabel,
  handleButtonClick,
  index,
  onViewableItemsChanged,
  flatMainContainer,
  imageStyle,
  mainContainer,
  socialBg,
  headingSocial,
  touchableOpacityStyle,
  touchableOpacityOnpress,
  activeOpacity,
  loader,
  indexItem,
}) => {
  return (
    <>
      <View style={[styles?.mainContainer, mainContainer]}>
        <View style={styles?.lessIconContainer}>
          {index == 0 ? null : (
            <TouchableOpacity onPress={() => handleButtonClick(false)}>
              <Image
                style={[
                  styles?.iconStyle,
                  { transform: [{ rotate: "180deg" }] },
                ]}
                source={imagePath?.GreaterNext}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles?.flatMainContainer, flatMainContainer]}>
          {loader ? null : ( // <LoaderSalt />
            <FlatList
              data={dataFlatList}
              horizontal
              scrollEnabled={false}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={{
                itemVisiblePercentThreshold: 50,
              }}
              pagingEnabled
              snapToAlignment="start"
              decelerationRate="fast"
              keyExtractor={(item: any, index) => `${index}`}
              renderItem={({ item, index }) => {
                return (
                  <>
                    <TouchableOpacity
                      onPress={touchableOpacityOnpress}
                      style={touchableOpacityStyle}
                      activeOpacity={activeOpacity ? activeOpacity : 1}
                    >
                      {socialBg ? (
                        <FastImage
                          source={{
                            uri: image,
                          }}
                          style={[styles?.imageStyle, imageStyle]}
                          resizeMode={"contain"}
                        >
                          <Text style={[styles?.headingText, headingSocial]}>
                            {title}
                          </Text>
                        </FastImage>
                      ) : (
                        <CustomImage
                          source={{
                            uri: image,
                          }}
                          width={
                            indexItem == 5
                              ? moderateScale(120)
                              : moderateScale(149)
                          }
                          height={
                            indexItem == 5
                              ? moderateScale(120)
                              : moderateScale(149)
                          }
                          isTintColor={false}
                          SkeletonPlaceholderW={
                            indexItem == 5
                              ? moderateScale(120)
                              : moderateScale(149)
                          }
                          SkeletonPlaceholderH={
                            indexItem == 5
                              ? moderateScale(120)
                              : moderateScale(149)
                          }
                          componentUsedIn={
                            Enum_ComponentUsedInForCustomImage?.OnboardingFlow
                          }
                        />
                      )}
                    </TouchableOpacity>
                  </>
                );
              }}
            />
          )}
        </View>
        <View style={styles?.greaterIconContainer}>
          {index == dataFlatList?.length - 1 ? null : (
            <TouchableOpacity onPress={() => handleButtonClick(true)}>
              <Image
                style={[styles?.iconStyle]}
                source={imagePath?.GreaterNext}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {socialBg ? null : (
        <View style={styles?.titleDescriptionStyle}>
          <Text style={styles?.headingText}>{title}</Text>
          <Text style={styles?.subHeadingText}>{optionLabel}</Text>
        </View>
      )}
    </>
  );
};

export default ImagePickerWithText;
const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(90),
  },
  contentContainerStyle: { alignItems: "center" },
  flatMainContainer: {
    width: moderateScale(149),
    height: moderateScale(149),
    // width: moderateScale(151),
    // height: moderateScale(151),
  },
  imageStyle: {
    width: moderateScale(149),
    height: moderateScale(149),
  },

  questionText: {
    fontWeight: "500",
    fontSize: textScale(25),
    color: colors?.SurfCrest,
    textAlign: "center",
    alignSelf: "center",
    width: "87%",
  },

  headingText: {
    fontWeight: "700",

    fontSize: textScale(24),
    color: colors?.SurfCrest,
    alignSelf: "center",
  },
  subHeadingText: {
    fontWeight: "400",
    fontSize: textScale(14),
    color: colors?.SurfCrest,
    marginTop: moderateScale(30),
    alignSelf: "center",
    textAlign: "center",
    width: "87%",
  },
  lessIconContainer: {
    width: moderateScale(25),
    alignItems: "flex-start",
  },
  greaterIconContainer: {
    width: moderateScale(25),
    alignItems: "flex-end",
  },
  iconStyle: {
    height: moderateScale(24),
    width: moderateScale(20),
    tintColor: colors?.SurfCrest,
  },
  titleDescriptionStyle: {
    marginTop: moderateScale(30),
    height: moderateScale(100),
  },
});
