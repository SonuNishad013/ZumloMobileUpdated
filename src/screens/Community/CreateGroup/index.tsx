import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CommonButton from "../../../components/Buttons/commonButton";
import navigationString from "../../../navigation/navigationString";
import { strings } from "../../../constant/strings";
import { styles } from "./styles";
import { isEveryWordNumeric } from "../../../validations/validation";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedGroupMembers } from "../../../redux/selector";
import allActions from "../../../redux/actions";
import {
  categoryName,
  fromNav,
  responeKey,
} from "../../../constant/CommunityConstant";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import GroupCreateDetails from "./GroupCreateDetails";
import { lookup } from "react-native-mime-types";
import { replaceSlashWithDot } from "../../../helper/CommunityHelper";
import CommonLoader from "../../../components/Loader";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import logger from "../../../constant/logger";
interface Props {
  navigation?: any;
  route?: any;
}
const CreateGroup: React.FC<Props> = ({ navigation, route }) => {
  const dispatch: any = useDispatch();
  const { groupData } = route.params;
  const [isLoader, setisLoader] = useState(false);
  const isObjectEmpty = !groupData || Object.keys(groupData).length === 0;
  useEffect(() => {
    fetchHealthConditionsData();
  }, []);
  const [groupPrivacyOptions, setGroupPrivacyOptions] = useState<any>([]);
  const [categoryData, setCategoryData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedMembers = useSelector(getSelectedGroupMembers());
  const [hideCategoryBox, setHideCategoryBox] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const [imageUri, setImageUri] = useState<any>({
    value: groupData?.profilePicture || "",
    isError: false,
    errorMsg: "",
  });
  const [group, setGroup] = useState<any>({
    value: groupData?.name || "",
    isError: false,
    errorMsg: "",
  });
  const [category, setCategory] = useState<any>({
    value: null,
    isError: false,
    errorMsg: "",
  });
  const [description, setDescription] = useState<any>({
    value: groupData?.description || "",
    isError: false,
    errorMsg: "",
  });
  const [rules, setRules] = useState<any>({
    value: groupData?.rules || "",
    isError: false,
    errorMsg: "",
  });
  const [privacy, setPrivacy] = useState<any>({
    value: groupData?.groupPrivacy || "",
    isError: false,
    errorMsg: "",
  });
  const [inputCategoryText, setInputCategoryText] = useState<any>({
    value: "",
    isError: false,
    errorMsg: "",
  });
  const [addedCategoryId, setAddedCategoryId] = useState<any>({
    value: "",
    isError: false,
    errorMsg: "",
  });

  const toasterFunction = (code: any, message: any) => {
    setToasterDetails({
      showToast: true,
      code: code,
      message: message,
    });
  };
  const addValueKey = (data: any) => {
    const keyAdd = data?.map((itm: any, idx: any) => {
      return { ...itm, title: itm?.codeName, itmIndex: idx };
    });
    return keyAdd;
  };
  const fetchHealthConditionsData = () => {
    const requestBody = {
      categoryName: categoryName.CommunityGroupCategory, //healthConditions
    };
    allActions.GlobalCodesCategoryAction.GetGlobalCodesByCategoryName(
      dispatch,
      requestBody,
      API_FUN_NAMES?.GetGlobalCodesByCategoryName,
      categoryName.CommunityGroupCategory
    )
      .then((response) => {
        if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
          setCategoryData(addValueKey(response?.data));
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err) => {
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };
  const onSubmit = () => {
    let isValid = true;
    if (imageUri?.value === "") {
      isValid = false;
      setImageUri({
        ...imageUri,
        isError: true,
        errorMsg: strings?.imageRequired,
      });
    } else {
      setImageUri({
        ...imageUri,
        isError: false,
        errorMsg: "",
      });
    }
    if (group?.value.trim() === "") {
      isValid = false;
      setGroup({
        ...group,
        isError: true,
        errorMsg: "Name your group so others can find it",
      });
    } else if (isEveryWordNumeric(group?.value)) {
      isValid = false;
      setGroup({
        ...group,
        isError: true,
        errorMsg: strings?.groupNotNumeric,
      });
    } else {
      setGroup({ ...group, isError: false, errorMsg: "" });
    }
    if (!category?.value && isObjectEmpty) {
      isValid = false;
      setCategory({
        ...category,
        isError: true,
        errorMsg: "Pick a category that best fits",
      });
    } else {
      setCategory({ ...category, isError: false, errorMsg: "" });
    }

    if (category?.value === 552 && inputCategoryText?.value === "") {
      isValid = false;
      setInputCategoryText({
        ...inputCategoryText,
        isError: true,
        errorMsg: "Pick a category that best fits",
      });
    } else {
      setInputCategoryText({ ...category, isError: false, errorMsg: "" });
    }

    if (description?.value?.trim() === "") {
      isValid = false;
      setDescription({
        ...description,
        isError: true,
        errorMsg: "A short intro helps others understand",
        // errorMsg: strings?.descriptionRequired,
      });
    } else {
      setDescription({ ...description, isError: false, errorMsg: "" });
    }

    if (!groupPrivacyOptions?.some((item: any) => item?.isSelected)) {
      isValid = false;
      setPrivacy({
        ...privacy,
        isError: true,
        errorMsg: strings?.privacyRequired,
      });
    } else {
      setPrivacy({ ...privacy, isError: false, errorMsg: "" });
    }
    if (isValid) {
      setisLoader(true);
      isObjectEmpty ? createGroup() : updateGroup();
    }
  };

  const getMembersList = () => {
    let allMembers: any = selectedMembers?.map((itm: any) => itm?.id);
    let queryString = allMembers
      ?.map((id: any) => `&MemberIds=${id}`)
      ?.join("");
    return queryString;
  };

  const createGroup = () => {
    if (isLoading) return;

    let requestbody: any = new FormData();
    requestbody?.append(responeKey?.profilePicture, {
      uri: imageUri?.value,
      type: lookup(imageUri?.value),
      name: replaceSlashWithDot(lookup(imageUri?.value), 1),
    });
    let queryParams: any = `${responeKey?.name}${group?.value}${
      responeKey?.Description
    }${description?.value}${responeKey?.fileTypeGroupPrivacy}${
      groupPrivacyOptions?.find((item: any) => item?.isSelected)?.code
    }
  ${responeKey?.groupRules}${rules?.value}
    ${responeKey?.healthCategory}${addedCategoryId?.value || category?.value}${
      selectedMembers?.length > 0 ? getMembersList() : ""
    }`;

    allActions.communitiesAction
      .createGroup(
        dispatch,
        requestbody,
        API_FUN_NAMES?.createGroup,
        queryParams
      )
      .then((response: any) => {
        setisLoader(false);
        if ([STATUS_CODES?.RESPONSE_OK]?.includes(response?.statusCode)) {
          setIsLoading(false);
          allActions?.communitiesAction?.groupSelectedMembers(dispatch, []);
          toasterFunction(1, response?.message);
          navigation.navigate(navigationString?.CommunityGroupDetails, {
            from: fromNav?.create_Group,
            groupId: response?.data,
          });
        } else {
          setIsLoading(false);
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err: any) => {
        setIsLoading(false);
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };
  const updateGroup = () => {
    let requestbody: any = new FormData();
    requestbody?.append(responeKey?.profilePicture, {
      uri: imageUri?.value,
      type: lookup(imageUri?.value),
      name: replaceSlashWithDot(lookup(imageUri?.value), 2),
    });
    let queryParams: any = `${responeKey?.id}${groupData?.id}${
      responeKey?.nameUpdate
    }${group?.value}${responeKey?.Description}${description?.value}${
      responeKey?.fileTypeGroupPrivacy
    }${groupPrivacyOptions?.find((item: any) => item?.isSelected)?.code}
  ${responeKey?.groupRules}${rules?.value}
    ${responeKey?.healthCategory}${category?.value}${
      selectedMembers?.length > 0 ? getMembersList() : ""
    }`;

    allActions.communitiesAction
      .updateGroup(
        dispatch,
        requestbody,
        API_FUN_NAMES?.updateGroup,
        queryParams
      )
      .then((response: any) => {
        if ([STATUS_CODES?.RESPONSE_OK]?.includes(response?.statusCode)) {
          setIsLoading(false);
          allActions?.communitiesAction?.groupSelectedMembers(dispatch, []);
          toasterFunction(TOAST_STATUS?.SUCCESS, response?.message);
          navigation.goBack();
        } else {
          setIsLoading(false);
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err: any) => {
        setIsLoading(false);
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };
  const addNewCategory = async () => {
    if (!inputCategoryText?.value.trim().length) {
      setInputCategoryText({
        ...inputCategoryText,
        isError: true,
        errorMsg: strings?.Please_fill_the_category_value,
      });
      return;
    }
    try {
      const requestBody = {
        categoryName: categoryName?.CommunityGroupCategory,
        codeName: inputCategoryText?.value,
        description: inputCategoryText?.value,
      };

      const response = await allActions?.communitiesAction?.InsertGlobalCodeAPI(
        dispatch,
        requestBody,
        API_FUN_NAMES?.InsertNewCategoryAPI
      );

      if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
        fetchHealthConditionsData();
        setAddedCategoryId({
          value: response?.data?.id,
          isError: false,
          errorMsg: "",
        });
        toasterFunction(
          TOAST_STATUS?.SUCCESS,
          strings?.Category_added_suceessfully
        );
        setHideCategoryBox(true);
      } else {
        toasterFunction(TOAST_STATUS?.ERROR, strings?.Category_already_exits);
      }
    } catch (error) {
      logger("response____error", error);
    }
  };
  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <CommonHeader
        onBackPress={() => {
          allActions?.communitiesAction?.groupSelectedMembers(dispatch, []);
          navigation?.goBack();
        }}
        mainContainer={styles.headerContainer}
      />
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        extraHeight={140}
      >
        <GroupCreateDetails
          imageUri={imageUri}
          isObjectEmpty={isObjectEmpty}
          groupData={groupData}
          setImageUri={setImageUri}
          group={group}
          description={description}
          category={category}
          rules={rules}
          privacy={privacy}
          categoryData={categoryData}
          groupPrivacyOptions={groupPrivacyOptions}
          setGroup={setGroup}
          setDescription={setDescription}
          setCategory={setCategory}
          setRules={setRules}
          setPrivacy={setPrivacy}
          setGroupPrivacyOptions={setGroupPrivacyOptions}
          selectedMembers={selectedMembers}
          navigation={navigation}
          addPress={addNewCategory}
          hideCategoryBox={hideCategoryBox}
          inputCategoryText={inputCategoryText}
          setInputCategoryText={(val: string) => {
            setInputCategoryText(val);
          }}
        />
        <CommonButton
          isLoading={isLoading}
          disabled={isLoading}
          onPress={onSubmit}
          mainContainer={styles.buttonContainer}
          btnName={isObjectEmpty ? strings?.createGroup : strings?.updateGroup}
        />
      </KeyboardAwareScrollView>
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
      {isLoader && <CommonLoader />}
    </ScreenWrapper>
  );
};

export default CreateGroup;
