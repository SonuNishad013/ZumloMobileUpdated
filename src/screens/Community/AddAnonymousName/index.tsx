import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import CommonHeader from "../../../components/Header/commonHeader";
import CommonButton from "../../../components/Buttons/commonButton";
import ImagePicker from "react-native-image-crop-picker";
import CommonLoader from "../../../components/Loader";
import colors from "../../../constant/colors";
import { useDispatch } from "react-redux";
import allActions from "../../../redux/actions";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import { styles } from "./styles";
import { strings } from "../../../constant/strings";
import CommunityAliasName from "./CommunityAliasName";
import CommunityPicture from "./CommunityPicture";
import { codeName } from "../../../constant/AllGlobalNameConstant";
import { usernameCheck } from "../../../validations/validation";
import { imagePath } from "../../../assets/png/imagePath";
import { responeKey } from "../../../constant/CommunityConstant";
import {
  imageLimit,
  STATUS_CODES,
  TOAST_STATUS,
} from "../../../constant/appConstant";
import logger from "../../../constant/logger";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { showGalleryPermissionAlert } from "../../../utils/CommonMethods";

interface Props {
  navigation?: any;
  route?: any;
}

const AddAnonymousName: React.FC<Props> = ({ navigation, route }) => {
  const { categoryDataAvatar, userName, pictureUrl } = route.params;
  const dispatch: any = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isNameCheck, setIsNameCheck] = useState(true);
  const [isPicCheck, setIsPicCheck] = useState(false);
  const [categoryData, setCategoryData] = useState<any>(categoryDataAvatar);
  const [selectedAvatar, setSelectedAvatar] = useState<any>(0);
  const [isImagePicked, setIsImagePicked] = useState(false);
  const [name, setName] = useState({
    value: "",
    isError: false,
    errorMessage: "",
  });
  const [imageError, setImageError] = useState(false);
  const [imageErrorMsg, setImageErrorMsg] = useState("");
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  useEffect(() => {
    if (isPicCheck) {
      setSelectedAvatar(null);
    }
  }, [isPicCheck]);
  useEffect(() => {
    if (isNameCheck) {
      setName({
        ...name,
        value: userName,
        isError: false,
        errorMessage: "",
      });
    }
  }, [isNameCheck]);

  const onSelectImage = (idx: number) => {
    ImagePicker.openPicker({
      width: imageLimit?.IMAGE_WIDTH,
      height: imageLimit?.IMAGE_HEIGHT,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then((image) => {
        const byte_ = image?.size / (1024 * 1024);
        if (byte_ > imageLimit?.MB_2) {
          setImageErrorMsg(strings?.Image_size_maximum_2MB);
          setImageError(true);
          return;
        }
        const updatedCategoryData = categoryData?.map(
          (item: any, index: number) =>
            index === idx ? { ...item, description: image?.path } : item
        );
        setSelectedAvatar(idx);
        setIsPicCheck(false);
        setCategoryData(updatedCategoryData);
        setIsImagePicked(true);
        setImageErrorMsg("");
        setImageError(false);
      })
      .catch((error) => {
        if (error?.code == "E_NO_LIBRARY_PERMISSION") {
          showGalleryPermissionAlert();
        }
        logger("Error selecting image:", error);
      });
  };
  const checkDetails = () => {
    let isValid = true;
    if (name?.value === "" && !isNameCheck) {
      isValid = false;
      setName({
        ...name,
        isError: true,
        errorMessage: "Enter a name you'd like to use",
      });
    } else {
      setName({ ...name, isError: false, errorMessage: "" });
    }
    if (isValid) {
      createCommunityProfile();
    }
  };
  const createCommunityProfile = () => {
    setIsLoading(true);
    const getUri = () =>
      isPicCheck || selectedAvatar !== categoryData?.length - 1
        ? ""
        : categoryData?.[selectedAvatar]?.description;

    const getAvatar = () => {
      if (isPicCheck) {
        return pictureUrl;
      } else if (selectedAvatar === categoryData?.length - 1) {
        return "";
      } else {
        return categoryData?.[selectedAvatar]?.description;
      }
    };
    const getFormData = () => {
      const uri = getUri();
      if (!uri) return {};
      const requestBody = new FormData();
      requestBody.append(responeKey?.aliasProfilePicture, {
        uri: uri,
        type: responeKey?.image_jpg,
        name: responeKey?.imageJpg,
      });
      return requestBody;
    };
    const data = getFormData();
    const queryParams = [
      `${responeKey?.aliasName_1}${name.value}`,
      getAvatar() ? `${responeKey?.otherProfilePicture}${getAvatar()}` : "",
      responeKey?.fileTypeCommunityprofilepicture,
    ].join("");
    allActions.communitiesAction
      .createCommunityProfile(
        dispatch,
        data,
        API_FUN_NAMES?.createCommunityProfile,
        `?${queryParams}`
      )
      .then((response: any) => {
        setIsLoading(false);
        if ([STATUS_CODES?.RESPONSE_OK]?.includes(response?.statusCode)) {
          // allActions?.communitiesAction?.profileDetailsCommunity(
          //   dispatch,
          //   response?.data
          // );
          setToasterDetails({
            showToast: true,
            code: TOAST_STATUS?.SUCCESS,
            message: response.message,
          });
          navigation.goBack();
        } else {
          setToasterDetails({
            showToast: true,
            code: TOAST_STATUS?.ERROR,
            message: response.message,
          });
          // allActions?.communitiesAction?.profileDetailsCommunity(
          //   dispatch,
          //   null
          // );
        }
      })
      .catch((err: any) => {
        // allActions?.communitiesAction?.profileDetailsCommunity(
        //   dispatch,
        //  null
        // );
        setIsLoading(false);
        setToasterDetails({
          showToast: true,
          code: TOAST_STATUS?.ERROR,
          message: err.message,
        });
      });
  };

  return (
    <ScreenWrapper statusBarColor={colors.SaltBox}>
      <CommonHeader
        onBackPress={() => !isLoading && navigation?.goBack()}
        mainContainer={styles.headerContainer}
        isBackIcon={true}
      />

      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <CommunityAliasName
          value={name?.value}
          isError={name?.isError}
          errorMsg={name?.errorMessage}
          onChangeText={(val: any) => {
            if (usernameCheck(val)) {
              setIsNameCheck(false);
              setName({
                ...name,
                value: val,
                isError: false,
                errorMessage: "",
              });
            }
          }}
          handleDefaultNameToggle={() => {
            setIsNameCheck((prev) => !prev);
            setName({
              ...name,
              value: "",
              isError: false,
              errorMessage: "",
            });
          }}
          isNameCheck={isNameCheck}
        />
        <View style={styles.headerContainerLine}>
          <Text style={styles.headerText}>{"Choose your look"}</Text>
          <Text style={styles.subheaderText}>
            {
              "Pick an avatar that represents you—or upload your own if you’d prefer something more personal."
            }
          </Text>
          <View style={styles.headerLine} />
        </View>
        <FlatList
          data={categoryData}
          keyExtractor={(item, index) => "key" + index}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <CommunityPicture
              source={{ uri: item?.description }}
              categoryItem={{
                borderColor:
                  selectedAvatar === index
                    ? colors.prussianBlue
                    : colors.transparent,
              }}
              categoryImageContainer={{
                borderColor:
                  item?.codeName === codeName?.avatarImageSix && !isImagePicked
                    ? colors?.transparent
                    : colors?.polishedPine,
              }}
              categoryImage={{
                opacity:
                  item?.codeName === codeName?.avatarImageSix && isImagePicked
                    ? 0.5
                    : 1,
              }}
              rightWhiteCondition={
                item?.codeName === codeName?.avatarImageSix && isImagePicked
              }
              onPress={() => {
                if (item?.codeName === codeName?.avatarImageSix) {
                  onSelectImage(index);
                } else {
                  setSelectedAvatar(index);
                  setIsPicCheck(false);
                }
              }}
            />
          )}
          ListFooterComponent={
            <>
              {imageError && (
                <Text style={styles?.imageErrText}>{imageErrorMsg}</Text>
              )}
              {pictureUrl && (
                <TouchableOpacity
                  style={styles.footerContainer}
                  activeOpacity={0.8}
                  onPress={() => {
                    if (isPicCheck) {
                      setSelectedAvatar(0);
                    }
                    setIsPicCheck((prev) => !prev);
                  }}
                >
                  <View style={[styles.checkbox]}>
                    {isPicCheck && (
                      <Image
                        source={imagePath.check}
                        style={[styles.checkboxImage]}
                      />
                    )}
                  </View>
                  <Text style={[styles.agreementText]}>
                    {strings.defaultPicture}
                  </Text>
                </TouchableOpacity>
              )}
            </>
          }
        />
        <CommonButton
          onPress={checkDetails}
          isLoading={isLoading}
          mainContainer={styles.buttonContainer}
          btnName={"Join the Community "}
        />
      </KeyboardAwareScrollView>

      {isLoading ? <CommonLoader /> : null}
      {toasterDetails.showToast && (
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

export default AddAnonymousName;
