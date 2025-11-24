import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import StatusBarHeader from "../../Profile/Preferences/StatusBarHeader";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import allActions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FeedsListing from "../CommunityTabs/HomeTab/FeedsListing";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import { strings } from "../../../constant/strings";
import { COMPONENT_NAMES_ENUM } from "../../../constant/ENUM";
import CommonLoader from "../../../components/Loader";
import { getTrandingFeedData } from "../../../redux/selector";
import { PAGINATION } from "../../../utils/pagination";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "../../../constant/responsiveStyle";
import FastImage from "react-native-fast-image";
import { imagePath } from "../../../assets/png/imagePath";
import PaginationLoader from "../../../components/Loader/PaginationLoader";

interface Props {
  navigation?: any;
}
const AllCommunityFeed: React.FC<Props> = ({ navigation }) => {
  const dispatch: any = useDispatch();

  const [allFeeds, setAllFeeds] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationLoader, setPaginationLoader] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const trandingFeedLocal = useSelector(getTrandingFeedData());
  const toasterFunction = (code: any, message: any) => {
    setToasterDetails({
      showToast: true,
      code: code,
      message: message,
    });
  };
  useEffect(() => {
    getTrendingFeeds(0);
  }, []);

  const managePagination = () => {
    console;
    if (pageNumber < totalPages) {
      getTrendingFeeds(pageNumber + 1);
    }
  };

  const getTrendingFeeds = (page: any) => {
    if (page == 0) {
      setIsLoading(true);
    } else {
      setPaginationLoader(true);
    }

    let requestbody = {
      pageSize: PAGINATION?.ALL_FEEDS,
      pageIndex: page,
    };
    allActions?.communitiesAction
      .getTrendingFeeds(dispatch, requestbody, API_FUN_NAMES?.suggestedGroups)
      .then(async (response: any) => {
        setIsLoading(false);
        setPaginationLoader(false);
        let totalItems = response?.data?.paginationDetails?.length;
        setTotalPages(Math.ceil(totalItems / PAGINATION?.ALL_FEEDS));
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (page === 0) {
            setAllFeeds(response?.data?.list);
          } else {
            setAllFeeds((prev: any) => [...prev, ...response?.data?.list]);
          }
          setPageNumber(page);
        } else {
          setAllFeeds([]);
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err) => {
        setAllFeeds([]);
        setIsLoading(false);
        setPaginationLoader(false);
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };
  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <View style={styles?.container}>
        <StatusBarHeader
          headerName={strings?.Trending_feed}
          navigation={navigation}
        />
        {/* <KeyboardAwareScrollView> */}
        <FeedsListing
          allFeeds={allFeeds}
          navigation={navigation}
          setAllFeeds={setAllFeeds}
          toasterFunction={toasterFunction}
          whereFrom={COMPONENT_NAMES_ENUM?.AllCommunityFeed}
          postReShared={() => {}}
          managePagination={() => managePagination()}
        />
        {/* </KeyboardAwareScrollView> */}
      </View>
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
      {paginationLoader && (
        <PaginationLoader
          title={"Loading Feeds"}
          textColor={colors?.SurfCrest}
        />
      )}
      {isLoading && <CommonLoader />}
    </ScreenWrapper>
  );
};

export default AllCommunityFeed;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.SurfCrest,
    flex: 1,
  },
});
