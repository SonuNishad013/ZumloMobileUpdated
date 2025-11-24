import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import TitleSideLine from "./TitleSideLine";
import CommunityPicture from "../AddAnonymousName/CommunityPicture";
import { codeName } from "../../../constant/AllGlobalNameConstant";
import CommonButton from "../../../components/Buttons/commonButton";
import { usernameCheck } from "../../../validations/validation";
import CommunityAliasName from "../AddAnonymousName/CommunityAliasName";
import CommonBoxButton from "../../../components/Buttons/commonBoxButton";
import { CrossIcon } from "../../../assets";
import { imagePath } from "../../../assets/png/imagePath";
import { strings } from "../../../constant/strings";
import ImagePicker from "react-native-image-crop-picker";
import { imageLimit } from "../../../constant/appConstant";
import logger from "../../../constant/logger";

interface Props {
  categoryData?: any;
  selectedAvatar?: any;
  setSelectedAvatar?: any;
  name?: any;
  setName?: any;
  isNameCheck?: any;
  onPressUpdate?: any;
  setIsNameCheck?: any;
  onPressCross?: any;
  isPicCheck?: any;
  setIsPicCheck?: any;
  setCategoryData?: any;
  previousImage?: any;
  setIsOldProfile?: any;
  imageError?: any;
  setImageError?: any;
  imageErrorMsg?: any;
  setImageErrorMsg?: any;
  setPreSelected?: any;
  preSelected?: any;
  userName?: any;
  pictureUrl?: any;
}

const UpdateNameProfile: React.FC<Props> = ({
  categoryData,
  selectedAvatar,
  setSelectedAvatar,
  name,
  setName,
  isNameCheck,
  onPressUpdate,
  setIsNameCheck,
  onPressCross,
  isPicCheck,
  setIsPicCheck,
  setCategoryData,
  previousImage,
  setIsOldProfile,
  imageError,
  setImageError,
  imageErrorMsg,
  setImageErrorMsg,
  setPreSelected,
  preSelected,
  userName,
  pictureUrl,
}) => {
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

  useEffect(() => {
    let lastIndex = categoryData?.length - 1;
    const data = categoryData?.map((item: any, index: number) => {
      if (index === lastIndex) {
        item.description = previousImage;
      }
      return item;
    });
    setSelectedAvatar(
      data.findIndex((item: any) => item.description === previousImage)
    );
    setCategoryData(data);
  }, []);

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
        setPreSelected(
          categoryData.findIndex(
            (item: any) => item.description === previousImage
          )
        );
        setIsPicCheck(false);
        setCategoryData(updatedCategoryData);
        setImageErrorMsg("");
        setImageError(false);
        setIsOldProfile(false);
      })
      .catch((error) => {
        logger("Error selecting image:", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.communityProfileText}>
          {strings?.Community_Profile}
        </Text>
        <CommonBoxButton
          onPress={onPressCross}
          SvgIcon={CrossIcon}
          mainContainer={styles.crossButtonContainer}
        />
      </View>

      <TitleSideLine
        titleText={styles.titleText}
        container={styles.titleContainer}
        title={strings?.Select_Avatar}
      />

      <FlatList
        data={categoryData}
        keyExtractor={(item, index) => "key" + index}
        numColumns={3}
        scrollEnabled={false}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item, index }) => (
          <CommunityPicture
            source={{ uri: item?.description }}
            categoryItem={
              selectedAvatar === index
                ? styles.selectedCategoryItem
                : styles.unselectedCategoryItem
            }
            categoryImage={
              item?.codeName === codeName?.avatarImageSix
                ? styles.fadedCategoryImage
                : styles.defaultCategoryImage
            }
            rightWhiteCondition={item?.codeName === codeName?.avatarImageSix}
            onPress={() => {
              if (item?.codeName === codeName?.avatarImageSix) {
                onSelectImage(index);
              } else {
                setSelectedAvatar(index);
                setIsPicCheck(false);
                setIsOldProfile(false);
                setPreSelected(
                  categoryData.findIndex(
                    (item: any) => item.description === previousImage
                  )
                );
              }
            }}
          />
        )}
        // ListFooterComponent={
        //   <>
        //     {imageError && (
        //       <Text style={styles.imageErrorText}>{imageErrorMsg}</Text>
        //     )}
        //     {pictureUrl && (
        //       <TouchableOpacity
        //         style={styles.checkboxContainer}
        //         activeOpacity={0.8}
        //         onPress={() => {
        //           if (isPicCheck) {
        //             setSelectedAvatar(
        //               categoryData.findIndex(
        //                 (item: any) => item.description === previousImage
        //               )
        //             );
        //           }
        //           setIsPicCheck((prev: any) => !prev);
        //           setIsOldProfile(false);
        //         }}
        //       >
        //         <View style={styles.checkboxBox}>
        //           {isPicCheck && (
        //             <Image source={imagePath.check} style={styles.checkImage} />
        //           )}
        //         </View>
        //         <Text style={styles.checkboxAgreementText}>
        //           {strings.defaultPicture}
        //         </Text>
        //       </TouchableOpacity>
        //     )}
        //   </>
        // }
      />
      {/* 
      <TitleSideLine
        titleText={styles.titleText}
        container={styles.titleContainer}
        title={strings?.Update_Your_Alias_Name}
      /> */}
      <CommunityAliasName
        isTitle={false}
        value={name?.value}
        isError={name?.isError}
        errorMsg={name?.errorMessage}
        isEdit={true}
        isNameCheck={isNameCheck}
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
          setIsNameCheck((prev: any) => !prev);
        }}
        agreementText={styles.agreementText}
        checkbox={styles.checkbox}
        checkboxImage={
          isNameCheck
            ? styles.checkedCheckboxImage
            : styles.uncheckedCheckboxImage
        }
        hideQuestion={true}
      />

      <CommonButton
        btnName={strings?.update}
        onPress={onPressUpdate}
        mainContainer={styles.updateButtonContainer}
      />
    </View>
  );
};

export default UpdateNameProfile;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: moderateScale(15),
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: moderateScale(19),
  },
  communityProfileText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.prussianBlue,
  },
  crossButtonContainer: {
    backgroundColor: colors?.prussianBlue,
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(15),
  },
  titleText: {
    fontWeight: "400",
    fontSize: textScale(14),
  },
  titleContainer: {
    marginTop: moderateScale(30),
  },
  flatListContent: {
    marginTop: moderateScale(15),
    alignSelf: "center",
  },
  selectedCategoryItem: {
    borderColor: colors.prussianBlue,
  },
  unselectedCategoryItem: {
    borderColor: colors.transparent,
  },
  fadedCategoryImage: {
    opacity: 0.5,
  },
  defaultCategoryImage: {
    opacity: 1,
  },
  imageErrorText: {
    color: colors?.royalOrange,
    fontSize: textScale(14),
    fontWeight: "400",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(15),
  },
  checkboxBox: {
    height: moderateScale(18),
    width: moderateScale(18),
    borderWidth: moderateScale(1),
    borderColor: colors.prussianBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(3),
  },
  checkImage: {
    tintColor: colors.prussianBlue,
    height: moderateScale(13),
    width: moderateScale(13),
  },
  checkboxAgreementText: {
    color: colors.prussianBlue,
    marginLeft: moderateScale(8),
  },
  agreementText: {
    color: colors.prussianBlue,
  },
  checkbox: {
    borderColor: colors?.prussianBlue,
  },
  checkedCheckboxImage: {
    tintColor: colors?.prussianBlue,
  },
  uncheckedCheckboxImage: {
    tintColor: colors?.transparent,
  },
  updateButtonContainer: {
    width: "auto",
    marginTop: moderateScale(40),
    marginHorizontal: moderateScale(19),
  },
  inputContainer: {
    backgroundColor: colors.transparent,
    width: "auto",
    borderColor: colors.polishedPine,
    marginTop: moderateScale(25),
    marginHorizontal: moderateScale(19),
  },
  inputText: {
    color: colors.prussianBlue,
  },
});
