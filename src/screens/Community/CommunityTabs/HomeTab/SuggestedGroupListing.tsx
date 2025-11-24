import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import SeeAllHeaderWellness from "../../../Dashboard/Wellness/commonHeader";
import { strings } from "../../../../constant/strings";
import MainGroupCard from "../../CommunityComponents/MainGroupCard";
import { moderateScale } from "../../../../constant/responsiveStyle";
import { getGroupActionTextSmall } from "../../../../helper/CommunityHelper";
import navigationString from "../../../../navigation/navigationString";
import { COMPONENT_NAMES_ENUM } from "../../../../constant/ENUM";
import NoRecordTxtComponent from "../../../../components/noDataContainer";
import colors from "../../../../constant/colors";

interface Props {
  dispatch?: any;
  groupList?: any;
  navigation?: any;
  setGroupList?: any;
  toasterFunction?: any;
  whereFrom?: any;
}
const SuggestedGroupListing: React.FC<Props> = ({
  groupList,
  navigation,
  dispatch,
  setGroupList,
  toasterFunction,
  whereFrom,
}) => {
  const showingType: any = () => {
    switch (whereFrom) {
      case COMPONENT_NAMES_ENUM?.CommunityGroupDetails:
        return {
          isSuggested: true,
          isSeeAll: true,
        };
      case COMPONENT_NAMES_ENUM?.HomeTab:
        return {
          isSuggested: true,
          isSeeAll: true,
        };

      default:
        return {
          isSuggested: false,
          isSeeAll: false,
        };
    }
  };

  return (
    <View>
      {!groupList?.length && <View style={{ marginTop: moderateScale(50) }} />}

      {showingType()?.isSeeAll && (
        <SeeAllHeaderWellness
          name={strings?.suggestedGroups}
          container={styles.suggestedGroupsHeader}
          msg={strings?.seeAll}
          onPress={() =>
            navigation?.navigate(navigationString?.AllCommunityGroups)
          }
          displayShowAll={false}
        />
      )}

      <FlatList
        data={groupList?.slice(0, 3)}
        keyExtractor={(item, index) => "key" + index}
        style={styles.suggestedGroupsList}
        contentContainerStyle={styles.suggestedGroupsContent}
        horizontal
        renderItem={({ item, index }: any) => (
          <MainGroupCard
            dispatch={dispatch}
            isSuggested={showingType()?.isSuggested}
            id={item?.id}
            index={index}
            groupList={groupList}
            setGroupList={setGroupList}
            isJoinedGroup={item?.isJoinedGroup}
            isJoinRequestSent={item?.isJoinRequestSent}
            toasterFunction={toasterFunction}
            name={item?.name}
            groupPrivacy={item?.groupPrivacy}
            description={item?.description}
            source={item?.profilePicture}
            memberCount={item?.joinedMemberCount}
            navigation={navigation}
            mainContainer={{
              marginLeft: index === 0 ? moderateScale(15) : moderateScale(0),
              marginRight: moderateScale(0),
            }}
            status={getGroupActionTextSmall(item)}
          />
        )}
      />
      {/* ) : (
        <NoRecordTxtComponent
          title={"No groups found"}
          txtColor={colors?.green}
          imageHeight={moderateScale(150)}
        />
      )} */}
    </View>
  );
};

export default SuggestedGroupListing;

const styles = StyleSheet.create({
  suggestedGroupsHeader: {
    marginHorizontal: moderateScale(19),
  },
  suggestedGroupsList: {
    marginTop: moderateScale(5),
    marginBottom: moderateScale(100),
  },
  suggestedGroupsContent: {
    gap: moderateScale(15),
  },
});
