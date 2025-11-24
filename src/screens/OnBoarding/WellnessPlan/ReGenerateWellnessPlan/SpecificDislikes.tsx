import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { imagePath } from "../../../../assets/png/imagePath";
import colors from "../../../../constant/colors";
import { styles } from "./styles";
import AnswerTitle from "./AnswerTitle";
import CommonButton from "../../../../components/Buttons/commonButton";
import TextInputStretch from "../../../../components/OnBoardiingComponents/TextInputStretch";

const SpecificDislikes = ({
  title,
  onPress,
  quesData,
  isNewScreen,
  currentIndex,
  regenerationStepTypeId,
  fieldType,
}: any) => {
  console.log(
    "regenerationStepTypeId in multiselect=-=>",
    regenerationStepTypeId
  );

  const [learningIndex, setLearningIndex] = useState<number[]>([]);
  const [PickAnswer, setPickAnswer] = useState(quesData);
  const [isNewAddedSpec, setIsNewAddedSpec] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState("");
  const handleSelections = (index: number) => {
    if (learningIndex?.includes(index)) {
      const temp = learningIndex;
      const filtered = temp.filter((itm) => index != itm);
      console.log("filtered", filtered);
      setLearningIndex([...filtered]);
    } else {
      setLearningIndex([...learningIndex, index]);
    }
  };
  const onAddNew = (item: any) => {
    setIsNewAddedSpec(true);
    setPickAnswer(PickAnswer.filter((item: any) => item.title !== "Other"));
    const newObj = {
      logo: item.logo,
      optionLabel: item.optionLabel,
      optionOrder: item.optionOrder,
      stepOptionId: item.stepOptionId,
      title: item.title,
      isNewSpecification: true,
      isSelected: false,
    };
    console.log("newObj", PickAnswer);

    setPickAnswer((prev: any) => [
      ...prev.map((val: any) => ({ ...val, isSelected: false })),
      newObj,
    ]);
  };
  const onChangeNewSpec = (text: any) => {
    const filteredText = text.replace(/[^a-zA-Z\s]/g, "");
    setCurrentInputValue(filteredText);
    setPickAnswer((prev: any) =>
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
    let selectedItem = allData.filter((item: any, index: any) => {
      const element = learningIndex.includes(index);
      if (element) {
        return item;
      }
    });
    let isOtherData = allData.filter((item: any) => item.isNewSpecification);
    selectedItem.push(...isOtherData);
    let selectedAnswerID = selectedItem.map((item: any) => item.stepOptionId);
    console.log("selectedItem", isOtherData.length > 0);

    onPress(
      regenerationStepTypeId, //questionId
      selectedAnswerID, //answerId
      isOtherData.length > 0, //if other value entered
      currentInputValue, //answer Value
      currentIndex //currentIndx
    );
    // onPress(selectedItem, currentIndex)
  };
  const renderFooter = (item: any) => {
    return (
      <>
        {!item.isNewSpecification ? (
          <TouchableOpacity
            onPress={() => onAddNew(item)}
            style={{
              borderWidth: 1,
              borderColor: colors?.SurfCrest,
              borderRadius: moderateScale(16),
              borderStyle: "dashed",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: textScale(14),
                fontWeight: "400",
                color: colors?.SurfCrest,
                marginVertical: moderateScale(20),
                marginHorizontal: moderateScale(15),
              }}
            >
              <Image
                source={imagePath?.PlusImage}
                tintColor={colors?.SurfCrest}
              />{" "}
              {"Something else"}
            </Text>
          </TouchableOpacity>
        ) : (
          <TextInputStretch
            newSpecInputView={{
              marginHorizontal: moderateScale(0),
              borderRadius: moderateScale(15),
              marginTop: moderateScale(15),
              paddingTop: moderateScale(5),
            }}
            placeholder={"Enter Other"}
            value={currentInputValue}
            onChangeText={onChangeNewSpec}
          />
        )}
      </>
    );
  };
  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
      <Text style={styles.titleHeader}>{title}</Text>
      <AnswerTitle title={"You can select multiple options"} />
      <FlatList
        contentContainerStyle={{ gap: moderateScale(15) }}
        data={PickAnswer}
        keyExtractor={(item, index) => "key" + index}
        scrollEnabled={false}
        renderItem={({ item, index }: any) => {
          return (
            <>
              {item.title !== "Other" ? (
                <>
                  {!item.isNewSpecification ? (
                    <CommonButton
                      btnName={item?.title}
                      onPress={() => {
                        !item.isNewSpecification && handleSelections(index);
                      }}
                      btnNameStyle={{ textAlign: "left" }}
                      mainContainer={{
                        borderWidth: 1,
                        borderColor: colors?.SurfCrest,
                        borderRadius: moderateScale(16),
                        paddingHorizontal: moderateScale(15),
                        justifyContent: "flex-start",
                        width: "100%",
                        backgroundColor: learningIndex?.includes(index)
                          ? colors?.polishedPine
                          : "transparent",
                      }}
                    />
                  ) : (
                    renderFooter(item)
                  )}
                </>
              ) : (
                renderFooter(item)
              )}
            </>
          );
        }}
      />
      <View style={{ marginBottom: moderateScale(10) }}>
        <CommonButton
          btnName={"NEXT"}
          mainContainer={styles.buttonContainer}
          // onPress={() => {
          //   onPress();
          // }}
          onPress={() => onNext(PickAnswer)}
        />
      </View>
    </ScrollView>
  );
};

export default SpecificDislikes;
const style = StyleSheet.create({
  newSpecInput: {
    height: moderateScale(60),
    borderWidth: 1,
    borderColor: colors?.SurfCrest,
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(15),
    justifyContent: "flex-start",
    width: "100%",
    color: colors.SurfCrest,
  },
  addButton: {
    marginVertical: moderateScale(15),
  },
});
