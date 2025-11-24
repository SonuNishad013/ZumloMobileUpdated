import { View, StyleSheet, FlatList } from "react-native";
import React, { useMemo, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";
import CommonInput from "../../../components/Inputs/commonInput";
import navigationString from "../../../navigation/navigationString";
import { strings } from "../../../constant/strings";
import BtmBtn from "../zUserGoalscomponents/BtmBtn";
import ImageText from "./ImageText";
import Header from "../zUserGoalscomponents/Header";
import { validateName } from "../../../validations/validation";
interface Props {
  navigation?: any;
}
const SetIntensityInput: React.FC<Props> = ({ navigation }) => {
  // const [inputData, setInputData] = useState<any>({
  //   title: "",
  //   titleError: false,
  //   titleErrorText: "Text Can't be empty",
  //   titleShowErrorText: false,
  //   description: "",
  //   descriptionError: false,
  //   desErrorText: "",
  //   desShowErrorText: false,
  // });

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionErrorText, setDescriptionErrorText] = useState("");

  const [writedWordsL, setWritedWordsL] = useState(0);
  const [desMaxLen, setDesMaxLen] = useState(50);
  const [filledWords, setFilledWords] = useState(0);

  const userInput = (type: any, val: any) => {
    switch (type) {
      case "title":
        if (val.trim() !== null && validateName(val)) {
          setTitle(val);
          setTitleError(false);
        }
        break;
      case "description":
        if (val.trim() !== null && validateName(val)) {
          setDescription(val);
          setWritedWordsL(val.length);
          setFilledWords(val.length);
          if (writedWordsL >= desMaxLen) {
            setDescriptionError(true);
            setDescriptionErrorText("Max Length");
          } else {
            setDescriptionError(false);
          }
        }
        break;
      default:
        break;
    }
  };

  const validation = () => {
    if (!title) {
      setTitleError(true);
    }
    if (!description) {
      setDescriptionError(true);
      setDescriptionErrorText("fill");
    }
    if (title && description) {
      navigation.navigate(navigationString?.MyGoals);
    }
  };
  const renderInputField = () => {
    return (
      <View style={style?.inputFieldContainer}>
        <CommonInput
          placeholderTextColor={colors?.prussianBlue}
          placeholder={strings?.title}
          isWidth={false}
          mainContainer={{
            marginTop: moderateScale(25),
          }}
          value={title}
          onChangeText={(val: any) => userInput("title", val)}
          isError={titleError}
          errorMsg={"PLEASE FILL THE TITLE"}
        />
        <CommonInput
          placeholderTextColor={colors?.prussianBlue}
          placeholder={strings?.describe}
          textAlignVertical={"top"}
          wordCount={true}
          multiline={true}
          writeWords={filledWords}
          maxWords={desMaxLen}
          writeWordsStyle={{
            color: colors?.prussianBlue,
          }}
          isWidth={false}
          mainContainer={{
            height: moderateScale(162),
            marginTop: moderateScale(15),
            backgroundColor: colors?.ShadowGreen,
          }}
          inputText={{ height: moderateScale(130) }}
          value={description}
          onChangeText={(val: any) => userInput("description", val)}
          errorMsg={descriptionErrorText}
          isError={descriptionError}
        />
      </View>
    );
  };

  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={{ backgroundColor: colors?.SurfCrest, flex: 1 }}>
        <Header headerName={"Set Intensity"} navigation={navigation} />
        <FlatList
          data={["1"]}
          keyExtractor={(item, index) => "key" + index}
          renderItem={() => {
            return (
              <>
                <ImageText />
                {renderInputField()}
              </>
            );
          }}
          contentContainerStyle={{ paddingBottom: moderateScale(90) }}
        />
        <BtmBtn btnName={strings?.save} onPress={validation} />
      </View>
    </ScreenWrapper>
  );
};

export default SetIntensityInput;

const style = StyleSheet.create({
  inputFieldContainer: {
    marginHorizontal: moderateScale(19),
  },
});
