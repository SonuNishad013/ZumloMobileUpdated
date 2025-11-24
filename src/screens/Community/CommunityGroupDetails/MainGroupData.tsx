import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import { formatNumberTitle } from "../../../helper/CommunityHelper";
import { CalendarIcon } from "../../../assets";
import moment from "moment";
import navigationString from "../../../navigation/navigationString";
import { APPLY_STATUS, COMPONENT_NAMES_ENUM } from "../../../constant/ENUM";
import { strings } from "../../../constant/strings";
import { DATE_FORMAT } from "../../../constant/DateFormats";

interface Props {
  groupDetailsData?: any;
  navigation?: any;
  isAmMemberOfThisGroup?: any;
}
const MainGroupData: React.FC<Props> = ({
  groupDetailsData,
  navigation,
  isAmMemberOfThisGroup,
}) => {
  const removeIsAdmin = () => {
    if (!groupDetailsData?.isCreatedGroup) {
      const data = groupDetailsData?.members?.joinedMembers;
      return data?.slice(0, 5);
    } else {
      const data = groupDetailsData?.members?.joinedMembers?.filter(
        (itm: any) => itm?.isAdmin !== true
      );
      return data?.slice(0, 5);
    }
  };
  const members = Array.isArray(groupDetailsData?.members?.joinedMembers)
    ? removeIsAdmin()
    : [];

  const getGroupStatusColor = (item: any) => {
    if (item?.isAdmin) return colors?.royalOrange;
    if (item?.isMember) return colors?.polishedPine;
    if (item?.isInvited) return colors?.SurfCrest;
    return colors?.prussianBlue;
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={imagePath.communityDetailsBackground}
        style={styles.imageBackground}
        resizeMode={APPLY_STATUS?.contain}
      >
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={
                groupDetailsData?.profilePicture
                  ? { uri: groupDetailsData?.profilePicture }
                  : imagePath?.Chakras
              }
              style={styles.iconImage}
              resizeMode={APPLY_STATUS?.stretch}
            />
          </View>
          <Text style={styles.titleText}>
            {groupDetailsData?.name || strings?.groupName}
          </Text>
        </View>
        <Text style={styles.descriptionText}>
          {groupDetailsData?.description}
        </Text>
        <View style={styles.membersContainer}>
          <View style={styles.membersImageContainer}>
            {members?.map((item: any, index: any) => (
              <View key={strings?.key + index}>
                <Image
                  source={{ uri: item?.aliasProfilePicture }}
                  style={[
                    styles.memberImage,
                    index > 0 && styles.memberImageOverlap,
                    { borderColor: getGroupStatusColor(item) },
                  ]}
                />
              </View>
            ))}
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationString?.GroupAllMembers, {
                allMemberList: groupDetailsData?.members,
                from: COMPONENT_NAMES_ENUM?.groupDetails,
                isAmMemberOfThisGroup: isAmMemberOfThisGroup,
                groupId: groupDetailsData?.id,
                groupDetailsData,
              });
            }}
          >
            <Text style={styles.memberCountText}>
              {formatNumberTitle(
                groupDetailsData?.joinedMemberCount,
                groupDetailsData?.joinedMemberCount > 1
                  ? strings?.members
                  : strings?.member
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dateContainer}>
          <CalendarIcon />
          <Text style={styles.dateText}>
            {moment
              .utc(groupDetailsData?.createdDate)
              .local()
              .format(DATE_FORMAT?.Date_only)}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default MainGroupData;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SaltBox,
    borderBottomRightRadius: moderateScale(25),
    borderBottomLeftRadius: moderateScale(25),
    paddingHorizontal: moderateScale(19),
  },
  imageBackground: {
    paddingBottom: moderateScale(25),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.SurfCrest,
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    height: moderateScale(38),
    width: moderateScale(38),
    borderRadius: moderateScale(20),
  },
  titleText: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors.SurfCrest,
    marginLeft: moderateScale(10),
  },
  descriptionText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.SurfCrest,
    marginTop: moderateScale(10),
  },
  membersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateScale(15),
  },
  membersImageContainer: {
    flexDirection: "row",
  },
  memberImage: {
    width: moderateScale(39),
    height: moderateScale(39),
    borderRadius: moderateScale(39),
    borderWidth: moderateScale(1),
    borderColor: colors.SurfCrest,
  },
  memberImageOverlap: {
    marginLeft: moderateScale(-10),
  },
  memberCountText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.SurfCrest,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(15),
  },
  dateText: {
    marginHorizontal: moderateScale(5),
    fontSize: textScale(14),
    fontWeight: "500",
    color: colors.SurfCrest,
  },
});
