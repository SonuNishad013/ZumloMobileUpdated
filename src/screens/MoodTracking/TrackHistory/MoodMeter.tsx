import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import CustomImage from "../../../components/ImageRender";

interface Props {
  time?: string;
  meter?: any;
  source?: any;
  meterFill?: ViewStyle;
  container?: ViewStyle;
  meterBackground?: ViewStyle;
  tintColor?: string;
  isTintColor?: boolean;
  timeText?: TextStyle;
  hideEmoji?: boolean;
}

const MoodMeter: React.FC<Props> = ({
  time,
  source,
  meterFill,
  container,
  meterBackground,
  tintColor,
  isTintColor = false,
  timeText,
  hideEmoji = false,
}) => {
  return (
    <View style={[styles.container, container]}>
      <View style={[styles.meterBackground, meterBackground]}>
        {!hideEmoji && (
          <View style={[styles.meterFill, meterFill]}>
            <View style={styles.emojiContainer}>
              <CustomImage
                source={source}
                isTintColor={isTintColor}
                tintColor={tintColor}
                width={moderateScale(22)}
                height={moderateScale(22)}
                mainContainer={styles?.moodEmojiMainContainer}
              />
            </View>
          </View>
        )}
      </View>
      <Text style={[styles.timeText, timeText]}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: moderateScale(7),
  },
  meterBackground: {
    height: moderateScale(200),
    backgroundColor: colors?.lightGrey,
    width: moderateScale(24),
    borderRadius: moderateScale(11),
  },
  meterFill: {
    backgroundColor: colors?.prussianBlue,
    width: moderateScale(24),
    position: "absolute",
    bottom: moderateScale(0),
    borderRadius: moderateScale(11),
  },
  emojiContainer: {
    marginTop: moderateScale(2),
    alignItems: "center",
    borderRadius: moderateScale(30),
    backgroundColor: colors?.SurfCrest,
    padding: moderateScale(1),
  },
  timeText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.prussianBlue,
    textAlign: "center",
    marginTop: moderateScale(10),
  },
  moodEmojiMainContainer: {
    backgroundColor: colors?.prussianBlue,
    borderRadius: moderateScale(30),
  },
});

export default MoodMeter;
