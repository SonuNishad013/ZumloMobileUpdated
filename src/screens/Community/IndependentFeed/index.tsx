import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import StatusBarHeader from "../../Profile/Preferences/StatusBarHeader";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import allActions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FeedsListing from "../CommunityTabs/HomeTab/FeedsListing";
import navigationString from "../../../navigation/navigationString";
import { get_isGoBack } from "../../../redux/selector";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import { strings } from "../../../constant/strings";
import { useFocusEffect } from "@react-navigation/native";
import logger from "../../../constant/logger";

interface Props {
  navigation?: any;
  route?: any;
}
const IndependentFeed: React.FC<Props> = ({ navigation, route }) => {
  const get_isGoBack_ = useSelector(get_isGoBack());

  const dispatch: any = useDispatch();
  const { feedId, renderIn, changeHeader, NotificationItem } = route.params;
  logger("NotificationItem:___", NotificationItem);
  const [allFeeds, setAllFeeds] = useState<any>([]);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const toasterFunction = (code: any, message: any) => {
    setToasterDetails({
      showToast: true,
      code: code,
      message: message,
    });
  };

  useFocusEffect(
    useCallback(() => {
      getFeedById();
    }, [])
  );
  useEffect(() => {
    if (get_isGoBack_) {
      navigation?.goBack();
    }
  }, [get_isGoBack_]);

  const getFeedById = () => {
    let queryParams = `?feedId=${feedId}`;
    allActions?.communitiesAction
      .getFeedById(dispatch, {}, API_FUN_NAMES?.getFeedById, queryParams)
      .then(async (response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setAllFeeds([response?.data]);
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
          if (response?.message === "Feed not found.") {
            deleteNotificationById(NotificationItem);
          }
          // deleteNotificationById()
        }
      })
      .catch((err) => {
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };
  // Delete notification if user not found response received in accept and reject connection request .
  const deleteNotificationById = async (item: any) => {
    let requestBody = null;
    let param = item?.id;
    try {
      const response =
        await allActions.notificationAction.DeleteNotificationByIdAPI(
          dispatch,
          requestBody,
          "saveNotification",
          param
        );
      if (response.statusCode === 200) {
        handleBackPressIndependentFeed();
      } else {
        toasterFunction(0, response?.message);
      }
    } catch (error: any) {
      toasterFunction(0, error?.message);
    } finally {
    }
  };
  const handleBackPressIndependentFeed = () => {
    if (renderIn === strings?.Notification) {
      navigation.navigate(navigationString?.Community);
      navigation.pop(2);
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <View style={styles.container}>
        <StatusBarHeader
          headerName={changeHeader ? changeHeader : strings?.Independent_feed}
          navigation={navigation}
          onBackPress={handleBackPressIndependentFeed}
        />
        <KeyboardAwareScrollView>
          <FeedsListing
            allFeeds={allFeeds}
            navigation={navigation}
            setAllFeeds={setAllFeeds}
            toasterFunction={toasterFunction}
            whereFrom={
              changeHeader ? strings?.Feed_details : strings?.Independent_feed
            }
            postReShared={() => {}}
            managePagination={() => {}}
          />
        </KeyboardAwareScrollView>
      </View>
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
    </ScreenWrapper>
  );
};

export default IndependentFeed;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.SurfCrest,
    flex: 1,
  },
});
