import { FlatList, View, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import allActions from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../../components/Loader";
import { useIsFocused } from "@react-navigation/native";
import FormEditBar from "../ExtraComponet/FormEditBar";
import CommonHeader from "../../../../components/Header/commonHeader";
import { moderateScale } from "../../../../constant/responsiveStyle";
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";
import { NavLabelWithCardLabels } from "../../ProfileSectionLabels/NavLabelWithCardLabels";
import logger from "../../../../constant/logger";
import { textLabelSize } from "../../../../utils/TextConfig";
import { getHeaderSubHeaderText } from "../../ProfileSectionLabels/MainCardHeaderSubHeaderText";
import { CardsName } from "../../../../constant/AllGlobalNameConstant";

interface Props {
  navigation?: any;
  route?: any;
}

const CategoryListData: React.FC<Props> = ({ navigation, route }) => {
  const { itemData, categoryId }: any = route?.params;
  const dispatch: any = useDispatch();
  const isFocused = useIsFocused();
  const [subCategory, setSubCategory] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [globalCodesData, setGlobalCodesData] = useState<any>({});
  const [categoryCode, setCategoryCode] = useState<any>(null);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    if (itemData == undefined && categoryId == undefined) return;
    setGlobalCodesData(itemData);
    setCategoryCode(categoryId?.categoryId);
  }, [itemData, categoryId]);

  useEffect(() => {
    GetUserStepAndOptionsWithAnswers(globalCodesData, categoryCode);
  }, [isFocused, globalCodesData, categoryCode]);

  const GetUserStepAndOptionsWithAnswers = (
    globalCodes: any,
    categoryCode: number
  ) => {
    setIsLoading(true);
    if (globalCodes && categoryCode) {
      let requestbody = {
        codeId: globalCodesData?.globalCodeId,
        categoryId: categoryCode,
      };
      allActions.seekerDetails
        .GetUserStepAndOptionsWithAnswers(
          dispatch,
          requestbody,
          "GetUserStepAndOptionsWithAnswers"
        )
        .then((response: any) => {
          if (response?.statusCode == 200) {
            setIsLoading(false);
            setSubCategory(response.data);
          } else {
            setIsLoading(false);
            setToasterDetails({
              showToast: true,
              code: 0,
              message: response.message,
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err.message,
          });
        });
    } else {
      setIsLoading(true);
      return;
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <CommonHeader
            onBackPress={() => {
              navigation.goBack();
            }}
            headerName={
              NavLabelWithCardLabels(itemData.codeName)?.navLabel ||
              itemData.codeName
            }
            iconContainer={styles.iconContainer}
            textStyle={styles.headerTextStyle}
            mainContainer={styles.headerMainContainer}
          />
        </View>
        {!isLoading ? (
          <FlatList
            data={subCategory}
            keyExtractor={(item, index) => "key" + index}
            contentContainerStyle={styles?.flatListContentContainer}
            style={styles.flatList}
            renderItem={({ item, index }) => {
              logger("item_Detail_____", {
                arrayOfCardsName: subCategory?.map(
                  (item: any) => item?.codeName
                ),
                naVtext: itemData.codeName,
                itemData,
              });
              return (
                <FormEditBar
                  item={item}
                  navigation={navigation}
                  index={index}
                  codeId={globalCodesData?.globalCodeId}
                  categoryId={categoryCode}
                  headerName={itemData?.codeName}
                  editLabel={
                    NavLabelWithCardLabels(itemData?.codeName, item?.codeName)
                      ?.editLabel
                  }
                  editSubtext={
                    NavLabelWithCardLabels(itemData?.codeName, item?.codeName)
                      ?.editSubtext
                  }
                />
              );
            }}
            ListHeaderComponent={() => {
              return (
                <View>
                  {CardsName.includes(itemData.codeName) ? (
                    <>
                      {getHeaderSubHeaderText(itemData.codeName)?.header ? (
                        <Text
                          style={{
                            fontSize: textLabelSize?.mainTitle, //18
                            color: colors?.prussianBlue,
                            fontWeight: "600",
                            marginBottom: moderateScale(10),
                          }}
                        >
                          {getHeaderSubHeaderText(itemData.codeName)?.header}
                        </Text>
                      ) : null}
                      {getHeaderSubHeaderText(itemData.codeName)?.subHeader ? (
                        <Text
                          style={{
                            fontSize: textLabelSize?.subHeaderTextSize, //14
                            color: colors?.prussianBlue,
                            fontWeight: "500",
                            marginBottom: moderateScale(10),
                          }}
                        >
                          {getHeaderSubHeaderText(itemData.codeName)?.subHeader}
                        </Text>
                      ) : null}
                    </>
                  ) : null}
                </View>
              );
            }}
          />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.SurfCrest,
  },
  headerContainer: {
    backgroundColor: colors?.SaltBox,
    height: moderateScale(70),
    paddingTop: moderateScale(15),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    paddingHorizontal: moderateScale(19),
  },
  iconContainer: {
    backgroundColor: colors?.backIconBg,
  },
  headerTextStyle: {
    color: colors?.SurfCrest,
  },
  headerMainContainer: {
    marginHorizontal: moderateScale(0),
  },
  flatList: {
    marginHorizontal: moderateScale(19),
    paddingTop: moderateScale(20),
  },
  flatListContentContainer: {
    paddingBottom: moderateScale(50),
  },
});

export default CategoryListData;
