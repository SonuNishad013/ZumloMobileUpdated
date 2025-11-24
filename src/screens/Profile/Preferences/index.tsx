import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../../constant/responsiveStyle";
import HeaderPreferences from "./Helpers/HeaderPreferences";
import navigationString from "../../../navigation/navigationString";
import { imagePath } from "../../../assets/png/imagePath";
import CategoryCard from "./Helpers/CategoryCard";
import { strings } from "../../../constant/strings";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import {
  filterCategoryData,
  getAllGlobalCodesWithCategory,
} from "../../../helper/getGlobalCodes";
import { categoryName } from "../../../constant/AllGlobalNameConstant";
import { useIsFocused } from "@react-navigation/native";

import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { formatSentenceCase } from "../../../helper/sentenceCase";
import logger from "../../../constant/logger";

interface Props {
  navigation?: any;
}
const Preferences: React.FC<Props> = ({ navigation }) => {
  const [preferences, setPreferences] = useState<any>([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    getGlobalCode();
  }, [isFocused]);

  const getAllGlobalCodesWithCategory_ = async () => {
    let data = await getAllGlobalCodesWithCategory(allActions, dispatch);
    logger("data___GLOBALCODEWITHCATEGORY", data);
    AsyncStorageUtils.storeItemKey(
      AsyncStorageUtils.GLOBALCODEWITHCATEGORY,
      JSON.stringify(data)
    );
    data && getGlobalCode();
  };
  const getGlobalCode = async () => {
    try {
      const getGlobalCodeData = await AsyncStorageUtils.getItem(
        AsyncStorageUtils.GLOBALCODEWITHCATEGORY
      );
      if (getGlobalCodeData !== null) {
        let getOnboardingGlobalData = await filterCategoryData(
          JSON.parse(getGlobalCodeData),
          categoryName?.preferences_Category
        );
        setPreferences(getOnboardingGlobalData[0]?.globalCodeOptions);
      } else {
        getAllGlobalCodesWithCategory_();
      }
    } catch (error) {
      console.error("Error retrieving login user data:", error);
    }
  };
  const renderListHeaderText = () => {
    return (
      <View>
        <Text style={styles?.headerText}>
          {"Let’s personalize your experience"}
        </Text>
        <Text style={styles?.subHeaderText}>
          {
            "Pick the areas you care most about—this helps tailor the support you see. "
          }
        </Text>
      </View>
    );
  };
  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <HeaderPreferences
        navigation={navigation}
        headerName={strings?.preferences}
      />
      <FlatList
        data={preferences}
        keyExtractor={(item, index) => "key" + index}
        style={styles?.flatListStyle}
        ListHeaderComponent={() => renderListHeaderText()}
        renderItem={({ item, index }) => (
          <CategoryCard
            onPress={() => {
              navigation?.navigate(navigationString?.UserPreferencesList, {
                itemData: item,
              });
            }}
            source={
              index % 2 == 0
                ? imagePath?.Health_WellnessBg
                : imagePath?.Technology_AccessibilityBg
            }
            title={formatSentenceCase(item?.codeName)}
            titleText={{
              color: index % 2 == 0 ? colors?.prussianBlue : colors?.SurfCrest,
            }}
            button={{
              backgroundColor:
                index % 2 == 0 ? colors?.SurfCrest : colors?.SaltBox,
            }}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default Preferences;

const styles = StyleSheet.create({
  headerText: {
    fontSize: textScale(24),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginBottom: moderateScaleVertical(19),
  },
  subHeaderText: {
    fontSize: textScale(16),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginBottom: moderateScaleVertical(19),
  },
  flatListStyle: {
    marginHorizontal: moderateScale(19),
  },
});
