import React, { memo, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  NeutralIcon03,
  RelaxedIcon4,
  StressedIcon02,
  VeryRelaxedIcon5,
  VeryStressedIcon01,
} from "../../assets";
import { HapticModeEnum, Slider } from "./MySlider";
import { useSharedValue } from "react-native-reanimated";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import CommonBoxButton from "../Buttons/commonBoxButton";

const MoodWithSlider = ({ max, onChangeSliderValue, value }: any) => {
  const progress_ = useSharedValue(value || 1);
  const min_ = useSharedValue(1);
  const max_ = useSharedValue(5);
  const [sliderVal, setSliderVal] = useState(value ? value - 1 : 0);
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };
  const emoData: any[] = [
    {
      icon: VeryStressedIcon01,
      title: "1",
    },
    {
      icon: StressedIcon02,
      title: "2",
    },
    {
      icon: NeutralIcon03,
      title: "3",
    },
    {
      icon: RelaxedIcon4,
      title: "4",
    },
    {
      icon: VeryRelaxedIcon5,
      title: "5",
    },
  ];

  const renderItems = (item: any, index: any) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          // Update the slider value and call onChangeSliderValue
          setSliderVal(index);
          onChangeSliderValue(index + 1);
          progress_.value = index + 1; // Assuming progress_ is used for slider movement
          setSliderData(index + 1);
        }}
      >
        <CommonBoxButton
          SvgIcon={item?.icon}
          mainContainer={{
            ...styles.commonBoxButton,
            backgroundColor:
              index === sliderVal
                ? colors?.royalOrange
                : "rgba(255, 255, 255, 0.7)",
            height: index === sliderVal ? moderateScale(75) : moderateScale(65),
            width: index === sliderVal ? moderateScale(75) : moderateScale(65),
            borderRadius:
              index === sliderVal ? moderateScale(5) : moderateScale(0),
            opacity: index === sliderVal ? 1 : 0.5,
            borderRightWidth: index === sliderVal ? 0 : 1,
            borderBottomStartRadius:
              index === 0 || index === sliderVal ? 10 : 0,
            borderTopStartRadius: index === 0 || index === sliderVal ? 10 : 0,
            borderBottomEndRadius: index === 4 || index === sliderVal ? 10 : 0,
            borderTopEndRadius: index === 4 || index === sliderVal ? 10 : 0,
          }}
          isDisable
        />
      </TouchableOpacity>
    );
  };

  const getIndexForPair = (item: number) => {
    const round = Math.round(item);
    setSliderData(round);
    const itemIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].indexOf(round);
    if (itemIndex === -1) return null;
    setSliderVal(Math.floor(itemIndex));
    onChangeSliderValue(itemIndex + 1);
  };

  const [sliderData, setSliderData] = useState<any>(value || 1);

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          scrollEnabled={false}
          data={emoData}
          horizontal
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item, index }: any) => renderItems(item, index)}
          keyExtractor={(item, index) => "key" + index}
        />
      </View>
      {/* <View style={styles.sliderContainer}>
        <Slider
          progress={progress_}
          style={styles.sliderStyle}
          minimumValue={min_}
          maximumValue={max_}
          bubbleTranslateY={-50}
          step={max - 1}
          hapticMode={HapticModeEnum.STEP}
          onValueChange={(val) => getIndexForPair(val)}
          onHapticFeedback={() => {
            ReactNativeHapticFeedback.trigger("impactHeavy", options);
          }}
          renderThumb={() => (
            <View style={styles.thumbContainer}>
              <View style={styles.thumbInnerContainer}>
                <View style={styles.thumbInnerLine} />
                <View style={styles.thumbIcon} />
              </View>
              <Text style={styles.thumbText}>{sliderData}</Text>
            </View>
          )}
          renderBubble={() => <View style={styles.bubble} />}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: moderateScale(30),
    marginBottom: 30,
    marginLeft: moderateScale(5),
    marginTop: moderateScale(15),
  },
  flatListContainer: {
    width: "100%",
    paddingLeft: moderateScale(18),
  },
  flatListContent: {
    alignItems: "center",
  },
  itemContainer: {
    marginTop: moderateScale(10),
  },
  commonBoxButton: {
    borderColor: colors?.white,
  },
  sliderContainer: {
    paddingRight: moderateScale(10),
  },
  sliderStyle: {
    marginHorizontal: 10,
  },
  thumbContainer: {
    alignItems: "center",
    gap: moderateScale(10),
    paddingTop: moderateScale(25),
  },
  thumbInnerContainer: {
    alignItems: "center",
  },
  thumbInnerLine: {
    width: moderateScale(4),
    height: moderateScale(15),
    overflow: "hidden",
    backgroundColor: colors?.transparent,
  },
  thumbIcon: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(25),
    overflow: "hidden",
    backgroundColor: colors?.royalOrangeDark,
  },
  thumbText: {
    fontSize: textScale(24),
    color: colors?.royalOrangeDark,
    fontWeight: "500",
  },
  bubble: {
    backgroundColor: "red",
    alignItems: "center",
  },
});

export default memo(MoodWithSlider);
