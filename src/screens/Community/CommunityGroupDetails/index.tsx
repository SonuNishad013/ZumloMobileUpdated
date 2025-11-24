import { View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import AddMoreWithPlusDotted from "../../../components/Buttons/AddMoreWithPlusDotted";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MainGroupData from "./MainGroupData";
import navigationString from "../../../navigation/navigationString";
import { strings } from "../../../constant/strings";
import JoinArea from "./JoinArea";
import CommonLoader from "../../../components/Loader";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import {
  fromNav,
  groupPrivacyType,
  menuDataGroup,
  switchCodes,
} from "../../../constant/CommunityConstant";
import RBsheetForDotMenu from "../../../components/RBsheetForComment/RBsheetForDotMenu";
import { styles } from "./styles";
import FeedsListing from "../CommunityTabs/HomeTab/FeedsListing";
import SuggestedGroupListing from "../CommunityTabs/HomeTab/SuggestedGroupListing";
import useGroupDetailsHook from "./useGroupDetailsHook";

import { moderateScale } from "../../../constant/responsiveStyle";
import LogoutModal from "../../../components/CommonAlert/logoutModal";
import { useSelector } from "react-redux";
import { profileDetailsCommunity } from "../../../redux/selector";
import { COMPONENT_NAMES_ENUM } from "../../../constant/ENUM";
var isAmMemberOfThisGroup = false;
interface Props {
  navigation?: any;
  route?: any;
}
const CommunityGroupDetails: React.FC<Props> = ({ navigation, route }) => {
  const { from, groupId } = route.params;
  const {
    groupDeatils,
    rbSheetRefMenu,
    isAllLoading,
    toasterFunction,
    isJoinedGroup,
    setIsJoinedGroup,
    isJoinRequestSent,
    setIsJoinRequestSent,
    allFeeds,
    isBackPress,
    groupList,
    setAllFeeds,
    dispatch,
    toasterDetails,
    setGroupList,
    setToasterDetails,
    deleteGroup,
    isLoader,
  }: any = useGroupDetailsHook(groupId, from, navigation);

  console.log("isAllLoading", isLoader);

  const memberDataCurrent = useSelector(profileDetailsCommunity());

  const [deleteAccountAlert, setDeleteAccountAlert] = useState(false);

  useEffect(() => {
    if (groupDeatils?.members?.joinedMembers?.length) {
      const memberList = groupDeatils?.members?.joinedMembers;
      isAmMemberOfThisGroup = memberList.some(
        (item: any) => item.memberId === memberDataCurrent?.id
      );
    }
  }, [groupDeatils]);

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <View style={styles.container}>
        <CommonHeader
          isBackIcon={true}
          onBackPress={isBackPress}
          isGroupType
          groupType={groupDeatils?.groupPrivacy}
          chornicType={groupDeatils?.groupCategory}
          threeDot={groupDeatils?.isCreatedGroup}
          onDotClick={() => {
            rbSheetRefMenu?.current?.open();
          }}
          mainContainer={styles.headerContainer}
        />
        {!isLoader ? (
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <MainGroupData
              groupDetailsData={groupDeatils}
              navigation={navigation}
              isAmMemberOfThisGroup={isAmMemberOfThisGroup}
            />
            {!groupDeatils?.isCreatedGroup && (
              <JoinArea
                id={groupDeatils?.id}
                toasterFunction={toasterFunction}
                isJoinedGroup={isJoinedGroup}
                setIsJoinedGroup={setIsJoinedGroup}
                isJoinRequestSent={isJoinRequestSent}
                setIsJoinRequestSent={setIsJoinRequestSent}
                groupPrivacy={groupDeatils?.groupPrivacy}
                isLoggedInMemberBlocked={groupDeatils?.isLoggedInMemberBlocked}
              />
            )}

            {(isJoinedGroup || groupDeatils?.isCreatedGroup) &&
              !groupDeatils?.isLoggedInMemberBlocked && (
                <AddMoreWithPlusDotted
                  mainContainer={styles.addMoreButtonContainer}
                  title={strings?.createFeed}
                  onPress={() =>
                    navigation?.navigate(navigationString?.CreateFeedForGroup, {
                      groupId: groupDeatils?.id,
                      feedData: {},
                    })
                  }
                />
              )}
            {(isJoinedGroup ||
              groupDeatils?.isCreatedGroup ||
              groupDeatils?.groupPrivacy == groupPrivacyType?.public) &&
              !groupDeatils?.isLoggedInMemberBlocked && (
                <FeedsListing
                  groupDetailsData={groupDeatils}
                  allFeeds={allFeeds}
                  navigation={navigation}
                  setAllFeeds={setAllFeeds}
                  toasterFunction={toasterFunction}
                  whereFrom={COMPONENT_NAMES_ENUM?.CommunityGroupDetails}
                  postReShared={() => {}}
                  managePagination={() => {}}
                />
              )}
            {groupList?.length > 0 && (
              <SuggestedGroupListing
                dispatch={dispatch}
                groupList={groupList}
                navigation={navigation}
                setGroupList={setGroupList}
                toasterFunction={toasterFunction}
                whereFrom={COMPONENT_NAMES_ENUM?.CommunityGroupDetails}
              />
            )}
            <RBsheetForDotMenu
              rbSheetRef={rbSheetRefMenu}
              menuData={menuDataGroup}
              onPressMenu={(value: any) => {
                if (value === switchCodes?.editGroupDetails) {
                  navigation?.navigate(navigationString?.CreateGroup, {
                    groupData: groupDeatils,
                  });
                  rbSheetRefMenu?.current?.close();
                } else if (value === switchCodes?.addMemberGroup) {
                  navigation?.navigate(navigationString?.AddMembersInGroup, {
                    from: fromNav?.groupDetailsAddMembers,
                    groupId: groupId,
                  });
                  rbSheetRefMenu?.current?.close();
                } else if (value === switchCodes?.removeMemberGroup) {
                  navigation?.navigate(navigationString?.AddMembersInGroup, {
                    from: fromNav?.groupDetailsRemoveMembers,
                    groupId: groupId,
                  });
                  rbSheetRefMenu?.current?.close();
                } else if (value === switchCodes?.deleteGroup) {
                  rbSheetRefMenu?.current?.close();
                  setTimeout(() => {
                    setDeleteAccountAlert(true);
                  }, 500);
                }
              }}
            />
          </KeyboardAwareScrollView>
        ) : (
          <CommonLoader />
        )}
      </View>

      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}

      {deleteAccountAlert && (
        <LogoutModal
          isVisible={deleteAccountAlert}
          title={strings?.sure}
          description={strings?.You_wanted_to_delete_this}
          onNo={() => setDeleteAccountAlert(false)}
          onYes={() => {
            deleteGroup();
            setDeleteAccountAlert(false); // Close after delete
          }}
          hideAlert={() => setDeleteAccountAlert(false)}
          textStyle={{ width: moderateScale(270) }}
          buttonTexts={[strings?.cancel_small, strings?.Delete]}
        />
      )}
    </ScreenWrapper>
  );
};

export default CommunityGroupDetails;
