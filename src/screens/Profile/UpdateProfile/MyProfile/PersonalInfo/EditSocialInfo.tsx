import { StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import React, { useState } from "react";
import {
  moderateScale,
  textScale,
  width,
} from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";
import CommonInput from "../../../../../components/Inputs/commonInput";
import { strings } from "../../../../../constant/strings";
import BottomDropDown from "../../../../../components/BottomSheet/CommonBottomSheet";
import UpdateCancelBtn from "../UpdateCancelBtn";
import CommonEditHeader from "../CommonEditHeader";
import { getDrodownData, getGlobalStringValue } from "./helper";
import CommonSheetDroppDown from "../../../../../components/CommonDropDown/CommonSheetDroppDown";
import { formatSentenceCase } from "../../../../../helper/sentenceCase";
const EditSocialInfo = ({
  onPressUpdate,
  onPresCancel,
  userData,
  setIsEdited,
  setToasterDetails,
}: any) => {
  const [formData, setFormData] = useState([
    {
      // title: "Relationship Status",
      title: "Select your relationship status",
      value: getGlobalStringValue(
        "RelationshipStatus",
        userData?.relationshipStatusId
      ),
      otherValue: userData?.otherRelationshipStatus,
      type: "dropdown",
      key: "relationshipStatusId",
      globalCodeId: userData?.relationshipStatusId,
      dropdownData: getDrodownData("RelationshipStatus"),
    },
    {
      title: "Relationship Status other",
      value: userData?.otherRelationshipStatus,
      type: "input",
      key: "otherRelationshipStatus",
      hideField:
        getGlobalStringValue(
          "RelationshipStatus",
          userData?.relationshipStatusId
        ) != "Other",
    },

    {
      title: "Enter number of children (if any)",
      // title: "Number of Children",
      value: userData?.numberOfChildren ? `${userData?.numberOfChildren}` : 0,
      type: "input",
      key: "numberOfChildren",
    },
    {
      title: "Choose your current living situation",
      // title: "Living Situation",
      value: getGlobalStringValue(
        "LivingSituation",
        userData?.livingSituationId
      ),
      otherValue: "",
      type: "dropdown",
      key: "livingSituationId",
      globalCodeId: userData?.livingSituationId,
      dropdownData: getDrodownData("LivingSituation"),
    },
    {
      title: "Living Situation other",
      value: userData?.otherRelationshipStatus,
      type: "input",
      key: "otherLivingSituation",
      hideField:
        getGlobalStringValue("LivingSituation", userData?.livingSituationId) !=
        "Other",
    },
  ]);

  const isBlank = (value: any) => {
    console.log("567890--->", value);
    if (value == "") {
      return 0;
    } else {
      return value;
    }
  };
  const [numChild, setnumChild] = useState<string>("0");
  const onSaveChildNumber = (text: any, elem: any, index: any) => {
    console.log("first----text->", text);
    console.log("first----elem->", elem);
    console.log("first----index->", index);

    // setnumChild(text);
    let data = [...formData];
    console.log(
      "text's value ",
      text,
      typeof text,
      text.length === 1 && text === "0"
    );
    if (text.length === 1 && text === "0") {
      console.log(
        "onSaveChildNumber in case when user enter zero number of children",
        text
      );
      setnumChild(text);
      data[index].value = "";
      setFormData(data);
      return;
    }
    if (text === "") {
      setnumChild("1");
      console.log("onSaveChildNumber elem in empty string ", text);
      if (elem?.title === "Enter number of children (if any)") {
        data[index].value = text === "" ? 0 : text;
        setFormData(data);
      }
    }
    if (/^(?:[1-9]|1[0-5])?$/.test(text)) {
      setnumChild("0");
      console.log("onSaveChildNumber elem", text);
      if (elem?.title === "Enter number of children (if any)") {
        data[index].value = text === "" ? 0 : text;
        setFormData(data);
      }
    } else {
      console.log("onSaveChildNumber Text in special condition", text);
      setnumChild("0");
      if (elem?.title === "Enter number of children (if any)") {
        data[index].value = "";
        setFormData(data);
        return;
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles?.keyBoard}>
      <CommonEditHeader title={"Your social circle "} />
      {formData.map((elem, index) => {
        if (elem.hideField) return null;
        if (elem.type == "dropdown")
          return (
            <>
              <CommonSheetDroppDown
                errMsg={""}
                value={elem.value}
                placeholder={elem?.title}
                dropDownListData={elem?.dropdownData}
                containerStyle={{
                  backgroundColor: colors.polishedPine,
                }}
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
            placeholder={formatSentenceCase(elem?.title)}
            inputText={{
              color: colors?.prussianBlue,
            }}
            placeholderTextColor={colors?.prussianBlue}
            // pop_upText={formatSentenceCase(elem?.title)}
            // isDrop
            maxLength={
              elem?.title == "Enter number of children (if any)" ? 2 : null
            }
            isfocusedRequired={true}
            value={elem.value}
            mainContainer={{}}
            onChangeText={(value: string) => {
              onSaveChildNumber(value, elem, index);
            }}
            keyboardType={
              elem?.title == "Enter number of children (if any)"
                ? "number-pad"
                : ""
            }
          />
        );
      })}

      <UpdateCancelBtn
        onPressUpdate={() => {
          console.log(
            "/[^0-9]/.test(numChild?.trim())",
            /[^0-9]/.test(numChild?.trim()),
            numChild?.trim() === "",
            JSON.stringify(numChild),
            JSON.stringify(numChild?.trim())
          );
          if (/[^0-9]/.test(numChild?.trim()) || numChild?.trim() === "") {
            setToasterDetails({
              showToast: true,
              code: 0,
              message:
                "Invalid input. Please enter numbers only. Special characters, letters, or spaces are not allowed.",
            });
          } else {
            onPressUpdate(formData);
          }
        }}
        onPresCancel={() => onPresCancel()}
        cancelButtonLabel="Cancel"
        updateButtonLabel="Save my info"
      />
    </KeyboardAvoidingView>
  );
};

export default EditSocialInfo;

const styles = StyleSheet.create({
  textBasicInfo: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "600",
  },
  dropDownView: {
    paddingTop: moderateScale(15),
    zIndex: 1000,
    alignSelf: "center",
  },
  keyBoard: { flex: 1, marginHorizontal: moderateScale(19) },
});
