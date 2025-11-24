import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import StatusBarHeader from "../StatusBarHeader";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { strings } from "../../../../constant/strings";
import allActions from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../../components/Loader";
import Toast from "react-native-toast-message";
import EditView from "../Helpers/EditBar";
import { useIsFocused } from "@react-navigation/native";
import { formatSentenceCase } from "../../../../helper/sentenceCase";
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";
import logger from "../../../../constant/logger";

interface Props {
  navigation?: any;
  route?: any;
}
const UserPreferencesList: React.FC<Props> = ({ navigation, route }) => {
  const { itemData }: any = route?.params;
  const dispatch: any = useDispatch();
  const isFocused = useIsFocused();
  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [globalCodeId, setGlobalCodeId] = useState<any>(null);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    if (itemData == undefined) return;
    setGlobalCodeId(itemData?.globalCodeId);
    getUserPreferences(itemData?.globalCodeId);
  }, [itemData]);

  useEffect(() => {
    getUserPreferences(globalCodeId);
  }, [isFocused, globalCodeId]);

  const getUserPreferences = async (globalCodeId: any) => {
    setIsLoading(true);
    let id = await globalCodeId;
    if (id !== null) {
      let requestbody = {};
      allActions.seekerDetails
        .GetUserPreferences(
          dispatch,
          requestbody,
          "GetUserPreferences",
          globalCodeId
        )
        .then((response: any) => {
          if (response.statusCode == 200) {
            setIsLoading(false);
            logger("label_changes_Card_Header_Text_Near_Edit_button", {
              specificCategory: response.data,
              CardHeader: response.data?.map((item: any) => item?.stepName),
            });
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
      return;
    }
  };

  return (
    console.log("itemData?.codeName==", itemData?.codeName),
    (
      <ScreenWrapper statusBarColor={colors?.SaltBox}>
        <View style={styles?.container}>
          <StatusBarHeader
            headerName={formatSentenceCase(itemData?.codeName)}
            navigation={navigation}
          />
          {!isLoading ? (
            <FlatList
              data={subCategory}
              contentContainerStyle={styles?.contentContainerStyle}
              style={styles?.flatStyle}
              keyExtractor={(item, index) => "key" + index}
              renderItem={({ item, index }) => (
                <EditView
                  item={item}
                  navigation={navigation}
                  index={index}
                  globalCodeIdCat={globalCodeId}
                  headerName={itemData?.codeName}
                />
              )}
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
    )
  );
};

export default UserPreferencesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.SurfCrest,
  },
  containerBox: {
    width: "auto",
    backgroundColor: colors?.polishedPine,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(20),
    borderRadius: moderateScale(10),
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: moderateScale(10),
  },
  titleStyle: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "600",
    marginRight: moderateScale(10),
  },
  contentContainerStyle: {
    paddingBottom: moderateScale(50),
  },
  flatStyle: {
    marginHorizontal: moderateScale(19),
    paddingTop: moderateScale(20),
  },
});
