import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import CommonInput from "../../../components/Inputs/commonInput";
import { strings } from "../../../constant/strings";
import colors from "../../../constant/colors";
import { styles } from "./styles";
import CommonSheetDroppDown from "../../../components/CommonDropDown/CommonSheetDroppDown";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import RadioSelection from "./RadioSelection";
import { singleSelectedByIndex } from "../../../constant/CustomHook/CommonFunctions";
import { imagePath } from "../../../assets/png/imagePath";
import AddMoreWithPlusDotted from "../../../components/Buttons/AddMoreWithPlusDotted";
import navigationString from "../../../navigation/navigationString";
import ImagePickerUI from "./ImagePickerUI";
import ImagePicker from "react-native-image-crop-picker";
import { fromNav } from "../../../constant/CommunityConstant";
import { groupPrivacy } from "./MockData";
import { useFocusEffect } from "@react-navigation/native";
import { imageLimit } from "../../../constant/appConstant";
import logger from "../../../constant/logger";

interface Props {
  imageUri?: any;
  setImageUri?: any;
  group?: any;
  setGroup?: any;
  categoryData?: any;
  category?: any;
  description?: any;
  setDescription?: any;
  setRules?: any;
  rules?: any;
  groupPrivacyOptions?: any;
  setPrivacy?: any;
  privacy?: any;
  setGroupPrivacyOptions?: any;
  selectedMembers?: any;
  navigation?: any;
  setCategory?: any;
  groupData?: any;
  isObjectEmpty?: any;
  addPress: () => void;
  setInputCategoryText: (val: string) => void;
  inputCategoryText: any;
  hideCategoryBox?: boolean;
}

const GroupCreateDetails: React.FC<Props> = ({
  imageUri,
  setImageUri,
  group,
  setGroup,
  categoryData,
  category,
  description,
  setDescription,
  setRules,
  rules,
  groupPrivacyOptions,
  setPrivacy,
  privacy,
  setGroupPrivacyOptions,
  selectedMembers,
  navigation,
  setCategory,
  groupData,
  isObjectEmpty,
  addPress,
  setInputCategoryText,
  inputCategoryText,
  hideCategoryBox,
}) => {
  const [filledWords, setFilledWords] = useState(0);
  const [showAddNewCateInput, setShowAddNewCateInput] = useState(false);
  const [textEntered, setTextEntered] = useState(false);
  const desMaxLen = 500;
  useFocusEffect(
    React.useCallback(() => {
      setShowAddNewCateInput(false);
    }, [])
  );

  useEffect(() => {
    setShowAddNewCateInput(false);
  }, [hideCategoryBox]);

  useEffect(() => {
    setGroupPrivacyOptions(getPrivacyUpdated);
    setFilledWords(description?.value?.length);
  }, []);
  const getPrivacyUpdated = () => {
    if (isObjectEmpty) {
      return groupPrivacy?.map((itm: any, idx: any) => {
        if (idx === 1) {
          return {
            ...itm,
            isSelected: true,
          };
        } else {
          return {
            ...itm,
            isSelected: false,
          };
        }
      });
    } else {
      return groupPrivacy?.map((itm: any, idx: any) => {
        if (itm?.title === groupData?.groupPrivacy) {
          return {
            ...itm,
            isSelected: true,
          };
        } else {
          return {
            ...itm,
            isSelected: false,
          };
        }
      });
    }
  };
  const onSelectImage = () => {
    ImagePicker.openPicker({
      width: imageLimit?.IMAGE_WIDTH,
      height: imageLimit?.IMAGE_HEIGHT,
      cropping: true,
      freeStyleCropEnabled: true,
    })

      .then((image) => {
        setImageUri({
          ...imageUri,
          value: image?.path,
          isError: false,
          errorMsg: "",
        });
      })
      .catch((err) => {});
  };
  const dataInput = (val: any) => {
    setDescription({
      ...description,
      value: val,
      isError: false,
      showErrorText: false,
      errorMsg: "",
    });
    setFilledWords(val.length);
    if (val?.length > desMaxLen) {
      setDescription({
        ...description,
        value: val,
        isError: true,
        errorMsg: strings?.Max_words,
      });
    }
  };

  return (
    <>
      <Text style={styles.title}>
        {isObjectEmpty
          ? "Start something meaningful"
          : strings?.updateGroupDetails}
      </Text>
      <Text style={styles.description}>
        {
          "Create a space to connect with others like you—share stories, offer support, and feel supported"
        }
      </Text>
      <View style={styles?.pickerView}>
        <ImagePickerUI
          source={
            imageUri?.value == ""
              ? imagePath.PersonIconSurf
              : { uri: imageUri?.value }
          }
          onPickerPress={() => onSelectImage()}
          image={{
            height:
              imageUri?.value == "" ? moderateScale(80) : moderateScale(122),
            width:
              imageUri?.value == "" ? moderateScale(52) : moderateScale(122),
          }}
          imageContainer={{
            borderColor: imageUri?.errorMsg
              ? colors?.royalOrange
              : colors?.polishedPine,
            borderWidth: imageUri?.errorMsg
              ? moderateScale(2)
              : moderateScale(1),
          }}
          errorMsg={imageUri?.errorMsg}
        />
      </View>

      <CommonInput
        placeholder={"Give your group a name"}
        placeholderTextColor={colors?.minGray}
        mainContainer={styles.inputContainer}
        inputText={styles.inputText}
        selectionColor={colors?.SurfCrest}
        isWidth={false}
        maxLength={20}
        value={group?.value}
        onChangeText={(text: string) =>
          setGroup({ ...group, value: text, isError: false, errorMsg: "" })
        }
        isError={group?.isError}
        errorMsg={group?.errorMsg}
      />

      {isObjectEmpty && (
        <>
          <CommonSheetDroppDown
            errMsg={""}
            placeholder={"Select a category"}
            value={""}
            dropDownListData={categoryData}
            containerStyle={{
              backgroundColor: colors.polishedPine,
            }}
            mainContainerStyle={{
              height: moderateScale(56),
              backgroundColor: colors?.transparent,
              borderColor: colors?.royalOrange,
              marginTop: moderateScale(15),
            }}
            selectedTextStyle={{
              color: colors?.SurfCrest,
            }}
            selectedItemData={(selectedItem: any, listData: any) => {
              if (selectedItem?.title === strings?.other) {
                setShowAddNewCateInput(true);
              } else {
                setShowAddNewCateInput(false);
              }
              setCategory({
                ...category,
                value: categoryData[selectedItem?.itmIndex]?.globalCodeId,
                isError: false,
                errorMsg: "",
              });
            }}
            iconColor={colors?.SurfCrest}
            placeholderStyle={{
              color: colors?.minGray,
            }}
          />
          {category?.isError && (
            <Text
              style={{
                color: colors?.royalOrange,
                marginHorizontal: moderateScale(8),
                fontSize: textScale(14),
              }}
            >
              {category?.errorMsg}
            </Text>
          )}
        </>
      )}
      {showAddNewCateInput && (
        <>
          <View style={styles.commonInputView}>
            <CommonInput
              placeholder={strings?.addYourOwnCategory}
              placeholderTextColor={colors?.minGray}
              mainContainer={{
                backgroundColor: colors?.transparent,
                width: moderateScale(250),
                borderColor: colors?.royalOrange,
                marginTop: moderateScale(0),
              }}
              inputText={styles.inputText}
              selectionColor={colors?.SurfCrest}
              isWidth={true}
              maxLength={20}
              value={inputCategoryText?.value}
              onChangeText={(text: string) => {
                if (text.length > 0) {
                  setTextEntered(true);
                } else {
                  setTextEntered(false);
                }
                setInputCategoryText({
                  ...inputCategoryText,
                  value: text,
                  isError: false,
                  errorMsg: "",
                });
              }}
            />
            <TouchableOpacity
              onPress={addPress}
              disabled={!textEntered}
              style={[
                styles?.addButtonView,
                {
                  backgroundColor: textEntered
                    ? colors?.polishedPine
                    : colors?.polishedPineOP2,
                },
              ]}
            >
              <Text
                style={{ fontSize: textScale(14), color: colors?.SurfCrest }}
              >
                {strings?.Add}
              </Text>
            </TouchableOpacity>
          </View>

          {inputCategoryText?.value == "" && (
            <Text style={styles.detailText}>
              {strings?.Enter_new_category_and_click_on_add_button}
            </Text>
          )}
          {inputCategoryText?.isError && (
            <Text style={styles.errorText}>*{inputCategoryText?.errorMsg}</Text>
          )}
        </>
      )}
      <CommonInput
        placeholderTextColor={colors?.minGray}
        placeholder={"What’s this group all about?"}
        textAlignVertical={"top"}
        wordCount={true}
        multiline={true}
        writeWords={filledWords}
        maxWords={desMaxLen}
        selectionColor={colors?.SurfCrest}
        writeWordsStyle={{
          color: colors?.SurfCrest,
        }}
        isWidth={false}
        maxLength={500}
        mainContainer={styles.inputContainerBig}
        inputText={styles.inputText}
        value={description?.value}
        onChangeText={(val: any) => dataInput(val)}
        errorMsg={description?.errorMsg}
        isError={description?.isError}
        backGroundColor={colors?.prussianBlue}
        borderColor={colors?.royalOrangeDark}
      />
      <CommonInput
        placeholder={"Any ground rules to follow?"}
        placeholderTextColor={colors?.minGray}
        mainContainer={styles.inputContainerBig2}
        inputText={styles.inputText}
        selectionColor={colors?.SurfCrest}
        textAlignVertical={"top"}
        multiline={true}
        isWidth={false}
        maxLength={500}
        value={rules?.value}
        onChangeText={(text: string) =>
          setRules({
            ...rules,
            value: text,
            isError: false,
            errorMsg: "",
          })
        }
        isError={rules?.isError}
        errorMsg={rules?.errorMsg}
      />

      <View style={styles.headerContainerLine}>
        <Text style={styles.headerText}>{strings?.groupPrivacy}</Text>
        <View style={styles.headerLine} />
      </View>
      <FlatList
        data={groupPrivacyOptions}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item, index }: any) => {
          return (
            <RadioSelection
              title={item?.title}
              description={item?.description}
              radioButtonInner={{
                backgroundColor: item?.isSelected
                  ? colors?.royalOrange
                  : colors?.transparent,
              }}
              onPress={() => {
                setPrivacy({
                  ...privacy,
                  value: item?.code,
                  isError: false,
                  errorMsg: "",
                });
                setGroupPrivacyOptions(
                  singleSelectedByIndex(groupPrivacyOptions, index)
                );
              }}
            />
          );
        }}
      />
      {privacy?.isError ? (
        <Text
          style={{
            color: colors?.royalOrange,
            marginHorizontal: moderateScale(0),
            fontSize: textScale(14),
            fontWeight: "400",
            marginBottom: moderateScale(20),
            marginTop: moderateScale(5),
          }}
        >
          {privacy?.errorMsg}
        </Text>
      ) : null}
      {selectedMembers?.length > 0 && (
        <>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.membersImageContainer}>
              {selectedMembers?.map((item: any, index: any) => (
                <View key={index}>
                  <Image
                    source={
                      item?.aliasProfilePicture
                        ? { uri: item?.aliasProfilePicture }
                        : imagePath?.Chakras
                    }
                    style={[
                      styles?.memberImage,
                      index > 0 && styles?.memberImageOverlap,
                    ]}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
          <Text style={styles?.memberStyle}>
            {strings?.Total_selected_members}
            {selectedMembers?.length}
          </Text>
        </>
      )}
      <View style={{ marginBottom: moderateScale(15) }} />
      {isObjectEmpty && (
        <AddMoreWithPlusDotted
          onPress={() => {
            navigation?.navigate(navigationString?.AddMembersInGroup, {
              from: fromNav?.create_Group,
              groupId: 0,
            });
          }}
          mainContainer={styles.addMembersButtonContainer}
          title={strings?.addMembers}
          titleStyle={styles.addMembersButtonTitle}
          iconStyle={styles.addMembersButtonIcon}
        />
      )}
    </>
  );
};

export default GroupCreateDetails;
