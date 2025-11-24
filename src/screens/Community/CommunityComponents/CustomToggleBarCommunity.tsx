import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import CommunityPicture from "../AddAnonymousName/CommunityPicture";
import { imagePath } from "../../../assets/png/imagePath";
import CommonFlexButton from "../../../components/Buttons/CommonFlexButton";
import allActions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import navigationString from "../../../navigation/navigationString";
import { useNavigation } from "@react-navigation/native";
import { getPostStatus } from "../../../redux/selector";
import { strings } from "../../../constant/strings";
import {
  API_FUN_NAMES,
  SOCKET_FUN_NAME,
} from "../../../constant/APIsFunctionNames";
import logger from "../../../constant/logger";
import { STATUS_CODES } from "../../../constant/appConstant";
import { APPLY_STATUS } from "../../../constant/ENUM";
import { textLabelSize } from "../../../utils/TextConfig";

interface Item {
  icon: any;
  title: string;
  containerStyle?: ViewStyle;
}

interface Props {
  titleIndex?: (index: number) => void;
  data: Item[];
  selectedColor?: string;
  unSelectedColor?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  itemContainerStyle?: ViewStyle;
  selectedTxtColor?: string;
  unSelectedTxtColor?: string;
  name?: string;
  userProfileSource?: any;
  onEditIconPress?: any;
  setCommunityTab?: any;
  communityTab?: any;
}

const CustomToggleBarCommunity: React.FC<Props> = ({
  titleIndex,
  data,
  selectedColor = colors.polishedPine,
  unSelectedColor = colors.rgbaSilverChalice,
  containerStyle,
  titleStyle,
  itemContainerStyle,
  selectedTxtColor = colors.prussianBlue,
  unSelectedTxtColor = colors.SilverChalice,
  name = strings?.Anonymous,
  userProfileSource,
  onEditIconPress,
  setCommunityTab,
  communityTab,
}) => {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const [savedFeedsList, setSavedFeedsList] = useState<any[]>([]);
  const [memberListData, setMemberListData] = useState<any>([]);
  const postStatus = useSelector(getPostStatus());

  useEffect(() => {
    SavedFeedsListAPI();
    connectedUserList();
  }, [postStatus]);

  useEffect(() => {
    communityTab === 2 && connectedUserList();
    communityTab === 2 && SavedFeedsListAPI();
  }, [communityTab]);

  const connectedUserList = async () => {
    try {
      const response = await allActions.communitiesAction.connectedUserList(
        dispatch,
        {},
        SOCKET_FUN_NAME?.connectedUserList
      );
      if (response?.statusCode === 200) {
        setMemberListData(response?.data);
      }
    } catch (err: any) {
      logger("err?.message", err?.message);
    }
  };

  const SavedFeedsListAPI = () => {
    allActions?.communitiesAction
      .SavedFeedsList(dispatch, {}, API_FUN_NAMES?.SavedFeedsList)
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setSavedFeedsList(response?.data);
        }
      })
      .catch((err) => {
        logger("error_", err);
      });
  };
  const getDividerColor = (index: number) => {
    if (index === communityTab) {
      return index === 2 ? colors.royalOrange : selectedColor;
    }
    return unSelectedColor;
  };

  const getTitleColor = (index: number) => {
    if (index === communityTab) {
      return index === 2 ? colors.SurfCrest : selectedTxtColor;
    }
    return unSelectedTxtColor;
  };

  useEffect(() => {
    if (titleIndex) {
      titleIndex(communityTab);
    }
  }, [communityTab, titleIndex]);

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {data?.map((item, index) => (
          <TouchableOpacity
            key={`${strings?.toggle_item}${index}`}
            style={[
              styles.touchableOpacity,
              item.containerStyle,
              itemContainerStyle,
            ]}
            activeOpacity={0.8}
            onPress={() => setCommunityTab(index)}
            accessibilityLabel={item.title}
            accessibilityRole={APPLY_STATUS?.button}
          >
            <Image
              style={[styles.icon, { tintColor: getTitleColor(index) }]}
              source={item?.icon}
            />
            <Text
              style={[styles.text, { color: getTitleColor(index) }, titleStyle]}
            >
              {item?.title}
            </Text>
            <View
              style={[
                styles.divider,
                { backgroundColor: getDividerColor(index) },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {communityTab === 2 && (
        <View>
          <View style={[styles.profileContainer]}>
            <CommunityPicture
              source={userProfileSource}
              activeOpacity={1}
              categoryItem={styles.communityPictureStyle}
              cornerEditCondition={true}
              onEditIconPress={onEditIconPress}
              categoryImageContainer={{
                backgroundColor: colors?.SurfCrest,
              }}
            />
            <View style={styles.profileDetailsContainer}>
              <Text style={styles.profileName} numberOfLines={1}>
                {name}
              </Text>
              <View style={styles.commonFlexButtonView}>
                {memberListData?.length > 0 && (
                  <CommonFlexButton
                    onPress={() => {
                      navigation?.navigate(navigationString?.ConnectionList, {
                        memberListData: memberListData,
                      });
                    }}
                    btnValue={memberListData?.length}
                    btnName={
                      memberListData?.length === 0
                        ? strings?.No_connection_yet
                        : memberListData?.length > 1
                        ? strings?.Connections
                        : strings?.Connection
                    }
                    buttonContainer={{
                      zIndex: 200,
                    }}
                    isBold={true}
                  />
                )}
                {savedFeedsList?.length > 0 && (
                  <CommonFlexButton
                    onPress={() => {
                      navigation?.navigate(
                        navigationString?.SavedFeedsIconsOnly,
                        {
                          savedFeedsList: savedFeedsList,
                        }
                      );
                    }}
                    btnValue={savedFeedsList?.length}
                    btnName={
                      savedFeedsList?.length === 1
                        ? strings?.Saved_feed
                        : strings?.Saved_feeds
                    }
                    buttonContainer={{
                      zIndex: 200,
                    }}
                    isBold={true}
                  />
                )}
              </View>
            </View>
            <ImageBackground
              style={styles.profileImage}
              source={imagePath.ProfileBottomImage}
            ></ImageBackground>
          </View>
        </View>
      )}
    </>
  );
};

export default CustomToggleBarCommunity;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  touchableOpacity: {
    justifyContent: "flex-end",
  },
  icon: {
    alignSelf: "center",
    marginBottom: moderateScale(5),
    height: moderateScale(24),
    width: moderateScale(24),
  },
  text: {
    fontSize: textLabelSize?.smallTitleFont,
    alignSelf: "center",
    fontWeight: "400",
    paddingBottom: moderateScale(12),
  },
  divider: {
    height: moderateScale(3),
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.prussianBlue,
    paddingBottom: moderateScale(30),
    borderBottomEndRadius: moderateScale(35),
    borderBottomStartRadius: moderateScale(35),
    paddingTop: moderateScale(20),
    paddingHorizontal: moderateScale(19),
  },
  communityPictureStyle: {
    borderStyle: "solid",
    height: moderateScale(120),
    width: moderateScale(120),
    borderRadius: moderateScale(130),
  },
  profileDetailsContainer: {
    gap: moderateScale(15),
    marginLeft: moderateScale(15),
    width: "62%",
    zIndex: 2,
  },
  profileName: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors.SurfCrest,
  },
  profileImage: {
    right: moderateScale(230),
    bottom: -40,
    height: moderateScale(120),
    width: moderateScale(190),
    zIndex: 1,
  },
  commonFlexButtonView: {
    flexDirection: "row",
    gap: moderateScale(5),
  },
});
