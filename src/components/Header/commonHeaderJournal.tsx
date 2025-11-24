import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import {
  BackIcon,
  ChatCircleIcon,
  ChatIcon,
  ChatIconSurf,
  CrossIcon,
  EditPenBold,
  EditPenHoneyDew,
  MenuIcon,
  NoteText,
  AlertCircle,
  LampOnIcon,
} from "../../assets";
import { formatSentenceCase } from "../../helper/sentenceCase";

interface Props {
  mainContainer?: ViewStyle;
  headerName?: string;
  textStyle?: TextStyle;
  onBackPress?: () => void;
  textContainer?: ViewStyle;
  iconContainer?: ViewStyle;
  cal?: boolean;
  edit?: boolean;
  onCalPress?: () => void;
  editPress?: () => void;
  isTrending?: boolean;
  isCross?: boolean;
  onTrending?: () => void;
  onCancel?: () => void;
  onHInt?: () => void;
  onInfo?: () => void;
  skip?: any;
  onSkipPress?: () => void;
  skipTextStyle?: TextStyle;
  isOtherIcon?: boolean;
  onOtherIcon?: any;
  OtherIcon?: any;
  OtherIconWidth?: any;
  OtherIconHeight?: any;
  isBackIcon?: any;
  isSeeAll?: any;
  onViewHistory?: () => void;
  isGroupType?: any;
  groupType?: any;
  chornicType?: any;
  threeDot?: any;
  onDotClick?: () => void;
  isPost?: any;
  onPostPress?: () => void;
  isChatIcon?: any;
  onChat?: () => void;
  onHistory?: () => void;
  isHistory?: boolean;
  hint?: boolean;
  info?: boolean;
}

const CommonHeaderJournal: React.FC<Props> = ({
  hint,
  info,
  mainContainer,
  headerName,
  textStyle,
  textContainer,
  onBackPress,
  iconContainer,
  cal,
  onCalPress,
  editPress,
  isTrending,
  onTrending,
  onCancel,
  onHInt,
  onInfo,
  skip,
  onSkipPress,
  isCross,
  skipTextStyle,
  isOtherIcon,
  onOtherIcon,
  OtherIcon,
  OtherIconWidth,
  OtherIconHeight,
  isBackIcon = true,
  isSeeAll = false,
  onViewHistory,
  isGroupType,
  groupType,
  chornicType,
  threeDot,
  onDotClick,
  isPost,
  onPostPress,
  isChatIcon,
  onChat,
  edit,
  onHistory,
  isHistory,
}) => {
  return (
    <View style={[styles.mainContainer, mainContainer]}>
      <View style={{ flexDirection: "row" }}>
        {isBackIcon && (
          <TouchableOpacity
            style={[styles.iconContainer, iconContainer]}
            onPress={onBackPress}
          >
            <BackIcon />
          </TouchableOpacity>
        )}
        <View style={[styles.textContainer, textContainer]}>
          <Text style={[styles.textStyle, textStyle]}>{headerName}</Text>
        </View>
      </View>
      {cal ? (
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity onPress={onCalPress}>
            <NoteText
              height={`${moderateScale(24)}`}
              width={`${moderateScale(24)}`}
            />
          </TouchableOpacity>
        </View>
      ) : null}
      {edit ? (
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity onPress={editPress}>
            <EditPenBold width={moderateScale(22)} height={moderateScale(22)} />
          </TouchableOpacity>
        </View>
      ) : null}
      {skip ? (
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity onPress={onSkipPress}>
            <Text style={[styles?.skipTextStyle, skipTextStyle]}>Skip</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {isOtherIcon && (
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity onPress={onOtherIcon}>
            <OtherIcon
              width={`${OtherIconWidth}`}
              height={`${OtherIconHeight}`}
            />
          </TouchableOpacity>
        </View>
      )}
      {isTrending ? (
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity
            onPress={onTrending}
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: moderateScale(20),
              borderWidth: moderateScale(1),
              borderColor: colors.brightGray,
              height: moderateScale(30),
              width: moderateScale(102),
            }}
          >
            <Text style={{ color: colors.brightGray }}>{"Trending"}</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {chornicType || groupType ? (
        <View
          style={{
            flexDirection: "row",
            gap: moderateScale(10),
          }}
        >
          {chornicType ? (
            <View style={{ justifyContent: "center" }}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: moderateScale(15),
                  borderWidth: moderateScale(1),
                  borderColor: colors.polishedPine,
                  height: moderateScale(20),
                  paddingHorizontal: moderateScale(13),
                  backgroundColor: colors?.polishedPine,
                }}
              >
                <Text
                  style={{
                    color: colors.SurfCrest,
                    fontSize: textScale(10),
                    fontWeight: "600",
                  }}
                >
                  {chornicType}
                  {/* groupType */}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {groupType ? (
            <View style={{ justifyContent: "center" }}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: moderateScale(15),
                  borderWidth: moderateScale(1),
                  borderColor: colors.royalOrange,
                  height: moderateScale(20),
                  paddingHorizontal: moderateScale(13),
                  backgroundColor: colors?.royalOrange,
                }}
              >
                <Text
                  style={{
                    color: colors.prussianBlue,
                    fontSize: textScale(10),
                    fontWeight: "600",
                  }}
                >
                  {groupType}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {threeDot ? (
            <TouchableOpacity
              onPress={onDotClick}
              style={{
                justifyContent: "center",
                transform: [{ rotate: "90deg" }],
              }}
            >
              <MenuIcon />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}

      {isCross ? (
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity onPress={onCancel}>
            <CrossIcon width={moderateScale(14)} height={moderateScale(14)} />
          </TouchableOpacity>
        </View>
      ) : null}
      {hint ? (
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity onPress={onHInt}>
            <LampOnIcon width={moderateScale(22)} height={moderateScale(22)} />
          </TouchableOpacity>
        </View>
      ) : null}
      {info ? (
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity onPress={onInfo}>
            <AlertCircle width={moderateScale(22)} height={moderateScale(22)} />
          </TouchableOpacity>
        </View>
      ) : null}
      {isChatIcon ? (
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity onPress={onChat}>
            <ChatIconSurf
              width={moderateScale(25)}
              height={moderateScale(25)}
            />
          </TouchableOpacity>
        </View>
      ) : null}
      {isSeeAll && (
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity onPress={onViewHistory}>
            <Text
              style={{
                color: colors.SurfCrest,
                fontSize: textScale(14),
                fontWeight: "700",
              }}
            >
              {"View history"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {isPost ? (
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity
            onPress={onPostPress}
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: moderateScale(20),
              borderWidth: moderateScale(1),
              borderColor: colors.brightGray,
              height: moderateScale(30),
              width: moderateScale(102),
            }}
          >
            <Text style={{ color: colors.brightGray }}>{isPost}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {isHistory && (
        <Text style={styles.textStyle} onPress={onHistory}>
          {"History"}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    height: moderateScale(30),
    width: moderateScale(30),
    backgroundColor: colors.backIconBg,
    borderRadius: moderateScale(7),
    justifyContent: "center",
    alignItems: "center",
    // marginTop: moderateScale(10),
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    marginHorizontal: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  skipTextStyle: {
    fontSize: textScale(12),
    fontWeight: "500",
    color: colors?.white,
  },
});
export default CommonHeaderJournal;
