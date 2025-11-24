import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { moderateScale } from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";
import CommonInput from "../../../../../components/Inputs/commonInput";
import { strings } from "../../../../../constant/strings";
import UpdateCancelBtn from "../UpdateCancelBtn";
import CommonEditHeader from "../CommonEditHeader";
import { getDrodownData, getGlobalStringValue, getUserName } from "./helper";
import {
  validateAge,
  validateName,
  validateNumberOfChildren,
} from "../../../../../validations/validation";
import CommonSheetDroppDown from "../../../../../components/CommonDropDown/CommonSheetDroppDown";
import { backgrounColor } from "../../../../../constant/ProfileConstant";
import { formatSentenceCase } from "../../../../../helper/sentenceCase";
import logger from "../../../../../constant/logger";

const EditBasicInfo = ({
  onPressUpdate,
  onPresCancel,
  userData,
  setIsEdited,
}: any) => {
  const [age, setAge] = useState(userData?.age ? `${userData?.age}` : "");
  const [gender, setGender] = useState<any>(
    userData?.gender ? userData?.gender : ""
  );
  const [genderOtherValue, setGenderOtherValue] = useState(
    userData?.otherGender ? userData?.otherGender : ""
  );
  const [userName, setUserName] = useState(getUserName(userData));
  const [nameError, setNameError] = useState(false);
  const [nameErrMsg, setNameErrMsg] = useState("");
  const [formData, setFormData] = useState<any>([
    {
      title: "Choose how you identify",
      // title: "Sexual Orientation",
      value: getGlobalStringValue(
        "SexualOrientation",
        userData?.sexualOrientation
      ),
      type: "dropdown",
      key: "sexualOrientation",
      otherValue: userData?.otherSexualOrientation,
      globalCodeId: userData?.sexualOrientation,
      dropdownData: getDrodownData("SexualOrientation"),
    },
    {
      title: "Sexual Orientation other",
      value: userData?.otherSexualOrientation,
      type: "input",
      key: "otherSexualOrientation",
      hideField:
        getGlobalStringValue(
          "sexualOrientation",
          userData?.sexualOrientation
        ) != "Other",
    },
    {
      title: "Where are you based?",
      value: userData?.location,
      type: "input",
      key: "location",
    },
    {
      title: "Select your ethnicity",
      // title: "Choose what best describes you",
      value: userData?.ethnicity
        ?.map((elem: any) => {
          return elem.ethnicityTypeText;
        })
        .toString(),
      // value: getGlobalStringValue("Ethnicity", userData?.ethnicity),
      type: "dropdown",
      otherValue: "",
      dropdownData: getDrodownData("Ethnicity"),
      ethnicityOther: userData?.ethnicity?.find((elem: any) => {
        return elem.ethnicityOther != "";
      })?.ethnicityOther,
      key: "ethnicity",
    },
    {
      title: "Add your religion (optional)",
      value: getGlobalStringValue("Religion", userData?.religion),
      type: "dropdown",
      otherValue: "",
      dropdownData: getDrodownData("Religion"),
      globalCodeId: userData?.religion,
      key: "religion",
    },
    {
      title: "Religion other",
      value: userData?.otherReligion,
      type: "input",
      key: "otherReligion",
      hideField:
        getGlobalStringValue("religion", userData?.religion) != "Other",
    },
    {
      title: "Choose your pronouns (e.g., she/her)",
      // title: "Preferred Pronouns",
      value: getGlobalStringValue(
        "preferredPronouns",
        userData?.preferredPronouns
      ),
      type: "dropdown",
      otherValue: "",
      dropdownData: getDrodownData("PreferredPronouns"),
      globalCodeId: userData?.preferredPronouns,
      key: "preferredPronouns",
    },
    {
      title: "Preferred Pronouns other",
      value: userData?.otherPreferredPronouns,
      type: "input",
      key: "otherPreferredPronouns",
      hideField:
        getGlobalStringValue(
          "preferredPronouns",
          userData?.preferredPronouns
        ) != "Other",
    },

    {
      title: "Pick your preferred language",
      value: getGlobalStringValue(
        "preferredLanguage",
        userData?.preferredLanguage
      ),
      type: "dropdown",
      otherValue: "",
      globalCodeId: userData?.preferredLanguage,
      dropdownData: getDrodownData("PreferredLanguage"),
      key: "PreferredLanguage",
    },
    {
      title: "Preferred Language other",
      value: userData?.otherPreferredLanguage,
      type: "input",
      key: "otherPreferredLanguage",
      hideField:
        getGlobalStringValue(
          "PreferredLanguage",
          userData?.preferredLanguage
        ) != "Other",
    },
  ]);

  const tapOnUpdate = () => {
    onPressUpdate(
      formData
        .concat({
          key: "gender",
          value: gender,
          dropdownData: [],
        })
        .concat({
          key: "age",
          value: Number(age),
        })
        .concat({
          key: "firstName",
          value: userName,
        })
        .concat({
          key: "height",
          value: "",
        })
        .concat({
          key: "weight",
          value: "",
        })
        .concat({
          key: "lastName",
          value: "",
        })
        .concat({
          key: "city",
          value: "",
        })
    );
  };

  const renderInput = (elem: any, isMultiSelected: boolean, index: number) => {
    if (!isMultiSelected) return null; // don't show in case of singleSelection.
    let isOtherSelected = elem.dropdownData.some(
      (item: any) => item.title == "Other" && item.isSelected == true
    ); // Check if dropdownData other isSelected.
    if (!isOtherSelected) return null; // don't show in case of no other selected.
    return (
      <CommonInput
        isWidth={false}
        placeholder={elem?.title}
        inputText={{
          color: colors?.prussianBlue,
        }}
        value={elem?.ethnicityOther}
        mainContainer={{}}
        onChangeText={(value: any) => {
          setIsEdited(true);
          let data = [...formData];
          data[index].ethnicityOther = value;
          setFormData(data);
        }}
      />
    );
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginHorizontal: moderateScale(19) }}
    >
      <CommonEditHeader title={"About you"} />
      {/* <CommonEditHeader title={strings?.basicInfo} /> */}
      <CommonInput
        isWidth={false}
        placeholder={"What should we call you?"}
        inputText={{
          color: colors?.prussianBlue,
        }}
        // pop_upText={"Name"}
        // isDrop
        // pop_upTextStyle={{ color: colors?.prussianBlue }}
        isfocusedRequired={true}
        placeholderTextColor={colors?.grey}
        mainContainer={{}}
        value={userName}
        maxLength={40}
        onChangeText={(val: any) => {
          setIsEdited(true);
          setNameError(false);

          if (val.length > 0 && validateNumberOfChildren(val)) {
            setUserName(val);
          } else if (val.length === 0) {
            setUserName("");
          }
        }}
        isError={nameError}
        errorMsg={nameErrMsg}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CommonInput
          placeholder={"What's your age"}
          inputText={{
            color: colors?.prussianBlue,
          }}
          mainContainer={{
            width: moderateScale(130),
          }}
          pop_upText={"Age"}
          isDrop
          isfocusedRequired={true}
          placeholderTextColor={colors?.prussianBlue}
          value={age}
          onChangeText={(val: any) => {
            setIsEdited(true);
            if (validateAge(val)) {
              setAge(val);
            } else {
              setAge("");
            }
          }}
          keyboardType={"number-pad"}
        />
        <CommonSheetDroppDown
          mainContainerStyle={{
            backgroundColor: colors.lightSurfCrest,
            width: moderateScale(200),
          }}
          containerStyle={{
            backgroundColor: colors.polishedPine,
          }}
          placeholder={"How do you identify?"}
          errMsg={""}
          value={getGlobalStringValue("gender", gender)} //dropdownData for profile section
          dropDownListData={getDrodownData("Gender")}
          selectedItemData={(val: any) => {
            setIsEdited(true);
            setGender(val.id);
          }}
          invertColor={true}
        />
      </View>
      {getGlobalStringValue("gender", gender) === "Other" ? (
        <CommonInput
          isWidth={false}
          value={genderOtherValue}
          placeholder={"Gender Other"}
          inputText={{
            color: colors?.prussianBlue,
          }}
          placeholderTextColor={colors?.prussianBlue}
          mainContainer={{ alignSelf: "center" }}
          onChangeText={(value: string) => {
            setIsEdited(true);
            setGenderOtherValue(value);
          }}
        />
      ) : null}
      {formData.map((elem: any, index: number) => {
        let isMultiSelected = elem.title == "Select your ethnicity";
        if (elem.hideField == true) return;
        if (elem.type == "dropdown")
          return (
            <>
              <CommonSheetDroppDown
                errMsg={""}
                multiSelected={isMultiSelected}
                placeholder={elem?.title}
                // placeholder={formatSentenceCase(elem?.title)}
                value={elem.value}
                dropDownListData={elem?.dropdownData}
                containerStyle={{
                  backgroundColor: colors.polishedPine,
                }}
                selectedItemData={(selectedItem: any, listData: any) => {
                  setIsEdited(true);
                  let data: any = [...formData];
                  data[index].value = selectedItem.title;
                  if (isMultiSelected) {
                    data[index].dropdownData = listData;
                  }
                  data[index].globalCodeId = selectedItem?.id;
                  if (!isMultiSelected) {
                    data[index + 1].hideField = selectedItem.title != "Other";
                  }
                  setFormData(data);
                }}
                invertColor={true}
              />

              {renderInput(elem, isMultiSelected, index)}
            </>
          );
        return (
          <CommonInput
            isWidth={false}
            placeholder={elem?.title}
            inputText={{
              color: colors?.prussianBlue,
            }}
            pop_upText={elem?.title}
            isDrop
            isfocusedRequired={true}
            value={elem?.value}
            mainContainer={{}}
            placeholderTextColor={colors?.prussianBlue}
            onChangeText={(value: any) => {
              setIsEdited(true);
              let data = [...formData];
              data[index].value = value;
              setFormData(data);
            }}
          />
        );
      })}
      <UpdateCancelBtn
        updateButtonLabel="Save my info"
        onPressUpdate={() => {
          if (userName == "") {
            setNameError(true);
            setNameErrMsg("Please Enter Name");
          } else {
            tapOnUpdate();
          }
        }}
        onPresCancel={() => onPresCancel()}
        cancelButtonLabel="Cancel"
      />
    </KeyboardAvoidingView>
  );
};

export default EditBasicInfo;

const styles = StyleSheet.create({
  imageContainer: {
    width: moderateScale(136),
    height: moderateScale(136),
    borderRadius: moderateScale(15),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors?.royalOrange,
  },
  topView: { flexDirection: "row" },
  imageContainer1: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(15),
  },
  image: {
    width: "95%",
    height: "95%",
    borderRadius: moderateScale(13),
  },
  imgArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  touchStyle: {
    height: moderateScale(30),
    width: moderateScale(30),
    position: "absolute",
    left: moderateScale(40),
  },
});
