import React, { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { CommentShareIcon, CrossIcon, ReplyCommentIcon } from "../../assets";
import allActions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getShortTimeAgo } from "../../helper/CommunityHelper";
import { profileDetailsCommunity } from "../../redux/selector";
import CommonBoxButton from "../Buttons/commonBoxButton";
import LogoutModal from "../CommonAlert/logoutModal";
import logger from "../../constant/logger";

interface Props {
  rbSheetRef?: any;
  feedId?: any;
  setToasterDetails?: any;
  setCommentCount?: any;
  commentSheetEnable?: any;
  setCommentSheetEnable?: any;
}

const RBsheetForComment: React.FC<Props> = ({
  rbSheetRef,
  setToasterDetails,
  feedId,
  setCommentCount,
  commentSheetEnable,
  setCommentSheetEnable,
}) => {
  const seekerCommunityDetails = useSelector(profileDetailsCommunity());
  const dispatch: any = useDispatch();
  const flatListRef = useRef<any>(null); // Reference to FlatList
  const textInputRef = useRef<TextInput>(null);
  const [comment, setComment] = useState<any>([]);
  const [commentValue, setCommentValue] = useState("");
  const [disable, setDisable] = useState<boolean>(false);
  const [isReply, setIsReply] = useState(false);
  const [replyIndex, setReplyIndex] = useState<any>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [deleteAccountAlert, setDeleteAccountAlert] = useState(false);
  const [deleteCommentOrReplyItem, setDeleteCommentOrReplyItem] = useState({
    type: "",
    commentId: 0,
    replyId: 0,
  });

  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );
  useEffect(() => {
    const updateHeight = () => setScreenHeight(Dimensions.get("window").height);
    const subscription = Dimensions.addEventListener("change", updateHeight);
    return () => subscription.remove();
  }, []);
  const scrollToLastItem = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (commentSheetEnable) {
      commentAndRepliesByFeedId();
    }
  }, [commentSheetEnable]);

  const DeleteCommentsOrReply = async () => {
    if (!deleteCommentOrReplyItem?.commentId) {
      setToasterDetails(0, "Please select comment or reply to delete");
      return;
    }
    let DeleteCommentsOrReplyQueryParams: string =
      deleteCommentOrReplyItem?.type === "commentId"
        ? `comentId=${deleteCommentOrReplyItem?.commentId}`
        : `comentId=${deleteCommentOrReplyItem?.commentId}&replyId=${deleteCommentOrReplyItem?.replyId}`;
    console.log("DeleteCommentsOrReplyQueryParams", {
      DeleteCommentsOrReplyQueryParams,
      deleteCommentOrReplyItem,
    });
    setDeleteAccountAlert(false);
    try {
      const response = await allActions.communitiesAction.DeleteCommentsOrReply(
        dispatch,
        null,
        "commentAndRepliesByFeedId",
        DeleteCommentsOrReplyQueryParams
      );
      if (response?.statusCode === 200) {
        commentAndRepliesByFeedId();
      } else {
        setToasterDetails(0, response?.message);
      }
    } catch (err: any) {
      setToasterDetails(0, err?.message);
    }
  };
  const commentAndRepliesByFeedId = async () => {
    let queryParams = `/${feedId}`;
    try {
      const response =
        await allActions.communitiesAction.commentAndRepliesByFeedId(
          dispatch,
          {},
          "commentAndRepliesByFeedId",
          queryParams
        );
      if (response?.statusCode === 200) {
        setComment(response?.data);
        setCommentCount(response?.data?.length || 0);
      } else {
        setToasterDetails(0, response?.message);
      }
    } catch (err: any) {
      setToasterDetails(0, err?.message);
    }
  };

  const commentFeed = async () => {
    setDisable(true);
    let requestBody = {
      feedId: feedId,
      comment: commentValue,
    };
    try {
      const response = await allActions.communitiesAction.commentFeed(
        dispatch,
        requestBody,
        "likeFeed"
      );
      if (response?.statusCode === 200) {
        commentAndRepliesByFeedId();
        scrollToLastItem();
        setCommentValue("");
        setDisable(false);
      } else {
        setToasterDetails(0, response?.message);
      }
    } catch (err: any) {
      setToasterDetails(0, err?.message);
    }
  };

  const commentReply = async () => {
    setDisable(true);
    let requestBody = {
      commentId: comment[replyIndex]?.commentId,
      reply: commentValue,
    };
    try {
      const response = await allActions.communitiesAction.commentReply(
        dispatch,
        requestBody,
        "likeFeed"
      );
      if (response?.statusCode === 200) {
        commentAndRepliesByFeedId();
        setCommentValue("");
        setIsReply(false);
        setDisable(false);
      } else {
        setToasterDetails(0, response?.message);
      }
    } catch (err: any) {
      setToasterDetails(0, err?.message);
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const onPressCross = () => {
    setCommentSheetEnable(false);
    rbSheetRef?.current?.close();
  };

  return (
    <View style={styles.container}>
      <RBSheet
        ref={rbSheetRef}
        height={screenHeight * 0.85}
        openDuration={250}
        closeOnPressMask={false}
        customStyles={{ container: styles.sheetContainer }}
      >
        <KeyboardAvoidingView
          behavior={"padding"}
          style={styles.flexContainer}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 40}
        >
          <View
            style={[
              styles.headerContainer,
              {
                marginTop:
                  Platform.OS === "ios" && isKeyboardVisible
                    ? moderateScale(40)
                    : moderateScale(0),
              },
            ]}
          >
            <Text style={styles.communityProfileText}>{"Comments"}</Text>
            <CommonBoxButton
              onPress={onPressCross}
              SvgIcon={CrossIcon}
              mainContainer={styles.crossButtonContainer}
            />
          </View>

          <FlatList
            keyExtractor={(item, index) => "key" + index}
            data={comment}
            ref={flatListRef}
            style={{
              flex: 1,
            }}
            ListEmptyComponent={
              <Text
                style={{
                  fontSize: textScale(24),
                  color: colors.prussianBlue,
                  marginTop: screenHeight * 0.32,
                  alignSelf: "center",
                }}
              >
                No comments yet
              </Text>
            }
            renderItem={({ item, index: idx }: any) => {
              return (
                <>
                  <Pressable
                    style={styles.commentItem}
                    onLongPress={() => {
                      console.log("Long Pressed", { item, idx });
                      if (item?.isOwnComment) {
                        setDeleteCommentOrReplyItem({
                          type: "commentId",
                          commentId: item?.commentId,
                          replyId: 0,
                        });
                        setDeleteAccountAlert(true);
                      }
                    }}
                    delayLongPress={600}
                  >
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: item?.commentAuthorProfilePicture }}
                        style={styles.image}
                        resizeMode="stretch"
                      />
                    </View>
                    <View
                      style={{
                        width: "80%",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.username}>
                          {item?.commentAuthorName}
                        </Text>

                        <Text style={styles.msgTime}>
                          {getShortTimeAgo(item?.commentCreatedTime)}
                        </Text>
                      </View>
                      <Text style={styles.commentText}>{item?.comment}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          textInputRef.current?.focus();
                          setIsReply(true);
                          setReplyIndex(idx);
                        }}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: moderateScale(5),
                          marginTop: moderateScale(7),
                        }}
                      >
                        <ReplyCommentIcon
                          height={moderateScale(20)}
                          width={moderateScale(20)}
                        />
                        <Text style={styles.replyText}>Reply</Text>
                      </TouchableOpacity>
                      <View>
                        <FlatList
                          keyExtractor={(item, index) => "key" + index}
                          data={item?.commentReply}
                          style={{
                            marginTop: moderateScale(15),
                          }}
                          renderItem={({ item: repliesItem, index }) => {
                            return (
                              <>
                                <Pressable
                                  onLongPress={() => {
                                    console.log("Long Pressed", {
                                      item,
                                      index,
                                      isOwnReply: repliesItem?.isOwnReply,
                                    });
                                    if (item?.isOwnReply) {
                                      setDeleteCommentOrReplyItem({
                                        type: "replyId",
                                        commentId: item?.commentId,
                                        replyId: repliesItem?.replyId,
                                      });
                                      setDeleteAccountAlert(true);
                                    }
                                  }}
                                  delayLongPress={600}
                                  style={{
                                    flexDirection: "row",
                                    gap: moderateScale(10),
                                    marginVertical: moderateScale(15),
                                    width: "100%",
                                    // backgroundColor: "red",
                                    height: "auto",
                                  }}
                                >
                                  <View style={[styles.imageContainerReply]}>
                                    <Image
                                      source={{
                                        uri: repliesItem?.replyAuthorProfilePicture,
                                      }}
                                      style={styles.imageReply}
                                      resizeMode="stretch"
                                    />
                                  </View>
                                  <View
                                    style={{
                                      width: "82%",
                                      height: "auto",
                                      // backgroundColor: "pink",
                                    }}
                                  >
                                    <View
                                      style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        height: "auto",
                                      }}
                                    >
                                      <Text style={styles.username}>
                                        {repliesItem?.replyAuthorName}
                                      </Text>

                                      <Text
                                        style={[
                                          styles.msgTime,
                                          { color: colors?.saltDark },
                                        ]}
                                      >
                                        {getShortTimeAgo(
                                          repliesItem?.replyCreatedTime
                                        )}
                                      </Text>
                                    </View>
                                    <Text style={styles.commentTextReply}>
                                      {repliesItem?.reply}
                                    </Text>
                                  </View>
                                </Pressable>

                                <View
                                  style={{
                                    width: "100%",
                                    backgroundColor: colors?.surfNext,
                                    height: moderateScale(1),
                                    marginTop: moderateScale(2),
                                  }}
                                />
                              </>
                            );
                          }}
                        />
                      </View>
                    </View>
                  </Pressable>
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: colors?.surfNext,
                      height: moderateScale(1),
                      marginTop: moderateScale(2),
                    }}
                  />
                </>
              );
            }}
          />

          {/* Input Field at the Bottom */}
          <>
            {isReply && (
              <View
                style={{
                  backgroundColor: colors?.saltLight,
                  paddingVertical: moderateScale(10),
                  paddingHorizontal: moderateScale(19),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: colors?.SurfCrest,
                    fontWeight: "400",
                    fontSize: textScale(14),
                  }}
                >
                  {`Replying to ${comment[replyIndex]?.commentAuthorName}`}
                </Text>
                <TouchableOpacity
                  disabled={disable}
                  hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                  onPress={() => {
                    textInputRef.current?.blur();
                    setIsReply(false);
                  }}
                >
                  <CrossIcon />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{
                      uri: seekerCommunityDetails?.aliasProfilePicture,
                    }}
                    style={styles.image}
                    resizeMode="stretch"
                  />
                </View>
                <TextInput
                  ref={textInputRef}
                  placeholder="Comment here..."
                  placeholderTextColor={colors?.lightprussianBlue}
                  style={styles.textInput}
                  multiline
                  value={commentValue}
                  onChangeText={(val: any) => {
                    setCommentValue(val);
                  }}
                />
                <TouchableOpacity
                  disabled={disable}
                  onPress={isReply ? commentReply : commentFeed}
                >
                  {disable ? (
                    <View style={{ right: 10, bottom: 10 }}>
                      <ActivityIndicator size={"large"} />
                    </View>
                  ) : (
                    <CommentShareIcon
                      height={moderateScale(35)}
                      width={moderateScale(35)}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </>
        </KeyboardAvoidingView>
        <LogoutModal
          isVisible={deleteAccountAlert}
          title={"Are you sure?"}
          description={"You wanted to delete this?"}
          onNo={() => {
            setDeleteAccountAlert(false);
          }}
          onYes={() => {
            DeleteCommentsOrReply();
          }}
          hideAlert={() => setDeleteAccountAlert(false)}
          textStyle={{ width: moderateScale(270) }}
          buttonTexts={["Cancel", "Delete"]}
        />
      </RBSheet>
    </View>
  );
};

export default RBsheetForComment;

const styles = StyleSheet.create({
  container: { flex: 1 },
  sheetContainer: {
    backgroundColor: colors?.SurfCrest,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  flexContainer: { flex: 1 },
  header: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: colors?.SaltBoxOp,
    paddingVertical: moderateScale(15),
    marginLeft: moderateScale(19),
  },
  headerText: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "600",
  },
  commentSection: {
    flexGrow: 1,
    padding: moderateScale(10),
  },
  commentItem: {
    flexDirection: "row",
    gap: moderateScale(10),
    marginBottom: moderateScale(8),
    marginTop: moderateScale(15),
  },
  username: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "600",
  },
  msgTime: {
    fontSize: textScale(10),
    color: colors?.prussianBlue,
    fontWeight: "400",
  },
  usernameReply: {
    fontSize: textScale(13),
    color: colors?.prussianBlue,
    fontWeight: "600",
  },
  commentText: {
    fontSize: textScale(10),
    color: colors?.prussianBlue,
    fontWeight: "400",
    marginTop: moderateScale(5),
  },
  commentTextReply: {
    fontSize: textScale(9),
    color: colors?.prussianBlue,
    fontWeight: "400",
    marginTop: moderateScale(3),
  },
  replyText: {
    fontSize: textScale(14),
    color: colors?.saltDark,
    fontWeight: "600",
    marginTop: moderateScale(5),
  },
  inputContainer: {
    padding: moderateScale(10),
    borderTopWidth: moderateScale(1),
    borderTopColor: colors?.SaltBoxOp,
    backgroundColor: colors?.SurfCrest,
  },
  inputWrapper: {
    flexDirection: "row",
    gap: moderateScale(10),
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: moderateScale(10),
  },
  imageContainer: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors?.surfCrustOp2,
    borderWidth: moderateScale(1),
  },
  imageContainerReply: {
    height: moderateScale(44),
    width: moderateScale(44),
    borderRadius: moderateScale(25),
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors?.surfCrustOp2,
    borderWidth: moderateScale(1),
  },
  image: {
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(24),
  },
  imageReply: {
    height: moderateScale(42),
    width: moderateScale(42),
    borderRadius: moderateScale(24),
  },
  textInput: {
    flex: 1,
    paddingVertical: moderateScale(10),
    fontWeight: "400",
    color: colors?.prussianBlue,
    fontSize: textScale(14),
    maxHeight: moderateScale(100),
  },
  viewRepliesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
  separator: {
    width: moderateScale(40),
    backgroundColor: colors?.saltDark,
    height: moderateScale(0.5),
    marginTop: moderateScale(10),
  },
  viewRepliesButton: {
    backgroundColor: colors?.SurfCrest,
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: moderateScale(15),
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: moderateScale(19),
    paddingVertical: moderateScale(15),
  },
  communityProfileText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.prussianBlue,
  },
  crossButtonContainer: {
    backgroundColor: colors?.prussianBlue,
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(15),
  },
  titleText: {
    fontWeight: "400",
    fontSize: textScale(14),
  },
  titleContainer: {
    marginTop: moderateScale(30),
  },
});
