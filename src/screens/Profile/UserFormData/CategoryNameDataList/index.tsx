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
import { formatSentenceCase } from "../../../../helper/sentenceCase";
import logger from "../../../../constant/logger";
import { getHeaderSubHeaderText } from "../../ProfileSectionLabels/MainCardHeaderSubHeaderText";

interface Props {
  navigation?: any;
  route?: any;
}
const CategoryNameDataList: React.FC<Props> = ({ navigation, route }) => {
  const { categoryData } = route.params;
  const [categoryListData, setCategoryListData] = useState<any>([]);
  const [categoryId, setCategoryId] = useState<any>(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    getGlobalCode();
  }, [isFocused, categoryData]);

  const getAllGlobalCodesWithCategory_ = async () => {
    let data = await getAllGlobalCodesWithCategory(allActions, dispatch);
    logger("data___GLOBALCODEWITHCATEGORY66", data);
    AsyncStorageUtils?.storeItemKey(
      AsyncStorageUtils?.GLOBALCODEWITHCATEGORY,
      JSON?.stringify(data)
    );
    data && getGlobalCode();
  };

  const getGlobalCode = async () => {
    try {
      const getGlobalCodeData = await AsyncStorage?.getItem(
        AsyncStorage.GLOBALCODEWITHCATEGORY
      );
      if (getGlobalCodeData !== null) {
        let getOnboardingGlobalData: any = await filterCategoryData(
          JSON?.parse(getGlobalCodeData),
          categoryData?.categoryName
        );
        setCategoryId(getOnboardingGlobalData[0]);
        logger(
          "AllNameBoxText_____Profile_",
          getOnboardingGlobalData[0]?.globalCodeOptions?.map(
            (item: any) => item?.codeName
          )
        );
        setCategoryListData(getOnboardingGlobalData[0]?.globalCodeOptions);
      } else {
        getAllGlobalCodesWithCategory_();
      }
    } catch (error) {
      console.error("Error retrieving login user data:", error);
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <CommonHeader
        headerName={categoryData?.name}
        onBackPress={() => navigation?.goBack()}
        iconContainer={styles?.iconContainer}
        mainContainer={styles?.headerContainer}
      />

      <FlatList
        data={categoryListData}
        style={styles.flatList}
        keyExtractor={(item, index) => "key" + index}
        columnWrapperStyle={styles.columnWrapper}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={() => {
          return (
            <>
              <Text style={styles?.headerText}>
                {getHeaderSubHeaderText(categoryData?.name)?.header ||
                  "Your lifestyle snapshot"}
              </Text>
              <Text style={styles?.subHeaderText}>
                {/* {formatSentenceCase(categoryId?.categoryDescription)} */}
                {getHeaderSubHeaderText(categoryData?.name)?.subHeader ||
                  "Tap each area to share your habits and preferences—let's tailor your wellness journey together."}
              </Text>
            </>
          );
        }}
        renderItem={({ item, index }) => (
          <CommonButton
            onPress={() => {
              navigation?.navigate(navigationString?.CategoryListData, {
                itemData: item,
                categoryId: categoryId,
              });
            }}
            btnName={formatSentenceCase(item?.codeName)}
            btnNameStyle={{
              color: buttonTextColor[index % buttonTextColor?.length],
              marginHorizontal: moderateScale(10),
            }}
            mainContainer={{
              flex:
                categoryListData.length / 2 !== 0 ||
                index === categoryListData.length - 1
                  ? 0.5
                  : 1,
              backgroundColor: backgrounColor[index % backgrounColor?.length],
              marginRight:
                index % 2 === 0 ? moderateScale(10) : moderateScale(0),
              marginLeft:
                index % 2 === 0 ? moderateScale(0) : moderateScale(10),
              height: moderateScale(100),
              borderRadius: moderateScale(15),
              marginTop: moderateScale(15),
            }}
          />
        )}
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
    fontSize: textScale(24),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginTop: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  subHeaderText: {
    fontSize: textScale(14),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginTop: moderateScale(5),
    marginBottom: moderateScale(10),
  },
});

export default CategoryNameDataList;
