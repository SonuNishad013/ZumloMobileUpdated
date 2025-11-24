import { StyleSheet, View, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  moderateScale,
  textScale,
} from "../../../../../../constant/responsiveStyle";
import colors from "../../../../../../constant/colors";
import allActions from "../../../../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../../../../components/Loader";
import { strings } from "../../../../../../constant/strings";
import FeedsListing from "../../../HomeTab/FeedsListing";
import { API_FUN_NAMES } from "../../../../../../constant/APIsFunctionNames";
import {
  STATUS_CODES,
  TOAST_STATUS,
} from "../../../../../../constant/appConstant";
import { COMPONENT_NAMES_ENUM } from "../../../../../../constant/ENUM";

interface Props {
  toasterFunction?: any;
  setToasterDetails?: any;
  navigation?: any;
}

const MyFeeds: React.FC<Props> = ({
  toasterFunction,
  setToasterDetails,
  navigation,
}) => {
  const dispatch: any = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [allFeeds, setAllFeeds] = useState([]);
  useEffect(() => {
    userProfileById();
  }, []);

  const userProfileById = () => {
    setIsLoading(true);
    let queryParams = ``;
    allActions?.communitiesAction
      .userProfileById(
        dispatch,
        {},
        API_FUN_NAMES?.userProfileById,
        queryParams
      )
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setIsLoading(false);
          setAllFeeds(response?.data?.feeds);
          // setAllFeeds([]);
        } else {
          setIsLoading(false);
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };

  return (
    <View
      style={{
        marginTop: isLoading ? moderateScale(40) : moderateScale(0),
        marginBottom: isLoading ? moderateScale(40) : moderateScale(0),
      }}
    >
      {!isLoading ? (
        <ScrollView style={{ flex: 1 }}>
          {allFeeds?.length > 0 ? (
            <FeedsListing
              allFeeds={allFeeds}
              navigation={navigation}
              setAllFeeds={setAllFeeds}
              toasterFunction={toasterFunction}
              whereFrom={COMPONENT_NAMES_ENUM?.ProfileTab}
              postReShared={() => userProfileById()}
              managePagination={() => {}}
            />
          ) : (
            <Text style={styles?.noDataStyle}>
              {
                "You haven’t shared anything yet. When you’re ready, your voice is welcome here"
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

export default MyFeeds;

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
    paddingHorizontal: moderateScale(20),
    textAlign: "center",
  },
});
