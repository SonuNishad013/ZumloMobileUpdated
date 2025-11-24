import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  moderateScale,
  textScale,
} from "../../../../../../constant/responsiveStyle";
import colors from "../../../../../../constant/colors";
import {
  notifictionUITypeList,
  notifictionUITypeList2,
} from "../../../../../../constant/notificationFormName";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../../../../components/Loader";
import allActions from "../../../../../../redux/actions";
import CommunityGroupInvitationActivites from "./CommunityActivitesCard/CommunityGroupInvitationActivites";
import LikeCommentCardActivites from "./CommunityActivitesCard/LikeCommentCard";
import { API_FUN_NAMES } from "../../../../../../constant/APIsFunctionNames";
import {
  STATUS_CODES,
  TOAST_STATUS,
} from "../../../../../../constant/appConstant";
import { strings } from "../../../../../../constant/strings";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
  navigation?: any;
  toasterFunction?: any;
}

const MyActivities: React.FC<Props> = ({ navigation, toasterFunction }) => {
  const dispatch: any = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [notificationListData, setNotificationListData] = useState<any>([]);

  useFocusEffect(
    useCallback(() => {
      communityActivities();
    }, [])
  );

  const communityActivities = async () => {
    setIsLoading(true);
    let requestbody = {};
    try {
      const response = await allActions.notificationAction.communityActivities(
        dispatch,
        requestbody,
        API_FUN_NAMES?.communityActivities
      );
      if (response.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setNotificationListData(response?.data);
        // setNotificationListData([]);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toasterFunction(TOAST_STATUS?.ERROR, response?.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      toasterFunction(TOAST_STATUS?.ERROR, error?.message);
    }
  };

  const renderNotificationCard = (item: any, idx: number) => {
    if (notifictionUITypeList.includes(item.notificationType)) {
      return (
        <CommunityGroupInvitationActivites
          item={item}
          index={idx}
          dispatch={dispatch}
          notificationListData={notificationListData}
          setNotificationListData={setNotificationListData}
          toasterFunction={toasterFunction}
        />
      );
    } else if (notifictionUITypeList2.includes(item.notificationType)) {
      return <LikeCommentCardActivites item={item} index={idx} />;
    }

    return (
      <Text style={styles.unsupportedText}>{strings?.UI_not_supported}</Text>
    );
  };

  return (
    <View style={[styles.container, isLoading && styles.loaderMargin]}>
      {!isLoading ? (
        <ScrollView style={styles.scrollView}>
          {notificationListData?.length > 0 ? (
            <FlatList
              data={notificationListData}
              keyExtractor={(item, index) => "key" + index}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: moderateScale(1),
                    backgroundColor: colors?.surfCrustOp2,
                    flex: 1,
                    marginLeft: moderateScale(19),
                    marginTop: moderateScale(8),
                  }}
                />
              )}
              bounces={false}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item, index }) =>
                renderNotificationCard(item, index)
              }
            />
          ) : (
            <Text
              style={[
                styles.noDataText,
                { paddingHorizontal: moderateScale(20), textAlign: "center" },
              ]}
            >
              {
                "Your interactions will show up here. Explore, connect, and express yourself"
              }
            </Text>
          )}
        </ScrollView>
      ) : (
        <CommonLoader />
      )}
    </View>
  );
};

export default MyActivities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderMargin: {
    marginTop: moderateScale(40),
    marginBottom: moderateScale(40),
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
    marginTop: moderateScale(30),
    gap: 10,
    paddingBottom: moderateScale(65),
  },
  noDataText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.prussianBlue,
    alignSelf: "center",
    marginTop: moderateScale(20),
  },
  unsupportedText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.grey,
    textAlign: "center",
  },
});
