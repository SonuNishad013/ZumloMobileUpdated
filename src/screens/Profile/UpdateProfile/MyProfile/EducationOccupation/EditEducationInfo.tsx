import { Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";
import CommonInput from "../../../../../components/Inputs/commonInput";
import { strings } from "../../../../../constant/strings";
import UpdateCancelBtn from "../UpdateCancelBtn";
import { getDrodownData, getGlobalStringValue } from "../PersonalInfo/helper";
import CommonSheetDroppDown from "../../../../../components/CommonDropDown/CommonSheetDroppDown";

const EditEducationInfo = ({
  onPressUpdate,
  onPresCancel,
  userData,
  setIsEdited,
}: any) => {
  const [formData, setFormData] = useState([
    {
      // title: "Highest Level of Education",
      title: "Select your education level",
      value: getGlobalStringValue(
        "HighestLevelofEducation",
        userData?.highestLevelOfEducationId
      ),
      otherValue: "",
      type: "dropdown",
      globalCodeId: userData?.highestLevelOfEducationId,
      dropdownData: getDrodownData("HighestLevelofEducation"),
      key: "highestLevelOfEducationId",
    },
    {
      title: "Highest Level of Education other",
      value: userData?.otherHighestLevelOfEducation,
      type: "input",
      key: "otherHighestLevelOfEducation",
      hideField:
        getGlobalStringValue(
          "HighestLevelofEducation",
          userData?.highestLevelOfEducationId
        ) != "Other",
    },
    {
      title: "What did you study?",
      // title: "Study",
      value: userData?.fieldOfStudy,
      type: "input",
      key: "fieldOfStudy",
    },
  ]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginHorizontal: moderateScale(19) }}
    >
      <Text style={styles.textBasicInfo}>{strings?.EducationInfo}</Text>
      {formData.map((elem, index) => {
        if (elem.hideField) return null;
        if (elem.type == "dropdown")
          return (
            <>
              <CommonSheetDroppDown
                errMsg={""}
                value={elem.value}
                placeholder={elem?.title}
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
            placeholder={elem.title}
            inputText={{
              color: colors?.prussianBlue,
            }}
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
        onPressUpdate={() => onPressUpdate(formData)}
        onPresCancel={() => onPresCancel()}
        updateButtonLabel="Save my info"
        cancelButtonLabel="Cancel"
      />
    </KeyboardAvoidingView>
  );
};

export default EditEducationInfo;

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
