import { StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { strings } from "../../../constant/strings";
import FeedFeatures from "./FeedFeatures";
import { responeKey } from "../../../constant/CommunityConstant";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../../redux/actions";
import { lookup } from "react-native-mime-types";
import {
  decodeSpaces,
  encodeSpaces,
  replaceSlashWithDot,
} from "../../../helper/CommunityHelper";
import { getSelectedGroupMembers } from "../../../redux/selector";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
import CommonLoader from "../../../components/Loader";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import logger from "../../../constant/logger";

interface Props {
  navigation: any;
  route?: any;
}

const CreateFeedForGroup: React.FC<Props> = ({ navigation, route }) => {
  const { groupId, feedData } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const isObjectEmpty = !feedData || Object.keys(feedData)?.length === 0;
  const dispatch: any = useDispatch();
  const selectedMembers = useSelector(getSelectedGroupMembers());
  const [mediaUrls, setMediaUrls] = useState<any>(feedData?.content || []);
  const [mediaSize, setmediaSize] = useState<any>(feedData?.content || []);
  const [title, setTitle] = useState<any>({
    value: isObjectEmpty ? "" : feedData?.title,
    isError: false,
    errorMessage: "",
  });

  const [desc, setDesc] = useState("");
  const [description, setDescription] = useState<any>({
    value: isObjectEmpty
      ? ""
      : feedData?.description.replaceAll(/\\n/g, "\n").replaceAll(/\"/g, ""),
    isError: false,
    errorMessage: "",
  });
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const toasterFunction = (code: any, message: any) => {
    setToasterDetails({
      showToast: true,
      code,
      message: typeof message === "string" ? message : JSON.stringify(message),
    });
  };
  const feedValidation = () => {
    console.log("description_1", desc, "----", description);
    console.log("description_2");
    const totalBytes = mediaSize.reduce(
      (total: any, size: any) => total + size,
      0
    );
    const sizeInMB = totalBytes / (1024 * 1024);

    console.log("mediaUrlsmediaUrls", mediaSize, totalBytes, sizeInMB);
    let isValid = true;

    if (!title?.value) {
      isValid = false;
      setTitle({
        ...title,
        isError: true,
        errorMessage: strings?.titleRequired,
      });
      toasterFunction(
        TOAST_STATUS?.ERROR,
        strings?.titleAndDescriptionRequired
      );
    } else {
      setTitle({ ...title, isError: false, errorMessage: "" });
    }
    if (!description?.value) {
      isValid = false;
      setDescription({
        ...description,
        isError: true,
        errorMessage: strings?.descriptionRequired,
      });
      toasterFunction(
        TOAST_STATUS?.ERROR,
        strings?.titleAndDescriptionRequired
      );
    } else {
      setDescription({ ...description, isError: false, errorMessage: "" });
    }

    if (isValid) {
      isObjectEmpty ? createFeed() : updateFeed();
    }
  };
  const createFeed = () => {
    setIsLoading(true);
    const getMembersList = () => {
      let allMembers: any = selectedMembers?.map((itm: any) => itm?.id);
      return allMembers
        ?.map((id: any) => `${responeKey?.tagUsers}${id}`)
        .join("");
    };

    const getFormData = () => {
      if (mediaUrls.length > 0) {
        const requestBody = new FormData();
        mediaUrls?.forEach((urlData: any, index: any) => {
          const mimeType: any = lookup(urlData);
          requestBody?.append(responeKey?.contents, {
            uri: urlData,
            type: mimeType,
            name: replaceSlashWithDot(mimeType, index),
          });
        });

        return requestBody;
      }
      return {};
    };
    const data = getFormData();
    const queryParams = [
      `${responeKey?.title}${title.value}`,
      `${responeKey?.Description}${JSON.stringify(description.value)}`,
      `${responeKey?.groupId}${groupId}`,
      `${selectedMembers?.length > 0 ? getMembersList() : ""}`,
    ].join("");
    logger("queryParams____", queryParams);
    allActions.communitiesAction
      .createFeed(dispatch, data, API_FUN_NAMES?.createFeed, `?${queryParams}`)
      .then((response: any) => {
        if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
          setIsLoading(false);
          allActions?.communitiesAction?.groupSelectedMembers(dispatch, []);
          navigation.goBack();
        } else {
          setIsLoading(false);
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err: any) => {
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
        setIsLoading(false);
      });
  };

  const updateFeed = () => {
    setIsLoading(true);
    const data = {};
    const queryParams = [
      `${responeKey?.title}${title.value}`,
      `${responeKey?.Description}${JSON.stringify(description.value)}`,
      `${responeKey?.groupId}${groupId}`,
    ].join("");

    logger("queryParams____", queryParams);
    allActions.communitiesAction
      .updateFeed(
        dispatch,
        data,
        API_FUN_NAMES?.updateFeed,
        `/${feedData?.id}?${queryParams}`
      )
      .then((response: any) => {
        if (response?.statusCode === STATUS_CODES?.RESPONSE_OK) {
          setIsLoading(false);
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

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <CommonHeader
        mainContainer={styles.headerContainer}
        isPost={isObjectEmpty ? strings?.post : strings?.update}
        onPostPress={feedValidation}
        onBackPress={() => {
          allActions?.communitiesAction?.groupSelectedMembers(dispatch, []);
          navigation.goBack();
        }}
      />
      {isLoading ? (
        <CommonLoader />
      ) : (
        <>
          <KeyboardAwareScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <TextInput
              placeholder={strings?.title}
              selectionColor={colors?.SurfCrest}
              placeholderTextColor={colors?.lightSurfCrest04}
              value={title?.value}
              onChangeText={(val: any) =>
                setTitle({
                  ...title,
                  value: val,
                  isError: false,
                  errorMessage: "",
                })
              }
              style={[
                styles.textInput,
                { marginTop: moderateScale(10), fontSize: textScale(24) },
              ]}
            />

            <View style={styles.textInputContainer}>
              <TextInput
                placeholder={strings?.yourMind}
                selectionColor={colors?.SurfCrest}
                placeholderTextColor={colors?.lightSurfCrest04}
                value={description?.value}
                onChangeText={(val: any) => {
                  setDesc(val);
                  setDescription({
                    ...description,
                    value: val,
                    isError: false,
                    errorMessage: "",
                  });
                }}
                multiline
                style={styles.textInput}
              />
            </View>
          </KeyboardAwareScrollView>

          {isObjectEmpty && (
            <FeedFeatures
              mediaUrls={mediaUrls}
              setMediaUrls={setMediaUrls}
              navigation={navigation}
              groupId={groupId}
              toasterFunction={toasterFunction}
              loaderShowHide={(status: boolean) => setIsLoading(status)}
              setmediaSize={setmediaSize}
            />
          )}
          {toasterDetails?.showToast && (
            <ToastApiResponse
              data={toasterDetails}
              setToasterDetails={setToasterDetails}
              code={toasterDetails?.code}
              message={toasterDetails?.message}
            />
          )}
        </>
      )}
    </ScreenWrapper>
  );
};

export default CreateFeedForGroup;

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(15),
    paddingBottom: moderateScale(10),
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: moderateScale(19),
  },
  inputContainer: {
    backgroundColor: colors?.transparent,
    borderColor: colors?.SurfCrest,
    width: "auto",
    marginTop: moderateScale(20),
  },
  inputText: {
    color: colors?.SurfCrest,
  },
  textInputContainer: {
    height: moderateScale(300),
    marginTop: moderateScale(20),
  },
  textInput: {
    fontSize: textScale(22),
    color: colors?.SurfCrest,
    paddingHorizontal: moderateScale(5),
  },
  imageErrText: {
    color: colors?.royalOrange,
    fontSize: textScale(14),
    fontWeight: "400",
    marginTop: moderateScale(20),
  },
});
