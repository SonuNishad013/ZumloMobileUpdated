import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";
import * as AsyncStorage from "../../../utils/Storage/AsyncStorage";
import {
  filterCategoryData,
  getAllGlobalCodesWithCategory,
} from "../../../helper/getGlobalCodes";
import { categoryName } from "../../../constant/AllGlobalNameConstant";
import { useIsFocused } from "@react-navigation/native";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonButton from "../../../components/Buttons/commonButton";
import {
  backgrounColor,
  buttonTextColor,
} from "../../../constant/ProfileConstant";
import navigationString from "../../../navigation/navigationString";
import HeaderHealthInfo from "./Helpers/HeaderHealthInfo";
import { strings } from "../../../constant/strings";
import { styles } from "./styles";
import { formatSentenceCase } from "../../../helper/sentenceCase";
import logger from "../../../constant/logger";

interface Props {
  navigation?: any;
}
const MedicalHistory: React.FC<Props> = ({ navigation }) => {
  const [healthInfomation, setHealthInfomation] = useState<any>([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    getGlobalCode();
  }, [isFocused]);

  const getAllGlobalCodesWithCategory_ = async () => {
    let data = await getAllGlobalCodesWithCategory(allActions, dispatch);
    logger("data___GLOBALCODEWITHCATEGORY3", data);
    AsyncStorage.storeItemKey(
      AsyncStorage.GLOBALCODEWITHCATEGORY,
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
        let getOnboardingGlobalData = await filterCategoryData(
          JSON.parse(getGlobalCodeData),
          categoryName?.HealthInformation
        );
        setHealthInfomation(getOnboardingGlobalData[0]?.globalCodeOptions);
      } else {
        getAllGlobalCodesWithCategory_();
      }
    } catch (error) {
      logger(strings?.Error_retrieving_login_user_data, error);
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <HeaderHealthInfo
        navigation={navigation}
        headerName={formatSentenceCase(strings?.healthInformation)}
      />
      <FlatList
        data={healthInfomation}
        keyExtractor={(item, index) => "key" + index}
        style={styles.flatListStyle}
        columnWrapperStyle={styles.columnWrapperStyle}
        numColumns={2}
        renderItem={({ item, index }) => (
          <CommonButton
            onPress={() => {
              navigation?.navigate(
                navigationString?.MedicalHistoryDetailsList,
                {
                  itemData: item,
                }
              );
            }}
            btnName={formatSentenceCase(item?.codeName)}
            btnNameStyle={{
              color: buttonTextColor[index % buttonTextColor?.length],
              marginHorizontal: moderateScale(10),
            }}
            mainContainer={{
              backgroundColor: backgrounColor[index % backgrounColor?.length],
              marginRight:
                index % 2 == 0 ? moderateScale(10) : moderateScale(0),
              marginLeft: index % 2 == 0 ? moderateScale(0) : moderateScale(10),
              marginTop: moderateScale(20),
              flex:
                healthInfomation.length / 2 != 0 ||
                index == healthInfomation.length - 1
                  ? 0.5
                  : 1,
              height: moderateScale(100),
              borderRadius: moderateScale(15),
            }}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default MedicalHistory;
