import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import CommonBoxButton from "../Buttons/commonBoxButton";
import {
  AlertCirclePrussian,
  CircleRightOrg,
  WatchIcon,
  WhiteFireIcon,
  Alarm,
  IconClock,
  FireIcon,
  AlarmDark,
} from "../../assets";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { formatSentenceCase } from "../../helper/sentenceCase";
import { Ennum_ListedIn } from "../../constant/ENUM";
import logger from "../../constant/logger";
import { defaultActivityImage } from "../../assets/png/imagePath";

interface Props {
  title?: any;
  subTitle?: any;
  time?: any;
  setDuration?: any;
  percentShowLine?: ViewStyle;
  container?: ViewStyle;
  cardPress?: () => void;
  isCompleted?: any;
  source?: any;
  activeOpacity?: any;
  allData?: any;
  inSummary?: boolean;
  isConflict?: boolean;
  conflictMessage?: string;
  invertColor?: boolean;
  iconContainer?: ViewStyle;
  titleTextStyle?: TextStyle;
  subtitleTextStyle?: TextStyle;
  listedIn?: string;
}

const TaskCardOnBoarding: React.FC<Props> = ({
  title,
  subTitle,
  time,
  setDuration,
  container,
  cardPress,
  isCompleted,
  source,
  activeOpacity,
  allData,
  inSummary,
  isConflict,
  conflictMessage,
  invertColor = true,
  iconContainer,
  titleTextStyle,
  subtitleTextStyle,
  listedIn,
}) => {
  logger("allLoges_____", {
    title,
    subTitle,
    time,
    setDuration,
    container,
    cardPress,
    isCompleted,
    source,
    activeOpacity,
    allData,
    inSummary,
    isConflict,
    conflictMessage,
    iconContainer,
    titleTextStyle,
    subtitleTextStyle,
    listedIn,
  });
  const getStatusTextColor = (text: any) => {
    switch (text) {
      case "Partially-Completed":
        return {
          textColor: colors.darkPrussianBlue,
          backgroundColor: colors.royalOrangeDark,
        };
      case "Not-Started":
        return {
          textColor: colors.darkPrussianBlue,
          backgroundColor: colors.SurfCrest,
        };
      case "Completed":
        return {
          textColor: colors.backIconBg2,
          backgroundColor: colors.SurfCrest,
        };

      case "Expired":
        return {
          textColor: colors.darkPrussianBlue,
          backgroundColor: colors.SurfCrest,
        };
      case "Started":
        return {
          textColor: colors.SurfCrest,
          backgroundColor: colors.polishedPine,
        };
      default:
        break;
    }
  };

  logger("source_____", source);
  return (
    <TouchableOpacity
      onPress={cardPress}
      activeOpacity={activeOpacity ?? 0.7}
      style={[styles.container, container]}
    >
      <View style={styles.header}>
        <CommonBoxButton
          PngIcon={true}
          source={source ?? defaultActivityImage}
          mainContainer={[styles.iconContainer, iconContainer]}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.titleText, titleTextStyle]} numberOfLines={2}>
            {formatSentenceCase(title)}
          </Text>
          <Text
            style={[styles.subtitleText, subtitleTextStyle]}
            numberOfLines={2}
          >
            {formatSentenceCase(subTitle)}
          </Text>
        </View>
        {!invertColor && ( //status
          <View>
            <Text
              style={{
                fontSize: textScale(8),
                fontWeight: "600",
                color: "red",
                // color: getStatusTextColor(allData?.status)?.textColor,
                // textDecorationLine: "underline",
              }}
            >
              {allData?.status}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.timeContainer}>
        <View
          style={[
            styles.timeInnerContainer,
            { justifyContent: "space-between" },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {listedIn !== Ennum_ListedIn?.Goals ? (
              <WatchIcon height={moderateScale(18)} width={moderateScale(18)} />
            ) : (
              <IconClock height={moderateScale(18)} width={moderateScale(18)} />
            )}

            <Text
              style={[
                styles.timeText,
                {
                  color:
                    listedIn !== Ennum_ListedIn?.Goals
                      ? colors?.SurfCrest
                      : colors?.prussianBlue,
                },
              ]}
            >
              {time}
            </Text>
          </View>
        </View>

        {allData?.frequency && (
          <View style={styles.timeInnerContainer}>
            {listedIn !== Ennum_ListedIn?.Goals ? (
              <WhiteFireIcon
                height={moderateScale(18)}
                width={moderateScale(18)}
              />
            ) : (
              <FireIcon height={moderateScale(18)} width={moderateScale(18)} />
            )}
            <Text
              style={[
                styles.timeText,
                {
                  color:
                    listedIn !== Ennum_ListedIn?.Goals
                      ? colors?.SurfCrest
                      : colors?.prussianBlue,
                },
              ]}
            >
              {allData?.frequency}
            </Text>
          </View>
        )}

        {!allData?.isFeatured && (
          <View style={styles.timeInnerContainer}>
            {listedIn !== Ennum_ListedIn?.Goals ? <Alarm /> : <AlarmDark />}
            {isCompleted ? (
              <View style={styles.completedContainer}>
                <CircleRightOrg />
                <Text
                  style={[
                    styles.percentTextStyle,
                    {
                      color:
                        listedIn !== Ennum_ListedIn?.Goals
                          ? colors?.SurfCrest
                          : colors?.prussianBlue,
                    },
                  ]}
                >
                  {"Completed"}
                </Text>
              </View>
            ) : (
              <Text
                style={[
                  styles.timeText,
                  {
                    color:
                      listedIn !== Ennum_ListedIn?.Goals
                        ? colors?.SurfCrest
                        : colors?.prussianBlue,
                  },
                ]}
              >
                {setDuration}
              </Text>
            )}
          </View>
        )}
      </View>

      <View
        style={{
          flex: 1,

          alignItems: "center",
          justifyContent: "flex-end",
          gap: 15,
          flexDirection: "row",
        }}
      >
        {allData?.status && ( //status
          <View
            style={{
              backgroundColor: getStatusTextColor(allData?.status)
                ?.backgroundColor,
              borderRadius: moderateScale(50),
            }}
          >
            <Text
              style={{
                fontSize: textScale(10),
                fontWeight: "600",
                color: getStatusTextColor(allData?.status)?.textColor,
                marginHorizontal: 10,
                marginVertical: 5,
              }}
            >
              {allData?.status}
            </Text>
          </View>
        )}
        {inSummary && (
          <View
            style={{
              backgroundColor: colors?.surfCrustOp3,
              borderRadius: moderateScale(50),
            }}
          >
            <Text
              style={{
                marginHorizontal: 10,
                marginVertical: 5,
                fontSize: textScale(10),
                color: colors?.SurfCrest,
                fontWeight: "400",
              }}
            >
              Generated from{" "}
              <Text
                style={{ color: colors?.royalOrangeDark, fontWeight: "600" }}
              >
                {allData?.activityFrom}
              </Text>
            </Text>
          </View>
        )}
      </View>

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
          >
            {conflictMessage + " Click to see details."}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default TaskCardOnBoarding;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.polishedPine,
    padding: moderateScale(13),
    borderRadius: moderateScale(10),
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    height: moderateScale(34),
    width: moderateScale(34),
  },
  iconContainer: {
    height: moderateScale(40),
    width: moderateScale(40),
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(8),
  },
  textContainer: {
    marginLeft: moderateScale(15),

    flex: 1,
  },
  titleText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginRight: moderateScale(10),
    // width: "94%",
  },
  subtitleText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginRight: moderateScale(10),
    marginTop: moderateScale(5),
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(10),

    gap: moderateScale(25),
  },
  timeInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    width: "70%",
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
  completedContainer: {
    flexDirection: "row",
    gap: moderateScale(5),
    alignItems: "center",
  },
});
