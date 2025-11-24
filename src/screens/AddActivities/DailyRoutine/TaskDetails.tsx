import {
  Alert,
  Animated,
  Pressable,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useRef, useState } from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import {
  AlertCirclePrussian,
  ClockIcon,
  ClockSmallIcon,
  FireIcon,
  FlameIcon,
  HourGlassOulineHDew,
  HourGlassOutline,
  MoreCircle,
  MoreCircleHoneyDewBC,
  RightIcon,
} from "../../../assets";
import CommonBoxButton from "../../../components/Buttons/commonBoxButton";
import { strings } from "../../../constant/strings";
import style from "./styles";
import { capitalizeFirstLetter } from "../../../validations/capitalizeFirstLetter";
import RoundButton from "../../../components/Buttons/roundButton";

interface Props {
  mainBoxContainer?: ViewStyle;
  contentMainContainer?: ViewStyle;
  titleTextStyle?: TextStyle;
  timeStreakContainer?: ViewStyle;
  timeContainer?: ViewStyle;
  timeTextStyle?: TextStyle;
  fireIconStreakTextContainer?: ViewStyle;
  streakTextStyle?: TextStyle;
  data?: any;
  section?: any;
  onPress?: () => void;
  isWellnessplanDetials?: boolean;
  from?: any;
  activityImageContainerStyle?: ViewStyle;
  isAcceptedActivity?: boolean;
  animationKey: string;
  expandedKey: string | null;
  animationsValue?: any;
  morningTaskData?: any;
  setExpandedKey?: any;
  onLongPress?: () => void;
  isConflicts?: boolean;
  conflictMessage?: string;
  AigeneratedData?: any;
  hideActivityImage?: boolean;
}
const TaskDetails: React.FC<Props> = ({
  mainBoxContainer,
  contentMainContainer,
  titleTextStyle,
  timeStreakContainer,
  timeContainer,
  timeTextStyle,
  fireIconStreakTextContainer,
  streakTextStyle,
  data,
  section,
  onPress,
  isWellnessplanDetials,
  from,
  activityImageContainerStyle,
  isAcceptedActivity = false,
  onLongPress,
  isConflicts,
  conflictMessage,
  AigeneratedData,
  hideActivityImage = false,
}) => {
  const morningAndisWellnessplanDetials =
    section.title == strings.morning && isWellnessplanDetials;

  console.log(
    "dataishere===>>",
    data,
    "data?.status",
    data?.status,
    "from",
    from
  );

  return (
    <>
      {from && (
        <RoundButton
          mainContainer={[
            style?.roundBtnContainer,
            {
              backgroundColor:
                data?.status == "Completed"
                  ? colors?.polishedPine
                  : colors.themeColor,
              borderColor:
                data?.status == "Completed"
                  ? colors?.polishedPine
                  : colors.SurfCrest,
            },
          ]}
          SvgIcon={RightIcon}
          disable
        />
      )}

      <Animated.View
        style={[
          {
            flex: 1,
            flexDirection: "row",
          },
        ]}
      >
        <Pressable
          style={[style?.mainBoxContainer, mainBoxContainer]}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <View style={[style?.contentMainContainer, contentMainContainer]}>
            <View style={{}}>
              <Text style={[style?.titleTextStyle, titleTextStyle]}>
                {capitalizeFirstLetter(data.title)}
              </Text>
              <View style={[style?.timeStreakContainer, timeStreakContainer]}>
                <View style={[style?.timeContainer, timeContainer]}>
                  {data?.status == "Completed" ||
                  morningAndisWellnessplanDetials ? (
                    <ClockIcon />
                  ) : (
                    <ClockSmallIcon />
                  )}
                  <Text style={[style?.timeTextStyle, timeTextStyle]}>
                    {data.scheduleTime}
                  </Text>

                  {data?.status && data.activityType !== "Journaling" && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: moderateScale(50),
                      }}
                    >
                      {data?.status == "Completed" ||
                      morningAndisWellnessplanDetials ? (
                        <HourGlassOutline width={15} height={15} />
                      ) : (
                        <HourGlassOulineHDew width={15} height={15} />
                      )}
                      <Text style={[style?.timeTextStyle, timeTextStyle]}>
                        {data.status}
                      </Text>
                    </View>
                  )}
                </View>
                <View
                  style={[
                    style?.fireIconStreakTextContainer,
                    fireIconStreakTextContainer,
                  ]}
                >
                  {data?.status == "Completed" ||
                  morningAndisWellnessplanDetials ? (
                    <FireIcon />
                  ) : (
                    <FlameIcon />
                  )}
                  <Text style={[style?.streakTextStyle, streakTextStyle]}>
                    {data.frequency}
                  </Text>
                </View>
                {isAcceptedActivity && (
                  <View
                    style={{
                      backgroundColor: colors.orangeOp,
                      height: moderateScale(35),
                      borderRadius: moderateScale(15),
                      marginTop: moderateScale(10),
                      justifyContent: "center",
                      alignItems: "center",
                      // width: width
                    }}
                  >
                    <Text
                      style={{
                        fontSize: textScale(8),
                        marginHorizontal: moderateScale(10),
                        color: colors.darkPrussianBlue,
                      }}
                    >
                      {"Generated from"}
                    </Text>
                    <Text
                      style={{
                        fontSize: textScale(12),
                        marginHorizontal: moderateScale(10),
                        color: colors.darkPrussianBlue,
                      }}
                    >
                      {data?.activityFrom}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {!hideActivityImage && (
              <View>
                <CommonBoxButton
                  mainContainer={[
                    style?.commomBoxBtnContainer,
                    activityImageContainerStyle,
                  ]}
                  PngIcon={true}
                  source={data?.logo}
                  iconStyle={
                    {
                      // width: moderateScale(45),
                      // height: moderateScale(45),
                      // backgroundColor: colors?.SurfCrest,
                    }
                  }
                  resizeMode
                />
              </View>
            )}
          </View>

          {isConflicts && (
            <View
              style={{
                flexDirection: "row",
                gap: moderateScale(2),
                alignItems: "flex-start",
                backgroundColor: colors.royalOrange,
                borderRadius: moderateScale(8),
                overflow: "hidden",
                padding: moderateScale(5),
                marginTop: moderateScale(5),
              }}
            >
              <AlertCirclePrussian
                height={moderateScale(15)}
                width={moderateScale(15)}
              />
              <Text
                style={[
                  {
                    color: colors?.prussianBlue,
                    fontWeight: "500",
                    backgroundColor: colors.royalOrange,
                    marginTop: 0,
                    fontSize: textScale(10),
                    paddingHorizontal: moderateScale(5),
                  },
                ]}
              >
                {conflictMessage + " Click to see details."}
              </Text>
            </View>
          )}
        </Pressable>
      </Animated.View>
    </>
  );
};

export default TaskDetails;
