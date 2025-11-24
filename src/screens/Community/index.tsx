import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, ScrollView, Text, BackHandler } from "react-native";
import colors from "../../constant/colors";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import appConstant, {
  STATUS_CODES,
  TOAST_STATUS,
} from "../../constant/appConstant";
import { styles } from "./styles";
import CustomToggleBarCommunity from "./CommunityComponents/CustomToggleBarCommunity";
import HomeTab from "./CommunityTabs/HomeTab";
import GroupTab from "./CommunityTabs/GroupTab";
import ProfileTab from "./CommunityTabs/ProfileTab";
import allActions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { formatJSONToJavaScript } from "../../helper/CommunityHelper";
import {
  useFocusEffect,
  useIsFocused,
  useNavigationState,
} from "@react-navigation/native";
import CommunityPopUp from "./CommunityComponents/CommunityPopUp";
import ToastApiResponse from "../../components/Toast/ToastApiResponse";
import { strings } from "../../constant/strings";
import {
  categoryName,
  communityCode,
  responeKey,
} from "../../constant/CommunityConstant";

import { height, moderateScale } from "../../constant/responsiveStyle";
import RBSheet from "react-native-raw-bottom-sheet";
import UpdateNameProfile from "./CommunityComponents/UpdateNameProfile";
import CommunityHeaderNotificationMessage from "../../components/Header/CommunityHeaderNotificationMassage";
import navigationString from "../../navigation/navigationString";
import SearchTab from "./CommunityTabs/SearchTab";
import { formatSentenceCase } from "../../helper/sentenceCase";
import { API_FUN_NAMES } from "../../constant/APIsFunctionNames";
import logger from "../../constant/logger";
import {
  callCommunityProfileAPI,
  getSeekerDetailsData,
  profileDetailsCommunity,
} from "../../redux/selector";
import types from "../../redux/types/communitiesType";
import { event } from "../../navigation/emitter";
import { Enum_CommunityUserValidation } from "../../constant/ENUM";
import CommonLoader from "../../components/Loader";
import CommonHealthLoader from "../../components/Loader/CommonHealthLoader";

interface Props {
  navigation?: any;
}

const Community: React.FC<Props> = ({ navigation }): ReactElement => {
  const seekerCommunityDetails = useSelector(profileDetailsCommunity());
  let userData_ = useSelector(getSeekerDetailsData());
  const dispatch: any = useDispatch();
  const isfocused = useIsFocused();
  const myData = useSelector(callCommunityProfileAPI());
  const rbSheetRef = useRef<any>(null);
  const [isAllLoading, setIsAllLoading] = useState(false);
  const [someWrong, setSomeWrong] = useState(false);
  const [isCommunityAlert, setIsCommunityAlert] = useState(false);
  const [communityTab, setCommunityTab] = useState(0);
  const [alertData, setAlertData] = useState<any>();
  const [seekerCommunityProfile, setSeekerCommunityProfile] = useState<any>({});
  const [categoryData, setCategoryData] = useState<any>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<number>(0);
  const [isNameCheck, setIsNameCheck] = useState(false);
  const [isPicCheck, setIsPicCheck] = useState(false);
  const [isOldProfile, setIsOldProfile] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageErrorMsg, setImageErrorMsg] = useState("");
  const [preSelected, setPreSelected] = useState<any>(null);
  const userData = userData_?.data;
  const [name, setName] = useState<any>({
    value: "",
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
      code: code,
      message: message,
    });
  };

  useFocusEffect(
    useCallback(() => {
      logger("myDatamyDatamyData_____", myData);
      getCommunityProfile();
      fetchAvatarData();
      if (myData) {
        dispatch({
          type: types?.USER_NOT_FOUND,
          payload: false,
        });
      }
    }, [])
  );
  useEffect(() => {
    event.on("userDeleteBySuperAdmin", callOnSendTrigger);

    return () => {
      event.off("userDeleteBySuperAdmin", callOnSendTrigger);
    };
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);
  const callOnSendTrigger = () => {
    getCommunityProfile();
    fetchAvatarData();
  };
  const memorizedHomeTab = useMemo(() => {
    return (
      <HomeTab
        navigation={navigation}
        toasterFunction={toasterFunction}
        sendtrigger={() => callOnSendTrigger()}
      />
    );
  }, []);
  const memorizedGroupTab = useMemo(() => {
    return (
      <GroupTab
        navigation={navigation}
        toasterFunction={toasterFunction}
        sendtrigger={() => callOnSendTrigger()}
      />
    );
  }, []);
  const memorizedProfileTab = useMemo(() => {
    return (
      <ProfileTab
        navigation={navigation}
        toasterFunction={toasterFunction}
        setToasterDetails={setToasterDetails}
        sendtrigger={() => callOnSendTrigger()}
      />
    );
  }, []);
  const memorizedSearchTab = useMemo(() => {
    return (
      <SearchTab
        navigation={navigation}
        setCommunityTab={(val) => setCommunityTab(val)}
        sendtrigger={() => callOnSendTrigger()}
      />
    );
  }, []);
  const globalJsonByCategoryName = () => {
    setIsAllLoading(true);
    let requestbody = {
      categoryName: categoryName?.zumloCommunity,
    };
    allActions?.communitiesAction
      .globalJsonByCategoryName(
        dispatch,
        requestbody,
        API_FUN_NAMES?.globalJsonByCategoryName
      )
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setIsAllLoading(false);
          setIsCommunityAlert(true);
          setAlertData(formatJSONToJavaScript(response?.data?.jsonData));
        } else {
          setIsAllLoading(false);
          setIsCommunityAlert(false);
          setSomeWrong(true);
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err) => {
        setIsAllLoading(false);
        setIsCommunityAlert(false);
        setSomeWrong(true);
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };
  const getCommunityProfile = () => {
    setIsAllLoading(true);
    let requestbody = {};
    allActions?.communitiesAction
      .getCommunityProfile(
        dispatch,
        requestbody,
        API_FUN_NAMES?.getCommunityProfile
      )
      .then(async (response: any) => {
        setIsAllLoading(false);
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          if (response?.message == communityCode?.profile_not_found) {
            globalJsonByCategoryName();
          } else {
            setSeekerCommunityProfile(response?.data);
            setName({ ...name, value: response?.data?.aliasName });

            allActions?.communitiesAction?.profileDetailsCommunity(
              dispatch,
              response?.data
            );
            setIsAllLoading(false);
            setIsCommunityAlert(false);
            setSomeWrong(false);
          }
        } else {
          setSomeWrong(true);
          setIsAllLoading(false);
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err) => {
        setIsAllLoading(false);
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };
  const fetchAvatarData = () => {
    const requestBody = {
      categoryName: categoryName.communityAvatars,
    };
    allActions.GlobalCodesCategoryAction.GetGlobalCodesByCategoryName(
      dispatch,
      requestBody,
      API_FUN_NAMES?.GetGlobalCodesByCategoryName,
      categoryName.communityAvatars
    )
      .then((res) => {
        if (res?.statusCode === STATUS_CODES?.RESPONSE_OK)
          setCategoryData(res?.data);
      })
      .catch((err: any) => {
        logger("error", err); // Avoid Logging in Production
      });
  };
  const updateCommunityProfileValidation = () => {
    let isValid = true;
    if (name?.value === "" && !isNameCheck) {
      isValid = false;
      setName({
        ...name,
        isError: true,
        errorMessage: strings.enterNameP,
      });
    } else {
      setName({ ...name, isError: false, errorMessage: "" });
    }
    if (isValid) {
      updateCommunityProfile();
    }
  };
  const updateCommunityProfile = () => {
    const getUri = () =>
      isPicCheck || selectedAvatar !== categoryData?.length - 1
        ? ""
        : categoryData?.[selectedAvatar]?.description;
    const getAvatar = () => {
      if (isPicCheck) {
        return userData?.basicInformation?.profilePictureUrl;
      } else if (selectedAvatar === categoryData?.length - 1 && !isOldProfile) {
        return "";
      } else {
        return categoryData?.[selectedAvatar]?.description;
      }
    };
    const getFormData = () => {
      const uri = getUri();
      if (!uri || isOldProfile) return {};
      const requestBody = new FormData();
      requestBody.append(responeKey?.aliasProfilePicture, {
        uri: uri,
        type: responeKey?.image_jpg,
        name: responeKey?.imageJpg,
      });
      return requestBody;
    };
    const data = getFormData();
    const moreCon = () => {
      if (isOldProfile) {
        return categoryData?.[selectedAvatar]?.description;
      } else {
        return getAvatar();
      }
    };
    const queryParams = [
      `${responeKey?.id}${seekerCommunityProfile?.id}`,
      `${responeKey?.aliasName_01}${name.value}`,
      getAvatar() ? `${responeKey?.otherProfilePicture}${moreCon()}` : "",
      responeKey?.fileTypeCommunityprofilepicture,
    ].join("");
    allActions.communitiesAction
      .updateCommunityProfile(
        dispatch,
        data,
        API_FUN_NAMES?.updateCommunityProfile,
        queryParams
      )
      .then((response: any) => {
        if (response?.statusCode == STATUS_CODES?.RESPONSE_OK) {
          rbSheetRef.current?.close();

          getCommunityProfile();
          setIsOldProfile(true);
          toasterFunction(TOAST_STATUS?.SUCCESS, response?.message);
        } else {
          toasterFunction(TOAST_STATUS?.ERROR, response?.message);
        }
      })
      .catch((err: any) => {
        toasterFunction(TOAST_STATUS?.ERROR, err?.message);
      });
  };
  const renderCommunityTab = () => {
    switch (communityTab) {
      case 0:
        return memorizedHomeTab;
      case 1:
        return memorizedGroupTab;
      case 2:
        return memorizedProfileTab;
      case 3:
        return memorizedSearchTab;
      default:
        return null;
    }
  };
  return (
    logger("seekerCommunityDetails___in_", !!seekerCommunityDetails),
    (
      <ScreenWrapper
        statusBarColor={
          communityTab == 2 ? colors.prussianBlue : colors.SurfCrest
        }
      >
        <>
          <View style={styles.container}>
            <ScrollView
              contentContainerStyle={[
                styles.scrollViewContent,
                {
                  paddingVertical:
                    communityTab == 2 ? moderateScale(0) : moderateScale(30),
                  paddingBottom: moderateScale(120),
                },
              ]}
              style={styles.scrollView}
              bounces={false}
            >
              {!isCommunityAlert && !!seekerCommunityDetails ? (
                <>
                  {!someWrong ? (
                    <>
                      <CustomToggleBarCommunity
                        name={seekerCommunityProfile?.aliasName}
                        userProfileSource={{
                          uri: seekerCommunityProfile?.aliasProfilePicture,
                        }}
                        data={appConstant?.communityTabData}
                        itemContainerStyle={{ flex: 1 }}
                        communityTab={communityTab}
                        setCommunityTab={setCommunityTab}
                        containerStyle={
                          communityTab == 2
                            ? styles?.containerStyle2
                            : styles?.containerStyle
                        }
                        onEditIconPress={() => {
                          rbSheetRef.current?.open();
                        }}
                      />
                      {renderCommunityTab()}
                    </>
                  ) : (
                    someWrongHere()
                  )}
                </>
              ) : (
                <CommunityPopUp
                  categoryData={categoryData}
                  title={formatSentenceCase(alertData?.title)}
                  description={formatSentenceCase(alertData?.description)}
                  setIsCommunityAlert={setIsCommunityAlert}
                  userData={userData}
                  navigation={navigation}
                />
              )}
            </ScrollView>
          </View>
          {toasterDetails?.showToast &&
            ![
              Enum_CommunityUserValidation?.Profile_not_found,
              Enum_CommunityUserValidation?.User_not_found,
              Enum_CommunityUserValidation?.Failed_with_error,
            ].includes(toasterDetails?.message) && (
              <ToastApiResponse
                data={toasterDetails}
                setToasterDetails={setToasterDetails}
                code={toasterDetails?.code}
                message={toasterDetails?.message}
              />
            )}
          <RBSheet
            ref={rbSheetRef}
            height={moderateScale(650)}
            openDuration={250}
            customStyles={{
              container: styles?.rbSheetContainer,
            }}
          >
            <UpdateNameProfile
              name={name}
              setName={setName}
              imageError={imageError}
              setImageError={setImageError}
              preSelected={preSelected}
              setPreSelected={setPreSelected}
              imageErrorMsg={imageErrorMsg}
              setImageErrorMsg={setImageErrorMsg}
              categoryData={categoryData}
              setCategoryData={setCategoryData}
              isNameCheck={isNameCheck}
              setIsNameCheck={setIsNameCheck}
              isPicCheck={isPicCheck}
              setIsPicCheck={setIsPicCheck}
              selectedAvatar={selectedAvatar}
              setSelectedAvatar={setSelectedAvatar}
              setIsOldProfile={setIsOldProfile}
              previousImage={seekerCommunityProfile?.aliasProfilePicture}
              userName={name?.value} //We are providing the feature where user can pick his Zumlo regster name in update community profile using toggle button. Toggle button for yes and no are hidden
              pictureUrl={userData?.basicInformation?.profilePictureUrl}
              onPressUpdate={updateCommunityProfileValidation}
              onPressCross={() => {
                rbSheetRef.current?.close();
              }}
            />
          </RBSheet>
        </>
        {isAllLoading && (
          <>
            <View style={styles?.invisibleLoader} />
          </>
        )}
      </ScreenWrapper>
    )
  );
};

export default Community;

const someWrongHere = () => {
  return (
    <View style={styles?.wrongView}>
      <Text style={styles?.wrongText}>{strings?.somethingWrong}</Text>
    </View>
  );
};
