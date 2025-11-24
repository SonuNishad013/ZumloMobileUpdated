import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import {
  HeartIconPb,
  CommentIconPb,
  ShareIconPb,
  FilledHeart,
  CornerDownLeft,
  UnsaveIcon,
  SaveIcon,
  FilledHeartColorable,
} from "../../../assets";
import {
  decodeSpaces,
  formatNumberTitle,
} from "../../../helper/CommunityHelper";
import { imagePath } from "../../../assets/png/imagePath";
import {
  allowedImageFormats,
  allowedVideoFormats,
  feedShareType,
  menuDataFeedOther,
  menuDataFeedOtherWithDelete,
  menuDataFeedSelf,
  postCode,
  shareFeedMenu,
  switchCodes,
} from "../../../constant/CommunityConstant";
import { strings } from "../../../constant/strings";
import allActions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import RBsheetForComment from "../../../components/RBsheetForComment";
import RBsheetForDotMenu from "../../../components/RBsheetForComment/RBsheetForDotMenu";
import moment from "moment";
import Carousel from "react-native-snap-carousel";
import { lookup } from "react-native-mime-types";
import Video from "react-native-video";
import navigationString from "../../../navigation/navigationString";
import RBsheetForShare from "../../../components/RBsheetForComment/RBsheetForShare";
import { useFocusEffect } from "@react-navigation/native";
import LogoutModal from "../../../components/CommonAlert/logoutModal";
import { getPostStatus } from "../../../redux/selector";
import { APPLY_STATUS, COMPONENT_NAMES_ENUM } from "../../../constant/ENUM";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import logger from "../../../constant/logger";
import FastImage from "react-native-fast-image";
import CommonLoader from "../../../components/Loader";
import { textLabelSize } from "../../../utils/TextConfig";

interface Props {
  onShareIcon?: any;
  name?: string;
  isPost?: any;
  itemData?: any;
  allFeeds?: any;
  setAllFeeds?: any;
  index?: any;
  setToasterDetails?: any;
  isTopDetails?: any;
  navigation?: any;
  groupPrivacy?: string;
  whereFrom?: any;
  postReShared?: any;
}

const SCREEN_WIDTH = Dimensions.get("window").width;

const FeedCard: React.FC<Props> = ({
  onShareIcon,
  isPost,
  itemData,
  allFeeds,
  setAllFeeds,
  index,
  setToasterDetails,
  isTopDetails,
  navigation,
  groupPrivacy,
  whereFrom,
  postReShared,
}) => {
  const dispatch: any = useDispatch();
  const rbSheetRef = useRef<any>(null);
  const rbSheetRefMenu = useRef<any>(null);
  const rbSheetRefShare = useRef<any>(null);
  const carouselRef = useRef<any>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [groupTab, setGroupTab] = useState<any>();
  const [memberListData, setMemberListData] = useState<any>([]);
  const [deleteAccountAlert, setDeleteAccountAlert] = useState(false);
  const postStatus = useSelector(getPostStatus());
  const [commentSheetEnable, setCommentSheetEnable] = useState(false);
  useEffect(() => {
    setCommentCount(itemData?.commentsCount);
  }, [itemData?.commentsCount]);

  const rendeHeader = (value: any) => {
    switch (value) {
      case postCode?.self:
        return (
          <View style={styles.headerContainer}>
            <View style={styles.row}>
              <View style={styles.imageContainer}>
                <Image
                  source={imagePath?.Calander}
                  style={styles.calendarIcon}
                  resizeMode={APPLY_STATUS?.stretch}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{strings?.postedOn}</Text>
                <Text style={styles.timeText}>
                  {moment.utc(itemData?.createdTime)?.local()?.fromNow()}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.moreIconContainer}
              onPress={() => {
                rbSheetRefMenu.current?.open();
              }}
            >
              <Image style={styles.moreIcon} source={imagePath?.MoreVertical} />
            </TouchableOpacity>
          </View>
        );
      case postCode?.group:
        return (
          <View style={styles.headerContainer}>
            <View style={styles.row}>
              <View style={styles.imageContainer}>
                <Image
                  source={imagePath?.Calander}
                  style={styles.calendarIcon}
                  resizeMode={APPLY_STATUS?.stretch}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{strings?.postedOn}</Text>
                <Text style={styles.timeText}>
                  {moment.utc(itemData?.createdTime)?.local()?.fromNow()}
                </Text>
              </View>
            </View>
            <View style={styles.groupHeaderRight}>
              <View style={styles.groupInfoContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.timeText}>{itemData?.aliasName}</Text>
                </View>
                <View style={styles.groupImageContainer}>
                  <Image
                    source={{ uri: itemData?.aliasProfilePicture }}
                    style={styles.groupImage}
                    resizeMode={APPLY_STATUS?.stretch}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.moreIconContainer}
                onPress={() => {
                  rbSheetRefMenu.current?.open();
                }}
              >
                <Image
                  style={styles.moreIcon}
                  source={imagePath?.MoreVertical}
                />
              </TouchableOpacity>
            </View>
          </View>
        );

      default:
        return (
          <View style={styles.row}>
            <View style={styles.imageContainer}>
              <Image
                source={
                  itemData?.aliasProfilePicture
                    ? { uri: itemData?.aliasProfilePicture }
                    : imagePath?.dummyProfileIcon
                }
                style={styles.image}
                resizeMode={APPLY_STATUS?.stretch}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{itemData?.name}</Text>
              <Text style={styles.timeText}>
                {moment.utc(itemData?.createdTime)?.local()?.fromNow()}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.moreIconContainer}
              onPress={() => {}}
            >
              <Image style={styles.moreIcon} source={imagePath?.MoreVertical} />
            </TouchableOpacity>
          </View>
        );
    }
  };

  const updateFeedData = (updateFor: String) => {
    if (updateFor === COMPONENT_NAMES_ENUM?.ForSaveOrUnsaveFeeds) {
      return allFeeds?.map((feed: any, i: any) =>
        i === index
          ? {
              ...feed,
              isFeedSavedByLoggedInMember: !feed?.isFeedSavedByLoggedInMember,
            }
          : feed
      );
    } else {
      return allFeeds?.map((feed: any, i: any) =>
        i === index
          ? {
              ...feed,
              likesCount: feed?.isFeedLikedByLoggedInUser
                ? feed?.likesCount - 1
                : feed?.likesCount + 1,
              isFeedLikedByLoggedInUser: !feed?.isFeedLikedByLoggedInUser,
            }
          : feed
      );
    }
  };
  const likeFeed = async () => {
    let requestBody = {
      feedId: itemData?.id,
      isLike: !itemData?.isFeedLikedByLoggedInUser,
    };
    try {
      const response = await allActions.communitiesAction.likeFeed(
        dispatch,
        requestBody,
        API_FUN_NAMES?.likeFeed
      );
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setAllFeeds(updateFeedData(API_FUN_NAMES?.forLikes));
      } else {
        setToasterDetails(TOAST_STATUS?.ERROR, response?.message);
      }
    } catch (err: any) {
      setToasterDetails(TOAST_STATUS?.ERROR, err?.message);
    }
  };
  const managedLoader = (status: any, index_: any) => {
    setIsLoading(status);
    setSelectedIndex(index_);
  };
  const saveAndUnsaveFeeds = async () => {
    managedLoader(true, index);
    let requestBody = {
      feedId: itemData?.id,
      isSave:
        whereFrom === COMPONENT_NAMES_ENUM?.SavedFeedListing
          ? false
          : !itemData?.isFeedSavedByLoggedInMember,
    };

    try {
      const response = await allActions.communitiesAction.SaveOrUnSaveFeedAPI(
        dispatch,
        requestBody,
        API_FUN_NAMES?.SaveOrUnSaveFeedAPI
      );
      managedLoader(false, -1);
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setAllFeeds(updateFeedData(API_FUN_NAMES?.ForSaveOrUnsaveFeeds));

        dispatch({
          type: API_FUN_NAMES?.postStatus,
          payload: postStatus + 1,
        });
        dispatch({
          type: API_FUN_NAMES?.PostDeleteOrUnsavedFromFeedDetails,
          payload: true,
        });
      } else {
        setToasterDetails(TOAST_STATUS?.ERROR, response?.message);
      }
    } catch (err: any) {
      managedLoader(false, -1);
      setToasterDetails(TOAST_STATUS?.ERROR, err?.message);
    }
  };

  const DeleteFeedOrFeedSharePost = () => {
    let update = [...allFeeds];
    update?.splice(index, 1);
    return update;
  };

  const DeleteFeedOrFeedShare = () => {
    const sharedID = itemData?.feedShareId;
    let requestBoady =
      sharedID > 0
        ? {
            feedId: itemData?.id,
            feedShareId: sharedID,
          }
        : {
            feedId: itemData?.id,
          };

    allActions?.communitiesAction
      .DeleteFeedOrFeedShare(
        dispatch,
        requestBoady,
        API_FUN_NAMES?.DeleteFeedOrFeedShare
      )
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setAllFeeds(DeleteFeedOrFeedSharePost);
          rbSheetRefMenu.current?.close();
          dispatch({
            type: API_FUN_NAMES?.postStatus,
            payload: postStatus + 1,
          });
          dispatch({
            type: API_FUN_NAMES?.PostDeleteOrUnsavedFromFeedDetails,
            payload: true,
          });
          postReShared();
        } else {
          setToasterDetails(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err) => {
        setToasterDetails(TOAST_STATUS?.ERROR, err?.message);
      });
  };

  const shareFeed = (data: any, feedShareTypeInt: any) => {
    const isObjectEmpty = !data || Object.keys(data).length === 0;
    let requestBoady = {
      feedId: itemData?.id,
      feedShareType: feedShareTypeInt,
      groupId:
        isObjectEmpty || feedShareTypeInt === feedShareType?.direct
          ? 0
          : data?.id,
      description: "",
      recipientIds:
        feedShareTypeInt === feedShareType?.direct ? [data?.id] : [],
    };
    allActions?.communitiesAction
      .shareFeed(dispatch, requestBoady, API_FUN_NAMES?.shareFeed)
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setToasterDetails(TOAST_STATUS?.SUCCESS, response?.message);
          rbSheetRefShare.current?.close();
          postReShared();
        } else {
          setToasterDetails(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err) => {
        setToasterDetails(TOAST_STATUS?.ERROR, err?.message);
      });
  };

  const createdOrJoinedGroupList = () => {
    allActions.communitiesAction
      .createdOrJoinedGroupList(
        dispatch,
        {},
        API_FUN_NAMES?.createdOrJoinedGroupList
      )
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          //.filter(
          // (item: any) => !item?.isLoggedInMemberBlocked
          // )

          const showShareableGroupList: any = response?.data?.createdGroup
            ?.concat(response?.data?.joinedGroup)
            .filter((item: any) => !item?.isLoggedInMemberBlocked);

          setGroupTab(showShareableGroupList);
        } else {
          setToasterDetails(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err: any) => {
        setToasterDetails(TOAST_STATUS?.ERROR, err?.message);
      });
  };

  const connectedUserList = async () => {
    try {
      const response = await allActions.communitiesAction.connectedUserList(
        dispatch,
        {},
        API_FUN_NAMES?.connectedUserList
      );
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setMemberListData(response?.data);
      }
    } catch (err: any) {
      logger("err?.message", err?.message);
    }
  };

  const [isFocused, setIsFocused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => setIsFocused(false); // Pause when screen loses focus
    }, [])
  );

  const renderItem = useCallback(
    ({ item }: any) => {
      const mimeType = lookup(item) || "";

      if (allowedImageFormats?.includes(mimeType)) {
        return (
          <ImageBackground
            style={styles?.mediaStyle_bg}
            source={{ uri: item }}
            blurRadius={7}
          >
            <FastImage
              source={{
                uri: item,
                priority: FastImage.priority.high,
              }}
              style={styles?.mediaStyle}
              resizeMode={FastImage.resizeMode.contain}
            />
          </ImageBackground>
        );
      }
      if (allowedVideoFormats.includes(mimeType)) {
        return (
          <View style={styles.videoWrapper} pointerEvents="none">
            <Video
              source={{ uri: item }}
              style={styles.videoStyle}
              controls={false} // Show default play, pause, seek, etc.
              playInBackground={false} // Prevents playing when app is in the background
              playWhenInactive={false} // Prevents playing when screen is inactive
              resizeMode={APPLY_STATUS?.contain} // Adjusts how the video is displayed
              repeat={false} // Loops the video
              muted={true} // Set to true to mute video
              paused={true} // Set to true to pause video
              ignoreSilentSwitch={APPLY_STATUS?.ignore} // Plays sound even if device is on silent mode
              poster={item} // important
            />
          </View>
        );
      }

      return null;
    },
    [activeSlide]
  );

  const handleLinkPress = async (url: any) => {
    let validURL = url.replaceAll(/\n/g, "");
    if (!validURL.startsWith("http://") && !validURL.startsWith("https://")) {
      validURL = "https://" + url;
    }
    Linking.openURL(validURL).catch((err) => {
      console.error("Failed to open URL:", err);
      setToasterDetails(TOAST_STATUS?.ERROR, "Can't open the link.");
    });
  };

  const renderContentWithLinks = (text: string) => {
    // const urlRegex = /(https?:\/\/[^\s]+|www\.|WWW\.|Www\.[^\s]+|\bhttp\b)/g;
    const urlRegex = /((https?:\/\/|www\.|Www\.|WWW\.)[^\s]+|\bhttps?\b)/g;

    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <Text
            key={index}
            style={[
              styles.DescriptionText,
              styles.marginTop5,
              { textDecorationLine: "underline" },
            ]}
            onPress={() => handleLinkPress(part)}
          >
            {part}
          </Text>
        );
      } else {
        return (
          <Text key={index}>
            {part?.includes("www") ||
            part?.includes("Www") ||
            part?.includes("WWW") ||
            part?.includes("https") ||
            part?.includes("http")
              ? ""
              : part}
          </Text>
        );
      }
    });
  };

  return (
    <View>
      <Pressable style={styles.mainContainer}>
        {itemData?.groupId !== 0 && isTopDetails && (
          <View style={styles.innerContainer}>
            <View style={styles?.topContainer}>
              {itemData?.groupProfilePicture && (
                <View style={styles.groupImageContainerShare}>
                  <Image
                    source={{ uri: itemData?.groupProfilePicture }}
                    style={styles.groupImageShare}
                    resizeMode={APPLY_STATUS?.cover}
                  />
                </View>
              )}
              {!!itemData?.groupName && (
                <Text style={styles.groupName}>{itemData?.groupName}</Text>
              )}
              <CornerDownLeft
                height={moderateScale(17)}
                width={moderateScale(17)}
              />
            </View>
          </View>
        )}
        {itemData?.isShared && (
          <View style={styles?.topContainer}>
            {itemData?.sharedByAliasProfilePicture && (
              <View style={styles.groupImageContainerShare}>
                <Image
                  source={{ uri: itemData?.aliasProfilePicture }}
                  style={styles.groupImageShare}
                  resizeMode={APPLY_STATUS?.cover}
                />
              </View>
            )}
            {!!itemData?.aliasName && (
              <Text style={styles.alisName}>{itemData?.aliasName}</Text>
            )}
            <CornerDownLeft
              height={moderateScale(17)}
              width={moderateScale(17)}
            />
          </View>
        )}
      </Pressable>

      <View style={styles.cardContainer}>
        {rendeHeader(isPost)}
        {itemData?.content?.length > 0 && (
          <TouchableOpacity
            style={styles.mainImageContainer}
            onPress={() => {
              itemData?.content?.length !== 0 &&
                navigation?.navigate(navigationString?.ViewMedia, {
                  item: itemData,
                });
            }}
          >
            <Carousel
              ref={carouselRef}
              data={itemData?.content}
              layout={APPLY_STATUS?.default}
              loop={true}
              renderItem={renderItem}
              onSnapToItem={setActiveSlide}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={SCREEN_WIDTH}
            />
          </TouchableOpacity>
        )}

        <Text style={[styles.nameText, styles.marginTop15]}>
          {decodeSpaces(itemData?.title)}
        </Text>
        <Text style={[styles.DescriptionText, styles.marginTop5]}>
          {itemData?.description?.toLowerCase()?.includes("http") ||
          itemData?.description?.toLowerCase()?.includes("www")
            ? renderContentWithLinks(
                itemData?.description
                  .replaceAll(/\\n/g, "\n")
                  .replaceAll(/\"/g, "")
              )
            : decodeSpaces(
                itemData?.description
                  .replaceAll(/\\n/g, "\n")
                  .replaceAll(/\"/g, "")
              )}
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <View style={styles.centerRow}>
          <TouchableOpacity
            style={[styles.action, styles.minWidth90]}
            onPress={likeFeed}
          >
            {itemData?.isFeedLikedByLoggedInUser ? (
              <FilledHeartColorable
                height={moderateScale(20)}
                width={moderateScale(20)}
                fill={colors?.red}
                stroke={colors?.red}
              />
            ) : (
              <HeartIconPb
                height={moderateScale(20)}
                width={moderateScale(20)}
              />
            )}
            <Text style={styles.actionText}>
              {formatNumberTitle(itemData?.likesCount || "")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.action, styles.minWidth90, styles.marginLeft10]}
            onPress={() => {
              setCommentSheetEnable(true);
              rbSheetRef.current?.open();
            }}
          >
            <CommentIconPb
              height={moderateScale(20)}
              width={moderateScale(20)}
            />
            <Text style={styles.actionText}>
              {formatNumberTitle(commentCount || "")}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.action} onPress={saveAndUnsaveFeeds}>
          {itemData?.isFeedSavedByLoggedInMember ||
          whereFrom === COMPONENT_NAMES_ENUM?.SavedFeedListing ? (
            <SaveIcon height={moderateScale(20)} width={moderateScale(20)} />
          ) : (
            <UnsaveIcon height={moderateScale(20)} width={moderateScale(20)} />
          )}
        </TouchableOpacity>

        {groupPrivacy !== APPLY_STATUS?.Invited && (
          <TouchableOpacity
            style={styles.action}
            onPress={() => {
              createdOrJoinedGroupList();
              connectedUserList();
              rbSheetRefShare.current?.open();
            }}
          >
            <ShareIconPb height={moderateScale(20)} width={moderateScale(20)} />
          </TouchableOpacity>
        )}
      </View>
      <RBsheetForComment
        rbSheetRef={rbSheetRef}
        feedId={itemData?.id}
        setCommentCount={setCommentCount}
        commentSheetEnable={commentSheetEnable}
        setCommentSheetEnable={setCommentSheetEnable}
      />
      <RBsheetForDotMenu
        rbSheetRef={rbSheetRefMenu}
        menuData={
          itemData?.isCreatedFeed
            ? menuDataFeedSelf
            : whereFrom === COMPONENT_NAMES_ENUM?.ProfileTab
            ? menuDataFeedOtherWithDelete
            : menuDataFeedOther
        }
        onPressMenu={(value: any) => {
          if (value === switchCodes?.delete) {
            rbSheetRefMenu?.current?.close();
            setTimeout(() => {
              setDeleteAccountAlert(true);
            }, 500);
          } else if (value == switchCodes?.update) {
            rbSheetRefMenu?.current?.close();
            navigation?.navigate(navigationString?.CreateFeedForGroup, {
              groupId: itemData?.groupId,
              feedData: itemData,
            });
          } else if (value == switchCodes?.report) {
            rbSheetRefMenu?.current?.close();
            navigation?.navigate(navigationString?.ReportFeed, {
              feedId: itemData?.id,
            });
          }
        }}
      />
      <RBsheetForShare
        rbSheetRef={rbSheetRefShare}
        menuData={shareFeedMenu}
        groupList={groupTab}
        memberListData={memberListData}
        onPressMenu={(value: any) => {
          if (value === switchCodes?.repost) {
            shareFeed({}, feedShareType?.timeline);
          }
        }}
        onPressGroupShareFeed={(data: any) => {
          shareFeed(data, feedShareType?.group);
        }}
        onPressConnectionShareFeed={(data: any) => {
          shareFeed(data, feedShareType?.direct);
        }}
      />
      {deleteAccountAlert && (
        <LogoutModal
          isVisible={deleteAccountAlert}
          title={strings?.sure}
          description={strings?.You_wanted_to_delete_this}
          onNo={() => setDeleteAccountAlert(false)}
          onYes={() => {
            DeleteFeedOrFeedShare();
            setDeleteAccountAlert(false); // Close after delete
          }}
          hideAlert={() => setDeleteAccountAlert(false)}
          textStyle={{ width: moderateScale(270) }}
          buttonTexts={[strings?.cancel_small, strings?.Delete]}
        />
      )}

      {index == selectedIndex && isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default FeedCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    gap: moderateScale(5),
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },
  groupName: {
    fontWeight: "600",
    color: colors?.prussianBlue,
    fontSize: textScale(10),
  },
  alisName: {
    fontWeight: "600",
    color: colors?.prussianBlue,
    fontSize: textScale(10),
  },
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
  imageContainer: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.SurfCrest,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: moderateScale(38),
    width: moderateScale(38),
    borderRadius: moderateScale(20),
  },
  calendarIcon: {
    tintColor: colors.prussianBlue,
    height: moderateScale(20),
    width: moderateScale(20),
  },
  textContainer: {
    marginHorizontal: moderateScale(10),
  },
  nameText: {
    color: colors.SurfCrest,
    fontWeight: "600",
    fontSize: textLabelSize.subtTitleFont,
  },
  timeText: {
    color: colors.SurfCrest,
    fontWeight: "400",
    fontSize: textLabelSize.smallTitleFont,
    marginTop: moderateScale(5),
  },
  DescriptionText: {
    color: colors.SurfCrest,
    fontWeight: "400",
    fontSize: textLabelSize.smallTitleFont,
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
    backgroundColor: colors.SurfCrest,
    marginTop: moderateScale(15),
    height: moderateScale(188),
    borderRadius: moderateScale(11),
    overflow: "hidden",
  },
  mainImage: {
    height: "100%",
    width: "100%",
    borderRadius: moderateScale(11),
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  groupHeaderRight: {
    flexDirection: "row",
    justifyContent: "center",
  },
  groupInfoContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  groupImageContainer: {
    height: moderateScale(32),
    width: moderateScale(32),
    borderRadius: moderateScale(20),
    backgroundColor: colors.SurfCrest,
    alignItems: "center",
    justifyContent: "center",
  },
  groupImage: {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(20),
  },
  groupImageContainerShare: {
    height: moderateScale(24),
    width: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: colors.SaltBox,
    alignItems: "center",
    justifyContent: "center",
  },
  groupImageShare: {
    height: moderateScale(22),
    width: moderateScale(22),
    borderRadius: moderateScale(22),
  },
  topContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(40),
    backgroundColor: "rgba(109, 89, 122, 0.2)",
    paddingHorizontal: moderateScale(7),
    paddingVertical: moderateScale(6),
    gap: moderateScale(10),
    marginBottom: moderateScale(5),
  },

  mediaStyle: {
    width: "auto",

    height: moderateScale(188),
    borderRadius: moderateScale(10),
    borderColor: colors.SurfCrest,
    marginRight: moderateScale(75),
  },
  mediaStyle_bg: {
    width: "auto",

    height: moderateScale(188),
    borderRadius: moderateScale(10),
    borderColor: colors.SurfCrest,
  },
  videoWrapper: {
    width: moderateScale(310),
    height: moderateScale(188),
    borderRadius: moderateScale(10),
    borderColor: colors.SurfCrest,
    overflow: "hidden",
  },
  videoStyle: {
    width: "100%",
    height: "100%",
  },
});
