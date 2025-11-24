import { FlatList, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import * as AsyncStorage from "../../../../utils/Storage/AsyncStorage";
import {
  filterCategoryData,
  getAllGlobalCodesWithCategory,
} from "../../../../helper/getGlobalCodes";
import { useIsFocused } from "@react-navigation/native";
import * as AsyncStorageUtils from "../../../../utils/Storage/AsyncStorage";
import allActions from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonButton from "../../../../components/Buttons/commonButton";
import {
  backgrounColor,
  buttonTextColor,
} from "../../../../constant/ProfileConstant";
import navigationString from "../../../../navigation/navigationString";
import CommonHeader from "../../../../components/Header/commonHeader";
import AlertModal from "../../../../components/Alerts/AlertModal";
import { AlertCircle } from "../../../../assets";
import {
  alertTypes,
  switchCaseType,
} from "../../../../constant/AllGlobalNameConstant";
import DeviceInfo from "react-native-device-info";
import logger from "../../../../constant/logger";
import { capitalizeFirstLetter } from "../../../../validations/capitalizeFirstLetter";

interface Props {
  navigation?: any;
  route?: any;
}
const SettingsCategoryNameList: React.FC<Props> = ({ navigation, route }) => {
  const { categoryData, userLoginType, userData } = route.params;
  const [categoryListData, setCategoryListData] = useState<any>([]);
  const [categoryId, setCategoryId] = useState<any>(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  console.log(
    "first-090--===--0-=0-=>",
    userLoginType,
    userData,
    "categoryData->",
    categoryData
  );
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [modalData, setModalData] = useState({
    type: "",
    confirmButtonPress: () => {},
    cancelButtonPress: () => {},
    AlertIcon: AlertCircle,
    isAlertIcon: false,
  });

  const handleConfirm = () => {
    setAlertVisible(false);
  };
  const handleCancel = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    getGlobalCode();
  }, [isFocused, categoryData]);

  const getAllGlobalCodesWithCategory_ = async () => {
    let data = await getAllGlobalCodesWithCategory(allActions, dispatch);
    logger("data___GLOBALCODEWITHCATEGORY5", data);
    AsyncStorageUtils.storeItemKey(
      AsyncStorageUtils.GLOBALCODEWITHCATEGORY,
      JSON.stringify(data)
    );
    data && getGlobalCode();
  };

  const getGlobalCode = async () => {
    try {
      const getGlobalCodeData = await AsyncStorage.getItem(
        AsyncStorage.GLOBALCODEWITHCATEGORY
      );
      if (getGlobalCodeData !== null) {
        let getOnboardingGlobalData: any = await filterCategoryData(
          JSON.parse(getGlobalCodeData),
          categoryData?.categoryName
        );
        setCategoryId(getOnboardingGlobalData[0]);
        setCategoryListData(getOnboardingGlobalData[0]?.globalCodeOptions);
      } else {
        getAllGlobalCodesWithCategory_();
      }
    } catch (error) {
      console.error("Error retrieving login user data:", error);
    }
  };
  const SignOut = async () => {
    try {
      let DeviceID = await DeviceInfo.getUniqueId();
      let requestbody = { DeviceID };
      allActions.Auth.SignOut(dispatch, requestbody, "SignOut")
        .then((response) => {
          if (response.statusCode === 200) {
            console.log(
              "  let DeviceID = await DeviceInfo.getUniqueId();",
              response,
              DeviceID
            );
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };
  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <CommonHeader
        headerName={categoryData?.name}
        onBackPress={() => navigation?.goBack()}
        iconContainer={styles.iconContainer}
        mainContainer={styles.headerContainer}
      />
      <FlatList
        data={categoryListData}
        style={styles.flatList}
        columnWrapperStyle={styles.columnWrapper}
        numColumns={2}
        keyExtractor={(item, index) => "key" + index}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={() => (
          <Text style={styles.headerText}>
            {categoryId?.categoryDescription}
          </Text>
        )}
        renderItem={({ item, index }) => (
          <CommonButton
            onPress={() => {
              switch (item?.codeName) {
                case switchCaseType?.logout:
                  setAlertVisible(true);
                  setModalData({
                    ...modalData,
                    type: switchCaseType?.logout,
                    confirmButtonPress: () => {
                      SignOut();
                      handleConfirm();
                    },
                    cancelButtonPress: () => {
                      handleCancel();
                    },
                  });
                  break;
                case alertTypes?.deleteAccount:
                  setAlertVisible(true);
                  setModalData({
                    ...modalData,
                    type: alertTypes?.deleteAccount,
                    confirmButtonPress: () => {
                      handleConfirm();
                      navigation?.navigate(navigationString?.DeleteAccount, {
                        userLoginType,
                        userData,
                      });
                    },
                    cancelButtonPress: () => {
                      handleCancel();
                    },
                  });
                  break;
                case alertTypes?.productGuide:
                  navigation?.navigate(navigationString?.ProductGuideMain);
                  break;
                default:
                  navigation?.navigate(navigationString?.SettingsQuestionData, {
                    itemData: item,
                    categoryData: categoryId,
                  });
                  break;
              }
            }}
            btnName={capitalizeFirstLetter(item?.codeName)}
            btnNameStyle={{
              color: buttonTextColor[index % buttonTextColor?.length],
              marginHorizontal: moderateScale(8),
            }}
            mainContainer={{
              height: moderateScale(100),
              borderRadius: moderateScale(15),
              marginTop: moderateScale(15),
              flex:
                categoryListData.length / 2 !== 0 ||
                index === categoryListData?.length - 1
                  ? 0.5
                  : 1,
              backgroundColor: backgrounColor[index % backgrounColor?.length],
              marginRight:
                index % 2 === 0 ? moderateScale(10) : moderateScale(0),
              marginLeft:
                index % 2 === 0 ? moderateScale(0) : moderateScale(10),
            }}
          />
        )}
      />
      <AlertModal
        isVisible={isAlertVisible}
        type={modalData?.type}
        isAlertIcon={modalData?.isAlertIcon}
        AlertIcon={modalData?.AlertIcon}
        hideAlert={() => setAlertVisible(false)}
        onConfirm={modalData?.confirmButtonPress}
        onCancel={handleCancel}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: colors?.backIconBg,
  },
  headerContainer: {
    paddingBottom: moderateScale(15),
    paddingTop: moderateScale(15),
    paddingHorizontal: moderateScale(19),
  },
  flatList: {
    marginHorizontal: moderateScale(19),
    flex: 1,
    gap: moderateScale(15),
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  contentContainer: {
    paddingBottom: moderateScale(30),
  },
  headerText: {
    fontSize: textScale(14),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginTop: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  buttonContainer: {
    height: moderateScale(100),
    borderRadius: moderateScale(15),
    marginTop: moderateScale(15),
  },
});

export default SettingsCategoryNameList;
