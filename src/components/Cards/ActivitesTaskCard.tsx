import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import colors from "../../constant/colors";
import {
  moderateScale,
  textScale,
  width,
} from "../../constant/responsiveStyle";
import CommonBoxButton from "../Buttons/commonBoxButton";
import { Alarm, CalendarIcon, CountDownIcon, RightIcon } from "../../assets";
import RoundButton from "../Buttons/roundButton";
import { capitalizeFirstLetter } from "../../validations/capitalizeFirstLetter";

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
  onPress?: () => void;
  isWellnessplanDetials?: boolean;
}
const ActivitesTaskCard: React.FC<Props> = ({
  mainBoxContainer,
  contentMainContainer,
  titleTextStyle,
  timeStreakContainer,
  timeContainer,
  timeTextStyle,
  fireIconStreakTextContainer,
  streakTextStyle,
  data,
  onPress,
  isWellnessplanDetials,
}) => {
  return (
    <>
      {!isWellnessplanDetials && (
        <RoundButton
          mainContainer={style?.roundBtnContainer}
          SvgIcon={RightIcon}
          disable
        />
      )}

      <Pressable
        style={[style?.mainBoxContainer, mainBoxContainer]}
        onPress={onPress}
      >
        <View style={[style?.contentMainContainer, contentMainContainer]}>
          <View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <View>
                  <Text style={[style?.titleTextStyle, titleTextStyle]}>
                    {capitalizeFirstLetter(data?.activity)}
                  </Text>
                  <Text style={[style?.desTextStyle]}>
                    {capitalizeFirstLetter(data?.subActivityName)}
                  </Text>
                </View>
                <CommonBoxButton
                  mainContainer={style?.commomBoxBtnContainer}
                  PngIcon={true}
                  source={data?.logo}
                  iconStyle={{}}
                  resizeMode
                />
              </View>
            </View>

            <View style={[style?.timeStreakContainer, timeStreakContainer]}>
              <View
                style={[
                  style?.fireIconStreakTextContainer,
                  fireIconStreakTextContainer,
                ]}
              >
                <CountDownIcon
                  height={moderateScale(18)}
                  width={moderateScale(18)}
                />
                <Text style={[style?.streakTextStyle, streakTextStyle]}>
                  {data?.frequencyCount + " " + "times"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: moderateScale(20),
                  marginTop: moderateScale(10),
                }}
              >
                <View style={[style?.timeContainer, timeContainer]}>
                  <Alarm height={moderateScale(18)} width={moderateScale(18)} />
                  <Text style={[style?.timeTextStyle, timeTextStyle]}>
                    {data?.duration}
                  </Text>
                </View>
                <View style={[style?.timeContainer, timeContainer]}>
                  <CalendarIcon
                    height={moderateScale(18)}
                    width={moderateScale(18)}
                  />
                  <Text style={[style?.timeTextStyle, timeTextStyle]}>
                    {data?.frequency}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default ActivitesTaskCard;

const style = StyleSheet.create({
  roundBtnContainer: {
    right: 13,
    top: 70,
    zIndex: 1,
    height: moderateScale(24),
    width: moderateScale(24),
    paddingTop: moderateScale(7),
    marginTop: moderateScale(15),
  },
  mainBoxContainer: {
    height: "auto",
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(10),
    padding: moderateScale(18),
  },
  contentMainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleTextStyle: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    width: width * 0.1,
  },
  desTextStyle: {
    fontSize: textScale(12),
    fontWeight: "400",
    color: colors?.SurfCrest,
    width: width * 0.6,
  },
  timeStreakContainer: { marginTop: moderateScale(18) },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeTextStyle: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.prussianBlue,
    marginLeft: moderateScale(5),
  },
  fireIconStreakTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(5),
  },
  streakTextStyle: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.prussianBlue,
    marginLeft: moderateScale(5),
  },
  commomBoxBtnContainer: {
    // height: moderateScale(45),
    // width: moderateScale(45),
    // borderRadius: moderateScale(10),
    backgroundColor: colors?.themeColor,
  },
  percentShowMainContainer: { marginTop: moderateScale(18) },

  lineFullContainer: {
    height: moderateScale(5),
    backgroundColor: colors?.surfLight,
    borderRadius: moderateScale(100),
    width: moderateScale(279),
    alignSelf: "center",
  },
  percentShowLine: {
    backgroundColor: colors?.royalOrange,
    width: "50%",
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
    color: colors?.prussianBlue,
  },
  commomBtnMainContainer: {
    height: moderateScale(18),
    width: moderateScale(84),
  },
  cmnBtnBtnStyle: {
    fontSize: textScale(10),
  },
  completedContainer: {
    flexDirection: "row",
    gap: moderateScale(5),
    alignItems: "center",
  },
});
