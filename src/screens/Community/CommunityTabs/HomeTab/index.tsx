import React, { useState } from "react";
import { Text, View } from "react-native";
import AddMoreWithPlusDotted from "../../../../components/Buttons/AddMoreWithPlusDotted";
import navigationString from "../../../../navigation/navigationString";
import { strings } from "../../../../constant/strings";
import allActions from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import FeedsListing from "./FeedsListing";
import SuggestedGroupListing from "./SuggestedGroupListing";
import { styles } from "../../styles";
import ShimmerPlaceHolder from "../../../../components/SimmerEffect";
import { moderateScale, width } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../../constant/appConstant";
import { useFocusEffect } from "@react-navigation/native";
import { getTrandingFeedData } from "../../../../redux/selector";
import NoRecordTxtComponent from "../../../../components/noDataContainer";
import logger from "../../../../constant/logger";
import { PAGINATION } from "../../../../utils/pagination";

interface Props {
  navigation?: any;
  toasterFunction?: any;
  sendtrigger?: any;
}

const HomeTab: React.FC<Props> = ({
  navigation,
  toasterFunction,
  sendtrigger,
}) => {
  const dispatch: any = useDispatch();
  const [groupList, setGroupList] = useState<any>([]);
  const [allFeeds, setAllFeeds] = useState([]);
  const [trendingFeedLoader, setTrendingFeedLoader] = useState(false);
  const [groupsLoader, setGroupsLoader] = useState(false);
  const trandingFeedLocal = useSelector(getTrandingFeedData());

  useFocusEffect(
    React.useCallback(() => {
      setAllFeeds([]);
      setGroupList([]);
      sendtrigger();
      getTrendingFeeds();
      suggestedGroups();
    }, [])
  );

  const suggestedGroups = () => {
    setGroupsLoader(true);
    let requestbody = {};
    allActions?.communitiesAction
      .suggestedGroups(dispatch, requestbody, API_FUN_NAMES?.suggestedGroups)
      .then(async (response: any) => {
        setGroupsLoader(false);
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (Array.isArray(response?.data)) {
            setGroupList(
              response?.data.filter(
                (item: any) => !item?.isLoggedInMemberBlocked
              )
            );
          } else {
            setGroupList([]);
          }
        }
      })
      .catch((err) => {
        setGroupsLoader(false);
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };
  const getTrendingFeeds = () => {
    setTrendingFeedLoader(true);
    let requestbody = {
      pageSize: PAGINATION?.TRENDING_FEEDS,
      pageIndex: 0,
    };

    allActions?.communitiesAction
      .getTrendingFeeds(dispatch, requestbody, API_FUN_NAMES?.suggestedGroups)
      .then(async (response: any) => {
        setTrendingFeedLoader(false);
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (Array.isArray(response?.data?.list)) {
            setAllFeeds(response?.data?.list);
          } else {
            setAllFeeds([]);
          }
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err) => {
        setTrendingFeedLoader(false);
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };

  const renderNoDataFoundView = (title: string, header: string) => {
    return (
      <View style={styles?.noDataFoundView}>
        <Text style={styles?.headerStyleText}>{header}</Text>
        <NoRecordTxtComponent
          title={title ?? strings?.No_feed_found}
          txtColor={colors?.green}
          imageHeight={moderateScale(100)}
        />
        <View
          style={{
            marginBottom: moderateScale(40),
          }}
        />
      </View>
    );
  };
  return (
    <>
      <AddMoreWithPlusDotted
        mainContainer={styles.addMoreContainer}
        title={"Share what’s going on"}
        onPress={() =>
          navigation?.navigate(navigationString?.CreateFeedForGroup, {
            groupId: 0,
            feedData: {},
          })
        }
      />

      {trendingFeedLoader === true && allFeeds?.length == 0 ? (
        <View style={styles?.shimmerView}>
          <Text style={styles?.headerStyleText}>{strings?.Trending_feeds}</Text>
          <ShimmerPlaceHolder
            width={width - moderateScale(60)}
            height={moderateScale(300)}
            backgroundColor={colors.darkthemeColor}
          />
        </View>
      ) : trendingFeedLoader === false && allFeeds?.length == 0 ? (
        renderNoDataFoundView(strings?.No_feeds_found, strings?.Trending_feeds)
      ) : trendingFeedLoader === false && allFeeds?.length != 0 ? (
        <FeedsListing
          allFeeds={allFeeds}
          navigation={navigation}
          setAllFeeds={setAllFeeds}
          toasterFunction={toasterFunction}
          whereFrom={strings?.HomeTab}
          postReShared={() => {}}
          managePagination={() => {}}
        />
      ) : null}
      {groupsLoader === true && groupList?.length == 0 ? (
        <View style={styles?.shimmerView}>
          <Text style={styles?.headerStyleText}>
            {strings?.Suggested_groups}
          </Text>
          <ShimmerPlaceHolder
            width={width - moderateScale(60)}
            height={moderateScale(300)}
            backgroundColor={colors.darkthemeColor}
          />
        </View>
      ) : groupsLoader === false && groupList?.length == 0 ? (
        renderNoDataFoundView(
          strings?.No_groups_found,
          strings?.Suggested_groups
        )
      ) : groupsLoader === false && groupList?.length != 0 ? (
        <SuggestedGroupListing
          dispatch={dispatch}
          groupList={groupList}
          navigation={navigation}
          setGroupList={setGroupList}
          toasterFunction={toasterFunction}
          whereFrom={strings?.HomeTab}
        />
      ) : null}
    </>
  );
};

export default HomeTab;
