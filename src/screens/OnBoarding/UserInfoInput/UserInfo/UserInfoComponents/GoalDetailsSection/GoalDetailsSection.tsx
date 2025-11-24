import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { strings } from "../../../../../../constant/strings";
import colors from "../../../../../../constant/colors";
import {
  moderateScale,
  textScale,
} from "../../../../../../constant/responsiveStyle";
import { MeditationIcon, MeditationPose } from "../../../../../../assets";
import CommonInput from "../../../../../../components/Inputs/commonInput";
import CommonButton from "../../../../../../components/Buttons/commonButton";
import ScreenWrapper from "../../../../../../components/SafeArea/SafeAreaWrapper";
import navigationString from "../../../../../../navigation/navigationString";
import { validateName } from "../../../../../../validations/validation";
import TopTextIcon from "./TopTextIcon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const GoalDetailsSection: React.FC<any> = ({ navigation, allData }) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionErrorText, setDescriptionErrorText] = useState("");

  const [writedWordsL, setWritedWordsL] = useState(0);
  const [desMaxLen, setDesMaxLen] = useState(50);
  const [filledWords, setFilledWords] = useState(0);

  const userInput = (type: any, val: any) => {
    console.log("writedWordsL >= desMaxLen", val.length);

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
          if (val.length - 1 >= desMaxLen) {
            setDescriptionError(true);
            setDescriptionErrorText("Your Description is to lengthy");
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
      setDescriptionErrorText("Please fill the description");
    }
    if (title && description && description.length - 1 < desMaxLen) {
      navigation.goBack();
    }
  };

  const renderInputField = () => {
    return (
      <View style={styles?.inputFieldContainer}>
        <CommonInput
          placeholderTextColor={colors?.SurfCrest}
          placeholder={strings?.title}
          isWidth={false}
          mainContainer={{
            marginTop: moderateScale(25),
            borderColor: colors?.royalOrange,
          }}
          value={title}
          onChangeText={(val: any) => userInput("title", val)}
          isError={titleError}
          errorMsg={"Please enter the title"}
          backGroundColor={colors?.SaltBox}
          borderColor={colors?.royalOrange}
          inputText={{ color: colors?.SurfCrest }}
        />
        <CommonInput
          placeholderTextColor={colors?.SurfCrest}
          placeholder={strings?.describe}
          textAlignVertical={"top"}
          wordCount={true}
          multiline={true}
          writeWords={filledWords}
          maxWords={desMaxLen}
          isWidth={false}
          mainContainer={{
            height: moderateScale(162),
            marginTop: moderateScale(15),
          }}
          inputText={{ height: moderateScale(130), color: colors?.SurfCrest }}
          value={description}
          onChangeText={(val: any) => userInput("description", val)}
          errorMsg={descriptionErrorText}
          isError={descriptionError}
          backGroundColor={colors?.SaltBox}
          borderColor={colors?.royalOrange}
          writeWordsStyle={{ color: colors?.SurfCrest }}
        />
      </View>
    );
  };
  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <TopTextIcon />
        {renderInputField()}
        <CommonButton
          onPress={validation}
          btnName={"SAVE"}
          mainContainer={{
            alignSelf: "center",
            marginTop: moderateScale(30),
          }}
        />
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  inputFieldContainer: {
    marginHorizontal: moderateScale(19),
    flex: 1,
  },
  btnViewStyle: {
    position: "absolute",
    bottom: moderateScale(20),
    alignSelf: "center",
  },
});
export default GoalDetailsSection;
