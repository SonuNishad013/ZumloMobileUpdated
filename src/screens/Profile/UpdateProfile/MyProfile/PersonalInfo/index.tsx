import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import EditBasicInfo from "./EditBasicInfo";
import EditSocialInfo from "./EditSocialInfo";
import { InfoView } from "../InfoView";
import { imagePath } from "../../../../../assets/png/imagePath";
import { EditIconSalt, EditIconSurf } from "../../../../../assets";
import { strings } from "../../../../../constant/strings";

import { styles } from "./styles";
import { getKeyByValue } from "./helper";
import { capitalizeFirstLetter } from "../../../../../constant/CustomHook/CommonFunctions";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";
import CommonButton from "../../../../../components/Buttons/commonButton";
import RBSheet from "react-native-raw-bottom-sheet";
import ImagePicker from "react-native-image-crop-picker";
import apiConstant from "../../../../../constant/apiConstant";
import axios from "axios";
import * as AsyncStore from "../../../../../utils/Storage/AsyncStorage";
import ToastMsg from "../../../../../components/Hooks/useToast";
import {
  basicInfoDetailData,
  socialInfoDetailData,
} from "../../../../../constant/ProfileConstant";
import ToastApiResponse from "../../../../../components/Toast/ToastApiResponse";
import logger from "../../../../../constant/logger";
import { openSettings } from "react-native-permissions";
import { showGalleryPermissionAlert } from "../../../../../utils/CommonMethods";

const PersonalInfo = ({
  userData,
  updateProfile,
  globaleCodeList,
  setIsEdited,
  onImageChange,
  isEdited,
  backPress,
  setBackPress,
  setToasterDetails,
}: any) => {
  const rbSheetRef = useRef<any>(null);

  const [showEditBasicInfo, setShowEditBasicInfo] = useState(false);
  const [showEditSocialInfo, setShowEditSocialInfo] = useState(false);
  const [basicInfoDetail, setBasicInfoDetail] = useState(basicInfoDetailData);
  const [socialInfoDetail, setSocialInfoDetail] =
    useState(socialInfoDetailData);
  const [userImage, setUserImage] = useState<any>("");
  const [isProfilePicSelected, setisProfilePicSelected] = useState(false);

  useEffect(() => {
    if (userData?.basicInformation?.profilePictureUrl == undefined) return;
    setUserImage(userData?.basicInformation?.profilePictureUrl);
  }, [userData?.basicInformation?.profilePictureUrl]);
  useEffect(() => {
    if (userData?.basicInformation) {
      let data = [...basicInfoDetail];
      setBasicInfoDetail(
        data.map((elem) => {
          return {
            ...elem,
            value: getKeyByValue(userData?.basicInformation, elem),
          };
        })
      );
    }
    if (userData?.socialInformation) {
      let data = [...socialInfoDetail];
      setSocialInfoDetail(
        data.map((elem) => {
          return {
            ...elem,
            value: getKeyByValue(userData?.socialInformation, elem),
          };
        })
      );
    }
  }, [userData]);
  useEffect(() => {
    if (backPress === true) {
      setShowEditBasicInfo(false);
      setShowEditSocialInfo(false);
    }
  }, [backPress]);

  const renderNameEmail = (key: string) => {
    if (key === "name") {
      return userData?.basicInformation?.firstName
        ? capitalizeFirstLetter(userData?.basicInformation?.firstName)
        : "Seeker";
    }
    if (key === "email") {
      return userData?.contactInformation?.email
        ? userData?.contactInformation?.email
        : userData?.contactInformation?.phoneNumber;
    }
  };
  if (showEditBasicInfo)
    return (
      <EditBasicInfo
        globaleCodeList={globaleCodeList}
        setIsEdited={setIsEdited}
        isEdited={isEdited}
        userData={userData?.basicInformation}
        onPressUpdate={(formData: any) => {
          updateProfile("basicInformation", formData);
          setShowEditBasicInfo(false);
          setBackPress(true);
        }}
        onPresCancel={() => {
          setShowEditBasicInfo(false);
          setBackPress(true);
        }}
      />
    );
  if (showEditSocialInfo)
    return (
      <EditSocialInfo
        globaleCodeList={globaleCodeList}
        setIsEdited={setIsEdited}
        isEdited={isEdited}
        userData={userData?.socialInformation}
        onPressUpdate={(formData: any) => {
          updateProfile("socialInformation", formData);
          setShowEditSocialInfo(false);
          setBackPress(true);
        }}
        onPresCancel={() => {
          setShowEditSocialInfo(false);
          setBackPress(true);
        }}
        setToasterDetails={(data: any) => setToasterDetails(data)}
      />
    );

  const uploadSeekerProfilePicture = async () => {
    let bearerToken = await AsyncStore.getItem(AsyncStore.ACCESS_TOKEN);
    console.log("isProfilePicSelected", isProfilePicSelected);

    try {
      if (isProfilePicSelected) {
        let data: any = new FormData();
        data.append("File", {
          uri: userImage,
          type: "image/jpg",
          name: "image.jpg",
        });
        data.append("EntityType", "");
        data.append("FileType", "profilepicture");
        console.log(
          "data data uploadSeekerProfilePicture --> ",
          JSON.stringify(data)
        );
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: apiConstant().UploadSeekerProfilePicture,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + bearerToken,
            ...data,
            // ...data.getHeaders(),
          },
          data: data,
        };
        console.log("data=-=-=-=-=-==>", isProfilePicSelected);

        axios
          .request(config)
          .then((response) => {
            console.log(
              " uploadSeekerProfilePicture response --> ",
              JSON.stringify(response)
            );
            rbSheetRef.current?.close();
            onImageChange(true);
          })
          .catch((error) => {
            console.log(" for img-=-=>", error);
          });
      }
    } catch (error) {
      console.log(" for img-=-=>network", error);
      // setisLoading(false);
      ToastMsg("error", "Error", error);
    }
  };

  const onSelectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then((image) => {
        setUserImage(image?.path);
        setisProfilePicSelected(true);
      })
      .catch((err) => {
        if (err?.code == "E_NO_LIBRARY_PERMISSION") {
          showGalleryPermissionAlert();
        }
        setisProfilePicSelected(false);
      });
  };

  return (
    <View style={styles?.mainContainer}>
      <View style={styles?.topView}>
        <View style={styles.imageContainer1}>
          <View style={[styles.imageContainer]}>
            <Image
              source={
                userData?.basicInformation?.profilePictureUrl
                  ? { uri: userData?.basicInformation?.profilePictureUrl }
                  : imagePath.dummyProfileIcon
              }
              style={styles.image}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles?.touchableStyle}
            onPress={() => rbSheetRef.current?.open()}
          >
            <EditIconSalt />
          </TouchableOpacity>
        </View>
        <View style={styles?.nameEmailContainer}>
          <Text
            style={[styles?.nameTxt, { width: moderateScale(250) }]}
            numberOfLines={2}
          >
            {renderNameEmail(strings?.name)}
          </Text>
          <Text
            style={[styles?.emailTxt, { width: moderateScale(250) }]}
            numberOfLines={2}
          >
            {renderNameEmail(strings?.email)}
          </Text>
        </View>
      </View>
      <View style={styles?.extraView}>
        <InfoView
          data={basicInfoDetail}
          title={"About You"}
          onPressEdit={() => {
            setShowEditBasicInfo(true);
            setBackPress(false);
          }}
        />
        <InfoView
          data={socialInfoDetail}
          onPressEdit={() => {
            setShowEditSocialInfo(true);
            setBackPress(false);
          }}
          title={"Your Social Circle"}
          containerStyle={styles.socialInfoContainer}
        />
      </View>

      <RBSheet
        ref={rbSheetRef}
        height={370}
        openDuration={250}
        customStyles={{
          container: {
            paddingHorizontal: moderateScale(19),
            backgroundColor: colors?.SurfCrest,
            borderTopLeftRadius: moderateScale(20),
            borderTopRightRadius: moderateScale(20),
          },
        }}
      >
        <View>
          <Text
            style={{
              fontSize: textScale(14),
              fontWeight: "600",
              color: colors?.prussianBlue,
              marginTop: moderateScale(30),
            }}
          >
            {"Change Profile Picture"}
          </Text>
          <View
            style={[
              styles.imageContainer1,
              { alignSelf: "center", marginTop: moderateScale(30) },
            ]}
          >
            <View style={[styles.imageContainer]}>
              <Image
                source={
                  userImage == ""
                    ? imagePath.dummyProfileIcon
                    : { uri: userImage }
                }
                style={[styles.image]}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles?.touchableStyle,
                {
                  backgroundColor: colors?.SaltBox,
                  height: moderateScale(30),
                  width: moderateScale(30),
                },
              ]}
              onPress={() => onSelectImage()}
            >
              <EditIconSurf
                height={moderateScale(15)}
                width={moderateScale(15)}
              />
            </TouchableOpacity>
          </View>
          <CommonButton
            btnName={"Update picture"}
            onPress={() => uploadSeekerProfilePicture()}
            mainContainer={{
              width: "auto",
              marginTop: moderateScale(40),
            }}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default PersonalInfo;
