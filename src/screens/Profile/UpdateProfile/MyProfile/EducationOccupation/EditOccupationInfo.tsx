import { Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";
import CommonInput from "../../../../../components/Inputs/commonInput";
import UpdateCancelBtn from "../UpdateCancelBtn";
import { getDrodownData, getGlobalStringValue } from "../PersonalInfo/helper";
import { strings } from "../../../../../constant/strings";
import CommonSheetDroppDown from "../../../../../components/CommonDropDown/CommonSheetDroppDown";
import { formatSentenceCase } from "../../../../../helper/sentenceCase";
const EditOccupationInfo = ({
  onPressUpdate,
  onPresCancel,
  userData,
  setIsEdited,
}: any) => {
  const [formData, setFormData] = useState([
    {
      title: "Select your current work status",
      // title: "Employment Status",
      value: getGlobalStringValue(
        "EmploymentStatus",
        userData?.employmentStatusId
      ),
      type: "dropdown",
      otherValue: "",
      globalCodeId: userData?.employmentStatusId,
      dropdownData: getDrodownData("EmploymentStatus"),
      key: "employmentStatusId",
    },
    {
      title: "Employment Status other",
      value: userData?.otherEmploymentStatus,
      type: "input",
      key: "otherEmploymentStatus",
      hideField:
        getGlobalStringValue(
          "EmploymentStatus",
          userData?.employmentStatusId
        ) != "Other",
    },
    {
      title: "What do you do?",
      // title: "Occupation",
      value: userData?.occupation,
      type: "input",
      key: "occupation",
    },
    {
      title: "Choose your field of work",
      // title: "Industry",
      value: getGlobalStringValue("Industry", userData?.industryId),
      otherValue: "",
      type: "dropdown",
      globalCodeId: userData?.industryId,
      dropdownData: getDrodownData("Industry"),
      key: "industryId",
    },
    {
      title: "Industry other",
      value: userData?.otherIndustry,
      type: "input",
      key: "otherIndustry",
      hideField:
        getGlobalStringValue("Industry", userData?.industryId) != "Other",
    },

    {
      title: "Tell us about your work setting",
      // title: "Work Environment",
      value: getGlobalStringValue(
        "WorkEnvironment",
        userData?.workEnvironmentId
      ),
      otherValue: "",
      type: "dropdown",
      globalCodeId: userData?.workEnvironmentId,
      dropdownData: getDrodownData("WorkEnvironment"),
      key: "workEnvironmentId",
    },
    {
      title: "Work Environment other",
      value: userData?.otherWorkEnvironment,
      type: "input",
      key: "otherWorkEnvironment",
      hideField:
        getGlobalStringValue("WorkEnvironment", userData?.workEnvironmentId) !=
        "Other",
    },
  ]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginHorizontal: moderateScale(19) }}
    >
      <Text style={styles.textBasicInfo}>{strings.OccupationInfo}</Text>
      {formData.map((elem, index) => {
        if (elem.hideField) return null;
        if (elem.type == "dropdown")
          return (
            <>
              <CommonSheetDroppDown
                errMsg={""}
                value={elem.value}
                placeholder={formatSentenceCase(elem?.title)}
                containerStyle={{
                  backgroundColor: colors.polishedPine,
                }}
                dropDownListData={elem?.dropdownData}
                selectedItemData={(selectedItem: any) => {
                  setIsEdited(true);
                  let data: any = [...formData];
                  data[index].value = selectedItem.title;
                  data[index].globalCodeId = selectedItem.id;
                  data[index + 1].hideField = selectedItem.title != "Other";
                  setFormData(data);
                }}
                invertColor={true}
              />
            </>
          );
        return (
          <CommonInput
            isWidth={false}
            placeholder={formatSentenceCase(elem.title)}
            inputText={{
              color: colors?.prussianBlue,
            }}
            placeholderTextColor={colors?.prussianBlue}
            value={elem.value}
            mainContainer={{}}
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
        onPressUpdate={() => onPressUpdate(formData)}
        onPresCancel={() => onPresCancel()}
        updateButtonLabel="Save my info"
        cancelButtonLabel="Cancel"
      />
    </KeyboardAvoidingView>
  );
};

export default EditOccupationInfo;

const styles = StyleSheet.create({
  textBasicInfo: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "600",
    marginTop: moderateScale(15),
    marginBottom: moderateScale(5),
  },
  dropDownView: {
    paddingTop: moderateScale(15),
    zIndex: 1000,
    alignSelf: "center",
  },
});
