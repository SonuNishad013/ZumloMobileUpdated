import { FlatList, StyleSheet } from "react-native";
import React, { useRef } from "react";
import { moderateScale } from "../../../../constant/responsiveStyle";
import SeeAllHeaderWellness from "../../../Dashboard/Wellness/commonHeader";
import { strings } from "../../../../constant/strings";
import navigationString from "../../../../navigation/navigationString";
import FeedCard from "../../CommunityComponents/FeedCard";
import { postCode } from "../../../../constant/CommunityConstant";
import { COMPONENT_NAMES_ENUM } from "../../../../constant/ENUM";
import CommonLoader from "../../../../components/Loader";
import logger from "../../../../constant/logger";

interface Props {
  allFeeds?: any;
  navigation?: any;
  setAllFeeds?: any;
  toasterFunction?: any;
  whereFrom?: any;
  groupDetailsData?: any;
  postReShared?: any;
  managePagination?: any;
}
const FeedsListing: React.FC<Props> = ({
  allFeeds,
  navigation,
  setAllFeeds,
  toasterFunction,
  whereFrom,
  groupDetailsData,
  postReShared,
  managePagination,
}) => {
  logger("whereFrom_____", whereFrom);
  const showingType: any = () => {
    switch (whereFrom) {
      case COMPONENT_NAMES_ENUM?.CommunityGroupDetails:
        return {
          isTopDetails: false,
          isSeeAll: false,
          isPost: postCode?.group,
        };
      case COMPONENT_NAMES_ENUM?.SavedFeedListing:
        return {
          isTopDetails: false,
          isSeeAll: false,
          isPost: postCode?.group,
        };
      case COMPONENT_NAMES_ENUM?.HomeTab:
        return {
          isTopDetails: true,
          isSeeAll: true,
          isPost: postCode?.group,
        };
      case COMPONENT_NAMES_ENUM?.AllCommunityFeed:
        return {
          isTopDetails: true,
          isSeeAll: false,
          isPost: postCode?.group,
        };
      case COMPONENT_NAMES_ENUM?.OtherSeekerProfile:
        return {
          isTopDetails: true,
          isSeeAll: false,
          isPost: postCode?.self,
        };
      case COMPONENT_NAMES_ENUM?.IndependentFeed:
        return {
          isTopDetails: false,
          isSeeAll: false,
          isPost: postCode?.self,
        };
      case COMPONENT_NAMES_ENUM?.ProfileTab:
        return {
          isTopDetails: true,
          isSeeAll: false,
          isPost: postCode?.self,
        };
      case COMPONENT_NAMES_ENUM?.FeedDetails:
        return {
          isTopDetails: false,
          isSeeAll: false,
          isPost: postCode?.group,
        };
      default:
        return {
          isTopDetails: false,
          isSeeAll: true,
          isPost: postCode?.group,
        };
    }
  };

  return (
    <>
      {allFeeds?.length > 0 && (
        <FlatList
          data={allFeeds}
          keyExtractor={(item, index) => "key" + index}
          scrollEnabled={true}
          style={styles?.flatListContainer}
          contentContainerStyle={styles?.flatListContentContainerStyle}
          ListHeaderComponent={
            showingType()?.isSeeAll && (
              <SeeAllHeaderWellness
                name={strings?.trendingFeeds}
                msg={strings?.seeAll}
                onPress={() =>
                  navigation?.navigate(navigationString?.AllCommunityFeed)
                }
              />
            )
          }
          renderItem={({ item, index }) => (
            <FeedCard
              itemData={item}
              allFeeds={allFeeds}
              setAllFeeds={setAllFeeds}
              setToasterDetails={toasterFunction}
              onShareIcon={() => {}}
              index={index}
              isTopDetails={showingType()?.isTopDetails}
              isPost={showingType()?.isPost}
              navigation={navigation}
              groupPrivacy={groupDetailsData?.groupPrivacy}
              whereFrom={whereFrom}
              postReShared={() => postReShared()}
            />
          )}
          onEndReached={() => managePagination()}
          onEndReachedThreshold={0.5}
        />
      )}
    </>
  );
};

export default FeedsListing;

const styles = StyleSheet.create({
  flatListContainer: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
    paddingBottom: moderateScale(20),
  },
  flatListContentContainerStyle: { gap: moderateScale(10) },
});
