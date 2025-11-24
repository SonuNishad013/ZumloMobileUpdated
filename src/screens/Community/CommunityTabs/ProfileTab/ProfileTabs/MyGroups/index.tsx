import { FlatList, StyleSheet, View, Text, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import TitleSideLine from "../../../../CommunityComponents/TitleSideLine";
import {
  moderateScale,
  textScale,
} from "../../../../../../constant/responsiveStyle";
import MainGroupCard from "../../../../CommunityComponents/MainGroupCard";
import colors from "../../../../../../constant/colors";
import { strings } from "../../../../../../constant/strings";
import allActions from "../../../../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../../../../components/Loader";
import { API_FUN_NAMES } from "../../../../../../constant/APIsFunctionNames";
import {
  STATUS_CODES,
  TOAST_STATUS,
} from "../../../../../../constant/appConstant";
import { useFocusEffect } from "@react-navigation/native";
interface Props {
  navigation?: any;
  toasterFunction?: any;
}

const MyGroups: React.FC<Props> = ({ navigation, toasterFunction }) => {
  const dispatch: any = useDispatch();
  const [groupTab, setGroupTab] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   createdOrJoinedGroupList();
  // }, []);
  useFocusEffect(
    useCallback(() => {
      createdOrJoinedGroupList();
    }, [])
  );

  const createdOrJoinedGroupList = () => {
    setIsLoading(true);
    allActions.communitiesAction
      .createdOrJoinedGroupList(
        dispatch,
        {},
        API_FUN_NAMES?.createdOrJoinedGroupList
      )
      .then((response: any) => {
        setIsLoading(false);
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (Object.keys(response?.data).length === 0) {
            setGroupTab({
              joinedGroup: [],
              createdGroup: [],
            });
          } else {
            setGroupTab(response?.data);

            // setGroupTab({
            //   joinedGroup: [],
            //   createdGroup: [],
            // });
          }
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err: any) => {
        setIsLoading(false);
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };

  return (
    <View
      style={{
        marginTop: isLoading ? moderateScale(40) : moderateScale(20),
        marginBottom: isLoading ? moderateScale(40) : moderateScale(0),
      }}
    >
      {!isLoading ? (
        <>
          <TitleSideLine title={"Groups you started"} />
          <FlatList
            data={groupTab?.createdGroup?.filter(
              (item: any) => !item?.isLoggedInMemberBlocked
            )}
            keyExtractor={(item, index) => "key" + index}
            scrollEnabled={false}
            style={styles.listStyle}
            contentContainerStyle={styles.listContentStyle}
            ListEmptyComponent={
              <>
                {isLoading ? (
                  <CommonLoader />
                ) : (
                  <Text
                    style={[
                      styles?.noDataStyle,
                      {
                        paddingHorizontal: moderateScale(20),
                        textAlign: "center",
                      },
                    ]}
                  >
                    {
                      "Start a space for what matters to you—or join one that already does"
                    }
                  </Text>
                )}
              </>
            }
            renderItem={({ item, index }) => {
              return (
                <MainGroupCard
                  name={item?.name}
                  description={item?.description}
                  source={item?.profilePicture}
                  memberCount={item?.joinedMemberCount}
                  isJoinable={false}
                  iconStyle={styles.iconStyle}
                  navigation={navigation}
                  id={item?.id}
                  card={{
                    backgroundColor:
                      index % 2 === 0 ? colors.SaltBox : colors.polishedPine,
                  }}
                />
              );
            }}
          />

          <TitleSideLine
            title={"Groups you’re in"}
            container={styles.joinedGroupsTitleContainer}
          />
          <FlatList
            data={groupTab?.joinedGroup.filter(
              (item: any) => !item?.isLoggedInMemberBlocked
            )}
            scrollEnabled={false}
            keyExtractor={(item, index) => "key" + index}
            style={styles.listStyle}
            contentContainerStyle={styles.joinedGroupsContentStyle}
            ListEmptyComponent={
              <Text
                style={[
                  styles?.noDataStyle,
                  { paddingHorizontal: moderateScale(20), textAlign: "center" },
                ]}
              >
                {"Join a group that speaks to you—or start one of your own!"}
              </Text>
            }
            renderItem={({ item, index }) => {
              return (
                <MainGroupCard
                  name={item?.name}
                  description={item?.description}
                  source={item?.profilePicture}
                  memberCount={item?.joinedMemberCount}
                  isJoinable={false}
                  iconStyle={styles.iconStyle}
                  navigation={navigation}
                  id={item?.id}
                  card={{
                    backgroundColor:
                      index % 2 === 0 ? colors?.SaltBox : colors?.polishedPine,
                  }}
                />
              );
            }}
          />
        </>
      ) : (
        <CommonLoader />
      )}
    </View>
  );
};

export default MyGroups;

const styles = StyleSheet.create({
  listStyle: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(15),
  },
  listContentStyle: {
    gap: moderateScale(10),
  },
  joinedGroupsContentStyle: {
    gap: moderateScale(10),
    paddingBottom: moderateScale(30),
  },
  iconStyle: {
    height: moderateScale(77),
    width: moderateScale(95),
  },
  joinedGroupsTitleContainer: {
    marginTop: moderateScale(20),
  },

  noDataStyle: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.prussianBlue,
    alignSelf: "center",
    marginTop: moderateScale(20),
  },
});
