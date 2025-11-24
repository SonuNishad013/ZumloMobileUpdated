import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TextInput, StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import { styles } from "./styles";
import AnswerTitle from "./AnswerTitle";
import CommonButton from "../../../../components/Buttons/commonButton";
import AddButton from "../../../Profile/GoalsAndAspiration/AddButton";
import TextInputStretch from "../../../../components/OnBoardiingComponents/TextInputStretch";

const InitialFeedback = ({
  title,
  onPress,
  quesData,
  isNewScreen,
  isOtherBtnRequire = true,
  currentIndex,
  regenerationStepTypeId,
}: any) => {
  const [allOptions, setAllOptions] = useState(quesData);
  const [isNewAddedSpec, setIsNewAddedSpec] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [otherData, setotherData] = useState(
    quesData.filter((item: any) => item.title == "Other")
  );
  useEffect(() => {
    setotherData(quesData.filter((item: any) => item.title == "Other"));
    if (isNewScreen) {
      setAllOptions(quesData.filter((item: any) => item.title !== "Other"));
    }
  }, [quesData, isNewScreen]);
  // useEffect(())
  const onActivitySelection = (item: any) => {
    let arr = quesData.filter((item: any) => item.title !== "Other");
    const updatedArray = arr.map((val: any) =>
      val.stepOptionId === item.stepOptionId
        ? { ...val, isSelected: !val.isSelected }
        : { ...val, isSelected: false }
    );
    setCurrentInputValue("");
    setIsNewAddedSpec(false);
    setAllOptions(updatedArray);
  };

  const onAddNew = (item: any) => {
    console.log("item", item);

    setIsNewAddedSpec(true);
    const newObj = {
      logo: item.logo !== null && item.logo,
      optionLabel: item.optionLabel !== null && item.optionLabel,
      optionOrder: item.optionOrder !== null && item.optionOrder,
      stepOptionId: item.stepOptionId !== null && item.stepOptionId,
      title: item.title,
      isNewSpecification: true,
      isSelected: false,
    };
    setAllOptions((prev: any) => [
      ...prev.map((val: any) => ({ ...val, isSelected: false })),
      newObj,
    ]);
  };

  const onChangeNewSpec = (text: any) => {
    const filteredText = text.replace(/[^a-zA-Z\s]/g, "");
    setCurrentInputValue(filteredText);
    setAllOptions((prev: any) =>
      prev.map((item: any) =>
        item.isNewSpecification
          ? {
              ...item,
              title: filteredText,
              isSelected: filteredText.trim() !== "",
            }
          : item
      )
    );
  };
  const onNext = (allData: any) => {
    let arr = allData.filter((item: any) => item.isNewSpecification);
    if (arr.length > 0) {
      let selectedData = arr.filter((item: any) => item.isSelected);
      let selectedAnswerID = selectedData.map((item: any) => item.stepOptionId);
      onPress(
        regenerationStepTypeId, //questionId
        selectedAnswerID, //answerId
        true, //if other value entered
        currentInputValue, //answer Value
        currentIndex //currentIndx
      );
    } else {
      let selectedData = allData.filter((item: any) => item.isSelected);
      let selectedAnswerID = selectedData.map((item: any) => item.stepOptionId);
      onPress(
        regenerationStepTypeId, //questionId
        selectedAnswerID, //answerId
        false, //if other value entered
        currentInputValue, //answer Value
        currentIndex //currentIndx
      );
    }
  };
  return (
    console.log(allOptions, "allOptions-=-=>", title),
    (
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text style={styles.titleHeader}>{title}</Text>
        <AnswerTitle
          title={
            title == "Did the plan include your preferred therapy methods?"
              ? ""
              : title == "What prompted you to regenerate the wellness plan?" ||
                "Was the plan suitable in terms of difficulty and time commitment?"
              ? "Select any of them"
              : "Select all that apply"
          }
        />
        <View
          style={{
            marginTop:
              title == "Did the plan include your preferred therapy methods?"
                ? moderateScale(-30)
                : moderateScale(1),
          }}
        >
          <FlatList
            data={allOptions}
            keyExtractor={(item) => item.stepOptionId.toString()}
            renderItem={({ item }) =>
              !item.isNewSpecification && (
                <CommonButton
                  btnName={item?.title}
                  onPress={() => onActivitySelection(item)}
                  btnNameStyle={{ textAlign: "left" }}
                  mainContainer={{
                    borderWidth: 1,
                    borderColor: colors?.SurfCrest,
                    borderRadius: moderateScale(16),
                    paddingHorizontal: moderateScale(15),
                    justifyContent: "flex-start",
                    width: "100%",
                    marginTop: moderateScale(15),
                    backgroundColor: item.isSelected
                      ? colors?.polishedPine
                      : "transparent",
                  }}
                />
              )
            }
          />
        </View>

        {otherData.length > 0 && (
          <>
            {isOtherBtnRequire && (
              <>
                {!isNewAddedSpec && (
                  <AddButton
                    containerStyle={[
                      style.addButton,
                      {
                        borderColor: colors?.SurfCrest,
                        borderWidth: 1,
                        borderStyle: "dashed",
                        borderRadius: moderateScale(16),
                        paddingHorizontal: moderateScale(15),
                        justifyContent: "center",
                        width: "100%",
                        backgroundColor: colors?.transparent,
                        alignItems: "center",
                      },
                    ]}
                    textStyle={{
                      color: colors?.SurfCrest,
                    }}
                    isBtnName
                    btnName={"Something else"}
                    onPress={() => onAddNew(otherData?.[0])}
                  />
                )}
                {isNewAddedSpec && (
                  <TextInputStretch
                    newSpecInputView={{
                      marginHorizontal: moderateScale(0),
                      borderRadius: moderateScale(15),
                      marginTop: moderateScale(15),
                      paddingTop: moderateScale(5),
                    }}
                    placeholder={"Describe other"}
                    value={currentInputValue}
                    onChangeText={onChangeNewSpec}
                  />
                )}
              </>
            )}
          </>
        )}

        <View style={{ marginBottom: moderateScale(10) }}>
          <CommonButton
            btnName={"NEXT"}
            mainContainer={styles.buttonContainer}
            onPress={() => onNext(allOptions)}
          />
        </View>
      </View>
    )
  );
};

export default React.memo(InitialFeedback);

const style = StyleSheet.create({
  newSpecInput: {
    height: moderateScale(56),
    fontSize: textScale(14),
    width: "100%",
    fontWeight: "600",
    borderWidth: 1,
    padding: moderateScale(10),
    color: colors.SurfCrest,
    borderColor: colors.SurfCrest,
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(15),
  },
  addButton: {
    marginVertical: moderateScale(15),
  },
});
