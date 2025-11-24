import { Alert, ImageBackground, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import Header from "./Header";
import { styles } from "./styles";
import { imagePath } from "../../../assets/png/imagePath";
import FloatingAddMutton from "./FloatingAddMutton";
import { StringsHabitTracking } from "./StringsHabitTracking";
import { moderateScale } from "../../../constant/responsiveStyle";
import moment from "moment";
import navigationString from "../../../navigation/navigationString";
import {
  Enum_HabitItemIsFrom,
  HabitListOpenFrom_ENUM,
} from "../../../constant/ENUM";
import logger from "../../../constant/logger";
import HabitItem from "../../Dashboard/Planner/HabitItem";
import { DATE_FORMAT } from "../../../constant/DateFormats";
import CommonLoader from "../../../components/Loader";
import allActions from "../../../redux/actions";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../../constant/appConstant";
import { useFocusEffect } from "@react-navigation/native";
interface HabitTrackingProps {
  navigation?: any;
  route?: any;
}
interface CategoryType {
  name?: string;
  isCustom?: boolean;
}
const HabitTracking: React.FC<HabitTrackingProps> = ({ navigation, route }) => {
  const [isLoader, setIsLoader] = useState(true);
  const [habitListData, setHabitListData] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  logger("isLoaderisLoader___", { isLoader, habitListData });

  useFocusEffect(
    useCallback(() => {
      getHabitCategories();
    }, [])
  );

  const getHabitCategories = async () => {
    try {
      const response = await allActions?.HabitAction?.getHabitCategoriesAPI(
        "dispatch",
        API_FUN_NAMES?.getHabitCategories,
        ""
      );
      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        setCategory(response?.data);
      } else {
        setCategory([]);
      }
    } catch (error) {
      setCategory([]);
    }
  };
  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      <ImageBackground
        source={imagePath?.DynamicPromptbga}
        style={styles?.mainContianer}
      >
        <Header
          title={StringsHabitTracking?.My_habit}
          navigation={navigation}
          calenderIcon={false}
          caledarPress={() => Alert.alert("Calendar Press")} //Calender press
        />
        <View
          style={{
            marginTop: moderateScale(20),
            flex: 1,
          }}
        >
          <HabitItem
            navigation={navigation}
            comeFrom={HabitListOpenFrom_ENUM?.ACTIVITY_LIST}
            date={moment().format(DATE_FORMAT?.habitDateFormat)}
            setIsLoader={(val: boolean) => setIsLoader(val)}
            setHabitListData={(val: any) => setHabitListData(val)}
            isFrom={Enum_HabitItemIsFrom?.MYHABIT}
          />

          {isLoader && <CommonLoader />}
        </View>

        <FloatingAddMutton
          onPress={() => {
            category?.length &&
              navigation?.navigate(navigationString?.AddHabitForm, {
                categoryList: category
                  .map((item: CategoryType) => {
                    return { ...item, title: item?.name, value: item?.name };
                  })
                  .concat([{ title: "Other", value: "Other" }]), //Dropdown list need title key and from API response we are not getting that key, So here we are appending the data and addining a new key other as well.
              });
          }}
        />
      </ImageBackground>
    </ScreenWrapper>
  );
};

export default HabitTracking;
