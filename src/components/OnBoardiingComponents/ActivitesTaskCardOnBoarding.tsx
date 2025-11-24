import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { AlertCircle, AlertCirclePrussian } from "../../assets";
interface Props {
  title?: any;
  subTitle?: any;
  container?: ViewStyle;
  cardPress?: () => void;
  image?: any;
  isConflict?: boolean;
  conflictMessage?: string;
}
const ActivitesTaskCardOnBoarding: React.FC<Props> = ({
  title,
  subTitle,
  container,
  cardPress,
  image,
  isConflict,
  conflictMessage,
}) => {
  return (
    <TouchableOpacity
      onPress={cardPress}
      activeOpacity={0.7}
      style={[styles.container, container]}
    >
      <Image
        style={{
          alignSelf: "center",
          marginVertical: moderateScale(20),
          width: moderateScale(170),
          height: moderateScale(140),
          borderRadius: 8,
        }}
        resizeMode="contain"
        source={{ uri: image }}
      />
      <View style={[styles.textContainer]}>
        <Text style={styles.titleText} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitleText} numberOfLines={2}>
          {subTitle}
        </Text>
        {isConflict && (
          <View
            style={{
              flexDirection: "row",
              gap: moderateScale(2),
              alignItems: "flex-start",
              backgroundColor: colors.royalOrange,
              width: "100%",
              borderRadius: moderateScale(8),
              overflow: "hidden",
              paddingLeft: moderateScale(5),
              padding: moderateScale(5),
              marginTop: moderateScale(5),
            }}
          >
            <AlertCirclePrussian
              height={moderateScale(20)}
              width={moderateScale(20)}
            />
            <Text
              style={[
                styles.subtitleText,

                {
                  color: colors?.prussianBlue,
                  fontWeight: "500",
                  backgroundColor: colors.royalOrange,
                  marginTop: 0,
                  paddingHorizontal: 5,
                },
              ]}
              // numberOfLines={2}
            >
              {conflictMessage + " Click to see details."}
            </Text>
          </View>
        )}
      </View>

      {/* <View style={styles.timeContainer}>
        <WatchIcon
          height={`${moderateScale(18)}`}
          width={`${moderateScale(18)}`}
        />

        <Text style={styles.timeText}>{time}</Text>
      </View>
      <View style={styles.lineFullContainer}>
        <View style={[styles.percentShowLine, percentShowLine]} />
      </View>
      <View style={styles.perStatusContainer}>
        <Text style={styles.percentTextStyle}>{"Duration"}</Text>
        <Text style={styles.percentTextStyle}>{setDuration}</Text>
      </View> */}
    </TouchableOpacity>
  );
};
export default ActivitesTaskCardOnBoarding;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.polishedPine,
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    tintColor: colors?.prussianBlue,
    height: moderateScale(13),
    width: moderateScale(13),
  },
  iconContainer: {
    height: moderateScale(30),
    width: moderateScale(30),
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(8),
  },
  textContainer: {
    marginRight: moderateScale(15),
    width: "100%",
  },
  titleText: {
    fontSize: textScale(18),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginRight: moderateScale(10),
  },
  subtitleText: {
    fontSize: textScale(12),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginRight: moderateScale(10),
    marginTop: moderateScale(3),
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(10),
  },
  timeText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginLeft: moderateScale(5),
  },
  lineFullContainer: {
    height: moderateScale(5),
    backgroundColor: colors?.surfLight,
    borderRadius: moderateScale(100),
    marginTop: moderateScale(12),
  },
  percentShowLine: {
    backgroundColor: colors?.SurfCrest,
    width: "0%",
    height: moderateScale(5),
    borderRadius: moderateScale(100),
  },
  perStatusContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: moderateScale(10),
    alignItems: "center",
    marginLeft: moderateScale(5),
  },
  percentTextStyle: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
});
