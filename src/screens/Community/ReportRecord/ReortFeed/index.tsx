import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import StatusBarHeader from "../../../Profile/Preferences/StatusBarHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";
import allActions from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonSheetDroppDown from "../../../../components/CommonDropDown/CommonSheetDroppDown";
import { strings } from "../../../../constant/strings";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import CommonInput from "../../../../components/Inputs/commonInput";
import { categoryName } from "../../../../constant/CommunityConstant";
import CommonButton from "../../../../components/Buttons/commonButton";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../../constant/appConstant";

interface Props {
  navigation?: any;
  route?: any;
}
const ReportFeed: React.FC<Props> = ({ navigation, route }) => {
  const { feedId } = route.params;
  const [filledWords, setFilledWords] = useState(0);
  const desMaxLen = 500;
  const dispatch: any = useDispatch();
  const [isAllLoading, setIsAllLoading] = useState(false);
  const [categoryData, setCategoryData] = useState<any>([]);
  const [category, setCategory] = useState<any>({
    value: null,
    isError: false,
    errorMsg: "",
  });
  const [description, setDescription] = useState<any>({
    value: "",
    isError: false,
    errorMsg: "",
  });
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const toasterFunction = (code: any, message: any) => {
    setToasterDetails({
      showToast: true,
      code: code,
      message: message,
    });
  };
  useEffect(() => {
    fetchHealthConditionsData();
  }, []);

  const feedReport = async () => {
    setIsAllLoading(true);
    let requestbody = {
      feedId: feedId,
      description: description?.value,
      reason: category?.value,
    };
    try {
      const response = await allActions.communitiesAction.feedReport(
        dispatch,
        requestbody,
        API_FUN_NAMES?.feedReport
      );
      setIsAllLoading(false);
      toasterFunction(
        response?.statusCode === STATUS_CODES?.RESPONSE_OK
          ? TOAST_STATUS?.SUCCESS
          : TOAST_STATUS?.ERROR,
        response?.message
      );
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (err: any) {
      setIsAllLoading(false);
      toasterFunction(TOAST_STATUS?.ERROR, err?.message);
    }
  };

  const addValueKey = (data: any) =>
    data?.map((itm: any, idx: any) => ({
      ...itm,
      title: itm?.codeName,
      itmIndex: idx,
    }));

  const fetchHealthConditionsData = () => {
    allActions.GlobalCodesCategoryAction.GetGlobalCodesByCategoryName(
      dispatch,
      { categoryName: categoryName.reportFeedReasons },
      API_FUN_NAMES?.GetGlobalCodesByCategoryName,
      categoryName.reportFeedReasons
    )
      .then((response) => {
        if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
          setCategoryData(addValueKey(response?.data));
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err) => toasterFunction(TOAST_STATUS?.ERROR, err?.message));
  };

  const dataInput = (val: any) => {
    setDescription({
      ...description,
      value: val,
      isError: val.length > desMaxLen,
      errorMsg: val.length > desMaxLen ? strings?.Max_words : "",
    });
    setFilledWords(val?.length);
  };

  const validationReportFeed = () => {
    let isValid = true;
    if (!category?.value) {
      isValid = false;
      setCategory({
        ...category,
        isError: true,
        errorMsg: strings?.reasonRequired,
      });
    } else {
      setCategory({ ...category, isError: false, errorMsg: "" });
    }
    if (isValid) {
      feedReport();
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <View style={styles.container}>
        <StatusBarHeader
          headerName={strings?.Report_feed}
          navigation={navigation}
        />
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <CommonSheetDroppDown
            errMsg={""}
            placeholder={strings?.reason}
            value={""}
            dropDownListData={categoryData}
            containerStyle={styles.dropDownContainer}
            mainContainerStyle={styles.dropDownMainContainer}
            selectedTextStyle={styles.selectedText}
            selectedItemData={(selectedItem: any) => {
              setCategory({
                ...category,
                value: categoryData[selectedItem?.itmIndex]?.title,
                isError: false,
                errorMsg: "",
              });
            }}
            iconColor={colors?.prussianBlue}
            placeholderStyle={styles.placeholderStyle}
          />
          {category?.isError && (
            <Text style={styles.errorText}>{category?.errorMsg}</Text>
          )}
          <CommonInput
            placeholderTextColor={colors?.prussianBlue}
            placeholder={strings?.addDescription}
            textAlignVertical={strings?.top_}
            wordCount={true}
            multiline={true}
            writeWords={filledWords}
            maxWords={desMaxLen}
            selectionColor={colors?.prussianBlue}
            writeWordsStyle={styles.writeWordsStyle}
            isWidth={false}
            maxLength={500}
            mainContainer={styles.inputContainerBig}
            inputText={styles.inputText}
            value={description?.value}
            onChangeText={dataInput}
            errorMsg={description?.errorMsg}
            isError={description?.isError}
            backGroundColor={colors?.prussianBlue}
            borderColor={colors?.royalOrangeDark}
          />
        </KeyboardAwareScrollView>
        <CommonButton
          onPress={validationReportFeed}
          isLoading={isAllLoading}
          btnName={strings?.submit}
          mainContainer={styles.buttonContainer}
        />
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

export default ReportFeed;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.SurfCrest,
    flex: 1,
  },
  scrollContainer: {
    marginHorizontal: moderateScale(19),
  },
  dropDownContainer: {
    backgroundColor: colors.polishedPine,
  },
  dropDownMainContainer: {
    height: moderateScale(56),
    backgroundColor: colors?.pb25,
    borderColor: colors?.polishedPine,
    marginTop: moderateScale(15),
  },
  selectedText: {
    color: colors?.prussianBlue,
  },
  placeholderStyle: {
    color: colors?.prussianBlue,
  },
  errorText: {
    color: colors?.royalOrange,
    marginHorizontal: moderateScale(8),
    fontSize: textScale(14),
    fontWeight: "400",
  },
  writeWordsStyle: {
    color: colors?.prussianBlue,
  },
  inputContainerBig: {
    backgroundColor: colors?.pb25,
    borderColor: colors?.polishedPine,
    marginTop: moderateScale(15),
    height: moderateScale(153),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(30),
  },
  inputText: {
    color: colors?.prussianBlue,
  },
  buttonContainer: {
    width: "auto",
    marginHorizontal: moderateScale(19),
    marginBottom: moderateScale(30),
  },
});
