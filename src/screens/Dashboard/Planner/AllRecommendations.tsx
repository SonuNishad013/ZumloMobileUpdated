import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import { moderateScale } from "../../../constant/responsiveStyle";
import RecommendationCard from "../../../components/OnBoardiingComponents/RecommendationCard";
import { imagePath } from "../../../assets/png/imagePath";
import navigationString from "../../../navigation/navigationString";
import NoRecordTxtComponent from "../../../components/noDataContainer";
import moment from "moment";
import allActions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CommonLoader from "../../../components/Loader";
import { event } from "../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import { DATE_FORMAT } from "../../../constant/DateFormats";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../../constant/appConstant";
import { strings } from "../../../constant/strings";
import {
  Enum_RecommendationContentType,
  eventENUM,
  RecommendationTab_ENUM,
} from "../../../constant/ENUM";
import RecommendationCardForBooks from "../../../components/OnBoardiingComponents/RecommendationCardForBooks";
import logger from "../../../constant/logger";
import { examplerImage } from "../../../constant/RecommendationConstant";
import RecommendationAction from "../../../redux/actions/RecommendationAction";
import { getThumbnailFromYoutubeURL } from "../../../helper/RecommendationHelper";
import { findValueByKey } from "../Summary/component/Hooks/transformGoalsFromAPI";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { textLabelSize } from "../../../utils/TextConfig";
import { CloseIcon, ClossIcon } from "../../../assets";
import { ruleTypes } from "react-native-gifted-charts";
import { PAGINATION } from "../../../utils/pagination";
import PaginationLoader from "../../../components/Loader/PaginationLoader";
import { createThumbnail, creatThumnail } from "../../../utils/CommonMethods";
import { LoadSavedRecommendationData } from "../../../redux/selector";
import types from "../../../redux/types/recommendationTypes";
const showBookDesign = true; // This variable is used to determine whether to show the book design or not
interface Props {
  navigation?: any;
  route?: any;
}
const AllRecommendations: React.FC<Props> = ({ route, navigation }) => {
  //when user coming from the dashboard to recommendation card below the activities and health tips
  const dispatch = useDispatch();
  const loadedRecommendationData = useSelector(LoadSavedRecommendationData());
  logger("loadedRecommendationData______", loadedRecommendationData);
  const { allRecommendations } = route?.params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [paginationLoader, setPaginationLoader] = useState(false);
  const [booksList, setBooksList] = useState<any[]>([]);
  const [videosList, setVideosList] = useState<any[]>([]);
  const [tabValue, setTabValue] = useState<string>(
    RecommendationTab_ENUM?.GENERAL
  );
  const [buttonValue, setButtonValue] = useState<string>(
    RecommendationTab_ENUM?.VIDEOS
  );
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      if (
        buttonValue === RecommendationTab_ENUM?.VIDEOS &&
        loadedRecommendationData?.videos.length === 0
      ) {
        getRecommendationCategories();
      } else if (
        buttonValue === RecommendationTab_ENUM?.BOOKS &&
        loadedRecommendationData?.books.length === 0
      ) {
        getRecommendationCategories();
      } else {
        setBooksList(loadedRecommendationData?.books);
        setVideosList(loadedRecommendationData?.videos);
        setPageNumber(
          buttonValue === RecommendationTab_ENUM?.BOOKS
            ? loadedRecommendationData?.booksPageNumber
            : loadedRecommendationData?.videosPageNumber
        );
      }
    }, [loadedRecommendationData?.books, loadedRecommendationData?.videos])
  );

  const handleBackButtonPress = () => {
    if (route?.params?.from == strings?.ProductGuide) {
      navigation.pop(2);
    } else if (
      [strings?.fromExplorer, strings?.AIGeneratedSkipped].includes(
        route?.params?.from
      )
    ) {
      const isPlanner = route?.params?.from === strings?.AIGeneratedSkipped;
      AsyncStorageUtils.storeItemKey(
        AsyncStorageUtils.ISPLANNER_USER,
        JSON.stringify({ isPlanner: isPlanner, isSelected: true })
      );
      event.emit(eventENUM?.login);
    } else {
      dispatch({
        type: types?.SAVED_LOADED_RECOMMENDATION,
        payload: {
          books: [],
          videos: [],
          booksPageNumber: 1,
          videosPageNumber: 1,
        },
      });
      navigation.goBack();
    }
  };

  const TabValue = () => {
    if (tabValue === RecommendationTab_ENUM?.GENERAL) {
      return false;
    } else if (tabValue === RecommendationTab_ENUM?.PERSONAL) {
      return true;
    }
  };

  const getRecommendationVideosAndBooks = async (
    page: number,
    isPersonal: boolean,
    mediaType: number,
    selectedCategories?: string[]
  ) => {
    if (page === 1) {
      setBooksList([]);
      setVideosList([]);
      setIsLoading(true);
    } else {
      setPaginationLoader(true);
    }

    try {
      const request: any = {
        IsPersonal: isPersonal,
        PageNumber: page,
        PageSize: PAGINATION?.RECOMMENDATION_VIDEOS_BOOKS,
        RecommendationType: mediaType,
        ...(!isPersonal && {
          IsCategory: true,
          Category:
            selectedCategories ??
            categoryList
              .filter((item: any) => item?.isUserSelected)
              .map((item: any) => item?.title),
        }),
      };

      const response: any =
        await RecommendationAction?.recommendationVideosAndBooks(
          request,
          API_FUN_NAMES?.recommendationVideosAndBooks
        );

      setIsLoading(false);
      setPaginationLoader(false);

      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setTotalPages(Math.ceil(response?.data?.total / PAGINATION?.HABITS));

        const uniqueById = <
          T extends {
            id?: string;
            bookId?: string;
            videoId?: string;
            title?: string;
            bookTitle?: string;
          }
        >(
          arr: T[]
        ) => {
          const seen = new Set();
          return arr.filter((item) => {
            const key = item.title ?? item.bookTitle ?? item.title;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        };

        if (mediaType === 1) {
          setVideosList((prev) =>
            page === 1
              ? response?.data?.videos
              : uniqueById([...prev, ...response?.data?.videos])
          );
        }

        if (mediaType === 2) {
          setBooksList((prev) =>
            page === 1
              ? response?.data?.books
              : uniqueById([...prev, ...response?.data?.books])
          );
        }

        setPageNumber(page);
      }
    } catch (error) {
      setPaginationLoader(false);
      setIsLoading(false);
    }
  };

  const getRecommendationCategories = async () => {
    setIsLoading(true);
    try {
      let response: any = await RecommendationAction?.recommendationCategories(
        API_FUN_NAMES?.recommendationCategories
      );
      if (response) {
        setIsLoading(false);
        if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
          setCategoryList(response?.data || []);
          const selectedCategories: any[] = response?.data
            ?.filter((item: any) => item?.isUserSelected)
            .map((item: any) => item?.title);
          setPageNumber(1);

          getRecommendationVideosAndBooks(
            1,
            tabValue === RecommendationTab_ENUM?.PERSONAL ? true : false,
            buttonValue === RecommendationTab_ENUM?.VIDEOS ? 1 : 2,
            selectedCategories
          );
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const removeCategory = async (clearAll: boolean, category?: any) => {
    const selectedCategories = clearAll
      ? []
      : categoryList
          .filter(
            (item: any) =>
              item?.isUserSelected && item.title !== category?.title
          )
          .map((item: any) => item.title);

    const requestBody = { selectedCategories };
    const response =
      await allActions?.RecommendationAction?.getUserSelectedRecommendationCategories(
        requestBody,
        "getUserSelectedRecommendationCategories"
      );

    if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
      getRecommendationCategories();
    }
  };

  const managePagination = () => {
    if (pageNumber < totalPages) {
      getRecommendationVideosAndBooks(
        pageNumber + 1,
        TabValue(),
        buttonValue === RecommendationTab_ENUM?.VIDEOS ? 1 : 2
      );
    }
  };

  const renderNoDataFound = () => {
    const isBooks = buttonValue === RecommendationTab_ENUM?.BOOKS;
    const isVideos = buttonValue === RecommendationTab_ENUM?.VIDEOS;
    const noData =
      !isLoading &&
      ((isBooks && booksList?.length === 0) ||
        (isVideos && videosList?.length === 0));

    if (!noData) return null;

    return (
      <View style={styles?.noDataFoundView}>
        {/* <NoRecordTxtComponent txtColor={colors.darkPrussianBlue} /> */}
        <Text style={styles?.noDataTitleText}>
          {!isBooks ? strings?.watchlistEmpty : strings?.readingListEmpty}
        </Text>
        <Text style={styles?.noDataSubtitleText}>
          {!isBooks ? strings?.discoverVideosText : strings?.discoverBooksText}
        </Text>
      </View>
    );
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SurfCrest}>
      <View style={styles?.mainView}>
        <>
          <CommonHeader
            headerName={strings?.explorer_header}
            onBackPress={handleBackButtonPress}
            textStyle={styles?.headerText}
            mainContainer={styles?.buttonView}
            filter={
              tabValue === RecommendationTab_ENUM?.PERSONAL ? false : true
            }
            OnFilterPress={() => {
              navigation?.navigate(navigationString?.FilterRecommendation, {
                categoryList: categoryList,
              });
            }}
          />

          {showBookDesign && (
            <>
              <View style={styles?.tabView}>
                <TouchableOpacity
                  onPress={() => {
                    setPageNumber(1);
                    setTabValue(RecommendationTab_ENUM?.PERSONAL);
                    getRecommendationVideosAndBooks(
                      1,
                      true,
                      buttonValue === RecommendationTab_ENUM?.VIDEOS ? 1 : 2
                    );
                  }}
                >
                  <Text
                    style={
                      tabValue == RecommendationTab_ENUM?.PERSONAL
                        ? styles?.titleSelected
                        : styles?.title
                    }
                  >
                    {RecommendationTab_ENUM?.PERSONAL}
                  </Text>
                  <View
                    style={
                      tabValue == RecommendationTab_ENUM?.PERSONAL
                        ? styles?.tabSelected
                        : styles?.tab
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPageNumber(1);
                    setTabValue(RecommendationTab_ENUM?.GENERAL);
                    getRecommendationVideosAndBooks(
                      1,
                      false,
                      buttonValue === RecommendationTab_ENUM?.VIDEOS ? 1 : 2
                    );
                  }}
                >
                  <Text
                    style={
                      tabValue == RecommendationTab_ENUM?.GENERAL
                        ? styles?.titleSelected
                        : styles?.title
                    }
                  >
                    {RecommendationTab_ENUM?.GENERAL}
                  </Text>
                  <View
                    style={
                      tabValue == RecommendationTab_ENUM?.GENERAL
                        ? styles?.tabSelected
                        : styles?.tab
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={styles?.horizontalLine} />

              <View style={styles?.subToolbarView}>
                <Text style={styles?.totalCount}>{`${
                  buttonValue === RecommendationTab_ENUM?.BOOKS
                    ? booksList?.length
                    : videosList?.length
                } total ${buttonValue}`}</Text>
                <View style={styles?.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setPageNumber(1);
                      setButtonValue(RecommendationTab_ENUM?.BOOKS);
                      if (loadedRecommendationData?.booksPageNumber === 1) {
                        getRecommendationVideosAndBooks(1, TabValue(), 2);
                      }
                    }}
                    style={
                      buttonValue == RecommendationTab_ENUM?.BOOKS
                        ? styles?.selectedButtonView
                        : styles?.unselectedButtonView
                    }
                  >
                    <Text
                      style={
                        buttonValue == RecommendationTab_ENUM?.BOOKS
                          ? styles?.selectedButtonText
                          : styles?.unselectedButtonText
                      }
                    >
                      {Enum_RecommendationContentType?.BOOKS}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setPageNumber(1);
                      setButtonValue(RecommendationTab_ENUM?.VIDEOS);

                      if (loadedRecommendationData?.videosPageNumber === 1) {
                        getRecommendationVideosAndBooks(1, TabValue(), 1);
                      }
                    }}
                    style={
                      buttonValue == RecommendationTab_ENUM?.VIDEOS
                        ? styles?.selectedButtonView
                        : styles?.unselectedButtonView
                    }
                  >
                    <Text
                      style={
                        buttonValue == RecommendationTab_ENUM?.VIDEOS
                          ? styles?.selectedButtonText
                          : styles?.unselectedButtonText
                      }
                    >
                      {Enum_RecommendationContentType?.VIDEO}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}

          <FlatList
            data={
              buttonValue === RecommendationTab_ENUM?.BOOKS
                ? booksList
                : videosList
            }
            style={styles?.gapView}
            keyExtractor={(item, index) => "key" + index}
            onEndReached={() => managePagination()}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={() => {
              if (
                categoryList?.filter((item: any) => item?.isUserSelected)
                  .length &&
                tabValue === RecommendationTab_ENUM?.GENERAL
              ) {
                return (
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      height: moderateScale(60),
                    }}
                  >
                    <ScrollView
                      horizontal
                      contentContainerStyle={{
                        gap: moderateScale(10),
                        paddingRight: moderateScale(50),
                        paddingTop: moderateScale(15),
                      }}
                    >
                      {categoryList
                        ?.filter((item: any) => item?.isUserSelected)
                        .map((item, index) => {
                          return (
                            <View
                              style={{
                                backgroundColor: colors?.polishedPine,
                                padding: moderateScale(5),
                                borderRadius: moderateScale(30),
                                paddingHorizontal: moderateScale(15),
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: textLabelSize?.subtTitleFont,
                                  color: colors?.SurfCrest,
                                  fontWeight: "400",
                                }}
                              >
                                {item?.title}
                              </Text>
                              <TouchableOpacity
                                style={{
                                  position: "absolute",
                                  backgroundColor: colors?.prussianBlue,
                                  padding: 2,
                                  borderRadius: moderateScale(15),
                                  top: moderateScale(-10),
                                  right: moderateScale(-5),
                                }}
                                onPress={() => removeCategory(false, item)}
                              >
                                <CloseIcon />
                              </TouchableOpacity>
                            </View>
                          );
                        })}
                    </ScrollView>
                    <TouchableOpacity
                      style={{
                        marginLeft: moderateScale(10),
                        paddingTop: moderateScale(15),
                      }}
                      onPress={() => removeCategory(true)}
                    >
                      <Text
                        style={{
                          fontSize: textLabelSize?.subtTitleFont,
                          color: "rgba(160, 160, 160, 1)",
                        }}
                      >
                        {strings?.Clear_all}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }
            }}
            renderItem={({ item, index }) => (
              <>
                {buttonValue == RecommendationTab_ENUM?.BOOKS ? (
                  <RecommendationCardForBooks
                    card={styles?.cardView}
                    author={item?.author ? item?.author : "unknown"}
                    title={item?.bookTitle ? item?.bookTitle : "--"}
                    summary={item?.summary ? item?.summary : "--"}
                    description={item?.description ? item?.description : "--"}
                    frequency={item?.frequency ? item?.frequency : "--"}
                    items={
                      item?.items?.length > 0 || item?.items
                        ? item?.items?.length
                        : "--"
                    }
                    source={
                      item?.logo && !examplerImage.includes(item?.logo)
                        ? { uri: item?.logo }
                        : imagePath?.BookPlaceHolder
                    }
                    onPress={() => {
                      dispatch({
                        type: types?.SAVED_LOADED_RECOMMENDATION,
                        payload: {
                          books: booksList,
                          videos: videosList,
                          booksPageNumber: pageNumber,
                        },
                      });
                      navigation?.navigate(
                        navigationString?.RecommendationList,
                        {
                          data: item,
                          recomendationContentType:
                            Enum_RecommendationContentType?.BOOKS,
                          isPersonalTab:
                            tabValue === RecommendationTab_ENUM?.PERSONAL,
                        }
                      );
                    }}
                  />
                ) : (
                  <RecommendationCard
                    card={styles?.cardView}
                    title={item?.title ? item?.title : "--"}
                    description={
                      item?.description ? item?.description : item?.category
                    }
                    frequency={item?.frequency ? item?.frequency : "--"}
                    items={
                      item?.items?.length > 0 || item?.items
                        ? item?.items?.length
                        : "--"
                    }
                    source={createThumbnail(item)}
                    onPress={(source: any) => {
                      dispatch({
                        type: types?.SAVED_LOADED_RECOMMENDATION,
                        payload: {
                          books: booksList,
                          videos: videosList,
                          videosPageNumber: pageNumber,
                        },
                      });
                      navigation?.navigate(
                        navigationString?.RecommendationList,
                        {
                          data: item,
                          recomendationContentType:
                            Enum_RecommendationContentType?.VIDEO,
                          videoLink: item?.link,
                        }
                      );
                    }}
                  />
                )}
              </>
            )}
          />
        </>
        {paginationLoader && (
          <PaginationLoader
            title={"Loading data"}
            textColor={colors?.prussianBlue}
          />
        )}

        {isLoading && <CommonLoader />}

        {renderNoDataFound()}
      </View>
    </ScreenWrapper>
  );
};

export default AllRecommendations; //when user coming from the dashboard to recommendation card below the activities and health tips

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: moderateScale(19),
    flex: 1,
  },
  noDataFoundView: {
    position: "absolute",
    top: "35%",
    alignSelf: "center",
  },
  noDataTitleText: {
    color: colors?.darkPrussianBlue,
    fontSize: textLabelSize?.titleFont,
    fontWeight: "600",
    textAlign: "center",
  },
  noDataSubtitleText: {
    color: colors?.darkPrussianBlue,
    fontSize: textLabelSize?.subtTitleFont,
    fontWeight: "500",
    textAlign: "center",
    marginTop: moderateScale(10),
  },
  headerText: {
    color: colors?.prussianBlue,
  },
  buttonView: {
    paddingTop: moderateScale(15),
    paddingBottom: moderateScale(15),
  },
  gapView: {
    gap: moderateScale(15),
  },
  cardView: {
    marginVertical: moderateScale(8),
    backgroundColor: colors?.prussianBlue,
  },
  horizontalLine: {
    height: moderateScale(1),
    backgroundColor: colors?.grayOp,
  },
  tabView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  titleSelected: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: colors?.polishedPine,
  },
  tabSelected: {
    height: moderateScale(4),
    backgroundColor: colors?.polishedPine,
    borderTopLeftRadius: moderateScale(15),
    borderTopRightRadius: moderateScale(15),
    marginHorizontal: moderateScale(7),
    marginTop: moderateScale(5),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: colors?.prussianBlue,
  },
  tab: {
    height: moderateScale(4),
    backgroundColor: colors?.transparent,
    borderTopLeftRadius: moderateScale(15),
    borderTopRightRadius: moderateScale(15),
    marginHorizontal: moderateScale(7),
    marginTop: moderateScale(5),
  },
  subToolbarView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: moderateScale(20),
  },
  totalCount: {
    fontSize: moderateScale(16),
    color: colors?.prussianBlue,
    fontWeight: "400",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedButtonView: {
    backgroundColor: colors?.SaltBox,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(25),
    marginHorizontal: moderateScale(5),
    borderWidth: moderateScale(1.5),
    borderColor: colors?.SaltBox,
  },
  selectedButtonText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "400",
  },
  unselectedButtonView: {
    backgroundColor: colors?.transparent,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(25),
    marginHorizontal: moderateScale(5),
    borderWidth: moderateScale(1.5),
    borderColor: colors?.tabBorder,
  },
  unselectedButtonText: {
    color: colors?.tabColor,
    fontSize: moderateScale(14),
    fontWeight: "400",
  },
});
//Total books or total videos
//Screen where we show all the recommendations of videos and books
