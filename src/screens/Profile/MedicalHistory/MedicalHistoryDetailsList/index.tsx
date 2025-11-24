import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import { moderateScale, width } from "../../../../constant/responsiveStyle";
import allActions from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../../components/Loader";
import { useIsFocused } from "@react-navigation/native";
import StatusBarHeader from "../../Preferences/StatusBarHeader";
import EditBarMedicalHealth, {
  cardHeaderNameAddOtherCTAButtonText,
} from "../Helpers/EditBarMedicalHealth";
import * as AsyncStorage from "../../../../utils/Storage/AsyncStorage";
import { filterCategoryData } from "../../../../helper/getGlobalCodes";
import { HeaderCategoryItem } from "../Helpers/HeaderCategoryItem";
import { headerData } from "../Helpers/HelperFun";
import { hideAddMoreOption } from "../../../../constant/ProfileConstant";
import AddButton from "../../../OnBoarding/WellnessPlan/ReGenerateWellnessPlan/AddButton";
import navigationString from "../../../../navigation/navigationString";
import { codeName } from "../../../../constant/AllGlobalNameConstant";
import { styles } from "./styles";
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../../constant/appConstant";
import logger from "../../../../constant/logger";
import { strings } from "../../../../constant/strings";

interface Props {
  navigation?: any;
  route?: any;
}
const MemoizedHeaderCategoryItem = React.memo(HeaderCategoryItem);
const MemoizedEditBarMedicalHealth = React.memo(EditBarMedicalHealth);
const MemoizedAddButton = React.memo(AddButton);
const MedicalHistoryDetailsList: React.FC<Props> = ({ navigation, route }) => {
  const { itemData }: any = route?.params;
  const dispatch: any = useDispatch();
  const isFocused = useIsFocused();
  const [subCategory, setSubCategory] = useState<any>([]);
  const [specificCategory, setSpecificCategory] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [globalCodeId, setGlobalCodeId] = useState<any>(null);
  const [headerCategories, setHeaderCategories] = useState<any>([]);
  const [toggleIdx, setToggleIdx] = useState(0);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    if (itemData == undefined) return;
    setGlobalCodeId(itemData?.globalCodeId);
    getUserMedicalHistory(itemData?.globalCodeId);
    getCategoryHeader(itemData);
  }, [itemData]);

  useEffect(() => {
    if (headerCategories?.length == 0 || !headerCategories) return;
    getUserMedicalHistory(globalCodeId);
  }, [isFocused, globalCodeId, headerCategories]);
  const getUserMedicalHistory = async (globalCodeId: any) => {
    setIsLoading(true);
    let id = await globalCodeId;
    if (id !== null) {
      let requestbody = {};
      allActions.seekerDetails
        .GetUserMedicalHistory(
          dispatch,
          requestbody,
          API_FUN_NAMES?.GetUserMedicalHistory,
          globalCodeId
        )
        .then((response: any) => {
          if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
            setIsLoading(false);
            setSubCategory(response.data);
            changeToggle(toggleIdx, response.data);
          } else {
            setIsLoading(false);
            setToasterDetails({
              showToast: true,
              code: TOAST_STATUS?.ERROR,
              message: response.message,
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setToasterDetails({
            showToast: true,
            code: TOAST_STATUS?.ERROR,
            message: err.message,
          });
        });
    } else {
      return;
    }
  };
  const getCategoryHeader = async (item: any): Promise<any> => {
    let typeString = await headerData(item);
    try {
      const getGlobalCodeData = await AsyncStorage.getItem(
        AsyncStorage.GLOBALCODEWITHCATEGORY
      );
      let getOnboardingGlobalData = await filterCategoryData(
        JSON.parse(getGlobalCodeData),
        typeString
      );
      logger(
        "getOnboardingGlobalData[0]?.globalCodeOptions____",
        getOnboardingGlobalData[0]?.globalCodeOptions
      );

      setHeaderCategories(
        getOnboardingGlobalData[0]?.globalCodeOptions?.filter(
          (item: any) => item?.codeName !== "Women's Health"
        )
      );
    } catch (error) {
      logger("Error retrieving login user data:", error);
    }
  };

  const changeToggle = async (idx: any, data: any) => {
    try {
      if (idx === undefined || idx < 0 || idx >= headerCategories.length) {
        throw new Error(strings?.Invalid_index);
      }
      let itm = headerCategories[idx];

      if (!itm || !itm?.codeName) {
        throw new Error(strings?.Item_is_undefined_or_missing_codeName);
      }
      if (!data || !Array.isArray(data)) {
        throw new Error(strings?.Invalid_data_array);
      }
      let filterItems = data?.filter((item: any) => {
        return item?.fieldName === itm?.codeName;
      });
      if (filterItems?.length === 0) {
        console.warn(strings?.No_matching_items_found);
      }
      setSpecificCategory(filterItems);
      logger("label_changes_Card_Header_Text_Near_Edit_button", {
        specificCategory,
        CardHeader: filterItems?.map((item: any) => item?.stepName),
      });
      setToggleIdx(idx);
    } catch (error) {
      logger("Error in changeToggle:", error);
    }
  };

  const setScreen = async (type: any, categoryId: any) => {
    navigation?.navigate(navigationString?.MedicalHistoryRenders, {
      uiType: type,
      categoryId,
      globalCodeId: globalCodeId,
      prevData: [],
      item: itemData?.codeName,
    });
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <View style={styles?.container}>
        <StatusBarHeader
          headerName={itemData?.codeName}
          navigation={navigation}
        />

        {!isLoading ? (
          <ScrollView contentContainerStyle={stylesInternal?.container}>
            {![codeName?.Symptom_Tracking]?.includes(
              headerCategories[0]?.codeName
            ) && (
              <View style={styles.container2}>
                {headerCategories && headerCategories.length > 0 ? (
                  <FlatList
                    data={headerCategories}
                    horizontal
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={({ item, index }) => (
                      <MemoizedHeaderCategoryItem
                        item={item}
                        index={index}
                        onPress={() => changeToggle(index, subCategory)}
                        divider={{
                          backgroundColor:
                            index === toggleIdx
                              ? colors.royalOrange
                              : colors.lightSurfCrest4,
                        }}
                        text={{
                          color:
                            index === toggleIdx ? colors.SaltBox : colors.grey,
                        }}
                        touchableOpacity={{
                          width:
                            headerCategories?.length % 2 == 0
                              ? width / 2
                              : width / 2.8,
                        }}
                      />
                    )}
                  />
                ) : null}
              </View>
            )}
            {specificCategory?.map((itm: any, idx: any) => {
              return (
                <FlatList
                  data={itm?.allData}
                  keyExtractor={(item, index) => "key" + index}
                  renderItem={({ item, index }: any) => {
                    return (
                      <MemoizedEditBarMedicalHealth
                        item={item}
                        categoryDetails={itm}
                        navigation={navigation}
                        index={idx}
                        categoryIndex={index}
                        globalCodeIdCat={globalCodeId}
                        headerName={itemData?.codeName}
                      />
                    );
                  }}
                  ListFooterComponent={() =>
                    !hideAddMoreOption?.includes(itm?.stepName) && (
                      // logger("itm?.stepName______", itm?.stepName)
                      <MemoizedAddButton
                        containerStyle={stylesInternal?.subView}
                        tintColor={colors?.SaltBox}
                        txt={
                          cardHeaderNameAddOtherCTAButtonText(itm?.stepName)
                            ?.AddMoreCTA || strings?.Add_more
                        }
                        textStyle={{ color: colors?.SaltBox }}
                        onPress={() =>
                          setScreen(itm?.stepName, itm?.categoryId)
                        }
                      />
                    )
                  }
                />
              );
            })}
          </ScrollView>
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
    </ScreenWrapper>
  );
};

export default MedicalHistoryDetailsList;

const stylesInternal = StyleSheet.create({
  container: {
    paddingBottom: moderateScale(30),
    marginHorizontal: moderateScale(19),
  },
  subView: {
    borderColor: colors?.SaltBox,
    marginTop: moderateScale(15),
    alignItems: "center",
  },
});
