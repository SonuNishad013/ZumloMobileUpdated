import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { removedMedicalHistorySubHeading } from "../../../../../../constant/ProfileConstant";
import QuestionDescription from "../../../../../../components/OnBoardiingComponents/QuestionDescription";
import {
  alertTypes,
  fieldType,
} from "../../../../../../constant/AllGlobalNameConstant";
import {
  moderateScale,
  textScale,
  width,
} from "../../../../../../constant/responsiveStyle";
import { strings } from "../../../../../../constant/strings";
import colors from "../../../../../../constant/colors";
import {
  validateName,
  validateNumberOfChildren,
} from "../../../../../../validations/validation";
import AddButton from "../../../../../OnBoarding/WellnessPlan/ReGenerateWellnessPlan/AddButton";
import CommonButton from "../../../../../../components/Buttons/commonButton";
import Global from "../../../../../../global";
import {
  convertToJSONString,
  parseJSONString,
  updateAnswerRequest,
} from "../../../../../../helper/FormHelpers";
import { formatSentenceCase } from "../../../../../../helper/sentenceCase";
import CommonInput from "../../../../../../components/Inputs/commonInput";
import { AlertCircle, DeleteIcon } from "../../../../../../assets";
import AlertModal from "../../../../../../components/Alerts/AlertModal";
import logger from "../../../../../../constant/logger";
import { findValueByKey } from "../../../../../Dashboard/Summary/component/Hooks/transformGoalsFromAPI";

interface Props {
  questions?: any;
  updatedAnswer?: any;
  questionIdx?: any;
  setQuestionIdx?: any;
  isLoading?: boolean;
}

const FamilyMembersUI: React.FC<Props> = ({
  questions,
  updatedAnswer,
  questionIdx,
  setQuestionIdx,
  isLoading,
}) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (questions !== data) {
      setData(questions);
    }
  }, [questions]);

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [modalData, setModalData] = useState({
    type: "",
    confirmButtonPress: () => {},
    cancelButtonPress: () => {},
    AlertIcon: AlertCircle,
    isAlertIcon: false,
  });
  const hasEmptyStringsInArray = (arr: Record<string, any>[]): boolean => {
    return arr.some((obj) => Object.values(obj).some((value) => value === ""));
  };

  const onPressNext = () => {
    updatedAnswer(updateAnswerRequest(data));
    return;
    logger("updatedAnswer_______familymembers", {
      data,
      answerData: updateAnswerRequest(data),
    });

    const rawData: any = data?.find(
      (item: any) => item?.fieldType === "JsonText"
    );
    const valueInOther = findValueByKey(rawData, "other");
    if (valueInOther === "") {
      updatedAnswer(updateAnswerRequest(data));
    }
    if (valueInOther !== "" && Array.isArray(JSON.parse(valueInOther))) {
      if (hasEmptyStringsInArray(JSON.parse(valueInOther))) {
        Alert?.alert("Got array", "User haven't filled any data");
      } else {
        updatedAnswer(updateAnswerRequest(data));
      }
    } else {
      Alert?.alert("Got issue", "User haven't filled any data");
    }
  };

  const handleDeleteItem = (itemIdx: number, index: number) => {
    const updatedData = [...data];
    const parsedOtherData = parseJSONString(updatedData[itemIdx].other);
    parsedOtherData.splice(index, 1);
    updatedData[itemIdx].other = convertToJSONString(parsedOtherData);
    setData(updatedData);
  };

  const renderQuestionUI = (itemIdx: any) => {
    const type = data[itemIdx]?.fieldType;
    switch (type) {
      case fieldType?.jsonText:
        const parsedData = parseJSONString(data[itemIdx]?.other);
        let parseStoreData = [...parsedData];

        return (
          <View>
            <FlatList
              data={parseStoreData}
              keyExtractor={(item, index) => "key" + index}
              renderItem={({ item, index }: any) => (
                <>
                  <View style={styles.itemContainer}>
                    <Text style={styles.familyMemberText}>
                      {"Family member (" + (index + 1) + ")"}
                    </Text>
                    <View style={styles.separator} />

                    <TouchableOpacity
                      onPress={() => handleDeleteItem(itemIdx, index)}
                      style={styles.deleteIconContainer}
                    >
                      <DeleteIcon />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <CommonInput
                      value={item?.name}
                      mainContainer={styles.inputContainer}
                      placeholderTextColor={colors?.grey}
                      inputText={styles.inputText}
                      placeholder={"Name"}
                      isWidth={false}
                      onChangeText={(val: any) => {
                        console.log("validateName", val, val?.length);
                        const updateData = (newName: string) => {
                          const updatedData = [...data];
                          const parsedOtherData = parseJSONString(
                            updatedData[itemIdx].other
                          );
                          parsedOtherData[index].name = newName;
                          updatedData[itemIdx].other =
                            convertToJSONString(parsedOtherData);
                          setData(updatedData);
                        };
                        if (val.length > 0 && validateNumberOfChildren(val)) {
                          updateData(val);
                        } else if (val.length === 0) {
                          updateData("");
                        }
                      }}
                    />
                    <CommonInput
                      value={item?.relationship}
                      mainContainer={styles.inputContainer}
                      placeholderTextColor={colors?.grey}
                      inputText={styles.inputText}
                      placeholder={"Relationship"}
                      isWidth={false}
                      onChangeText={(val: any) => {
                        console.log("validateName", val, val?.length);
                        const updateData = (newName: string) => {
                          const updatedData = [...data];
                          const parsedOtherData = parseJSONString(
                            updatedData[itemIdx].other
                          );
                          parsedOtherData[index].relationship = newName;
                          updatedData[itemIdx].other =
                            convertToJSONString(parsedOtherData);
                          setData(updatedData);
                        };
                        if (val.length > 0 && validateNumberOfChildren(val)) {
                          updateData(val);
                        } else if (val.length === 0) {
                          updateData("");
                        }
                      }}
                    />
                  </View>
                </>
              )}
              ListFooterComponent={() => (
                <AddButton
                  containerStyle={styles.addButtonContainer}
                  txt={
                    parseJSONString(data[itemIdx].other).length == 0
                      ? "Add"
                      : strings?.addMore
                  }
                  textStyle={styles.addButtonText}
                  tintColor={colors?.royalOrange}
                  onPress={() => {
                    const updatedData = [...data];
                    const parsedOtherData = parseJSONString(
                      updatedData[itemIdx].other
                    );
                    const lastEntry =
                      parsedOtherData[parsedOtherData.length - 1];
                    if (parsedOtherData?.length == 0) {
                      parsedOtherData.push({ name: "", relationship: "" });
                      updatedData[itemIdx].other =
                        convertToJSONString(parsedOtherData);
                      setData(updatedData);
                    } else {
                      if (lastEntry?.name || lastEntry?.relationship) {
                        parsedOtherData.push({ name: "", relationship: "" });
                        updatedData[itemIdx].other =
                          convertToJSONString(parsedOtherData);
                        setData(updatedData);
                      } else {
                        // Alert.alert(
                        //   "Please fill in both the Name and Relationship fields before adding a new entry."
                        // );
                        setAlertVisible(true);
                        setModalData({
                          ...modalData,
                          type: alertTypes?.familyMemberInfo,
                          confirmButtonPress: () => {
                            setAlertVisible(false);
                            // navigation?.navigate(navigationString?.DeleteAccount, {
                            //   userLoginType,
                            //   userData,
                            // });
                          },
                        });
                      }
                    }
                  }}
                />
              )}
            />
          </View>
        );

      default:
        return <Text>UI Not Found</Text>;
    }
  };

  return (
    <View>
      {!removedMedicalHistorySubHeading?.includes(
        data[questionIdx]?.stepName
      ) && (
        <>
          <QuestionDescription
            stepDescription={formatSentenceCase(
              data[questionIdx]?.stepDescription
            )}
            placeholder={formatSentenceCase(data[questionIdx]?.placeholder)}
          />
          {renderQuestionUI(questionIdx)}
          <CommonButton
            onPress={onPressNext}
            isLoading={isLoading}
            btnName={
              questionIdx === data.length - 1 ? strings?.submit : strings?.NEXT
            }
            mainContainer={styles.commonButtonContainer}
          />

          <AlertModal
            isVisible={isAlertVisible}
            type={modalData?.type}
            isAlertIcon={modalData?.isAlertIcon}
            AlertIcon={modalData?.AlertIcon}
            hideAlert={() => setAlertVisible(false)}
            onConfirm={modalData?.confirmButtonPress}
            onCancel={() => setAlertVisible(false)}
          />
        </>
      )}
    </View>
  );
};

export default FamilyMembersUI;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: moderateScale(20),
  },
  familyMemberText: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "600",
    marginLeft: moderateScale(19),
  },
  separator: {
    height: moderateScale(0.5),
    backgroundColor: colors?.SurfCrest,
    flex: 1,
    marginHorizontal: moderateScale(10),
  },
  deleteIconContainer: {
    marginRight: moderateScale(20),
  },
  inputContainer: {
    width: "auto",
    backgroundColor: colors?.transparent,
    borderColor: colors?.SurfCrest,
    marginHorizontal: moderateScale(19),
  },
  inputText: {
    color: colors?.SurfCrest,
    width: "100%",
  },
  addButtonContainer: {
    width: "auto",
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(19),
    backgroundColor: colors?.transparent,
    borderColor: colors?.royalOrange,
  },
  addButtonText: {
    color: colors?.royalOrange,
  },
  commonButtonContainer: {
    width: "auto",
    height: moderateScale(56),
    marginTop: moderateScale(40),
    marginHorizontal: moderateScale(19),
  },
});

///Users/nishad/Documents/GitHub/ZumloMobile/src/screens/Profile/UserFormData/CategoryQuestionData/SpecificItemShowUI/FamilyMembers
