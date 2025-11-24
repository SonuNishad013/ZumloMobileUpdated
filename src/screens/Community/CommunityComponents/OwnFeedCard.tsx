import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import { HeartIconPb, CommentIconPb, ShareIconPb } from "../../../assets";
import { formatNumberTitle, timeAgo } from "../../../helper/CommunityHelper";
import { APPLY_STATUS } from "../../../constant/ENUM";
import { strings } from "../../../constant/strings";

interface Props {
  onHeartIcon?: any;
  onShareIcon?: any;
  onCommentIcon?: any;
  name?: string;
  time?: string;
  dpSource?: any;
  postSource?: any;
  likes?: any;
  massage?: any;
  imageStyle?: ImageStyle;
  onPressDot?: any;
  onCardPress?: any;
}

const OwnFeedCard: React.FC<Props> = ({
  name,
  onHeartIcon,
  onShareIcon,
  onCommentIcon,
  time,
  dpSource,
  postSource,
  likes,
  massage,
  imageStyle,
  onPressDot,
  onCardPress,
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onCardPress}
        activeOpacity={0.8}
        style={styles.cardContainer}
      >
        <View style={styles.headerContainer}>
          <View style={styles.row}>
            <View style={styles.imageContainer}>
              <Image
                source={dpSource}
                style={[styles.image, imageStyle]}
                resizeMode={APPLY_STATUS?.stretch}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{strings?.postedOn}</Text>
              <Text style={styles.timeText}>{timeAgo(time)}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.moreIconContainer}
            onPress={onPressDot}
          >
            <Image style={styles.moreIcon} source={imagePath?.MoreVertical} />
          </TouchableOpacity>
        </View>

        <View style={styles.mainImageContainer}>
          <Image source={postSource} style={styles.mainImage} />
        </View>
        <Text style={[styles.nameText, styles.marginTop15]}>
          {strings?.Feeling_mehh}
        </Text>
        <Text style={[styles.DescriptionText, styles.marginTop5]}>
          {strings?.paragraph}
        </Text>
      </TouchableOpacity>
      <View style={styles.actionContainer}>
        <View style={styles.centerRow}>
          <TouchableOpacity
            style={[styles.action, styles.minWidth90]}
            onPress={onHeartIcon}
          >
            <HeartIconPb />
            <Text style={styles.actionText}>{formatNumberTitle(likes)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.action, styles.minWidth90, styles.marginLeft10]}
            onPress={onCommentIcon}
          >
            <CommentIconPb />
            <Text style={styles.actionText}>{formatNumberTitle(massage)}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.action} onPress={onShareIcon}>
          <ShareIconPb />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default OwnFeedCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.SaltBox,
    width: "100%",
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(19),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.SurfCrest,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  textContainer: {
    marginHorizontal: moderateScale(10),
  },
  nameText: {
    color: colors.SurfCrest,
    fontWeight: "600",
    fontSize: textScale(14),
  },
  timeText: {
    color: colors.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(10),
  },
  DescriptionText: {
    color: colors.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(10),
  },
  actionContainer: {
    padding: moderateScale(15),
    height: moderateScale(45),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    height: moderateScale(30),
  },
  actionText: {
    marginHorizontal: moderateScale(5),
    fontSize: textScale(14),
    color: colors.prussianBlue,
    fontWeight: "400",
  },
  mainImageContainer: {
    backgroundColor: colors?.SurfCrest,
    marginTop: moderateScale(15),
    height: moderateScale(188),
    borderRadius: moderateScale(11),
  },
  mainImage: {
    height: "100%",
    width: "100%",
    borderRadius: moderateScale(11),
  },
  moreIconContainer: {
    height: moderateScale(25),
    width: moderateScale(25),
    justifyContent: "center",
    alignItems: "center",
  },
  moreIcon: {
    height: moderateScale(19),
    width: moderateScale(19),
  },
  marginTop15: {
    marginTop: moderateScale(15),
  },
  marginTop5: {
    marginTop: moderateScale(5),
  },
  centerRow: {
    justifyContent: "center",
    flexDirection: "row",
  },
  minWidth90: {
    minWidth: moderateScale(90),
  },
  marginLeft10: {
    marginLeft: moderateScale(10),
  },
});
