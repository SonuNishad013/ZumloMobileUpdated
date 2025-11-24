import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import { strings } from "../../../constant/strings";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CommonButton from "../../../components/Buttons/commonButton";
import { capitalizeFirstLetter } from "../../../validations/capitalizeFirstLetter";
import logger from "../../../constant/logger";
import allActions from "../../../redux/actions";
import { STATUS_CODES } from "../../../constant/appConstant";
import CommonLoader from "../../../components/Loader";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
interface FilterRecommendationProps {
  navigation?: any;
  route?: any;
}
const FilterRecommendation: React.FC<FilterRecommendationProps> = ({
  navigation,
  route,
}) => {
  const { categoryList } = route?.params || {};
  const [data, setData] = useState(categoryList);
  const [isLoading, setIsLoading] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const handleSelect = (index: number) => {
    const updatedData = data.map((item: any, i: any) =>
      i === index ? { ...item, isUserSelected: !item.isUserSelected } : item
    );
    setData(updatedData);
  };
  const getUserSelectedRecommendationCategories = async () => {
    setIsLoading(true);
    const selectedCategories: string[] = data.filter(
      (item: any) => item.isUserSelected
    );
    if (selectedCategories?.length === 0) {
      setIsLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: "Please select at least one category",
      });
      return;
    }
    try {
      let requestBody = {
        selectedCategories: selectedCategories.map((item: any) => item.title),
      };
      const response =
        await allActions?.RecommendationAction?.getUserSelectedRecommendationCategories(
          requestBody,
          "getUserSelectedRecommendationCategories"
        );
      if (response) {
        setIsLoading(false);
        if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
          logger("User selected categories updated successfully", response);
          navigation?.goBack();
        }
      }
    } catch (error) {
      logger("Error in getUserSelectedRecommendationCategories", error);
    }
  };
  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      <View style={styles.container}>
        <CommonHeader
          headerName={strings?.Filter}
          onBackPress={() => navigation?.goBack()}
          textStyle={styles.headerText}
          mainContainer={styles.buttonView}
        />
        <View style={styles.content}>
          <Text style={styles.titleText}>
            {"Select theme you want to view recommendations"}
          </Text>
          <FlatList
            numColumns={2}
            data={data}
            extraData={data}
            style={styles.flatList}
            columnWrapperStyle={styles.columnWrapper}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }: any) => {
              let isSelected = item?.isUserSelected;
              return (
                <>
                  {item.title !== "Other" ? (
                    <TouchableOpacity
                      onPress={() => handleSelect(index)}
                      style={[
                        styles.itemButton,
                        {
                          backgroundColor: isSelected
                            ? colors?.polishedPine
                            : colors?.transparent,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.itemText,
                          { fontWeight: isSelected ? "600" : "400" },
                        ]}
                      >
                        {capitalizeFirstLetter(item?.title)}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </>
              );
            }}
          />
          <CommonButton
            btnName="Apply"
            mainContainer={styles.applyButton}
            onPress={getUserSelectedRecommendationCategories}
          />
        </View>
      </View>
      {isLoading && <CommonLoader />}
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

export default FilterRecommendation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(19),
  },
  headerText: {
    color: colors?.SurfCrest,
  },
  buttonView: {},
  content: {
    marginTop: moderateScale(18),
    flex: 1,
  },
  titleText: {
    fontWeight: "500",
    fontSize: textScale(25),
    color: colors?.SurfCrest,
    marginBottom: moderateScale(15),
  },
  flatList: {
    flex: 1,
  },
  columnWrapper: {
    flexWrap: "wrap",
  },
  itemButton: {
    borderWidth: 1,
    borderRadius: moderateScale(25),
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    paddingHorizontal: moderateScale(15),
    minWidth: moderateScale(130),
    maxHeight: moderateScale(65),
    minHeight: moderateScale(45),
    borderColor: colors?.SurfCrest,
  },
  itemText: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
  },
  applyButton: {
    marginTop: moderateScale(19),
    width: "100%",
    bottom: moderateScale(30),
  },
});
