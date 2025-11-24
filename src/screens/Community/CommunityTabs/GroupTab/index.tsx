import { FlatList, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../styles";
import MainGroupCard from "../../CommunityComponents/MainGroupCard";
import colors from "../../../../constant/colors";
import CreateGroupButton from "../../CommunityComponents/CreateGroupButton";
import navigationString from "../../../../navigation/navigationString";
import allActions from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getGroupActionText } from "../../../../helper/CommunityHelper";
import { strings } from "../../../../constant/strings";
import CommonLoader from "../../../../components/Loader";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../../constant/appConstant";
import { useFocusEffect } from "@react-navigation/native";
import { moderateScale } from "../../../../constant/responsiveStyle";

interface Props {
  navigation?: any;
  toasterFunction?: any;
  sendtrigger?: any;
}
const GroupTab: React.FC<Props> = ({
  navigation,
  toasterFunction,
  sendtrigger,
}) => {
  const dispatch: any = useDispatch();
  const [groupList, setGroupList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setGroupList([]);
      privateAndPublicGroupList();
    }, [])
  );

  const privateAndPublicGroupList = () => {
    setIsLoading(true);
    allActions.communitiesAction
      .privateAndPublicGroupList(
        dispatch,
        {},
        API_FUN_NAMES?.privateAndPublicGroupList
      )
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setIsLoading(false);
          if (Array.isArray(response?.data)) {
            const filteredGroupList: any = response?.data?.filter(
              (item: any) => !item?.isLoggedInMemberBlocked
            );

            setGroupList(filteredGroupList);
          } else {
            setGroupList([]);
          }
        } else {
          setIsLoading(false);
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err: any) => {
        setIsLoading(false);

        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };

  return (
    <>
      <Text
        style={[
          styles?.headerStyleText,
          {
            paddingHorizontal: moderateScale(20),
            marginBottom: moderateScale(20),
          },
        ]}
      >
        {"Start your own group "}
      </Text>
      <CreateGroupButton
        onCreateGroupPress={() =>
          navigation?.navigate(navigationString?.CreateGroup, {
            groupData: {},
          })
        }
      />
      <Text
        style={[
          styles?.headerStyleText,
          {
            paddingHorizontal: moderateScale(20),
            marginTop: moderateScale(30),
            marginBottom: 0,
          },
        ]}
      >
        {"Trending groups"}
      </Text>

      <FlatList
        data={groupList}
        keyExtractor={(item, index) => "key" + index}
        scrollEnabled={false}
        style={styles.trendingFeedsList}
        ListEmptyComponent={
          <>
            {isLoading ? (
              <CommonLoader />
            ) : (
              <Text style={styles?.wrongText}>{strings?.noGroupFound}</Text>
            )}
          </>
        }
        contentContainerStyle={styles.trendingFeedsContent}
        renderItem={({ item, index }) => {
          return (
            <MainGroupCard
              dispatch={dispatch}
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
              status={getGroupActionText(item)}
              card={{
                backgroundColor:
                  index % 2 == 0 ? colors?.SaltBox : colors?.polishedPine,
              }}
            />
          );
        }}
      />
    </>
  );
};

export default GroupTab;
